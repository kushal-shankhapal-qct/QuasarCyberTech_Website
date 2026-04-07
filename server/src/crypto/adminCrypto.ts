/**
 * adminCrypto.ts
 *
 * Auth utilities for the admin portal.
 * Security model: HTTPS + httpOnly JWT cookie + scrypt password + TOTP 2FA
 *   + rate limiting + IP whitelist + signed preauth tokens + server-side captcha.
 *
 * No external npm packages — uses only Node.js built-ins.
 */

import {
  createHmac,
  randomBytes,
  timingSafeEqual,
  scrypt,
  scryptSync,
} from 'crypto';
import { config } from '../config.js';

// ─── Base64url helpers (for JWT) ──────────────────────────────────────────────

const toBase64Url = (buf: Buffer | string): string => {
  const b64 = Buffer.isBuffer(buf)
    ? buf.toString('base64')
    : Buffer.from(buf).toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const fromBase64Url = (s: string): Buffer =>
  Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

// ─── JWT (HS256, manual — no external deps) ───────────────────────────────────

const JWT_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days
const JWT_HEADER = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));

export function issueJwt(): string {
  const now = Math.floor(Date.now() / 1000);
  const payload = toBase64Url(
    JSON.stringify({ sub: 'admin', iat: now, exp: now + JWT_EXPIRY_SECONDS }),
  );
  const sigInput = `${JWT_HEADER}.${payload}`;
  const sig = toBase64Url(
    createHmac('sha256', config.ADMIN_JWT_SECRET).update(sigInput).digest(),
  );
  return `${sigInput}.${sig}`;
}

export interface JwtVerifyResult {
  valid: boolean;
  code?: 'MALFORMED' | 'INVALID_SIG' | 'EXPIRED';
}

export function verifyJwt(token: string): JwtVerifyResult {
  const parts = token.split('.');
  if (parts.length !== 3) return { valid: false, code: 'MALFORMED' };

  const [header, payload, sig] = parts;
  const sigInput = `${header}.${payload}`;
  const expectedSig = toBase64Url(
    createHmac('sha256', config.ADMIN_JWT_SECRET).update(sigInput).digest(),
  );

  const actualBuf   = fromBase64Url(sig);
  const expectedBuf = fromBase64Url(expectedSig);

  if (
    actualBuf.length !== expectedBuf.length ||
    !timingSafeEqual(actualBuf, expectedBuf)
  ) {
    return { valid: false, code: 'INVALID_SIG' };
  }

  let claims: { exp?: number };
  try {
    claims = JSON.parse(fromBase64Url(payload).toString('utf8'));
  } catch {
    return { valid: false, code: 'MALFORMED' };
  }

  if (!claims.exp || Math.floor(Date.now() / 1000) > claims.exp) {
    return { valid: false, code: 'EXPIRED' };
  }

  return { valid: true };
}

// ─── Password hashing (scrypt) ────────────────────────────────────────────────

// N=65536, r=8 requires 128*N*r = 64 MB. Node's default maxmem is 32 MB,
// so we must pass maxmem explicitly.
const SCRYPT_PARAMS = { N: 65536, r: 8, p: 1, dkLen: 64, maxmem: 128 * 1024 * 1024 };
const SCRYPT_SALT_BYTES = 32;

/** Hashes a password for storage in ADMIN_PASSWORD_HASH env var. */
export function hashPassword(plain: string): string {
  const salt = randomBytes(SCRYPT_SALT_BYTES);
  const dk = scryptSync(plain, salt, SCRYPT_PARAMS.dkLen, {
    N: SCRYPT_PARAMS.N,
    r: SCRYPT_PARAMS.r,
    p: SCRYPT_PARAMS.p,
    maxmem: SCRYPT_PARAMS.maxmem,
  });
  return `${salt.toString('hex')}:${dk.toString('hex')}`;
}

/** Verifies a plaintext password against the stored hash (async, non-blocking). */
export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  const [saltHex, dkHex] = stored.split(':');
  if (!saltHex || !dkHex) return false;

  return new Promise((resolve) => {
    scrypt(plain, Buffer.from(saltHex, 'hex'), SCRYPT_PARAMS.dkLen, {
      N: SCRYPT_PARAMS.N,
      r: SCRYPT_PARAMS.r,
      p: SCRYPT_PARAMS.p,
      maxmem: SCRYPT_PARAMS.maxmem,
    }, (err, dk) => {
      if (err) { resolve(false); return; }
      const stored64 = Buffer.from(dkHex, 'hex');
      resolve(dk.length === stored64.length && timingSafeEqual(dk, stored64));
    });
  });
}

// ─── Login rate limiter (in-memory) ──────────────────────────────────────────

interface RateEntry { count: number; resetAt: number }
const loginAttempts = new Map<string, RateEntry>();

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS    = 15 * 60 * 1000;

export function checkLoginRateLimit(ip: string): boolean {
  const now   = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return true;
  }
  if (entry.count >= LOGIN_MAX_ATTEMPTS) return false;
  entry.count += 1;
  return true;
}

export function clearLoginRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

// ─── IP whitelist ─────────────────────────────────────────────────────────────

export function isIpAllowed(ip: string): boolean {
  const raw = config.ADMIN_ALLOWED_IPS.trim();
  if (!raw) return true;
  const allowed = raw.split(',').map(s => s.trim()).filter(Boolean);
  return allowed.length === 0 || allowed.includes(ip);
}

// ─── TOTP (RFC 6238, HMAC-SHA1, 30-second window) ─────────────────────────────

