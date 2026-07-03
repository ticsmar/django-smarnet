import * as React from 'react';
import { cn } from '@/lib/utils';
import { PathBreadcrumb, type BreadcrumbItemData, type BreadcrumbSeparatorKind } from './PathBreadcrumb';

export interface PageHeaderBreadcrumbProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Itens do caminho. */
  items: BreadcrumbItemData[];
  /** Título principal da página (h1). */
  title: React.ReactNode;
  /** Subtítulo/descrição opcional. */
  description?: React.ReactNode;
  /** Slot de ações no canto direito (botões). */
  actions?: React.ReactNode;
  /** Separador. Default: 'chevron'. */
  separator?: BreadcrumbSeparatorKind;
}

/**
 * Cabeçalho de página com breadcrumb + título + ações. Padrão usado no topo
 * de telas internas (lista, detalhes, formulários).
 */
export function PageHeaderBreadcrumb({
  items,
  title,
  description,
  actions,
  separator = 'chevron',
  className,
  ...props
}: PageHeaderBreadcrumbProps) {
  return (
    <header className={cn('flex flex-col gap-3 pb-4 border-b border-border', className)} {...props}>
      <PathBreadcrumb items={items} separator={separator} size="xs" maxItems={5} />
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground truncate">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </header>
  );
}
