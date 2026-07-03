import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BarChart3 } from 'lucide-react';

interface ChartsLayoutProps {
  title: string;
  description?: string;
  category?: string;
  children: ReactNode;
}

export function ChartsLayout({ title, description, category = 'Apex Charts', children }: ChartsLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/app" className="hover:text-foreground transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <span>Charts</span>
        <ChevronRight size={12} />
        <span>{category}</span>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <BarChart3 size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
}

interface ChartSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ChartSection({ title, description, children }: ChartSectionProps) {
  return (
    <section className="bg-card rounded-2xl p-6 shadow-ambient">
      <div className="mb-5">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}
