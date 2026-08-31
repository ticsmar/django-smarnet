import { describe, expect, it } from "vitest";
import type { ClienteCobranca } from "../types/cliente";
import {
  addressLines,
  fromCobranca,
  enderecoMatches,
  type EnderecoRefRow,
} from "./clienteEnderecoDisplay";

function row(partial: Partial<EnderecoRefRow> = {}): EnderecoRefRow {
  return {
    chave: "1",
    nome: "Cliente",
    endereco1: "Rua Tal",
    endereco2: "100",
    bairro: null,
    cidade: "Piracicaba",
    estado: "SP",
    est_nome: "São Paulo",
    cep: "13400-000",
    pais: "BRA",
    pais_nome: "Brasil",
    contato: null,
    telefone1: null,
    telefone2: null,
    email: null,
    ativo: 1,
    cli_codigo_ref: 10,
    is_padrao: true,
    ...partial,
  };
}

describe("addressLines", () => {
  it("formats street, city, state name, country and CEP", () => {
    expect(addressLines(row()).map((line) => line.text)).toEqual([
      "Rua Tal, 100 - Piracicaba,",
      "São Paulo\\Brasil",
      "13400-000",
    ]);
  });

  it("falls back to UF and country code when names are missing", () => {
    const lines = addressLines(
      row({ est_nome: null, pais_nome: null, endereco2: null }),
    );
    expect(lines.map((line) => line.text)).toEqual([
      "Rua Tal - Piracicaba,",
      "SP\\BRA",
      "13400-000",
    ]);
  });
});

describe("fromCobranca / enderecoMatches", () => {
  it("maps cobranca chave and matches city search", () => {
    const cobranca: ClienteCobranca = {
      codigo: 1,
      chavecobra: "000000001",
      nome: "ACME",
      endereco1: "Rua Tal",
      endereco2: "100",
      endereco3: null,
      cob_bairro: null,
      cidade: "Piracicaba",
      estado: "SP",
      est_nome: "São Paulo",
      cep: "13400-000",
      pais: "BRA",
      pais_nome: "Brasil",
      contato: "Ana",
      telefone1: null,
      telefone2: null,
      e_mail: null,
      ativo: 1,
      cli_codigo_ref: 10,
      is_padrao: true,
    };
    const mapped = fromCobranca(cobranca);
    expect(mapped.chave).toBe("000000001");
    expect(enderecoMatches(mapped, "piracicaba")).toBe(true);
    expect(enderecoMatches(mapped, "santos")).toBe(false);
  });
});
