import { describe, expect, it } from "vitest";
import type { ClienteContato } from "../types/cliente";
import {
  contatoCargoDepto,
  contatoLines,
  contatoMatches,
  contatoPhones,
} from "./clienteContatoDisplay";

function contato(partial: Partial<ClienteContato> = {}): ClienteContato {
  return {
    con_codigo: 1,
    codcliente: 10,
    nome: "Ana Souza",
    depto: "Vendas",
    cargo: "Gerente",
    telefone: "1111",
    fax: null,
    celular: "9999",
    email: "ana@acme.com",
    con_ativo: 1,
    is_comercial: true,
    is_tecnico: false,
    is_financeiro: false,
    ...partial,
  };
}

describe("clienteContatoDisplay", () => {
  it("joins department and role", () => {
    expect(contatoCargoDepto(contato())).toBe("Vendas · Gerente");
  });

  it("joins phone numbers", () => {
    expect(contatoPhones(contato())).toBe("1111 · 9999");
  });

  it("builds compact lines with mailto", () => {
    const lines = contatoLines(contato());
    expect(lines.map((line) => line.text)).toEqual([
      "Vendas · Gerente",
      "ana@acme.com",
      "1111 · 9999",
    ]);
    expect(lines.find((line) => line.key === "email")?.href).toBe(
      "mailto:ana@acme.com",
    );
  });

  it("matches search needle", () => {
    expect(contatoMatches(contato(), "ana")).toBe(true);
    expect(contatoMatches(contato(), "financeiro")).toBe(false);
  });
});
