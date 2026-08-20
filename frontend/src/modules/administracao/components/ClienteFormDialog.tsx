import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormCombobox } from "@/components/ui/forms";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useT } from "@/hooks/useT";
import { ApiError } from "../api/administracaoApi";
import {
  useClienteEstados,
  useClienteOrigens,
  useClientePaises,
  useConsultaCnpj,
  useConsultaFuncionario,
  useLookupClienteDocumento,
} from "../hooks/useClientes";
import { isCnpjKey, normalizeCnpj } from "../cnpj";
import type {
  ClienteDetail,
  ClienteTipoCadastro,
  ConsultaCnpjResult,
  ConsultaFuncionarioResult,
  DocumentoCopyFields,
  GravaClienteInput,
} from "../types/cliente";
import { ClienteCnpjLookupStep } from "./ClienteCnpjLookupStep";
import { ClienteFuncLookupStep } from "./ClienteFuncLookupStep";

export type ClienteFormValues = GravaClienteInput & {
  ui_tipo: "juridica" | "fisica" | "funcionario" | "internacional";
};

const EMPTY_FORM: ClienteFormValues = {
  ui_tipo: "juridica",
  tipo_cadastro: "J",
  cliente: "",
  reduzido: "",
  cgc: "",
  origem: "",
  inscr_est: "",
  endereco1: "",
  endereco2: "",
  endereco3: "",
  cidade: "",
  estado: "",
  est_codigo: null,
  telefone1: "",
  telefone2: "",
  homepage: "",
  email: "",
  pai_codigo: 76,
  cep: "",
  fax: "",
  cli_bairro: "",
  cli_nif: "",
  cli_pes_tipo: "",
  idioma_msg: "P",
};

type ClienteFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: ClienteDetail | null;
  submitting?: boolean;
  error?: string;
  onSubmit: (values: GravaClienteInput) => Promise<void>;
  onCreateFromFuncionario?: (cpf: string) => Promise<void>;
  onOpenExisting?: (codigo: number) => void;
};

function tipoFromUi(
  ui: ClienteFormValues["ui_tipo"],
): ClienteTipoCadastro {
  if (ui === "internacional") return "I";
  if (ui === "funcionario") return "FUNC";
  if (ui === "fisica") return "F";
  return "J";
}

function fromCliente(cliente: ClienteDetail): ClienteFormValues {
  const natureza = (cliente.tipo || "J").toUpperCase();
  let ui_tipo: ClienteFormValues["ui_tipo"] = "juridica";
  if (natureza === "I") ui_tipo = "internacional";
  else if (natureza === "F") ui_tipo = "fisica";
  return {
    ...EMPTY_FORM,
    ui_tipo,
    tipo_cadastro: tipoFromUi(ui_tipo),
    cliente: cliente.cliente ?? "",
    reduzido: cliente.reduzido ?? "",
    cgc: cliente.cgc ?? "",
    origem: cliente.origem ?? "",
    inscr_est: cliente.inscr_est ?? "",
    endereco1: cliente.endereco1 ?? "",
    endereco2: cliente.endereco2 ?? "",
    endereco3: cliente.endereco3 ?? "",
    cidade: cliente.cidade ?? "",
    estado: cliente.estado ?? "",
    est_codigo: cliente.est_codigo,
    telefone1: cliente.telefone1 ?? "",
    telefone2: cliente.telefone2 ?? "",
    homepage: cliente.homepage ?? "",
    email: cliente.email ?? "",
    pai_codigo: cliente.pai_codigo ?? 76,
    cep: cliente.cep ?? "",
    fax: cliente.fax ?? "",
    cli_bairro: cliente.cli_bairro ?? "",
    cli_nif: cliente.cli_nif ?? "",
    cli_pes_tipo: cliente.cli_pes_tipo ?? "",
    cli_inscr_mun: cliente.cli_inscr_mun,
    cli_ie_isento: cliente.cli_ie_isento ?? 0,
    cli_contribuinte: cliente.cli_contribuinte ?? 2,
    cli_cnae: cliente.cli_cnae,
    cli_cod_mun_ibge: cliente.cli_cod_mun_ibge,
    cli_inscr_suframa: cliente.cli_inscr_suframa,
    contato: cliente.contato,
    contatotec: cliente.contatotec,
    contatofin: cliente.contatofin,
    observa: cliente.observa,
    pais: cliente.pais,
  };
}

