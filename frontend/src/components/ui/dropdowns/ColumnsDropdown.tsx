import { ChevronDown, Columns3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  resolveTriggerVariant,
  type DropdownColor,
  type DropdownTriggerVariant,
} from './triggerVariant';

export interface ColumnOption {
  key: string;
  label: string;
  /** Opcional: impede o usuário de ocultar (ex: coluna obrigatória). */
  required?: boolean;
}

export interface ColumnsDropdownProps {
  columns: ColumnOption[];
  /** Map { key: visible }. Componente é controlado. */
  visible: Record<string, boolean>;
  onChange: (key: string, visible: boolean) => void;
  label?: string;
  menuLabel?: string;
  color?: DropdownColor;
  variant?: DropdownTriggerVariant;
  size?: 'sm' | 'default' | 'lg';
  align?: 'start' | 'center' | 'end';
  triggerClassName?: string;
  contentClassName?: string;
}

/**
 * Dropdown para alternar visibilidade de colunas (típico em DataTables).
 */
export function ColumnsDropdown({
  columns,
  visible,
  onChange,
  label = 'Colunas',
  menuLabel = 'Exibir colunas',
  color = 'neutral',
  variant = 'outline',
  size = 'default',
  align = 'start',
  triggerClassName,
  contentClassName,
}: ColumnsDropdownProps) {
  const buttonVariant = resolveTriggerVariant(variant, color);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} size={size} className={triggerClassName}>
          <Columns3 size={14} />
          {label}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={contentClassName}>
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((col) => (
          <DropdownMenuCheckboxItem
            key={col.key}
            checked={visible[col.key] ?? false}
            disabled={col.required}
            onCheckedChange={(v) => onChange(col.key, !!v)}
            // Evita fechar ao clicar (UX típica de seleção múltipla)
            onSelect={(e) => e.preventDefault()}
          >
            {col.label}
            {col.required && (
              <span className="ml-auto text-[10px] text-muted-foreground">obrigatório</span>
            )}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
