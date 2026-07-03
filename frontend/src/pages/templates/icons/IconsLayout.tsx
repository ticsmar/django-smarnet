import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

interface IconsLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function IconsLayout({ title, description, children }: IconsLayoutProps) {
  return (
    <div className="px-2 lg:px-4 pt-2 pb-10 space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/app" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={13} /> Início
        </Link>
        <ChevronRight size={12} />
        <span>Templates</span>
        <ChevronRight size={12} />
        <span>Icons</span>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{title}</span>
      </nav>
      <div>
        <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export function IconGrid({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface-container rounded-2xl border border-border/40 p-6">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
        {children}
      </div>
    </div>
  );
}

export function IconCell({ icon, name }: { icon: ReactNode; name: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer" title={name}>
      <div className="text-muted-foreground group-hover:text-foreground transition-colors">
        {icon}
      </div>
      <span className="text-[10px] text-muted-foreground truncate w-full text-center group-hover:text-foreground transition-colors">
        {name}
      </span>
    </div>
  );
}
