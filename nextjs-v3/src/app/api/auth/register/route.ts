import { hash } from 'bcryptjs';
import { z } from 'zod';

import { fail, ok } from '@/lib/api-response';
import { generateToken } from '@/lib/tokens';
import { handleApiError } from '@/lib/error-handler';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { verificationEmailTemplate } from '@/emails/verification';
import { publicEnv } from '@/lib/env';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return fail('Invalid registration payload', 422);
    }

    const existing = await prisma.user.findUnique({
      where: {
        email: parsed.data.email
      }
    });

    if (existing) {
      return fail('User already exists', 409);
    }

    const password = await hash(parsed.data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password,
        globalRole: 'USER'
      }
    });

    const team = await prisma.team.create({
      data: {
        name: `${parsed.data.name.split(' ')[0]}'s Team`,
        slug: `${parsed.data.email.split('@')[0]}-${user.id.slice(0, 6)}`,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER'
          }
        }
      }
    });

    const token = generateToken();

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
      }
    });

    const verifyUrl = `${publicEnv.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
    await sendEmail(user.email, 'Verify your email', verificationEmailTemplate(verifyUrl));

    await logAudit({
      actorId: user.id,
      teamId: team.id,
      action: 'USER_REGISTERED',
      targetType: 'USER',
      targetId: user.id,
      metadata: {
        email: user.email
      }
    });

    return ok('Registration successful. Verify email to continue.', {
      id: user.id,
      email: user.email
    });
  } catch (error) {
    return handleApiError(error);
  }
}
