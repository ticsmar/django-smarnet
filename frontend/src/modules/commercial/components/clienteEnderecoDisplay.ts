import type { ClienteCobranca, ClienteEmbarque } from "../types/cliente";
import {
  joinPresent,
  mailtoHref,
  present,
  type DisplayLine,
} from "./clienteDisplay";

export type EnderecoRefRow = {
  chave: string;
  nome: string | null;
  endereco1: string | null;
  endereco2: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  est_nome: string | null;
  cep: string | null;
  pais: string | null;
  pais_nome: string | null;
  contato: string | null;
  telefone1: string | null;
  telefone2: string | null;
  email: string | null;
  ativo: number | null;
  cli_codigo_ref: number | null;
  is_padrao: boolean;
};

export function fromCobranca(item: ClienteCobranca): EnderecoRefRow {
  return {
    chave: item.chavecobra,
    nome: item.nome,
    endereco1: item.endereco1,
    endereco2: item.endereco2,
    bairro: item.cob_bairro,
    cidade: item.cidade,
    estado: item.estado,
    est_nome: item.est_nome ?? null,
    cep: item.cep,
    pais: item.pais,
    pais_nome: item.pais_nome ?? null,
    contato: item.contato,
    telefone1: item.telefone1,
    telefone2: item.telefone2,
    email: item.e_mail,
    ativo: item.ativo,
    cli_codigo_ref: item.cli_codigo_ref,
    is_padrao: item.is_padrao,
  };
}

export function fromEmbarque(item: ClienteEmbarque): EnderecoRefRow {
  return {
    chave: item.chave_emb,
    nome: item.nome,
    endereco1: item.endereco1,
    endereco2: item.endereco2,
    bairro: item.emb_bairro,
    cidade: item.cidade,
    estado: item.estado,
    est_nome: item.est_nome ?? null,
    cep: item.cep,
    pais: item.pais,
    pais_nome: item.pais_nome ?? null,
    contato: item.contato,
    telefone1: item.telefone1,
    telefone2: item.telefone2,
    email: item.e_mail,
    ativo: item.ativo,
    cli_codigo_ref: item.cli_codigo_ref,
    is_padrao: item.is_padrao,
  };
}

export function estadoDisplayName(row: EnderecoRefRow): string | null {
  return present(row.est_nome) ?? present(row.estado);
}

export function paisDisplayName(row: EnderecoRefRow): string | null {
  return present(row.pais_nome) ?? present(row.pais);
}

export function enderecoCidadeUf(row: EnderecoRefRow): string | null {
  return joinPresent([row.cidade, estadoDisplayName(row)], " / ");
}

export function streetCityLine(row: EnderecoRefRow): string | null {
  const street = joinPresent([row.endereco1, row.endereco2], ", ");
  const cidade = present(row.cidade);
  if (street && cidade) {
    return `${street} - ${cidade},`;
  }
  if (street) {
    return street;
  }
  if (cidade) {
    return `${cidade},`;
  }
  return null;
}

export function estadoPaisLine(row: EnderecoRefRow): string | null {
  const estado = estadoDisplayName(row);
  const pais = paisDisplayName(row);
  if (estado && pais) {
    return `${estado}\\${pais}`;
  }
  return estado ?? pais;
}

export function addressLines(row: EnderecoRefRow): DisplayLine[] {
  const lines: DisplayLine[] = [];
  const streetCity = streetCityLine(row);
  if (streetCity) {
    lines.push({ key: "street", text: streetCity });
  }
  const estadoPais = estadoPaisLine(row);
  if (estadoPais) {
    lines.push({ key: "estado_pais", text: estadoPais });
  }
  const cep = present(row.cep);
  if (cep) {
    lines.push({ key: "cep", text: cep });
  }
  return lines;
}

export function contactLines(row: EnderecoRefRow): DisplayLine[] {
  const lines: DisplayLine[] = [];
  const contato = present(row.contato);
  if (contato) {
    lines.push({ key: "contato", text: contato });
  }
  const email = present(row.email);
  if (email) {
    lines.push({
      key: "email",
      text: email,
      href: mailtoHref(email) ?? undefined,
    });
  }
  const phones = joinPresent([row.telefone1, row.telefone2], ", ");
  if (phones) {
    lines.push({ key: "phones", text: phones });
  }
  return lines;
}

export function enderecoMatches(row: EnderecoRefRow, needle: string): boolean {
  if (!needle) {
    return true;
  }
  const hay = [
    row.chave,
    row.nome,
    row.cidade,
    row.estado,
    row.est_nome,
    row.contato,
    row.email,
    row.endereco1,
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(needle);
}
