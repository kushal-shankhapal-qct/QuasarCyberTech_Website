import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { EncryptedEnvelopeSchema, ContactPayloadSchema } from '../validation/schemas.js';
import { decryptPayload } from '../crypto/xchacha.js';
import { insertContact } from '../db/queries.js';
import { sendContactEmails } from '../mail/mailer.js';

export async function contactRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    '/api/contact',
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
      const bodyParse = ContactPayloadSchema.safeParse(parsed);
      if (!bodyParse.success) {
        const firstError = bodyParse.error.errors[0]?.message ?? 'Validation failed.';
        return reply.status(422).send({ error: firstError });
      }

      const data = bodyParse.data;

      // 5. Honeypot check (website field should be empty if set at all)
      if (data.website && data.website.trim().length > 0) {
        // Silently accept to not tip off bots, but do nothing
        return reply.status(200).send({ success: true });
      }

      const ip = (request.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim()
                 ?? request.ip
                 ?? '0.0.0.0';

      // 6. Persist (includes rate limiting)
      let result: Awaited<ReturnType<typeof insertContact>>;
      try {
        result = await insertContact(data, ip);
      } catch (err: unknown) {
        const knownErr = err as { code?: string };
        if (knownErr.code === 'RATE_LIMIT') {
          return reply.status(429).send({ error: 'Too many submissions from your network. Please try again tomorrow.' });
        }
        fastify.log.error(err, 'contact DB insert failed');
        return reply.status(500).send({ error: 'Service unavailable. Please try again later.' });
      }

      // 7. Send emails — fire and forget
      sendContactEmails(data, result.id).catch((err) =>
        fastify.log.error(err, 'contact email send failed'),
      );

      return reply.status(200).send({
        success: true,
        message: 'Your message has been received. We will respond within 24 hours.',
      });
    },
  );
}
