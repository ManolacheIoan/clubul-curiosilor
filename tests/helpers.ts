import { expect, type Page } from "@playwright/test";

export const pages = [
  "/",
  "/programe/",
  "/programe/engleza/",
  "/tabere/",
  "/o-zi-la-club/",
  "/siguranta/",
  "/echipa/",
  "/inscriere/",
  "/preturi/",
  "/intrebari-frecvente/",
  "/contact/",
  "/confidentialitate/",
  "/ce-explorator-esti/",
];

export const next = (page: Page) => page.getByRole("button", { name: "Continuă" }).click();

/** Completează pașii 1–2 cu date valide. */
export async function fillChildAndParent(page: Page, age = "8") {
  await page.getByLabel("Numele și prenumele copilului").fill("Maria Ionescu");
  await page.getByLabel("Vârsta").selectOption(age);
  await next(page);
  await expect(page.getByRole("heading", { name: "Părintele" })).toBeVisible();
  await page.getByLabel("Numele tău").fill("Ana Ionescu");
  await page.getByLabel("Telefon").fill("0722 123 456");
  await page.getByLabel("E-mail").fill("ana@exemplu.ro");
  await next(page);
}

/** Numărul afișat în „N activități găsite”. */
export async function resultCount(page: Page) {
  const text = (await page.getByRole("status").first().textContent()) ?? "";
  return text.startsWith("Nicio") ? 0 : Number(text.match(/\d+/)?.[0]);
}
