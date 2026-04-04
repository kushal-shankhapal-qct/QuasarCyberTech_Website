-- ══════════════════════════════════════════════════════════════════════════════
-- QCTWeb Database Initialisation Script
-- Database: qctweb
--
-- Run on VPS:
--   psql -U <superuser> -d qctweb -f 001_init.sql
--
-- Notes on encryption:
--   All BYTEA columns that hold PII (email_enc, name_enc, phone_enc, etc.)
--   contain XChaCha20-Poly1305 ciphertext generated server-side.
--   The format is: [24-byte nonce || ciphertext || 16-byte Poly1305 tag].
--
--   email_hmac columns hold HMAC-SHA3-256(email, HMAC_KEY), used solely for
--   uniqueness enforcement and lookup without storing or revealing plaintext.
--
--   ip_hash columns hold SHA3-256(ip_address) for rate-limit queries.
-- ══════════════════════════════════════════════════════════════════════════════

-- Enable uuid generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── newsletter ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS newsletter (
    id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Deterministic HMAC-SHA3-256 of the normalised email.
    -- Used for deduplication via UNIQUE constraint without storing plaintext.
    email_hmac   BYTEA       NOT NULL,

    -- XChaCha20-Poly1305 encrypted email address.
    email_enc    BYTEA       NOT NULL,

    -- XChaCha20-Poly1305 encrypted name (nullable — name is optional).
    name_enc     BYTEA,

    -- SHA3-256 hash of subscriber IP — for rate limiting only.
    ip_hash      BYTEA       NOT NULL,

    -- Identifies which subscribe widget was used.
    source       VARCHAR(30) NOT NULL DEFAULT 'sidebar'
                             CHECK (source IN ('sidebar', 'footer', 'overview')),

    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT newsletter_email_hmac_unique UNIQUE (email_hmac)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_ip_hash    ON newsletter (ip_hash);
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter (created_at DESC);

COMMENT ON TABLE  newsletter              IS 'Newsletter subscriber list. All PII fields are XChaCha20-Poly1305 encrypted.';
COMMENT ON COLUMN newsletter.email_hmac   IS 'HMAC-SHA3-256 of normalised email. Enables uniqueness check without decryption.';
COMMENT ON COLUMN newsletter.email_enc    IS 'XChaCha20-Poly1305 ciphertext: [24B nonce | ciphertext | 16B tag].';
COMMENT ON COLUMN newsletter.name_enc     IS 'XChaCha20-Poly1305 ciphertext of subscriber display name (optional).';
COMMENT ON COLUMN newsletter.ip_hash      IS 'SHA3-256 of submitting IP for rate-limit enforcement only.';

-- ─── contact_submissions ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS contact_submissions (
    id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Encrypted PII fields
    name_enc          BYTEA       NOT NULL,
    company_enc       BYTEA       NOT NULL,
    designation_enc   BYTEA       NOT NULL,

    -- Deterministic HMAC for lookup/dedup if needed (does not enforce UNIQUE
    -- here — multiple contact requests from same email are valid).
    email_hmac        BYTEA       NOT NULL,
    email_enc         BYTEA       NOT NULL,

    phone_enc         BYTEA       NOT NULL,

    -- Service interest is not PII — stored in plain text for filtering/reporting.
    service_interest  VARCHAR(100) NOT NULL,

    message_enc       BYTEA       NOT NULL,

    -- SHA3-256 hash of submitting IP — for rate limiting only.
    ip_hash           BYTEA       NOT NULL,

    -- Workflow status for CRM-style triage.
    status            VARCHAR(20) NOT NULL DEFAULT 'new'
                                  CHECK (status IN ('new', 'read', 'in_progress', 'responded', 'closed')),

    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contact_ip_hash       ON contact_submissions (ip_hash);
CREATE INDEX IF NOT EXISTS idx_contact_created_at    ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_email_hmac    ON contact_submissions (email_hmac);
CREATE INDEX IF NOT EXISTS idx_contact_status        ON contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_contact_service       ON contact_submissions (service_interest);

COMMENT ON TABLE  contact_submissions                    IS 'Contact form submissions. All PII fields are XChaCha20-Poly1305 encrypted.';
COMMENT ON COLUMN contact_submissions.email_hmac         IS 'HMAC-SHA3-256 of normalised email for lookup without decryption.';
COMMENT ON COLUMN contact_submissions.service_interest   IS 'Non-PII selected service — stored in plaintext for reporting.';
COMMENT ON COLUMN contact_submissions.ip_hash            IS 'SHA3-256 of submitting IP for rate-limit enforcement only.';
COMMENT ON COLUMN contact_submissions.status             IS 'Workflow state: new → read → in_progress → responded / closed.';
