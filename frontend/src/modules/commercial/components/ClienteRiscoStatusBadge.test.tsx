import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ClienteRiscoStatusBadge,
  clienteRiscoBadgeColor,
  riscoShortDesc,
} from "./ClienteRiscoStatusBadge";

describe("clienteRiscoBadgeColor", () => {
  it("maps letter and restriction to semantic StatusBadge colors", () => {
    expect(clienteRiscoBadgeColor(0, "A")).toBe("success");
    expect(clienteRiscoBadgeColor(0, "B")).toBe("warning");
    expect(clienteRiscoBadgeColor(0, "N")).toBe("warning");
    expect(clienteRiscoBadgeColor(1, "C")).toBe("alert");
    expect(clienteRiscoBadgeColor(2, "D")).toBe("destructive");
    expect(clienteRiscoBadgeColor(2, "E-")).toBe("destructive");
    expect(clienteRiscoBadgeColor(null, "X")).toBe("neutral");
  });
});

describe("riscoShortDesc", () => {
  it("prefers CRS_DESC and falls back to text after the colon in CRS_DESC_LONGA", () => {
    expect(riscoShortDesc("Sem crédito")).toBe("Sem crédito");
    expect(riscoShortDesc(null, "Nota B   : Sem crédito")).toBe("Sem crédito");
    expect(riscoShortDesc("  ", "")).toBe("");
  });
});

describe("ClienteRiscoStatusBadge", () => {
  it("shows only the letter in compact list mode", () => {
    render(
      <ClienteRiscoStatusBadge
        letra="C"
        desc="Pendência financeira"
        descLonga="Nota C : Pendência financeira"
      />,
    );
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.queryByText(/Pendência financeira/)).not.toBeInTheDocument();
  });

  it("shows only the short description in the form header; long text stays in title", () => {
    render(
      <ClienteRiscoStatusBadge
        letra="A"
        desc="Sem restrições"
        descLonga="Nota A   : Sem restrições"
        showDesc
        tone="solid"
      />,
    );
    const badge = screen.getByText("Sem restrições");
    expect(badge).toBeInTheDocument();
    expect(screen.queryByText(/^A Sem restrições$/)).not.toBeInTheDocument();
    expect(badge).toHaveAttribute("title", "Nota A   : Sem restrições");
  });
});
