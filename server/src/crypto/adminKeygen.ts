/**
 * adminKeygen.ts
 *
 * Generates all secrets required by the admin portal.
 *
 * Usage:
 *   npm run admin:keygen
 *
 * You will be prompted for a password. Copy the output into server/.env.
 */

import { randomBytes, scryptSync } from 'crypto';
import * as readline from 'readline';

const toHex = (b: Buffer | Uint8Array) => Buffer.from(b).toString('hex');

// ─── Base32 encode (RFC 4648) — for TOTP secret ───────────────────────────────

function base32Encode(buf: Buffer): string {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = 0, val = 0, out = '';
  for (const byte of buf) {
    val = (val << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += alpha[(val >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += alpha[(val << (5 - bits)) & 31];
  return out;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Enter admin password: ', (password) => {
  rl.close();

  if (!password || password.length < 8) {
    console.error('\nError: Password must be at least 8 characters.\n');
    process.exit(1);
  }

  // scrypt hash (N=65536 requires maxmem > 32 MB)
  const salt = randomBytes(32);
  const dk   = scryptSync(password, salt, 64, {
    N: 65536, r: 8, p: 1,
    maxmem: 128 * 1024 * 1024,
  });
  const passwordHash = `${salt.toString('hex')}:${dk.toString('hex')}`;

  const jwtSecret  = toHex(randomBytes(32));
  const totpSecret = base32Encode(randomBytes(20)); // 160-bit TOTP secret

  const issuer  = 'QuasarCyberTech';
  const account = 'admin';
  const otpauthUri = `otpauth://totp/${encodeURIComponent(issuer)}:${account}?secret=${totpSecret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;

  console.log('\n══════════════════════════════════════════════════════════════');
  console.log('  QCTWeb Admin — Generated Secrets');
  console.log('══════════════════════════════════════════════════════════════\n');
  console.log('Add these to server/.env:\n');
  console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`);
  console.log(`ADMIN_JWT_SECRET=${jwtSecret}`);
  console.log(`ADMIN_TOTP_SECRET=${totpSecret}`);
  console.log('\n──────────────────────────────────────────────────────────────');
  console.log('  2FA Setup — scan this URI with Google Authenticator');
  console.log('  (or use a QR code generator with the URI below)\n');
  console.log(otpauthUri);
  console.log('\n  To generate a QR code in the terminal (if qrencode is installed):');
  console.log(`  qrencode -t UTF8 '${otpauthUri}'`);
  console.log('\n══════════════════════════════════════════════════════════════\n');
  console.log('IMPORTANT: Never commit these values to source control.\n');
});
