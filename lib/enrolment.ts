import { MAX_AGE, MIN_AGE, groupForAge, type AgeGroupId } from "@/data/groups";
import { camps } from "@/data/camps";
import { programs } from "@/data/programs";

/** O persoană autorizată să preia copilul. */
export type PickupPerson = { name: string; relation: string; phone: string };

export type EnrolmentData = {
  childName: string;
  /** Vârsta ca text (din câmpul de formular). */
  childAge: string;
  group: AgeGroupId | "";
  parentName: string;
  phone: string;
  email: string;
  /** „program:slug” sau „tabara:slug”. */
  choice: string;
  /** Pentru tabere: data de început a săptămânii alese. */
  period: string;
  allergies: string;
  notes: string;
  pickup: PickupPerson[];
  consent: boolean;
};

export const EMPTY_ENROLMENT: EnrolmentData = {
  childName: "",
  childAge: "",
  group: "",
  parentName: "",
  phone: "",
  email: "",
  choice: "",
  period: "",
  allergies: "",
  notes: "",
  pickup: [{ name: "", relation: "", phone: "" }],
  consent: false,
};

export type FieldErrors = Partial<Record<string, string>>;

export const STEPS = [
  { id: "copil", title: "Copilul", fields: ["childName", "childAge", "group"] },
  { id: "parinte", title: "Părintele", fields: ["parentName", "phone", "email"] },
  { id: "program", title: "Programul", fields: ["choice", "period"] },
  { id: "sanatate", title: "Sănătate și preluare", fields: ["allergies", "notes", "pickup"] },
  { id: "confirmare", title: "Confirmare", fields: ["consent"] },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

/** Telefon românesc: 07xx xxx xxx, 02xx/03xx fix, sau cu prefixul +40 / 0040. */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[\s.\-()]/g, "");
  const m = digits.match(/^(?:\+40|0040|0)([23789]\d{8})$/);
  return m ? `0${m[1]}` : null;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const nameOk = (v: string) => /^[\p{L}][\p{L}' .-]{1,59}$/u.test(v.trim()) && v.trim().length >= 2;

export type Choice =
  | { type: "program"; slug: string; name: string; ageMin: number; ageMax: number }
  | { type: "tabara"; slug: string; name: string; ageMin: number; ageMax: number; periods: { start: string; end: string; spotsLeft: number }[] };

/** Toate opțiunile din formular: programe și tabere. */
export function parseChoice(value: string): Choice | undefined {
  const [type, slug] = value.split(":");
  if (type === "program") {
    const p = programs.find((x) => x.slug === slug);
    return p && { type, slug: p.slug, name: p.name, ageMin: p.ageMin, ageMax: p.ageMax };
  }
  if (type === "tabara") {
    const c = camps.find((x) => x.slug === slug);
    return c && { type, slug: c.slug, name: c.name, ageMin: c.ageMin, ageMax: c.ageMax, periods: c.periods };
  }
  return undefined;
}

/** Validează un pas; întoarce erorile pe câmpuri (obiect gol = totul e în regulă). */
export function validateStep(step: StepId, d: EnrolmentData): FieldErrors {
  const e: FieldErrors = {};
  const age = Number(d.childAge);

  if (step === "copil") {
    if (!d.childName.trim()) e.childName = "Scrie numele copilului.";
    else if (!nameOk(d.childName)) e.childName = "Numele poate conține doar litere, spații și cratimă.";
    if (!d.childAge.trim()) e.childAge = "Alege vârsta copilului.";
    else if (!Number.isInteger(age) || age < MIN_AGE || age > MAX_AGE)
      e.childAge = `Primim copii între ${MIN_AGE} și ${MAX_AGE} ani.`;
    if (!d.group) e.group = "Alege grupa.";
    else if (!e.childAge && groupForAge(age)?.id !== d.group)
      e.group = `Pentru ${age} ani, grupa potrivită este ${groupForAge(age)?.club}.`;
  }

  if (step === "parinte") {
    if (!d.parentName.trim()) e.parentName = "Scrie numele tău.";
    else if (!nameOk(d.parentName)) e.parentName = "Numele poate conține doar litere, spații și cratimă.";
    if (!d.phone.trim()) e.phone = "Avem nevoie de un telefon ca să te sunăm.";
    else if (!normalizePhone(d.phone)) e.phone = "Scrie un număr de telefon românesc, de exemplu 0722 123 456.";
    if (!d.email.trim()) e.email = "Scrie adresa de e-mail.";
    else if (!isEmail(d.email)) e.email = "Adresa de e-mail nu pare corectă (exemplu: nume@exemplu.ro).";
  }

  if (step === "program") {
    const c = parseChoice(d.choice);
    if (!c) e.choice = "Alege un program sau o tabără.";
    else {
      if (Number.isInteger(age) && (age < c.ageMin || age > c.ageMax))
        e.choice = `„${c.name}” este pentru copii de ${c.ageMin}–${c.ageMax} ani.`;
      if (c.type === "tabara") {
        const p = c.periods.find((x) => x.start === d.period);
        if (!p) e.period = "Alege săptămâna de tabără.";
        else if (p.spotsLeft <= 0) e.period = "Săptămâna aleasă este completă. Alege alta.";
      }
    }
  }

  if (step === "sanatate") {
    if (d.allergies.length > 600) e.allergies = "Te rugăm să scrii cel mult 600 de caractere.";
    if (d.notes.length > 600) e.notes = "Te rugăm să scrii cel mult 600 de caractere.";
    d.pickup.forEach((p, i) => {
      const empty = !p.name.trim() && !p.relation.trim() && !p.phone.trim();
      if (empty && d.pickup.length > 1) {
        e[`pickup.${i}.name`] = "Completează persoana sau șterge rândul.";
        return;
      }
      if (empty) return; // o singură persoană, necompletată: ești doar tu
      if (!nameOk(p.name)) e[`pickup.${i}.name`] = "Scrie numele complet al persoanei.";
      if (!p.relation.trim()) e[`pickup.${i}.relation`] = "Spune-ne ce relație are cu copilul.";
      if (!normalizePhone(p.phone)) e[`pickup.${i}.phone`] = "Scrie un număr de telefon valid.";
    });
  }

  if (step === "confirmare") {
    if (!d.consent) e.consent = "Avem nevoie de acordul tău ca să putem prelucra cererea.";
  }

  return e;
}

/** Validează tot formularul; întoarce primul pas cu erori (sau null). */
export function validateAll(d: EnrolmentData): { step: StepId; errors: FieldErrors } | null {
  for (const s of STEPS) {
    const errors = validateStep(s.id, d);
    if (Object.keys(errors).length) return { step: s.id, errors };
  }
  return null;
}

/** Datele curate trimise mai departe (fără rânduri goale, telefoane normalizate). */
export function toPayload(d: EnrolmentData) {
  const c = parseChoice(d.choice);
  return {
    copil: { nume: d.childName.trim(), varsta: Number(d.childAge), grupa: d.group },
    parinte: { nume: d.parentName.trim(), telefon: normalizePhone(d.phone), email: d.email.trim() },
    alegere: c ? { tip: c.type, slug: c.slug, nume: c.name, saptamana: c.type === "tabara" ? d.period : undefined } : null,
    alergii: d.allergies.trim(),
    observatii: d.notes.trim(),
    preluare: d.pickup
      .filter((p) => p.name.trim())
      .map((p) => ({ nume: p.name.trim(), relatie: p.relation.trim(), telefon: normalizePhone(p.phone) })),
    acord: d.consent,
  };
}

export type EnrolmentPayload = ReturnType<typeof toPayload>;
