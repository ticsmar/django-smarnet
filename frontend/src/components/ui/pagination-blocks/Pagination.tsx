import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  /** Página atual (1-indexada) */
  page: number;
  /** Total de páginas */
  totalPages: number;
  /** Callback ao mudar de página */
  onPageChange: (page: number) => void;
  /** Quantidade de páginas numéricas visíveis. Default: 5 */
  siblings?: number;
  className?: string;
}

/**
 * Paginação numérica básica com botões prev/next e páginas individuais.
 * Mantém o visual do PaginationShowcase: botões outline 8x8 com ícones 14px.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblings = 5,
  className,
}: PaginationProps) {
  const pages = buildRange(page, totalPages, siblings);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Página anterior"
      >
        <ChevronLeft size={14} />
      </Button>
      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? 'default' : 'outline'}
          size="icon"
          className="h-8 w-8 text-xs"
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        aria-label="Próxima página"
      >
        <ChevronRight size={14} />
      </Button>
    </div>
  );
}

function buildRange(page: number, total: number, count: number): number[] {
  if (total <= count) return Array.from({ length: total }, (_, i) => i + 1);
  const half = Math.floor(count / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(total, start + count - 1);
  start = Math.max(1, end - count + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
