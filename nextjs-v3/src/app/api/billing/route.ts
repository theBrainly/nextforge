import { fail, ok } from '@/lib/api-response';
import { getServerAuthSession } from '@/lib/auth';
import { handleApiError } from '@/lib/error-handler';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { serverEnv } from '@/lib/env';

export async function GET() {
  try {
    const session = await getServerAuthSession();

    if (!session?.user) {
      return fail('Unauthorized', 401);
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return ok('Billing status fetched', {
      status: subscription?.status ?? 'TRIALING',
      currentPeriodEnd: subscription?.currentPeriodEnd
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session?.user || !session.user.email) {
      return fail('Unauthorized', 401);
    }

    if (!serverEnv?.STRIPE_SECRET_KEY || !serverEnv.STRIPE_PRICE_ID_PRO) {
      return fail('Stripe is not configured', 500);
    }

    const body = (await request.json()) as { action?: 'checkout' | 'portal' };

    if (body.action === 'checkout') {
      const checkout = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: session.user.email,
        line_items: [{ price: serverEnv.STRIPE_PRICE_ID_PRO, quantity: 1 }],
        success_url: `${serverEnv.NEXTAUTH_URL}/billing?checkout=success`,
        cancel_url: `${serverEnv.NEXTAUTH_URL}/billing?checkout=cancel`
      });

      await logAudit({
        actorId: session.user.id,
        teamId: session.user.activeTeamId,
        action: 'CHECKOUT_STARTED',
        targetType: 'BILLING'
      });

      return ok('Checkout session created', { url: checkout.url });
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!subscription?.stripeCustomerId) {
      return fail('No Stripe customer found for portal access', 404);
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${serverEnv.NEXTAUTH_URL}/billing`
    });

    return ok('Billing portal created', { url: portal.url });
  } catch (error) {
    return handleApiError(error);
  }
}
