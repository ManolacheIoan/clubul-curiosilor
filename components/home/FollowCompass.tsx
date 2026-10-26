"use client";

import { useEffect, useRef } from "react";
import { Compass } from "@/components/illustrations/Motifs";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Busola al cărei ac urmărește cursorul (pe calculator) sau derularea (pe telefon).
 * Unghiul se scrie direct într-o variabilă CSS, fără re-randări React.
 */
export function FollowCompass({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    let angle = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--needle", `${angle}deg`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // 0° = nord; atan2 măsoară de la est, deci adăugăm 90°.
      angle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90;
      schedule();
    };
    const onScroll = () => {
      if (matchMedia("(hover: hover)").matches) return;
      angle = (window.scrollY * 0.4) % 360;
      schedule();
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={`follow-compass ${className ?? ""}`}>
      <Compass />
    </div>
  );
}
