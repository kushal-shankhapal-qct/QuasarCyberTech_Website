import type { FastifyRequest, FastifyReply } from 'fastify';
import { verifyJwt, isIpAllowed } from '../crypto/adminCrypto.js';

export function getClientIp(request: FastifyRequest): string {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return request.ip ?? '0.0.0.0';
}

/** Blocks IPs not in the whitelist. No-op when ADMIN_ALLOWED_IPS is empty. */
export async function requireIpWhitelist(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  if (!isIpAllowed(getClientIp(request))) {
    await reply.status(403).send({ error: 'Access denied.' });
  }
}

/** Verifies the admin JWT from the httpOnly cookie. */
export async function requireAdminJwt(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const cookieHeader = request.headers['cookie'] ?? '';
  const match = cookieHeader.match(/(?:^|;\s*)admin_token=([^;]+)/);
  const token = match?.[1];

  if (!token) {
    await reply.status(401).send({ error: 'Authentication required.' });
    return;
  }

  const result = verifyJwt(token);
  if (!result.valid) {
    await reply.status(401).send({ error: 'Session expired. Please log in again.' });
  }
}
