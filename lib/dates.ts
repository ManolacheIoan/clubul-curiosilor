const MONTHS = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];

const parts = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
};

/** „21–25 iunie 2027”, „28 iunie – 2 iulie 2027”, „28 decembrie 2026 – 1 ianuarie 2027”. */
export function formatPeriod(startIso: string, endIso: string): string {
  const a = parts(startIso);
  const b = parts(endIso);
  if (a.y !== b.y) return `${a.d} ${MONTHS[a.m - 1]} ${a.y} – ${b.d} ${MONTHS[b.m - 1]} ${b.y}`;
  if (a.m !== b.m) return `${a.d} ${MONTHS[a.m - 1]} – ${b.d} ${MONTHS[b.m - 1]} ${b.y}`;
  return `${a.d}–${b.d} ${MONTHS[a.m - 1]} ${a.y}`;
}
