import { MoreVertical, Pencil, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ActionsDropdown,
  type DropdownAction,
} from "@/components/ui/dropdowns/ActionsDropdown";
import { useT } from "@/hooks/useT";

export type ClienteChildAction = {
  key: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
};

type ClienteChildRowActionsProps = {
  canEdit?: boolean;
  onEdit?: () => void;
  extra?: ClienteChildAction[];
  variant?: "menu" | "buttons";
};

export function ClienteChildRowActions({
  canEdit = false,
  onEdit,
  extra = [],
  variant = "menu",
}: ClienteChildRowActionsProps) {
  const t = useT();
  const defs: ClienteChildAction[] = [];
  if (canEdit && onEdit) {
    defs.push({
      key: "edit",
      label: t("module.edit"),
      icon: Pencil,
      onClick: onEdit,
    });
  }
  defs.push(...extra);

  if (defs.length === 0) {
    return null;
  }

  if (variant === "buttons") {
    return (
      <div
        className="flex flex-wrap items-center gap-2"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        {defs.map(({ key, label, icon: Icon, onClick }) => (
          <Button
            key={key}
            type="button"
            size="sm"
            variant={key === "edit" ? "default" : "outline"}
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

  const menuActions: DropdownAction[] = defs.map((action) => ({
    key: action.key,
    label: action.label,
    icon: action.icon,
    onClick: action.onClick,
  }));

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <ActionsDropdown
        iconOnly
        icon={MoreVertical}
        size="sm"
        variant="ghost"
        align="start"
        ariaLabel={t("module.actions")}
        actions={menuActions}
        triggerClassName="h-8 w-8 text-muted-foreground hover:text-foreground"
      />
    </div>
  );
}
