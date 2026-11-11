"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRightIcon, CalendarIcon, ClockIcon } from "@/components/icons";
import { EVENT_KINDS, type ClubEvent } from "@/data/events";
import { todayIso } from "@/lib/dates";

/** Un eveniment cu textele deja pregătite pe server (data scrisă, fișierul .ics). */
export type EventItem = ClubEvent & {
  month: string;
  dateText: string;
  badge: { day: string; month: string };
  ics: string;
};

const noSubscribe = () => () => {};

/**
 * Lista evenimentelor viitoare. Pe server (la build) „azi” e data build-ului; în browser e data reală,
 * așa că evenimentele trecute dispar și dacă site-ul n-a mai fost reconstruit de mult.
 */
export function EventList({
  items,
  buildDay,
  limit,
  grouped = false,
}: {
  items: EventItem[];
  buildDay: string;
  limit?: number;
  grouped?: boolean;
}) {
  const today = useSyncExternalStore(noSubscribe, () => todayIso(), () => buildDay);
  const upcoming = items.filter((e) => (e.end ?? e.date) >= today).slice(0, limit);

  if (!upcoming.length) {
    return <p className="note">Momentan nu avem evenimente anunțate. Revino curând sau sună-ne pentru o vizită.</p>;
  }

  if (!grouped) {
    return (
      <ol className="events">
        {upcoming.map((e) => (
          <EventRow key={e.id} e={e} headingLevel={3} />
        ))}
      </ol>
    );
  }

  const months = [...new Set(upcoming.map((e) => e.month))];
  return (
    <div className="events-by-month">
      {months.map((m) => (
        <section key={m} aria-labelledby={`luna-${m.replace(" ", "-")}`}>
          <h2 id={`luna-${m.replace(" ", "-")}`} className="events__month">
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </h2>
          <ol className="events">
            {upcoming
              .filter((e) => e.month === m)
              .map((e) => (
                <EventRow key={e.id} e={e} headingLevel={3} />
              ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function EventRow({ e, headingLevel }: { e: EventItem; headingLevel: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  const kind = EVENT_KINDS[e.kind];
  return (
    <li className="event card" id={e.id}>
      <div className="event__badge" aria-hidden="true">
        <span className="event__day">{e.badge.day}</span>
        <span className="event__mon">{e.badge.month}</span>
      </div>
      <div className="event__body">
        <p className="event__tags">
          <span className={kind.tag}>{kind.label}</span>
          {e.audience ? <span className="tag tag--sky">{e.audience}</span> : null}
        </p>
        <H className="event__title">{e.title}</H>
        <p className="event__when">
          <span>
            <CalendarIcon /> <time dateTime={e.date}>{e.dateText}</time>
          </span>
          {e.from && e.to ? (
            <span>
              <ClockIcon /> {e.from} – {e.to}
            </span>
          ) : null}
        </p>
        <p className="event__text">{e.text}</p>
        <p className="event__actions">
          {e.link ? (
            <Link href={e.link.href} className="link-arrow">
              {e.link.label} <ArrowRightIcon />
            </Link>
          ) : null}
          <a href={e.ics} download={`${e.id}.ics`} className="event__ics">
            Adaugă în calendar<span className="visually-hidden">: {e.title}</span>
          </a>
        </p>
      </div>
    </li>
  );
}
