import { fail, ok } from '@/lib/api-response';
import { getServerAuthSession } from '@/lib/auth';
import { handleApiError } from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import { canAccessUsers } from '@/lib/roles';

export async function GET() {
  try {
    const session = await getServerAuthSession();

    if (!session?.user) {
      return fail('Unauthorized', 401);
    }

    if (!canAccessUsers(session.user.role)) {
      return fail('Forbidden', 403);
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return ok('Users fetched', users);
  } catch (error) {
    return handleApiError(error);
  }
}
