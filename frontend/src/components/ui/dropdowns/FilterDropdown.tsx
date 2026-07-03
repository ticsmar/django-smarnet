import { ChevronDown, Filter, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  resolveTriggerVariant,
  type DropdownColor,
  type DropdownTriggerVariant,
} from './triggerVariant';

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
}

export interface FilterDropdownProps<T extends string = string> {
  options: ReadonlyArray<FilterOption<T>>;
  value: T;
  onChange: (value: T) => void;
  /** Texto antes do valor: "Status: Ativo". Default: 'Filtro' */
  label?: string;
  menuLabel?: string;
  color?: DropdownColor;
  variant?: DropdownTriggerVariant;
  size?: 'sm' | 'default' | 'lg';
  align?: 'start' | 'center' | 'end';
  /** Esconde o ícone de funil. */
  hideIcon?: boolean;
  icon?: LucideIcon;
  triggerClassName?: string;
  contentClassName?: string;
}

/**
 * Dropdown de seleção única com radios (típico para filtros).
 */
export function FilterDropdown<T extends string = string>({
  options,
  value,
  onChange,
  label = 'Filtro',
  menuLabel,
  color = 'neutral',
  variant = 'outline',
  size = 'default',
  align = 'start',
  hideIcon = false,
  icon: IconProp,
  triggerClassName,
  contentClassName,
}: FilterDropdownProps<T>) {
  const buttonVariant = resolveTriggerVariant(variant, color);
  const Icon = IconProp ?? Filter;
  const current = options.find((o) => o.value === value)?.label ?? value;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} size={size} className={triggerClassName}>
          {!hideIcon && <Icon size={14} />}
          {label}: <span className="font-semibold">{current}</span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={contentClassName}>
        {menuLabel && (
          <>
            <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuRadioGroup value={value} onValueChange={(v) => onChange(v as T)}>
          {options.map((opt) => (
            <DropdownMenuRadioItem key={opt.value} value={opt.value}>
              {opt.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
