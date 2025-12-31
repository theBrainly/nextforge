'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { ThemeProvider } from '@/components/layout/theme-provider';
import { ToastProvider } from '@/components/shared/toast-provider';
import { useUiStore } from '@/store';

function SessionBridge({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  const setActiveTeamId = useUiStore((state) => state.setActiveTeamId);

  useEffect(() => {
    if (data?.user?.activeTeamId) {
      setActiveTeamId(data.user.activeTeamId);
      localStorage.setItem('access_token', btoa(data.user.id));
    }
  }, [data?.user?.activeTeamId, data?.user?.id, setActiveTeamId]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <SessionBridge>
          {children}
          <ToastProvider />
        </SessionBridge>
      </ThemeProvider>
    </SessionProvider>
  );
}
