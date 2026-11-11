import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { EventList } from "@/components/events/EventList";
import { PageHero } from "@/components/PageHero";
import { BUSINESS_NAME } from "@/config/site";
import { todayIso } from "@/lib/dates";
import { eventItems } from "@/lib/events";

export const metadata: Metadata = {
  title: "Calendar",
  description: `Porți deschise, spectacole, ateliere cu părinții și începutul taberelor la ${BUSINESS_NAME}.`,
};

export default function CalendarPage() {
  return (
    <>
      <PageHero
        eyebrow="Calendar"
        title="Ce urmează la Club"
        intro="Porți deschise, spectacole, ateliere cu părinții și începutul taberelor. Apasă „Adaugă în calendar” ca să nu uiți."
        character="bip"
      />
      <section className="section" aria-label="Evenimente">
        <div className="wrap">
          <EventList items={eventItems()} buildDay={todayIso()} grouped />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
