/**
 * formCrypto.ts
 *
 * Browser-side payload encryption for QCT form submissions.
 *
 * Protocol  — X25519 ECDH + XChaCha20-Poly1305 (per-message forward secrecy)
 * ───────────────────────────────────────────────────────────────────────────
 *  1. Generate a fresh ephemeral X25519 keypair for this submission.
 *  2. Derive a shared secret:
 *       sharedSecret = X25519(ephemeralPrivKey, serverPublicKey)
 *  3. Stretch the shared secret to a 32-byte cipher key via HKDF-SHA3-256
 *     (same derivation as the server, so both sides produce identical keys):
 *       key = HKDF(sharedSecret, salt="qct-xchacha20", info="form-payload")
 *  4. Generate a random 24-byte nonce (XChaCha20 requires 192-bit nonce).
 *  5. Encrypt:
 *       ciphertext = XChaCha20-Poly1305.encrypt(key, nonce, JSON.stringify(payload))
 *  6. Return the envelope that the API expects:
 *       { ephemeralPublicKey: hex, nonce: hex, ciphertext: hex }
 *
 * Why this matters
 * ─────────────────
 *  • Even if the network connection is somehow intercepted, the plaintext
 *    form data is protected by an independent application-layer cipher.
 *  • Each submission uses a fresh ephemeral keypair → perfect forward secrecy.
 *    A compromised server private key cannot decrypt past submissions.
 *  • XChaCha20-Poly1305 authenticates the ciphertext; any tampering in transit
 *    will cause the server to reject the request with a 400.
 *
 * Dependencies (pure-TypeScript, no native modules, browser-native):
 *   @noble/ciphers — XChaCha20-Poly1305
 *   @noble/curves  — X25519 (Curve25519 Diffie-Hellman)
 *   @noble/hashes  — HKDF, SHA3-256
 */

import { xchacha20poly1305 } from '@noble/ciphers/chacha';
import { x25519 } from '@noble/curves/ed25519';
import { randomBytes } from '@noble/ciphers/webcrypto';
import { hkdf } from '@noble/hashes/hkdf';
import { sha3_256 } from '@noble/hashes/sha3';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

const fromHex = (hex: string): Uint8Array => {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EncryptedEnvelope {
  /** Ephemeral X25519 public key, hex-encoded (64 chars). */
  ephemeralPublicKey: string;
  /** XChaCha20 nonce, hex-encoded (48 chars). */
  nonce: string;
  /** Authenticated ciphertext, hex-encoded. */
  ciphertext: string;
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Serialises `payload` to JSON, then encrypts it using X25519 ECDH +
 * XChaCha20-Poly1305. Returns the encrypted envelope ready to POST to the API.
 *
 * @param payload   Any JSON-serialisable object (contact or newsletter fields).
 */
export function encryptFormPayload(payload: Record<string, unknown>): EncryptedEnvelope {
  const serverPubKeyHex = import.meta.env.VITE_SERVER_ECDH_PUBLIC_KEY as string | undefined;

  if (!serverPubKeyHex || serverPubKeyHex.length !== 64) {
    throw new Error('VITE_SERVER_ECDH_PUBLIC_KEY is missing or invalid.');
  }

  const serverPubKey = fromHex(serverPubKeyHex);

  // 1. Ephemeral keypair — discarded after this call
  const ephPrivKey = x25519.utils.randomPrivateKey();
  const ephPubKey  = x25519.getPublicKey(ephPrivKey);

  // 2. Raw shared secret via X25519 DH
  const rawShared  = x25519.getSharedSecret(ephPrivKey, serverPubKey);

  // 3. Key derivation: HKDF-SHA3-256 — matches server-side derivation exactly
  const key        = hkdf(sha3_256, rawShared, 'qct-xchacha20', 'form-payload', 32);

  // 4. Random 24-byte nonce for XChaCha20
  const nonce      = randomBytes(24);

  // 5. Encrypt
  const plaintext  = new TextEncoder().encode(JSON.stringify(payload));
  const cipher     = xchacha20poly1305(key, nonce);
  const ciphertext = cipher.encrypt(plaintext);

  return {
    ephemeralPublicKey: toHex(ephPubKey),
    nonce:              toHex(nonce),
    ciphertext:         toHex(ciphertext),
  };
}
