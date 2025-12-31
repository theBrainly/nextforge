import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamInviteForm } from '@/components/forms/team-invite-form';
import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function TeamPage() {
  const session = await getServerAuthSession();

  if (!session?.user.activeTeamId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No active team found for your account.</p>
        </CardContent>
      </Card>
    );
  }

  const members = await prisma.teamMember.findMany({
    where: {
      teamId: session.user.activeTeamId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {members.map((member) => (
              <li className="flex items-center justify-between rounded border p-3" key={member.id}>
                <div>
                  <p className="font-medium">{member.user.name ?? 'Unnamed user'}</p>
                  <p className="text-sm text-muted-foreground">{member.user.email}</p>
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{member.role}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invite member</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamInviteForm teamId={session.user.activeTeamId} />
        </CardContent>
      </Card>
    </div>
  );
}
