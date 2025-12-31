import { z } from 'zod';

import { fail, ok } from '@/lib/api-response';
import { getServerAuthSession } from '@/lib/auth';
import { handleApiError } from '@/lib/error-handler';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

const profileSchema = z.object({
  name: z.string().min(2),
  image: z.string().url().optional().or(z.literal(''))
});

function getIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
}

export async function GET(request: Request) {
  try {
    const limit = await rateLimit(`users:get:${getIp(request)}`);
    if (!limit.success) {
      return fail('Too many requests', 429);
    }

    const session = await getServerAuthSession();

    if (!session?.user) {
      return fail('Unauthorized', 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        globalRole: true,
        emailVerified: true
      }
    });

    return ok('User fetched', user);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session?.user) {
      return fail('Unauthorized', 401);
    }

    const body = await request.json();
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return fail('Invalid profile payload', 422);
    }

    const user = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        name: parsed.data.name,
        image: parsed.data.image || null
      },
      select: {
        id: true,
        name: true,
        image: true
      }
    });

    await logAudit({
      actorId: session.user.id,
      action: 'PROFILE_UPDATED',
      targetType: 'USER',
      targetId: session.user.id
    });

    return ok('Profile updated', user);
  } catch (error) {
    return handleApiError(error);
  }
}
