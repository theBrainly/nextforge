import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">Launch your SaaS faster</h1>
      <p className="max-w-2xl text-muted-foreground">
        Founder-grade Next.js stack with auth, billing, multi-tenancy, Redis, and operational guardrails
        built in.
      </p>
      <div className="flex gap-2">
        <Link href="/register">
          <Button>Start Free</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </main>
  );
}
