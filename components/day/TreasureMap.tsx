"use client";

import { useEffect, useRef, useState } from "react";
import { Character } from "@/components/illustrations/Characters";
import { Explorer } from "@/components/illustrations/Characters";
import { AppleIcon, BallIcon, BookIcon, FlagIcon, MoonIcon, PencilIcon, PlateIcon, SearchIcon } from "@/components/icons";
import type { DayStop } from "@/data/day";
import { prefersReducedMotion } from "@/lib/motion";

const ICONS: Record<DayStop["icon"], (p: { className?: string }) => React.ReactElement> = {
  steag: FlagIcon,
  farfurie: PlateIcon,
  carte: BookIcon,
  creion: PencilIcon,
  mar: AppleIcon,
  lupa: SearchIcon,
  minge: BallIcon,
  luna: MoonIcon,
};

/**
 * Traseul: x în procente din lățime, y în „unități de oprire” (o oprire = 100), apoi
 * scalat la pixelii reali ai hărții, ca lungimea desenată și poziția exploratorului să coincidă.
 */
function trail(n: number, xs: (i: number) => number, w: number, h: number) {
  const sx = w / 100;
  const sy = h / (n * 100);
  return trailUnits(n, xs).replace(/(-?[\d.]+) (-?[\d.]+)/g, (_, x, y) => `${(+x * sx).toFixed(1)} ${(+y * sy).toFixed(1)}`);
}

function trailUnits(n: number, xs: (i: number) => number) {
  let d = `M50 0 C50 25 ${xs(0)} 25 ${xs(0)} 50`;
  for (let i = 0; i < n - 1; i++) {
    const y = i * 100 + 50;
    d += ` C${xs(i)} ${y + 50} ${xs(i + 1)} ${y + 50} ${xs(i + 1)} ${y + 100}`;
  }
  const last = (n - 1) * 100 + 50;
  return d + ` C${xs(n - 1)} ${last + 30} 50 ${last + 20} 50 ${n * 100}`;
}

/**
 * Harta comorii: un traseu punctat care se desenează pe măsură ce derulezi, cu micul
 * explorator mergând pe el. Fără JavaScript sau cu mișcare redusă, traseul e complet.
 */
export function TreasureMap({ stops }: { stops: DayStop[] }) {
  const root = useRef<HTMLOListElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const n = stops.length;
  // Dimensiunea hărții în pixeli (valoare de pornire până la prima măsurare).
  const [size, setSize] = useState({ w: 1000, h: n * 280 });
  // Pe ecran lat traseul șerpuiește prin culoarul dintre carduri; pe telefon merge pe margine.
  const wide = trail(n, (i) => (i % 2 ? 51.5 : 48.5), size.w, size.h);
  const narrow = trail(n, () => 5, size.w, size.h)
    .replace(/^M[\d.]+ 0 C[\d.]+ /, `M${(size.w * 0.05).toFixed(1)} 0 C${(size.w * 0.05).toFixed(1)} `)
    .replace(/[\d.]+ ([\d.]+)$/, `${(size.w * 0.05).toFixed(1)} $1`);

  useEffect(() => {
    const el = box.current;
    if (!el || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width && height) setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-stop]"));
    const marker = el.parentElement?.querySelector<HTMLElement>(".tmap__marker");
    if (prefersReducedMotion()) {
      el.parentElement?.style.setProperty("--p", "1");
      items.forEach((s) => s.classList.add("is-reached"));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      el.parentElement?.style.setProperty("--p", p.toFixed(4));
      items.forEach((s, i) => s.classList.toggle("is-reached", p >= (i + 0.35) / n));
      // Explorator pe traseul vizibil (cel lat sau cel îngust, după lățimea ecranului).
      // Traseul vizibil: cel al cărui <svg> are lățime (pe telefon linia e verticală, deci nu măsurăm calea).
      const path = Array.from(el.parentElement!.querySelectorAll<SVGPathElement>(".tmap__ghost")).find(
        (x) => (x.ownerSVGElement?.getBoundingClientRect().width ?? 0) > 0,
      );
      if (marker && path) {
        const len = path.getTotalLength();
        const pt = path.getPointAtLength(len * p);
        marker.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
        marker.style.opacity = p > 0 && p < 1 ? "1" : "0";
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [n, size]);

  return (
    <div className="tmap">
      <div ref={box} className="tmap__box" aria-hidden="true" />
      {[
        { d: wide, cls: "tmap__svg--wide" },
        { d: narrow, cls: "tmap__svg--narrow" },
      ].map(({ d, cls }) => (
        <svg
          key={cls}
          className={`tmap__svg ${cls}`}
          viewBox={`0 0 ${size.w} ${size.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {/* Masca (linie continuă) dezvăluie treptat traseul punctat colorat. */}
          <mask id={`traseu-${cls}`} maskUnits="userSpaceOnUse">
            <path d={d} className="tmap__reveal" pathLength={1} />
          </mask>
          <path d={d} className="tmap__ghost" />
          <path d={d} className="tmap__ink" mask={`url(#traseu-${cls})`} />
        </svg>
      ))}
      <div className="tmap__marker" aria-hidden="true">
        <Explorer />
      </div>

      <ol ref={root} className="tmap__stops">
        {stops.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <li key={s.time} data-stop="" className={`tmap__stop ${i % 2 ? "tmap__stop--right" : ""}`}>
              <div className="tmap__card">
                <div className="tmap__head">
                  <span className="tmap__icon">
                    <Icon />
                  </span>
                  <p className="tmap__time">
                    <span className="visually-hidden">Ora </span>
                    {s.time}
                  </p>
                </div>
                <h2 className="tmap__title">{s.title}</h2>
                <p>{s.text}</p>
                <p className="tmap__parents">
                  <strong>Pentru părinți:</strong> {s.forParents}
                </p>
                <Character id={s.character} className="tmap__char" />
              </div>
            </li>
          );
        })}
      </ol>
      <div className="tmap__treasure" aria-hidden="true">
        <svg viewBox="0 0 120 90">
          <rect x="16" y="34" width="88" height="48" rx="8" fill="#B83C28" />
          <path d="M16 46c0-22 18-34 44-34s44 12 44 34Z" fill="#F2644F" />
          <rect x="16" y="44" width="88" height="8" fill="#FFC83D" />
          <rect x="52" y="40" width="16" height="18" rx="3" fill="#FFC83D" />
          <circle cx="60" cy="49" r="3" fill="#1E2B26" />
          <path d="M30 20l4-10 4 10M86 18l3-8 3 8" stroke="#FFC83D" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  );
}
