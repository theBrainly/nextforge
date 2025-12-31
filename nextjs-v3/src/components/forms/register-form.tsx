'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { api } from '@/lib/axios';
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
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await api.post('/auth/register', values);
      toast.success('Account created. Check your email to verify.');
      router.push('/verify-email');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-sm">Full name</label>
        <Input {...form.register('name')} placeholder="Founder Name" />
      </div>
      <div>
        <label className="mb-1 block text-sm">Email</label>
        <Input {...form.register('email')} placeholder="founder@startup.com" />
      </div>
      <div>
        <label className="mb-1 block text-sm">Password</label>
        <Input type="password" {...form.register('password')} placeholder="******" />
      </div>
      <Button className="w-full" type="submit">
        Create Account
      </Button>
      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link className="underline" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
