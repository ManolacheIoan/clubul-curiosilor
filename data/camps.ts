import type { CharacterId } from "./programs";

export type CampSeason = "vara" | "iarna" | "intersemestriala" | "paste";

export type CampPeriod = {
  /** Date ISO (AAAA-LL-ZZ), de luni până vineri. */
  start: string;
  end: string;
  /** Locuri rămase; 0 = complet. Date statice, actualizate manual. */
  spotsLeft: number;
};

export type Camp = {
  slug: string;
  season: CampSeason;
  name: string;
  theme: string;
  summary: string;
  character: CharacterId;
  /** Motivul ilustrației: vezi components/illustrations/CampArt.tsx */
  art: "jungla" | "inventatori" | "spatiu" | "pirati" | "dinozauri" | "festival" | "iarna" | "primavara" | "intersemestriala";
  ageMin: number;
  ageMax: number;
  /** Prețul pentru o săptămână întreagă (5 zile), în lei. */
  pricePerWeek: number;
  /** Prețul pentru o singură zi, în lei. */
  pricePerDay: number;
  /** Câte zile are o „săptămână” de tabără (de sărbători poate fi mai scurtă). */
  daysPerWeek: number;
  highlights: string[];
  periods: CampPeriod[];
  groupMax: number;
};

export const SEASONS: { id: CampSeason; label: string; intro: string }[] = [
  {
    id: "vara",
    label: "Tabere de vară",
    intro: "Câte o temă nouă în fiecare săptămână, din iunie până la sfârșitul lui august. Copiii pot veni la una sau la toate.",
  },
  {
    id: "iarna",
    label: "Tabăra de iarnă",
    intro: "Zile scurte, misiuni lungi: experimente cu gheață, ateliere de decorațiuni și jocuri în zăpadă (când avem noroc).",
  },
  {
    id: "intersemestriala",
    label: "Vacanța intersemestrială",
    intro: "O săptămână de recuperat energia între semestre: proiecte de echipă și multă mișcare.",
  },
  {
    id: "paste",
    label: "Tabăra de Paște",
    intro: "Primăvara la Club: grădinărit, ouă decorate cu tehnici neobișnuite și vânătoarea de comori.",
  },
];

