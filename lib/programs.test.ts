import { describe, expect, it } from "vitest";
import { programs } from "@/data/programs";
import {
  EMPTY_FILTERS,
  countByDomain,
  filterPrograms,
  matchesAge,
  normalize,
  parseFilters,
  serializeFilters,
  similarPrograms,
} from "./programs";

const slugs = (list: { slug: string }[]) => list.map((p) => p.slug);
const bySlug = (s: string) => programs.find((p) => p.slug === s)!;

describe("normalize", () => {
  it("scoate diacriticele, majusculele și spațiile în plus", () => {
    expect(normalize("  Științe  DISTRACTIVE ")).toBe("stiinte distractive");
    expect(normalize("Șah, țară, înger, mâță")).toBe("sah, tara, inger, mata");
  });
});

describe("filterPrograms", () => {
  it("fără filtre întoarce toate programele", () => {
    expect(filterPrograms(programs, EMPTY_FILTERS)).toHaveLength(programs.length);
  });

  it("grupa de vârstă păstrează doar programele care se suprapun", () => {
    const mici = filterPrograms(programs, { ...EMPTY_FILTERS, age: "4-6" });
    expect(slugs(mici)).toContain("engleza"); // 4–14
    expect(slugs(mici)).toContain("stiinte-distractive"); // 5–12
    expect(slugs(mici)).not.toContain("robotica-si-programare"); // 7–14
  });

  it("marginile intervalului contează (6–14 intră la 4–6, 7–14 nu)", () => {
    expect(matchesAge(bySlug("after-school"), "4-6")).toBe(true);
    expect(matchesAge(bySlug("robotica-si-programare"), "4-6")).toBe(false);
    expect(matchesAge(bySlug("muzica"), "11-14")).toBe(false); // 4–10
    expect(matchesAge(bySlug("muzica"), "7-10")).toBe(true);
  });

  it("domeniul filtrează exact", () => {
    const limbi = filterPrograms(programs, { ...EMPTY_FILTERS, domain: "limbi" });
    expect(slugs(limbi).sort()).toEqual(["engleza", "franceza", "germana", "spaniola"]);
  });

  it("căutarea ignoră diacriticele și ordinea cuvintelor", () => {
    expect(slugs(filterPrograms(programs, { ...EMPTY_FILTERS, query: "ȘAH" }))).toEqual(["sah"]);
    expect(slugs(filterPrograms(programs, { ...EMPTY_FILTERS, query: "programare robotică" }))).toEqual([
      "robotica-si-programare",
    ]);
    expect(slugs(filterPrograms(programs, { ...EMPTY_FILTERS, query: "english" }))).toEqual(["engleza"]);
  });

  it("toate filtrele se combină (ȘI)", () => {
    const r = filterPrograms(programs, { age: "11-14", domain: "arte", query: "" });
    expect(slugs(r)).toEqual(["arte-si-creatie", "teatru"]); // muzica (4–10) rămâne pe dinafară
    expect(slugs(filterPrograms(programs, { age: "11-14", domain: "arte", query: "scena" }))).toEqual(["teatru"]);
    expect(filterPrograms(programs, { age: "4-6", domain: "tehnologie", query: "" })).toEqual([]);
  });

  it("countByDomain ține cont de vârstă și căutare, dar nu de domeniu", () => {
    const counts = countByDomain(programs, { age: "11-14", domain: "limbi", query: "" });
    expect(counts.limbi).toBe(4);
    expect(counts.arte).toBe(2);
    expect(counts.minte).toBe(1);
    expect(countByDomain(programs, { age: "4-6", domain: null, query: "" }).tehnologie).toBe(0);
  });
});

describe("parametrii din adresă", () => {
  it("citește valorile cunoscute și le ignoră pe celelalte", () => {
    expect(parseFilters("?varsta=7-10&domeniu=limbi&cauta=engleza")).toEqual({
      age: "7-10",
      domain: "limbi",
      query: "engleza",
    });
    expect(parseFilters("?varsta=99&domeniu=altceva")).toEqual(EMPTY_FILTERS);
  });

  it("serializarea și citirea sunt inverse", () => {
    const f = { age: "11-14" as const, domain: "arte" as const, query: "teatru și voce" };
    expect(parseFilters(serializeFilters(f))).toEqual(f);
    expect(serializeFilters(EMPTY_FILTERS)).toBe("");
    expect(serializeFilters({ ...EMPTY_FILTERS, query: "   " })).toBe("");
  });
});

describe("similarPrograms", () => {
  it("pune întâi programele din același domeniu și exclude programul curent", () => {
    const r = similarPrograms(bySlug("germana"), programs);
    expect(r).toHaveLength(3);
    expect(r.every((p) => p.domain === "limbi")).toBe(true);
    expect(slugs(r)).not.toContain("germana");
  });

  it("nu propune activități pentru alte vârste", () => {
    const muzica = bySlug("muzica"); // 4–10
    for (const p of similarPrograms(muzica, programs, 20)) {
      expect(p.ageMin <= muzica.ageMax && p.ageMax >= muzica.ageMin).toBe(true);
    }
  });
});
