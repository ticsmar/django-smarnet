import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { SmarnetLogo } from '@/components/SmarnetLogo';

interface AuthLayoutProps {
  title: string;
  description: string;
  variant?: 'basic' | 'cover';
  children: ReactNode;
}

export function AuthLayout({ title, description, variant, children }: AuthLayoutProps) {
  return (
    <div className="px-2 lg:px-4 pt-2 pb-10 space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/app" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={13} /> Início
        </Link>
        <ChevronRight size={12} />
        <span>Templates</span>
        <ChevronRight size={12} />
        <span>Authentication</span>
        {variant && (
          <>
            <ChevronRight size={12} />
            <span>{variant === 'basic' ? 'Basic' : 'Cover'}</span>
          </>
        )}
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{title}</span>
      </nav>
      <div>
        <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function AuthCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-surface-container rounded-2xl border border-border/40 p-8 ${className}`}>
      {children}
    </div>
  );
}

export function AuthBrand({ onDark = false }: { onDark?: boolean } = {}) {
  return (
    <div className="flex items-center justify-center mb-8">
      <SmarnetLogo size="lg" onDark={onDark} />
    </div>
  );
}
