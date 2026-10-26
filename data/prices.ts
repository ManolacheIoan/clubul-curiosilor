/** Reduceri și costuri suplimentare. Prețurile programelor sunt în data/programs.ts, ale taberelor în data/camps.ts. */

export type Discount = {
  id: string;
  title: string;
  /** Procentul de reducere (0–100). */
  percent: number;
  text: string;
};

export const discounts: Discount[] = [
  {
    id: "frati-2",
    title: "Al doilea frate",
    percent: 10,
    text: "Reducere la programul cu prețul cel mai mic, când doi frați sunt înscriși în aceeași lună.",
  },
  {
    id: "frati-3",
    title: "Al treilea frate (și următorii)",
    percent: 15,
    text: "Pentru fiecare frate începând cu al treilea, cumulată cu reducerea pentru al doilea.",
  },
  {
    id: "cursuri",
    title: "Mai multe cursuri",
    percent: 10,
    text: "La al doilea curs sau atelier ales de același copil, în aceeași lună.",
  },
  {
    id: "tabara-saptamana",
    title: "Săptămâna întreagă de tabără",
    percent: 0,
    text: "Prețul pe săptămână e mai mic decât cinci zile plătite separat (vezi tabelul de mai jos).",
  },
  {
    id: "tabara-doua",
    title: "Două săptămâni de tabără sau mai multe",
    percent: 8,
    text: "La a doua săptămână de tabără și la următoarele, în aceeași vacanță.",
  },
  {
    id: "devreme",
    title: "Înscriere din timp",
    percent: 5,
    text: "Pentru taberele de vară, dacă înscrierea se confirmă până la 31 martie.",
  },
];

export const extras: { title: string; price: string; text: string }[] = [
  { title: "Prânz cald (after-school)", price: "28 lei / zi", text: "Opțional, comandat cu o zi înainte." },
  { title: "Zi de after-school ocazională", price: "95 lei / zi", text: "Pentru zilele în care ai nevoie doar o dată." },
  { title: "Ședință de probă", price: "gratuit", text: "Prima întâlnire la orice curs sau atelier." },
  { title: "Taxă de înscriere", price: "0 lei", text: "Nu percepem taxă de înscriere sau garanție." },
];

export const paymentNotes: string[] = [
  "Plata se face lunar, până pe data de 5, prin transfer bancar sau card la recepție.",
  "Zilele lipsă din cauza bolii, anunțate până la ora 9:00, se recuperează în aceeași lună la cursuri.",
  "Reducerile se cumulează până la cel mult 25% din totalul lunar al unei familii.",
  "Prețurile includ TVA, acolo unde se aplică.",
];

/** Reducerea maximă cumulată pentru o familie, în procente. */
export const MAX_FAMILY_DISCOUNT = 25;
