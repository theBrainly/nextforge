import type { Role } from '@prisma/client';

export type UserSession = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
