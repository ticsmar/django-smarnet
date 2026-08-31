import { describe, expect, it } from "vitest";
import {
  EMPTY_CLIENTE_FORM,
  payloadFromForm,
  tipoFromUi,
  uiTipoFromNatureza,
} from "./clienteFormModel";

describe("clienteFormModel", () => {
  it("maps UI type to cadastro tipo", () => {
    expect(tipoFromUi("juridica")).toBe("J");
    expect(tipoFromUi("fisica")).toBe("F");
    expect(tipoFromUi("funcionario")).toBe("FUNC");
    expect(tipoFromUi("internacional")).toBe("I");
  });

  it("maps natureza back to UI type", () => {
    expect(uiTipoFromNatureza("I")).toBe("internacional");
    expect(uiTipoFromNatureza("F")).toBe("fisica");
    expect(uiTipoFromNatureza(null)).toBe("juridica");
  });

  it("normalizes CNPJ on payload", () => {
    const payload = payloadFromForm({
      ...EMPTY_CLIENTE_FORM,
      ui_tipo: "juridica",
      cgc: "12.345.678/0001-90",
    });
    expect(payload.cgc).toBe("12345678000190");
    expect(payload.tipo_cadastro).toBe("J");
  });
});
