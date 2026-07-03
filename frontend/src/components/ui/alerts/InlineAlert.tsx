import * as React from 'react';
import { type LucideIcon, Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { alertColorClasses, type AlertColor, type AlertTone } from '@/components/ui/alert';

export interface InlineAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Cor semântica. Default: 'info'. */
  color?: AlertColor;
  /** Tom. Default: 'soft'. */
  tone?: AlertTone;
  /** Ícone customizado. Default: ícone automático conforme a cor. */
  icon?: LucideIcon | null;
  /** Texto principal. */
  children: React.ReactNode;
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
 * Alerta compacto em linha única, ideal para feedback inline em formulários,
 * helper text ou notas curtas. Sem título.
 */
export function InlineAlert({
  color = 'info',
  tone = 'soft',
  icon,
  className,
  children,
  ...props
}: InlineAlertProps) {
  const Icon = icon === null ? null : (icon ?? DEFAULT_ICON[color] ?? Info);
  return (
    <div
      role="status"
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium',
        alertColorClasses(color, tone),
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
      <span>{children}</span>
    </div>
  );
}
