import { ok } from '@/lib/api-response';

export async function GET() {
  return ok('Health check passed', {
    status: 'ok',
    service: 'nextjs-v2',
    timestamp: new Date().toISOString()
  });
}
