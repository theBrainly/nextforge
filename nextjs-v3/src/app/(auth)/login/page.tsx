import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <main className="container flex min-h-screen items-center justify-center px-4 py-8">
      <section className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold">Sign in</h1>
        <p className="mb-6 text-sm text-muted-foreground">Access your dashboard and team workspace.</p>
        <LoginForm />
      </section>
    </main>
  );
}
