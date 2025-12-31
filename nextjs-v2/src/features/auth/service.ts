import { api } from '@/lib/axios';

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(payload: RegisterInput) {
  const response = await api.post('/register', payload);
  return response.data;
}
