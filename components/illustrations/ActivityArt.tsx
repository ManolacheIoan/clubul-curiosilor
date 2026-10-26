import type { ArtId } from "@/data/programs";

/**
 * Câte o ilustrație pentru fiecare activitate, pe un fundal rotund colorat.
 * viewBox 0 0 96 96; decorative (numele activității apare mereu lângă ele).
 */

const BG: Record<ArtId, string> = {
  "after-school": "#E6F0EA",
  engleza: "#DDEEF8",
  germana: "#FFF4D1",
  franceza: "#FDE3DE",
  spaniola: "#FFF4D1",
  robotica: "#DDEEF8",
  stiinte: "#E6F0EA",
  arte: "#FDE3DE",
  teatru: "#FFF4D1",
  muzica: "#DDEEF8",
  sah: "#E6F0EA",
  sport: "#FDE3DE",
  gatit: "#FFF4D1",
};

function Bubble({ text, fill, color = "#fff", x = 14, y = 22, w = 68 }: { text: string; fill: string; color?: string; x?: number; y?: number; w?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="38" rx="16" fill={fill} />
      <path d={`M${x + 16} ${y + 36}l-4 14 16-14Z`} fill={fill} />
      <text
        x={x + w / 2}
        y={y + 25.5}
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={color}
        fontFamily="var(--font-display)"
      >
        {text}
      </text>
    </g>
  );
}

