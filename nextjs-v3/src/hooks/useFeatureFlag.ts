'use client';

import { isFeatureEnabled } from '@/lib/feature-flags';

export function useFeatureFlag(flag: Parameters<typeof isFeatureEnabled>[0]) {
  return isFeatureEnabled(flag);
}
