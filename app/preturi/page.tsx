import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SEASONS, camps } from "@/data/camps";
import { KIND_LABELS, programs, type ProgramKind } from "@/data/programs";
import { MAX_FAMILY_DISCOUNT, discounts, extras, paymentNotes } from "@/data/prices";
import { ageRange, formatLei } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Prețuri și reduceri",
  description: "Prețurile pentru after-school, cursuri, ateliere și tabere, plus reducerile pentru frați, mai multe cursuri și săptămâni întregi de tabără.",
};

const KINDS: ProgramKind[] = ["after-school", "limba", "atelier"];

export default function PricesPage() {
  return (
    <>
      <PageHero
        eyebrow="Prețuri și reduceri"
        title="Prețuri clare, fără taxe ascunse"
        intro="Plătești lunar pentru programe și pe săptămână pentru tabere. Nu există taxă de înscriere, iar prima întâlnire la orice curs e gratuită."
        character="bip"
      />

      <section className="section" aria-labelledby="reduceri">
        <div className="wrap">
          <div className="section-head">
            <h2 id="reduceri">Reduceri</h2>
            <p className="lead">Se aplică automat și se cumulează până la {MAX_FAMILY_DISCOUNT}% din totalul lunar al unei familii.</p>
          </div>
          <ul className="grid grid--3 discounts">
            {discounts.map((d, i) => (
              <Reveal as="li" key={d.id} delay={(i % 3) * 80} className="discount">
                <span className="discount__badge" aria-hidden="true">
                  {d.percent ? `−${d.percent}%` : "★"}
                </span>
                <h3>
                  {d.title}
                  {d.percent ? <span className="visually-hidden">: {d.percent}% reducere</span> : null}
                </h3>
                <p>{d.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="programe-preturi">
        <div className="wrap">
          <h2 id="programe-preturi">Programe, cursuri și ateliere</h2>
          {KINDS.map((k) => (
            <div key={k} className="price-table-wrap" tabIndex={0} role="region" aria-label={`Prețuri: ${KIND_LABELS[k]}`}>
              <table className="price-table">
                <caption>{KIND_LABELS[k]}</caption>
                <thead>
                  <tr>
                    <th scope="col">Program</th>
                    <th scope="col">Vârstă</th>
                    <th scope="col">Grupă</th>
                    <th scope="col">Preț</th>
                  </tr>
                </thead>
                <tbody>
                  {programs
                    .filter((p) => p.kind === k)
                    .map((p) => (
                      <tr key={p.slug}>
                        <th scope="row">
                          <Link href={`/programe/${p.slug}/`}>{p.name}</Link>
                          {p.priceNote ? <span className="price-table__note">{p.priceNote}</span> : null}
                        </th>
                        <td>{ageRange(p)}</td>
                        <td>max. {p.groupMax}</td>
                        <td className="price-table__price">
                          {formatLei(p.price.amount)} <span>/ {p.price.per}</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="tabere-preturi">
        <div className="wrap">
          <h2 id="tabere-preturi">Tabere</h2>
          <p className="lead">Săptămâna întreagă costă mai puțin decât zilele plătite separat.</p>
          <div className="price-table-wrap" tabIndex={0} role="region" aria-label="Prețurile taberelor">
            <table className="price-table">
              <caption className="visually-hidden">Prețurile taberelor</caption>
              <thead>
                <tr>
                  <th scope="col">Tabăra</th>
                  <th scope="col">Pe zi</th>
                  <th scope="col">Săptămâna întreagă</th>
                  <th scope="col">Economisești</th>
                </tr>
              </thead>
              <tbody>
                {camps.map((c) => {
                  const save = c.pricePerDay * c.daysPerWeek - c.pricePerWeek;
                  return (
                    <tr key={c.slug}>
                      <th scope="row">
                        <Link href={`/tabere/#${c.slug}`}>{c.name}</Link>
                        <span className="price-table__note">
                          {SEASONS.find((s) => s.id === c.season)?.label}, {c.daysPerWeek} zile, {ageRange(c)}
                        </span>
                      </th>
                      <td>{formatLei(c.pricePerDay)}</td>
                      <td className="price-table__price">{formatLei(c.pricePerWeek)}</td>
                      <td>{save > 0 ? formatLei(save) : "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="extra">
        <div className="wrap grid grid--2">
          <div>
            <h2 id="extra">Alte costuri</h2>
            <dl className="extras">
              {extras.map((e) => (
                <div key={e.title}>
                  <dt>
                    {e.title}
                    <span>{e.text}</span>
                  </dt>
                  <dd>{e.price}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2>Cum se plătește</h2>
            <ul className="checklist">
              {paymentNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
