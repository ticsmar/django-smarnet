import { useEffect, useMemo, type ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormCombobox,
  FormFieldShell,
  FormGrid,
  FormInput,
  FormSection,
  type FormComboboxGroup,
  type FormComboboxOption,
} from "@/components/ui/forms";
import { useT } from "@/hooks/useT";
import {
  BRASIL_PAI_CODIGO,
  CLI_CONTRIBUINTE_CODES,
  CLI_MOD_PAGT_CODES,
  CLI_TIPO_CODES,
} from "../clienteConstants";
import {
  useClienteAreasOs,
  useClienteArclasses,
  useClienteArlevels,
  useClienteArsalesps,
  useClienteCidades,
  useClienteEstados,
  useClienteModelosPagto,
  useClienteOrigens,
  useClientePaises,
} from "../hooks/useClientes";
import type { ClienteFormValues } from "./clienteFormModel";
import { tipoFromUi } from "./clienteFormModel";

type ClienteDadosGeraisFieldsProps = {
  form: ClienteFormValues;
  onChange: <K extends keyof ClienteFormValues>(
    key: K,
    value: ClienteFormValues[K],
  ) => void;
  lockFromFuncionario?: boolean;
  documentoReadOnly?: boolean;
  inDialog?: boolean;
  disabled?: boolean;
  statusSlot?: ReactNode;
};

