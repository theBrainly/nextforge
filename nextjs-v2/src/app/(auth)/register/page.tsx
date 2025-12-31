import { RegisterForm } from '@/components/forms/register-form';

export default function RegisterPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Create account</h1>
      <p className="mb-6 text-sm text-muted-foreground">Start with the enterprise starter in minutes.</p>
      <RegisterForm />
    </div>
  );
}
