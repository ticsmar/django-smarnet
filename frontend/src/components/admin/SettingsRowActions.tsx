import { Ban, Eye, MoreVertical, Pencil, Power, Trash2, type LucideIcon } from 'lucide-react';
import {
  ActionsDropdown,
  type DropdownAction,
} from '@/components/ui/dropdowns/ActionsDropdown';
import { cn } from '@/lib/utils';

export type SettingsRowAction = {
  key: string;
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  destructive?: boolean;
};

export type SettingsRowActionsProps = {
  /** Visualizar (somente leitura). */
  onView?: () => void;
  viewLabel?: string;
  viewIcon?: LucideIcon;
  /** Ação principal (Editar / Analisar / Importar…). */
  onEdit?: () => void;
  editLabel?: string;
  editIcon?: LucideIcon;
  /** Soft delete / desativação. */
  onInactivate?: () => void;
  inactivateLabel?: string;
  /** Reativação. */
  onActivate?: () => void;
  activateLabel?: string;
  /** Exclusão definitiva (só quando o domínio exige). */
  onDelete?: () => void;
  deleteLabel?: string;
  /** Ações extras no menu. */
  extraActions?: SettingsRowAction[];
  /** `menu` = ⋮ (tabela/lista). `buttons` = rodapé do card. */
  variant?: 'menu' | 'buttons';
  className?: string;
};

type ActionDef = SettingsRowAction;

function buildActions({
  onView,
  viewLabel = 'Visualizar',
  viewIcon = Eye,
  onEdit,
  editLabel = 'Editar',
  editIcon = Pencil,
  onInactivate,
  inactivateLabel = 'Inativar',
  onActivate,
  activateLabel = 'Ativar',
  onDelete,
  deleteLabel = 'Excluir',
  extraActions = [],
}: SettingsRowActionsProps): ActionDef[] {
  const actions: ActionDef[] = [];

  if (onView) {
    actions.push({ key: 'view', label: viewLabel, icon: viewIcon, onClick: onView });
  }

  if (onEdit) {
    actions.push({ key: 'edit', label: editLabel, icon: editIcon, onClick: onEdit });
  }

  for (const extra of extraActions) {
    actions.push(extra);
  }

  if (onActivate) {
    actions.push({ key: 'activate', label: activateLabel, icon: Power, onClick: onActivate });
  }

  if (onInactivate) {
    actions.push({
      key: 'inactivate',
      label: inactivateLabel,
      icon: Ban,
      destructive: true,
      onClick: onInactivate,
    });
  }

  if (onDelete) {
    actions.push({
      key: 'delete',
      label: deleteLabel,
      icon: Trash2,
      destructive: true,
      onClick: onDelete,
    });
  }

  return actions;
}

/**
 * Ações de linha para grids da área Settings (shell escuro).
 * Tabela/Lista: menu ⋮. Cards: botões no rodapé.
 */
export function SettingsRowActions(props: SettingsRowActionsProps) {
  const { variant = 'menu', className } = props;
  const defs = buildActions(props);

  if (defs.length === 0) return null;

  if (variant === 'buttons') {
    return (
      <div
        className={cn('flex flex-wrap items-center gap-2', className)}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        {defs.map(({ key, label, icon: Icon, onClick, destructive }) => (
          <button
            key={key}
            type="button"
            onClick={onClick}
            className={cn(
              'inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
              destructive
                ? 'border border-rose-500/30 bg-rose-500/10 text-rose-200 hover:border-rose-400/50'
                : 'bg-amber-600 text-white hover:bg-amber-500',
            )}
          >
            {Icon ? <Icon size={13} /> : null}
            {label}
          </button>
        ))}
      </div>
    );
  }

  const menuActions: DropdownAction[] = defs.map((action, index) => ({
    key: action.key,
    label: action.label,
    icon: action.icon,
    onClick: action.onClick,
    destructive: action.destructive,
    divider: Boolean(action.destructive && index > 0),
  }));

  return (
    <div
      className={className}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <ActionsDropdown
        iconOnly
        icon={MoreVertical}
        size="sm"
        variant="ghost"
        align="start"
        ariaLabel="Ações"
        actions={menuActions}
        triggerClassName="h-8 w-8 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        contentClassName="border-zinc-700 bg-zinc-900 text-zinc-100"
      />
    </div>
  );
}
