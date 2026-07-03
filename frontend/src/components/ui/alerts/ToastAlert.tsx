import * as React from 'react';
import { type LucideIcon, Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { alertColorClasses, type AlertColor, type AlertTone } from '@/components/ui/alert';

export interface ToastAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Cor semântica. Default: 'info'. */
  color?: AlertColor;
  /** Tom. Default: 'solid' (toast normalmente é mais forte). */
  tone?: AlertTone;
  /** Ícone customizado. Default: automático conforme a cor. */
  icon?: LucideIcon | null;
  /** Título em destaque. */
  title?: React.ReactNode;
  /** Descrição. */
  description?: React.ReactNode;
  /** Mostra botão de fechar. Default: true. */
  dismissible?: boolean;
  /** Callback ao fechar. */
  onDismiss?: () => void;
  /** Auto-fechar após X ms. 0 = nunca. Default: 0 (controlado externamente). */
  duration?: number;
}

const DEFAULT_ICON: Partial<Record<AlertColor, LucideIcon>> = {
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
 * Notificação toast estilizada (visual). Ideal para usar dentro de um portal
 * ou stack de notificações controlado pelo consumidor.
 *
 * Para um sistema completo de toasts use o `sonner` ou o `useToast` legado.
 */
export function ToastAlert({
  color = 'info',
  tone = 'solid',
  icon,
  title,
  description,
  dismissible = true,
  onDismiss,
  duration = 0,
  className,
  children,
  ...props
}: ToastAlertProps) {
  const [open, setOpen] = React.useState(true);
  const Icon = icon === null ? null : (icon ?? DEFAULT_ICON[color] ?? Info);

  React.useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => {
      setOpen(false);
      onDismiss?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  if (!open) return null;

  const handleDismiss = () => {
    setOpen(false);
    onDismiss?.();
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg min-w-[280px] max-w-md',
        alertColorClasses(color, tone),
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5 shrink-0 mt-0.5" />}
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold leading-tight">{title}</p>}
        {description && <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{description}</p>}
        {children}
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Fechar"
          className="shrink-0 rounded-md p-1 hover:bg-foreground/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