export const camps: Camp[] = [
  {
    slug: "expeditia-in-jungla",
    season: "vara",
    name: "Expediția în junglă",
    theme: "Natură și animale",
    summary: "Copiii devin cercetători: construiesc adăposturi, studiază insecte cu lupa și învață cum trăiesc animalele junglei.",
    character: "tudor",
    art: "jungla",
    ageMin: 5,
    ageMax: 12,
    pricePerWeek: 980,
    pricePerDay: 230,
    daysPerWeek: 5,
    highlights: ["Jurnal de cercetător", "Terariu construit de copii", "Vânătoare de urme"],
    periods: [
      { start: "2027-06-21", end: "2027-06-25", spotsLeft: 9 },
      { start: "2027-07-26", end: "2027-07-30", spotsLeft: 14 },
    ],
    groupMax: 16,
  },
  {
    slug: "laboratorul-inventatorilor",
    season: "vara",
    name: "Laboratorul inventatorilor",
    theme: "Știință și tehnologie",
    summary: "Circuite, roboți simpli și invenții din materiale reciclate. La final, fiecare echipă își prezintă invenția.",
    character: "bip",
    art: "inventatori",
    ageMin: 7,
    ageMax: 14,
    pricePerWeek: 1050,
    pricePerDay: 250,
    daysPerWeek: 5,
    highlights: ["Robot construit în echipă", "Circuite cu lumini", "Târgul invențiilor de vineri"],
    periods: [
      { start: "2027-06-28", end: "2027-07-02", spotsLeft: 0 },
      { start: "2027-08-02", end: "2027-08-06", spotsLeft: 6 },
    ],
    groupMax: 14,
  },
  {
    slug: "calatorie-in-spatiu",
    season: "vara",
    name: "Călătorie în spațiu",
    theme: "Astronomie",
    summary: "Planete, rachete cu apă și o noapte (de după-amiază) sub cerul înstelat din planetariul improvizat.",
    character: "ola",
    art: "spatiu",
    ageMin: 6,
    ageMax: 12,
    pricePerWeek: 980,
    pricePerDay: 230,
    daysPerWeek: 5,
    highlights: ["Rachete cu apă", "Planetariu în sala mare", "Hartă a cerului făcută de copii"],
    periods: [
      { start: "2027-07-05", end: "2027-07-09", spotsLeft: 11 },
      { start: "2027-08-09", end: "2027-08-13", spotsLeft: 16 },
    ],
    groupMax: 16,
  },
  {
    slug: "piratii-si-harta-comorii",
    season: "vara",
    name: "Pirații și harta comorii",
    theme: "Aventură și orientare",
    summary: "Busole, hărți, ghicitori și o comoară adevărată (de cărți și surprize) ascunsă la capătul săptămânii.",
    character: "ruxi",
    art: "pirati",
    ageMin: 4,
    ageMax: 10,
    pricePerWeek: 950,
    pricePerDay: 220,
    daysPerWeek: 5,
    highlights: ["Orientare cu busola", "Corăbii care plutesc", "Vânătoarea de comori"],
    periods: [
      { start: "2027-07-12", end: "2027-07-16", spotsLeft: 3 },
      { start: "2027-08-16", end: "2027-08-20", spotsLeft: 15 },
    ],
    groupMax: 16,
  },
  {
    slug: "micii-arheologi",
    season: "vara",
    name: "Micii arheologi",
    theme: "Dinozauri și istorie",
    summary: "Săpături în nisip, fosile din ghips și o mică expoziție de „descoperiri” pentru părinți.",
    character: "tudor",
    art: "dinozauri",
    ageMin: 5,
    ageMax: 11,
    pricePerWeek: 980,
    pricePerDay: 230,
    daysPerWeek: 5,
    highlights: ["Șantier arheologic în curte", "Fosile turnate în ghips", "Muzeul Clubului"],
    periods: [{ start: "2027-07-19", end: "2027-07-23", spotsLeft: 12 }],
    groupMax: 16,
  },
  {
    slug: "festivalul-artelor",
    season: "vara",
    name: "Festivalul artelor",
    theme: "Teatru, muzică și pictură",
    summary: "O săptămână de repetiții, decoruri și costume, încheiată cu un mic festival pentru familii.",
    character: "ruxi",
    art: "festival",
    ageMin: 6,
    ageMax: 14,
    pricePerWeek: 980,
    pricePerDay: 230,
    daysPerWeek: 5,
    highlights: ["Spectacol de vineri", "Decoruri pictate", "Orchestra Clubului"],
    periods: [{ start: "2027-08-23", end: "2027-08-27", spotsLeft: 16 }],
    groupMax: 16,
  },
  {
    slug: "tabara-de-iarna",
    season: "iarna",
    name: "Atelierul de iarnă",
    theme: "Iarnă, știință și tradiții",
    summary: "Cristale de gheață, decorațiuni făcute de mână, colinde în mai multe limbi și biscuiți de sărbători.",
    character: "ola",
    art: "iarna",
    ageMin: 4,
    ageMax: 12,
    pricePerWeek: 640,
    pricePerDay: 230,
    daysPerWeek: 3,
    highlights: ["Experimente cu gheață", "Decorațiuni pentru acasă", "Colinde în 5 limbi"],
    periods: [
      { start: "2026-12-21", end: "2026-12-23", spotsLeft: 4 },
      { start: "2027-01-04", end: "2027-01-06", spotsLeft: 10 },
    ],
    groupMax: 16,
  },
  {
    slug: "tabara-intersemestriala",
    season: "intersemestriala",
    name: "Misiunea intersemestrială",
    theme: "Proiecte de echipă",
    summary: "Cinci zile, cinci provocări: un pod din bețișoare, un joc de societate inventat, un ziar al Clubului și altele.",
    character: "bip",
    art: "intersemestriala",
    ageMin: 6,
    ageMax: 14,
    pricePerWeek: 950,
    pricePerDay: 220,
    daysPerWeek: 5,
    highlights: ["Ziarul Clubului", "Pod de bețișoare testat cu greutăți", "Joc de societate inventat"],
    periods: [
      { start: "2027-02-08", end: "2027-02-12", spotsLeft: 13 },
      { start: "2027-02-15", end: "2027-02-19", spotsLeft: 16 },
    ],
    groupMax: 16,
  },
  {
    slug: "tabara-de-paste",
    season: "paste",
    name: "Grădina exploratorilor",
    theme: "Primăvară și natură",
    summary: "Semănăm, decorăm ouă cu frunze și ceară, construim căsuțe pentru păsări și căutăm comori în curte.",
    character: "tudor",
    art: "primavara",
    ageMin: 4,
    ageMax: 12,
    pricePerWeek: 950,
    pricePerDay: 220,
    daysPerWeek: 5,
    highlights: ["Mini-grădină pentru acasă", "Căsuțe pentru păsări", "Vânătoarea de ouă"],
    periods: [{ start: "2027-04-26", end: "2027-04-30", spotsLeft: 16 }],
    groupMax: 16,
  },
];

export const campBySlug = (slug: string) => camps.find((c) => c.slug === slug);

/** Programul unei zile de tabără (la fel pentru toate taberele). */
export const campDay: { time: string; title: string; text: string }[] = [
  { time: "08:00 – 09:00", title: "Sosirea", text: "Primim copiii, verificăm lista de preluare și începem cu jocuri libere." },
  { time: "09:00", title: "Cercul de dimineață", text: "Aflăm misiunea zilei și împărțim echipele." },
  { time: "09:30", title: "Misiunea zilei, partea I", text: "Atelierul principal al temei săptămânii." },
  { time: "11:00", title: "Gustare și curte", text: "Fructe, apă și joacă în aer liber (sau în sala de mișcare, dacă plouă)." },
  { time: "12:30", title: "Prânzul", text: "Masă caldă de la un furnizor autorizat, cu meniu adaptat alergiilor." },
  { time: "13:30", title: "Ora liniștită", text: "Povești, lectură, odihnă pentru cei mici, jocuri de masă pentru cei mari." },
  { time: "14:30", title: "Misiunea zilei, partea a II-a", text: "Construim, experimentăm, repetăm pentru prezentarea de vineri." },
  { time: "16:00", title: "Gustarea de după-amiază", text: "Și o scurtă discuție despre ce am descoperit." },
  { time: "16:30 – 17:30", title: "Jocuri și plecarea", text: "Copiii pleacă doar cu persoanele autorizate de părinți." },
];

export const campBring: string[] = [
  "Rucsac mic cu numele copilului",
  "Sticlă de apă reutilizabilă",
  "Haine de schimb și încălțăminte de interior",
  "Șapcă și cremă de protecție solară (vara) sau mănuși și căciulă (iarna)",
  "Medicamentele necesare, predate educatorului, cu instrucțiuni scrise de părinte",
  "Bună dispoziție (pe aceasta o avem și noi în rezervă)",
];

export const campIncluded: string[] = [
  "Toate materialele pentru ateliere",
  "Prânzul cald și două gustări pe zi",
  "Tricoul taberei, la prima săptămână",
  "Fotografii ale activităților, trimise doar părinților care și-au dat acordul",
];
