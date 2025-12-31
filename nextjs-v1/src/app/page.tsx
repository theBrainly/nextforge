import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold">Next.js V1 Starter</h1>
      <p className="max-w-xl text-muted-foreground">
        App Router + TypeScript + Tailwind starter with authentication UI, protected dashboard,
        validation, state management, and API utilities.
      </p>
      <div className="flex gap-2">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">Register</Button>
        </Link>
      </div>
    </main>
  );
}
