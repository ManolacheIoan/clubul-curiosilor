import type { CharacterId } from "@/data/programs";

/**
 * Personajele Clubului, desenate în același stil: forme plate și rotunjite,
 * fără contur, cu umbre dintr-o nuanță mai închisă. viewBox comun 0 0 160 180,
 * cu „tălpile” la baza desenului, ca să poată sări toate la fel.
 */

type Props = { className?: string; title?: string };

function Svg({ className, title, children }: Props & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 160 180"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Ola, bufnița: înțeleaptă, iubește cărțile și limbile străine. */
export function Owl(props: Props) {
  return (
    <Svg {...props}>
      <ellipse cx="80" cy="174" rx="44" ry="6" fill="#1E2B26" opacity=".12" />
      {/* urechi */}
      <path d="M38 52 30 22l28 18Z" fill="#164F3D" />
      <path d="M122 52l8-30-28 18Z" fill="#164F3D" />
      {/* corp */}
      <path d="M80 30c34 0 54 26 54 66 0 44-22 74-54 74s-54-30-54-74c0-40 20-66 54-66Z" fill="#1F6B52" />
      <path d="M80 92c20 0 32 16 32 38 0 22-14 34-32 34s-32-12-32-34c0-22 12-38 32-38Z" fill="#E6F0EA" />
      <path d="M68 116q6 5 12 0m0 14q6 5 12 0m-24 12q6 5 12 0" stroke="#5FA383" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* aripi */}
      <path d="M28 96c-10 18-8 40 6 52 4-16 6-34 2-52Z" fill="#164F3D" />
      <path d="M132 96c10 18 8 40-6 52-4-16-6-34-2-52Z" fill="#164F3D" />
      {/* ochi */}
      <circle cx="60" cy="72" r="20" fill="#FFC83D" />
      <circle cx="100" cy="72" r="20" fill="#FFC83D" />
      <circle cx="60" cy="72" r="14" fill="#fff" />
      <circle cx="100" cy="72" r="14" fill="#fff" />
      <circle className="char-pupil" cx="62" cy="73" r="7" fill="#1E2B26" />
      <circle className="char-pupil" cx="102" cy="73" r="7" fill="#1E2B26" />
      <circle cx="64.5" cy="70" r="2.4" fill="#fff" />
      <circle cx="104.5" cy="70" r="2.4" fill="#fff" />
      {/* cioc și obraji */}
      <path d="M74 88h12l-6 10Z" fill="#F2644F" />
      <circle cx="42" cy="92" r="5" fill="#F2644F" opacity=".45" />
      <circle cx="118" cy="92" r="5" fill="#F2644F" opacity=".45" />
      {/* frunzuliță pe cap */}
      <path d="M80 30c-4-10 2-18 12-20-1 10-5 16-12 20Z" fill="#5FA383" />
      {/* picioare */}
      <path d="M62 166h14l-3 6h-9Zm22 0h14l-2 6h-9Z" fill="#F2644F" />
    </Svg>
  );
}

