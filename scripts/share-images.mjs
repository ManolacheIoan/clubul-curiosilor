// Generează imaginile pentru distribuire și instalare, în public/:
//   og.png (1200×630): captura primului ecran de pe pagina principală (WhatsApp, Facebook etc.)
//   apple-icon.png (180×180), icon-192.png, icon-512.png: logo-ul, pe fundal plin.
// Rulează după `npm run build`:  node scripts/share-images.mjs
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const port = 4199;
const server = spawn(process.execPath, ["scripts/serve.mjs"], { env: { ...process.env, PORT: String(port) }, stdio: "pipe" });
await new Promise((ok) => server.stdout.once("data", ok));

const browser = await chromium.launch();
try {
  // Iconițele: logo-ul fără colțuri rotunjite (telefoanele le rotunjesc singure).
  const svg = (await readFile("public/icon.svg", "utf8")).replace('rx="16"', 'rx="0"');
  for (const [file, size] of [["apple-icon.png", 180], ["icon-192.png", 192], ["icon-512.png", 512]]) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(`<style>*{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
    await page.screenshot({ path: `public/${file}` });
    await page.close();
  }

  // Imaginea de previzualizare: primul ecran al paginii principale, fără animații.
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: "reduce" });
  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/og.png" });
  console.log("public/og.png, public/apple-icon.png, public/icon-192.png, public/icon-512.png");
} finally {
  await browser.close();
  server.kill();
}
