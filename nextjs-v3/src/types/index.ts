import type { GlobalRole, TeamRole } from '@prisma/client';

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  globalRole: GlobalRole;
  activeTeamId?: string;
};

export type TeamMemberView = {
  id: string;
  name: string | null;
  email: string;
  role: TeamRole;
};
