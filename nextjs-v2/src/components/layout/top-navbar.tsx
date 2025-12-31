'use client';

import { signOut } from 'next-auth/react';

import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function TopNavbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <div>
        <p className="text-sm text-muted-foreground">Signed in as</p>
        <p className="text-sm font-medium">{user?.email}</p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" onClick={() => signOut({ callbackUrl: '/login' })}>
          Logout
        </Button>
      </div>
    </header>
  );
}
