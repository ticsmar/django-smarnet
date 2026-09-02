import { FormTextarea } from "@/components/ui/forms";
import { Button } from "@/components/ui/button";
import { useT } from "@/hooks/useT";

export function FollowUpLegacyNotes({
  existing,
  value,
  disabled,
  submitting,
  onChange,
  onSubmit,
}: {
  existing: string;
  value: string;
  disabled?: boolean;
  submitting?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const t = useT();
  return (
    <div className="flex flex-col gap-3">
      <div className="max-h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-muted/30 p-3 text-sm text-foreground">
        {existing.trim() ? existing : t("followUp.legacy_empty")}
      </div>
      <FormTextarea
        label={t("followUp.legacy_new")}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        textareaClassName="min-h-[80px]"
      />
      <div className="flex justify-end">
        <Button type="button" onClick={onSubmit} disabled={disabled || submitting || !value.trim()}>
          {t("followUp.legacy_append")}
        </Button>
      </div>
    </div>
  );
}
