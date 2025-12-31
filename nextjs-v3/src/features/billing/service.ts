import { api } from '@/lib/axios';

export async function getBillingStatus() {
  const response = await api.get('/billing');
  return response.data;
}
