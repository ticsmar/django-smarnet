import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ── Section wrapper with title + intro ── */
export function DSSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('mb-14', className)}>
      <header className="mb-5">
        <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
}

/* ── Card-like surface block ── */
export function DSCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-surface-container p-6 border border-border/30 shadow-ambient',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── Color swatch ── */
export function DSSwatch({
  name,
  token,
  fg = 'foreground',
}: {
  name: string;
  token: string;
  fg?: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-border/30 bg-surface-container-low">
      <div
        className="h-20 flex items-end p-3 text-xs font-semibold"
        style={{ backgroundColor: `hsl(var(--${token}))`, color: `hsl(var(--${fg}))` }}
      >
        {name}
      </div>
      <div className="px-3 py-2 text-[11px] font-mono text-muted-foreground">
        --{token}
      </div>
    </div>
  );
}

/* ── Do / Don't ── */
export function DoDont({ type, children }: { type: 'do' | 'dont'; children: ReactNode }) {
  const isDo = type === 'do';
  return (
    <div
      className={cn(
        'rounded-xl p-4 border-l-4',
        isDo
          ? 'bg-success/10 border-success text-foreground'
          : 'bg-destructive/10 border-destructive text-foreground'
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest mb-1">
        {isDo ? '✓ Faça' : '✗ Evite'}
      </p>
      <p className="text-sm">{children}</p>
    </div>
  );
}

/* ── Code block ── */
export function DSCode({ children }: { children: ReactNode }) {
  return (
    <pre className="rounded-xl bg-primary text-primary-foreground/90 p-4 text-xs font-mono overflow-x-auto border border-primary/20">
      <code>{children}</code>
    </pre>
  );
}
