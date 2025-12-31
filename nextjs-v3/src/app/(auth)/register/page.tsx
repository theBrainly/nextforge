import { RegisterForm } from '@/components/forms/register-form';

export default function RegisterPage() {
  return (
    <main className="container flex min-h-screen items-center justify-center px-4 py-8">
      <section className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold">Create account</h1>
        <p className="mb-6 text-sm text-muted-foreground">Launch your startup stack in minutes.</p>
        <RegisterForm />
      </section>
    </main>
  );
}
