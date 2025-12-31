'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { ThemeProvider } from '@/components/layout/theme-provider';
import { ToastProvider } from '@/components/shared/toast-provider';

function AccessTokenBridge({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  useEffect(() => {
    if (!data?.user?.id) {
      localStorage.removeItem('access_token');
      return;
    }

    const token = btoa(data.user.id);
    localStorage.setItem('access_token', token);
  }, [data?.user?.id]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AccessTokenBridge>
          {children}
          <ToastProvider />
        </AccessTokenBridge>
      </ThemeProvider>
    </SessionProvider>
  );
}
