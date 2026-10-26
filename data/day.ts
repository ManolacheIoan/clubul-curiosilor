import type { CharacterId } from "./programs";

/** O zi obișnuită de after-school: fiecare oprire de pe „harta comorii”. */
export type DayStop = {
  time: string;
  title: string;
  text: string;
  /** Ce află părintele despre această etapă. */
  forParents: string;
  icon: "steag" | "farfurie" | "carte" | "creion" | "mar" | "lupa" | "minge" | "luna";
  character: CharacterId;
};

export const typicalDay: DayStop[] = [
  {
    time: "12:00",
    title: "Sosirea exploratorilor",
    text: "Ne întâlnim la Club. Fiecare copil își pune rucsacul în căsuța lui și spune cum a fost la școală.",
    forParents: "Bifăm prezența la sosire; dacă un copil întârzie mai mult de 20 de minute, te sunăm.",
    icon: "steag",
    character: "tudor",
  },
  {
    time: "12:30",
    title: "Prânzul",
    text: "Masă caldă, opțională, de la un furnizor autorizat. Cine are pachet de acasă mănâncă alături de ceilalți.",
    forParents: "Meniul săptămânii îl primești luni; alergiile sunt marcate pe lista din bucătărie.",
    icon: "farfurie",
    character: "ruxi",
  },
  {
    time: "13:15",
    title: "Ora liniștită",
    text: "Citim, ne odihnim, ascultăm o poveste. Creierul are nevoie de o pauză înainte de teme.",
    forParents: "Copiii mici se pot odihni pe saltele, cei mari aleg o carte din biblioteca Clubului.",
    icon: "luna",
    character: "ola",
  },
  {
    time: "14:00",
    title: "Misiunea „Teme”",
    text: "Fiecare copil își face temele, iar educatorul îl ajută să înțeleagă, nu îi dă răspunsul.",
    forParents: "Îți spunem dacă a rămas ceva neterminat sau dacă un subiect a fost mai greu.",
    icon: "creion",
    character: "ola",
  },
  {
    time: "15:30",
    title: "Gustarea",
    text: "Fructe, legume crocante, iaurt sau o felie de pâine cu ceva bun. Și apă, multă apă.",
    forParents: "Gustarea e inclusă în preț și ține cont de alergiile declarate.",
    icon: "mar",
    character: "ruxi",
  },
  {
    time: "16:00",
    title: "Misiunea zilei",
    text: "Un experiment, un joc în engleză, un atelier de desen sau o provocare de logică: în fiecare zi altceva.",
    forParents: "Programul misiunilor îl găsești la intrare și în mesajul de luni.",
    icon: "lupa",
    character: "bip",
  },
  {
    time: "17:00",
    title: "Joacă și mișcare",
    text: "Curte, trasee cu obstacole, jocuri de echipă. Dacă plouă, ne mutăm în sala de mișcare.",
    forParents: "Copiii au mereu un educator cu ei, inclusiv în curte.",
    icon: "minge",
    character: "tudor",
  },
  {
    time: "17:45",
    title: "Comoara zilei și plecarea",
    text: "Spunem ce am descoperit azi și ne luăm la revedere. Plecăm doar cu persoanele de pe lista părinților.",
    forParents: "Primești un mesaj scurt despre ziua copilului. Preluarea se face până la 18:00.",
    icon: "steag",
    character: "tudor",
  },
];
