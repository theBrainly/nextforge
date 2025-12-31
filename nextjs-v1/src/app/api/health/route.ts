import { NextResponse } from 'next/server';

import type { ApiResponse } from '@/types';

type HealthData = {
  status: 'ok';
  service: string;
  timestamp: string;
};

export async function GET() {
  const payload: ApiResponse<HealthData> = {
    success: true,
    message: 'Health check passed',
    data: {
      status: 'ok',
      service: 'nextjs-v1',
      timestamp: new Date().toISOString()
    }
  };

  return NextResponse.json(payload);
}
