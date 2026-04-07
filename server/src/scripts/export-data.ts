/**
 * export-data.ts
 *
 * Decrypts all rows from both `newsletter` and `contact_submissions`,
 * builds two CSV files in-memory, and emails them as attachments to
 * the configured NOTIFY_EMAIL address.
 *
 * Usage (via shell script):
 *   cd server && npx tsx src/scripts/export-data.ts
 */

import 'dotenv/config';
import pg from 'pg';
import nodemailer from 'nodemailer';
import { config } from '../config.js';
import { decryptField, emailHmac } from '../crypto/xchacha.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: config.DATABASE_URL,
  ssl: config.DATABASE_URL.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
});

// ─── CSV helpers ──────────────────────────────────────────────────────────────

const esc = (v: string | null | undefined): string => {
  if (v == null) return '';
  const s = String(v);
  return s.includes(',') || s.includes('"') || s.includes('\n')
    ? `"${s.replace(/"/g, '""')}"`
    : s;
};

const csvRow = (...cols: (string | null | undefined)[]): string =>
  cols.map(esc).join(',');

// ─── Decrypt a bytea buffer safely ───────────────────────────────────────────

function tryDecrypt(buf: Buffer | null): string {
  if (!buf) return '';
  try {
    return decryptField(buf);
  } catch {
    return '[decryption failed]';
  }
}

// ─── Newsletter export ────────────────────────────────────────────────────────

interface NewsletterRow {
  id: string;
  email_enc: Buffer;
  name_enc: Buffer | null;
  source: string;
  created_at: Date;
}

async function exportNewsletter(): Promise<string> {
  const res = await pool.query<NewsletterRow>(
    `SELECT id, email_enc, name_enc, source, created_at
     FROM newsletter
     ORDER BY created_at DESC`,
  );

  const header = csvRow('ID', 'Email', 'Name', 'Source', 'Subscribed At');
  const rows   = res.rows.map((r) =>
    csvRow(
      r.id,
      tryDecrypt(r.email_enc),
      tryDecrypt(r.name_enc),
      r.source,
      new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    ),
  );

  console.log(`  newsletter: ${res.rows.length} rows`);
  return [header, ...rows].join('\n');
}

// ─── Contact submissions export ───────────────────────────────────────────────

interface ContactRow {
  id: string;
  name_enc: Buffer;
  company_enc: Buffer;
  designation_enc: Buffer;
  email_enc: Buffer;
  phone_enc: Buffer;
  service_interest: string;
  message_enc: Buffer;
  status: string;
  created_at: Date;
}

async function exportContact(): Promise<string> {
  const res = await pool.query<ContactRow>(
    `SELECT id, name_enc, company_enc, designation_enc,
            email_enc, phone_enc, service_interest,
            message_enc, status, created_at
     FROM contact_submissions
     ORDER BY created_at DESC`,
  );

  const header = csvRow(
    'ID', 'Full Name', 'Company', 'Designation',
    'Email', 'Phone', 'Service Interest',
    'Message', 'Status', 'Submitted At',
  );

  const rows = res.rows.map((r) =>
    csvRow(
      r.id,
      tryDecrypt(r.name_enc),
      tryDecrypt(r.company_enc),
      tryDecrypt(r.designation_enc),
      tryDecrypt(r.email_enc),
      tryDecrypt(r.phone_enc),
      r.service_interest,
      tryDecrypt(r.message_enc),
      r.status,
      new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    ),
  );

  console.log(`  contact_submissions: ${res.rows.length} rows`);
  return [header, ...rows].join('\n');
}

// ─── Send email ───────────────────────────────────────────────────────────────

async function sendExport(newsletterCsv: string, contactCsv: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host:   config.SMTP_HOST,
    port:   config.SMTP_PORT,
    secure: config.SMTP_PORT === 465,
    auth:   { user: config.SMTP_USER, pass: config.SMTP_PASS },
    tls:    { rejectUnauthorized: config.NODE_ENV === 'production' },
  });

  const now     = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const dateTag = new Date().toISOString().slice(0, 10);

  await transporter.sendMail({
    from:    `"QuasarCyberTech Export" <${config.SMTP_USER}>`,
    to:      config.NOTIFY_EMAIL,
    subject: `[QCT Data Export] Newsletter + Contact Submissions — ${dateTag}`,
    text: `QCTWeb data export generated on ${now} (IST).\n\nSee attached CSV files.\n\n© 2024 – Present, QuasarCyberTech`,
    html: `
      <!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
      <body style="font-family:Arial,sans-serif;background:#F4F5F7;padding:40px 16px;margin:0;">
        <table width="560" cellpadding="0" cellspacing="0" border="0"
               style="max-width:560px;margin:0 auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <tr><td style="height:5px;background:#6B1530;"></td></tr>
          <tr>
            <td style="padding:32px 40px 24px;">
              <img src="https://res.cloudinary.com/dmdpzphcz/image/upload/f_auto,q_auto/Logos/QuasarCyberTech/fulllogo_transparent_nobuffer"
                   alt="QuasarCyberTech" width="160" height="auto" style="display:block;margin-bottom:28px;" />
              <h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#111827;">Data Export</h2>
              <p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.7;">
                Generated on <strong>${now} IST</strong>.<br/>
                Two CSV files are attached — newsletter subscribers and contact submissions, fully decrypted.
              </p>
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:3px;padding:10px 18px;font-size:13px;color:#374151;">
                    📎 &nbsp;<strong>newsletter_${dateTag}.csv</strong>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:3px;padding:10px 18px;font-size:13px;color:#374151;">
                    📎 &nbsp;<strong>contact_submissions_${dateTag}.csv</strong>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:12px;color:#9CA3AF;">Handle this data in accordance with your data retention and privacy policies.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#F9FAFB;border-top:1px solid #E5E7EB;padding:14px 40px;">
              <p style="margin:0;font-size:11px;color:#9CA3AF;">&copy; 2024 &ndash; Present, QuasarCyberTech</p>
            </td>
          </tr>
        </table>
      </body></html>`,
    attachments: [
      {
        filename:    `newsletter_${dateTag}.csv`,
        content:     newsletterCsv,
        contentType: 'text/csv; charset=utf-8',
      },
      {
        filename:    `contact_submissions_${dateTag}.csv`,
        content:     contactCsv,
        contentType: 'text/csv; charset=utf-8',
      },
    ],
  });

  console.log(`  Email sent to ${config.NOTIFY_EMAIL}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('\nQCTWeb Data Export');
  console.log('══════════════════');

  try {
    console.log('\nDecrypting tables...');
    const [newsletterCsv, contactCsv] = await Promise.all([
      exportNewsletter(),
      exportContact(),
    ]);

    console.log('\nSending email...');
    await sendExport(newsletterCsv, contactCsv);

    console.log('\nDone.\n');
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error('\nExport failed:', err.message);
  process.exit(1);
});