/** Ruxi, vulpea: artistă, jucăușă, plină de idei. */
export function Fox(props: Props) {
  return (
    <Svg {...props}>
      <ellipse cx="80" cy="174" rx="46" ry="6" fill="#1E2B26" opacity=".12" />
      {/* coadă */}
      <path className="char-tail" d="M112 150c30 4 44-20 38-46-4 18-16 26-30 24Z" fill="#F2644F" />
      <path d="M148 110c2 10-2 20-10 26-4-8-2-18 10-26Z" fill="#FFF4D1" />
      {/* corp */}
      <path d="M80 92c26 0 40 24 40 50 0 18-12 30-40 30s-40-12-40-30c0-26 14-50 40-50Z" fill="#F2644F" />
      <path d="M80 112c14 0 22 14 22 30 0 14-8 22-22 22s-22-8-22-22c0-16 8-30 22-30Z" fill="#FFF4D1" />
      {/* labe */}
      <ellipse cx="62" cy="168" rx="12" ry="7" fill="#B83C28" />
      <ellipse cx="98" cy="168" rx="12" ry="7" fill="#B83C28" />
      {/* cap */}
      <path d="M36 30l20 22-16 8Z" fill="#B83C28" />
      <path d="M124 30l-20 22 16 8Z" fill="#B83C28" />
      <path d="M41 38l9 12-6 3Z" fill="#FFF4D1" />
      <path d="M119 38l-9 12 6 3Z" fill="#FFF4D1" />
      <path d="M80 42c28 0 46 18 46 40 0 18-22 30-46 30S34 100 34 82c0-22 18-40 46-40Z" fill="#F2644F" />
      <path d="M80 72c14 0 34 6 40 14-6 14-22 24-40 24S46 100 40 86c6-8 26-14 40-14Z" fill="#FFF4D1" />
      {/* ochi */}
      <ellipse className="char-pupil" cx="62" cy="74" rx="6" ry="7" fill="#1E2B26" />
      <ellipse className="char-pupil" cx="98" cy="74" rx="6" ry="7" fill="#1E2B26" />
      <circle cx="64" cy="71.5" r="2" fill="#fff" />
      <circle cx="100" cy="71.5" r="2" fill="#fff" />
      {/* nas și zâmbet */}
      <ellipse cx="80" cy="88" rx="6" ry="4.5" fill="#1E2B26" />
      <path d="M72 96q8 7 16 0" stroke="#1E2B26" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="90" r="5" fill="#F2644F" opacity=".6" />
      <circle cx="110" cy="90" r="5" fill="#F2644F" opacity=".6" />
      {/* bască de artist */}
      <path d="M52 46c6-16 52-18 60-2-16-4-40-4-60 2Z" fill="#4DA3D9" />
      <circle cx="84" cy="34" r="4" fill="#1B5E8C" />
    </Svg>
  );
}

/** Bip, robotul: inventator, programează orice. */
export function Robot(props: Props) {
  return (
    <Svg {...props}>
      <ellipse cx="80" cy="174" rx="44" ry="6" fill="#1E2B26" opacity=".12" />
      {/* antenă */}
      <rect x="77" y="14" width="6" height="22" rx="3" fill="#1B5E8C" />
      <circle className="char-bulb" cx="80" cy="14" r="8" fill="#F2644F" />
      {/* cap */}
      <rect x="34" y="34" width="92" height="70" rx="26" fill="#4DA3D9" />
      <rect x="26" y="58" width="12" height="24" rx="6" fill="#1B5E8C" />
      <rect x="122" y="58" width="12" height="24" rx="6" fill="#1B5E8C" />
      <rect x="46" y="46" width="68" height="46" rx="18" fill="#1E2B26" />
      {/* ochi-ecran */}
      <rect className="char-eye" x="58" y="60" width="14" height="16" rx="7" fill="#FFC83D" />
      <rect className="char-eye" x="88" y="60" width="14" height="16" rx="7" fill="#FFC83D" />
      <path d="M70 82q10 6 20 0" stroke="#5FA383" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* corp */}
      <rect x="44" y="108" width="72" height="50" rx="20" fill="#4DA3D9" />
      <rect x="58" y="118" width="44" height="26" rx="10" fill="#DDEEF8" />
      <circle cx="70" cy="131" r="5" fill="#F2644F" />
      <circle cx="90" cy="131" r="5" fill="#FFC83D" />
      {/* brațe */}
      <path d="M44 118c-14 4-18 16-16 26" stroke="#1B5E8C" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path className="char-wave" d="M116 118c14-2 20-14 20-26" stroke="#1B5E8C" strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="28" cy="146" r="7" fill="#1F6B52" />
      <circle className="char-wave" cx="136" cy="90" r="7" fill="#1F6B52" />
      {/* roți */}
      <rect x="50" y="156" width="24" height="16" rx="8" fill="#1E2B26" />
      <rect x="86" y="156" width="24" height="16" rx="8" fill="#1E2B26" />
      <circle cx="62" cy="164" r="3" fill="#DDEEF8" />
      <circle cx="98" cy="164" r="3" fill="#DDEEF8" />
    </Svg>
  );
}

