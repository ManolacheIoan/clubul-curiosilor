/** Întrebări frecvente, grupate pe teme. Textul răspunsului poate avea mai multe paragrafe. */

export type FaqCategory = "inscriere" | "program" | "siguranta" | "tabere" | "plata";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string[];
};

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: "inscriere", label: "Înscriere și adaptare" },
  { id: "program", label: "Program și activități" },
  { id: "siguranta", label: "Siguranță și sănătate" },
  { id: "tabere", label: "Tabere" },
  { id: "plata", label: "Prețuri și plată" },
];

export const faq: FaqItem[] = [
  {
    id: "varsta",
    category: "inscriere",
    question: "De la ce vârstă pot înscrie copilul?",
    answer: [
      "Primim copii între 4 și 14 ani. After-school-ul e pentru școlari (de la 6 ani), iar cursurile și atelierele au grupe separate pe vârste.",
    ],
  },
  {
    id: "proba",
    category: "inscriere",
    question: "Putem veni la o ședință de probă?",
    answer: [
      "Da. Prima întâlnire la orice curs sau atelier este gratuită. La after-school, te invităm la o vizită împreună cu copilul înainte de prima zi.",
    ],
  },
  {
    id: "adaptare",
    category: "inscriere",
    question: "Cum decurge adaptarea unui copil nou?",
    answer: [
      "În prima săptămână, copilul are un „coleg-ghid” din grupă și un educator care îl urmărește mai atent. Îți scriem la finalul fiecărei zile cum s-a simțit.",
      "Dacă e nevoie, putem începe cu zile mai scurte.",
    ],
  },
  {
    id: "dupa-inscriere",
    category: "inscriere",
    question: "Ce se întâmplă după ce trimit formularul de înscriere?",
    answer: [
      "Te sunăm în cel mult o zi lucrătoare ca să confirmăm locul, să răspundem la întrebări și să stabilim o vizită. Înscrierea devine definitivă după discuția cu noi și semnarea contractului.",
    ],
  },
  {
    id: "teme",
    category: "program",
    question: "Faceți temele în locul copilului?",
    answer: [
      "Nu. Educatorii explică, pun întrebări ajutătoare și verifică, dar copilul lucrează singur. Scopul e să învețe să se descurce, nu doar să aibă tema scrisă.",
    ],
  },
  {
    id: "preluare-scoala",
    category: "program",
    question: "Preluați copiii de la școală?",
    answer: [
      "Pentru școlile din apropiere, da: un educator îi aduce pe jos, în grup, la ora 12:00 sau la terminarea orelor. Pentru alte școli, discutăm împreună variantele.",
    ],
  },
  {
    id: "mancare",
    category: "program",
    question: "Ce mănâncă copiii la Club?",
    answer: [
      "Gustarea de după-amiază e inclusă. Prânzul cald este opțional și vine de la un furnizor autorizat; poți trimite și pachet de acasă. Meniul săptămânii îl primești lunea.",
    ],
  },
  {
    id: "alergii",
    category: "siguranta",
    question: "Copilul meu are o alergie. Cum vă asigurați că e în siguranță?",
    answer: [
      "Alergiile declarate la înscriere ajung pe o fișă internă văzută doar de educatorii copilului și de responsabilul cu siguranța. Le marcăm pe lista de la bucătărie și la atelierele de gătit.",
      "Dacă copilul are nevoie de un medicament de urgență, stabilim împreună, în scris, unde se păstrează și cine îl poate administra.",
    ],
  },
  {
    id: "cine-ia",
    category: "siguranta",
    question: "Cine poate lua copilul de la Club?",
    answer: [
      "Doar părinții și persoanele trecute de ei pe lista de preluare, cu act de identitate. Dacă vine cineva nou, trebuie să ne anunți dinainte, în scris. Vezi pagina Siguranță și părinți pentru toată procedura.",
    ],
  },
  {
    id: "boala",
    category: "siguranta",
    question: "Ce se întâmplă dacă un copil se îmbolnăvește la Club?",
    answer: [
      "Îl ducem într-un loc liniștit, sub supravegherea unui adult, și te sunăm imediat. În caz de urgență, sunăm la 112 și apoi la tine.",
    ],
  },
  {
    id: "fotografii",
    category: "siguranta",
    question: "Publicați fotografii cu copiii?",
    answer: [
      "Nu publicăm fotografii fără acordul tău scris. Pozele din activități le trimitem doar părinților care și-au dat acordul, iar acordul se poate retrage oricând.",
    ],
  },
  {
    id: "tabara-zile",
    category: "tabere",
    question: "Pot înscrie copilul doar pentru câteva zile de tabără?",
    answer: [
      "Da, dacă sunt locuri. Prețul pe zi e afișat la fiecare tabără; săptămâna întreagă iese mai avantajos.",
    ],
  },
  {
    id: "tabara-nu-e-inscris",
    category: "tabere",
    question: "Trebuie să fie copilul înscris la Club ca să vină în tabără?",
    answer: ["Nu. Taberele sunt deschise tuturor copiilor din grupa de vârstă a taberei."],
  },
  {
    id: "plata",
    category: "plata",
    question: "Cum se plătește?",
    answer: [
      "Lunar, până pe data de 5, prin transfer bancar sau cu cardul la recepție. Pentru tabere, locul se rezervă cu un avans de 30%.",
    ],
  },
  {
    id: "absente",
    category: "plata",
    question: "Ce se întâmplă cu zilele în care copilul lipsește?",
    answer: [
      "La cursuri, întâlnirile pierdute din cauza bolii, anunțate până la ora 9:00, se recuperează în aceeași lună. Abonamentul de after-school nu se recalculează pentru absențe scurte.",
    ],
  },
];
