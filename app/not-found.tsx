import type { Metadata } from "next";
import Link from "next/link";
import { Explorer, Owl } from "@/components/illustrations/Characters";
import { Compass, Leaf, MapScroll, Star } from "@/components/illustrations/Motifs";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Te-ai rătăcit pe hartă" };

const links = [
  { href: "/", label: "Acasă" },
  { href: "/programe/", label: "Programe" },
  { href: "/tabere/", label: "Tabere" },
  { href: "/inscriere/", label: "Înscriere" },
  { href: "/contact/", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="lost">
      <div className="wrap lost__inner">
        <div className="lost__art" aria-hidden="true">
          <MapScroll className="lost__map" />
          <div className="lost__compass">
            <Compass />
          </div>
          <Explorer className="lost__kid" />
          <Owl className="lost__owl bounce bounce--late" />
          <span className="lost__q lost__q--a">?</span>
          <span className="lost__q lost__q--b">?</span>
          <Star className="lost__star float" />
          <Leaf className="lost__leaf float float--b" />
        </div>
        <div className="lost__text">
          <p className="eyebrow">Eroare 404</p>
          <h1>Ups, te-ai rătăcit pe hartă!</h1>
          <p className="lead">
            Pagina pe care o cauți nu e pe traseul nostru. Poate a plecat în tabără. Busola lui Tudor se învârte și ea,
            dar Ola știe drumul înapoi:
          </p>
          <ul className="lost__links">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="chip-link">
                  {l.label} <ArrowRightIcon />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
