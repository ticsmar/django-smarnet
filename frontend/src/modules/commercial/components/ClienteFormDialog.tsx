import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/forms";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useT } from "@/hooks/useT";
import { ApiError } from "../api/commercialApi";
import {
  useConsultaCnpj,
  useConsultaFuncionario,
  useLookupClienteDocumento,
} from "../hooks/useClientes";
import { isCnpjKey, normalizeCnpj } from "../cnpj";
import type {
  ConsultaCnpjResult,
  ConsultaFuncionarioResult,
  GravaClienteInput,
} from "../types/cliente";
import { ClienteCnpjLookupStep } from "./ClienteCnpjLookupStep";
import {
  ClienteDadosGeraisFields,
  ClienteFormError,
} from "./ClienteDadosGeraisFields";
import { ClienteFuncLookupStep } from "./ClienteFuncLookupStep";
import {
  applyCopyFields,
  EMPTY_CLIENTE_FORM,
  juridicaBase,
  payloadFromForm,
  tipoFromUi,
  type ClienteFormValues,
} from "./clienteFormModel";

type ClienteFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submitting?: boolean;
  error?: string;
  onSubmit: (values: GravaClienteInput) => Promise<void>;
  onCreateFromFuncionario?: (cpf: string) => Promise<void>;
  onOpenExisting?: (codigo: number) => void;
};

