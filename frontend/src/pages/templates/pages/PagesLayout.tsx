import { ReactNode } from 'react';
import { Home } from 'lucide-react';
import { PathBreadcrumb, type BreadcrumbItemData } from '@/components/ui/breadcrumbs';

interface PagesLayoutProps {
  title: string;
  description: string;
  category?: string;
  children: ReactNode;
}

export function PagesLayout({ title, description, category, children }: PagesLayoutProps) {
  const breadcrumbItems: BreadcrumbItemData[] = [
    { label: 'Início', href: '/app', icon: Home, iconOnly: true },
    { label: 'Templates' },
    { label: 'Pages' },
    ...(category ? [{ label: category }] : []),
    { label: title },
  ];

  return (
    <div className="px-2 lg:px-4 pt-2 pb-10 space-y-5">
      <PathBreadcrumb items={breadcrumbItems} size="xs" />
      <div>
        <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export function PageSection({ title, children, className = '' }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`bg-surface-container rounded-2xl border border-border/40 p-6 ${className}`}>
      {title && (
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-border" />
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