function Scene({ art }: { art: ArtId }) {
  switch (art) {
    case "after-school":
      return (
        <g>
          <path d="M18 64c10-6 20-6 30 0v-36c-10-6-20-6-30 0Z" fill="#1F6B52" />
          <path d="M48 64c10-6 20-6 30 0v-36c-10-6-20-6-30 0Z" fill="#5FA383" />
          <path d="M24 36c6-3 12-3 18 0m-18 8c6-3 12-3 18 0m12-8c6-3 12-3 18 0m-18 8c6-3 12-3 18 0" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".7" />
          <g transform="rotate(35 70 58)">
            <rect x="64" y="40" width="10" height="40" rx="3" fill="#FFC83D" />
            <path d="M64 80h10l-5 9Z" fill="#E9B999" />
            <rect x="64" y="40" width="10" height="6" fill="#F2644F" />
          </g>
        </g>
      );
    case "engleza":
      return <Bubble text="Hello!" fill="#1B5E8C" />;
    case "germana":
      return <Bubble text="Hallo!" fill="#1E2B26" color="#FFC83D" />;
    case "franceza":
      return <Bubble text="Salut!" fill="#B83C28" />;
    case "spaniola":
      return <Bubble text="¡Hola!" fill="#B83C28" color="#FFF4D1" />;
    case "robotica":
      return (
        <g>
          <rect x="45" y="12" width="6" height="12" rx="3" fill="#1B5E8C" />
          <circle cx="48" cy="12" r="5" fill="#F2644F" />
          <rect x="24" y="24" width="48" height="36" rx="12" fill="#4DA3D9" />
          <rect x="31" y="31" width="34" height="20" rx="8" fill="#1E2B26" />
          <rect x="37" y="36" width="7" height="9" rx="3.5" fill="#FFC83D" />
          <rect x="52" y="36" width="7" height="9" rx="3.5" fill="#FFC83D" />
          <rect x="32" y="62" width="32" height="18" rx="6" fill="#1B5E8C" />
          <g fill="#1F6B52">
            <circle cx="74" cy="72" r="9" />
            <path d="M74 60v4m0 16v4m-12-12h4m16 0h4m-20-8 3 3m11 11 3 3m0-17-3 3m-11 11-3 3" stroke="#1F6B52" strokeWidth="4" strokeLinecap="round" />
          </g>
          <circle cx="74" cy="72" r="3.5" fill="#E6F0EA" />
        </g>
      );
    case "stiinte":
      return (
        <g>
          <path d="M40 16h16v20l16 30c3 7-1 14-9 14H33c-8 0-12-7-9-14l16-30Z" fill="#fff" />
          <path d="M27 60h42l4 6c3 7-1 14-9 14H32c-8 0-12-7-9-14Z" fill="#5FA383" />
          <rect x="37" y="12" width="22" height="7" rx="3.5" fill="#1F6B52" />
          <circle cx="44" cy="68" r="4" fill="#E6F0EA" />
          <circle cx="56" cy="72" r="3" fill="#E6F0EA" />
          <circle className="art-bubble" cx="62" cy="34" r="4" fill="#4DA3D9" />
          <circle className="art-bubble" cx="70" cy="22" r="3" fill="#FFC83D" />
        </g>
      );
    case "arte":
      return (
        <g>
          <path d="M48 16c20 0 34 14 34 30 0 10-8 12-14 10s-10 2-8 8-2 14-12 14c-18 0-34-14-34-32s16-30 34-30Z" fill="#FFF4D1" />
          <circle cx="34" cy="38" r="6" fill="#F2644F" />
          <circle cx="50" cy="28" r="6" fill="#FFC83D" />
          <circle cx="66" cy="36" r="6" fill="#4DA3D9" />
          <circle cx="32" cy="56" r="6" fill="#1F6B52" />
          <g transform="rotate(-40 60 60)">
            <rect x="56" y="44" width="8" height="36" rx="4" fill="#1E2B26" />
            <path d="M56 44h8l-1-12c0-3-6-3-6 0Z" fill="#B83C28" />
          </g>
        </g>
      );
    case "teatru":
      return (
        <g>
          <path d="M14 26c12-6 26-6 38 0v16c0 14-8 24-19 24S14 56 14 42Z" fill="#F2644F" />
          <circle cx="25" cy="38" r="3.5" fill="#1E2B26" />
          <circle cx="41" cy="38" r="3.5" fill="#1E2B26" />
          <path d="M24 50q9 8 18 0" stroke="#1E2B26" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M44 38c12-6 26-6 38 0v16c0 14-8 24-19 24S44 68 44 54Z" fill="#4DA3D9" />
          <circle cx="55" cy="50" r="3.5" fill="#1E2B26" />
          <circle cx="71" cy="50" r="3.5" fill="#1E2B26" />
          <path d="M55 66q8-7 16 0" stroke="#1E2B26" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case "muzica":
      return (
        <g>
          <rect x="16" y="56" width="64" height="12" rx="4" fill="#1F6B52" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={20 + i * 12} y={48 - i * 0} width="10" height={22 - i * 2} rx="3" fill={["#F2644F", "#FFC83D", "#5FA383", "#4DA3D9", "#B83C28"][i]} />
          ))}
          <path d="M44 18v18" stroke="#1E2B26" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="39" cy="37" rx="7" ry="5" fill="#1E2B26" />
          <path d="M62 14v18l10-4V12Z" fill="#1E2B26" />
          <ellipse className="art-note" cx="58" cy="33" rx="6" ry="4.5" fill="#1E2B26" />
        </g>
      );
    case "sah":
      return (
        <g>
          <path d="M30 78h40l-4-10H34Z" fill="#1E2B26" />
          <path d="M36 68c0-12 4-18 8-24l-10 2c-4-6 0-14 8-20 4-3 6-8 6-10 12 2 22 14 22 30 0 8-2 16-4 22Z" fill="#1F6B52" />
          <circle cx="50" cy="32" r="3" fill="#FFF4D1" />
          <path d="M60 22c4 4 8 12 8 22" stroke="#5FA383" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="70" y="20" width="10" height="10" fill="#1E2B26" opacity=".25" />
          <rect x="16" y="54" width="10" height="10" fill="#1E2B26" opacity=".25" />
        </g>
      );
    case "sport":
      return (
        <g>
          <path d="M60 80h26L76 34Z" fill="#F2644F" />
          <path d="M66 62h14m-12-12h10" stroke="#fff" strokeWidth="5" />
          <circle cx="38" cy="54" r="24" fill="#fff" />
          <path d="M38 40l10 7-4 12H32l-4-12Z" fill="#1E2B26" />
          <path d="M38 30v10m10 7 12-4m-16 16 6 10m-18-10-6 10m-4-22-12-4" stroke="#1E2B26" strokeWidth="2.5" />
        </g>
      );
    case "gatit":
      return (
        <g>
          <path d="M30 44c-10 0-14-12-6-18 2-10 14-12 20-6 6-8 20-6 22 4 10 0 14 14 4 20Z" fill="#fff" />
          <rect x="32" y="42" width="34" height="16" rx="3" fill="#fff" />
          <path d="M36 50h26" stroke="#E6F0EA" strokeWidth="3" />
          <path d="M22 66h54c-2 10-12 16-27 16S24 76 22 66Z" fill="#1F6B52" />
          <path d="M70 62c6-8 10-14 14-16" stroke="#B83C28" strokeWidth="5" strokeLinecap="round" />
          <circle cx="40" cy="70" r="3" fill="#FFC83D" />
          <circle cx="54" cy="72" r="3" fill="#F2644F" />
        </g>
      );
  }
}

export function ActivityArt({ art, className }: { art: ArtId; className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      <circle cx="48" cy="48" r="46" fill={BG[art]} />
      <Scene art={art} />
    </svg>
  );
}
