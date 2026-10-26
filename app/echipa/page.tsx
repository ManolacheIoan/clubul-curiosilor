import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Avatar } from "@/components/illustrations/Avatar";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { programs } from "@/data/programs";
import { staff } from "@/data/staff";

export const metadata: Metadata = {
  title: "Echipa",
  description: "Educatorii, profesorii și instructorii Clubului: roluri, specialități și programele pe care le conduc.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Echipa"
        title="Ghizii exploratorilor"
        intro="Profesori, educatori și instructori care iubesc ce fac și știu să asculte. Îi vei cunoaște pe toți la prima vizită."
        character="tudor"
      />
      <section className="section" aria-label="Membrii echipei">
        <div className="wrap">
          <ul className="team grid grid--3">
            {staff.map((m, i) => {
              const led = programs.filter((p) => p.instructor === m.slug);
              return (
                <Reveal as="li" key={m.slug} delay={(i % 3) * 80} className="member">
                  <div id={m.slug} className="anchor" />
                  <Avatar avatar={m.avatar} className="member__avatar wiggle-target" />
                  <h2 className="member__name">{m.name}</h2>
                  <p className="member__role">{m.role}</p>
                  <p className="member__bio">{m.bio}</p>
                  <h3 className="visually-hidden">Specialități</h3>
                  <ul className="member__tags">
                    {m.specialties.map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {led.length ? (
                    <p className="member__programs">
                      Conduce:{" "}
                      {led.map((p, j) => (
                        <span key={p.slug}>
                          {j ? ", " : ""}
                          <Link href={`/programe/${p.slug}/`}>{p.name}</Link>
                        </span>
                      ))}
                    </p>
                  ) : null}
                  <p className="member__fun">
                    <span>Știai că?</span> {m.funFact}
                  </p>
                  <p className="member__years">{m.years} ani de lucru cu copiii</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
      <CtaBand title="Vino să ne cunoști" text="Programează o vizită: îți prezentăm echipa și spațiile, iar copilul poate încerca o activitate." />
    </>
  );
}
