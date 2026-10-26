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
  { href: "/ce-explorator-esti/", label: "Ce explorator ești?" },
  { href: "/intrebari-frecvente/", label: "Întrebări frecvente" },
  { href: "/inscriere/", label: "Înscriere" },
  { href: "/confidentialitate/", label: "Confidențialitate și cookie-uri" },
] as const;
