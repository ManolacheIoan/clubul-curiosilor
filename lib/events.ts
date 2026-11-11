import { BUSINESS_NAME } from "@/config/site";
import { camps, SEASONS } from "@/data/camps";
import { events, type ClubEvent } from "@/data/events";

const MONTHS = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
const MONTHS_SHORT = ["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec."];
const WEEKDAYS = ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];

const parts = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
};

/** Începutul fiecărui sezon de tabere, ca eveniment (din data/camps.ts). */
export function campEvents(): ClubEvent[] {
  return SEASONS.flatMap((season) => {
    const periods = camps.filter((c) => c.season === season.id).flatMap((c) => c.periods);
    if (!periods.length) return [];
    const start = periods.map((p) => p.start).sort()[0];
    const end = periods.map((p) => p.end).sort().at(-1)!;
    return [
      {
        id: `tabara-${season.id}`,
        kind: "tabara" as const,
        title: season.label,
        date: start,
        end,
        text: season.intro,
        link: { href: "/tabere/", label: "Vezi perioadele și locurile" },
      },
    ];
  });
}

/** Toate evenimentele, în ordinea datei. */
export function allEvents(): ClubEvent[] {
  return [...events, ...campEvents()].sort((a, b) => a.date.localeCompare(b.date) || (a.from ?? "").localeCompare(b.from ?? ""));
}

/** Evenimentele care nu s-au încheiat până la `todayIso` (inclusiv cele de azi și cele în desfășurare). */
export function upcomingEvents(list: ClubEvent[], todayIso: string): ClubEvent[] {
  return list.filter((e) => (e.end ?? e.date) >= todayIso);
}

/** „noiembrie 2026”: cheia după care se grupează evenimentele. */
export function monthLabel(iso: string): string {
  const { y, m } = parts(iso);
  return `${MONTHS[m - 1]} ${y}`;
}

/** Ziua și luna scurtă, pentru insigna din stânga: { day: "21", month: "nov." }. */
export function dateBadge(iso: string) {
  const { m, d } = parts(iso);
  return { day: String(d), month: MONTHS_SHORT[m - 1] };
}

/** „sâmbătă, 21 noiembrie 2026” sau, pentru mai multe zile, „21 decembrie 2026 – 6 ianuarie 2027”. */
export function formatEventDate(e: Pick<ClubEvent, "date" | "end">): string {
  const day = (iso: string) => {
    const { y, m, d } = parts(iso);
    return `${d} ${MONTHS[m - 1]} ${y}`;
  };
  if (e.end && e.end !== e.date) return `${day(e.date)} – ${day(e.end)}`;
  const { y, m, d } = parts(e.date);
  return `${WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]}, ${day(e.date)}`;
}

const compact = (iso: string) => iso.replaceAll("-", "");
const nextDay = (iso: string) => {
  const { y, m, d } = parts(iso);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
};
/** Textul din .ics: virgulele, punctele și virgulă și liniile noi se scriu „escapat”. */
const icsText = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

/** Fișierul .ics al unui eveniment („Adaugă în calendar”), cu ora locală a centrului. */
export function toIcs(e: ClubEvent): string {
  const timed = e.from && e.to;
  const start = timed ? `DTSTART:${compact(e.date)}T${e.from!.replace(":", "")}00` : `DTSTART;VALUE=DATE:${compact(e.date)}`;
  const end = timed
    ? `DTEND:${compact(e.date)}T${e.to!.replace(":", "")}00`
    : `DTEND;VALUE=DATE:${compact(nextDay(e.end ?? e.date))}`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${icsText(BUSINESS_NAME)}//Calendar//RO`,
    "BEGIN:VEVENT",
    `UID:${e.id}-${compact(e.date)}@clubul`,
    `DTSTAMP:${compact(e.date)}T000000Z`,
    start,
    end,
    `SUMMARY:${icsText(`${e.title} – ${BUSINESS_NAME}`)}`,
    `DESCRIPTION:${icsText(e.text)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

/** Linkul „Adaugă în calendar”: fișierul .ics direct în link, fără server. */
export const icsHref = (e: ClubEvent) => `data:text/calendar;charset=utf-8,${encodeURIComponent(toIcs(e))}`;

/** Evenimentele pregătite pentru afișare (vezi components/events/EventList.tsx). */
export function eventItems() {
  return allEvents().map((e) => ({
    ...e,
    month: monthLabel(e.date),
    dateText: formatEventDate(e),
    badge: dateBadge(e.date),
    ics: icsHref(e),
  }));
}
