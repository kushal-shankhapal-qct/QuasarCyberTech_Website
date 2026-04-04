import { z } from 'zod';

// ─── Encrypted envelope ───────────────────────────────────────────────────────

export const EncryptedEnvelopeSchema = z.object({
  ephemeralPublicKey: z
    .string()
    .regex(/^[0-9a-f]{64}$/i, 'Must be 64 hex chars'),
  nonce: z
    .string()
    .regex(/^[0-9a-f]{48}$/i, 'Must be 48 hex chars'),
  ciphertext: z
    .string()
    .min(32, 'Ciphertext too short')
    .regex(/^[0-9a-f]+$/i, 'Must be hex-encoded'),
});

export type EncryptedEnvelope = z.infer<typeof EncryptedEnvelopeSchema>;

// ─── Contact form payload ─────────────────────────────────────────────────────

const FIELD_LIMITS = {
  name: 80,
  company: 100,
  role: 80,
  email: 120,
  phone: 10,
  service: 100,
  message: 1000,
} as const;

const MALICIOUS = [
  /<\s*script\b/i,
  /javascript\s*:/i,
  /data\s*:\s*text\/html/i,
  /vbscript\s*:/i,
  /on\w+\s*=/i,
  /(?:\b|_)(?:alert|prompt|confirm|eval|Function)\s*\(/i,
  /document\.(?:cookie|write)|window\.(?:location|open)/i,
];

const noMalicious = (val: string) => !MALICIOUS.some((r) => r.test(val));

export const ContactPayloadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Name is required')
    .max(FIELD_LIMITS.name)
    .regex(/^[A-Za-z][A-Za-z\s'-]{1,79}$/, 'Invalid name format')
    .refine(noMalicious, 'Invalid input'),

  companyName: z
    .string()
    .trim()
    .min(2, 'Company is required')
    .max(FIELD_LIMITS.company)
    .regex(/^[A-Za-z0-9][A-Za-z0-9\s.,&()'-]{1,99}$/, 'Invalid company name')
    .refine(noMalicious, 'Invalid input'),

  role: z
    .string()
    .trim()
    .min(2, 'Role is required')
    .max(FIELD_LIMITS.role)
    .regex(/^[A-Za-z0-9][A-Za-z0-9\s/&()'.,-]{1,79}$/, 'Invalid role')
    .refine(noMalicious, 'Invalid input'),

  workEmail: z
    .string()
    .trim()
    .toLowerCase()
    .min(5)
    .max(FIELD_LIMITS.email)
    .email('Invalid email address')
    .refine(noMalicious, 'Invalid input'),

  phone: z
    .string()
    .trim()
    .regex(/^\d{7,15}$/, 'Phone must be 7-15 digits'),

  serviceInterest: z
    .string()
    .trim()
    .min(1, 'Service selection is required')
    .max(FIELD_LIMITS.service)
    .refine(noMalicious, 'Invalid input'),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(FIELD_LIMITS.message)
    .refine(noMalicious, 'Invalid input'),

  // Honeypot — must be absent or empty
  website: z.string().max(0, 'Bot detected').optional(),
});

export type ContactPayload = z.infer<typeof ContactPayloadSchema>;

// ─── Newsletter payload ───────────────────────────────────────────────────────

export const NewsletterPayloadSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5)
    .max(120)
    .email('Invalid email address')
    .refine(noMalicious, 'Invalid input'),

  name: z
    .string()
    .trim()
    .max(80)
    .regex(/^[A-Za-z\s'-]*$/, 'Invalid name format')
    .refine(noMalicious, 'Invalid input')
    .optional(),

  source: z.enum(['sidebar', 'footer', 'overview']).default('sidebar'),
});

export type NewsletterPayload = z.infer<typeof NewsletterPayloadSchema>;