function applyCopyFields(
  base: ClienteFormValues,
  copy: DocumentoCopyFields,
): ClienteFormValues {
  return {
    ...base,
    cliente: copy.cliente ?? base.cliente,
    reduzido: copy.reduzido ?? base.reduzido,
    cgc: copy.cgc ?? base.cgc,
    inscr_est: copy.inscr_est ?? base.inscr_est,
    endereco1: copy.endereco1 ?? base.endereco1,
    endereco2: copy.endereco2 ?? base.endereco2,
    endereco3: copy.endereco3 ?? base.endereco3,
    cli_bairro: copy.cli_bairro ?? base.cli_bairro,
    cidade: copy.cidade ?? base.cidade,
    estado: copy.estado ?? base.estado,
    cep: copy.cep ?? base.cep,
    pais: copy.pais ?? base.pais,
    pai_codigo: copy.pai_codigo ?? base.pai_codigo,
    est_codigo: copy.est_codigo ?? base.est_codigo,
    telefone1: copy.telefone1 ?? base.telefone1,
    telefone2: copy.telefone2 ?? base.telefone2,
    fax: copy.fax ?? base.fax,
    email: copy.email ?? base.email,
    homepage: copy.homepage ?? base.homepage,
    origem: copy.origem ?? base.origem,
  };
}

function juridicaBase(cnpj: string): ClienteFormValues {
  return {
    ...EMPTY_FORM,
    ui_tipo: "juridica",
    tipo_cadastro: "J",
    cgc: cnpj,
    pai_codigo: 76,
    origem: "BR",
  };
}

