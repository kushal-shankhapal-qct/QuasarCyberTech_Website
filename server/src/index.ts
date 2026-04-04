import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';

import { config } from './config.js';
import { checkDbConnection } from './db/pool.js';
import { contactRoutes } from './routes/contact.js';
import { newsletterRoutes } from './routes/newsletter.js';

const server = Fastify({
  logger: {
    level: config.NODE_ENV === 'production' ? 'warn' : 'info',
    transport:
      config.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  },
  trustProxy: true,
});

// ─── Security headers ─────────────────────────────────────────────────────────

await server.register(helmet, {
  contentSecurityPolicy: false, // API only — no HTML to serve
});

// ─── CORS ─────────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = new Set([
  config.FRONTEND_ORIGIN,
  'http://localhost:5173',
  'http://localhost:4173',
]);

await server.register(cors, {
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.has(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
});

// ─── Global rate limit (Fastify-level, per IP) ────────────────────────────────
// Supplements the per-table DB-level rate limiting.

await server.register(rateLimit, {
  global: true,
  max: 60,
  timeWindow: '1 minute',
  errorResponseBuilder: () => ({
    error: 'Too many requests. Please slow down.',
  }),
});

// ─── Health check ─────────────────────────────────────────────────────────────

server.get('/health', async (_req, reply) => {
  return reply.status(200).send({ status: 'ok', ts: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────

await server.register(contactRoutes);
await server.register(newsletterRoutes);

// ─── Boot ─────────────────────────────────────────────────────────────────────

try {
  await checkDbConnection();
  await server.listen({ port: config.PORT, host: '0.0.0.0' });
  console.log(`[server] Listening on port ${config.PORT} (${config.NODE_ENV})`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
