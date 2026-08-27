import { describe, expect, it } from "vitest";
import { CLIENTE_CHILD_PAGE_SIZE, clampPage, slicePage } from "./ClienteListPager";

describe("ClienteListPager helpers", () => {
  it("slices the current page", () => {
    const items = Array.from({ length: 25 }, (_, index) => index + 1);
    expect(slicePage(items, 1)).toHaveLength(CLIENTE_CHILD_PAGE_SIZE);
    expect(slicePage(items, 2)).toEqual([21, 22, 23, 24, 25]);
  });

  it("clamps page to available range", () => {
    expect(clampPage(0, 3)).toBe(1);
    expect(clampPage(25, 9)).toBe(2);
  });
});
