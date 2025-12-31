import type { GlobalRole, TeamRole } from '@prisma/client';

export function canManageUsers(role: GlobalRole) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export function canManageBilling(role: GlobalRole) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export function canInviteToTeam(role: TeamRole) {
  return role === 'OWNER' || role === 'ADMIN';
}
