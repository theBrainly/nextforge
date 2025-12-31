import { api } from '@/lib/axios';

export async function verifyEmail(token: string) {
  const response = await api.post('/auth/verify', { token });
  return response.data;
}
