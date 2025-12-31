import { prisma } from '@/lib/prisma';

type LogInput = {
  actorId?: string;
  teamId?: string;
  action: string;
  targetType: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
};

export async function logAudit(input: LogInput) {
  await prisma.auditLog.create({
    data: {
      actorId: input.actorId,
      teamId: input.teamId,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId,
      metadata: input.metadata
    }
  });
}
