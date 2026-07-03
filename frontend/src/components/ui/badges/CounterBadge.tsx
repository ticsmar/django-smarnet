import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { type BadgeColor } from '@/components/ui/badge';

export interface CounterBadgeProps {
  /** Valor numérico. Se >= max, exibe "{max}+". Opcional quando `dot` é true. */
  count?: number;
  /** Limite superior. Default: 99. */
  max?: number;
  /** Cor semântica. Default: 'destructive'. */
  color?: BadgeColor;
  /**
   * Quando true, renderiza como dot indicador (sem número).
   * Útil para "tem novidade" sem revelar a quantidade.
   */
  dot?: boolean;
  /** Esconde quando count = 0. Default: true. */
  hideOnZero?: boolean;
  /**
   * Posição quando usado como overlay sobre um filho.
   * Quando undefined, é renderizado inline.
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /**
   * Quando posicionado, envolve `children` num wrapper relative.
   * Útil para sobrepor a um avatar/ícone.
   */
  children?: ReactNode;
  /** Borda externa para destacar do fundo. Default: true quando posicionado. */
  ring?: boolean;
  className?: string;
  ariaLabel?: string;
}

const COLOR_CLASSES: Record<BadgeColor, string> = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  tertiary: 'bg-tertiary text-tertiary-foreground',
  accent: 'bg-accent text-accent-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  alert: 'bg-alert text-alert-foreground',
  info: 'bg-info text-info-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  neutral: 'bg-muted text-muted-foreground',
};

const POSITION_CLASSES: Record<NonNullable<CounterBadgeProps['position']>, string> = {
  'top-right': '-top-1 -right-1',
  'top-left': '-top-1 -left-1',
  'bottom-right': '-bottom-1 -right-1',
  'bottom-left': '-bottom-1 -left-1',
};

/**
 * Contador / indicador (ex: notificações). Suporta modo dot e overlay sobre filho.
 */
export function CounterBadge({
  count = 0,
  max = 99,
  color = 'destructive',
  dot = false,
  hideOnZero = true,
  position,
  children,
  ring,
  className,
  ariaLabel,
}: CounterBadgeProps) {
  // Em modo dot, sempre visível (não depende de count)
  const visible = dot ? true : !(hideOnZero && count <= 0);
  const display = count > max ? `${max}+` : String(count);
  const showRing = ring ?? !!position;

  const badge = visible ? (
    dot ? (
      <span
        aria-label={ariaLabel ?? 'Novo'}
        role="status"
        className={cn(
          'inline-block w-2.5 h-2.5 rounded-full',
          COLOR_CLASSES[color],
          showRing && 'ring-2 ring-background',
          position && cn('absolute', POSITION_CLASSES[position]),
          className,
        )}
      />
    ) : (
      <span
        aria-label={ariaLabel ?? `${count} notificações`}
        role="status"
        className={cn(
          'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-bold leading-none',
          COLOR_CLASSES[color],
          showRing && 'ring-2 ring-background',
          position && cn('absolute', POSITION_CLASSES[position]),
          className,
        )}
      >
        {display}
      </span>
    )
  ) : null;

  if (position && children) {
    return (
      <span className="relative inline-flex">
        {children}
        {badge}
      </span>
    );
  }

  return badge;
}
