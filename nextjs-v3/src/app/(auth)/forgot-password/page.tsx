import { ForgotPasswordForm } from '@/components/forms/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <main className="container flex min-h-screen items-center justify-center px-4 py-8">
      <section className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold">Forgot password</h1>
        <p className="mb-6 text-sm text-muted-foreground">Receive a secure reset link via email.</p>
        <ForgotPasswordForm />
      </section>
    </main>
  );
}
