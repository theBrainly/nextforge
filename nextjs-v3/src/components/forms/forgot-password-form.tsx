'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email()
});

type Values = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await api.post('/auth/forgot-password', values);
    toast.success('Password reset email sent');
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-sm">Email</label>
        <Input {...form.register('email')} placeholder="you@example.com" />
      </div>
      <Button className="w-full" type="submit">
        Send reset link
      </Button>
    </form>
  );
}
