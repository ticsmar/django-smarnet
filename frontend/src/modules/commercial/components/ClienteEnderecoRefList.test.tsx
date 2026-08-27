import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { EnderecoRefRow } from "./clienteEnderecoDisplay";
import { ClienteEnderecoRefList } from "./ClienteEnderecoRefList";

vi.mock("@/hooks/useT", () => ({
  useT: () => (key: string) => key,
}));

function row(partial: Partial<EnderecoRefRow> = {}): EnderecoRefRow {
  return {
    chave: "000000001",
    nome: "ACME Cobrança",
    endereco1: "Rua Tal",
    endereco2: "100",
    bairro: null,
    cidade: "Piracicaba",
    estado: "SP",
    est_nome: "São Paulo",
    cep: "13400-000",
    pais: "BRA",
    pais_nome: "Brasil",
    contato: "Ana",
    telefone1: null,
    telefone2: null,
    email: null,
    ativo: 1,
    cli_codigo_ref: 10,
    is_padrao: false,
    ...partial,
  };
}

describe("ClienteEnderecoRefList", () => {
  it("renders table and fires edit", () => {
    const onEdit = vi.fn();
    render(
      <ClienteEnderecoRefList
        items={[row()]}
        viewMode="tabela"
        canEdit
        onEdit={onEdit}
        onSetPadrao={vi.fn()}
      />,
    );
    expect(screen.getByText("000000001")).toBeInTheDocument();
    expect(screen.getByText("ACME Cobrança")).toBeInTheDocument();
    fireEvent.click(screen.getByText("ACME Cobrança"));
    expect(onEdit).toHaveBeenCalled();
  });

  it("renders cards layout", () => {
    render(
      <ClienteEnderecoRefList
        items={[row()]}
        viewMode="cards"
        canEdit={false}
        onEdit={vi.fn()}
        onSetPadrao={vi.fn()}
      />,
    );
    expect(screen.getByText("ACME Cobrança")).toBeInTheDocument();
  });
});
