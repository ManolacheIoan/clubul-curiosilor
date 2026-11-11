/**
 * Evenimentele din calendar. Începutul fiecărei tabere se adaugă singur din data/camps.ts
 * (vezi lib/events.ts), deci aici stau doar evenimentele care nu sunt tabere.
 * Evenimentele trecute dispar singure de pe site.
 */

export type EventKind = "porti-deschise" | "spectacol" | "atelier" | "tabara" | "termen";

export type ClubEvent = {
  id: string;
  kind: EventKind;
  title: string;
  /** Data ISO (AAAA-LL-ZZ); `end` doar pentru evenimentele de mai multe zile. */
  date: string;
  end?: string;
  /** Ora de început și de sfârșit („10:00”); lipsesc la evenimentele de o zi întreagă. */
  from?: string;
  to?: string;
  text: string;
  /** Pentru cine e (opțional): „Toată familia”, „Clubul Navigatorilor”. */
  audience?: string;
  /** Unde duce butonul evenimentului (opțional). */
  link?: { href: string; label: string };
};

export const EVENT_KINDS: Record<EventKind, { label: string; tag: string }> = {
  "porti-deschise": { label: "Porți deschise", tag: "tag" },
  spectacol: { label: "Spectacol", tag: "tag tag--coral" },
  atelier: { label: "Atelier", tag: "tag tag--sky" },
  tabara: { label: "Tabără", tag: "tag tag--yellow" },
  termen: { label: "Termen", tag: "tag tag--coral" },
};

export const events: ClubEvent[] = [
  {
    id: "noaptea-povestilor",
    kind: "atelier",
    title: "Seara poveștilor cu lanterna",
    date: "2026-10-30",
    from: "17:00",
    to: "19:00",
    text: "Povești spuse pe întuneric, cu lanterne, umbre pe perete și ceai cald.",
    audience: "4–10 ani",
  },
  {
    id: "porti-deschise-toamna",
    kind: "porti-deschise",
    title: "Ziua porților deschise",
    date: "2026-11-21",
    from: "10:00",
    to: "13:00",
    text: "Vizitați sălile, cunoașteți educatorii și încercați o mini-misiune. Intrarea e gratuită; vă rugăm să ne anunțați că veniți.",
    audience: "Toată familia",
    link: { href: "/contact/", label: "Anunță-ne că vii" },
  },
  {
    id: "atelier-mos-nicolae",
    kind: "atelier",
    title: "Atelierul de globuri și cizmulițe",
    date: "2026-12-05",
    from: "10:00",
    to: "12:00",
    text: "Părinți și copii lucrează împreună decorațiuni din materiale reciclate. Gratuit pentru copiii înscriși, 40 lei pentru invitați.",
    audience: "Părinți și copii",
  },
  {
    id: "spectacol-iarna",
    kind: "spectacol",
    title: "Spectacolul de iarnă",
    date: "2026-12-18",
    from: "17:30",
    to: "19:00",
    text: "Grupele de teatru și muzică urcă pe scenă, iar Clubul Navigatorilor prezintă roboții construiți în semestrul ăsta.",
    audience: "Familiile copiilor înscriși",
  },
  {
    id: "targul-de-stiinta",
    kind: "spectacol",
    title: "Târgul micilor cercetători",
    date: "2027-03-13",
    from: "10:00",
    to: "13:00",
    text: "Fiecare grupă își prezintă experimentul preferat: vulcani, circuite, cristale și multe întrebări.",
    audience: "Toată familia",
  },
  {
    id: "inscriere-devreme",
    kind: "termen",
    title: "Ultima zi pentru reducerea de înscriere din timp",
    date: "2027-03-31",
    text: "Taberele de vară confirmate până azi au 5% reducere.",
    link: { href: "/tabere/", label: "Vezi taberele de vară" },
  },
  {
    id: "porti-deschise-primavara",
    kind: "porti-deschise",
    title: "Ziua porților deschise de primăvară",
    date: "2027-05-15",
    from: "10:00",
    to: "13:00",
    text: "Pentru familiile care se gândesc la after-school din toamnă sau la taberele de vară.",
    audience: "Toată familia",
    link: { href: "/contact/", label: "Anunță-ne că vii" },
  },
  {
    id: "festivalul-exploratorilor",
    kind: "spectacol",
    title: "Festivalul exploratorilor",
    date: "2027-06-11",
    from: "17:00",
    to: "19:30",
    text: "Serbarea de final de an: spectacol, expoziția proiectelor și diplomele de explorator.",
    audience: "Familiile copiilor înscriși",
  },
];
