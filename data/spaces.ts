/** Încăperile Clubului, pentru pagina „Spațiul nostru”. Ilustrațiile: components/illustrations/RoomArt.tsx */

export type RoomArtId = "teme" | "laborator" | "arte" | "miscare" | "bucatarie" | "curte" | "linistit";

export type Room = {
  id: RoomArtId;
  name: string;
  /** Pentru ce se folosește, pe scurt (eticheta de deasupra titlului). */
  use: string;
  text: string;
  facts: string[];
};

export const rooms: Room[] = [
  {
    id: "teme",
    name: "Sala de teme",
    use: "After-school",
    text: "Mese joase, lumină bună și liniște. Aici se fac temele, cu un educator care trece pe la fiecare copil.",
    facts: ["Cel mult 12 copii la un educator", "Bibliotecă de clasă, cu dicționare și culegeri", "Lumină naturală și lămpi pe fiecare masă"],
  },
  {
    id: "laborator",
    name: "Laboratorul",
    use: "Științe și robotică",
    text: "Locul cu cele mai multe întrebări pe minut: experimente, circuite și roboți care chiar se mișcă.",
    facts: ["Ochelari de protecție pentru fiecare copil", "Chiuvetă și blat ușor de curățat", "Kituri de robotică pentru 4–14 ani"],
  },
  {
    id: "arte",
    name: "Atelierul de arte și scena",
    use: "Arte, teatru și muzică",
    text: "Șevalete, culori care se spală ușor și o scenă mică cu cortină, pentru repetiții și spectacole.",
    facts: ["Șorțuri pentru toată lumea", "Instrumente de percuție și un pian digital", "Lucrările copiilor expuse pe pereți"],
  },
  {
    id: "miscare",
    name: "Sala de mișcare",
    use: "Sport, dans și joacă",
    text: "Saltele moi, un perete de cățărat jos și loc destul pentru dans, yoga pentru copii și jocuri de echipă.",
    facts: ["Podea moale și colțuri protejate", "Peretele de cățărat are cel mult 1,5 m", "Ventilație și aer proaspăt după fiecare grupă"],
  },
  {
    id: "bucatarie",
    name: "Bucătăria-atelier",
    use: "Gătit și masa de prânz",
    text: "Aici se gătește la atelier și tot aici mâncăm. Copiii folosesc ustensile pe măsura lor, cu un adult lângă ei.",
    facts: ["Alergiile marcate pe lista de la bucătărie", "Cuțite pentru copii, fără vârf", "Masa de prânz vine de la un furnizor autorizat"],
  },
  {
    id: "curte",
    name: "Curtea",
    use: "Joacă afară și grădinărit",
    text: "Curte închisă, cu groapă de nisip, un copac bun de stat la umbră și grădina de legume a Clubului.",
    facts: ["Gard înalt și o singură poartă, încuiată", "Ieșim afară în fiecare zi, dacă vremea ne lasă", "Fiecare grupă are straturile ei în grădină"],
  },
  {
    id: "linistit",
    name: "Colțul liniștit",
    use: "Odihnă și adaptare",
    text: "Pernuțe, cărți și lumină caldă. Un loc unde orice copil se poate retrage când are nevoie de o pauză.",
    facts: ["Mereu la vedere pentru un educator", "Ajută mult copiii noi, în primele zile", "Cărți pentru fiecare vârstă"],
  },
];
