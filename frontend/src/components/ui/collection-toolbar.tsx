import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SearchField } from "@/components/ui/forms/SearchField";
import { ViewToggle } from "@/components/ui/ViewToggle";
import type { DataViewMode } from "@/hooks/useViewMode";

export interface CollectionToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  searchAriaLabel: string;
  /** Optional filter control (Select / dropdown). Clientes has none. */
  filters?: ReactNode;
  /** Extra toolbar actions. Page-level "Novo" belongs in CollectionHeader. */
  actions?: ReactNode;
  viewMode?: DataViewMode;
  onViewModeChange?: (mode: DataViewMode) => void;
  className?: string;
}

export function CollectionToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  searchAriaLabel,
  filters,
  actions,
  viewMode,
  onViewModeChange,
  className,
}: CollectionToolbarProps) {
  const showViewToggle = viewMode !== undefined && onViewModeChange !== undefined;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center",
        className,
      )}
    >
      <SearchField
        value={searchValue}
        onValueChange={onSearchChange}
        placeholder={searchPlaceholder}
        aria-label={searchAriaLabel}
      />
      <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
        {filters}
        {actions}
        {showViewToggle ? (
          <ViewToggle value={viewMode} onChange={onViewModeChange} />
        ) : null}
      </div>
    </div>
  );
}
