import { randomBytes } from 'crypto';

export function generateToken(size = 24) {
  return randomBytes(size).toString('hex');
}
