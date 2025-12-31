'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email(),
  teamId: z.string().min(1)
});

type Values = z.infer<typeof schema>;

export function TeamInviteForm({ teamId }: { teamId: string }) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', teamId }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await api.post('/teams', values);
    toast.success('Invite sent');
    form.reset({ email: '', teamId });
  });

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <Input placeholder="new.member@company.com" {...form.register('email')} />
      <Button type="submit">Invite</Button>
    </form>
  );
}
