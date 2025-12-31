import { ok, fail } from '@/lib/api-response';
import { sendEmail } from '@/lib/email';
import { handleApiError } from '@/lib/error-handler';
import { publicEnv } from '@/lib/env';
import { passwordResetTemplate } from '@/emails/password-reset';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/tokens';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };

    if (!body.email) {
      return fail('Email is required', 422);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (!user) {
      return ok('If account exists, a reset email has been sent.', { sent: true });
    }

    const token = generateToken();

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30)
      }
    });

    const resetUrl = `${publicEnv.NEXT_PUBLIC_APP_URL}/forgot-password?token=${token}`;
    await sendEmail(user.email, 'Reset your password', passwordResetTemplate(resetUrl));

    return ok('If account exists, a reset email has been sent.', { sent: true });
  } catch (error) {
    return handleApiError(error);
  }
}
