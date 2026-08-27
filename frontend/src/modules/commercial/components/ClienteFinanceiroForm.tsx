import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FormCombobox, FormInput, FormRow } from "@/components/ui/forms";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useT } from "@/hooks/useT";
import { ApiError } from "../api/commercialApi";
import { CLI_PES_TIPO_CODES, REC_TRIBUTO_CODES } from "../clienteConstants";
import { useCommercialAccess } from "../hooks/useCommercialAccess";
import {
  useAtualizaClienteFinanceiro,
  useClienteGruposTributarios,
} from "../hooks/useClientes";
import type { ClienteDetail, GravaClienteFinanInput } from "../types/cliente";
import { ClienteFormError } from "./ClienteDadosGeraisFields";

type ClienteFinanceiroFormProps = {
  cliente: ClienteDetail;
  canEdit: boolean;
};

export function ClienteFinanceiroForm({
  cliente,
  canEdit,
}: ClienteFinanceiroFormProps) {
  const t = useT();
  const { canChangeClienteLimite } = useCommercialAccess();
  const save = useAtualizaClienteFinanceiro();
  const [error, setError] = useState("");
  const [form, setForm] = useState<GravaClienteFinanInput>(() =>
    finanFromCliente(cliente),
  );

  useEffect(() => {
    setForm(finanFromCliente(cliente));
  }, [cliente.codigo]);

  const { data: grupos = [] } = useClienteGruposTributarios(
    cliente.est_codigo ?? null,
    cliente.cli_tipo ?? null,
  );

  const grupoOptions = useMemo(
    () =>
      grupos.map((item) => ({
        value: item.codigo,
        label: [item.uf, item.descricao, item.codigo]
          .filter(Boolean)
          .join(" ")
          .trim() || item.codigo,
      })),
    [grupos],
  );

  const pesTipoOptions = useMemo(
    () =>
      CLI_PES_TIPO_CODES.map((code) => ({
        value: code,
        label: t(`administracao.clientes.pes_tipo.${code}`),
      })),
    [t],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      await save.mutateAsync({ codigo: cliente.codigo, input: form });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.update_error"),
      );
    }
  }

  const limitesLocked = !canChangeClienteLimite;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="max-w-3xl space-y-4">
        <FormRow label={t("administracao.clientes.fields.grupo_trib")}>
          <FormCombobox
            id="grupo-trib"
            options={grupoOptions}
            value={
              grupoOptions.find(
                (option) => option.value === (form.cli_grupo_trib ?? ""),
              ) ?? null
            }
            onChange={(option) => {
              const selected = Array.isArray(option) ? option[0] : option;
              setForm((current) => ({
                ...current,
                cli_grupo_trib: selected?.value || null,
              }));
            }}
            isDisabled={!canEdit}
            placeholder={t("administracao.clientes.grupo_search")}
          />
        </FormRow>
        <FormRow
          htmlFor="limitecr"
          label={t("administracao.clientes.fields.limitecr")}
        >
          <FormInput
            id="limitecr"
            type="number"
            value={form.limitecr ?? ""}
            disabled={!canEdit || limitesLocked}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                limitecr: event.target.value ? Number(event.target.value) : null,
              }))
            }
          />
        </FormRow>
        <FormRow
          htmlFor="limite-crv"
          label={t("administracao.clientes.fields.cli_limite_crv")}
        >
          <FormInput
            id="limite-crv"
            type="number"
            value={form.cli_limite_crv ?? ""}
            disabled={!canEdit || limitesLocked}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                cli_limite_crv: event.target.value
                  ? Number(event.target.value)
                  : null,
              }))
            }
          />
        </FormRow>
        <FormRow
          htmlFor="suframa"
          label={t("administracao.clientes.fields.suframa")}
        >
          <FormInput
            id="suframa"
            value={form.cli_inscr_suframa ?? ""}
            disabled={!canEdit}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                cli_inscr_suframa: event.target.value || null,
              }))
            }
          />
        </FormRow>
        <FormRow htmlFor="cnae" label={t("administracao.clientes.fields.cnae")}>
          <div className="flex items-center gap-3">
            <FormInput
              id="cnae"
              value={form.cli_cnae ?? ""}
              disabled={!canEdit}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  cli_cnae: event.target.value || null,
                }))
              }
            />
            <span className="whitespace-nowrap text-xs text-muted-foreground">
              {t("administracao.clientes.fields.cnae_hint")}
            </span>
          </div>
        </FormRow>
        <FormRow htmlFor="nif" label={t("administracao.clientes.fields.nif")}>
          <FormInput
            id="nif"
            value={form.cli_nif ?? ""}
            disabled={!canEdit}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                cli_nif: event.target.value || null,
              }))
            }
          />
        </FormRow>
        <FormRow
          htmlFor="ccontabil"
          label={t("administracao.clientes.fields.ccontabil")}
        >
          <FormInput
            id="ccontabil"
            value={form.ccontabil ?? ""}
            disabled={!canEdit}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                ccontabil: event.target.value || null,
              }))
            }
          />
        </FormRow>
        <FormRow label={t("administracao.clientes.fields.cli_fome_zero")}>
          <SimNaoToggle
            value={Number(form.cli_fome_zero) === 1 ? "1" : "2"}
            disabled={!canEdit}
            simValue="1"
            naoValue="2"
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                cli_fome_zero: Number(value),
              }))
            }
          />
        </FormRow>
        <FormRow label={t("administracao.clientes.fields.flagmulta")}>
          <SimNaoToggle
            value={Number(form.flagmulta) === 1 ? "1" : "0"}
            disabled={!canEdit}
            simValue="1"
            naoValue="0"
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                flagmulta: Number(value),
              }))
            }
          />
        </FormRow>
        <FormRow label={t("administracao.clientes.fields.cli_montador")}>
          <SimNaoToggle
            value={Number(form.cli_montador) === 1 ? "1" : "0"}
            disabled={!canEdit}
            simValue="1"
            naoValue="0"
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                cli_montador: Number(value),
              }))
            }
          />
        </FormRow>
        <FormRow label={t("administracao.clientes.fields.pes_tipo")}>
          <FormCombobox
            id="pes-tipo"
            options={pesTipoOptions}
            value={
              pesTipoOptions.find(
                (option) => option.value === (form.cli_pes_tipo ?? ""),
              ) ?? null
            }
            onChange={(option) => {
              const selected = Array.isArray(option) ? option[0] : option;
              setForm((current) => ({
                ...current,
                cli_pes_tipo: selected?.value || null,
              }));
            }}
            isDisabled={!canEdit}
          />
        </FormRow>
        <FormRow label={t("administracao.clientes.fields.cli_reccof")}>
          <RecTributoToggle
            value={normalizeRec(form.cli_reccof)}
            disabled={!canEdit}
            onChange={(value) =>
              setForm((current) => ({ ...current, cli_reccof: value }))
            }
          />
        </FormRow>
        <FormRow label={t("administracao.clientes.fields.cli_reccsll")}>
          <RecTributoToggle
            value={normalizeRec(form.cli_reccsll)}
            disabled={!canEdit}
            onChange={(value) =>
              setForm((current) => ({ ...current, cli_reccsll: value }))
            }
          />
        </FormRow>
        <FormRow label={t("administracao.clientes.fields.cli_recpis")}>
          <RecTributoToggle
            value={normalizeRec(form.cli_recpis)}
            disabled={!canEdit}
            onChange={(value) =>
              setForm((current) => ({ ...current, cli_recpis: value }))
            }
          />
        </FormRow>
      </div>
      <ClienteFormError error={error} />
      {canEdit ? (
        <div className="flex justify-center border-t border-border/50 pt-4">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending
              ? t("administracao.clientes.saving")
              : t("administracao.clientes.atualizar")}
          </Button>
        </div>
      ) : null}
    </form>
  );
}

