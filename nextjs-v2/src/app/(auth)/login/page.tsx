import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Welcome back</h1>
      <p className="mb-6 text-sm text-muted-foreground">Login to continue to your dashboard.</p>
      <LoginForm />
    </div>
  );
}
