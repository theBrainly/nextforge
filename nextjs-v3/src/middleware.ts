import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { RATE_LIMIT } from '@/lib/constants';

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function applyEdgeRateLimit(key: string) {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT.windowSeconds * 1000
    });

    return true;
  }

  existing.count += 1;
  buckets.set(key, existing);

  return existing.count <= RATE_LIMIT.requests;
}

function isProtectedPath(pathname: string) {
  return (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/billing') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/team')
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.ip ?? '127.0.0.1';

  if (pathname.startsWith('/api') && !pathname.startsWith('/api/health') && !pathname.startsWith('/api/stripe/webhook')) {
    const allowed = applyEdgeRateLimit(`${ip}:${pathname}`);

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests',
          data: null
        },
        { status: 429 }
      );
    }
  }

  if (isProtectedPath(pathname)) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname.startsWith('/team')) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.activeTeamId) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/billing/:path*', '/settings/:path*', '/team/:path*', '/api/:path*']
};
