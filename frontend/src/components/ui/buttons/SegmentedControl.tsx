import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonGroup } from './ButtonGroup';

export type SegmentedControlColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'alert'
  | 'info'
  | 'destructive';

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label?: string;
  icon?: LucideIcon;
  /** Acessibilidade: usado quando só houver ícone. */
  ariaLabel?: string;
}

export interface SegmentedControlProps<T extends string = string> {
  options: ReadonlyArray<SegmentedControlOption<T>>;
  value: T;
  onChange: (value: T) => void;
  /** Cor do item ativo. Aceita qualquer cor do design system. Default: 'primary' */
  color?: SegmentedControlColor;
  size?: 'sm' | 'md' | 'lg';
  iconSize?: number;
  className?: string;
  /** Acessibilidade do grupo. */
  ariaLabel?: string;
}

const sizeMap = {
  sm: 'px-2.5 py-1.5 text-xs gap-1',
  md: 'px-3 py-2 text-xs gap-1.5',
  lg: 'px-4 py-2.5 text-sm gap-2',
};

const iconSizeMap = { sm: 12, md: 14, lg: 16 };

const activeColorMap: Record<SegmentedControlColor, string> = {
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
 * Controle segmentado (toggle de visualização, alinhamento, abas compactas).
 * Usa ButtonGroup attached internamente para garantir estilo consistente.
 */
export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  color = 'primary',
  size = 'md',
  iconSize,
  className,
  ariaLabel,
}: SegmentedControlProps<T>) {
  const resolvedIconSize = iconSize ?? iconSizeMap[size];
  const activeClasses = activeColorMap[color];

  return (
    <ButtonGroup attached className={className} aria-label={ariaLabel}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={isActive}
            aria-label={opt.ariaLabel ?? opt.label}
            className={cn(
              'inline-flex items-center justify-center font-medium transition-colors',
              sizeMap[size],
              isActive
                ? activeClasses
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
          >
            {Icon && <Icon size={resolvedIconSize} />}
            {opt.label}
          </button>
        );
      })}
    </ButtonGroup>
  );
}
