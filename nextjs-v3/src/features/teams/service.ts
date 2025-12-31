import { api } from '@/lib/axios';

export async function getTeams() {
  const response = await api.get('/teams');
  return response.data;
}
