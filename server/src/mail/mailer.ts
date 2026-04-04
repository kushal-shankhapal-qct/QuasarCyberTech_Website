import nodemailer from 'nodemailer';
import { config } from '../config.js';
import { contactUserHtml, contactUserText } from './templates/contact-user.js';
import { contactAdminHtml, contactAdminText } from './templates/contact-admin.js';
import { newsletterUserHtml, newsletterUserText } from './templates/newsletter-user.js';
import { newsletterAdminHtml, newsletterAdminText } from './templates/newsletter-admin.js';
import type { ContactPayload, NewsletterPayload } from '../validation/schemas.js';

// ─── Transporter ──────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_PORT === 465,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: config.NODE_ENV === 'production',
  },
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
});

const FROM = `"QuasarCyberTech" <${config.SMTP_USER}>`;

// ─── Send helpers ─────────────────────────────────────────────────────────────

export async function sendContactEmails(
  data: ContactPayload,
  submissionId: string,
): Promise<void> {
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 1. Confirmation to the person who submitted
  await transporter.sendMail({
    from: FROM,
    to: data.workEmail,
    subject: 'We received your message — QuasarCyberTech',
    text: contactUserText(data.fullName, data.serviceInterest),
    html: contactUserHtml(data.fullName, data.serviceInterest),
  });

  // 2. Full details to admin
  await transporter.sendMail({
    from: FROM,
    to: config.NOTIFY_EMAIL,
    subject: `[QCT Lead] ${data.fullName} · ${data.companyName} — ${data.serviceInterest}`,
    text: contactAdminText({
      name: data.fullName,
      company: data.companyName,
      role: data.role,
      email: data.workEmail,
      phone: data.phone,
      service: data.serviceInterest,
      message: data.message,
      submissionId,
      submittedAt,
    }),
    html: contactAdminHtml({
      name: data.fullName,
      company: data.companyName,
      role: data.role,
      email: data.workEmail,
      phone: data.phone,
      service: data.serviceInterest,
      message: data.message,
      submissionId,
      submittedAt,
    }),
  });
}

export async function sendNewsletterEmails(
  data: NewsletterPayload,
  submissionId: string,
): Promise<void> {
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  // 1. Welcome email to subscriber
  await transporter.sendMail({
    from: FROM,
    to: data.email,
    subject: 'Welcome to QCT Intelligence — QuasarCyberTech',
    text: newsletterUserText(data.name),
    html: newsletterUserHtml(data.name),
  });

  // 2. Admin notification
  await transporter.sendMail({
    from: FROM,
    to: config.NOTIFY_EMAIL,
    subject: `[QCT Newsletter] New subscriber: ${data.email}`,
    text: newsletterAdminText({
      email: data.email,
      name: data.name,
      source: data.source,
      submissionId,
      submittedAt,
    }),
    html: newsletterAdminHtml({
      email: data.email,
      name: data.name,
      source: data.source,
      submissionId,
      submittedAt,
    }),
  });
}
