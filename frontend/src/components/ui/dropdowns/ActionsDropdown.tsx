import { ReactNode } from 'react';
import { ChevronDown, MoreHorizontal, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  resolveTriggerVariant,
  type DropdownColor,
  type DropdownTriggerVariant,
} from './triggerVariant';

export interface DropdownAction {
  key: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  /** Marca como ação destrutiva (pinta de vermelho). */
  destructive?: boolean;
  disabled?: boolean;
  /** Cria divisor antes deste item. */
  divider?: boolean;
  /** Submenu de ações filhas. */
  children?: DropdownAction[];
}

export interface ActionsDropdownProps {
  /** Texto do trigger. Se omitido + `iconOnly`, usa ícone de "mais opções". */
  label?: string;
  actions: DropdownAction[];
  /** Cabeçalho opcional acima das ações. */
  menuLabel?: string;
  /** Cor semântica do trigger. */
  color?: DropdownColor;
  /** Estilo visual do trigger: solid | outline | ghost. */
  variant?: DropdownTriggerVariant;
  /** Tamanho do trigger. */
  size?: 'sm' | 'default' | 'lg' | 'icon';
  /** Renderiza apenas ícone (MoreHorizontal por padrão). */
  iconOnly?: boolean;
  /** Ícone customizado quando `iconOnly`. */
  icon?: LucideIcon;
  /** Alinhamento do conteúdo. */
  align?: 'start' | 'center' | 'end';
  /** Largura do conteúdo. */
  contentClassName?: string;
  triggerClassName?: string;
  /** A11y para o trigger icon-only. */
  ariaLabel?: string;
  /** Conteúdo extra acima das ações (ex: header customizado). */
  header?: ReactNode;
}

function renderItems(actions: DropdownAction[]): ReactNode {
  return actions.map((action) => {
    const Icon = action.icon;
    const node = action.children?.length ? (
      <DropdownMenuSub key={action.key}>
        <DropdownMenuSubTrigger disabled={action.disabled}>
          {Icon && <Icon size={14} />} {action.label}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>{renderItems(action.children)}</DropdownMenuSubContent>
      </DropdownMenuSub>
    ) : (
      <DropdownMenuItem
        key={action.key}
        onClick={action.onClick}
        disabled={action.disabled}
        className={cn(action.destructive && 'text-destructive focus:text-destructive')}
      >
        {Icon && <Icon size={14} />} {action.label}
      </DropdownMenuItem>
    );

    if (action.divider) {
      return (
        <span key={`${action.key}-wrap`}>
          <DropdownMenuSeparator />
          {node}
        </span>
      );
    }
    return node;
  });
}

/**
 * Dropdown de ações (visualizar, editar, exportar, excluir...).
 * Suporta sub-menus, divisores e itens destrutivos.
 */
export function ActionsDropdown({
  label,
  actions,
  menuLabel,
  color = 'neutral',
  variant = 'outline',
  size = 'default',
  iconOnly = false,
  icon: IconProp,
  align = 'start',
  contentClassName,
  triggerClassName,
  ariaLabel,
  header,
}: ActionsDropdownProps) {
  const TriggerIcon = IconProp ?? MoreHorizontal;
  const buttonVariant = resolveTriggerVariant(variant, color);
  const triggerSize = iconOnly ? 'icon' : size;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={buttonVariant}
          size={triggerSize}
          aria-label={ariaLabel ?? (iconOnly ? 'Abrir menu de ações' : undefined)}
          className={triggerClassName}
        >
          {iconOnly ? (
            <TriggerIcon size={16} />
          ) : (
            <>
              {label} <ChevronDown size={14} />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={contentClassName}>
        {header}
        {menuLabel && (
          <>
            <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {renderItems(actions)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
