import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import {
  verifyPassword,
  issueJwt,
  checkLoginRateLimit,
  clearLoginRateLimit,
  createPreauthToken,
  consumePreauthToken,
  verifyTotp,
  verifyTotpSig,
  createCaptcha,
  verifyCaptcha,
} from '../../crypto/adminCrypto.js';
import { requireIpWhitelist, getClientIp } from '../../middleware/adminAuth.js';
import { config } from '../../config.js';

const JWT_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

const LoginSchema = z.object({
  password:      z.string().min(1).max(200),
  captchaId:     z.string().length(32).regex(/^[0-9a-f]+$/),
  captchaAnswer: z.coerce.number().int(),
});

const VerifyTotpSchema = z.object({
  preauthToken: z.string().length(64).regex(/^[0-9a-f]+$/),
  code:         z.string().length(6).regex(/^\d+$/),
  ts:           z.number().int(),
  sig:          z.string().length(64).regex(/^[0-9a-f]+$/),
});

export async function adminAuthRoutes(fastify: FastifyInstance): Promise<void> {

  // ── GET /api/admin/captcha ─────────────────────────────────────────────────
  // Returns a fresh math challenge. No auth required.
  // Rate-limited by the global Fastify limiter (60 req/min per IP).
  fastify.get(
    '/api/admin/captcha',
    { preHandler: [requireIpWhitelist] },
    async (_req, reply) => {
      const { id, question } = createCaptcha();
      return reply.status(200).send({ id, question });
    },
  );

  // ── POST /api/admin/login ──────────────────────────────────────────────────
  // Step 1: verify captcha + password.
  // If TOTP is configured → returns preauthToken for step 2.
  // If TOTP is not configured → issues JWT cookie directly.
  fastify.post(
    '/api/admin/login',
    { preHandler: [requireIpWhitelist] },
    async (request, reply) => {
      const ip = getClientIp(request);

      if (!checkLoginRateLimit(ip)) {
        return reply.status(429).send({ error: 'Too many attempts. Try again in 15 minutes.' });
      }

      const parsed = LoginSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({ error: 'Invalid request body.' });
      }

      const { password, captchaId, captchaAnswer } = parsed.data;

      // Verify captcha first — always single-use, prevents brute-force automation
      if (!verifyCaptcha(captchaId, captchaAnswer)) {
        return reply.status(400).send({ error: 'Captcha answer incorrect or expired. Please refresh.' });
      }

      // Verify password
      const match = await verifyPassword(password, config.ADMIN_PASSWORD_HASH);
      if (!match) {
        fastify.log.warn({ ip }, 'Admin login: wrong password');
        // Deliberate generic error — don't reveal which factor failed
        return reply.status(401).send({ error: 'Authentication failed.' });
      }

      // Password OK — decide based on TOTP configuration
      if (config.ADMIN_TOTP_SECRET) {
        // 2FA required: issue a short-lived preauth token
        const preauthToken = createPreauthToken(ip);
        fastify.log.info({ ip }, 'Admin login: password OK, awaiting TOTP');
        return reply.status(200).send({ totpRequired: true, preauthToken });
      }

      // No TOTP configured: issue JWT cookie immediately
      clearLoginRateLimit(ip);
      const token = issueJwt();
      setAuthCookie(reply, token);
      fastify.log.info({ ip }, 'Admin login: success (no 2FA)');
      return reply.status(200).send({ success: true, totpRequired: false });
    },
  );

  // ── POST /api/admin/verify-totp ────────────────────────────────────────────
  // Step 2: verify TOTP code + HMAC signature.
  // Issues JWT cookie on success. The preauthToken is single-use and IP-bound.
  // The HMAC signature (computed by the client using the preauthToken as key)
  // prevents replay even if a TOTP code is intercepted.
  fastify.post(
    '/api/admin/verify-totp',
    { preHandler: [requireIpWhitelist] },
    async (request, reply) => {
      const ip = getClientIp(request);

      const parsed = VerifyTotpSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({ error: 'Invalid request.' });
      }

      const { preauthToken, code, ts, sig } = parsed.data;

      // Verify the HMAC signature BEFORE consuming the preauth token.
      // The token bytes are used as the HMAC key — only the legitimate client
      // who received the token can produce a valid signature.
      if (!verifyTotpSig(preauthToken, code, ts, sig)) {
        fastify.log.warn({ ip }, 'Admin TOTP: invalid signature');
        return reply.status(401).send({ error: 'Authentication failed.' });
      }

      // Consume the preauth token (single-use, IP-bound, TTL-checked).
      // This happens AFTER sig verification so a bad-sig request doesn't
      // burn the token (attacker cannot invalidate a legitimate session).
      if (!consumePreauthToken(preauthToken, ip)) {
        fastify.log.warn({ ip }, 'Admin TOTP: invalid or expired preauth token');
        return reply.status(401).send({ error: 'Session expired. Please log in again.' });
      }

      // Verify TOTP code (±1 window for clock skew)
      if (!verifyTotp(code)) {
        fastify.log.warn({ ip }, 'Admin TOTP: wrong code');
        return reply.status(401).send({ error: 'Authentication failed.' });
      }

      // All factors verified — issue the full JWT session cookie
      clearLoginRateLimit(ip);
      const token = issueJwt();
      setAuthCookie(reply, token);
      fastify.log.info({ ip }, 'Admin login: 2FA success');
      return reply.status(200).send({ success: true });
    },
  );

  // ── POST /api/admin/logout ─────────────────────────────────────────────────
  fastify.post('/api/admin/logout', async (_req, reply) => {
    reply.header('Set-Cookie', 'admin_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict');
    return reply.status(200).send({ success: true });
  });
}

// ─── Cookie helper ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setAuthCookie(reply: any, token: string): void {
  const isLocalhost = /^http:\/\/localhost(?::\d+)?$/i.test(config.FRONTEND_ORIGIN);
  const secure = config.NODE_ENV === 'production' && !isLocalhost;

  reply.header(
    'Set-Cookie',
    [
      `admin_token=${token}`,
      `Max-Age=${JWT_COOKIE_MAX_AGE}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Strict',
      ...(secure ? ['Secure'] : []),
    ].join('; '),
  );
}
