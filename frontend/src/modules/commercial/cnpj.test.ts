import { describe, expect, it } from "vitest";
import { formatCnpj, isCnpjKey, normalizeCnpj } from "./cnpj";

describe("cnpj helpers", () => {
  it("strips mask and keeps letters", () => {
    expect(normalizeCnpj("12.ABC.345/0001-90")).toBe("12ABC345000190");
  });

  it("accepts 14 alphanumeric chars as key", () => {
    expect(isCnpjKey("12.ABC.345/0001-90")).toBe(true);
    expect(isCnpjKey("123")).toBe(false);
  });

  it("formats 14 alphanumeric chars as CNPJ mask", () => {
    expect(formatCnpj("19608481000302")).toBe("19.608.481/0003-02");
    expect(formatCnpj("12.abc.345/0001-90")).toBe("12.ABC.345/0001-90");
    expect(formatCnpj("")).toBeNull();
    expect(formatCnpj("123")).toBe("123");
  });
});
