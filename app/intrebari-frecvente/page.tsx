import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { FAQ_CATEGORIES, faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description: "Răspunsuri despre înscriere, program, siguranță, tabere și plată.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Întrebări frecvente"
        title="Întrebări de părinte curios"
        intro="Am adunat aici ce ne întreabă cel mai des părinții. Dacă nu găsești răspunsul, sună-ne."
        character="ola"
      >
        <nav aria-label="Teme" className="season-nav">
          {FAQ_CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="chip-link">
              {c.label}
            </a>
          ))}
        </nav>
      </PageHero>
      <div className="wrap narrow">
        {FAQ_CATEGORIES.map((c) => (
          <section key={c.id} className="faq-group" aria-labelledby={c.id}>
            <h2 id={c.id}>{c.label}</h2>
            <Faq items={faq.filter((f) => f.category === c.id)} />
          </section>
        ))}
      </div>
      <CtaBand title="Ai altă întrebare?" text="Sună-ne în timpul programului sau scrie-ne. Răspundem în cel mult o zi lucrătoare." />
    </>
  );
}
