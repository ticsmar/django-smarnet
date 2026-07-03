import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonGroup } from './ButtonGroup';

export interface ToolbarItem {
  key: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  /** Cria divisor visual antes deste item. */
  divider?: boolean;
}

export interface ToolbarProps {
  items: ToolbarItem[];
  size?: 'sm' | 'md' | 'lg';
  /** Cor do estado ativo. Default: 'primary' */
  activeColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'alert'
    | 'info'
    | 'destructive';
  className?: string;
  ariaLabel?: string;
}

const sizeMap = {
  sm: { btn: 'p-2', icon: 13 },
  md: { btn: 'p-2.5', icon: 15 },
  lg: { btn: 'p-3', icon: 17 },
};

const activeColorMap = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  tertiary: 'bg-tertiary text-tertiary-foreground',
  accent: 'bg-accent text-accent-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  alert: 'bg-alert text-alert-foreground',
  info: 'bg-info text-info-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
};

/**
 * Toolbar de ações com ícones (formatação, edição, etc).
 * Suporta item ativo, divisores e qualquer cor do design system.
 */
export function Toolbar({
  items,
  size = 'md',
  activeColor = 'primary',
  className,
  ariaLabel = 'Toolbar',
}: ToolbarProps) {
  const sz = sizeMap[size];
  return (
    <ButtonGroup attached className={className} aria-label={ariaLabel}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <React.Fragment key={item.key}>
            {item.divider && <span aria-hidden className="w-px bg-border" />}
            <button
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              aria-label={item.label}
              aria-pressed={item.active}
              title={item.label}
              className={cn(
                'inline-flex items-center justify-center transition-colors',
                sz.btn,
                item.active
                  ? activeColorMap[activeColor]
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground',
              )}
            >
              <Icon size={sz.icon} />
            </button>
          </React.Fragment>
        );
      })}
    </ButtonGroup>
  );
}
