import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function MarketingPage() {
  return (
    <main className="container py-20">
      <div className="mx-auto max-w-4xl space-y-6 text-center">
        <Badge className="mx-auto">Founder Grade</Badge>
        <h1 className="text-5xl font-semibold tracking-tight">Monetization-ready SaaS architecture</h1>
        <p className="text-lg text-muted-foreground">
          Multi-tenant foundations, Stripe subscriptions, Redis-backed runtime systems, and strong auth
          defaults.
        </p>
        <div className="flex justify-center gap-2">
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">View Dashboard</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
