import { ok, fail } from '@/lib/api-response';
import { handleApiError } from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string };

    if (!body.token) {
      return fail('Token is required', 422);
    }

    const record = await prisma.emailVerificationToken.findUnique({
      where: {
        token: body.token
      }
    });

    if (!record || record.expiresAt < new Date()) {
      return fail('Verification token is invalid or expired', 400);
    }

    await prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: new Date() }
    });

    await prisma.emailVerificationToken.delete({
      where: {
        token: body.token
      }
    });

    return ok('Email verified', { verified: true });
  } catch (error) {
    return handleApiError(error);
  }
}
