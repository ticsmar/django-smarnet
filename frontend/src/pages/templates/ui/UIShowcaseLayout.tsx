import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';


interface UIShowcaseLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function UIShowcaseLayout({ title, description, children }: UIShowcaseLayoutProps) {
  return (
    <>
      <div className="px-2 lg:px-4 pt-2 pb-10 space-y-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/app" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Home size={13} /> Início
          </Link>
          <ChevronRight size={12} />
          <span>Templates</span>
          <ChevronRight size={12} />
          <span>UI Elements</span>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">{title}</span>
        </nav>

        {/* Title */}
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>

        {/* Content */}
        <div className="space-y-6">{children}</div>
      </div>
    </>
  );
}

export function ShowcaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-surface-container rounded-2xl border border-border/40 p-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-border" />
        {title}
      </h3>
      {children}
    </div>
  );
}
