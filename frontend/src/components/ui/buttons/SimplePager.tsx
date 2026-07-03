import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonGroup } from './ButtonGroup';

export interface SimplePagerProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
  size?: 'sm' | 'md' | 'lg';
  /** Texto do separador. Default: 'Página {page} de {total}' */
  formatLabel?: (page: number, total: number) => string;
  className?: string;
  ariaLabel?: string;
}

const sizeMap = {
  sm: { btn: 'p-2', icon: 13, label: 'px-3 py-1.5 text-xs' },
  md: { btn: 'p-2.5', icon: 15, label: 'px-4 py-2 text-sm' },
  lg: { btn: 'p-3', icon: 17, label: 'px-5 py-2.5 text-sm' },
};

/**
 * Paginação simplificada com prev/next e indicador de página atual.
 */
export function SimplePager({
  page,
  total,
  onChange,
  size = 'md',
  formatLabel = (p, t) => `Página ${p} de ${t}`,
  className,
  ariaLabel = 'Paginação',
}: SimplePagerProps) {
  const sz = sizeMap[size];
  const canPrev = page > 1;
  const canNext = page < total;

  return (
    <ButtonGroup attached className={cn('items-center', className)} aria-label={ariaLabel}>
      <button
        type="button"
        onClick={() => canPrev && onChange(page - 1)}
        disabled={!canPrev}
        aria-label="Página anterior"
        className={cn(
          'inline-flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground hover:bg-muted',
          sz.btn,
          !canPrev && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground',
        )}
      >
        <ChevronLeft size={sz.icon} />
      </button>
      <span className={cn('font-medium text-foreground', sz.label)} aria-live="polite">
        {formatLabel(page, total)}
      </span>
      <button
        type="button"
        onClick={() => canNext && onChange(page + 1)}
        disabled={!canNext}
        aria-label="Próxima página"
        className={cn(
          'inline-flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground hover:bg-muted',
          sz.btn,
          !canNext && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground',
        )}
      >
        <ChevronRight size={sz.icon} />
      </button>
    </ButtonGroup>
  );
}
