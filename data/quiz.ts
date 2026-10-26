import type { CharacterId } from "./programs";

/** Tipurile de explorator; fiecare răspuns dă puncte unuia sau mai multor tipuri. */
export type ExplorerType = "inventator" | "artist" | "aventurier" | "povestitor";

export type ExplorerProfile = {
  id: ExplorerType;
  title: string;
  character: CharacterId;
  /** Text scurt, scris pentru copii. */
  description: string;
  /** Programe recomandate (sluguri din data/programs.ts). */
  programs: string[];
};

export const EXPLORERS: ExplorerProfile[] = [
  {
    id: "inventator",
    title: "Inventatorul",
    character: "bip",
    description:
      "Vrei să știi cum funcționează totul și ai mereu o idee nouă de construit. Ca Bip, robotul nostru, nu te oprești până nu merge!",
    programs: ["robotica-si-programare", "stiinte-distractive", "sah"],
  },
  {
    id: "artist",
    title: "Artistul",
    character: "ruxi",
    description:
      "Vezi culori și povești peste tot. Ca Ruxi, vulpea, transformi orice cutie de carton într-un castel și orice zi într-un spectacol.",
    programs: ["arte-si-creatie", "teatru", "muzica"],
  },
  {
    id: "aventurier",
    title: "Aventurierul",
    character: "tudor",
    description:
      "Nu stai locului! Ca Tudor, micul nostru explorator, vrei să alergi, să cauți comori și să descoperi locuri noi.",
    programs: ["sport-si-miscare", "gatit-pentru-copii", "stiinte-distractive"],
  },
  {
    id: "povestitor",
    title: "Povestitorul",
    character: "ola",
    description:
      "Îți plac cuvintele, cărțile și oamenii din toată lumea. Ca Ola, bufnița, asculți, înveți și apoi spui cele mai frumoase povești.",
    programs: ["engleza", "franceza", "teatru"],
  },
];

export type QuizAnswer = {
  id: string;
  text: string;
  /** Puncte pentru unul sau mai multe tipuri. */
  points: Partial<Record<ExplorerType, number>>;
};

export type QuizQuestion = {
  id: string;
  question: string;
  answers: QuizAnswer[];
};

export const QUIZ: QuizQuestion[] = [
  {
    id: "cutie",
    question: "Găsești o cutie misterioasă. Ce faci?",
    answers: [
      { id: "desfac", text: "O desfac să văd cum e făcută", points: { inventator: 2 } },
      { id: "pictez", text: "O pictez și o fac castel", points: { artist: 2 } },
      { id: "ascund", text: "Ascund în ea o comoară pentru prieteni", points: { aventurier: 2 } },
      { id: "poveste", text: "Inventez povestea cutiei", points: { povestitor: 2 } },
    ],
  },
  {
    id: "pauza",
    question: "În pauza mare, cel mai mult îți place să…",
    answers: [
      { id: "fug", text: "Alerg și joc leapșa", points: { aventurier: 2 } },
      { id: "desenez", text: "Desenez sau construiesc ceva", points: { artist: 1, inventator: 1 } },
      { id: "povestesc", text: "Povestesc cu prietenii", points: { povestitor: 2 } },
      { id: "intreb", text: "Pun întrebări despre orice", points: { inventator: 2 } },
    ],
  },
  {
    id: "superputere",
    question: "Ce superputere ai alege?",
    answers: [
      { id: "zbor", text: "Să zbor peste munți", points: { aventurier: 2 } },
      { id: "limbi", text: "Să vorbesc cu oricine, în orice limbă", points: { povestitor: 2 } },
      { id: "construiesc", text: "Să construiesc orice într-o clipă", points: { inventator: 2 } },
      { id: "culori", text: "Să dau viață desenelor", points: { artist: 2 } },
    ],
  },
  {
    id: "rucsac",
    question: "Pleci în expediție. Ce pui în rucsac?",
    answers: [
      { id: "lupa", text: "O lupă și un caiet de notițe", points: { inventator: 1, povestitor: 1 } },
      { id: "creioane", text: "Creioane colorate", points: { artist: 2 } },
      { id: "busola", text: "O busolă și o lanternă", points: { aventurier: 2 } },
      { id: "carte", text: "O carte de povești", points: { povestitor: 2 } },
    ],
  },
  {
    id: "animal",
    question: "Cu ce animal ai vrea să fii prieten?",
    answers: [
      { id: "bufnita", text: "Cu o bufniță înțeleaptă", points: { povestitor: 2 } },
      { id: "vulpe", text: "Cu o vulpe jucăușă", points: { artist: 2 } },
      { id: "delfin", text: "Cu un delfin rapid", points: { aventurier: 2 } },
      { id: "robot", text: "Cu un câine-robot", points: { inventator: 2 } },
    ],
  },
  {
    id: "weekend",
    question: "Weekendul perfect înseamnă…",
    answers: [
      { id: "drumetie", text: "O drumeție prin pădure", points: { aventurier: 2 } },
      { id: "spectacol", text: "Un spectacol sau un concert", points: { artist: 2 } },
      { id: "experiment", text: "Un experiment în bucătărie", points: { inventator: 1, aventurier: 1 } },
      { id: "biblioteca", text: "O vizită la bibliotecă", points: { povestitor: 2 } },
    ],
  },
];
