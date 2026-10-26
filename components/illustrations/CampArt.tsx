import type { Camp } from "@/data/camps";

/** Ilustrațiile taberelor: scene late (viewBox 0 0 320 160), decorative. */

type Art = Camp["art"];

const SKY: Record<Art, string> = {
  jungla: "#E6F0EA",
  inventatori: "#DDEEF8",
  spatiu: "#1E2B26",
  pirati: "#DDEEF8",
  dinozauri: "#FFF4D1",
  festival: "#FDE3DE",
  iarna: "#DDEEF8",
  primavara: "#E6F0EA",
  intersemestriala: "#FFF4D1",
};

function Scene({ art }: { art: Art }) {
  switch (art) {
    case "jungla":
      return (
        <g>
          <path d="M0 130c40-14 90-10 160 0s120 6 160-6v36H0Z" fill="#5FA383" />
          <path d="M40 140c-6-40 4-80 10-100" stroke="#164F3D" strokeWidth="8" strokeLinecap="round" />
          {[[-50, 50, 40], [10, 50, 44], [-20, 50, 60]].map(([r, cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="34" ry="12" transform={`rotate(${r} ${cx} ${cy})`} fill={i === 2 ? "#1F6B52" : "#5FA383"} />
          ))}
          <path d="M250 140c4-30-2-60-12-80" stroke="#164F3D" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="236" cy="58" rx="30" ry="11" transform="rotate(30 236 58)" fill="#1F6B52" />
          <ellipse cx="256" cy="62" rx="28" ry="10" transform="rotate(-24 256 62)" fill="#5FA383" />
          <circle cx="150" cy="96" r="22" fill="#F2644F" />
          <circle cx="143" cy="92" r="3" fill="#1E2B26" />
          <circle cx="157" cy="92" r="3" fill="#1E2B26" />
          <path d="M144 102q6 5 12 0" stroke="#1E2B26" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M130 84c-8-2-12-10-10-14 6 0 10 6 10 14Zm40 0c8-2 12-10 10-14-6 0-10 6-10 14Z" fill="#F2644F" />
          <path d="M100 40q8-8 16 0 8-8 16 0" stroke="#1E2B26" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      );
    case "inventatori":
      return (
        <g>
          <rect x="0" y="124" width="320" height="36" fill="#4DA3D9" opacity=".35" />
          <circle cx="160" cy="62" r="34" fill="#FFC83D" />
          <rect x="146" y="94" width="28" height="18" rx="5" fill="#55635D" />
          <path d="M150 102h20" stroke="#FBF7EC" strokeWidth="3" />
          <path d="M150 70l10-14 10 14" stroke="#B83C28" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <g stroke="#FFC83D" strokeWidth="5" strokeLinecap="round">
            <path d="M160 14v-6M206 30l5-5M114 30l-5-5M222 62h7M98 62h-7" />
          </g>
          <g fill="#1F6B52">
            <circle cx="62" cy="96" r="22" />
            <circle cx="100" cy="122" r="14" />
          </g>
          <circle cx="62" cy="96" r="8" fill="#DDEEF8" />
          <circle cx="100" cy="122" r="5" fill="#DDEEF8" />
          <rect x="230" y="92" width="50" height="34" rx="10" fill="#4DA3D9" />
          <rect x="238" y="100" width="34" height="16" rx="6" fill="#1E2B26" />
          <circle cx="248" cy="108" r="3" fill="#FFC83D" />
          <circle cx="262" cy="108" r="3" fill="#FFC83D" />
          <path d="M255 92V78" stroke="#1B5E8C" strokeWidth="4" />
          <circle cx="255" cy="76" r="5" fill="#F2644F" />
        </g>
      );
    case "spatiu":
      return (
        <g>
          {[[30, 30], [80, 18], [120, 50], [210, 24], [280, 40], [250, 100], [40, 110], [300, 130]].map(([x, y], i) => (
            <circle key={i} className="art-twinkle" cx={x} cy={y} r={i % 3 === 0 ? 2.5 : 1.6} fill="#FFF4D1" />
          ))}
          <circle cx="250" cy="70" r="30" fill="#F2644F" />
          <ellipse cx="250" cy="70" rx="48" ry="10" fill="none" stroke="#FFC83D" strokeWidth="5" transform="rotate(-16 250 70)" />
          <circle cx="70" cy="70" r="16" fill="#4DA3D9" />
          <circle cx="64" cy="66" r="4" fill="#1B5E8C" />
          <g transform="rotate(30 160 90)">
            <path d="M160 40c16 14 18 44 12 70h-24c-6-26-4-56 12-70Z" fill="#FBF7EC" />
            <circle cx="160" cy="70" r="8" fill="#4DA3D9" stroke="#1B5E8C" strokeWidth="3" />
            <path d="M148 98l-12 16 14-4Zm24 0 12 16-14-4Z" fill="#F2644F" />
            <path className="art-flame" d="M152 110c2 12 6 18 8 22 2-4 6-10 8-22Z" fill="#FFC83D" />
          </g>
        </g>
      );
    case "pirati":
      return (
        <g>
          <path d="M0 116c30-8 50 8 80 0s50 8 80 0 50 8 80 0 50 8 80 0v44H0Z" fill="#4DA3D9" />
          <path d="M0 132c30-8 50 8 80 0s50 8 80 0 50 8 80 0 50 8 80 0v28H0Z" fill="#1B5E8C" opacity=".5" />
          <g className="art-boat">
            <path d="M90 104h120l-18 26h-84Z" fill="#B83C28" />
            <path d="M150 104V30" stroke="#1E2B26" strokeWidth="5" />
            <path d="M154 36c30 10 40 40 36 62h-36Z" fill="#FBF7EC" />
            <path d="M146 44c-24 10-30 34-28 54h28Z" fill="#FFF4D1" />
            <path d="M150 30l20 6-20 6Z" fill="#F2644F" />
          </g>
          <rect x="236" y="66" width="44" height="30" rx="5" fill="#B83C28" />
          <path d="M236 76h44" stroke="#FFC83D" strokeWidth="4" />
          <rect x="253" y="72" width="10" height="10" rx="2" fill="#FFC83D" />
          <path d="M40 60l14 14m0-14L40 74" stroke="#F2644F" strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    case "dinozauri":
      return (
        <g>
          <path d="M0 122c50-10 100 6 160 0s110-8 160 0v38H0Z" fill="#E0A82E" opacity=".55" />
          <path d="M70 120c0-26 16-44 46-44 20 0 30-20 30-34 0-8 6-12 14-12 12 0 18 10 14 20-4 8-12 8-14 18-4 18 6 26 22 30 30 8 54 0 70-14-4 30-34 46-70 46h-60" fill="#5FA383" />
          <circle cx="164" cy="38" r="3" fill="#1E2B26" />
          <rect x="96" y="112" width="14" height="22" rx="6" fill="#1F6B52" />
          <rect x="146" y="112" width="14" height="22" rx="6" fill="#1F6B52" />
          {[110, 128, 146].map((x, i) => (
            <path key={i} d={`M${x} ${80 - i * 4}l8-14 8 14Z`} fill="#F2644F" />
          ))}
          <path d="M40 140l-10 8m18-4-4 10m12-8 2 10" stroke="#FBF7EC" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="260" cy="140" rx="22" ry="6" fill="#FBF7EC" />
        </g>
      );
    case "festival":
      return (
        <g>
          <path d="M0 0h320v28c-20 14-40 14-53 0-14 14-40 14-53 0-14 14-40 14-54 0-13 14-40 14-53 0-14 14-40 14-53 0-14 14-34 14-54 0Z" fill="#B83C28" />
          <path d="M0 0c20 50 30 100 20 160H0Zm320 0c-20 50-30 100-20 160h20Z" fill="#F2644F" />
          <rect x="30" y="128" width="260" height="32" fill="#1F6B52" />
          <path d="M150 44l8 18 20 2-15 13 5 20-18-11-18 11 5-20-15-13 20-2Z" fill="#FFC83D" />
          <path d="M90 94v-30l16-4v26" stroke="#1E2B26" strokeWidth="4" fill="none" />
          <ellipse cx="86" cy="96" rx="7" ry="5" fill="#1E2B26" />
          <ellipse cx="102" cy="90" rx="7" ry="5" fill="#1E2B26" />
          <path d="M220 70c10-6 24-6 34 0v14c0 12-8 20-17 20s-17-8-17-20Z" fill="#4DA3D9" />
          <circle cx="230" cy="80" r="3" fill="#1E2B26" />
          <circle cx="244" cy="80" r="3" fill="#1E2B26" />
          <path d="M230 92q7 6 14 0" stroke="#1E2B26" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      );
    case "iarna":
      return (
        <g>
          <path d="M0 120c50-16 110-10 160 0s120 8 160-4v44H0Z" fill="#fff" />
          {[[50, 40], [270, 30], [120, 24], [220, 80], [30, 96]].map(([x, y], i) => (
            <g key={i} className="art-snow" transform={`translate(${x} ${y})`} stroke="#1B5E8C" strokeWidth="2.5" strokeLinecap="round">
              <path d="M0-8v16M-7-4l14 8M-7 4l14-8" />
            </g>
          ))}
          <circle cx="160" cy="104" r="26" fill="#fff" />
          <circle cx="160" cy="66" r="18" fill="#fff" />
          <circle cx="154" cy="62" r="2.5" fill="#1E2B26" />
          <circle cx="166" cy="62" r="2.5" fill="#1E2B26" />
          <path d="M160 68l12 3-12 3Z" fill="#F2644F" />
          <path d="M142 80c10 6 26 6 36 0v8c-10 6-26 6-36 0Z" fill="#F2644F" />
          <path d="M146 48h28l-4-18h-20Z" fill="#1F6B52" />
          <rect x="140" y="46" width="40" height="6" rx="3" fill="#164F3D" />
        </g>
      );
    case "primavara":
      return (
        <g>
          <path d="M0 126c50-10 110-6 160 0s110 4 160-4v38H0Z" fill="#5FA383" />
          <ellipse cx="110" cy="112" rx="20" ry="26" fill="#FFC83D" />
          <path d="M92 108l6-6 6 6 6-6 6 6 6-6 6 6" stroke="#F2644F" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="160" cy="118" rx="16" ry="20" fill="#4DA3D9" />
          <path d="M148 116h24" stroke="#FFF4D1" strokeWidth="4" strokeDasharray="3 4" />
          <path d="M230 126V80" stroke="#1F6B52" strokeWidth="5" strokeLinecap="round" />
          <path d="M230 96c-14-2-20-12-20-20 12 0 20 8 20 20Zm0-8c14-2 20-12 20-20-12 0-20 8-20 20Z" fill="#1F6B52" />
          <circle cx="230" cy="70" r="12" fill="#F2644F" />
          <circle cx="230" cy="70" r="5" fill="#FFC83D" />
          <circle cx="60" cy="40" r="18" fill="#FFC83D" />
        </g>
      );
    case "intersemestriala":
      return (
        <g>
          <rect x="0" y="126" width="320" height="34" fill="#4DA3D9" opacity=".4" />
          <path d="M40 126c40-60 200-60 240 0" stroke="#B83C28" strokeWidth="8" fill="none" />
          {[70, 100, 130, 160, 190, 220, 250].map((x) => (
            <path key={x} d={`M${x} 126V${126 - Math.round(60 * Math.sin(((x - 40) / 240) * Math.PI) * 0.75)}`} stroke="#E0A82E" strokeWidth="5" />
          ))}
          <rect x="30" y="122" width="260" height="10" rx="4" fill="#E0A82E" />
          <rect x="140" y="30" width="40" height="40" rx="6" fill="#1F6B52" />
          <path d="M160 30v-8a6 6 0 1 1 0 12" fill="#1F6B52" />
          <rect x="182" y="40" width="30" height="30" rx="6" fill="#FFC83D" />
        </g>
      );
  }
}

export function CampArt({ art, className }: { art: Art; className?: string }) {
  return (
    <svg viewBox="0 0 320 160" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="160" fill={SKY[art]} />
      <Scene art={art} />
    </svg>
  );
}
