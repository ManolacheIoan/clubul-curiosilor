import { BUSINESS_NAME } from "@/config/site";

/** Semnul Clubului: o lupă cu o roză a vânturilor în lentilă și o frunză pe mâner. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M41 43c4 2 9 7 13 12" stroke="#1F6B52" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M52 50c5-4 10-3 12 0-3 4-8 5-12 0Z" fill="#5FA383" />
      <circle cx="27" cy="27" r="22" fill="#FFC83D" />
      <circle cx="27" cy="27" r="16" fill="#FBF7EC" />
      <path d="M27 13l4 14-4 14-4-14Z" fill="#F2644F" />
      <path d="M27 27l4 0-4 14Z" fill="#B83C28" />
      <path d="M13 27l14-3 14 3-14 3Z" fill="#1F6B52" opacity=".85" />
      <circle cx="27" cy="27" r="3" fill="#1E2B26" />
    </svg>
  );
}

/** Logo complet: semnul + numele (din config/site.ts). */
export function Logo({ className }: { className?: string }) {
  // Ultimul cuvânt mare, restul deasupra, mai mic: „Clubul / Curioșilor”.
  const words = BUSINESS_NAME.trim().split(/\s+/);
  const big = words.pop();
  const small = words.join(" ");
  return (
    <span className={`logo ${className ?? ""}`}>
      <LogoMark className="logo__mark" />
      <span className="logo__text">
        {small ? <span className="logo__small">{small} </span> : null}
        <span className="logo__big">{big}</span>
      </span>
    </span>
  );
}
