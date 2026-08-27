import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ClienteContato } from "../types/cliente";
import { ClienteContatoList } from "./ClienteContatoList";

vi.mock("@/hooks/useT", () => ({
  useT: () => (key: string) => key,
}));

function contato(partial: Partial<ClienteContato> = {}): ClienteContato {
  return {
    con_codigo: 1,
    codcliente: 10,
    nome: "Ana Souza",
    depto: "Vendas",
    cargo: "Gerente",
    telefone: "1111",
    fax: null,
    celular: null,
    email: "ana@acme.com",
    con_ativo: 1,
    is_comercial: true,
    is_tecnico: false,
    is_financeiro: false,
    ...partial,
  };
}

describe("ClienteContatoList", () => {
  it("renders table rows and edit action", () => {
    const onEdit = vi.fn();
    render(
      <ClienteContatoList
        items={[contato()]}
        viewMode="tabela"
        canEdit
        onEdit={onEdit}
        onSetPadrao={vi.fn()}
      />,
    );
    expect(screen.getByText("Ana Souza")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Ana Souza"));
    expect(onEdit).toHaveBeenCalled();
  });

  it("renders list layout", () => {
    render(
      <ClienteContatoList
        items={[contato()]}
        viewMode="lista"
        canEdit={false}
        onEdit={vi.fn()}
        onSetPadrao={vi.fn()}
      />,
    );
    expect(screen.getByText("Ana Souza")).toBeInTheDocument();
  });
});
