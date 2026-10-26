import { describe, expect, it } from "vitest";
import { colors, textPairs } from "@/config/theme";
import { contrast } from "./contrast";

describe("contrastul paletei (WCAG AA)", () => {
  it("formula dă valorile cunoscute", () => {
    expect(contrast("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
    expect(contrast("#FFFFFF", "#FFFFFF")).toBeCloseTo(1, 5);
  });

  it.each(textPairs)("%s pe %s (%s) ≥ 4,5:1", (fg, bg) => {
    expect(contrast(colors[fg], colors[bg])).toBeGreaterThanOrEqual(4.5);
  });

  it("galbenul și coralul nu se folosesc ca text pe hârtie (prea deschise)", () => {
    expect(contrast(colors.yellow, colors.paper)).toBeLessThan(3);
    expect(contrast(colors.coral, colors.paper)).toBeLessThan(4.5);
  });
});
