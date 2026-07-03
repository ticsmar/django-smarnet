import { cn } from '@/lib/utils';
import { type BadgeColor, type BadgeTone, badgeColorClasses } from '@/components/ui/badge';

export interface StatusBadgeProps {
  /** Texto do status. Ex: "Ativo", "Pendente". */
  label: string;
  /** Cor semântica. Default: 'success'. */
  color?: BadgeColor;
  /** Tom. Default: 'soft' (estilo de chip de status). */
  tone?: BadgeTone;
  /** Mostra o "dot" colorido antes do label. Default: true. */
  showDot?: boolean;
  /** Anima o dot (pulse) — útil para "ao vivo" / "ativo agora". Default: false. */
  pulse?: boolean;
  className?: string;
}

const DOT_BY_COLOR: Record<BadgeColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  alert: 'bg-alert',
  info: 'bg-info',
  destructive: 'bg-destructive',
  neutral: 'bg-muted-foreground',
};

/**
 * Badge de status com dot colorido (Ativo, Pendente, Cancelado, etc).
 */
export function StatusBadge({
  label,
  color = 'success',
  tone = 'soft',
  showDot = true,
  pulse = false,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
        badgeColorClasses(color, tone),
        className,
      )}
    >
      {showDot && (
        <span
          aria-hidden
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            DOT_BY_COLOR[color],
            pulse && 'animate-pulse',
          )}
        />
      )}
      {label}
    </span>
  );
}
