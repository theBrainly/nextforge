import Redis from 'ioredis';

import { serverEnv } from '@/lib/env';

declare global {
  // eslint-disable-next-line no-var
  var redisClient: Redis | undefined;
}

export const redis =
  global.redisClient ??
  new Redis(serverEnv?.REDIS_URL ?? 'redis://localhost:6379', {
    lazyConnect: true,
    maxRetriesPerRequest: 1
  });

if (process.env.NODE_ENV !== 'production') {
  global.redisClient = redis;
}
