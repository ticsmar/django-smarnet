import { FormDatePicker, FormInline, FormSelect, FormTextarea } from "@/components/ui/forms";
import { Button } from "@/components/ui/button";
import { useT } from "@/hooks/useT";
import type { FollowUpMotivo, FollowUpTipo } from "@/modules/followup/types";

const HOURS = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, "0");
  const minute = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

export type FollowUpFormValue = {
  mensagem: string;
  mot_codigo: string;
  alarm_data: Date | undefined;
  alarm_hora: string;
};

export function FollowUpForm({
  tipo,
  motivos,
  value,
  submitting,
  disabled,
  isEdit,
  onChange,
  onSubmit,
}: {
  tipo: FollowUpTipo | undefined;
  motivos: FollowUpMotivo[];
  value: FollowUpFormValue;
  submitting?: boolean;
  disabled?: boolean;
  isEdit?: boolean;
  onChange: (next: FollowUpFormValue) => void;
  onSubmit: () => void;
}) {
  const t = useT();
  const needsMotivo = Boolean(tipo?.tre_tipo_canc);
  return (
    <div className="flex min-h-[220px] flex-1 flex-col gap-3">
      {needsMotivo ? (
        <FormSelect
          label={t("followUp.motivo")}
          required
          disabled={disabled}
          value={value.mot_codigo}
          onValueChange={(mot_codigo) => onChange({ ...value, mot_codigo })}
          placeholder={t("followUp.motivo_placeholder")}
          options={motivos.map((motivo) => ({
            value: String(motivo.mot_codigo),
            label: motivo.mot_descricao,
          }))}
        />
      ) : null}
      <FormTextarea
        required
        disabled={disabled}
        value={value.mensagem}
        aria-label={t("followUp.mensagem")}
        onChange={(event) => onChange({ ...value, mensagem: event.target.value })}
        className="flex min-h-0 flex-1 flex-col"
        textareaClassName="min-h-[160px] flex-1 resize-y"
      />
      <FormInline className="w-full">
        <FormDatePicker
          label={t("followUp.alarme")}
          className="min-w-[10.5rem] flex-1"
          disabled={disabled}
          placeholder=""
          value={value.alarm_data}
          onChange={(alarm_data) => onChange({ ...value, alarm_data })}
        />
        <FormSelect
          label={t("followUp.hora")}
          className="w-[7.5rem] shrink-0"
          disabled={disabled}
          value={value.alarm_hora || "08:00"}
          onValueChange={(alarm_hora) => onChange({ ...value, alarm_hora })}
          options={HOURS.map((hora) => ({ value: hora, label: hora }))}
        />
        <Button
          type="button"
          className="ml-auto"
          onClick={onSubmit}
          disabled={disabled || submitting}
        >
          {isEdit ? t("followUp.change") : t("followUp.insert")}
        </Button>
      </FormInline>
    </div>
  );
}
