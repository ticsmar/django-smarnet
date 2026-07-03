import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PaginationWithFirstLastProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Quantidade de páginas no início antes do ellipsis. Default: 3 */
  leadingPages?: number;
  className?: string;
}

/**
 * Paginação com botões primeira/última, ellipsis e atalho para a última página.
 * Mantém o visual do PaginationShowcase.
 */
export function PaginationWithFirstLast({
  page,
  totalPages,
  onPageChange,
  leadingPages = 3,
  className,
}: PaginationWithFirstLastProps) {
  const showEllipsis = totalPages > leadingPages + 1;
  const startPages = Array.from(
    { length: Math.min(leadingPages, totalPages) },
    (_, i) => i + 1,
  );

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(1)}
        disabled={page <= 1}
        aria-label="Primeira página"
      >
        <ChevronsLeft size={14} />
      </Button>
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
      {startPages.map((p) => (
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
      {showEllipsis && (
        <span className="px-2 text-sm text-muted-foreground">...</span>
      )}
      {showEllipsis && (
        <Button
          variant={page === totalPages ? 'default' : 'outline'}
          size="icon"
          className="h-8 w-8 text-xs"
          onClick={() => onPageChange(totalPages)}
          aria-current={page === totalPages ? 'page' : undefined}
        >
          {totalPages}
        </Button>
      )}
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
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(totalPages)}
        disabled={page >= totalPages}
        aria-label="Última página"
      >
        <ChevronsRight size={14} />
      </Button>
    </div>
  );
}
