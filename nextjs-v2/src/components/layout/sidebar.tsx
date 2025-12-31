'use client';

import Link from 'next/link';
import { LayoutDashboard, Settings, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { APP_ROUTES } from '@/lib/constants';
import { useUiStore } from '@/store';

const items = [
  { href: APP_ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { href: APP_ROUTES.users, label: 'Users', icon: Users },
  { href: APP_ROUTES.settings, label: 'Settings', icon: Settings }
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  if (!sidebarOpen) {
    return (
      <aside className="hidden border-r p-2 lg:block">
        <Button variant="ghost" onClick={toggleSidebar}>
          Open
        </Button>
      </aside>
    );
  }

  return (
    <aside className="hidden w-64 border-r bg-card p-4 lg:block">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold">SaaS Console</h2>
        <Badge>v2</Badge>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <Link className="block rounded px-3 py-2 text-sm hover:bg-muted" href={item.href} key={item.href}>
            <span className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      <Button className="mt-6 w-full" variant="outline" onClick={toggleSidebar}>
        Collapse
      </Button>
    </aside>
  );
}
