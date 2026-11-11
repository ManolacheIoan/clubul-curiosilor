/** Grupele de vârstă („cluburile de exploratori”) și domeniile activităților. */

export type AgeGroupId = "4-6" | "7-10" | "11-14";

export type AgeGroup = {
  id: AgeGroupId;
  /** Numele clubului, folosit în tot site-ul. */
  club: string;
  label: string;
  min: number;
  max: number;
  description: string;
};

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: "4-6",
    club: "Clubul Mugurilor",
    label: "4–6 ani",
    min: 4,
    max: 6,
    description: "Primii pași de explorator: joc, povești, mișcare și multă răbdare.",
  },
  {
    id: "7-10",
    club: "Clubul Busolelor",
    label: "7–10 ani",
    min: 7,
    max: 10,
    description: "Teme făcute cu spor, experimente, limbi străine și prieteni noi.",
  },
  {
    id: "11-14",
    club: "Clubul Navigatorilor",
    label: "11–14 ani",
    min: 11,
    max: 14,
    description: "Proiecte pe bune: roboți, programare, teatru și mai multă independență.",
  },
];

export const MIN_AGE = 4;
export const MAX_AGE = 14;

/** Grupa potrivită pentru o vârstă (sau undefined în afara intervalului 4–14). */
export function groupForAge(age: number): AgeGroup | undefined {
  return AGE_GROUPS.find((g) => age >= g.min && age <= g.max);
}

export type DomainId =
  | "after-school"
  | "limbi"
  | "tehnologie"
  | "stiinte"
  | "arte"
  | "minte"
  | "miscare"
  | "gatit";

export const DOMAINS: { id: DomainId; label: string }[] = [
  { id: "after-school", label: "After-school" },
  { id: "limbi", label: "Limbi străine" },
  { id: "tehnologie", label: "Robotică și programare" },
  { id: "stiinte", label: "Științe" },
  { id: "arte", label: "Arte, teatru și muzică" },
  { id: "minte", label: "Jocuri de minte" },
  { id: "miscare", label: "Sport și mișcare" },
  { id: "gatit", label: "Gătit" },
];

export const domainLabel = (id: DomainId) => DOMAINS.find((d) => d.id === id)?.label ?? id;
