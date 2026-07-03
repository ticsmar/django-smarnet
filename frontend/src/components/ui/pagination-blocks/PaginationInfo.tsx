import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PaginationInfoProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  /** Rótulo do tipo de registro. Default: 'registros' */
  recordLabel?: string;
  className?: string;
}

/**
 * Paginação com indicador de intervalo ("Exibindo X-Y de N") e botões
 * Anterior/Próxima rotulados. Mantém o visual do PaginationShowcase.
 */
export function PaginationInfo({
  page,
  pageSize,
  total,
  onPageChange,
  recordLabel = 'registros',
  className,
}: PaginationInfoProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <p className="text-sm text-muted-foreground">
        Exibindo{' '}
        <span className="font-semibold text-foreground">
          {start}-{end}
        </span>{' '}
        de <span className="font-semibold text-foreground">{total}</span>{' '}
        {recordLabel}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
        >
          <ChevronLeft size={14} /> Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        >
          Próxima <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
