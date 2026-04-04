import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { EncryptedEnvelopeSchema, NewsletterPayloadSchema } from '../validation/schemas.js';
import { decryptPayload } from '../crypto/xchacha.js';
import { insertNewsletter } from '../db/queries.js';
import { sendNewsletterEmails } from '../mail/mailer.js';

export async function newsletterRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    '/api/newsletter',
    async (
      request: FastifyRequest<{ Body: unknown }>,
      reply: FastifyReply,
    ) => {
      // 1. Parse & validate the encrypted envelope
      const envelopeParse = EncryptedEnvelopeSchema.safeParse(request.body);
      if (!envelopeParse.success) {
        return reply.status(400).send({ error: 'Invalid request format.' });
      }

      // 2. Decrypt the payload
      let rawJson: string;
      try {
        rawJson = decryptPayload(envelopeParse.data);
      } catch {
        return reply.status(400).send({ error: 'Payload decryption failed.' });
      }

      // 3. Parse decrypted JSON
      let parsed: unknown;
      try {
        parsed = JSON.parse(rawJson);
      } catch {
        return reply.status(400).send({ error: 'Malformed payload.' });
      }

      // 4. Validate business fields
      const bodyParse = NewsletterPayloadSchema.safeParse(parsed);
      if (!bodyParse.success) {
        const firstError = bodyParse.error.errors[0]?.message ?? 'Validation failed.';
        return reply.status(422).send({ error: firstError });
      }

      const data = bodyParse.data;
      const ip   = (request.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim()
                   ?? request.ip
                   ?? '0.0.0.0';

      // 5. Persist to DB (includes rate limiting)
      let result: Awaited<ReturnType<typeof insertNewsletter>>;
      try {
        result = await insertNewsletter(data, ip, data.source);
      } catch (err: unknown) {
        const knownErr = err as { code?: string };
        if (knownErr.code === 'RATE_LIMIT') {
          return reply.status(429).send({ error: 'Too many requests. Please try again tomorrow.' });
        }
        fastify.log.error(err, 'newsletter DB insert failed');
        return reply.status(500).send({ error: 'Service unavailable. Please try again later.' });
      }

      // 6. Send emails — fire and forget; do not block or expose errors to client
      if (!result.alreadyExists) {
        sendNewsletterEmails(data, result.id).catch((err) =>
          fastify.log.error(err, 'newsletter email send failed'),
        );
      }

      return reply.status(200).send({
        success: true,
        alreadySubscribed: result.alreadyExists,
        message: result.alreadyExists
          ? 'You are already subscribed!'
          : 'Successfully subscribed. Check your inbox for a welcome email.',
      });
    },
  );
}
