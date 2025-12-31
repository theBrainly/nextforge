import type { ReactNode } from 'react';

type AuthPanelProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthPanel({ title, description, children }: AuthPanelProps) {
  return (
    <div className="w-full rounded-lg border bg-background p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
