'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { login, register } from '@/features/auth/services/auth-service';
import { getAuthSchema } from '@/features/auth/hooks/use-login-form';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Mode = 'login' | 'register';
type FormValues = {
  name?: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  mode: Mode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const schema = getAuthSchema(mode);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: mode === 'login' ? { email: '', password: '' } : { name: '', email: '', password: '' }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const user =
        mode === 'login' ? await login(values) : await register(values);

      setUser(user);
      toast.success(mode === 'login' ? 'Welcome back' : 'Account created');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {mode === 'register' ? (
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <Input id="name" placeholder="Your name" {...form.register('name')} />
          <p className="text-sm text-red-500">{form.formState.errors.name?.message}</p>
        </div>
      ) : null}

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input id="email" placeholder="you@example.com" {...form.register('email')} />
        <p className="text-sm text-red-500">{form.formState.errors.email?.message}</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input id="password" type="password" placeholder="******" {...form.register('password')} />
        <p className="text-sm text-red-500">{form.formState.errors.password?.message}</p>
      </div>

      <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Submitting...' : mode === 'login' ? 'Login' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <Link className="text-primary underline" href={mode === 'login' ? '/register' : '/login'}>
          {mode === 'login' ? 'Register' : 'Login'}
        </Link>
      </p>
    </form>
  );
}
