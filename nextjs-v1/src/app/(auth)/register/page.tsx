import { AuthForm } from '@/components/forms/auth-form';
import { AuthPanel } from '@/features/auth/components/auth-panel';

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <AuthPanel
        title="Create your account"
        description="Get started in less than one minute."
      >
        <AuthForm mode="register" />
      </AuthPanel>
    </main>
  );
}
