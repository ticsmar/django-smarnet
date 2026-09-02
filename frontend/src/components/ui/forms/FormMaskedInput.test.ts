import { describe, expect, it } from "vitest";
import {
  applyMoneyMask,
  formatMoneyMask,
  parseMoneyMask,
} from "./FormMaskedInput";

describe("applyMoneyMask", () => {
  it("formats digit strings as Brazilian currency", () => {
    expect(applyMoneyMask("124699000")).toBe("1.246.990,00");
    expect(applyMoneyMask("1")).toBe("0,01");
    expect(applyMoneyMask("")).toBe("");
  });

  it("is idempotent on an already masked value", () => {
    expect(applyMoneyMask("1.246.990,00")).toBe("1.246.990,00");
  });
});

describe("formatMoneyMask", () => {
  it("formats API amounts in reais", () => {
    expect(formatMoneyMask("1246990")).toBe("1.246.990,00");
    expect(formatMoneyMask("200000")).toBe("200.000,00");
    expect(formatMoneyMask(12.5)).toBe("12,50");
    expect(formatMoneyMask(null)).toBe("");
  });
});

describe("parseMoneyMask", () => {
  it("parses masked currency back to reais", () => {
    expect(parseMoneyMask("1.246.990,00")).toBe(1246990);
    expect(parseMoneyMask("200.000,00")).toBe(200000);
    expect(parseMoneyMask("")).toBeNull();
  });
});
