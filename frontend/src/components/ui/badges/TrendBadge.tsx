import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TrendDirection = 'up' | 'down' | 'flat';

export interface TrendBadgeProps {
  /** Valor numérico (ex: 12.5). Sinal e ícone derivam dele se `direction` não for passado. */
  value: number;
  /** Direção explícita; se omitida, deduzida de `value` (>0 up, <0 down, 0 flat). */
  direction?: TrendDirection;
  /** Sufixo após o número. Default: '%'. Use '' para nenhum. */
  suffix?: string;
  /**
   * Inverte a semântica de cor (positivo = ruim).
   * Útil para métricas onde subir é negativo (ex: tempo de resposta, churn).
   */
  invertColors?: boolean;
  /** Esconde o ícone de seta. */
  hideIcon?: boolean;
  /** Tamanho do componente. */
  size?: 'sm' | 'md';
  /** Casas decimais. Default: 1. */
  precision?: number;
  className?: string;
}

const SIZE_MAP = {
  sm: { wrap: 'px-2 py-0.5 text-[11px] gap-0.5', icon: 11 },
  md: { wrap: 'px-2.5 py-1 text-xs gap-1', icon: 12 },
};

/**
 * Badge de tendência: ↑ verde para alta, ↓ vermelho para baixa, neutro quando 0.
 */
export function TrendBadge({
  value,
  direction,
  suffix = '%',
  invertColors = false,
  hideIcon = false,
  size = 'md',
  precision = 1,
  className,
}: TrendBadgeProps) {
  const dir: TrendDirection = direction ?? (value > 0 ? 'up' : value < 0 ? 'down' : 'flat');

  const positiveClasses = invertColors
    ? 'bg-destructive/10 text-destructive'
    : 'bg-success/10 text-success';
  const negativeClasses = invertColors
    ? 'bg-success/10 text-success'
    : 'bg-destructive/10 text-destructive';
  const flatClasses = 'bg-muted text-muted-foreground';

  const colorClasses =
    dir === 'up' ? positiveClasses : dir === 'down' ? negativeClasses : flatClasses;

  const Icon = dir === 'up' ? ArrowUp : dir === 'down' ? ArrowDown : Minus;
  const sz = SIZE_MAP[size];
  const formatted = `${value > 0 ? '+' : ''}${value.toFixed(precision)}${suffix}`;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg font-semibold',
        sz.wrap,
        colorClasses,
        className,
      )}
    >
      {!hideIcon && <Icon size={sz.icon} />}
      {formatted}
    </span>
  );
}
