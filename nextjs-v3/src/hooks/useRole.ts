'use client';

import { useSession } from 'next-auth/react';

export function useRole() {
  const { data } = useSession();
  return data?.user.globalRole;
}
