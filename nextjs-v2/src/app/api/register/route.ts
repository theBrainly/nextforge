import { hash } from 'bcryptjs';
import { z } from 'zod';

import { fail, ok } from '@/lib/api-response';
import { handleApiError } from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';

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
        role: 'USER'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    return ok('User registered', user, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
