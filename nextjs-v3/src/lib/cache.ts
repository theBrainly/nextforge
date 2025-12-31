import { redis } from '@/lib/redis';

export async function cacheGet<T>(key: string): Promise<T | null> {
  const value = await redis.get(key);
  return value ? (JSON.parse(value) as T) : null;
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 60) {
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
}

export async function withCache<T>(key: string, fetcher: () => Promise<T>, ttlSeconds = 60) {
  const cached = await cacheGet<T>(key);
  if (cached) {
    return cached;
  }

  const fresh = await fetcher();
  await cacheSet(key, fresh, ttlSeconds);
  return fresh;
}
