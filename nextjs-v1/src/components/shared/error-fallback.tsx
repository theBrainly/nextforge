'use client';

import { Button } from '@/components/ui/button';

type ErrorFallbackProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorFallback({ message, onRetry }: ErrorFallbackProps) {
  return (
    <div className="rounded-lg border p-6 text-center">
      <p className="mb-4 text-sm text-red-500">{message}</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}
