import { AuthForm } from '@/components/forms/auth-form';
import { AuthPanel } from '@/features/auth/components/auth-panel';

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <AuthPanel title="Welcome back" description="Sign in to access your dashboard.">
        <AuthForm mode="login" />
      </AuthPanel>
    </main>
  );
}
