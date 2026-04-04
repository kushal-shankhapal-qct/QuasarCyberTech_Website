/**
 * keygen.ts
 *
 * One-time utility: generates the three secret keys required by the server
 * and prints the SERVER_ECDH_PUBLIC_KEY that must be embedded in the frontend.
 *
 * Usage:
 *   npm run keygen
 *
 * Copy the output into:
 *   server/.env          — SERVER_ECDH_PRIVATE_KEY, DB_ENCRYPTION_KEY, EMAIL_HMAC_KEY
 *   frontend .env        — VITE_SERVER_ECDH_PUBLIC_KEY
 *
 * IMPORTANT: Run this ONCE per deployment environment. The private keys must
 * never be committed to source control.
 */

import { x25519 } from '@noble/curves/ed25519';
import { randomBytes } from '@noble/ciphers/webcrypto';

const toHex = (b: Uint8Array) =>
  Array.from(b, (byte) => byte.toString(16).padStart(2, '0')).join('');

const privKey = x25519.utils.randomPrivateKey();
const pubKey  = x25519.getPublicKey(privKey);

const dbKey   = randomBytes(32);
const hmacKey = randomBytes(32);

console.log('\n══════════════════════════════════════════════════');
console.log('  QCTWeb API — Generated Secrets');
console.log('══════════════════════════════════════════════════\n');
console.log('Add these to server/.env:\n');
console.log(`SERVER_ECDH_PRIVATE_KEY=${toHex(privKey)}`);
console.log(`DB_ENCRYPTION_KEY=${toHex(dbKey)}`);
console.log(`EMAIL_HMAC_KEY=${toHex(hmacKey)}`);
console.log('\nAdd this to the frontend .env:\n');
console.log(`VITE_SERVER_ECDH_PUBLIC_KEY=${toHex(pubKey)}`);
console.log('\n══════════════════════════════════════════════════\n');
