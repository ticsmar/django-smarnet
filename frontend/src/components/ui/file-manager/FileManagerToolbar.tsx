import { FolderOpen, History, Paperclip, Plus, Trash2 } from "lucide-react";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { useT } from "@/hooks/useT";

export type FileManagerToolbarProps = {
  disabled?: boolean;
  disableMutate?: boolean;
  onTrash: () => void;
  onAttach: () => void;
  onFolder: () => void;
  onMove: () => void;
  onHistory: () => void;
};

export function FileManagerToolbar({
  disabled = false,
  disableMutate = true,
  onTrash,
  onAttach,
  onFolder,
  onMove,
  onHistory,
}: FileManagerToolbarProps) {
  const t = useT();
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border/40 bg-surface-container-low px-3 py-2">
      {disabled ? null : (
        <>
          <ActionButton
            type="button"
            variant="destructive"
            size="sm"
            icon={Trash2}
            label={t("fileManager.toolbar.trash")}
            disabled={disableMutate}
            onClick={onTrash}
          />
          <ActionButton
            type="button"
            variant="outline"
            size="sm"
            icon={Paperclip}
            label={t("fileManager.toolbar.attach")}
            onClick={onAttach}
          />
          <ActionButton
            type="button"
            variant="outline"
            size="sm"
            icon={Plus}
            label={t("fileManager.toolbar.folder")}
            onClick={onFolder}
          />
          <ActionButton
            type="button"
            variant="outline"
            size="sm"
            icon={FolderOpen}
            label={t("fileManager.toolbar.move")}
            disabled={disableMutate}
            onClick={onMove}
          />
        </>
      )}
      <ActionButton
        type="button"
        variant="ghost"
        size="sm"
        icon={History}
        label={t("fileManager.toolbar.history")}
        onClick={onHistory}
      />
    </div>
  );
}
