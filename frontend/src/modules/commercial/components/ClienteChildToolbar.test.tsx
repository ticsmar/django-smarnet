import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ClienteChildToolbar } from "./ClienteChildToolbar";

vi.mock("@/hooks/useT", () => ({
  useT: () => (key: string) => key,
}));

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

describe("ClienteChildToolbar", () => {
  it("searches, adds and switches table/list/cards", () => {
    const onQueryChange = vi.fn();
    const onAdd = vi.fn();
    const onViewModeChange = vi.fn();
    render(
      <ClienteChildToolbar
        query=""
        onQueryChange={onQueryChange}
        searchPlaceholder="Buscar"
        searchAriaLabel="Buscar contatos"
        canAdd
        onAdd={onAdd}
        addLabel="Novo"
        viewMode="tabela"
        onViewModeChange={onViewModeChange}
      />,
    );
    fireEvent.change(screen.getByLabelText("Buscar contatos"), {
      target: { value: "ana" },
    });
    expect(onQueryChange).toHaveBeenCalledWith("ana");
    fireEvent.click(screen.getByRole("button", { name: /Novo/ }));
    expect(onAdd).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "view.lista" }));
    expect(onViewModeChange).toHaveBeenCalledWith("lista");
    fireEvent.click(screen.getByRole("button", { name: "view.cards" }));
    expect(onViewModeChange).toHaveBeenCalledWith("cards");
  });
});
