import crypto from 'crypto';

// Use AUTH_SECRET as the secret, ensure it's 32 bytes or pad/slice it.
// If AUTH_SECRET is not set or short, we handle it responsibly.
// Ideally, use a dedicated AUTH_SECRET for encryption.
const SECRET_KEY = process.env.AUTH_SECRET || 'default-secret-key-change-me-please';
const KEY = crypto.scryptSync(SECRET_KEY, 'salt', 32); 
const ALGORITHM = 'aes-256-cbc';

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(text: string): string {
  const [ivHex, encryptedHex] = text.split(':');
  if (!ivHex || !encryptedHex) {
    throw new Error('Invalid encrypted text format');
  }
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
