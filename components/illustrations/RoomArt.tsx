import type { RoomArtId } from "@/data/spaces";

/** Ilustrațiile încăperilor: scene late (viewBox 0 0 320 160), decorative, în paleta site-ului. */

const WALL: Record<RoomArtId, string> = {
  teme: "#FFF4D1",
  laborator: "#DDEEF8",
  arte: "#FDE3DE",
  miscare: "#E6F0EA",
  bucatarie: "#FFF4D1",
  curte: "#DDEEF8",
  linistit: "#E6F0EA",
};

/** Podea de lemn, comună încăperilor (curtea are iarbă). */
const Floor = () => (
  <g>
    <rect y="126" width="320" height="34" fill="#E7DFC9" />
    <path d="M0 138h320M60 126v12M150 126v12M240 126v12M20 138v22M110 138v22M200 138v22M290 138v22" stroke="#D6C9A8" strokeWidth="2" />
  </g>
);

function Scene({ id }: { id: RoomArtId }) {
  switch (id) {
    case "teme":
      return (
        <g>
          <Floor />
          {/* fereastra */}
          <rect x="24" y="22" width="70" height="60" rx="6" fill="#DDEEF8" stroke="#FBF7EC" strokeWidth="6" />
          <path d="M59 22v60M24 52h70" stroke="#FBF7EC" strokeWidth="4" />
          <circle cx="80" cy="36" r="8" fill="#FFC83D" />
          {/* raftul cu cărți */}
          <rect x="236" y="30" width="64" height="96" rx="4" fill="#B83C28" />
          <path d="M240 62h56M240 94h56" stroke="#8E2E1F" strokeWidth="4" />
          {[["#4DA3D9", 244, 36], ["#FFC83D", 254, 40], ["#1F6B52", 264, 34], ["#FBF7EC", 276, 38], ["#5FA383", 246, 68], ["#F2644F", 258, 70], ["#4DA3D9", 270, 66], ["#FFC83D", 282, 72]].map(
            ([c, x, y], i) => (
              <rect key={i} x={x as number} y={y as number} width="9" height={(i < 4 ? 62 : 94) - (y as number)} rx="2" fill={c as string} />
            ),
          )}
          {/* masa, lampa, cărțile */}
          <rect x="104" y="96" width="112" height="8" rx="4" fill="#1F6B52" />
          <path d="M116 104v22M204 104v22" stroke="#164F3D" strokeWidth="6" strokeLinecap="round" />
          <path d="M190 96V70l-14-8" stroke="#1E2B26" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M162 58l20-8 6 14Z" fill="#FFC83D" />
          <rect x="124" y="84" width="34" height="6" rx="2" fill="#4DA3D9" />
          <rect x="128" y="90" width="30" height="6" rx="2" fill="#F2644F" />
          <path d="M150 74l14 10" stroke="#55635D" strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    case "laborator":
      return (
        <g>
          <Floor />
          {/* tabla cu formule */}
          <rect x="22" y="14" width="80" height="48" rx="6" fill="#1F6B52" stroke="#FBF7EC" strokeWidth="5" />
          <path d="M34 30h20M34 44h34M76 28l10 10m0-10-10 10M78 50h14" stroke="#FFF4D1" strokeWidth="3" strokeLinecap="round" />
          {/* blatul */}
          <rect x="18" y="92" width="284" height="10" rx="4" fill="#55635D" />
          <rect x="26" y="102" width="268" height="24" fill="#FBF7EC" />
          <path d="M116 102v24M206 102v24" stroke="#E7DFC9" strokeWidth="3" />
          {/* eprubeta cu bule */}
          <g transform="translate(46 0)">
            <path d="M60 56h20M64 56v14l-14 22h40L76 70V56" fill="#FBF7EC" stroke="#1B5E8C" strokeWidth="3" strokeLinejoin="round" />
            <path d="M55 84h30l5 8H50Z" fill="#5FA383" />
            <circle cx="70" cy="46" r="4" fill="#5FA383" />
            <circle cx="78" cy="36" r="3" fill="#5FA383" />
          </g>
          {/* microscopul */}
          <path d="M160 92h36M178 92V80M170 80h22l-10-30-8 4Z" stroke="#1B5E8C" strokeWidth="5" fill="#4DA3D9" strokeLinejoin="round" strokeLinecap="round" />
          <rect x="166" y="44" width="12" height="12" rx="2" fill="#1E2B26" transform="rotate(-20 172 50)" />
          {/* robotul */}
          <rect x="236" y="56" width="44" height="30" rx="8" fill="#4DA3D9" />
          <rect x="242" y="62" width="32" height="14" rx="5" fill="#1E2B26" />
          <circle cx="251" cy="69" r="3" fill="#FFC83D" />
          <circle cx="265" cy="69" r="3" fill="#FFC83D" />
          <path d="M258 56V44" stroke="#1B5E8C" strokeWidth="3" />
          <circle cx="258" cy="42" r="4" fill="#F2644F" />
          <circle cx="246" cy="90" r="4" fill="#1E2B26" />
          <circle cx="270" cy="90" r="4" fill="#1E2B26" />
        </g>
      );
    case "arte":
      return (
        <g>
          <Floor />
          {/* scena cu cortină */}
          <rect x="196" y="104" width="124" height="22" fill="#B83C28" />
          <path d="M196 14h124v12H196Z" fill="#8E2E1F" />
          <path d="M200 26c10 30 6 60 0 78h22c6-34 0-62-6-78Z" fill="#F2644F" />
          <path d="M320 26c-10 30-6 60 0 78h-22c-6-34 0-62 6-78Z" fill="#F2644F" />
          <circle cx="258" cy="56" r="16" fill="#FFC83D" opacity=".55" />
          {/* șevaletul */}
          <path d="M70 126l22-96 22 96M92 30v96" stroke="#B83C28" strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x="56" y="38" width="72" height="54" rx="3" fill="#FBF7EC" stroke="#E7DFC9" strokeWidth="3" />
          <circle cx="76" cy="58" r="9" fill="#FFC83D" />
          <path d="M60 88l20-18 14 12 12-10 18 16Z" fill="#5FA383" />
          {/* paleta */}
          <path d="M140 108c0-12 16-18 30-14s16 16 6 18-6 8-14 8-22-2-22-12Z" fill="#E7DFC9" />
          <circle cx="150" cy="104" r="3.5" fill="#F2644F" />
          <circle cx="160" cy="99" r="3.5" fill="#4DA3D9" />
          <circle cx="171" cy="102" r="3.5" fill="#FFC83D" />
          <circle cx="156" cy="112" r="3.5" fill="#1F6B52" />
          {/* note muzicale */}
          <path d="M150 40v-16l14-4v16" stroke="#1E2B26" strokeWidth="3" fill="none" />
          <circle cx="146" cy="40" r="5" fill="#1E2B26" />
          <circle cx="160" cy="36" r="5" fill="#1E2B26" />
        </g>
      );
    case "miscare":
      return (
        <g>
          <Floor />
          {/* peretele de cățărat */}
          <rect x="22" y="18" width="92" height="108" rx="6" fill="#FBF7EC" />
          {[[40, 36, "#F2644F"], [80, 30, "#FFC83D"], [56, 60, "#4DA3D9"], [94, 70, "#1F6B52"], [38, 88, "#FFC83D"], [74, 96, "#F2644F"], [100, 108, "#4DA3D9"]].map(([x, y, c], i) => (
            <circle key={i} cx={x as number} cy={y as number} r="6" fill={c as string} />
          ))}
          {/* saltelele */}
          <rect x="132" y="112" width="96" height="16" rx="6" fill="#4DA3D9" />
          <rect x="228" y="112" width="74" height="16" rx="6" fill="#1F6B52" />
          <path d="M164 112v16M196 112v16M266 112v16" stroke="#FBF7EC" strokeWidth="2" opacity=".6" />
          {/* mingea */}
          <circle cx="250" cy="90" r="18" fill="#F2644F" />
          <path d="M232 90h36M250 72c-8 10-8 26 0 36" stroke="#FBF7EC" strokeWidth="3" fill="none" />
          {/* conul și coarda */}
          <path d="M170 112l10-26 10 26Z" fill="#FFC83D" />
          <path d="M170 104h20" stroke="#FBF7EC" strokeWidth="3" />
          <path d="M140 40c20 40 120 40 150 0" stroke="#5FA383" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 9" />
        </g>
      );
    case "bucatarie":
      return (
        <g>
          <Floor />
          {/* faianța */}
          <rect x="0" y="40" width="320" height="56" fill="#FBF7EC" />
          <path d="M0 58h320M0 76h320M40 40v56M80 40v56M120 40v56M160 40v56M200 40v56M240 40v56M280 40v56" stroke="#E7DFC9" strokeWidth="2" />
          {/* blatul și dulapurile */}
          <rect x="0" y="92" width="320" height="10" rx="3" fill="#1F6B52" />
          <rect x="10" y="102" width="300" height="24" fill="#5FA383" />
          <path d="M84 102v24M160 102v24M236 102v24" stroke="#1F6B52" strokeWidth="3" />
          <circle cx="76" cy="114" r="2.5" fill="#FBF7EC" />
          <circle cx="152" cy="114" r="2.5" fill="#FBF7EC" />
          {/* oala cu abur */}
          <path d="M44 66h56v20a6 6 0 0 1-6 6H50a6 6 0 0 1-6-6Z" fill="#F2644F" />
          <rect x="40" y="62" width="64" height="6" rx="3" fill="#B83C28" />
          <path d="M60 52c-6-6 6-10 0-18M74 52c-6-6 6-10 0-18M88 52c-6-6 6-10 0-18" stroke="#55635D" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".5" />
          {/* tocătorul cu morcov */}
          <rect x="140" y="82" width="70" height="10" rx="4" fill="#E0A82E" />
          <path d="M152 84l36-4 4 4-4 4Z" fill="#F2644F" />
          <path d="M192 84l8-6M192 84l9 0M192 84l8 6" stroke="#1F6B52" strokeWidth="3" strokeLinecap="round" />
          {/* castronul cu fructe */}
          <circle cx="256" cy="74" r="9" fill="#F2644F" />
          <circle cx="272" cy="70" r="10" fill="#FFC83D" />
          <circle cx="286" cy="76" r="8" fill="#5FA383" />
          <path d="M240 78h62c0 10-12 14-31 14s-31-4-31-14Z" fill="#4DA3D9" />
          {/* ustensilele agățate */}
          <path d="M240 16h70" stroke="#55635D" strokeWidth="3" />
          <path d="M256 16v14M276 16v18M296 16v12" stroke="#55635D" strokeWidth="3" />
          <circle cx="256" cy="33" r="5" fill="#4DA3D9" />
          <rect x="272" y="34" width="8" height="4" rx="2" fill="#FFC83D" />
          <ellipse cx="296" cy="31" rx="5" ry="4" fill="#B83C28" />
        </g>
      );
    case "curte":
      return (
        <g>
          <circle cx="280" cy="30" r="16" fill="#FFC83D" />
          <path d="M18 34q8-8 16 0 8-8 16 0" stroke="#FBF7EC" strokeWidth="10" fill="none" strokeLinecap="round" />
          {/* gardul */}
          {Array.from({ length: 17 }, (_, i) => (
            <path key={i} d={`M${10 + i * 19} 112V76l5-6 5 6v36`} fill="#FBF7EC" stroke="#E7DFC9" strokeWidth="2" />
          ))}
          <path d="M0 86h320M0 102h320" stroke="#E7DFC9" strokeWidth="4" />
          {/* iarba */}
          <path d="M0 108c50-8 110-6 160 0s110 4 160-4v56H0Z" fill="#5FA383" />
          {/* copacul */}
          <path d="M70 130V70" stroke="#8E5A2B" strokeWidth="10" strokeLinecap="round" />
          <circle cx="70" cy="56" r="30" fill="#1F6B52" />
          <circle cx="50" cy="70" r="18" fill="#1F6B52" />
          <circle cx="92" cy="68" r="18" fill="#1F6B52" />
          <circle cx="62" cy="48" r="4" fill="#F2644F" />
          <circle cx="84" cy="60" r="4" fill="#F2644F" />
          {/* groapa cu nisip */}
          <rect x="128" y="118" width="80" height="22" rx="4" fill="#E0A82E" />
          <rect x="134" y="122" width="68" height="14" rx="3" fill="#FFF4D1" />
          <path d="M150 128h14l-4-10" stroke="#F2644F" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="186" cy="128" r="5" fill="#4DA3D9" />
          {/* grădina */}
          <rect x="226" y="124" width="80" height="16" rx="3" fill="#8E5A2B" />
          {[240, 262, 284].map((x) => (
            <g key={x}>
              <path d={`M${x} 124v-16`} stroke="#164F3D" strokeWidth="3" />
              <ellipse cx={x - 5} cy="110" rx="6" ry="3" fill="#164F3D" transform={`rotate(-30 ${x - 5} 110)`} />
              <ellipse cx={x + 5} cy="112" rx="6" ry="3" fill="#164F3D" transform={`rotate(30 ${x + 5} 112)`} />
            </g>
          ))}
          <circle cx="262" cy="104" r="5" fill="#F2644F" />
        </g>
      );
    case "linistit":
      return (
        <g>
          <Floor />
          {/* covorul */}
          <ellipse cx="160" cy="138" rx="120" ry="14" fill="#FFC83D" opacity=".7" />
          {/* lampa suspendată */}
          <path d="M160 0v26" stroke="#55635D" strokeWidth="3" />
          <path d="M140 42c0-12 9-18 20-18s20 6 20 18Z" fill="#F2644F" />
          <path d="M144 42h32l40 84H104Z" fill="#FFF4D1" opacity=".6" />
          {/* tabloul cu luna */}
          <rect x="34" y="24" width="56" height="44" rx="4" fill="#1B5E8C" stroke="#FBF7EC" strokeWidth="5" />
          <path d="M66 34a12 12 0 1 0 10 18 10 10 0 1 1-10-18Z" fill="#FFF4D1" />
          <circle cx="46" cy="36" r="1.8" fill="#FFF4D1" />
          <circle cx="52" cy="56" r="1.4" fill="#FFF4D1" />
          {/* pernuțele */}
          <path d="M62 132c-20 0-26-34 0-40 22-4 34 10 30 26-2 10-14 14-30 14Z" fill="#4DA3D9" />
          <path d="M204 132c-6-30 20-42 44-34 22 8 20 34 6 34Z" fill="#5FA383" />
          <rect x="132" y="112" width="40" height="20" rx="9" fill="#FDE3DE" stroke="#F2644F" strokeWidth="3" />
          {/* cărțile */}
          <rect x="262" y="118" width="34" height="6" rx="2" fill="#B83C28" />
          <rect x="266" y="112" width="28" height="6" rx="2" fill="#FFC83D" />
          <rect x="260" y="124" width="38" height="6" rx="2" fill="#1F6B52" />
          {/* planta */}
          <path d="M290 112V80" stroke="#1F6B52" strokeWidth="4" />
          <path d="M290 92c-12-2-16-12-14-18 10 2 14 10 14 18Zm0-6c12-2 16-12 14-18-10 2-14 10-14 18Z" fill="#5FA383" />
        </g>
      );
  }
}

export function RoomArt({ id, className }: { id: RoomArtId; className?: string }) {
  return (
    <svg viewBox="0 0 320 160" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="160" fill={WALL[id]} />
      <Scene id={id} />
    </svg>
  );
}
