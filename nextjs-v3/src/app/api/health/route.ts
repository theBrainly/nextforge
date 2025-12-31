import { ok } from '@/lib/api-response';
import { redis } from '@/lib/redis';

export async function GET() {
  let redisStatus = 'unavailable';

  try {
    await redis.ping();
    redisStatus = 'ok';
  } catch {
    redisStatus = 'error';
  }

  return ok('Health check passed', {
    status: 'ok',
    service: 'nextjs-v3',
    redis: redisStatus,
    timestamp: new Date().toISOString()
  });
}
