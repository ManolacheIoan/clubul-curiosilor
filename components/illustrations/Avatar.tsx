import type { Avatar as AvatarData, HairStyle } from "@/data/staff";

/**
 * Portret ilustrat, desenat din parametrii din data/staff.ts (fără fotografii).
 * viewBox 0 0 120 120; numele persoanei apare mereu lângă portret.
 */

function HairBack({ style, color }: { style: HairStyle; color: string }) {
  switch (style) {
    case "lung":
      return <path d="M30 56c0-22 12-36 30-36s30 14 30 36v40H30Z" fill={color} />;
    case "bob":
      return <path d="M32 54c0-20 12-32 28-32s28 12 28 32v22H32Z" fill={color} />;
    case "coada":
      return <path d="M82 40c12 4 18 18 12 34-4-10-10-16-16-18Z" fill={color} />;
    default:
      return null;
  }
}

function HairFront({ style, color }: { style: HairStyle; color: string }) {
  switch (style) {
    case "coc":
      return (
        <g fill={color}>
          <circle cx="60" cy="20" r="11" />
          <path d="M36 52c0-18 10-28 24-28s24 10 24 28c-6-10-14-14-24-14s-18 4-24 14Z" />
        </g>
      );
    case "bob":
      return <path d="M36 52c2-16 12-26 24-26s22 10 24 26c-10-2-18-8-22-16-4 8-14 14-26 16Z" fill={color} />;
    case "scurt":
      return <path d="M36 50c0-16 10-26 24-26s24 10 24 26c-4-6-8-9-12-10-6 4-18 6-28 4Z" fill={color} />;
    case "cret":
      return (
        <g fill={color}>
          {[[38, 42], [46, 32], [58, 27], [70, 30], [80, 38], [84, 48], [36, 52]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="9" />
          ))}
        </g>
      );
    case "lung":
      return <path d="M36 54c0-18 10-28 24-28s24 10 24 28c-8-4-14-10-16-18-6 10-18 16-32 18Z" fill={color} />;
    case "coada":
      return <path d="M36 52c0-18 10-28 24-28s24 10 24 28c-8-8-16-12-24-12s-16 4-24 12Z" fill={color} />;
    case "tuns":
      return <path d="M37 46c2-12 11-20 23-20s21 8 23 20c-6-4-14-6-23-6s-17 2-23 6Z" fill={color} />;
  }
}

function Prop({ prop }: { prop: AvatarData["prop"] }) {
  // Insigna din colțul de jos, pe un cerc galben.
  const inner = (() => {
    switch (prop) {
      case "carte":
        return <path d="M-8-5c3-2 6-2 8 0v10c-2-2-5-2-8 0Zm8 0c2-2 5-2 8 0v10c-3-2-6-2-8 0" fill="#1F6B52" />;
      case "glob":
        return (
          <g>
            <circle r="8" fill="#4DA3D9" />
            <path d="M-4-4c3 1 4 4 1 6s0 4 2 5M3-6c-1 3 2 4 4 3" stroke="#1F6B52" strokeWidth="2.4" fill="none" />
          </g>
        );
      case "robot":
        return (
          <g>
            <rect x="-7" y="-6" width="14" height="11" rx="4" fill="#4DA3D9" />
            <circle cx="-3" cy="-1" r="1.6" fill="#1E2B26" />
            <circle cx="3" cy="-1" r="1.6" fill="#1E2B26" />
            <path d="M0-6v-3" stroke="#F2644F" strokeWidth="2" />
          </g>
        );
      case "pensula":
        return (
          <g transform="rotate(40)">
            <rect x="-1.8" y="-2" width="3.6" height="11" rx="1.5" fill="#1E2B26" />
            <path d="M-2.4-2h4.8l-.8-7c-1-2-2.2-2-3.2 0Z" fill="#F2644F" />
          </g>
        );
      case "nota":
        return (
          <g fill="#1E2B26">
            <path d="M-1-8h2v12h-2Z" />
            <path d="M1-8c4 1 6 3 6 6-2-2-4-2-6-2Z" />
            <ellipse cx="-3.5" cy="4.5" rx="4.5" ry="3.5" />
          </g>
        );
      case "minge":
        return (
          <g>
            <circle r="8" fill="#F2644F" />
            <path d="M-8 0h16M0-8c-3 3-3 13 0 16" stroke="#fff" strokeWidth="1.8" fill="none" />
          </g>
        );
      case "lingura":
        return <path d="M-2 8 1-3a4 5 0 1 1 3 1L1 9Z" fill="#B83C28" />;
      case "trusa":
        return (
          <g>
            <rect x="-8" y="-6" width="16" height="12" rx="3" fill="#F2644F" />
            <path d="M0-3v6M-3 0h6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case "busola":
        return (
          <g>
            <circle r="8" fill="#FBF7EC" />
            <path d="M0-6 2.5 0 0 6-2.5 0Z" fill="#F2644F" />
            <circle r="1.5" fill="#1E2B26" />
          </g>
        );
    }
  })();
  return (
    <g transform="translate(96 96)">
      <circle r="15" fill="#FFC83D" stroke="#FBF7EC" strokeWidth="4" />
      {inner}
    </g>
  );
}

export function Avatar({ avatar, className }: { avatar: AvatarData; className?: string }) {
  const { skin, hair, hairColor, top, glasses, beard, prop } = avatar;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <circle cx="60" cy="58" r="54" fill="#E6F0EA" />
      <path d="M8 66a52 52 0 0 1 3-14l15-6 12 8 14-12 16 12 14-8 16 10 3 10Z" fill="#5FA383" opacity=".3" />
      <g>
        <HairBack style={hair} color={hairColor} />
        {/* umerii urmează marginea cercului (fără clipPath, deci fără id-uri duplicate) */}
        <path d="M26 100C30 90 42 86 60 86s30 4 34 14A54 54 0 0 1 26 100Z" fill={top} />
        <rect x="52" y="74" width="16" height="16" rx="6" fill={skin} />
        <path d="M52 86c2 4 6 6 8 6s6-2 8-6" fill={top} opacity=".6" />
        <ellipse cx="60" cy="56" rx="24" ry="26" fill={skin} />
        <ellipse cx="36" cy="58" rx="4" ry="6" fill={skin} />
        <ellipse cx="84" cy="58" rx="4" ry="6" fill={skin} />
        {beard ? <path d="M38 60c2 16 10 24 22 24s20-8 22-24c-4 6-10 8-22 8s-18-2-22-8Z" fill={hairColor} /> : null}
        <circle cx="51" cy="58" r="3" fill="#1E2B26" />
        <circle cx="69" cy="58" r="3" fill="#1E2B26" />
        <path d={beard ? "M54 71q6 3 12 0" : "M53 69q7 6 14 0"} stroke="#1E2B26" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <circle cx="45" cy="67" r="4" fill="#F2644F" opacity=".3" />
        <circle cx="75" cy="67" r="4" fill="#F2644F" opacity=".3" />
        {glasses ? (
          <g stroke="#1E2B26" strokeWidth="2.4" fill="none">
            <circle cx="51" cy="58" r="7.5" />
            <circle cx="69" cy="58" r="7.5" />
            <path d="M58.5 58h3" />
          </g>
        ) : null}
        <HairFront style={hair} color={hairColor} />
      </g>
      <Prop prop={prop} />
    </svg>
  );
}