export function ClienteDadosGeraisFields({
  form,
  onChange,
  lockFromFuncionario = false,
  documentoReadOnly = false,
  inDialog = false,
  disabled = false,
  statusSlot,
}: ClienteDadosGeraisFieldsProps) {
  const t = useT();
  const locked = lockFromFuncionario || disabled;
  const { data: paises = [], isLoading: paisesLoading } = useClientePaises();
  const { data: origens = [] } = useClienteOrigens();
  const { data: arclasses = [] } = useClienteArclasses();
  const { data: arlevels = [] } = useClienteArlevels();
  const { data: arsalesps = [] } = useClienteArsalesps();
  const { data: estados = [] } = useClienteEstados(
    form.pai_codigo != null ? Number(form.pai_codigo) : null,
  );
  const isBrasil = Number(form.pai_codigo) === BRASIL_PAI_CODIGO;
  const { data: cidades = [] } = useClienteCidades(
    isBrasil && form.pai_codigo != null ? Number(form.pai_codigo) : null,
    isBrasil && form.est_codigo != null ? Number(form.est_codigo) : null,
  );
  const { data: modelos = [] } = useClienteModelosPagto({
    origem: form.origem ?? null,
    mpgCodigo: form.mpg_codigo ?? null,
    riscoProtheus: null,
  });
  const { data: areasCom = [] } = useClienteAreasOs({
    tipo: "C",
    munIbge: form.cli_cod_mun_ibge ?? null,
    estCodigo: form.est_codigo ?? null,
    paiCodigo: form.pai_codigo ?? null,
    current: form.aos_codigo_com ?? null,
  });
  const { data: areasTec = [] } = useClienteAreasOs({
    tipo: "E",
    munIbge: form.cli_cod_mun_ibge ?? null,
    estCodigo: form.est_codigo ?? null,
    paiCodigo: form.pai_codigo ?? null,
    current: form.aos_codigo_tec ?? null,
  });

  const menuPortalTarget =
    inDialog && typeof document !== "undefined" ? document.body : undefined;

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
        label: estado.est_nome || estado.est_sigla || String(estado.est_codigo),
      })),
    [estados],
  );
  const cidadeOptions = useMemo(
    () =>
      cidades.map((cidade) => ({
        value: cidade.codigo,
        label: cidade.descricao || cidade.codigo,
      })),
    [cidades],
  );
  const origemOptions = useMemo(() => {
    const options = origens.map((origem) => ({
      value: String(origem.origem),
      label: origem.descricao || String(origem.origem),
    }));
    const current = (form.origem ?? "").trim();
    if (current && !options.some((option) => option.value === current)) {
      options.unshift({ value: current, label: current });
    }
    return options;
  }, [origens, form.origem]);
  const territorioOptions = useMemo(() => {
    const options = arlevels.map((item) => ({
      value: item.terr_key,
      label: item.description?.trim() || item.terr_key,
    }));
    const current = (form.territorio ?? "").trim();
    if (current && !options.some((option) => option.value === current)) {
      options.unshift({ value: current, label: current });
    }
    return options;
  }, [arlevels, form.territorio]);
  const segmentoOptions = useMemo(() => {
    const options = arclasses.map((item) => ({
      value: item.class_key,
      label: item.descr?.trim() || item.class_key,
    }));
    const current = (form.classe ?? "").trim();
    if (current && !options.some((option) => option.value === current)) {
      options.unshift({ value: current, label: current });
    }
    return options;
  }, [arclasses, form.classe]);
  const vendedorOptions = useMemo(() => {
    const groups = new Map<string, FormComboboxOption[]>();
    for (const item of arsalesps) {
      const empNome = item.emp_nome?.trim() || "NOVA SMAR S/A";
      const option: FormComboboxOption = {
        value: item.salesp_key,
        label: item.nome?.trim()
          ? `${item.salesp_key} - ${item.nome.trim()}`
          : item.salesp_key,
      };
      const list = groups.get(empNome) ?? [];
      list.push(option);
      groups.set(empNome, list);
    }
    const grouped: FormComboboxGroup[] = [...groups.entries()].map(
      ([label, options]) => ({ label, options }),
    );
    const current = (form.vendedor ?? "").trim();
    const hasCurrent = grouped.some((group) =>
      group.options.some((option) => option.value === current),
    );
    if (current && !hasCurrent) {
      grouped.unshift({
        label: "",
        options: [{ value: current, label: current }],
      });
    }
    return grouped;
  }, [arsalesps, form.vendedor]);
  const vendedorValue =
    vendedorOptions
      .flatMap((group) => group.options)
      .find((option) => option.value === (form.vendedor ?? "")) ?? null;
  const cliTipoOptions = useMemo(
    () =>
      CLI_TIPO_CODES.map((code) => ({
        value: code,
        label: t(`administracao.clientes.cli_tipo.${code}`),
      })),
    [t],
  );
  const naturezaOptions = useMemo(
    () => [
      { value: "J", label: t("administracao.clientes.type.juridica") },
      { value: "F", label: t("administracao.clientes.type.fisica") },
      { value: "I", label: t("administracao.clientes.type.internacional") },
    ],
    [t],
  );
  const contribuinteOptions = useMemo(
    () =>
      CLI_CONTRIBUINTE_CODES.map((code) => ({
        value: String(code),
        label: t(`administracao.clientes.contribuinte.${code}`),
      })),
    [t],
  );
  const modoPagtoOptions = useMemo(
    () =>
      CLI_MOD_PAGT_CODES.map((code) => ({
        value: code,
        label: t(`administracao.clientes.mod_pagt.${code}`),
      })),
    [t],
  );
  const modeloOptions = useMemo(
    () =>
      modelos.map((item) => ({
        value: String(item.mpg_codigo),
        label: item.descricao || String(item.mpg_codigo),
      })),
    [modelos],
  );
  const areaComOptions = useMemo(
    () =>
      areasCom.map((area) => ({
        value: String(area.aos_codigo),
        label: area.aos_nome || String(area.aos_codigo),
      })),
    [areasCom],
  );
  const areaTecOptions = useMemo(
    () =>
      areasTec.map((area) => ({
        value: String(area.aos_codigo),
        label: area.aos_nome || String(area.aos_codigo),
      })),
    [areasTec],
  );

  useEffect(() => {
    if (form.aos_codigo_com != null) {
      return;
    }
    const chosen = areasCom.find((area) => area.is_default);
    if (chosen) {
      onChange("aos_codigo_com", chosen.aos_codigo);
    }
  }, [areasCom, form.aos_codigo_com, onChange]);

  useEffect(() => {
    if (form.aos_codigo_tec != null) {
      return;
    }
    const chosen = areasTec.find((area) => area.is_default);
    if (chosen) {
      onChange("aos_codigo_tec", chosen.aos_codigo);
    }
  }, [areasTec, form.aos_codigo_tec, onChange]);

  const naturezaValue =
    form.ui_tipo === "internacional" ? "I" : form.ui_tipo === "fisica" ? "F" : "J";

  return (
    <div className="space-y-6">
      <FormSection>
        <FormGrid cols={2} className="items-end">
            <FormInput
              id="cliente-nome"
              label={t("administracao.clientes.fields.nome")}
              value={form.cliente}
              required={!locked}
              disabled={locked}
              onChange={(event) => onChange("cliente", event.target.value)}
            />
            <FormCombobox
              id="cliente-natureza"
              label={t("administracao.clientes.fields.natureza")}
              options={naturezaOptions}
              value={
                naturezaOptions.find((option) => option.value === naturezaValue) ??
                null
              }
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                const uiTipo = uiTipoFromNaturezaCode(selected?.value);
                onChange("ui_tipo", uiTipo);
                onChange("tipo_cadastro", tipoFromUi(uiTipo));
              }}
              isDisabled={locked || lockFromFuncionario}
              menuPortalTarget={menuPortalTarget}
            />
            <FormInput
              id="cliente-reduzido"
              label={t("administracao.clientes.fields.reduzido")}
              value={form.reduzido ?? ""}
              required={!locked}
              disabled={locked}
              onChange={(event) => onChange("reduzido", event.target.value)}
            />
            <FormCombobox
              id="cliente-contribuinte"
              label={t("administracao.clientes.fields.contribuinte")}
              options={contribuinteOptions}
              value={
                contribuinteOptions.find(
                  (option) => option.value === String(form.cli_contribuinte ?? 2),
                ) ?? null
              }
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                onChange(
                  "cli_contribuinte",
                  selected?.value ? Number(selected.value) : 2,
                );
              }}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            <FormInput
              id="cliente-cgc"
              label={
                form.ui_tipo === "juridica"
                  ? t("administracao.clientes.fields.cnpj")
                  : form.ui_tipo === "internacional"
                    ? t("administracao.clientes.fields.documento")
                    : t("administracao.clientes.fields.cpf")
              }
              value={form.cgc ?? ""}
              disabled={documentoReadOnly || locked}
              onChange={(event) => onChange("cgc", event.target.value)}
            />
            <FormCombobox
              id="cliente-cli-tipo"
              label={t("administracao.clientes.fields.cli_tipo")}
              options={cliTipoOptions}
              value={
                cliTipoOptions.find(
                  (option) => option.value === (form.cli_tipo ?? ""),
                ) ?? null
              }
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                onChange("cli_tipo", selected?.value || null);
              }}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            <FormFieldShell
              id="cliente-ie"
              label={t("administracao.clientes.fields.ie")}
            >
              <div className="flex h-10 items-center gap-3">
                <FormInput
                  id="cliente-ie"
                  containerClassName="flex-1"
                  value={form.inscr_est ?? ""}
                  disabled={locked}
                  onChange={(event) => onChange("inscr_est", event.target.value)}
                />
                <label className="flex items-center gap-2 whitespace-nowrap text-xs">
                  <Checkbox
                    checked={Number(form.cli_ie_isento) === 1}
                    disabled={locked}
                    onCheckedChange={(value) =>
                      onChange("cli_ie_isento", value === true ? 1 : 0)
                    }
                  />
                  {t("administracao.clientes.fields.ie_isento")}
                </label>
              </div>
            </FormFieldShell>
            <FormCombobox
              id="cliente-mpg"
              label={t("administracao.clientes.fields.mpg")}
              options={modeloOptions}
              value={
                modeloOptions.find(
                  (option) => option.value === String(form.mpg_codigo ?? ""),
                ) ?? null
              }
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                onChange(
                  "mpg_codigo",
                  selected?.value ? Number(selected.value) : null,
                );
              }}
              placeholder={t("administracao.clientes.mpg_search")}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            <FormInput
              id="cliente-im"
              label={t("administracao.clientes.fields.im")}
              value={form.cli_inscr_mun ?? ""}
              disabled={locked}
              onChange={(event) => onChange("cli_inscr_mun", event.target.value)}
            />
            <FormCombobox
              id="cliente-mod-pagt"
              label={t("administracao.clientes.fields.mod_pagt")}
              options={modoPagtoOptions}
              value={
                modoPagtoOptions.find(
                  (option) => option.value === (form.cli_mod_pagt ?? "T"),
                ) ?? null
              }
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                onChange("cli_mod_pagt", selected?.value || "T");
              }}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            {statusSlot}
        </FormGrid>
      </FormSection>

      <FormSection title={t("administracao.clientes.sections.endereco")}>
        <FormGrid cols={2} className="items-end">
            <FormInput
              id="cliente-cep"
              label={t("administracao.clientes.fields.cep")}
              value={form.cep ?? ""}
              disabled={locked}
              onChange={(event) => onChange("cep", event.target.value)}
            />
            <FormInput
              id="cliente-endereco"
              label={t("administracao.clientes.fields.endereco")}
              value={form.endereco1 ?? ""}
              disabled={locked}
              onChange={(event) => onChange("endereco1", event.target.value)}
            />
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
                onChange(
                  "pai_codigo",
                  selected?.value ? Number(selected.value) : null,
                );
                onChange("est_codigo", null);
                onChange("estado", "");
                onChange("cidade", "");
                onChange("cli_cod_mun_ibge", null);
              }}
              placeholder={
                paisesLoading
                  ? t("administracao.clientes.pais_loading")
                  : t("administracao.clientes.pais_search")
              }
              isDisabled={locked}
              isLoading={paisesLoading}
              menuPortalTarget={menuPortalTarget}
            />
            <FormInput
              id="cliente-endereco2"
              label={t("administracao.clientes.fields.endereco2")}
              value={form.endereco2 ?? ""}
              disabled={locked}
              onChange={(event) => onChange("endereco2", event.target.value)}
            />
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
                onChange(
                  "est_codigo",
                  selected?.value ? Number(selected.value) : null,
                );
                onChange("estado", estado?.est_sigla || estado?.est_nome || "");
                onChange("cidade", "");
                onChange("cli_cod_mun_ibge", null);
              }}
              placeholder={t("administracao.clientes.estado_search")}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            <FormInput
              id="cliente-bairro"
              label={t("administracao.clientes.fields.bairro")}
              value={form.cli_bairro ?? ""}
              disabled={locked}
              onChange={(event) => onChange("cli_bairro", event.target.value)}
            />
            {isBrasil ? (
              <FormCombobox
                id="cliente-cidade"
                label={t("administracao.clientes.fields.cidade")}
                options={cidadeOptions}
                value={
                  cidadeOptions.find(
                    (option) => option.value === (form.cli_cod_mun_ibge ?? ""),
                  )
                  ?? cidadeOptions.find(
                    (option) => option.label === (form.cidade ?? ""),
                  )
                  ?? null
                }
                onChange={(option) => {
                  const selected = Array.isArray(option) ? option[0] : option;
                  const cidade = cidades.find((row) => row.codigo === selected?.value);
                  onChange("cli_cod_mun_ibge", selected?.value || null);
                  onChange("cidade", cidade?.descricao ?? "");
                }}
                placeholder={t("administracao.clientes.cidade_search")}
                isDisabled={locked}
                menuPortalTarget={menuPortalTarget}
              />
            ) : (
              <FormInput
                id="cliente-cidade"
                label={t("administracao.clientes.fields.cidade")}
                value={form.cidade ?? ""}
                disabled={locked}
                onChange={(event) => onChange("cidade", event.target.value)}
              />
            )}
        </FormGrid>
      </FormSection>

      <FormSection title={t("administracao.clientes.sections.outros")}>
        <FormGrid cols={2} className="items-end">
            <FormInput
              id="cliente-tel1"
              label={t("administracao.clientes.fields.telefone1")}
              value={form.telefone1 ?? ""}
              disabled={locked}
              onChange={(event) => onChange("telefone1", event.target.value)}
            />
            <FormInput
              id="cliente-email-nfe"
              label={t("administracao.clientes.fields.email_nfe")}
              value={form.email ?? ""}
              disabled={locked}
              onChange={(event) => onChange("email", event.target.value)}
            />
            <FormInput
              id="cliente-tel2"
              label={t("administracao.clientes.fields.telefone2")}
              value={form.telefone2 ?? ""}
              disabled={locked}
              onChange={(event) => onChange("telefone2", event.target.value)}
            />
            <FormInput
              id="cliente-email-nfse"
              label={t("administracao.clientes.fields.email_nfse")}
              value={form.cli_email_nfse ?? ""}
              disabled={locked}
              onChange={(event) => onChange("cli_email_nfse", event.target.value)}
            />
            <FormInput
              id="cliente-fax"
              label={t("administracao.clientes.fields.fax")}
              value={form.fax ?? ""}
              disabled={locked}
              onChange={(event) => onChange("fax", event.target.value)}
            />
            <FormInput
              id="cliente-homepage"
              label={t("administracao.clientes.fields.homepage")}
              value={form.homepage ?? ""}
              disabled={locked}
              onChange={(event) => onChange("homepage", event.target.value)}
            />
        </FormGrid>
      </FormSection>

      <FormSection title={t("administracao.clientes.sections.caracteristicas")}>
        <FormGrid cols={2} className="items-end">
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
                onChange("origem", selected?.value || null);
              }}
              placeholder={t("administracao.clientes.origem_search")}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            <FormCombobox
              id="cliente-segmento"
              label={t("administracao.clientes.fields.segmento")}
              options={segmentoOptions}
              value={
                segmentoOptions.find(
                  (option) => option.value === (form.classe ?? ""),
                ) ?? null
              }
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                onChange("classe", selected?.value || null);
              }}
              placeholder={t("administracao.clientes.segmento_search")}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            <FormCombobox
              id="cliente-aos-com"
              label={t("administracao.clientes.fields.aos_com")}
              options={areaComOptions}
              value={
                areaComOptions.find(
                  (option) => option.value === String(form.aos_codigo_com ?? ""),
                ) ?? null
              }
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                onChange(
                  "aos_codigo_com",
                  selected?.value ? Number(selected.value) : null,
                );
              }}
              placeholder={t("administracao.clientes.aos_search")}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            <FormCombobox
              id="cliente-aos-tec"
              label={t("administracao.clientes.fields.aos_tec")}
              options={areaTecOptions}
              value={
                areaTecOptions.find(
                  (option) => option.value === String(form.aos_codigo_tec ?? ""),
                ) ?? null
              }
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                onChange(
                  "aos_codigo_tec",
                  selected?.value ? Number(selected.value) : null,
                );
              }}
              placeholder={t("administracao.clientes.aos_search")}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            <FormCombobox
              id="cliente-territorio"
              label={t("administracao.clientes.fields.territorio")}
              options={territorioOptions}
              value={
                territorioOptions.find(
                  (option) => option.value === (form.territorio ?? ""),
                ) ?? null
              }
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                onChange("territorio", selected?.value || null);
              }}
              placeholder={t("administracao.clientes.territorio_search")}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
            <FormCombobox
              id="cliente-vendedor"
              label={t("administracao.clientes.fields.vendedor")}
              options={vendedorOptions}
              value={vendedorValue}
              onChange={(option) => {
                const selected = Array.isArray(option) ? option[0] : option;
                onChange("vendedor", selected?.value || null);
              }}
              placeholder={t("administracao.clientes.vendedor_search")}
              isDisabled={locked}
              menuPortalTarget={menuPortalTarget}
            />
        </FormGrid>
      </FormSection>
    </div>
  );
}

type NaturezaCode = "J" | "F" | "I";

function uiTipoFromNaturezaCode(
  value: string | undefined,
): ClienteFormValues["ui_tipo"] {
  const code: NaturezaCode =
    value === "I" || value === "F" || value === "J" ? value : "J";
  switch (code) {
    case "I":
      return "internacional";
    case "F":
      return "fisica";
    case "J":
      return "juridica";
    default: {
      const _exhaustive: never = code;
      return _exhaustive;
    }
  }
}

export function ClienteFormError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }
  return (
    <Alert variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
