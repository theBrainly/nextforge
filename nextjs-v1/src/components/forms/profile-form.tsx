'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const profileSchema = z.object({
  company: z.string().min(2, 'Company is required'),
  website: z.string().url('Please enter a valid URL')
});

type ProfileValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      company: 'Acme Inc.',
      website: 'https://acme.com'
    }
  });

  const onSubmit = form.handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    toast.success('Profile settings saved');
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="company">
          Company
        </label>
        <Input id="company" {...form.register('company')} />
        <p className="text-sm text-red-500">{form.formState.errors.company?.message}</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="website">
          Website
        </label>
        <Input id="website" {...form.register('website')} />
        <p className="text-sm text-red-500">{form.formState.errors.website?.message}</p>
      </div>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
