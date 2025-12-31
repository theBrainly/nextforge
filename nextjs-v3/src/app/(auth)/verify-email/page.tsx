'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { verifyEmail } from '@/features/auth/service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const [token, setToken] = useState(params.get('token') ?? '');
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      await verifyEmail(token);
      toast.success('Email verified successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container flex min-h-screen items-center justify-center px-4 py-8">
      <section className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold">Verify Email</h1>
        <p className="mb-4 text-sm text-muted-foreground">Paste the token sent in your verification email.</p>
        <Input value={token} onChange={(event) => setToken(event.target.value)} />
        <Button className="mt-4 w-full" disabled={loading || !token} onClick={submit}>
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </section>
    </main>
  );
}
