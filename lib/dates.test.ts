import { describe, expect, it } from "vitest";
import { formatPeriod } from "./dates";

describe("formatPeriod", () => {
  it("aceeași lună, luni diferite, ani diferiți", () => {
    expect(formatPeriod("2027-06-21", "2027-06-25")).toBe("21–25 iunie 2027");
    expect(formatPeriod("2027-06-28", "2027-07-02")).toBe("28 iunie – 2 iulie 2027");
    expect(formatPeriod("2026-12-28", "2027-01-01")).toBe("28 decembrie 2026 – 1 ianuarie 2027");
  });
});
