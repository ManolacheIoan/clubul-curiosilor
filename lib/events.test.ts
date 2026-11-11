import { describe, expect, it } from "vitest";
import type { ClubEvent } from "@/data/events";
import { todayIso } from "./dates";
import { allEvents, campEvents, formatEventDate, toIcs, upcomingEvents } from "./events";

const ev = (over: Partial<ClubEvent>): ClubEvent => ({ id: "x", kind: "atelier", title: "Atelier", date: "2026-11-21", text: "Text", ...over });

describe("calendar", () => {
  it("evenimentele sunt în ordinea datei și includ începutul taberelor", () => {
    const list = allEvents();
    expect(list.map((e) => e.date)).toEqual([...list.map((e) => e.date)].sort());
    expect(campEvents().find((e) => e.id === "tabara-iarna")).toMatchObject({ date: "2026-12-21", end: "2027-01-06" });
  });

  it("evenimentele trecute dispar, cele în desfășurare rămân", () => {
    const list = [ev({ id: "trecut", date: "2026-11-01" }), ev({ id: "azi" }), ev({ id: "in-curs", date: "2026-11-18", end: "2026-11-25" })];
    expect(upcomingEvents(list, "2026-11-21").map((e) => e.id)).toEqual(["azi", "in-curs"]);
  });

  it("data scrisă: ziua săptămânii sau intervalul", () => {
    expect(formatEventDate({ date: "2026-11-21" })).toBe("sâmbătă, 21 noiembrie 2026");
    expect(formatEventDate({ date: "2026-12-21", end: "2027-01-06" })).toBe("21 decembrie 2026 – 6 ianuarie 2027");
  });

  it("fișierul .ics: cu oră sau pe zile întregi (sfârșitul e ziua de după)", () => {
    const timed = toIcs(ev({ from: "10:00", to: "13:00", text: "Vino, te rugăm; e gratuit" }));
    expect(timed).toContain("DTSTART:20261121T100000\r\n");
    expect(timed).toContain("DTEND:20261121T130000\r\n");
    expect(timed).toContain("DESCRIPTION:Vino\\, te rugăm\\; e gratuit\r\n");
    const allDay = toIcs(ev({ date: "2026-12-30", end: "2026-12-31" }));
    expect(allDay).toContain("DTSTART;VALUE=DATE:20261230");
    expect(allDay).toContain("DTEND;VALUE=DATE:20270101");
  });

  it("data de azi după ceasul local", () => {
    expect(todayIso(new Date(2027, 0, 5, 23, 30))).toBe("2027-01-05");
  });
});
