/**
 * Setările generale ale centrului. Numele apare doar aici: schimbă BUSINESS_NAME
 * și tot site-ul (titluri, texte, e-mailuri, teste) se actualizează.
 */
export const BUSINESS_NAME = "Clubul Curioșilor";

export const site = {
  name: BUSINESS_NAME,
  tagline: "centru educațional pentru copii de 4–14 ani",
  shortDescription:
    "after-school cu ajutor la teme, cursuri de limbi străine, ateliere de știință, artă, robotică și sport, plus tabere în fiecare vacanță.",
  /** Telefon afișat și varianta pentru linkul tel: (format internațional). */
  phone: "0745 200 300",
  phoneHref: "+40745200300",
  email: "salut@clubulcuriosilor.ro",
  /** Zona deservită: centrul este fictiv, deci nu are adresă exactă. */
  area: "România",
  addressNote: "Adresa exactă o primești la telefon, odată cu programarea vizitei.",
  hours: [
    { days: "Luni – Vineri", hours: "08:00 – 18:30", note: "after-school 12:00 – 18:00" },
    { days: "Sâmbătă", hours: "09:00 – 14:00", note: "ateliere și cursuri" },
    { days: "Duminică", hours: "Închis", note: "" },
  ],
  /** Răspundem la mesaje în zilele lucrătoare, în cel mult atât timp. */
  replyWithin: "o zi lucrătoare",
  /**
   * Unde se trimit cererile de înscriere. Gol = demo: nimic nu pleacă din browser.
   * Se setează la build: NEXT_PUBLIC_ENROLMENT_ENDPOINT=https://formspree.io/f/xxxx
   */
  enrolmentEndpoint: process.env.NEXT_PUBLIC_ENROLMENT_ENDPOINT ?? "",
  /**
   * Domeniul public al site-ului, fără „/” la final. Linkurile spre imaginea de previzualizare
   * (WhatsApp, Facebook) trebuie să fie absolute. Se poate schimba la build: SITE_URL=https://...
   */
  url: process.env.SITE_URL ?? "https://manolacheioan.github.io",
  /** Datele firmei din subsol și din termeni. Centrul e fictiv: valorile sunt doar exemple. */
  legal: {
    company: `${BUSINESS_NAME} SRL`,
    cui: "RO00000000",
    regCom: "J00/0000/2026",
    /** Protecția consumatorilor: legături cerute pe site-urile firmelor din România. */
    anpcUrl: "https://anpc.ro/",
    anpcSalUrl: "https://anpc.ro/ce-este-sal/",
  },
} as const;

/** Meniul principal (antet) și legăturile din subsol. */
export const mainNav = [
  { href: "/programe/", label: "Programe" },
  { href: "/tabere/", label: "Tabere" },
  { href: "/o-zi-la-club/", label: "O zi la Club" },
  { href: "/siguranta/", label: "Siguranță și părinți" },
  { href: "/echipa/", label: "Echipa" },
  { href: "/preturi/", label: "Prețuri" },
  { href: "/contact/", label: "Contact" },
] as const;

export const footerNav = [
  ...mainNav,
  { href: "/spatiul-nostru/", label: "Spațiul nostru" },
  { href: "/ce-explorator-esti/", label: "Ce explorator ești?" },
  { href: "/calendar/", label: "Calendar" },
  { href: "/intrebari-frecvente/", label: "Întrebări frecvente" },
  { href: "/inscriere/", label: "Înscriere" },
  { href: "/termeni/", label: "Termeni și condiții" },
  { href: "/confidentialitate/", label: "Confidențialitate și cookie-uri" },
] as const;
