import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ActionsDropdown,
  type DropdownAction,
} from '@/components/ui/dropdowns/ActionsDropdown';
import { useT } from '@/hooks/useT';

export type FornecedorRowActionsProps = {
  canView?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  /** `menu` = ícone ⋮ (tabela/lista). `buttons` = botões no rodapé do card. */
  variant?: 'menu' | 'buttons';
};

type ActionDef = {
  key: string;
  label: string;
  icon: typeof Eye;
  onClick: () => void;
  destructive?: boolean;
};

function useActionDefs({
  canView,
  canEdit,
  canDelete,
  onView,
  onEdit,
  onDelete,
}: FornecedorRowActionsProps): ActionDef[] {
  const t = useT();
  const actions: ActionDef[] = [];
  if (canView && onView) {
    actions.push({ key: 'view', label: t('module.view'), icon: Eye, onClick: onView });
  }
  if (canEdit && onEdit) {
    actions.push({ key: 'edit', label: t('module.edit'), icon: Pencil, onClick: onEdit });
  }
  if (canDelete && onDelete) {
    actions.push({
      key: 'delete',
      label: t('module.delete'),
      icon: Trash2,
      destructive: true,
      onClick: onDelete,
    });
  }
  return actions;
}

/**
 * Ações da listagem (Visualizar / Editar / Excluir), filtradas por permissão.
 */
export function FornecedorRowActions({
  canView = false,
  canEdit = false,
  canDelete = false,
  onView,
  onEdit,
  onDelete,
  variant = 'menu',
}: FornecedorRowActionsProps) {
  const t = useT();
  const defs = useActionDefs({
    canView,
    canEdit,
    canDelete,
    onView,
    onEdit,
    onDelete,
  });

  if (defs.length === 0) return null;

  if (variant === 'buttons') {
    return (
      <div
        className="flex flex-wrap items-center gap-2"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {defs.map(({ key, label, icon: Icon, onClick, destructive }) => (
          <Button
            key={key}
            type="button"
            size="sm"
            variant={destructive ? 'destructive' : 'outline'}
            className="h-8 gap-1.5"
            onClick={onClick}
          >
            <Icon size={14} />
            {label}
          </Button>
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
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <ActionsDropdown
        iconOnly
        icon={MoreVertical}
        size="sm"
        variant="ghost"
        align="start"
        ariaLabel={t('module.actions')}
        actions={menuActions}
        triggerClassName="h-8 w-8 text-muted-foreground hover:text-foreground"
      />
    </div>
  );
}