/** Decodes a base32 string to raw bytes (RFC 4648). */
function base32Decode(str: string): Buffer {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const clean = str.toUpperCase().replace(/[^A-Z2-7]/g, '');
  let bits = 0, val = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const idx = alpha.indexOf(ch);
    if (idx < 0) continue;
    val = (val << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((val >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

/** Encodes raw bytes to base32 (RFC 4648, no padding). */
export function base32Encode(buf: Buffer): string {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = 0, val = 0, out = '';
  for (const byte of buf) {
    val = (val << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += alpha[(val >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += alpha[(val << (5 - bits)) & 31];
  return out;
}

/** Computes the TOTP code for a given window offset (0 = current 30-s window). */
function totpCode(secret: string, windowOffset = 0): string {
  const key = base32Decode(secret);
  const counter = Math.floor(Date.now() / 1000 / 30) + windowOffset;

  // Write counter as big-endian 64-bit integer
  const buf = Buffer.alloc(8);
  const lo = counter >>> 0;
  const hi = Math.floor(counter / 0x100000000);
  buf.writeUInt32BE(hi, 0);
  buf.writeUInt32BE(lo, 4);

  const hmac = createHmac('sha1', key).update(buf).digest();
  const offset = hmac[19] & 0xf;
  const code =
    (((hmac[offset] & 0x7f) << 24) |
      (hmac[offset + 1] << 16) |
      (hmac[offset + 2] << 8) |
      hmac[offset + 3]) % 1_000_000;

  return String(code).padStart(6, '0');
}

/**
 * Verifies a 6-digit TOTP code against the configured secret.
 * Accepts ±1 time window (±30 s) to account for clock skew.
 */
export function verifyTotp(code: string): boolean {
  if (!config.ADMIN_TOTP_SECRET) return false;
  if (!/^\d{6}$/.test(code)) return false;
  return [-1, 0, 1].some(w => totpCode(config.ADMIN_TOTP_SECRET!, w) === code);
}

// ─── Pre-auth token (issued after password OK, consumed after TOTP OK) ────────
//
// Flow:
//   POST /admin/login (password + captcha) → preauthToken
//   POST /admin/verify-totp (preauthToken + code + HMAC sig) → JWT cookie
//
// The preauthToken is:
//   - 64 hex chars (32 random bytes)
//   - IP-bound (must come from same IP as the login request)
//   - Single-use (deleted on first lookup, whether valid or not)
//   - 5-minute TTL

interface PreauthEntry { ip: string; expiresAt: number }
const preauthStore = new Map<string, PreauthEntry>();

const PREAUTH_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function createPreauthToken(ip: string): string {
  const token = randomBytes(32).toString('hex');
  preauthStore.set(token, { ip, expiresAt: Date.now() + PREAUTH_TTL_MS });
  return token;
}

/**
 * Validates and CONSUMES a preauth token.
 * Returns true only if: exists, not expired, IP matches.
 * Always deletes the token (single-use even on failure).
 */
export function consumePreauthToken(token: string, ip: string): boolean {
  const entry = preauthStore.get(token);
  preauthStore.delete(token); // unconditional single-use deletion
  if (!entry) return false;
  if (entry.expiresAt < Date.now()) return false;
  if (entry.ip !== ip) return false;
  return true;
}

// ─── TOTP request signature (HMAC-SHA256 keyed on preauthToken) ───────────────
//
// Client computes: sig = HMAC-SHA256(hex_bytes(preauthToken), `${code}:${ts}`)
// where ts = Math.floor(Date.now() / 1000).
//
// This binds the TOTP submission to a specific preauth session.
// Even if an attacker intercepts the 6-digit TOTP code, they cannot forge a
// valid submission without the preauthToken, which they should not have.

export function verifyTotpSig(
  preauthToken: string,
  code: string,
  ts: number,
  sig: string,
): boolean {
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > 60) return false; // timestamp must be within 60 s

  const key = Buffer.from(preauthToken, 'hex');
  const expected = createHmac('sha256', key)
    .update(`${code}:${ts}`)
    .digest('hex');

  const eBuf = Buffer.from(expected, 'hex');
  const aBuf = Buffer.from(sig.toLowerCase(), 'hex');
  if (aBuf.length !== eBuf.length) return false;

  return timingSafeEqual(aBuf, eBuf);
}

// ─── Server-side captcha (math challenge, no external service) ────────────────

interface CaptchaEntry { answer: number; expiresAt: number }
const captchaStore = new Map<string, CaptchaEntry>();

const CAPTCHA_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function createCaptcha(): { id: string; question: string } {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const ops: Array<'+' | '−' | '×'> = ['+', '−', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const answer = op === '+' ? a + b : op === '−' ? a - b : a * b;

  const id = randomBytes(16).toString('hex');
  captchaStore.set(id, { answer, expiresAt: Date.now() + CAPTCHA_TTL_MS });

  // Occasional cleanup of stale entries
  if (captchaStore.size > 500) {
    const now = Date.now();
    for (const [k, v] of captchaStore) {
      if (v.expiresAt < now) captchaStore.delete(k);
    }
  }

  return { id, question: `${a} ${op} ${b}` };
}

/** Verifies and CONSUMES a captcha (single-use). */
export function verifyCaptcha(id: string, answer: number): boolean {
  const entry = captchaStore.get(id);
  captchaStore.delete(id); // unconditional single-use deletion
  if (!entry) return false;
  if (entry.expiresAt < Date.now()) return false;
  return entry.answer === answer;
}
