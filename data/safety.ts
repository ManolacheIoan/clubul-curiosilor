/** Textele paginii „Siguranță și părinți”. Sunt reguli interne generale, nu afirmații juridice. */

export const safetyRules: { title: string; text: string }[] = [
  {
    title: "Acces controlat",
    text: "Ușa de la intrare se deschide doar din interior, de un adult din echipă. Vizitatorii se trec într-un registru.",
  },
  {
    title: "Mereu cu un adult",
    text: "Copiii nu rămân niciodată nesupravegheați: în sală, în curte, la toaletă (pentru cei mici) și pe drumul de la școală.",
  },
  {
    title: "Prezența, verificată de trei ori",
    text: "La sosire, după curte și înainte de plecare numărăm copiii după listă. Fiecare grupă are un educator responsabil.",
  },
  {
    title: "Spații adaptate copiilor",
    text: "Mobilier cu colțuri rotunjite, prize protejate, produse de curățenie încuiate, materiale de atelier potrivite vârstei.",
  },
  {
    title: "Prim ajutor",
    text: "Trusa de prim ajutor e verificată lunar. Echipa urmează cursuri de prim ajutor pediatric, iar exercițiile de evacuare se fac periodic.",
  },
  {
    title: "Fără fotografii publice",
    text: "Nu publicăm fotografii cu copiii fără acordul scris al părinților. Telefoanele educatorilor stau deoparte în timpul activităților.",
  },
];

export const pickupSteps: { title: string; text: string }[] = [
  {
    title: "Lista de preluare",
    text: "La înscriere, ne spui în scris cine poate lua copilul: nume, relația cu copilul și telefon. Lista se poate schimba oricând, tot în scris.",
  },
  {
    title: "Identificarea",
    text: "Prima dată când vine o persoană de pe listă, îi cerem actul de identitate. Educatorii îi rețin fața și numele.",
  },
  {
    title: "Persoană nouă? Ne anunți dinainte",
    text: "Dacă vine cineva care nu e pe listă, ne trimiți un mesaj de pe numărul înregistrat, cu numele persoanei. Te sunăm înapoi să confirmăm.",
  },
  {
    title: "Fără confirmare, copilul rămâne la noi",
    text: "Dacă nu putem confirma, copilul rămâne în siguranță la Club, cu un educator, până te contactăm. Nu facem excepții, nici pentru rude apropiate.",
  },
  {
    title: "Copiii mari care pleacă singuri",
    text: "Pentru copiii de peste 11 ani, plecarea neînsoțită e posibilă doar cu acordul tău scris, la ore stabilite dinainte.",
  },
];

export const medicalHandling: { title: string; text: string }[] = [
  {
    title: "Fișa copilului",
    text: "Alergiile, intoleranțele și informațiile medicale importante se notează într-o fișă la care au acces doar educatorii copilului și responsabilul cu siguranța.",
  },
  {
    title: "Alergii alimentare",
    text: "Lista alergiilor e afișată discret în bucătărie, fără date care nu sunt necesare. Gustările și atelierele de gătit se adaptează.",
  },
  {
    title: "Medicamente",
    text: "Administrăm medicamente doar cu acordul scris al părintelui, în ambalajul original și cu instrucțiuni clare. Notăm fiecare administrare.",
  },
  {
    title: "Când un copil nu se simte bine",
    text: "Îl ducem într-un loc liniștit, sub supraveghere, și te sunăm imediat. În caz de urgență, sunăm la 112 și apoi la tine.",
  },
];

export const communication: { title: string; text: string }[] = [
  { title: "Zilnic", text: "Un mesaj scurt despre ziua copilului: teme, stare, ceva ce a descoperit." },
  { title: "Săptămânal", text: "Lunea primești meniul și misiunile săptămânii." },
  { title: "Lunar", text: "O discuție de 10 minute (la Club sau la telefon) despre progres și ce putem face mai bine." },
  { title: "Oricând", text: "Coordonatoarea și directoarea răspund la telefon în timpul programului. Nicio întrebare nu e prea mică." },
];
