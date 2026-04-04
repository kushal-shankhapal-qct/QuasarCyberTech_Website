import { pool } from './pool.js';
import { encryptField, emailHmac, hashIp } from '../crypto/xchacha.js';
import { config } from '../config.js';
import type { ContactPayload, NewsletterPayload } from '../validation/schemas.js';

// ─── IP-based rate limiting ───────────────────────────────────────────────────

/**
 * Returns how many submissions the given IP has made to a table
 * in the past 24 hours.
 */
async function countRecentByIp(
  table: 'contact_submissions' | 'newsletter',
  ipHash: Buffer,
): Promise<number> {
  const res = await pool.query<{ count: string }>(
    `SELECT COUNT(*) AS count FROM ${table}
       WHERE ip_hash = $1
         AND created_at > NOW() - INTERVAL '24 hours'`,
    [ipHash],
  );
  return parseInt(res.rows[0].count, 10);
}

// ─── Newsletter queries ───────────────────────────────────────────────────────

export interface NewsletterInsertResult {
  id: string;
  alreadyExists: boolean;
}

export async function insertNewsletter(
  data: NewsletterPayload,
  ip: string,
  source: string = 'sidebar',
): Promise<NewsletterInsertResult> {
  const ipHashBuf   = hashIp(ip);
  const emailHmacBuf = emailHmac(data.email);

  // Rate limit check
  const recentCount = await countRecentByIp('newsletter', ipHashBuf);
  if (recentCount >= config.MAX_NEWSLETTER_PER_IP_PER_DAY) {
    throw Object.assign(new Error('Rate limit exceeded'), { code: 'RATE_LIMIT' });
  }

  // Encrypt PII
  const emailEnc = encryptField(data.email.toLowerCase().trim());
  const nameEnc  = data.name ? encryptField(data.name.trim()) : null;

  const res = await pool.query<{ id: string }>(
    `INSERT INTO newsletter (email_hmac, email_enc, name_enc, ip_hash, source)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email_hmac) DO NOTHING
     RETURNING id`,
    [emailHmacBuf, emailEnc, nameEnc, ipHashBuf, source],
  );

  if (res.rows.length === 0) {
    // ON CONFLICT triggered — already subscribed
    return { id: '', alreadyExists: true };
  }

  return { id: res.rows[0].id, alreadyExists: false };
}

// ─── Contact queries ──────────────────────────────────────────────────────────

export interface ContactInsertResult {
  id: string;
}

export async function insertContact(
  data: ContactPayload,
  ip: string,
): Promise<ContactInsertResult> {
  const ipHashBuf    = hashIp(ip);
  const emailHmacBuf = emailHmac(data.workEmail);

  // Rate limit check
  const recentCount = await countRecentByIp('contact_submissions', ipHashBuf);
  if (recentCount >= config.MAX_CONTACT_PER_IP_PER_DAY) {
    throw Object.assign(new Error('Rate limit exceeded'), { code: 'RATE_LIMIT' });
  }

  // Encrypt all PII fields
  const nameEnc        = encryptField(data.fullName.trim());
  const companyEnc     = encryptField(data.companyName.trim());
  const designationEnc = encryptField(data.role.trim());
  const emailEnc       = encryptField(data.workEmail.toLowerCase().trim());
  const phoneEnc       = encryptField(data.phone.trim());
  const messageEnc     = encryptField(data.message.trim());

  const res = await pool.query<{ id: string }>(
    `INSERT INTO contact_submissions
       (name_enc, company_enc, designation_enc,
        email_hmac, email_enc,
        phone_enc, service_interest, message_enc,
        ip_hash, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'new')
     RETURNING id`,
    [
      nameEnc,
      companyEnc,
      designationEnc,
      emailHmacBuf,
      emailEnc,
      phoneEnc,
      data.serviceInterest.trim(),
      messageEnc,
      ipHashBuf,
    ],
  );

  return { id: res.rows[0].id };
}
