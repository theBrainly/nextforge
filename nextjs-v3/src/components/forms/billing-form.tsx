'use client';

import { toast } from 'sonner';

import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';

export function BillingForm() {
  async function startCheckout() {
    const response = await api.post('/billing', { action: 'checkout' });
    const checkoutUrl = response.data?.data?.url as string | undefined;

    if (!checkoutUrl) {
      toast.error('Unable to open Stripe checkout');
      return;
    }

    window.location.href = checkoutUrl;
  }

  async function openPortal() {
    const response = await api.post('/billing', { action: 'portal' });
    const portalUrl = response.data?.data?.url as string | undefined;

    if (!portalUrl) {
      toast.error('Unable to open billing portal');
      return;
    }

    window.location.href = portalUrl;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={startCheckout}>Start Pro Subscription</Button>
      <Button variant="outline" onClick={openPortal}>
        Open Billing Portal
      </Button>
    </div>
  );
}
