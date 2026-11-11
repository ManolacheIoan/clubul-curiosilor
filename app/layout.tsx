import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileBar } from "@/components/MobileBar";
import { BUSINESS_NAME, site } from "@/config/site";
import "./globals.css";
import { withBase } from "@/lib/base-path";

// Fonturi găzduite local: Baloo 2 (rotunjit, titluri; are ă, ș, ț) și Nunito Sans (text).
// Toate patru se preîncarcă: textele românești au ă, ș, ț (din „latin-ext”) chiar în primul ecran.
const display = localFont({
  src: "./fonts/baloo-2-latin-wght-normal.woff2",
  weight: "400 800",
  variable: "--font-display-latin",
  display: "swap",
  adjustFontFallback: false,
});
const displayExt = localFont({
  src: "./fonts/baloo-2-latin-ext-wght-normal.woff2",
  weight: "400 800",
  variable: "--font-display-ext",
  display: "swap",
  adjustFontFallback: false,
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
});

export const metadata: Metadata = {
  title: { default: `${BUSINESS_NAME}: ${site.tagline}`, template: `%s | ${BUSINESS_NAME}` },
  description: `${BUSINESS_NAME}: ${site.shortDescription}`,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: withBase("/icon.svg"), apple: withBase("/apple-icon.png") },
  // Previzualizarea la distribuire (WhatsApp, Facebook). Imaginea: scripts/share-images.mjs.
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: BUSINESS_NAME,
    images: [{ url: withBase("/og.png"), width: 1200, height: 630, alt: `${BUSINESS_NAME}: ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image" },
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
