"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Număr care „crește” când intră în ecran. HTML-ul conține deja valoarea finală
 * (și fără JavaScript), iar cifrele au lățime fixă, deci nu apare salt de layout.
 */
export function Counter({ value, suffix = "", duration = 1400 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${Math.round(value * eased)}${suffix}`;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = `0${suffix}`;
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix, duration]);

  return (
    <span className="counter">
      <span className="visually-hidden">
        {value}
        {suffix}
      </span>
      <span ref={ref} aria-hidden="true" style={{ minWidth: `${String(value).length + suffix.length}ch` }}>
        {value}
        {suffix}
      </span>
    </span>
  );
}
