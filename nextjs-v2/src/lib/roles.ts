import type { Role } from '@prisma/client';

export function isAdmin(role: Role) {
  return role === 'ADMIN';
}

export function canAccessUsers(role: Role) {
  return isAdmin(role);
}
