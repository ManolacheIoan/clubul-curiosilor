/** true dacă utilizatorul a cerut mișcare redusă (sau nu suntem în browser). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
