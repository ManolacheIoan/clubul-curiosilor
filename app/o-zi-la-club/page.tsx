import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { TreasureMap } from "@/components/day/TreasureMap";
import { ArrowRightIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { typicalDay } from "@/data/day";

export const metadata: Metadata = {
  title: "O zi la Club",
  description: "Cum arată o zi obișnuită de after-school: sosire, prânz, teme, gustare, misiunea zilei, joacă și plecarea cu persoanele autorizate.",
};

export default function DayPage() {
  return (
    <>
      <PageHero
        eyebrow="O zi la Club"
        title="Harta unei zile de explorator"
        intro="De la 12:00 la 18:00, fiecare oprire are rostul ei. Derulează și urmează traseul până la comoara zilei."
        character="ruxi"
      />
      <section className="section tmap-section" aria-label="Traseul zilei">
        <div className="wrap">
          <TreasureMap stops={typicalDay} />
          <p className="tmap__end">
            Zilele de tabără arată puțin altfel: <Link href="/tabere/#programul-zilei" className="link-arrow">vezi programul taberelor <ArrowRightIcon /></Link>
          </p>
          <p className="tmap__end">
            Curioși unde se întâmplă toate astea? <Link href="/spatiul-nostru/" className="link-arrow">Vezi spațiul nostru <ArrowRightIcon /></Link>
          </p>
        </div>
      </section>
      <CtaBand title="Vrei să vedeți Clubul împreună?" text="Programează o vizită cu copilul: îi arătăm sala de teme, laboratorul și curtea." />
    </>
  );
}
