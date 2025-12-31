import { RATE_LIMIT } from '@/lib/constants';
import { redis } from '@/lib/redis';

export async function rateLimit(key: string) {
  const fullKey = `ratelimit:${key}`;
  const hits = await redis.incr(fullKey);

  if (hits === 1) {
    await redis.expire(fullKey, RATE_LIMIT.windowSeconds);
  }

  return {
    success: hits <= RATE_LIMIT.requests,
    remaining: Math.max(0, RATE_LIMIT.requests - hits)
  };
}
