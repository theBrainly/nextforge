import { CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const items = [
    'App Router + TypeScript setup',
    'Reusable UI components',
    'Zod validated forms',
    'Global toast + theming + state'
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">This is a protected route.</p>
      </div>

      <div className="rounded-lg border p-5">
        <h2 className="mb-4 text-lg font-medium">Starter Checklist</h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li className="flex items-center gap-2" key={item}>
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
