import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { DSCode } from '../../_components';

export function Demo({
  title,
  description,
  children,
  className,
  code,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  code?: string;
}) {
  return (
    <section className="mb-8">
      {title && (
        <header className="mb-3">
          <h3 className="font-display font-bold text-base">{title}</h3>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </header>
      )}
      <div
        className={cn(
          'rounded-2xl bg-surface-container p-6 border border-border/30 shadow-ambient',
          className
        )}
      >
        {children}
      </div>
      {code && (
        <div className="mt-2">
          <DSCode>{code}</DSCode>
        </div>
      )}
    </section>
  );
}
