import { ProfileForm } from '@/components/forms/profile-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerAuthSession } from '@/lib/auth';

export default async function SettingsPage() {
  const session = await getServerAuthSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileForm defaultName={session?.user?.name ?? 'User'} defaultImage={session?.user?.image ?? ''} />
      </CardContent>
    </Card>
  );
}
