import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ActivityArt } from "@/components/illustrations/ActivityArt";
import { Avatar } from "@/components/illustrations/Avatar";
import { Character } from "@/components/illustrations/Characters";
import { ArrowLeftIcon, ClockIcon, GraduationIcon, PencilIcon, PhoneIcon, UsersIcon } from "@/components/icons";
import { ProgramCard } from "@/components/ProgramCard";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";
import { AGE_GROUPS, domainLabel } from "@/data/groups";
import { KIND_LABELS, programBySlug, programs } from "@/data/programs";
import { staffBySlug } from "@/data/staff";
import { ageRange, formatLei, similarPrograms } from "@/lib/programs";

export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = programBySlug((await params).slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const program = programBySlug((await params).slug);
  if (!program) notFound();
  const instructor = staffBySlug(program.instructor);
  const similar = similarPrograms(program, programs);
  const clubs = AGE_GROUPS.filter((g) => program.ageMin <= g.max && program.ageMax >= g.min);
  const enrolHref = `/inscriere/?alegere=program:${program.slug}`;

  return (
    <>
      <section className="page-hero program-hero">
        <div className="wrap">
          <nav aria-label="Firimituri" className="breadcrumb">
            <Link href="/programe/">
              <ArrowLeftIcon /> Toate programele
            </Link>
          </nav>
          <div className="program-hero__inner">
            <div>
              <span className="eyebrow">{program.mission}</span>
              <h1>{program.name}</h1>
              <p className="lead">{program.summary}</p>
              <ul className="program-card__meta" aria-label="Pe scurt">
                <li className="tag">{ageRange(program)}</li>
                <li className="tag tag--sky">{domainLabel(program.domain)}</li>
                <li className="tag tag--yellow">{KIND_LABELS[program.kind]}</li>
              </ul>
            </div>
            <div className="program-hero__art" aria-hidden="true">
              <ActivityArt art={program.art} className="program-hero__badge wiggle-target" />
              <Character id={program.character} className="program-hero__char bounce" />
            </div>
          </div>
        </div>
      </section>

      <div className="wrap program-layout">
        <div className="program-main">
          <section className="prose">
            <h2>Despre misiune</h2>
            {program.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </section>
          <section className="prose">
            <h2>Ce urmărim</h2>
            <ul className="checklist">
              {program.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
          {instructor ? (
            <Reveal as="section" className="instructor card">
              <Avatar avatar={instructor.avatar} className="instructor__avatar" />
              <div>
                <h2 className="instructor__title">Cine conduce misiunea</h2>
                <p className="instructor__name">
                  <strong>{instructor.name}</strong>, {instructor.role.toLowerCase()}
                </p>
                <p>{instructor.bio}</p>
                <Link href={`/echipa/#${instructor.slug}`} className="link-arrow">
                  Vezi toată echipa
                </Link>
              </div>
            </Reveal>
          ) : null}
        </div>

        <aside className="facts card" aria-labelledby="pe-scurt">
          <h2 id="pe-scurt">Pe scurt</h2>
          <dl>
            <div>
              <dt>Vârstă</dt>
              <dd>
                {ageRange(program)}
                <br />
                <span className="facts__sub">{clubs.map((c) => c.club).join(", ")}</span>
              </dd>
            </div>
            <div>
              <dt>
                <ClockIcon /> Program
              </dt>
              <dd>
                <ul>
                  {program.schedule.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <span className="facts__sub">
                  {program.sessionMinutes >= 120 ? "zilnic" : `o întâlnire durează ${program.sessionMinutes} de minute`}
                </span>
              </dd>
            </div>
            <div>
              <dt>
                <UsersIcon /> Grupă
              </dt>
              <dd>cel mult {program.groupMax} copii</dd>
            </div>
            {instructor ? (
              <div>
                <dt>
                  <GraduationIcon /> Educator
                </dt>
                <dd>{instructor.name}</dd>
              </div>
            ) : null}
          </dl>
          <p className="facts__price">
            <strong>{formatLei(program.price.amount)}</strong> / {program.price.per}
          </p>
          {program.priceNote ? <p className="facts__sub">
              {program.priceNote.charAt(0).toUpperCase() + program.priceNote.slice(1)}.
            </p> : null}
          <Link href={enrolHref} className="btn btn--primary btn--block">
            <PencilIcon /> Înscrie copilul
          </Link>
          <a href={`tel:${site.phoneHref}`} className="btn btn--block facts__call">
            <PhoneIcon /> Întreabă la {site.phone}
          </a>
          <p className="facts__sub">
            Vezi și <Link href="/preturi/">reducerile pentru frați</Link>.
          </p>
        </aside>
      </div>

      {similar.length ? (
        <section className="section" aria-labelledby="asemanatoare">
          <div className="wrap">
            <h2 id="asemanatoare">Misiuni asemănătoare</h2>
            <ul className="grid grid--3 program-list">
              {similar.map((p) => (
                <li key={p.slug}>
                  <ProgramCard program={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
