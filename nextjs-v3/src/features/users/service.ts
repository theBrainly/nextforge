import { api } from '@/lib/axios';

export async function getCurrentUser() {
  const response = await api.get('/users');
  return response.data;
}
