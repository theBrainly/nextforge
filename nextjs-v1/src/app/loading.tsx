import { LoadingSkeleton } from '@/components/shared/loading-skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 p-6">
      <LoadingSkeleton className="h-10 w-48" />
      <LoadingSkeleton className="h-32 w-full" />
      <LoadingSkeleton className="h-32 w-full" />
    </div>
  );
}
