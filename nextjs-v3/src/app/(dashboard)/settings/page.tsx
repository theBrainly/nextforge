import { ProfileForm } from '@/components/forms/profile-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerAuthSession } from '@/lib/auth';

export default async function SettingsPage() {
  const session = await getServerAuthSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileForm defaultImage={session?.user.image ?? ''} defaultName={session?.user.name ?? 'Founder'} />
      </CardContent>
    </Card>
  );
}
