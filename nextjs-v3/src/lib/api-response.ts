import { NextResponse } from 'next/server';

import type { ApiResponse } from '@/types';

export function ok<T>(message: string, data: T, status = 200) {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    data
  };

  return NextResponse.json(payload, { status });
}

export function fail(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
      data: null
    },
    { status }
  );
}
