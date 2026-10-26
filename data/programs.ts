import type { DomainId } from "./groups";

/** Personajele site-ului: Ola (bufnița), Ruxi (vulpea), Bip (robotul), Tudor (micul explorator). */
export type CharacterId = "ola" | "ruxi" | "bip" | "tudor";

export type ProgramKind = "after-school" | "limba" | "atelier";

/** Ilustrația fiecărei activități (vezi components/illustrations/ActivityArt.tsx). */
export type ArtId =
  | "after-school"
  | "engleza"
  | "germana"
  | "franceza"
  | "spaniola"
  | "robotica"
  | "stiinte"
  | "arte"
  | "teatru"
  | "muzica"
  | "sah"
  | "sport"
  | "gatit";

export type Program = {
  slug: string;
  name: string;
  /** Numele „misiunii”, afișat ca supratitlu. */
  mission: string;
  kind: ProgramKind;
  domain: DomainId;
  art: ArtId;
  character: CharacterId;
  ageMin: number;
  ageMax: number;
  /** Zilele și orele, câte un rând pe grupă. */
  schedule: string[];
  /** Durata unei întâlniri, în minute. */
  sessionMinutes: number;
  groupMax: number;
  price: { amount: number; per: "lună" | "ședință" };
  /** Ce include prețul (opțional). */
  priceNote?: string;
  summary: string;
  description: string[];
  objectives: string[];
  /** slug din data/staff.ts */
  instructor: string;
  /** Cuvinte în plus pentru căutare (sinonime). */
  keywords?: string[];
};

