import { cn } from '@/lib/utils';

export interface PaginationPageSizeProps {
  pageSize: number;
  pageSizeOptions?: number[];
  onPageSizeChange: (size: number) => void;
  page: number;
  totalPages: number;
  className?: string;
}

/**
 * Seletor de "registros por página" com indicador de página atual.
 * Mantém o visual do PaginationShowcase.
 */
export function PaginationPageSize({
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  page,
  totalPages,
  className,
}: PaginationPageSizeProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Exibir</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 px-2 rounded-lg border border-border bg-background text-sm text-foreground"
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="text-sm text-muted-foreground">por página</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </p>
    </div>
  );
}
