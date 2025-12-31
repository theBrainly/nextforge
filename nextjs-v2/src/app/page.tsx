import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">NextJS V2 SaaS Starter</h1>
      <p className="max-w-2xl text-muted-foreground">
        Prisma + PostgreSQL + NextAuth + RBAC boilerplate for production-ready SaaS apps.
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
