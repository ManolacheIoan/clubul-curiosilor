import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileBar } from "@/components/MobileBar";
import { BUSINESS_NAME, site } from "@/config/site";
import "./globals.css";

// Fonturi găzduite local: Fredoka (rotunjit, titluri) și Nunito Sans (text).
// Fișierul „latin” se preîncarcă; „latin-ext” (ă, ș, ț) vine doar când e nevoie.
const display = localFont({
  src: "./fonts/fredoka-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-display-latin",
  display: "swap",
  adjustFontFallback: false,
});
const displayExt = localFont({
  src: "./fonts/fredoka-latin-ext-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-display-ext",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});
const text = localFont({
  src: "./fonts/nunito-sans-latin-wght-normal.woff2",
  weight: "200 1000",
  variable: "--font-text-latin",
  display: "swap",
  adjustFontFallback: false,
});
const textExt = localFont({
  src: "./fonts/nunito-sans-latin-ext-wght-normal.woff2",
  weight: "200 1000",
  variable: "--font-text-ext",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

export const metadata: Metadata = {
  title: { default: `${BUSINESS_NAME}: ${site.tagline}`, template: `%s | ${BUSINESS_NAME}` },
  description: `${BUSINESS_NAME}: ${site.shortDescription}`,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#FBF7EC" };

const fontVars = [display, displayExt, text, textExt].map((f) => f.variable).join(" ");

// Marcaj „js”: animațiile de apariție ascund conținut doar dacă JavaScript rulează.
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a href="#continut" className="skip-link">
          Sari la conținut
        </a>
        <Header />
        <ViewTransition default="pagina">
          <main id="continut" tabIndex={-1}>
            {children}
          </main>
        </ViewTransition>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
