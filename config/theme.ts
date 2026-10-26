/**
 * Paleta site-ului (aceleași valori ca în app/globals.css, :root).
 * Folosită de ilustrații și de testul de contrast (lib/contrast.test.ts).
 */
export const colors = {
  paper: "#FBF7EC",
  white: "#FFFFFF",
  ink: "#1E2B26",
  muted: "#55635D",
  green: "#1F6B52",
  greenDark: "#164F3D",
  greenSoft: "#E6F0EA",
  greenMid: "#5FA383",
  yellow: "#FFC83D",
  cream: "#FFF4D1",
  coral: "#F2644F",
  coralInk: "#B83C28",
  coralSoft: "#FDE3DE",
  sky: "#4DA3D9",
  skyInk: "#1B5E8C",
  skySoft: "#DDEEF8",
} as const;

/** Perechi text/fundal folosite în site; fiecare trebuie să treacă WCAG AA (4,5:1). */
export const textPairs: [keyof typeof colors, keyof typeof colors, string][] = [
  ["ink", "paper", "text pe hârtie"],
  ["muted", "paper", "text secundar"],
  ["muted", "white", "text secundar pe carduri"],
  ["green", "paper", "linkuri și titluri verzi"],
  ["green", "white", "linkuri pe carduri"],
  ["green", "greenSoft", "etichete verzi"],
  ["green", "cream", "etichete pe galben pal"],
  ["white", "green", "butoane și secțiuni verzi"],
  ["cream", "green", "text pe secțiuni verzi"],
  ["white", "greenDark", "subsol"],
  ["ink", "yellow", "evidențieri galbene"],
  ["ink", "coral", "butoane de acțiune (coral)"],
  ["coralInk", "paper", "text coral"],
  ["coralInk", "coralSoft", "mesaje de eroare"],
  ["skyInk", "paper", "text albastru"],
  ["skyInk", "skySoft", "etichete albastre"],
  ["ink", "sky", "text pe albastru"],
];
