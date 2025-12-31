'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const result = await signIn('credentials', {
      ...values,
      redirect: false
    });

    if (result?.error) {
      toast.error('Invalid credentials');
      return;
    }

    toast.success('Welcome back');
    router.push('/dashboard');
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-sm">Email</label>
        <Input {...form.register('email')} placeholder="you@example.com" />
      </div>
      <div>
        <label className="mb-1 block text-sm">Password</label>
        <Input type="password" {...form.register('password')} placeholder="******" />
      </div>
      <Button className="w-full" type="submit">
        Sign In
      </Button>
      <Button
        className="w-full"
        type="button"
        variant="outline"
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      >
        Continue with Google
      </Button>
      <div className="flex justify-between text-sm text-muted-foreground">
        <Link className="underline" href="/register">
          Register
        </Link>
        <Link className="underline" href="/forgot-password">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