export function ClienteFormDialog({
  open,
  onOpenChange,
  initial = null,
  submitting = false,
  error = "",
  onSubmit,
  onCreateFromFuncionario,
  onOpenExisting,
}: ClienteFormDialogProps) {
  const t = useT();
  const [step, setStep] = useState<"tipo" | "cnpj" | "func" | "form">("tipo");
  const [form, setForm] = useState<ClienteFormValues>(EMPTY_FORM);
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
  const isEdit = initial !== null;
  const consultaCnpj = useConsultaCnpj();
  const consultaFuncionario = useConsultaFuncionario();

  const { data: paises = [], isLoading: paisesLoading } = useClientePaises();
  const { data: origens = [] } = useClienteOrigens();
  const { data: estados = [] } = useClienteEstados(
    form.pai_codigo != null ? Number(form.pai_codigo) : null,
  );

  const digits = lookupDoc.replace(/\D/g, "");
  const canLookup =
    !isEdit && form.ui_tipo === "fisica" && digits.length === 11;
  const { data: lookupData } = useLookupClienteDocumento(digits, canLookup);

  const paisOptions = useMemo(
    () =>
      paises.map((pais) => ({
        value: String(pais.pai_codigo),
        label: pais.pai_nome || String(pais.pai_codigo),
      })),
    [paises],
  );

  const estadoOptions = useMemo(
    () =>
      estados.map((estado) => ({
        value: String(estado.est_codigo),
        label: estado.est_nome || String(estado.est_codigo),
      })),
    [estados],
  );

  const origemOptions = useMemo(
    () =>
      origens.map((origem) => ({
        value: String(origem.origem),
        label: origem.descricao || String(origem.origem),
      })),
    [origens],
  );

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm(fromCliente(initial));
      setStep("form");
      setLookupDoc(initial.cgc ?? "");
      setApplyCopy(false);
      setCnpjQuery("");
      setCnpjResult(null);
      setCnpjError("");
      setFuncQuery("");
      setFuncResult(null);
      setFuncError("");
      return;
    }
    setForm(EMPTY_FORM);
    setStep("tipo");
    setLookupDoc("");
    setApplyCopy(false);
    setCnpjQuery("");
    setCnpjResult(null);
    setCnpjError("");
    setFuncQuery("");
    setFuncResult(null);
    setFuncError("");
  }, [open, initial]);

  useEffect(() => {
    if (!applyCopy || !lookupData?.copy_fields) return;
    setForm((current) => applyCopyFields(current, lookupData.copy_fields!));
    setApplyCopy(false);
  }, [applyCopy, lookupData]);

  function chooseTipo(ui: ClienteFormValues["ui_tipo"]) {
    setForm({
      ...EMPTY_FORM,
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
    const digits = funcQuery.replace(/\D/g, "");
    if (digits.length !== 11) {
      setFuncResult(null);
      setFuncError(t("administracao.clientes.func.invalid"));
      return;
    }
    setFuncError("");
    try {
      const result = await consultaFuncionario.mutateAsync(digits);
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

  function update<K extends keyof ClienteFormValues>(
    key: K,
    value: ClienteFormValues[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.ui_tipo === "funcionario" && onCreateFromFuncionario) {
      await onCreateFromFuncionario((form.cgc || "").replace(/\D/g, ""));
      return;
    }
    const { ui_tipo: _ui, ...payload } = form;
    const documento =
      form.ui_tipo === "juridica"
        ? normalizeCnpj(form.cgc || "")
        : (form.cgc || "").replace(/\D/g, "");
    await onSubmit({
      ...payload,
      tipo_cadastro: tipoFromUi(form.ui_tipo),
      cgc: documento || null,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? t("administracao.clientes.edit")
              : t("administracao.clientes.new")}
          </DialogTitle>
          <DialogDescription>
            {t("administracao.clientes.form_description")}
          </DialogDescription>
        </DialogHeader>

        {!isEdit && step === "tipo" ? (
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
        ) : !isEdit && step === "cnpj" ? (
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
        ) : !isEdit && step === "func" ? (
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
            {!isEdit && form.ui_tipo !== "internacional" && (
              <div className="space-y-2">
                <Label htmlFor="cliente-doc">
                  {form.ui_tipo === "juridica"
                    ? t("administracao.clientes.fields.cnpj")
                    : t("administracao.clientes.fields.cpf")}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="cliente-doc"
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="cliente-nome">
                  {t("administracao.clientes.fields.nome")}
                </Label>
                <Input
                  id="cliente-nome"
                  value={form.cliente}
                  onChange={(event) => update("cliente", event.target.value)}
                  required={form.ui_tipo !== "funcionario"}
                  disabled={form.ui_tipo === "funcionario"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente-reduzido">
                  {t("administracao.clientes.fields.reduzido")}
                </Label>
                <Input
                  id="cliente-reduzido"
                  value={form.reduzido ?? ""}
                  onChange={(event) => update("reduzido", event.target.value)}
                  required={form.ui_tipo !== "funcionario"}
                  disabled={form.ui_tipo === "funcionario"}
                />
              </div>
              {form.ui_tipo === "internacional" && (
                <div className="space-y-2">
                  <Label htmlFor="cliente-nif">
                    {t("administracao.clientes.fields.nif")}
                  </Label>
                  <Input
                    id="cliente-nif"
                    value={form.cli_nif ?? ""}
                    onChange={(event) => update("cli_nif", event.target.value)}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="cliente-ie">
                  {t("administracao.clientes.fields.ie")}
                </Label>
                <Input
                  id="cliente-ie"
                  value={form.inscr_est ?? ""}
                  onChange={(event) => update("inscr_est", event.target.value)}
                  disabled={form.ui_tipo === "funcionario"}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="cliente-endereco">
                  {t("administracao.clientes.fields.endereco")}
                </Label>
                <Input
                  id="cliente-endereco"
                  value={form.endereco1 ?? ""}
                  onChange={(event) => update("endereco1", event.target.value)}
                  disabled={form.ui_tipo === "funcionario"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente-bairro">
                  {t("administracao.clientes.fields.bairro")}
                </Label>
                <Input
                  id="cliente-bairro"
                  value={form.cli_bairro ?? ""}
                  onChange={(event) => update("cli_bairro", event.target.value)}
                  disabled={form.ui_tipo === "funcionario"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente-cidade">
                  {t("administracao.clientes.fields.cidade")}
                </Label>
                <Input
                  id="cliente-cidade"
                  value={form.cidade ?? ""}
                  onChange={(event) => update("cidade", event.target.value)}
                  disabled={form.ui_tipo === "funcionario"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente-cep">
                  {t("administracao.clientes.fields.cep")}
                </Label>
                <Input
                  id="cliente-cep"
                  value={form.cep ?? ""}
                  onChange={(event) => update("cep", event.target.value)}
                  disabled={form.ui_tipo === "funcionario"}
                />
              </div>
              <div className="space-y-2">
                <FormCombobox
                  id="cliente-pais"
                  label={t("administracao.clientes.fields.pais")}
                  options={paisOptions}
                  value={
                    paisOptions.find(
                      (option) => option.value === String(form.pai_codigo),
                    ) ?? null
                  }
                  onChange={(option) => {
                    const selected = Array.isArray(option) ? option[0] : option;
                    update(
                      "pai_codigo",
                      selected?.value ? Number(selected.value) : null,
                    );
                    update("est_codigo", null);
                    update("estado", "");
                  }}
                  placeholder={
                    paisesLoading
                      ? t("administracao.clientes.pais_loading")
                      : t("administracao.clientes.pais_search")
                  }
                  isDisabled={form.ui_tipo === "funcionario"}
                  isLoading={paisesLoading}
                  menuPortalTarget={
                    typeof document !== "undefined" ? document.body : undefined
                  }
                />
              </div>
              <div className="space-y-2">
                <FormCombobox
                  id="cliente-estado"
                  label={t("administracao.clientes.fields.estado")}
                  options={estadoOptions}
                  value={
                    estadoOptions.find(
                      (option) => option.value === String(form.est_codigo),
                    ) ?? null
                  }
                  onChange={(option) => {
                    const selected = Array.isArray(option) ? option[0] : option;
                    const estado = estados.find(
                      (row) => String(row.est_codigo) === selected?.value,
                    );
                    update(
                      "est_codigo",
                      selected?.value ? Number(selected.value) : null,
                    );
                    update("estado", estado?.est_nome ?? "");
                  }}
                  placeholder={t("administracao.clientes.estado_search")}
                  isDisabled={form.ui_tipo === "funcionario"}
                  menuPortalTarget={
                    typeof document !== "undefined" ? document.body : undefined
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente-telefone">
                  {t("administracao.clientes.fields.telefone")}
                </Label>
                <Input
                  id="cliente-telefone"
                  value={form.telefone1 ?? ""}
                  onChange={(event) => update("telefone1", event.target.value)}
                  disabled={form.ui_tipo === "funcionario"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente-email">
                  {t("administracao.clientes.fields.email")}
                </Label>
                <Input
                  id="cliente-email"
                  value={form.email ?? ""}
                  onChange={(event) => update("email", event.target.value)}
                  disabled={form.ui_tipo === "funcionario"}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <FormCombobox
                  id="cliente-origem"
                  label={t("administracao.clientes.fields.origem")}
                  options={origemOptions}
                  value={
                    origemOptions.find(
                      (option) => option.value === (form.origem ?? ""),
                    ) ?? null
                  }
                  onChange={(option) => {
                    const selected = Array.isArray(option) ? option[0] : option;
                    update("origem", selected?.value || null);
                  }}
                  placeholder={t("administracao.clientes.origem_search")}
                  isDisabled={form.ui_tipo === "funcionario"}
                  menuPortalTarget={
                    typeof document !== "undefined" ? document.body : undefined
                  }
                />
              </div>
            </div>

            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <DialogFooter className="gap-2 sm:gap-0">
              {!isEdit && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep("tipo")}
                >
                  {t("administracao.clientes.back_type")}
                </Button>
              )}
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
