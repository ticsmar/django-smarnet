import * as React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PathBreadcrumb, type BreadcrumbItemData, type BreadcrumbSeparatorKind } from './PathBreadcrumb';

export interface CompactBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Itens do caminho. */
  items: BreadcrumbItemData[];
  /** Separador no modo desktop. Default: 'chevron'. */
  separator?: BreadcrumbSeparatorKind;
  /** Label do botão "voltar" no mobile. Default: deriva do penúltimo item. */
  backLabel?: string;
  /** Callback do botão voltar (mobile). Se ausente, usa href do penúltimo item. */
  onBack?: () => void;
}

/**
 * Breadcrumb responsivo:
 * - Em telas md+ exibe o caminho completo com auto-colapso (maxItems=4).
 * - Em telas pequenas exibe apenas um botão "← {pai}" + página atual.
 */
export function CompactBreadcrumb({
  items,
  separator = 'chevron',
  backLabel,
  onBack,
  className,
  ...props
}: CompactBreadcrumbProps) {
  if (!items.length) return null;
  const parent = items.length >= 2 ? items[items.length - 2] : null;
  const current = items[items.length - 1];
  const resolvedBackLabel = backLabel ?? parent?.label ?? 'Voltar';

  const handleBack = (e: React.MouseEvent) => {
    if (onBack) {
      e.preventDefault();
      onBack();
    }
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Mobile: botão voltar + atual */}
      <div className="flex items-center gap-2 md:hidden text-sm">
        {parent && (
          <a
            href={parent.href ?? '#'}
            onClick={handleBack}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{resolvedBackLabel}</span>
          </a>
        )}
        {parent && <span className="text-muted-foreground/40">/</span>}
        <span className="font-medium text-foreground truncate">{current.label}</span>
      </div>

      {/* Desktop: caminho completo com colapso */}
      <div className="hidden md:block">
        <PathBreadcrumb items={items} separator={separator} maxItems={4} />
      </div>
    </div>
  );
}
