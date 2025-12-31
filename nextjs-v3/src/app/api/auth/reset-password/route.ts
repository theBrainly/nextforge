import { hash } from 'bcryptjs';

import { ok, fail } from '@/lib/api-response';
import { handleApiError } from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string; password?: string };

    if (!body.token || !body.password) {
      return fail('Token and password are required', 422);
    }

    const record = await prisma.passwordResetToken.findUnique({
      where: {
        token: body.token
      }
    });

    if (!record || record.expiresAt < new Date()) {
      return fail('Reset token is invalid or expired', 400);
    }

    await prisma.user.update({
      where: {
        id: record.userId
      },
      data: {
        password: await hash(body.password, 10)
      }
    });

    await prisma.passwordResetToken.delete({
      where: {
        token: body.token
      }
    });

    return ok('Password reset successful', { updated: true });
  } catch (error) {
    return handleApiError(error);
  }
}
