import * as React from 'react';
import { type LucideIcon, Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { alertColorClasses, type AlertColor, type AlertTone } from '@/components/ui/alert';

export interface ColoredToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Cor semântica. Default: 'info'. */
  color?: AlertColor;
  /** Tom: solid | soft | outline. Default: 'soft'. */
  tone?: AlertTone;
  /** Ícone customizado. Default: automático conforme a cor. */
  icon?: LucideIcon | null;
  /** Título em destaque. */
  title?: React.ReactNode;
  /** Descrição. */
  description?: React.ReactNode;
  /** Ação opcional (ex: Desfazer). */
  action?: React.ReactNode;
  /** Mostra botão de fechar. Default: true. */
  dismissible?: boolean;
  /** Callback ao fechar. */
  onDismiss?: () => void;
}

const DEFAULT_ICON: Record<AlertColor, LucideIcon> = {
  info: Info,
  primary: Info,
  accent: Info,
  secondary: Info,
  tertiary: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  alert: AlertTriangle,
  destructive: XCircle,
  neutral: Info,
};

/**
 * Toast estático estilizado com 10 cores semânticas e 3 tons (solid, soft, outline).
 * Pode ser usado dentro de um Sonner custom render ou em qualquer stack próprio.
 */
export const ColoredToast = React.forwardRef<HTMLDivElement, ColoredToastProps>(
  (
    {
      color = 'info',
      tone = 'soft',
      icon,
      title,
      description,
      action,
      dismissible = true,
      onDismiss,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Icon = icon === null ? null : (icon ?? DEFAULT_ICON[color] ?? Info);

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          'pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg w-full min-w-[280px] max-w-md',
          alertColorClasses(color, tone),
          className,
        )}
        {...props}
      >
        {Icon && <Icon className="h-5 w-5 shrink-0 mt-0.5" />}
        <div className="flex-1 min-w-0">
          {title && <p className="text-sm font-semibold leading-tight">{title}</p>}
          {description && (
            <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{description}</p>
          )}
          {children}
          {action && <div className="mt-2">{action}</div>}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Fechar"
            className="shrink-0 rounded-md p-1 hover:bg-foreground/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);
ColoredToast.displayName = 'ColoredToast';
