import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CollectionToolbar } from "./collection-toolbar";

vi.mock("@/hooks/useT", () => ({
  useT: () => (key: string) => key,
}));

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

describe("CollectionToolbar", () => {
  it("searches and switches view", () => {
    const onSearchChange = vi.fn();
    const onViewModeChange = vi.fn();
    render(
      <CollectionToolbar
        searchValue=""
        onSearchChange={onSearchChange}
        searchPlaceholder="Buscar"
        searchAriaLabel="Buscar itens"
        actions={<button type="button">Novo</button>}
        viewMode="tabela"
        onViewModeChange={onViewModeChange}
      />,
    );
    fireEvent.change(screen.getByLabelText("Buscar itens"), {
      target: { value: "ana" },
    });
    expect(onSearchChange).toHaveBeenCalledWith("ana");
    fireEvent.click(screen.getByRole("button", { name: /Novo/ }));
    fireEvent.click(screen.getByRole("button", { name: "view.lista" }));
    expect(onViewModeChange).toHaveBeenCalledWith("lista");
  });
});