export const programs: Program[] = [
  {
    slug: "after-school",
    name: "After-school",
    mission: "Misiunea „Teme făcute, minte liberă”",
    kind: "after-school",
    domain: "after-school",
    art: "after-school",
    character: "ola",
    ageMin: 6,
    ageMax: 14,
    schedule: ["Luni – Vineri, 12:00 – 18:00"],
    sessionMinutes: 360,
    groupMax: 12,
    price: { amount: 1250, per: "lună" },
    priceNote: "prețul include ajutorul la teme, gustarea de după-amiază și activitățile zilnice; prânzul cald este opțional",
    summary:
      "Un loc sigur după ore: temele se fac cu ajutorul unui educator, urmează gustarea, joaca și o misiune nouă în fiecare zi.",
    description: [
      "Copiii ajung la Club la prânz, iau o pauză și apoi se apucă de teme într-o sală liniștită, cu un educator pentru cel mult 12 copii. Nu facem temele în locul lor: îi ajutăm să înțeleagă, să se organizeze și să verifice singuri ce au lucrat.",
      "După teme vin gustarea, joaca în aer liber și „misiunea zilei”: un experiment, un joc în limba engleză, un atelier de desen sau o provocare de logică. Seara, părinții primesc pe scurt cum a decurs ziua.",
    ],
    objectives: [
      "Teme terminate și verificate până la ora 16:00",
      "Obiceiuri bune de învățare: organizare, concentrare, răbdare",
      "Timp zilnic de mișcare și de joacă liberă",
      "Legătură constantă cu părinții, printr-un mesaj scurt în fiecare zi",
    ],
    instructor: "ioana-dumitrescu",
    keywords: ["teme", "after school", "dupa scoala", "gustare", "pranz"],
  },
  {
    slug: "engleza",
    name: "Engleză prin joacă",
    mission: "Misiunea „Hello, world!”",
    kind: "limba",
    domain: "limbi",
    art: "engleza",
    character: "bip",
    ageMin: 4,
    ageMax: 14,
    schedule: ["4–6 ani: marți și joi, 16:30 – 17:15", "7–10 ani: luni și miercuri, 16:00 – 17:00", "11–14 ani: marți și joi, 17:15 – 18:15"],
    sessionMinutes: 60,
    groupMax: 8,
    price: { amount: 340, per: "lună" },
    priceNote: "8 întâlniri pe lună, materiale incluse",
    summary: "Cântece, jocuri de rol și povești: copiii vorbesc engleză din prima lecție, fără teama de greșeli.",
    description: [
      "Lecțiile sunt construite ca niște mici expediții: copiii pleacă „în călătorie” într-o țară vorbitoare de limba engleză, comandă la un restaurant imaginar, cer direcții pe o hartă sau prezintă o descoperire în fața grupei.",
      "Cei mici învață prin cântece și mișcare, cei mari lucrează la proiecte scurte și se pregătesc, dacă vor, pentru examenele de competență lingvistică.",
    ],
    objectives: [
      "Vocabular folosit în situații reale, nu doar învățat pe de rost",
      "Curaj de a vorbi și de a pune întrebări în limba engleză",
      "Pronunție corectă, prin cântece și jocuri de ascultare",
      "Un mic portofoliu de proiecte la finalul fiecărui semestru",
    ],
    instructor: "andrei-stan",
    keywords: ["engleza", "english", "limba engleza", "limbi straine"],
  },
  {
    slug: "germana",
    name: "Germană pentru curioși",
    mission: "Misiunea „Hallo, Freunde!”",
    kind: "limba",
    domain: "limbi",
    art: "germana",
    character: "ola",
    ageMin: 6,
    ageMax: 14,
    schedule: ["6–10 ani: luni și miercuri, 17:00 – 18:00", "11–14 ani: marți și joi, 16:00 – 17:00"],
    sessionMinutes: 60,
    groupMax: 8,
    price: { amount: 360, per: "lună" },
    priceNote: "8 întâlniri pe lună, materiale incluse",
    summary: "Germana pare grea doar până o joci: jocuri de cărți, rețete, ghicitori și primele conversații.",
    description: [
      "Pornim de la ce le place copiilor: animale, mâncare, sport, povești. Cuvintele noi apar în jocuri de cărți, în rețete scurte sau în ghicitori, iar gramatica vine pe nesimțite, din exemple.",
      "Grupele sunt mici, ca fiecare copil să vorbească la fiecare lecție.",
    ],
    objectives: [
      "Primele conversații simple despre sine, familie și școală",
      "Pronunție corectă a sunetelor specifice limbii germane",
      "Înțelegerea unor texte și povești scurte",
      "Încredere și plăcere de a învăța o limbă nouă",
    ],
    instructor: "elena-vasilescu",
    keywords: ["germana", "deutsch", "limba germana", "limbi straine"],
  },
  {
    slug: "franceza",
    name: "Franceză cu poveste",
    mission: "Misiunea „Bonjour, la France!”",
    kind: "limba",
    domain: "limbi",
    art: "franceza",
    character: "ruxi",
    ageMin: 6,
    ageMax: 14,
    schedule: ["6–10 ani: marți, 16:00 – 17:00 și vineri, 15:00 – 16:00", "11–14 ani: miercuri și vineri, 16:00 – 17:00"],
    sessionMinutes: 60,
    groupMax: 8,
    price: { amount: 340, per: "lună" },
    priceNote: "8 întâlniri pe lună, materiale incluse",
    summary: "Povești ilustrate, cântece și teatru de păpuși: franceza devine o limbă a jocului.",
    description: [
      "Fiecare lună are o poveste-ghid: copiii o ascultă, o desenează, o joacă cu păpuși și apoi o continuă cu propriile cuvinte.",
      "Cei mari scriu scurte benzi desenate și înregistrează mici emisiuni radio pentru colegi.",
    ],
    objectives: [
      "Vocabular de bază pentru viața de zi cu zi",
      "Înțelegerea poveștilor și a cântecelor simple",
      "Exprimare orală clară, prin jocuri de rol",
      "Curiozitate pentru alte culturi",
    ],
    instructor: "elena-vasilescu",
    keywords: ["franceza", "francais", "limba franceza", "limbi straine"],
  },
  {
    slug: "spaniola",
    name: "Spaniolă cu ritm",
    mission: "Misiunea „¡Hola, amigos!”",
    kind: "limba",
    domain: "limbi",
    art: "spaniola",
    character: "tudor",
    ageMin: 7,
    ageMax: 14,
    schedule: ["7–10 ani: luni și joi, 16:00 – 17:00", "11–14 ani: miercuri, 17:00 – 18:00 și sâmbătă, 10:00 – 11:00"],
    sessionMinutes: 60,
    groupMax: 8,
    price: { amount: 320, per: "lună" },
    priceNote: "8 întâlniri pe lună, materiale incluse",
    summary: "Muzică, dans, jocuri de piață și mici călătorii imaginare prin lumea vorbitoare de spaniolă.",
    description: [
      "Spaniola are ritm, așa că începem cu el: cântece, numărători, jocuri de mișcare. Apoi copiii „deschid o piață” în sală, negociază, cumpără și vând în spaniolă.",
      "La fiecare lună, grupa „vizitează” o altă țară și descoperă mâncăruri, sărbători și cuvinte noi.",
    ],
    objectives: [
      "Conversații simple în situații cotidiene",
      "Ureche formată pentru sunetele și ritmul limbii",
      "Vocabular tematic: mâncare, călătorii, timp liber",
      "Cunoștințe despre culturi diferite",
    ],
    instructor: "andrei-stan",
    keywords: ["spaniola", "espanol", "limba spaniola", "limbi straine"],
  },
  {
    slug: "robotica-si-programare",
    name: "Robotică și programare",
    mission: "Misiunea „Construiește, programează, repetă”",
    kind: "atelier",
    domain: "tehnologie",
    art: "robotica",
    character: "bip",
    ageMin: 7,
    ageMax: 14,
    schedule: ["7–10 ani: miercuri, 16:00 – 17:30", "11–14 ani: vineri, 16:00 – 17:30 sau sâmbătă, 11:00 – 12:30"],
    sessionMinutes: 90,
    groupMax: 8,
    price: { amount: 390, per: "lună" },
    priceNote: "4 întâlniri pe lună; kiturile și laptopurile sunt ale Clubului",
    summary: "Copiii construiesc roboți din kituri educaționale și îi învață să se miște, să ocolească obstacole și să rezolve misiuni.",
    description: [
      "Cei mai mici programează cu blocuri vizuale: trag și potrivesc instrucțiuni, iar robotul face exact ce i-au spus (uneori, spre amuzamentul tuturor, chiar exact). Cei mari trec treptat la programare scrisă, senzori și proiecte proprii.",
      "La final de semestru, fiecare echipă își prezintă robotul la „Târgul inventatorilor”, în fața părinților.",
    ],
    objectives: [
      "Gândire logică și împărțirea unei probleme în pași mici",
      "Primele noțiuni de programare: secvențe, repetiții, condiții",
      "Lucru în echipă și răbdare când ceva nu merge din prima",
      "Un proiect propriu, prezentat la final de semestru",
    ],
    instructor: "mihai-ionescu",
    keywords: ["robotica", "programare", "coding", "calculator", "stem", "tehnologie"],
  },
  {
    slug: "stiinte-distractive",
    name: "Științe distractive",
    mission: "Misiunea „De ce?”",
    kind: "atelier",
    domain: "stiinte",
    art: "stiinte",
    character: "tudor",
    ageMin: 5,
    ageMax: 12,
    schedule: ["5–7 ani: marți, 16:00 – 17:00", "8–12 ani: joi, 16:00 – 17:30"],
    sessionMinutes: 75,
    groupMax: 10,
    price: { amount: 300, per: "lună" },
    priceNote: "4 întâlniri pe lună, toate materialele incluse",
    summary: "Vulcani, cristale, circuite simple și experimente cu apă: copiii pun întrebări și află singuri răspunsurile.",
    description: [
      "Fiecare atelier pornește de la o întrebare pusă de copii: de ce plutesc vapoarele, cum crește un cristal, ce e electricitatea. Facem ipoteze, testăm, notăm în „jurnalul de explorator” și tragem concluzii.",
      "Toate experimentele sunt alese pentru vârsta copiilor și se fac cu ochelari de protecție și materiale sigure.",
    ],
    objectives: [
      "Metoda științifică pe înțelesul copiilor: întreb, presupun, testez",
      "Curiozitate și obiceiul de a observa atent",
      "Siguranță în laborator",
      "Un jurnal de explorator completat pe parcursul anului",
    ],
    instructor: "mihai-ionescu",
    keywords: ["stiinta", "experimente", "chimie", "fizica", "biologie", "stem"],
  },
  {
    slug: "arte-si-creatie",
    name: "Arte și creație",
    mission: "Misiunea „Lumea în culori”",
    kind: "atelier",
    domain: "arte",
    art: "arte",
    character: "ruxi",
    ageMin: 4,
    ageMax: 12,
    schedule: ["4–6 ani: miercuri, 16:30 – 17:30", "7–12 ani: vineri, 16:00 – 17:30"],
    sessionMinutes: 75,
    groupMax: 10,
    price: { amount: 270, per: "lună" },
    priceNote: "4 întâlniri pe lună, materiale incluse",
    summary: "Pictură, modelaj, colaj și obiecte din materiale reciclate: fiecare copil pleacă acasă cu o operă proprie.",
    description: [
      "Copiii experimentează tehnici diferite: acuarelă, tempera, modelaj în lut, colaj, imprimare cu ștampile făcute de ei. Nu există „desen greșit”, ci doar idei noi.",
      "De două ori pe an organizăm o expoziție pentru părinți, cu lucrările alese chiar de copii.",
    ],
    objectives: [
      "Exprimarea emoțiilor și a ideilor prin culoare și formă",
      "Motricitate fină și coordonare",
      "Cunoașterea mai multor tehnici artistice",
      "Încredere în propria creativitate",
    ],
    instructor: "ana-popa",
    keywords: ["desen", "pictura", "arta", "creatie", "modelaj", "lucru manual"],
  },
  {
    slug: "teatru",
    name: "Teatru și improvizație",
    mission: "Misiunea „Lumini, scenă, curaj!”",
    kind: "atelier",
    domain: "arte",
    art: "teatru",
    character: "ruxi",
    ageMin: 6,
    ageMax: 14,
    schedule: ["6–10 ani: luni, 16:30 – 17:30", "11–14 ani: joi, 17:00 – 18:30"],
    sessionMinutes: 75,
    groupMax: 12,
    price: { amount: 290, per: "lună" },
    priceNote: "4 întâlniri pe lună, costumele sunt ale Clubului",
    summary: "Jocuri de improvizație, exerciții de voce și o piesă pusă în scenă la final de semestru.",
    description: [
      "Teatrul îi ajută pe copii să vorbească în fața altora, să asculte și să coopereze. Lucrăm cu jocuri de improvizație, exerciții de respirație și voce și scenete scrise împreună.",
      "La final de semestru, grupa joacă o piesă pentru părinți, cu decoruri făcute la atelierul de arte.",
    ],
    objectives: [
      "Încredere când vorbesc în fața unui grup",
      "Dicție, voce și expresivitate",
      "Ascultare activă și lucru în echipă",
      "Un spectacol pregătit de la idee la aplauze",
    ],
    instructor: "ana-popa",
    keywords: ["teatru", "actorie", "scena", "improvizatie", "dictie"],
  },
  {
    slug: "muzica",
    name: "Muzică și ritm",
    mission: "Misiunea „Do-re-mi-explorăm”",
    kind: "atelier",
    domain: "arte",
    art: "muzica",
    character: "ola",
    ageMin: 4,
    ageMax: 10,
    schedule: ["4–6 ani: marți, 17:15 – 18:00", "7–10 ani: joi, 16:00 – 17:00"],
    sessionMinutes: 60,
    groupMax: 10,
    price: { amount: 300, per: "lună" },
    priceNote: "4 întâlniri pe lună; instrumentele sunt ale Clubului",
    summary: "Cântec, percuție, xilofon și ukulele: copiii descoperă ritmul și cântă împreună.",
    description: [
      "Începem cu ritmul: bătăi din palme, tobițe, jocuri de ecou. Apoi copiii încearcă instrumente simple, învață să citească primele note și cântă în grup.",
      "Atelierul nu e o școală de muzică cu examene, ci un loc în care copiii descoperă ce instrument îi atrage.",
    ],
    objectives: [
      "Simț ritmic și ureche muzicală",
      "Primele note citite de pe portativ",
      "Cântat în grup, cu atenție la ceilalți",
      "Descoperirea unui instrument preferat",
    ],
    instructor: "radu-marinescu",
    keywords: ["muzica", "canto", "instrumente", "ritm", "pian", "ukulele"],
  },
  {
    slug: "sah",
    name: "Șah pentru exploratori",
    mission: "Misiunea „Gândește trei mutări înainte”",
    kind: "atelier",
    domain: "minte",
    art: "sah",
    character: "ola",
    ageMin: 6,
    ageMax: 14,
    schedule: ["6–9 ani: miercuri, 17:00 – 18:00", "10–14 ani: sâmbătă, 10:00 – 11:30"],
    sessionMinutes: 75,
    groupMax: 10,
    price: { amount: 250, per: "lună" },
    priceNote: "4 întâlniri pe lună",
    summary: "De la cum se mută calul la primele combinații: șahul învață răbdarea și gândirea strategică.",
    description: [
      "Cei mici învață piesele prin povești (fiecare piesă are „personalitatea” ei) și jocuri pe tabla mare de pe podea. Cei mari rezolvă probleme, analizează partide și joacă mici turnee între ei.",
      "Câștigul nu e scopul: învățăm să pierdem frumos, să ne felicităm adversarul și să înțelegem ce am greșit.",
    ],
    objectives: [
      "Regulile jocului și primele strategii",
      "Concentrare și răbdare",
      "Gândire anticipativă: ce urmează după mutarea mea?",
      "Fair-play, la victorie și la înfrângere",
    ],
    instructor: "radu-marinescu",
    keywords: ["sah", "chess", "logica", "strategie", "jocuri de minte"],
  },
  {
    slug: "sport-si-miscare",
    name: "Sport și mișcare",
    mission: "Misiunea „Energie de explorator”",
    kind: "atelier",
    domain: "miscare",
    art: "sport",
    character: "tudor",
    ageMin: 4,
    ageMax: 12,
    schedule: ["4–6 ani: luni și miercuri, 17:00 – 17:45", "7–12 ani: marți și joi, 17:00 – 18:00"],
    sessionMinutes: 60,
    groupMax: 12,
    price: { amount: 260, per: "lună" },
    priceNote: "8 întâlniri pe lună",
    summary: "Trasee cu obstacole, jocuri de echipă, coordonare și echilibru: mișcare zilnică, fără presiunea competiției.",
    description: [
      "Copiii aleargă, sar, se cațără și se echilibrează pe trasee schimbate în fiecare săptămână. Jucăm jocuri de echipă în care fiecare are un rol, indiferent de cât de rapid aleargă.",
      "Antrenorul adaptează exercițiile pentru fiecare copil; cine are nevoie de pauză o primește.",
    ],
    objectives: [
      "Coordonare, echilibru și forță potrivite vârstei",
      "Plăcerea de a se mișca zilnic",
      "Spirit de echipă și respectarea regulilor",
      "Încălzire și pauze făcute corect",
    ],
    instructor: "cristina-neagu",
    keywords: ["sport", "miscare", "gimnastica", "jocuri de echipa", "fotbal"],
  },
  {
    slug: "gatit-pentru-copii",
    name: "Gătit pentru copii",
    mission: "Misiunea „Mici bucătari, mari gusturi”",
    kind: "atelier",
    domain: "gatit",
    art: "gatit",
    character: "ruxi",
    ageMin: 6,
    ageMax: 12,
    schedule: ["6–8 ani: vineri, 16:00 – 17:15", "9–12 ani: sâmbătă, 11:30 – 13:00"],
    sessionMinutes: 75,
    groupMax: 8,
    price: { amount: 340, per: "lună" },
    priceNote: "4 întâlniri pe lună, ingredientele incluse",
    summary: "Rețete simple și sănătoase, măsurate, amestecate și gustate împreună, cu reguli clare de siguranță.",
    description: [
      "Copiii pregătesc rețete potrivite vârstei: salate colorate, chifle, biscuiți, smoothie-uri. Măsoară, cântăresc și numără, deci fac și puțină matematică fără să-și dea seama.",
      "Știm dinainte alergiile fiecărui copil și adaptăm rețetele. Cuptorul și cuțitele mari sunt folosite doar de adulți.",
    ],
    objectives: [
      "Igienă și siguranță în bucătărie",
      "Obiceiuri alimentare sănătoase, explicate pe înțeles",
      "Măsurare, numărare și urmărirea unei rețete pas cu pas",
      "Bucuria de a găti pentru alții",
    ],
    instructor: "cristina-neagu",
    keywords: ["gatit", "bucatarie", "retete", "cooking", "alimentatie"],
  },
];

export const programBySlug = (slug: string) => programs.find((p) => p.slug === slug);

export const KIND_LABELS: Record<ProgramKind, string> = {
  "after-school": "After-school",
  limba: "Cursuri de limbi străine",
  atelier: "Cursuri și ateliere",
};
