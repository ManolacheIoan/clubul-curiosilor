import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRightIcon } from "@/components/icons";
import { RoomArt } from "@/components/illustrations/RoomArt";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { BUSINESS_NAME } from "@/config/site";
import { rooms } from "@/data/spaces";

export const metadata: Metadata = {
  title: "Spațiul nostru",
  description: `Sala de teme, laboratorul, atelierul de arte, sala de mișcare, bucătăria, curtea și colțul liniștit de la ${BUSINESS_NAME}.`,
};

export default function SpacesPage() {
  return (
    <>
      <PageHero
        eyebrow="Spațiul nostru"
        title="Un loc gândit pe măsura copiilor"
        intro="Șapte încăperi, fiecare cu rostul ei, și o curte închisă. Cel mai bine le vedeți la o vizită, dar până atunci, uite cum arată."
        character="tudor"
      />
      <section className="section" aria-label="Încăperile">
        <div className="wrap">
          <ul className="rooms">
            {rooms.map((r, i) => (
              <Reveal as="li" key={r.id} className="room card" delay={(i % 2) * 100}>
                <RoomArt id={r.id} className="room__art" />
                <div className="room__body">
                  <p className="program-card__mission">{r.use}</p>
                  <h2 className="room__title" id={r.id}>
                    {r.name}
                  </h2>
                  <p>{r.text}</p>
                  <ul className="checklist">
                    {r.facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="rooms__more">
            Cum avem grijă de copii în toate aceste spații:{" "}
            <Link href="/siguranta/" className="link-arrow">
              Siguranță și părinți <ArrowRightIcon />
            </Link>
          </p>
        </div>
      </section>
      <CtaBand title="Vreți să vedeți Clubul pe viu?" text="Programează o vizită cu copilul: îi arătăm toate încăperile și îl lăsăm să încerce o mini-misiune." />
    </>
  );
}
