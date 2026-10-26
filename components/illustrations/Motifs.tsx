/**
 * Motivele de explorare (busolă, lupă, telescop, hartă) și formele decorative.
 * Toate sunt decorative (aria-hidden), în același stil plat și rotunjit.
 */

type Props = { className?: string; style?: React.CSSProperties };

const hidden = { "aria-hidden": true, focusable: "false" } as const;

/** Busolă. Acul e un grup separat (.compass-needle), ca să poată fi rotit din CSS. */
export function Compass({ className, style, needleStyle }: Props & { needleStyle?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} {...hidden}>
      <circle cx="60" cy="62" r="52" fill="#1E2B26" opacity=".1" />
      <circle cx="60" cy="58" r="52" fill="#FFC83D" />
      <circle cx="60" cy="58" r="42" fill="#FBF7EC" />
      <g stroke="#1F6B52" strokeWidth="3" strokeLinecap="round">
        <path d="M60 20v8M60 88v8M22 58h8M90 58h8" />
      </g>
      <g fill="#55635D" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-display)">
        <text x="60" y="40">N</text>
        <text x="60" y="84">S</text>
        <text x="38" y="62">V</text>
        <text x="82" y="62">E</text>
      </g>
      <g className="compass-needle" style={needleStyle}>
        <path d="M60 22 68 58H52Z" fill="#F2644F" />
        <path d="M60 94 52 58h16Z" fill="#1F6B52" />
        <circle cx="60" cy="58" r="6" fill="#1E2B26" />
        <circle cx="60" cy="58" r="2.5" fill="#FFC83D" />
      </g>
    </svg>
  );
}

export function Magnifier({ className, style }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} {...hidden}>
      <rect x="58" y="58" width="14" height="38" rx="7" transform="rotate(-45 65 77)" fill="#1F6B52" />
      <circle cx="42" cy="42" r="30" fill="#DDEEF8" stroke="#F2644F" strokeWidth="9" />
      <path d="M28 34a16 16 0 0 1 14-10" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Telescope({ className, style }: Props) {
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} {...hidden}>
      <path d="M58 58 40 96M62 58l18 38M60 58v38" stroke="#164F3D" strokeWidth="5" strokeLinecap="round" />
      <g transform="rotate(-24 60 50)">
        <rect x="14" y="40" width="80" height="22" rx="11" fill="#4DA3D9" />
        <rect x="86" y="34" width="22" height="34" rx="9" fill="#1B5E8C" />
        <rect x="4" y="44" width="14" height="14" rx="5" fill="#1E2B26" />
        <rect x="44" y="40" width="8" height="22" fill="#FFC83D" />
      </g>
      <circle cx="60" cy="58" r="6" fill="#1E2B26" />
    </svg>
  );
}

/** Hartă îndoită, cu traseu punctat și „X”-ul comorii. */
export function MapScroll({ className, style }: Props) {
  return (
    <svg viewBox="0 0 140 100" className={className} style={style} {...hidden}>
      <path d="M8 16 48 6l44 10 40-10v78l-40 10-44-10-40 10Z" fill="#FFF4D1" />
      <path d="M48 6v78M92 16v78" stroke="#E0A82E" strokeWidth="2" opacity=".6" />
      <path d="M8 16 48 6v78L8 94Z" fill="#FFC83D" opacity=".35" />
      <path d="M22 70c14-20 30 6 46-12s26-24 40-8" stroke="#1F6B52" strokeWidth="3.5" strokeDasharray="2 7" strokeLinecap="round" fill="none" />
      <path d="M104 40l12 12m0-12-12 12" stroke="#F2644F" strokeWidth="5" strokeLinecap="round" />
      <circle cx="22" cy="70" r="5" fill="#4DA3D9" />
    </svg>
  );
}

export function Leaf({ className, style }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} {...hidden}>
      <path d="M6 34C6 16 18 6 36 4c0 18-10 30-30 30Z" fill="#5FA383" />
      <path d="M8 32C16 22 24 14 32 8" stroke="#1F6B52" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Star({ className, style }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} {...hidden}>
      <path
        d="M20 3c2 0 3 9 6 11s11 1 11 4-8 6-9 9 3 10 0 11-8-5-8-5-6 6-9 5 1-8 0-11-9-6-9-9 9-2 11-4 5-11 7-11Z"
        fill="#FFC83D"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Cloud({ className, style }: Props) {
  return (
    <svg viewBox="0 0 120 60" className={className} style={style} {...hidden}>
      <path d="M22 52a18 18 0 0 1 2-36 26 26 0 0 1 48-6 20 20 0 0 1 32 16 14 14 0 0 1-4 26Z" fill="#fff" />
    </svg>
  );
}

/** Formă organică rotunjită, pentru fundaluri. */
export function Blob({ className, style, color = "#E6F0EA" }: Props & { color?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} {...hidden}>
      <path
        d="M44 32c26-26 86-26 114 2s34 70 14 106-62 54-102 42S6 136 8 96s10-38 36-64Z"
        fill={color}
      />
    </svg>
  );
}

/** Linie ondulată folosită ca separator de secțiune. */
export function Squiggle({ className, style }: Props) {
  return (
    <svg viewBox="0 0 120 16" className={className} style={style} {...hidden}>
      <path d="M2 8c10-8 18 8 28 0s18 8 28 0 18 8 28 0 18 8 28 0" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
