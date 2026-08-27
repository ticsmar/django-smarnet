import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchField } from "./SearchField";

describe("SearchField", () => {
  it("notifies value changes", () => {
    const onValueChange = vi.fn();
    render(
      <SearchField
        aria-label="Buscar"
        onValueChange={onValueChange}
        placeholder="Buscar…"
      />,
    );
    fireEvent.change(screen.getByLabelText("Buscar"), {
      target: { value: "acme" },
    });
    expect(onValueChange).toHaveBeenCalledWith("acme");
  });
});
