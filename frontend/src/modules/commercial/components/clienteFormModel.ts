import { normalizeCnpj } from "../cnpj";
import type {
  ClienteDetail,
  ClienteTipoCadastro,
  DocumentoCopyFields,
  GravaClienteInput,
} from "../types/cliente";

export type ClienteFormValues = GravaClienteInput & {
  ui_tipo: "juridica" | "fisica" | "funcionario" | "internacional";
};

export const EMPTY_CLIENTE_FORM: ClienteFormValues = {
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
  cli_tipo: "R",
  aos_codigo_com: null,
  aos_codigo_tec: null,
  classe: "",
  mpg_codigo: null,
  cli_mod_pagt: "T",
  cli_email_nfse: "",
  territorio: "",
  vendedor: "",
  idioma_msg: "P",
};

export function tipoFromUi(
  ui: ClienteFormValues["ui_tipo"],
): ClienteTipoCadastro {
  if (ui === "internacional") return "I";
  if (ui === "funcionario") return "FUNC";
  if (ui === "fisica") return "F";
  return "J";
}

export function uiTipoFromNatureza(
  tipo: string | null,
): ClienteFormValues["ui_tipo"] {
  const natureza = (tipo || "J").toUpperCase();
  if (natureza === "I") return "internacional";
  if (natureza === "F") return "fisica";
  return "juridica";
}

export function formFromCliente(cliente: ClienteDetail): ClienteFormValues {
  const ui_tipo = uiTipoFromNatureza(cliente.tipo);
  return {
    ...EMPTY_CLIENTE_FORM,
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
    cli_tipo: cliente.cli_tipo ?? "R",
    aos_codigo_com: cliente.aos_codigo_com ?? null,
    aos_codigo_tec: cliente.aos_codigo_tec ?? null,
    classe: cliente.classe ?? "",
    mpg_codigo: cliente.mpg_codigo ?? null,
    cli_mod_pagt: cliente.cli_mod_pagt ?? "T",
    cli_email_nfse: cliente.cli_email_nfse ?? "",
    territorio: cliente.territorio ?? "",
    vendedor: cliente.vendedor ?? "",
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

export function applyCopyFields(
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

export function payloadFromForm(form: ClienteFormValues): GravaClienteInput {
  const { ui_tipo: _ui, ...payload } = form;
  const documento =
    form.ui_tipo === "juridica"
      ? normalizeCnpj(form.cgc || "")
      : (form.cgc || "").replace(/\D/g, "");
  return {
    ...payload,
    tipo_cadastro: tipoFromUi(form.ui_tipo),
    cgc: documento || null,
  };
}

export function juridicaBase(cnpj: string): ClienteFormValues {
  return {
    ...EMPTY_CLIENTE_FORM,
    ui_tipo: "juridica",
    tipo_cadastro: "J",
    cgc: cnpj,
    pai_codigo: 76,
    origem: "BR",
  };
}
