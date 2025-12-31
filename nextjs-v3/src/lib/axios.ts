import axios, { type AxiosError } from 'axios';

import { publicEnv } from '@/lib/env';

export const api = axios.create({
  baseURL: publicEnv.NEXT_PUBLIC_API_URL,
  timeout: 10000
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) =>
    Promise.reject(new Error(error.response?.data?.message ?? 'API request failed'))
);
