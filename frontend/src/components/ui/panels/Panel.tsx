import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type ColorTone, resolveColorTone } from '@/components/ui/color-tone';

/**
 * Cores semânticas suportadas pelo Panel.
 * Cobre todas as 10 cores do design system.
 */
export type PanelColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'alert'
  | 'info'
  | 'destructive'
  | 'neutral';

/**
 * Tom visual do painel:
 * - solid: header sólido na cor + body padrão (alto destaque)
 * - light (alias: soft): header e corpo em /5–/10 + borda colorida (destaque moderado — default)
 * - outline: apenas borda colorida, header transparente (destaque sutil)
 */
export type PanelTone = ColorTone;

const SOLID_HEADER: Record<PanelColor, string> = {
  primary: 'bg-primary text-primary-foreground border-primary',
  secondary: 'bg-secondary text-secondary-foreground border-secondary',
  tertiary: 'bg-tertiary text-tertiary-foreground border-tertiary',
  accent: 'bg-accent text-accent-foreground border-accent',
  success: 'bg-success text-success-foreground border-success',
  warning: 'bg-warning text-warning-foreground border-warning',
  alert: 'bg-alert text-alert-foreground border-alert',
  info: 'bg-info text-info-foreground border-info',
  destructive: 'bg-destructive text-destructive-foreground border-destructive',
  neutral: 'bg-muted text-foreground border-border',
};

const SOFT_HEADER: Record<PanelColor, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  tertiary: 'bg-tertiary/10 text-tertiary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  alert: 'bg-alert/10 text-alert',
  info: 'bg-info/10 text-info',
  destructive: 'bg-destructive/10 text-destructive',
  neutral: 'bg-muted/40 text-foreground',
};

const SOFT_CONTAINER: Record<PanelColor, string> = {
  primary: 'border-primary/30 bg-primary/5',
  secondary: 'border-secondary/30 bg-secondary/5',
  tertiary: 'border-tertiary/30 bg-tertiary/5',
  accent: 'border-accent/30 bg-accent/5',
  success: 'border-success/30 bg-success/5',
  warning: 'border-warning/30 bg-warning/5',
  alert: 'border-alert/30 bg-alert/5',
  info: 'border-info/30 bg-info/5',
  destructive: 'border-destructive/30 bg-destructive/5',
  neutral: 'border-border bg-muted/30',
};

const OUTLINE_HEADER: Record<PanelColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  accent: 'text-accent',
  success: 'text-success',
  warning: 'text-warning',
  alert: 'text-alert',
  info: 'text-info',
  destructive: 'text-destructive',
  neutral: 'text-foreground',
};

const BORDER_BY_COLOR: Record<PanelColor, string> = {
  primary: 'border-primary/40',
  secondary: 'border-secondary/40',
  tertiary: 'border-tertiary/40',
  accent: 'border-accent/40',
  success: 'border-success/40',
  warning: 'border-warning/40',
  alert: 'border-alert/40',
  info: 'border-info/40',
  destructive: 'border-destructive/40',
  neutral: 'border-border',
};

export interface PanelProps {
  title: string;
  description?: string;
  /** Cor semântica do painel. Default: 'neutral'. */
  color?: PanelColor;
  /** Tom: solid | light | outline (`soft` é alias de light). Default: 'soft'. */
  tone?: PanelTone;
  /** Ícone opcional ao lado do título no header. */
  icon?: LucideIcon;
  /** Ações no canto direito do header (ex.: botões, menu). */
  actions?: ReactNode;
  /** Conteúdo do body. */
  children?: ReactNode;
  /** Conteúdo do footer. */
  footer?: ReactNode;
  className?: string;
}

/**
 * Painel estruturado com header (título + ações) + body + footer opcional.
 * Suporta 10 cores semânticas e 3 tons (solid, light, outline).
 */
export function Panel({
  title,
  description,
  color = 'neutral',
  tone = 'soft',
  icon: Icon,
  actions,
  children,
  footer,
  className,
}: PanelProps) {
  const resolved = resolveColorTone(tone, 'soft');

  const headerClass =
    resolved === 'solid'
      ? SOLID_HEADER[color]
      : resolved === 'soft'
        ? SOFT_HEADER[color]
        : OUTLINE_HEADER[color];

  const containerClass =
    resolved === 'solid'
      ? 'border-border bg-card'
      : resolved === 'soft'
        ? SOFT_CONTAINER[color]
        : cn('bg-card', BORDER_BY_COLOR[color]);

  return (
    <div
      className={cn(
        'rounded-lg border text-card-foreground overflow-hidden shadow-sm',
        containerClass,
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-3 px-4 py-3 border-b',
          resolved === 'solid' ? 'border-b-transparent' : 'border-border/60',
          headerClass,
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon size={16} className="shrink-0" />}
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-tight truncate">{title}</h3>
            {description && (
              <p
                className={cn(
                  'text-xs truncate',
                  resolved === 'outline' ? 'text-muted-foreground' : 'opacity-80',
                )}
              >
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-1 shrink-0">{actions}</div>}
      </div>

      {children && <div className="p-4 text-sm">{children}</div>}

      {footer && (
        <div
          className={cn(
            'px-4 py-3 border-t text-sm',
            resolved === 'soft' ? 'border-border/40' : 'border-border/60 bg-muted/20',
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
