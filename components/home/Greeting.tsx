"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const WORDS = [
  { text: "Bună!", lang: "ro" },
  { text: "Hello!", lang: "en" },
  { text: "¡Hola!", lang: "es" },
  { text: "Hallo!", lang: "de" },
  { text: "Ciao!", lang: "it" },
  { text: "Salut!", lang: "fr" },
];

/**
 * Salutul care se schimbă în mai multe limbi. Toate cuvintele stau suprapuse
 * (aceeași celulă de grilă), deci lățimea e mereu a celui mai lung: fără salt de layout.
 * Cititoarele de ecran aud doar „Bună!”.
 */
export function Greeting() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const items = ref.current?.querySelectorAll<HTMLElement>("[data-word]");
    if (!items?.length) return;
    let i = 0;
    const id = window.setInterval(() => {
      items[i].classList.remove("is-on");
      i = (i + 1) % items.length;
      items[i].classList.add("is-on");
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="greeting">
      <span className="visually-hidden">Bună!</span>
      <span ref={ref} className="greeting__words" aria-hidden="true">
        {WORDS.map((w, i) => (
          <span key={w.lang} lang={w.lang} data-word="" className={i === 0 ? "is-on" : undefined}>
            {w.text}
          </span>
        ))}
      </span>
    </span>
  );
}
