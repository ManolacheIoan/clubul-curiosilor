import Link from "next/link";
import { CampArt } from "@/components/illustrations/CampArt";
import type { Camp } from "@/data/camps";
import { formatPeriod } from "@/lib/dates";
import { ageRange, formatLei } from "@/lib/programs";

export function CampCard({ camp, headingLevel = 3 }: { camp: Camp; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  const next = camp.periods.find((p) => p.spotsLeft > 0) ?? camp.periods[0];
  return (
    <article className="camp-card">
      <CampArt art={camp.art} className="camp-card__art" />
      <div className="camp-card__body">
        <p className="program-card__mission">{camp.theme}</p>
        <H className="program-card__title">
          <Link href={`/tabere/#${camp.slug}`} className="card-link">
            {camp.name}
          </Link>
        </H>
        <p className="program-card__summary">{camp.summary}</p>
        <ul className="program-card__meta" aria-label="Detalii">
          <li className="tag">{ageRange(camp)}</li>
          <li className="tag tag--yellow">{formatPeriod(next.start, next.end)}</li>
        </ul>
        <p className="program-card__price">
          <strong>{formatLei(camp.pricePerWeek)}</strong> / săptămână
        </p>
      </div>
    </article>
  );
}
