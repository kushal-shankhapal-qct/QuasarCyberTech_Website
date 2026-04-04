/**
 * xchacha.ts
 *
 * XChaCha20-Poly1305 authenticated encryption helpers used for:
 *   1. Decrypting ECDH-encrypted request payloads from the browser.
 *   2. Encrypting/decrypting PII fields stored at rest in PostgreSQL.
 *
 * Why XChaCha20-Poly1305?
 *   - 192-bit (24-byte) nonce eliminates the birthday-bound collision risk of
 *     the 96-bit nonce variant used in AES-GCM and standard ChaCha20.
 *   - Constant-time on all CPUs — no cache-timing side-channels.
 *   - Used in WireGuard, Signal Protocol, and libsodium's secretbox.
 *   - Far less common in web applications than AES-256-GCM, making payload
 *     structure non-obvious to passive observers.
 *
 * Why X25519 ECDH?
 *   - Each browser submission generates a fresh ephemeral keypair, yielding
 *     per-message forward secrecy: compromising the server key never reveals
 *     past submissions.
 *   - Key agreement via X25519 is the same DH function used in TLS 1.3 and
 *     the Signal double-ratchet, but applying it at the application layer
 *     (inside the HTTPS tunnel) gives an independent second layer of protection.
 */

import { xchacha20poly1305 } from '@noble/ciphers/chacha';
import { x25519 } from '@noble/curves/ed25519';
import { randomBytes } from '@noble/ciphers/webcrypto';
import { hkdf } from '@noble/hashes/hkdf';
import { sha3_256 } from '@noble/hashes/sha3';
import { hmac } from '@noble/hashes/hmac';
import { config } from '../config.js';

// ─── Byte-level helpers ───────────────────────────────────────────────────────

export const hexToBytes = (hex: string): Uint8Array => {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex string');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
};

export const bytesToHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

// ─── Lazy-loaded keys ─────────────────────────────────────────────────────────

let _serverPrivKey: Uint8Array | null = null;
let _dbKey: Uint8Array | null = null;
let _hmacKey: Uint8Array | null = null;

const serverPrivKey = (): Uint8Array =>
  (_serverPrivKey ??= hexToBytes(config.SERVER_ECDH_PRIVATE_KEY));

const dbKey = (): Uint8Array =>
  (_dbKey ??= hexToBytes(config.DB_ENCRYPTION_KEY));

const hmacKey = (): Uint8Array =>
  (_hmacKey ??= hexToBytes(config.EMAIL_HMAC_KEY));

// ─── Request payload decryption (X25519 ECDH + XChaCha20-Poly1305) ───────────

export interface EncryptedPayload {
  /** Hex-encoded ephemeral X25519 public key (32 bytes = 64 hex chars) */
  ephemeralPublicKey: string;
  /** Hex-encoded XChaCha20 nonce (24 bytes = 48 hex chars) */
  nonce: string;
  /** Hex-encoded ciphertext + Poly1305 tag (plaintext length + 16 bytes) */
  ciphertext: string;
}

/**
 * Decrypts a browser-encrypted payload.
 *
 * Protocol:
 *   sharedSecret = X25519(serverPrivKey, ephemeralPubKey)
 *   key          = HKDF-SHA3-256(sharedSecret, salt="qct-xchacha20", info="form-payload")
 *   plaintext    = XChaCha20-Poly1305.decrypt(key, nonce, ciphertext)
 */
export function decryptPayload(envelope: EncryptedPayload): string {
  const ephPub    = hexToBytes(envelope.ephemeralPublicKey);
  const nonce     = hexToBytes(envelope.nonce);
  const ciphertext = hexToBytes(envelope.ciphertext);

  const rawShared = x25519.getSharedSecret(serverPrivKey(), ephPub);

  // Derive a 32-byte key via HKDF so we never use the raw DH output directly.
  const key = hkdf(sha3_256, rawShared, 'qct-xchacha20', 'form-payload', 32);

  const cipher    = xchacha20poly1305(key, nonce);
  const plaintext = cipher.decrypt(ciphertext);

  return new TextDecoder().decode(plaintext);
}

// ─── DB field encryption (symmetric XChaCha20-Poly1305) ──────────────────────

const NONCE_BYTES = 24;

/**
 * Encrypts a plaintext string for storage in PostgreSQL.
 * Returns a Buffer: [24-byte nonce | ciphertext+tag].
 */
export function encryptField(plain: string): Buffer {
  const key       = dbKey();
  const nonce     = randomBytes(NONCE_BYTES);
  const cipher    = xchacha20poly1305(key, nonce);
  const encrypted = cipher.encrypt(new TextEncoder().encode(plain));

  const out = Buffer.allocUnsafe(NONCE_BYTES + encrypted.length);
  Buffer.from(nonce).copy(out, 0);
  Buffer.from(encrypted).copy(out, NONCE_BYTES);
  return out;
}

/**
 * Decrypts a DB field that was encrypted with encryptField().
 */
export function decryptField(blob: Buffer): string {
  const key        = dbKey();
  const nonce      = blob.subarray(0, NONCE_BYTES);
  const ciphertext = blob.subarray(NONCE_BYTES);
  const cipher     = xchacha20poly1305(key, new Uint8Array(nonce));
  const plain      = cipher.decrypt(new Uint8Array(ciphertext));
  return new TextDecoder().decode(plain);
}

// ─── Deterministic HMAC for email deduplication ───────────────────────────────

/**
 * Produces a keyed HMAC-SHA3-256 of a normalised email address.
 * Same email → same hash; hashes cannot be reversed without the HMAC key.
 * Used to enforce uniqueness in the newsletter table without storing raw emails.
 */
export function emailHmac(email: string): Buffer {
  const tag = hmac(sha3_256, hmacKey(), new TextEncoder().encode(email.toLowerCase().trim()));
  return Buffer.from(tag);
}

// ─── IP hashing ───────────────────────────────────────────────────────────────

/** One-way SHA3-256 hash of an IP address for rate-limit lookups. */
export function hashIp(ip: string): Buffer {
  return Buffer.from(sha3_256(new TextEncoder().encode(ip)));
}
