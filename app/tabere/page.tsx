import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { CampArt } from "@/components/illustrations/CampArt";
import { BackpackIcon, CheckIcon, ClockIcon, PencilIcon, UsersIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SEASONS, campBring, campDay, campIncluded, camps, type Camp } from "@/data/camps";
import { formatPeriod } from "@/lib/dates";
import { ageRange, formatLei } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Tabere de vară, iarnă, Paște și vacanța intersemestrială",
  description: "Tabere de zi tematice pentru copii de 4–14 ani: perioade disponibile, programul zilei, ce să aducă și prețuri pe săptămână.",
};

function spotsLabel(n: number) {
  if (n <= 0) return "Complet";
  if (n === 1) return "1 loc liber";
  if (n < 20) return `${n} locuri libere`;
  return `${n} de locuri libere`;
}

function CampDetail({ camp }: { camp: Camp }) {
  const saving = camp.pricePerDay * camp.daysPerWeek - camp.pricePerWeek;
  return (
    <Reveal as="article" className="camp-detail">
      <div id={camp.slug} className="anchor" />
      <CampArt art={camp.art} className="camp-detail__art" />
      <div className="camp-detail__body">
        <p className="program-card__mission">{camp.theme}</p>
        <h3 className="camp-detail__title">{camp.name}</h3>
        <p>{camp.summary}</p>
        <ul className="program-card__meta" aria-label="Detalii">
          <li className="tag">{ageRange(camp)}</li>
          <li className="tag tag--sky">
            <UsersIcon /> max. {camp.groupMax} copii
          </li>
          <li className="tag tag--yellow">
            {camp.daysPerWeek} zile, 08:00 – 17:30
          </li>
        </ul>
        <ul className="camp-detail__highlights">
          {camp.highlights.map((h) => (
            <li key={h}>
              <CheckIcon /> {h}
            </li>
          ))}
        </ul>
        <table className="periods">
          <caption className="visually-hidden">Perioade disponibile pentru {camp.name}</caption>
          <thead>
            <tr>
              <th scope="col">Perioada</th>
              <th scope="col">Locuri</th>
            </tr>
          </thead>
          <tbody>
            {camp.periods.map((p) => (
              <tr key={p.start} data-full={p.spotsLeft <= 0 || undefined}>
                <td>{formatPeriod(p.start, p.end)}</td>
                <td>
                  <span className={`tag ${p.spotsLeft <= 0 ? "tag--coral" : p.spotsLeft <= 5 ? "tag--yellow" : ""}`}>
                    {spotsLabel(p.spotsLeft)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="camp-detail__foot">
          <p className="camp-detail__price">
            <strong>{formatLei(camp.pricePerWeek)}</strong> / {camp.daysPerWeek === 5 ? "săptămână" : `${camp.daysPerWeek} zile`}
            <span className="facts__sub">
              {" "}
              sau {formatLei(camp.pricePerDay)} / zi{saving > 0 ? ` (economisești ${formatLei(saving)})` : ""}
            </span>
          </p>
          {camp.periods.some((p) => p.spotsLeft > 0) ? (
            <Link href={`/inscriere/?alegere=tabara:${camp.slug}`} className="btn btn--primary">
              <PencilIcon /> Înscrie copilul<span className="visually-hidden"> la {camp.name}</span>
            </Link>
          ) : (
            <p className="tag tag--coral">Toate perioadele sunt complete</p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function CampsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tabere de vacanță"
        title="Vacanța e cea mai bună misiune"
        intro="Tabere de zi, cu o temă nouă în fiecare săptămână: vara, iarna, de Paște și în vacanța intersemestrială. Prânzul și gustările sunt incluse."
        character="tudor"
      >
        <nav aria-label="Sezoane" className="season-nav">
          {SEASONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip-link">
              {s.label}
            </a>
          ))}
          <a href="#programul-zilei" className="chip-link">
            Programul zilei
          </a>
        </nav>
      </PageHero>

      {SEASONS.map((s, i) => (
        <section key={s.id} className={`section ${i % 2 ? "section--tint" : ""}`} aria-labelledby={s.id}>
          <div className="wrap">
            <div className="section-head">
              <h2 id={s.id}>{s.label}</h2>
              <p className="lead">{s.intro}</p>
            </div>
            <div className="camp-list">
              {camps
                .filter((c) => c.season === s.id)
                .map((c) => (
                  <CampDetail key={c.slug} camp={c} />
                ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section section--cream" aria-labelledby="programul-zilei">
        <div className="wrap camp-info">
          <div>
            <h2 id="programul-zilei">
              <ClockIcon /> Programul unei zile de tabără
            </h2>
            <ol className="camp-day">
              {campDay.map((d) => (
                <li key={d.time}>
                  <span className="camp-day__time">{d.time}</span>
                  <div>
                    <strong>{d.title}</strong>
                    <p>{d.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="camp-info__side">
            <div className="card">
              <h2 className="h3">
                <BackpackIcon /> Ce pun în rucsac
              </h2>
              <ul className="checklist">
                {campBring.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="h3">Ce include prețul</h2>
              <ul className="checklist">
                {campIncluded.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="facts__sub">
                Reduceri pentru frați și pentru mai multe săptămâni: vezi <Link href="/preturi/">Prețuri și reduceri</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Rezervă un loc în tabără" text="Locurile sunt limitate la 16 copii pe săptămână. Trimite cererea, iar noi te sunăm să confirmăm." />
    </>
  );
}
