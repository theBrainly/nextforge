'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { registerUser } from '@/features/auth/service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

type Values = z.infer<typeof schema>;

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '' }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await registerUser(values);
      toast.success('Account created. Please login.');
      router.push('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-sm">Name</label>
        <Input {...form.register('name')} placeholder="John Doe" />
        <p className="mt-1 text-sm text-red-500">{form.formState.errors.name?.message}</p>
      </div>
      <div>
        <label className="mb-1 block text-sm">Email</label>
        <Input {...form.register('email')} placeholder="you@example.com" />
        <p className="mt-1 text-sm text-red-500">{form.formState.errors.email?.message}</p>
      </div>
      <div>
        <label className="mb-1 block text-sm">Password</label>
        <Input type="password" {...form.register('password')} placeholder="******" />
        <p className="mt-1 text-sm text-red-500">{form.formState.errors.password?.message}</p>
      </div>
      <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">
        {form.formState.isSubmitting ? 'Creating...' : 'Create Account'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link className="underline" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
