import { LoadingSkeleton } from '@/components/shared/loading-skeleton';

export default function Loading() {
  return (
    <div className="container space-y-4 py-8">
      <LoadingSkeleton className="h-8 w-64" />
      <LoadingSkeleton className="h-28 w-full" />
      <LoadingSkeleton className="h-28 w-full" />
    </div>
  );
}
