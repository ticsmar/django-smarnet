import { useMemo, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/ui/forms";
import {
  FollowUpForm,
  FollowUpList,
  type FollowUpFormValue,
} from "@/components/ui/follow-up";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import { ApiError } from "./api";
import {
  useFollowUpItems,
  useFollowUpMotivos,
  useFollowUpMutations,
  useFollowUpTipos,
} from "./hooks";
import type { FollowUpItem } from "./types";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function formatAlarmDate(date: Date | undefined): string {
  if (!date) return "";
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function parseIsoDate(iso: string | null): Date | undefined {
  if (!iso) return undefined;
  const parsed = new Date(iso);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function alarmHoraFromIso(iso: string | null): string {
  if (!iso) return "08:00";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "08:00";
  const minutes = parsed.getMinutes() < 30 ? "00" : "30";
  return `${pad(parsed.getHours())}:${minutes}`;
}

const emptyForm: FollowUpFormValue = {
  mensagem: "",
  mot_codigo: "",
  alarm_data: undefined,
  alarm_hora: "08:00",
};

/** Dropdown filter: all follow-ups (no TRE_CODIGO sent to the API). */
const FILTER_ALL = "__all__";

function isFilterAll(tre: string): boolean {
  return tre === FILTER_ALL || tre === "";
}

function treCodigoFromFilter(tre: string): number | null {
  if (isFilterAll(tre)) return null;
  const parsed = Number(tre);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export type FollowUpProps = {
  sistema: number;
  filtro: string;
  disabled?: boolean;
  className?: string;
};

export function FollowUp({
  sistema,
  filtro,
  disabled = false,
  className,
}: FollowUpProps) {
  const t = useT();
  const [tre, setTre] = useState<string>(FILTER_ALL);
  const [editing, setEditing] = useState<FollowUpItem | null>(null);
  const [composing, setComposing] = useState(false);
  const [form, setForm] = useState<FollowUpFormValue>(emptyForm);
  const [formError, setFormError] = useState("");

  const treCodigo = treCodigoFromFilter(tre);
  const itemsQuery = useFollowUpItems(
    sistema,
    filtro,
    composing || editing ? null : treCodigo,
  );
  const tiposQuery = useFollowUpTipos(sistema);
  const tipo = isFilterAll(tre)
    ? undefined
    : tiposQuery.data?.find((item) => String(item.tre_codigo) === tre);
  const motivosQuery = useFollowUpMotivos(Boolean(tipo?.tre_tipo_canc));
  const mutations = useFollowUpMutations(sistema, filtro);

  const items = useMemo(() => itemsQuery.data?.items ?? [], [itemsQuery.data?.items]);
  const tipos = tiposQuery.data ?? [];

  const referenciaOptions = useMemo(
    () => [
      { value: FILTER_ALL, label: t("followUp.todos") },
      ...tipos.map((item) => ({
        value: String(item.tre_codigo),
        label: item.tre_descricao,
      })),
    ],
    [tipos, t],
  );

  function startNew() {
    if (isFilterAll(tre) || !tipo) {
      setFormError(t("followUp.select_tipo"));
      return;
    }
    setFormError("");
    setEditing(null);
    setForm(emptyForm);
    setComposing(true);
  }

  function startEdit(item: FollowUpItem) {
    setTre(item.tre_codigo ? String(item.tre_codigo) : FILTER_ALL);
    setForm({
      mensagem: item.mensagem.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, ""),
      mot_codigo: item.mot_codigo ? String(item.mot_codigo) : "",
      alarm_data: parseIsoDate(item.pre_dt_alarm),
      alarm_hora: alarmHoraFromIso(item.pre_dt_alarm),
    });
    setEditing(item);
    setComposing(true);
    setFormError("");
  }

  async function handleSave() {
    if (!tipo) {
      setFormError(t("followUp.select_tipo"));
      return;
    }
    if (tipo.tre_tipo_canc && !form.mot_codigo) {
      setFormError(t("followUp.select_motivo"));
      return;
    }
    setFormError("");
    try {
      await mutations.save.mutateAsync({
        tre_codigo: tipo.tre_codigo,
        mensagem: form.mensagem,
        mot_codigo: form.mot_codigo ? Number(form.mot_codigo) : null,
        alarm_data: formatAlarmDate(form.alarm_data),
        alarm_hora: form.alarm_hora,
        pre_codigo: editing?.pre_codigo,
      });
      setComposing(false);
      setEditing(null);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : t("followUp.save_error"));
    }
  }

  async function handleBaixa(item: FollowUpItem) {
    if (!window.confirm(t("followUp.baixa_confirm"))) return;
    try {
      await mutations.baixa.mutateAsync(item.pre_codigo);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : t("followUp.save_error"));
    }
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-end gap-2">
        <FormSelect
          label={t("followUp.referencia")}
          className="min-w-[220px] flex-1"
          disabled={disabled || composing}
          value={tre}
          onValueChange={(next) => {
            setTre(next);
            setComposing(false);
            setEditing(null);
            setFormError("");
          }}
          options={referenciaOptions}
        />
        <Button type="button" onClick={startNew} disabled={disabled || composing}>
          {t("followUp.novo")}
        </Button>
      </div>
      {tiposQuery.isError ? (
        <Alert color="destructive" tone="soft">
          <AlertDescription>
            {tiposQuery.error instanceof ApiError
              ? tiposQuery.error.message
              : t("followUp.tipos_load_error")}
          </AlertDescription>
        </Alert>
      ) : null}
      {formError ? (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}
      <div className="flex min-h-[220px] flex-col rounded-md border border-border/50 p-3">
        {composing ? (
          <FollowUpForm
            tipo={tipo}
            motivos={motivosQuery.data ?? []}
            value={form}
            isEdit={Boolean(editing)}
            submitting={mutations.save.isPending}
            disabled={disabled}
            onChange={setForm}
            onSubmit={() => void handleSave()}
          />
        ) : (
          <div className="max-h-[320px] flex-1 overflow-auto">
            <FollowUpList
              items={items}
              disabled={disabled}
              onEdit={startEdit}
              onBaixa={(item) => void handleBaixa(item)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
