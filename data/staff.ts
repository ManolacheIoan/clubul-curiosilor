/** Echipa (fictivă). Avatarurile sunt desenate din parametrii de mai jos, fără fotografii. */

export type HairStyle = "bob" | "coc" | "scurt" | "cret" | "lung" | "coada" | "tuns";

export type Avatar = {
  skin: string;
  hair: HairStyle;
  hairColor: string;
  top: string;
  glasses?: boolean;
  beard?: boolean;
  /** Obiectul ținut în mână, legat de specialitate. */
  prop: "carte" | "glob" | "robot" | "pensula" | "nota" | "minge" | "lingura" | "trusa" | "busola";
};

export type StaffMember = {
  slug: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  /** De câți ani lucrează cu copiii. */
  years: number;
  /** Un lucru amuzant, pentru copii. */
  funFact: string;
  avatar: Avatar;
};

export const staff: StaffMember[] = [
  {
    slug: "laura-georgescu",
    name: "Laura Georgescu",
    role: "Directoare și psiholog educațional",
    specialties: ["Adaptarea copiilor noi", "Comunicarea cu părinții", "Dezvoltare emoțională"],
    bio: "A pornit Clubul cu ideea că un copil curios e un copil care învață. Discută cu fiecare familie înainte de înscriere și e omul la care suni când ceva te îngrijorează.",
    years: 16,
    funFact: "Are o colecție de 40 de busole vechi.",
    avatar: { skin: "#E9B999", hair: "coc", hairColor: "#5B3A29", top: "#1F6B52", glasses: true, prop: "busola" },
  },
  {
    slug: "ioana-dumitrescu",
    name: "Ioana Dumitrescu",
    role: "Coordonatoare after-school",
    specialties: ["Ajutor la teme, clasele I–IV", "Lectură", "Organizarea timpului"],
    bio: "Profesoară pentru învățământul primar, știe cum să transforme o temă grea într-una pe care copilul o înțelege. Coordonează echipa de după-amiază.",
    years: 12,
    funFact: "Citește câte o carte pentru copii în fiecare săptămână, ca să aibă mereu recomandări.",
    avatar: { skin: "#F1C7A5", hair: "bob", hairColor: "#2E2320", top: "#F2644F", prop: "carte" },
  },
  {
    slug: "andrei-stan",
    name: "Andrei Stan",
    role: "Profesor de engleză și spaniolă",
    specialties: ["Engleză prin joacă", "Spaniolă", "Pregătire pentru examene de limbă"],
    bio: "A predat limbi străine în mai multe țări și aduce la fiecare lecție câte o poveste de călătorie. Crede că o limbă se învață vorbind, nu doar scriind.",
    years: 9,
    funFact: "Poate spune „bună” în 23 de limbi.",
    avatar: { skin: "#C98E6B", hair: "scurt", hairColor: "#1F1A17", top: "#4DA3D9", beard: true, prop: "glob" },
  },
  {
    slug: "elena-vasilescu",
    name: "Elena Vasilescu",
    role: "Profesoară de germană și franceză",
    specialties: ["Germană", "Franceză", "Teatru de păpuși în limbi străine"],
    bio: "Folosește povești, păpuși și rețete ca să-i facă pe copii să îndrăgească limbile străine. Elevii ei țin un „pașaport” cu ștampile pentru fiecare cuvânt nou.",
    years: 11,
    funFact: "A învățat franceza citind benzi desenate.",
    avatar: { skin: "#F4D0B5", hair: "lung", hairColor: "#B5651D", top: "#FFC83D", prop: "carte" },
  },
  {
    slug: "mihai-ionescu",
    name: "Mihai Ionescu",
    role: "Instructor de robotică și științe",
    specialties: ["Robotică", "Programare vizuală", "Experimente de fizică și chimie"],
    bio: "Inginer de formare, a descoperit că îi place mai mult să le arate copiilor cum funcționează lucrurile decât să le construiască singur. Laboratorul lui e cel mai zgomotos loc din Club.",
    years: 7,
    funFact: "Și-a construit primul robot dintr-un ceas deșteptător.",
    avatar: { skin: "#E0AC8A", hair: "cret", hairColor: "#3B2A20", top: "#2C4A6E", glasses: true, prop: "robot" },
  },
  {
    slug: "ana-popa",
    name: "Ana Popa",
    role: "Educatoare de arte și teatru",
    specialties: ["Pictură și modelaj", "Teatru și improvizație", "Decoruri și costume"],
    bio: "Artist plastic și actriță amatoare, îi învață pe copii că nu există desen greșit și că scena e un loc în care curajul crește.",
    years: 10,
    funFact: "Are pete de vopsea pe toate pantofii.",
    avatar: { skin: "#8D5A3F", hair: "coada", hairColor: "#141010", top: "#7B4BA0", prop: "pensula" },
  },
  {
    slug: "radu-marinescu",
    name: "Radu Marinescu",
    role: "Profesor de muzică și șah",
    specialties: ["Muzică și ritm", "Șah", "Jocuri de logică"],
    bio: "Pianist și jucător de șah, crede că muzica și șahul au ceva în comun: amândouă te învață să asculți și să gândești înainte.",
    years: 14,
    funFact: "Fredonează în timp ce se gândește la o mutare.",
    avatar: { skin: "#F0C29F", hair: "tuns", hairColor: "#8A8A8A", top: "#1E2B26", beard: true, glasses: true, prop: "nota" },
  },
  {
    slug: "cristina-neagu",
    name: "Cristina Neagu",
    role: "Instructoare de sport și ateliere de gătit",
    specialties: ["Sport și mișcare", "Gătit pentru copii", "Nutriție pe înțelesul copiilor"],
    bio: "Profesoară de educație fizică și mare iubitoare de gătit, are grijă ca exploratorii să se miște zilnic și să mănânce sănătos.",
    years: 8,
    funFact: "Face cea mai bună supă de linte din Club (spun copiii).",
    avatar: { skin: "#D9A07E", hair: "coada", hairColor: "#6B3F22", top: "#F2644F", prop: "minge" },
  },
  {
    slug: "sorin-pavel",
    name: "Sorin Pavel",
    role: "Responsabil siguranță și prim ajutor",
    specialties: ["Prim ajutor pediatric", "Procedura de preluare", "Evidența alergiilor"],
    bio: "Se ocupă de partea pe care copiii nu o văd: trusa de prim ajutor, listele de preluare, alergiile, exercițiile de evacuare. Îi știe pe toți copiii pe nume.",
    years: 13,
    funFact: "Are mereu un plasture cu dinozauri în buzunar.",
    avatar: { skin: "#B97A57", hair: "scurt", hairColor: "#2A1E18", top: "#4DA3D9", prop: "trusa" },
  },
];

export const staffBySlug = (slug: string) => staff.find((s) => s.slug === slug);
