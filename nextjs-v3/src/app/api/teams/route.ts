import { z } from 'zod';

import { fail, ok } from '@/lib/api-response';
import { getServerAuthSession } from '@/lib/auth';
import { cacheSet, withCache } from '@/lib/cache';
import { sendEmail } from '@/lib/email';
import { handleApiError } from '@/lib/error-handler';
import { teamInviteTemplate } from '@/emails/team-invite';
import { canInviteToTeam } from '@/lib/permissions';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

const inviteSchema = z.object({
  email: z.string().email(),
  teamId: z.string().min(1)
});

export async function GET() {
  try {
    const session = await getServerAuthSession();

    if (!session?.user) {
      return fail('Unauthorized', 401);
    }

    const teams = await withCache(
      `user-teams:${session.user.id}`,
      async () =>
        prisma.teamMember.findMany({
          where: {
            userId: session.user.id
          },
          include: {
            team: true
          }
        }),
      90
    );

    return ok('Teams fetched', teams);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session?.user) {
      return fail('Unauthorized', 401);
    }

    const body = await request.json();
    const parsed = inviteSchema.safeParse(body);

    if (!parsed.success) {
      return fail('Invalid team invite payload', 422);
    }

    const membership = await prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId: parsed.data.teamId,
          userId: session.user.id
        }
      }
    });

    if (!membership || !canInviteToTeam(membership.role)) {
      return fail('Insufficient permissions to invite members', 403);
    }

    const team = await prisma.team.findUnique({
      where: {
        id: parsed.data.teamId
      }
    });

    if (!team) {
      return fail('Team not found', 404);
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsed.data.email
      }
    });

    if (existingUser) {
      await prisma.teamMember.upsert({
        where: {
          teamId_userId: {
            teamId: team.id,
            userId: existingUser.id
          }
        },
        update: {
          role: 'MEMBER'
        },
        create: {
          teamId: team.id,
          userId: existingUser.id,
          role: 'MEMBER'
        }
      });
    }

    await sendEmail(parsed.data.email, `Team invite: ${team.name}`, teamInviteTemplate(team.name, parsed.data.email));

    await cacheSet(`user-teams:${session.user.id}`, null, 1);

    await logAudit({
      actorId: session.user.id,
      teamId: team.id,
      action: 'TEAM_MEMBER_INVITED',
      targetType: 'USER_EMAIL',
      metadata: {
        email: parsed.data.email
      }
    });

    return ok('Team invitation sent', {
      email: parsed.data.email
    });
  } catch (error) {
    return handleApiError(error);
  }
}
