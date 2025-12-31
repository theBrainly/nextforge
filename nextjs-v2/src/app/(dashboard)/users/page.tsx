import { redirect } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { canAccessUsers } from '@/lib/roles';

export default async function UsersPage() {
  const session = await getServerAuthSession();

  if (!session?.user || !canAccessUsers(session.user.role)) {
    redirect('/dashboard');
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management (Admin)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b" key={user.id}>
                  <td className="py-2">{user.name ?? 'N/A'}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">{user.role}</td>
                  <td className="py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
