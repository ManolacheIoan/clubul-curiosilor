import type { CharacterId } from "@/data/programs";
import { Character } from "@/components/illustrations/Characters";
import { Leaf, Star } from "@/components/illustrations/Motifs";

/** Antetul paginilor interioare: titlu, introducere și un personaj care salută. */
export function PageHero({
  eyebrow,
  title,
  intro,
  character,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  character?: CharacterId;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="wrap page-hero__inner">
        <div className="page-hero__text">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1>{title}</h1>
          {intro ? <p className="lead">{intro}</p> : null}
          {children}
        </div>
        {character ? (
          <div className="page-hero__art">
            <Star className="float float--a page-hero__star" />
            <Leaf className="float float--b page-hero__leaf" />
            <Character id={character} className="bounce page-hero__char" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
