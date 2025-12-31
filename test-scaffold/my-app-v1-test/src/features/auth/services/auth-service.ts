import { SESSION_COOKIE } from '@/lib/constants';

import type { AuthInput } from '@/features/auth/types';
import type { User } from '@/types';

const getTokenFromEmail = (email: string) => Buffer.from(email).toString('base64url');

export async function login(input: AuthInput): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (!input.email || input.password.length < 6) {
    throw new Error('Invalid email or password.');
  }

  const token = getTokenFromEmail(input.email);
  document.cookie = `${SESSION_COOKIE}=${token}; path=/; max-age=86400; samesite=lax`;
  localStorage.setItem('session_token', token);

  const user: User = {
    id: token,
    name: input.email.split('@')[0],
    email: input.email
  };

  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export async function register(input: AuthInput): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!input.name || input.password.length < 6) {
    throw new Error('Name and password (min 6 chars) are required.');
  }

  return login(input);
}

export function logout() {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
  localStorage.removeItem('session_token');
  localStorage.removeItem('user');
}