function finanFromCliente(cliente: ClienteDetail): GravaClienteFinanInput {
  return {
    flagsuspen: cliente.flagsuspen ?? 0,
    flagcobra: cliente.flagcobra ?? 0,
    flagmulta: cliente.flagmulta ?? 0,
    vencprog: cliente.vencprog ?? 0,
    zona_franca: cliente.zona_franca ?? 0,
    iss: cliente.iss ?? 0,
    exportacao: cliente.exportacao ?? 0,
    limitecr: cliente.limitecr ?? null,
    taxamulta: cliente.taxamulta ?? null,
    desc_max: cliente.desc_max ?? null,
    ccontabil: cliente.ccontabil ?? null,
    obsvenc: cliente.obsvenc ?? null,
    cli_limite_crv: cliente.cli_limite_crv ?? null,
    cli_fome_zero: cliente.cli_fome_zero ?? 2,
    cli_montador: cliente.cli_montador ?? 0,
    cli_reccof: cliente.cli_reccof ?? "N",
    cli_reccsll: cliente.cli_reccsll ?? "N",
    cli_recpis: cliente.cli_recpis ?? "N",
    mpg_codigo: cliente.mpg_codigo ?? null,
    cli_mod_pagt: cliente.cli_mod_pagt ?? null,
    cli_inscr_suframa: cliente.cli_inscr_suframa ?? null,
    cli_cnae: cliente.cli_cnae ?? null,
    cli_nif: cliente.cli_nif ?? null,
    cli_pes_tipo: cliente.cli_pes_tipo ?? null,
    cli_grupo_trib: cliente.cli_grupo_trib ?? null,
  };
}

function SimNaoToggle({
  value,
  disabled,
  simValue,
  naoValue,
  onChange,
}: {
  value: string;
  disabled: boolean;
  simValue: string;
  naoValue: string;
  onChange: (value: string) => void;
}) {
  const t = useT();
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={value}
      disabled={disabled}
      className="justify-start"
      onValueChange={(next) => {
        if (next) {
          onChange(next);
        }
      }}
    >
      <ToggleGroupItem value={simValue}>
        {t("administracao.clientes.sim")}
      </ToggleGroupItem>
      <ToggleGroupItem value={naoValue}>
        {t("administracao.clientes.nao")}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function RecTributoToggle({
  value,
  disabled,
  onChange,
}: {
  value: (typeof REC_TRIBUTO_CODES)[number];
  disabled: boolean;
  onChange: (value: (typeof REC_TRIBUTO_CODES)[number]) => void;
}) {
  const t = useT();
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={value}
      disabled={disabled}
      className="justify-start"
      onValueChange={(next) => {
        if (next === "S" || next === "N" || next === "P") {
          onChange(next);
        }
      }}
    >
      {REC_TRIBUTO_CODES.map((code) => {
        switch (code) {
          case "S":
          case "N":
          case "P":
            return (
              <ToggleGroupItem key={code} value={code}>
                {t(`administracao.clientes.rec.${code}`)}
              </ToggleGroupItem>
            );
          default: {
            const _exhaustive: never = code;
            return _exhaustive;
          }
        }
      })}
    </ToggleGroup>
  );
}

function normalizeRec(
  value: string | null | undefined,
): (typeof REC_TRIBUTO_CODES)[number] {
  if (value === "S" || value === "P") {
    return value;
  }
  return "N";
}
