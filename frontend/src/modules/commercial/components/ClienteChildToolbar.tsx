import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionToolbar } from "@/components/ui/collection-toolbar";
import type { DataViewMode } from "@/hooks/useViewMode";

type ClienteChildToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  searchPlaceholder: string;
  searchAriaLabel: string;
  canAdd: boolean;
  onAdd: () => void;
  addLabel: string;
  viewMode: DataViewMode;
  onViewModeChange: (mode: DataViewMode) => void;
};

export function ClienteChildToolbar({
  query,
  onQueryChange,
  searchPlaceholder,
  searchAriaLabel,
  canAdd,
  onAdd,
  addLabel,
  viewMode,
  onViewModeChange,
}: ClienteChildToolbarProps) {
  return (
    <CollectionToolbar
      searchValue={query}
      onSearchChange={onQueryChange}
      searchPlaceholder={searchPlaceholder}
      searchAriaLabel={searchAriaLabel}
      actions={
        canAdd ? (
          <Button type="button" onClick={onAdd}>
            <Plus size={16} /> {addLabel}
          </Button>
        ) : null
      }
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
    />
  );
}