export function ClienteFormDialog({
  open,
  onOpenChange,
  submitting = false,
  error = "",
  onSubmit,
  onCreateFromFuncionario,
  onOpenExisting,
}: ClienteFormDialogProps) {
  const t = useT();
  const [step, setStep] = useState<"tipo" | "cnpj" | "func" | "form">("tipo");
  const [form, setForm] = useState<ClienteFormValues>(EMPTY_CLIENTE_FORM);
  const [lookupDoc, setLookupDoc] = useState("");
  const [applyCopy, setApplyCopy] = useState(false);
  const [cnpjQuery, setCnpjQuery] = useState("");
  const [cnpjResult, setCnpjResult] = useState<ConsultaCnpjResult | null>(null);
  const [cnpjError, setCnpjError] = useState("");
  const [funcQuery, setFuncQuery] = useState("");
  const [funcResult, setFuncResult] = useState<ConsultaFuncionarioResult | null>(
    null,
  );
  const [funcError, setFuncError] = useState("");
  const consultaCnpj = useConsultaCnpj();
  const consultaFuncionario = useConsultaFuncionario();

  const digits = lookupDoc.replace(/\D/g, "");
  const canLookup = form.ui_tipo === "fisica" && digits.length === 11;
  const { data: lookupData } = useLookupClienteDocumento(digits, canLookup);

  useEffect(() => {
    if (!open) return;
    setForm(EMPTY_CLIENTE_FORM);
    setStep("tipo");
    setLookupDoc("");
    setApplyCopy(false);
    setCnpjQuery("");
    setCnpjResult(null);
    setCnpjError("");
    setFuncQuery("");
    setFuncResult(null);
    setFuncError("");
  }, [open]);

  useEffect(() => {
    if (!applyCopy || !lookupData?.copy_fields) return;
    setForm((current) => applyCopyFields(current, lookupData.copy_fields!));
    setApplyCopy(false);
  }, [applyCopy, lookupData]);

  function chooseTipo(ui: ClienteFormValues["ui_tipo"]) {
    setForm({
      ...EMPTY_CLIENTE_FORM,
      ui_tipo: ui,
      tipo_cadastro: tipoFromUi(ui),
      pai_codigo: ui === "internacional" ? null : 76,
      origem: ui === "internacional" ? "" : "BR",
    });
    setCnpjQuery("");
    setCnpjResult(null);
    setCnpjError("");
    setFuncQuery("");
    setFuncResult(null);
    setFuncError("");
    if (ui === "juridica") {
      setStep("cnpj");
      return;
    }
    if (ui === "funcionario") {
      setStep("func");
      return;
    }
    setStep("form");
  }

  async function searchCnpj() {
    const key = normalizeCnpj(cnpjQuery);
    if (!isCnpjKey(key)) {
      setCnpjResult(null);
      setCnpjError(t("administracao.clientes.cnpj.invalid"));
      return;
    }
    setCnpjError("");
    try {
      const result = await consultaCnpj.mutateAsync(key);
      applyCnpjLookup(result);
    } catch (err) {
      setCnpjResult(null);
      setCnpjError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.cnpj.invalid"),
      );
    }
  }

  function applyCnpjLookup(result: ConsultaCnpjResult) {
    setCnpjResult(result);
    if (result.already_registered && result.matches.length === 1) {
      onOpenExisting?.(result.matches[0].codigo);
      return;
    }
    if (result.already_registered) {
      return;
    }
    const base = juridicaBase(result.cnpj);
    if (result.copy_fields) {
      setForm(applyCopyFields(base, result.copy_fields));
    } else {
      setForm(base);
    }
    setStep("form");
  }

  async function searchFuncionario() {
    const funcDigits = funcQuery.replace(/\D/g, "");
    if (funcDigits.length !== 11) {
      setFuncResult(null);
      setFuncError(t("administracao.clientes.func.invalid"));
      return;
    }
    setFuncError("");
    try {
      const result = await consultaFuncionario.mutateAsync(funcDigits);
      applyFuncLookup(result);
    } catch (err) {
      setFuncResult(null);
      setFuncError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.func.invalid"),
      );
    }
  }

  function applyFuncLookup(result: ConsultaFuncionarioResult) {
    setFuncResult(result);
    if (result.already_registered && result.matches.length === 1) {
      onOpenExisting?.(result.matches[0].codigo);
    }
  }

  async function copyFuncionario() {
    if (!funcResult?.can_copy || !onCreateFromFuncionario) {
      return;
    }
    await onCreateFromFuncionario(funcResult.cpf);
  }

  const update = useCallback(
    <K extends keyof ClienteFormValues>(key: K, value: ClienteFormValues[K]) => {
      setForm((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.ui_tipo === "funcionario" && onCreateFromFuncionario) {
      await onCreateFromFuncionario((form.cgc || "").replace(/\D/g, ""));
      return;
    }
    await onSubmit(payloadFromForm(form));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("administracao.clientes.new")}</DialogTitle>
          <DialogDescription>
            {t("administracao.clientes.form_description")}
          </DialogDescription>
        </DialogHeader>

        {step === "tipo" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["juridica", "administracao.clientes.type.juridica"],
                ["fisica", "administracao.clientes.type.fisica"],
                ["funcionario", "administracao.clientes.type.funcionario"],
                ["internacional", "administracao.clientes.type.internacional"],
              ] as const
            ).map(([tipo, labelKey]) => (
              <Button
                key={tipo}
                type="button"
                variant="outline"
                className="h-auto justify-start px-4 py-3 text-left"
                onClick={() => chooseTipo(tipo)}
              >
                {t(labelKey)}
              </Button>
            ))}
          </div>
        ) : step === "cnpj" ? (
          <ClienteCnpjLookupStep
            cnpj={cnpjQuery}
            loading={consultaCnpj.isPending}
            result={cnpjResult}
            error={cnpjError}
            onCnpjChange={(value) => {
              setCnpjQuery(value);
              setCnpjResult(null);
              setCnpjError("");
            }}
            onSearch={() => {
              void searchCnpj();
            }}
            onBack={() => setStep("tipo")}
            onOpenExisting={(codigo) => onOpenExisting?.(codigo)}
          />
        ) : step === "func" ? (
          <ClienteFuncLookupStep
            cpf={funcQuery}
            loading={consultaFuncionario.isPending}
            copying={submitting}
            result={funcResult}
            error={funcError || error}
            onCpfChange={(value) => {
              setFuncQuery(value);
              setFuncResult(null);
              setFuncError("");
            }}
            onSearch={() => {
              void searchFuncionario();
            }}
            onCopy={() => {
              void copyFuncionario();
            }}
            onBack={() => setStep("tipo")}
            onOpenExisting={(codigo) => onOpenExisting?.(codigo)}
          />
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {form.ui_tipo !== "internacional" && (
              <div className="space-y-2">
                <div className="flex items-end gap-2">
                  <FormInput
                    id="cliente-new-doc"
                    className="flex-1"
                    label={
                      form.ui_tipo === "juridica"
                        ? t("administracao.clientes.fields.cnpj")
                        : t("administracao.clientes.fields.cpf")
                    }
                    value={form.cgc ?? ""}
                    onChange={(event) => {
                      update("cgc", event.target.value);
                      setLookupDoc(event.target.value);
                    }}
                  />
                  {form.ui_tipo === "fisica" &&
                    lookupData &&
                    lookupData.matches.length > 0 && (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setApplyCopy(true)}
                      >
                        {t("administracao.clientes.copy_safe")}
                      </Button>
                    )}
                </div>
                {form.ui_tipo === "fisica" &&
                  lookupData &&
                  lookupData.matches.length > 0 && (
                    <Alert>
                      <AlertDescription>
                        {t("administracao.clientes.duplicate_warning", {
                          count: String(lookupData.matches.length),
                        })}
                      </AlertDescription>
                    </Alert>
                  )}
              </div>
            )}

            <ClienteDadosGeraisFields
              form={form}
              onChange={update}
              lockFromFuncionario={form.ui_tipo === "funcionario"}
              inDialog
            />

            <ClienteFormError error={error} />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("tipo")}
              >
                {t("administracao.clientes.back_type")}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t("module.cancel")}
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting
                  ? t("administracao.clientes.saving")
                  : t("module.save")}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