/** Tudor, micul explorator: rucsac, pălărie și o lupă mereu la îndemână. */
export function Explorer(props: Props) {
  return (
    <Svg {...props}>
      <ellipse cx="80" cy="174" rx="44" ry="6" fill="#1E2B26" opacity=".12" />
      {/* rucsac */}
      <rect x="36" y="94" width="34" height="50" rx="12" fill="#F2644F" />
      <rect x="40" y="118" width="22" height="14" rx="5" fill="#B83C28" />
      {/* picioare */}
      <rect x="62" y="146" width="14" height="22" rx="6" fill="#1B5E8C" />
      <rect x="84" y="146" width="14" height="22" rx="6" fill="#1B5E8C" />
      <path d="M58 166h20v6H56Zm26 0h20l2 6H84Z" fill="#1E2B26" />
      {/* corp */}
      <path d="M58 104c0-8 8-14 22-14s22 6 22 14v46H58Z" fill="#1F6B52" />
      <path d="M66 92l8 24m20-24-8 24" stroke="#B83C28" strokeWidth="5" strokeLinecap="round" />
      <circle cx="80" cy="128" r="4" fill="#FFC83D" />
      {/* braț cu lupă */}
      <path d="M100 108c10 4 16 12 18 22" stroke="#1F6B52" strokeWidth="11" fill="none" strokeLinecap="round" />
      <circle cx="119" cy="132" r="7" fill="#E9B999" />
      <g className="char-lens">
        <rect x="118" y="112" width="6" height="22" rx="3" transform="rotate(30 121 123)" fill="#1E2B26" />
        <circle cx="128" cy="104" r="14" fill="#DDEEF8" stroke="#FFC83D" strokeWidth="5" />
        <path d="M121 98a9 9 0 0 1 8-3" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <path d="M60 108c-8 6-10 16-8 26" stroke="#1F6B52" strokeWidth="11" fill="none" strokeLinecap="round" />
      <circle cx="52" cy="136" r="7" fill="#E9B999" />
      {/* cap */}
      <circle cx="80" cy="62" r="30" fill="#E9B999" />
      <path d="M52 56c2-14 14-22 28-22s26 8 28 22c-8-6-18-8-28-8s-20 2-28 8Z" fill="#5B3A29" />
      <circle className="char-pupil" cx="70" cy="66" r="4.5" fill="#1E2B26" />
      <circle className="char-pupil" cx="92" cy="66" r="4.5" fill="#1E2B26" />
      <path d="M72 78q8 6 16 0" stroke="#1E2B26" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="62" cy="76" r="5" fill="#F2644F" opacity=".45" />
      <circle cx="100" cy="76" r="5" fill="#F2644F" opacity=".45" />
      {/* pălărie de explorator */}
      <ellipse cx="80" cy="42" rx="44" ry="9" fill="#E0A82E" />
      <path d="M56 42c0-18 10-26 24-26s24 8 24 26Z" fill="#FFC83D" />
      <rect x="56" y="34" width="48" height="7" fill="#1F6B52" />
      <path d="M98 34c4-8 12-10 16-8-2 6-8 10-16 8Z" fill="#5FA383" />
    </Svg>
  );
}

const MAP: Record<CharacterId, (p: Props) => React.ReactElement> = {
  ola: Owl,
  ruxi: Fox,
  bip: Robot,
  tudor: Explorer,
};

export const CHARACTER_NAMES: Record<CharacterId, string> = {
  ola: "Ola, bufnița",
  ruxi: "Ruxi, vulpea",
  bip: "Bip, robotul",
  tudor: "Tudor, micul explorator",
};

export function Character({ id, ...props }: Props & { id: CharacterId }) {
  const C = MAP[id];
  return <C {...props} />;
}
