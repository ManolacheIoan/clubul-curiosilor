import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProgramExplorer } from "@/components/programs/ProgramExplorer";

export const metadata: Metadata = {
  title: "Programe: after-school, limbi străine, cursuri și ateliere",
  description: "After-school, cursuri de engleză, germană, franceză și spaniolă, robotică, științe, arte, teatru, muzică, șah, sport și gătit pentru copii de 4–14 ani.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programe"
        title="Alege-ți misiunea"
        intro="After-school, limbi străine, cursuri și ateliere pentru copii de 4–14 ani. Filtrează după vârstă și domeniu sau caută direct ce te interesează."
        character="bip"
      />
      <div className="wrap">
        <ProgramExplorer />
      </div>
      <CtaBand title="Nu știi ce să alegi?" text="Prima întâlnire la orice curs e gratuită. Sună-ne și îți recomandăm ce i s-ar potrivi copilului." />
    </>
  );
}
