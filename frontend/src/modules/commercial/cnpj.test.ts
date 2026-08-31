import { describe, expect, it } from "vitest";
import { isCnpjKey, normalizeCnpj } from "./cnpj";

describe("cnpj helpers", () => {
  it("strips mask and keeps letters", () => {
    expect(normalizeCnpj("12.ABC.345/0001-90")).toBe("12ABC345000190");
  });

  it("accepts 14 alphanumeric chars as key", () => {
    expect(isCnpjKey("12.ABC.345/0001-90")).toBe(true);
    expect(isCnpjKey("123")).toBe(false);
  });
});
