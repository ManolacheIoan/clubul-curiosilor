import { AGE_GROUPS, DOMAINS, type AgeGroupId, type DomainId } from "@/data/groups";
import type { Program } from "@/data/programs";

export type ProgramFilters = {
  age: AgeGroupId | null;
  domain: DomainId | null;
  query: string;
};

export const EMPTY_FILTERS: ProgramFilters = { age: null, domain: null, query: "" };

/** Litere mici, fără diacritice și spații în plus: „Științe” → „stiinte”. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Programul se potrivește grupei dacă intervalele de vârstă se suprapun. */
export function matchesAge(program: Program, age: AgeGroupId | null): boolean {
  if (!age) return true;
  const group = AGE_GROUPS.find((g) => g.id === age);
  if (!group) return true;
  return program.ageMin <= group.max && program.ageMax >= group.min;
}

function haystack(p: Program): string {
  const domain = DOMAINS.find((d) => d.id === p.domain)?.label ?? "";
  return normalize([p.name, p.mission, p.summary, domain, ...(p.keywords ?? [])].join(" "));
}

/** Fiecare cuvânt căutat trebuie să apară undeva în program (ordinea nu contează). */
export function matchesQuery(program: Program, query: string): boolean {
  const words = normalize(query).split(" ").filter(Boolean);
  if (words.length === 0) return true;
  const text = haystack(program);
  return words.every((w) => text.includes(w));
}

export function filterPrograms(list: Program[], filters: ProgramFilters): Program[] {
  return list.filter(
    (p) =>
      matchesAge(p, filters.age) &&
      (!filters.domain || p.domain === filters.domain) &&
      matchesQuery(p, filters.query),
  );
}

/** Câte programe ar rămâne pentru fiecare domeniu, cu restul filtrelor neschimbate. */
export function countByDomain(list: Program[], filters: ProgramFilters): Record<DomainId, number> {
  const out = Object.fromEntries(DOMAINS.map((d) => [d.id, 0])) as Record<DomainId, number>;
  for (const p of filterPrograms(list, { ...filters, domain: null })) out[p.domain]++;
  return out;
}

/* ---------- sincronizare cu adresa (?varsta=7-10&domeniu=limbi&cauta=engleza) ---------- */

const isAge = (v: string | null): v is AgeGroupId => AGE_GROUPS.some((g) => g.id === v);
const isDomain = (v: string | null): v is DomainId => DOMAINS.some((d) => d.id === v);

/** Citește filtrele din adresă; valorile necunoscute sunt ignorate. */
export function parseFilters(params: URLSearchParams | string): ProgramFilters {
  const sp = typeof params === "string" ? new URLSearchParams(params) : params;
  const age = sp.get("varsta");
  const domain = sp.get("domeniu");
  return {
    age: isAge(age) ? age : null,
    domain: isDomain(domain) ? domain : null,
    query: (sp.get("cauta") ?? "").slice(0, 80),
  };
}

/** Transformă filtrele în query string („” dacă nu e niciun filtru). */
export function serializeFilters(filters: ProgramFilters): string {
  const sp = new URLSearchParams();
  if (filters.age) sp.set("varsta", filters.age);
  if (filters.domain) sp.set("domeniu", filters.domain);
  const q = filters.query.trim();
  if (q) sp.set("cauta", q);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

/* ---------- activități asemănătoare ---------- */

const overlapYears = (a: Program, b: Program) =>
  Math.max(0, Math.min(a.ageMax, b.ageMax) - Math.max(a.ageMin, b.ageMin) + 1);

/**
 * Activități asemănătoare: doar cele potrivite aceleiași vârste, întâi cele din
 * același domeniu, apoi de același tip, apoi cele cu cea mai mare suprapunere de vârstă.
 */
export function similarPrograms(program: Program, list: Program[], limit = 3): Program[] {
  return list
    .filter((p) => p.slug !== program.slug && overlapYears(p, program) > 0)
    .map((p) => ({
      p,
      score:
        (p.domain === program.domain ? 100 : 0) + (p.kind === program.kind ? 20 : 0) + overlapYears(p, program),
    }))
    .sort((a, b) => b.score - a.score || a.p.name.localeCompare(b.p.name, "ro"))
    .slice(0, limit)
    .map((x) => x.p);
}

/** „4–14 ani” */
export const ageRange = (p: { ageMin: number; ageMax: number }) => `${p.ageMin}–${p.ageMax} ani`;

/** „1.250 lei” */
export const formatLei = (n: number) => `${new Intl.NumberFormat("ro-RO").format(n)} lei`;
