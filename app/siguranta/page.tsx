import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ChatIcon, FirstAidIcon, IdCardIcon, ShieldIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { faq } from "@/data/faq";
import { communication, medicalHandling, pickupSteps, safetyRules } from "@/data/safety";

export const metadata: Metadata = {
  title: "Siguranță și părinți",
  description: "Regulile de siguranță, procedura de preluare a copiilor, cum gestionăm alergiile și informațiile medicale și cum comunicăm cu părinții.",
};

const toc = [
  { id: "reguli", label: "Regulile de siguranță" },
  { id: "preluare", label: "Preluarea copilului" },
  { id: "sanatate", label: "Alergii și sănătate" },
  { id: "comunicare", label: "Comunicarea cu părinții" },
  { id: "intrebari", label: "Întrebări" },
];

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Siguranță și părinți"
        title="Regulile care ne lasă să ne jucăm liniștiți"
        intro="Copiii văd misiuni, joacă și prieteni. Tu trebuie să știi și ce e în spate: cine îi supraveghează, cine îi poate lua acasă și ce facem dacă ceva nu e în regulă."
        character="ola"
      >
        <nav aria-label="Pe această pagină" className="season-nav">
          {toc.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="chip-link">
              {t.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="section" aria-labelledby="reguli">
        <div className="wrap">
          <div className="section-head">
            <h2 id="reguli" className="icon-title">
              <ShieldIcon /> Regulile de siguranță
            </h2>
            <p className="lead">Le aplicăm în fiecare zi, fără excepții, și le explicăm și copiilor, pe limba lor.</p>
          </div>
          <ul className="grid grid--3 rule-list">
            {safetyRules.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 3) * 80} className="card">
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="preluare">
        <div className="wrap">
          <div className="section-head">
            <h2 id="preluare" className="icon-title">
              <IdCardIcon /> Procedura de preluare
            </h2>
            <p className="lead">Copilul pleacă doar cu persoanele pe care le-ai autorizat tu. Iată cum funcționează.</p>
          </div>
          <ol className="steps">
            {pickupSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="steps__item">
                <span className="steps__n" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="note">
            Persoanele autorizate le poți trece direct în <Link href="/inscriere/">formularul de înscriere</Link>.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="sanatate">
        <div className="wrap">
          <div className="section-head">
            <h2 id="sanatate" className="icon-title">
              <FirstAidIcon /> Alergii și informații medicale
            </h2>
            <p className="lead">Cerem doar informațiile de care avem nevoie ca să avem grijă de copil și le păstrăm cu atenție.</p>
          </div>
          <div className="grid grid--2">
            {medicalHandling.map((m) => (
              <Reveal key={m.title} className="card">
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </Reveal>
            ))}
          </div>
          <p className="facts__sub disclaimer">
            Regulile de mai sus descriu cum lucrăm în mod obișnuit. Pentru situații medicale speciale stabilim împreună, în scris,
            un plan potrivit copilului. Despre datele personale: vezi{" "}
            <Link href="/confidentialitate/">Politica de confidențialitate</Link>.
          </p>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="comunicare">
        <div className="wrap">
          <div className="section-head">
            <h2 id="comunicare" className="icon-title">
              <ChatIcon /> Comunicarea cu părinții
            </h2>
          </div>
          <dl className="grid grid--4 comm">
            {communication.map((c) => (
              <div key={c.title} className="card">
                <dt>{c.title}</dt>
                <dd>{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="intrebari">
        <div className="wrap narrow">
          <h2 id="intrebari">Întrebări despre siguranță</h2>
          <Faq items={faq.filter((f) => f.category === "siguranta")} />
          <p>
            <Link href="/intrebari-frecvente/" className="link-arrow">
              Toate întrebările frecvente
            </Link>
          </p>
        </div>
      </section>

      <CtaBand title="Ai o întrebare care nu e aici?" text="Sună-ne sau vino în vizită. Îți arătăm Clubul și îți răspundem la tot." />
    </>
  );
}
