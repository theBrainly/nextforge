import Stripe from 'stripe';

import { fail, ok } from '@/lib/api-response';
import { handleApiError } from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { serverEnv } from '@/lib/env';

function toDate(epoch?: number | null) {
  return epoch ? new Date(epoch * 1000) : null;
}

export async function POST(request: Request) {
  try {
    if (!serverEnv?.STRIPE_WEBHOOK_SECRET) {
      return fail('Stripe webhook secret is missing', 500);
    }

    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return fail('Missing Stripe signature', 400);
    }

    const body = await request.text();

    const event = stripe.webhooks.constructEvent(body, signature, serverEnv.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.subscription || !session.customer_email) {
        return ok('Webhook received', { processed: false });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.customer_email
        }
      });

      if (!user) {
        return ok('Webhook received without user', { processed: false });
      }

      const subscription = await stripe.subscriptions.retrieve(String(session.subscription));

      await prisma.subscription.upsert({
        where: {
          stripeSubscriptionId: subscription.id
        },
        update: {
          stripeCustomerId: String(subscription.customer),
          stripePriceId: subscription.items.data[0]?.price.id,
          status: subscription.status === 'active' ? 'ACTIVE' : 'TRIALING',
          currentPeriodEnd: toDate(subscription.current_period_end)
        },
        create: {
          userId: user.id,
          teamId: null,
          stripeCustomerId: String(subscription.customer),
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price.id,
          status: subscription.status === 'active' ? 'ACTIVE' : 'TRIALING',
          currentPeriodEnd: toDate(subscription.current_period_end)
        }
      });
    }

    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : null;

      if (subscriptionId) {
        const subscription = await prisma.subscription.findUnique({
          where: {
            stripeSubscriptionId: subscriptionId
          }
        });

        await prisma.payment.create({
          data: {
            userId: subscription?.userId ?? null,
            subscriptionId: subscription?.id ?? null,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'SUCCEEDED',
            stripePaymentIntentId:
              typeof invoice.payment_intent === 'string' ? invoice.payment_intent : null
          }
        });
      }
    }

    return ok('Webhook processed', { received: true });
  } catch (error) {
    return handleApiError(error);
  }
}
