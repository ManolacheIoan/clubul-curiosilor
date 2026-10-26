import Link from "next/link";
import { ActivityArt } from "@/components/illustrations/ActivityArt";
import { ClockIcon, UsersIcon } from "@/components/icons";
import { domainLabel } from "@/data/groups";
import type { Program } from "@/data/programs";
import { ageRange, formatLei } from "@/lib/programs";

/** Card de program: tot cardul e clicabil prin linkul din titlu (care are numele programului). */
export function ProgramCard({ program, headingLevel = 3 }: { program: Program; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <article className="program-card">
      <ActivityArt art={program.art} className="program-card__art wiggle-target" />
      <div className="program-card__body">
        <p className="program-card__mission">{program.mission}</p>
        <H className="program-card__title">
          <Link href={`/programe/${program.slug}/`} className="card-link">
            {program.name}
          </Link>
        </H>
        <p className="program-card__summary">{program.summary}</p>
        <ul className="program-card__meta" aria-label="Detalii">
          <li className="tag">{ageRange(program)}</li>
          <li className="tag tag--sky">{domainLabel(program.domain)}</li>
        </ul>
        <dl className="program-card__facts">
          <div>
            <dt>
              <ClockIcon /> <span className="visually-hidden">Program</span>
            </dt>
            <dd>{program.schedule[0].replace(/^[\d–]+ ani: /, "")}{program.schedule.length > 1 ? " și altele" : ""}</dd>
          </div>
          <div>
            <dt>
              <UsersIcon /> <span className="visually-hidden">Grupă</span>
            </dt>
            <dd>max. {program.groupMax} copii</dd>
          </div>
        </dl>
        <p className="program-card__price">
          <strong>{formatLei(program.price.amount)}</strong> / {program.price.per}
        </p>
      </div>
    </article>
  );
}
