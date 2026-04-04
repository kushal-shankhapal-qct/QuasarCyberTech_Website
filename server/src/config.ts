import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1024).max(65535).default(3001),
  FRONTEND_ORIGIN: z.string().url(),

  // PostgreSQL
  DATABASE_URL: z.string().min(1),

  // X25519 private key — hex-encoded 32 bytes (64 hex chars)
  // Used to decrypt ephemeral ECDH-encrypted payloads from the browser.
  SERVER_ECDH_PRIVATE_KEY: z.string().regex(/^[0-9a-f]{64}$/i, 'Must be 64 hex chars (32 bytes)'),

  // XChaCha20-Poly1305 key for encrypting PII fields stored in the DB.
  // hex-encoded 32 bytes (64 hex chars)
  DB_ENCRYPTION_KEY: z.string().regex(/^[0-9a-f]{64}$/i, 'Must be 64 hex chars (32 bytes)'),

  // HMAC-SHA3-256 key for deterministic email deduplication hashes.
  // hex-encoded 32 bytes (64 hex chars)
  EMAIL_HMAC_KEY: z.string().regex(/^[0-9a-f]{64}$/i, 'Must be 64 hex chars (32 bytes)'),

  // SMTP
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().default(587),
  SMTP_USER: z.string().email(),
  SMTP_PASS: z.string().min(1),
  NOTIFY_EMAIL: z.string().email(),

  // Rate limiting (per IP per 24 h window)
  MAX_CONTACT_PER_IP_PER_DAY: z.coerce.number().int().min(1).default(5),
  MAX_NEWSLETTER_PER_IP_PER_DAY: z.coerce.number().int().min(1).default(3),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('[config] Invalid environment variables:\n', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
export type Config = typeof config;
