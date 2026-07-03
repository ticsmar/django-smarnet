import * as React from 'react';
import { type LucideIcon, Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { alertColorClasses, type AlertColor, type AlertTone } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export interface BannerAlertAction {
  label: string;
  onClick: () => void;
  variant?: React.ComponentProps<typeof Button>['variant'];
}

export interface BannerAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Cor semântica. Default: 'info'. */
  color?: AlertColor;
  /** Tom. Default: 'soft'. */
  tone?: AlertTone;
  /** Ícone customizado. Default: ícone automático conforme a cor. Use `null` para esconder. */
  icon?: LucideIcon | null;
  /** Título em destaque. */
  title?: React.ReactNode;
  /** Descrição/corpo. */
  description?: React.ReactNode;
  /** Lista de ações (botões). */
  actions?: BannerAlertAction[];
  /** Permite fechar o banner. */
  dismissible?: boolean;
  /** Callback quando fechado pelo usuário. */
  onDismiss?: () => void;
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
 * Banner full-width para topo de página/seção com título, descrição e ações.
 * Ideal para anúncios, atualizações, avisos sistêmicos.
 */
export function BannerAlert({
  color = 'info',
  tone = 'soft',
  icon,
  title,
  description,
  actions,
  dismissible = false,
  onDismiss,
  className,
  children,
  ...props
}: BannerAlertProps) {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  const Icon = icon === null ? null : (icon ?? DEFAULT_ICON[color] ?? Info);

  const handleDismiss = () => {
    setOpen(false);
    onDismiss?.();
  };

  return (
    <div
      role="region"
      className={cn(
        'w-full rounded-xl border p-4 flex items-start gap-3',
        alertColorClasses(color, tone),
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5 shrink-0 mt-0.5" />}
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold leading-tight">{title}</p>}
        {description && <p className="text-xs opacity-90 mt-1 leading-relaxed">{description}</p>}
        {children}
        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {actions.map((action, i) => (
              <Button
                key={i}
                size="sm"
                variant={action.variant ?? 'outline'}
                onClick={action.onClick}
                className="h-7 text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
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
