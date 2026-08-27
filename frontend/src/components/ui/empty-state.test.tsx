import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders dashed empty copy", () => {
    render(<EmptyState title="Nenhum registro" description="Tente outro filtro." />);
    expect(screen.getByText("Nenhum registro")).toBeInTheDocument();
    expect(screen.getByText("Tente outro filtro.")).toBeInTheDocument();
  });

  it("renders loading status", () => {
    render(<EmptyState variant="loading" title="Carregando clientes…" />);
    expect(screen.getByRole("status")).toHaveTextContent("Carregando clientes…");
  });
});
