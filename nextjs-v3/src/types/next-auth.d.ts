import type { DefaultSession } from 'next-auth';
import type { GlobalRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      globalRole: GlobalRole;
      activeTeamId?: string;
    };
  }

  interface User {
    id: string;
    globalRole: GlobalRole;
    activeTeamId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    globalRole: GlobalRole;
    activeTeamId?: string;
  }
}
