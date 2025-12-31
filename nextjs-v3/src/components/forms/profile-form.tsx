'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  name: z.string().min(2),
  image: z.string().url().optional().or(z.literal(''))
});

type Values = z.infer<typeof schema>;

type ProfileFormProps = {
  defaultName: string;
  defaultImage?: string;
};

export function ProfileForm({ defaultName, defaultImage }: ProfileFormProps) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultName,
      image: defaultImage ?? ''
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await api.patch('/users', values);
    toast.success('Profile updated');
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-sm">Display name</label>
        <Input {...form.register('name')} />
      </div>
      <div>
        <label className="mb-1 block text-sm">Profile image URL</label>
        <Input {...form.register('image')} />
      </div>
      <Button type="submit">Save settings</Button>
    </form>
  );
}
