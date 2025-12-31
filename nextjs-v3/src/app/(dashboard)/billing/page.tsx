import { BillingForm } from '@/components/forms/billing-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function BillingPage() {
  const session = await getServerAuthSession();
  const subscription = session?.user
    ? await prisma.subscription.findFirst({
        where: {
          userId: session.user.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Current subscription status: {subscription?.status ?? 'TRIALING'}
        </p>
        <BillingForm />
      </CardContent>
    </Card>
  );
}
