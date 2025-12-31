'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ThemeToggle } from '@/components/layout/theme-toggle';
import { ProfileForm } from '@/components/forms/profile-form';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: Props) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div>
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="font-medium">{user?.email ?? 'guest@example.com'}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" onClick={() => setOpen(true)}>
              Edit Profile
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                signOut();
                router.push('/login');
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4">{children}</main>
      <Modal open={open} title="Profile Settings" onClose={() => setOpen(false)}>
        <ProfileForm />
      </Modal>
    </div>
  );
}
