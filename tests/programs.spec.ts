import { expect, test } from "@playwright/test";
import { resultCount } from "./helpers";

test.describe("Programe: filtrare, căutare, adresă", () => {
  test("filtrul de vârstă și domeniu actualizează lista și adresa", async ({ page }) => {
    await page.goto("/programe/");
    const all = await resultCount(page);
    expect(all).toBe(13);

    await page.getByRole("radio", { name: "11–14 ani" }).check();
    await expect(page).toHaveURL(/varsta=11-14/);
    await expect(page.getByRole("link", { name: "Muzică și ritm" })).toHaveCount(0);
    const teens = await resultCount(page);
    expect(teens).toBeLessThan(all);

    await page.getByRole("radio", { name: /Limbi străine/ }).check();
    await expect(page).toHaveURL(/domeniu=limbi/);
    await expect(page.getByRole("status")).toHaveText("4 activități găsite");
    await expect(page.getByRole("heading", { level: 2, name: "Cursuri de limbi străine" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Cursuri și ateliere" })).toHaveCount(0);
  });

  test("căutarea ignoră diacriticele", async ({ page }) => {
    await page.goto("/programe/");
    await page.getByLabel("Caută o activitate").fill("stiinte");
    await expect(page.getByRole("status")).toHaveText("1 activitate găsită");
    await expect(page.getByRole("link", { name: "Științe distractive" })).toBeVisible();
    await expect(page).toHaveURL(/cauta=stiinte/);
  });

  test("filtrele se citesc din adresă la încărcare", async ({ page }) => {
    await page.goto("/programe/?varsta=4-6&domeniu=arte");
    await expect(page.getByRole("radio", { name: "4–6 ani" })).toBeChecked();
    await expect(page.getByRole("status")).toHaveText("3 activități găsite");
    await expect(page.getByRole("link", { name: "Arte și creație" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Engleză prin joacă" })).toHaveCount(0);
  });

  test("starea goală are buton de revenire, iar „Șterge filtrele” golește adresa", async ({ page }) => {
    await page.goto("/programe/?varsta=4-6&domeniu=tehnologie");
    await expect(page.getByRole("heading", { name: /Nicio misiune/ })).toBeVisible();
    await page.getByRole("button", { name: "Vezi toate activitățile" }).click();
    await expect(page.getByRole("status")).toHaveText("13 activități găsite");
    await expect(page).toHaveURL(/\/programe\/$/);
  });

  test("filtrele se pot folosi doar cu tastatura", async ({ page }) => {
    await page.goto("/programe/");
    await page.getByLabel("Caută o activitate").focus();
    await page.keyboard.press("Tab"); // primul radio: Toate vârstele
    await page.keyboard.press("ArrowRight"); // 4–6 ani
    await expect(page.getByRole("radio", { name: "4–6 ani" })).toBeChecked();
    await expect(page).toHaveURL(/varsta=4-6/);
  });

  test("cardul duce la pagina programului, cu înscriere precompletată", async ({ page }) => {
    await page.goto("/programe/");
    await page.getByRole("link", { name: "Șah pentru exploratori" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Șah pentru exploratori" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Misiuni asemănătoare" })).toBeVisible();
    await page.locator(".facts").getByRole("link", { name: "Înscrie copilul" }).click();
    await expect(page).toHaveURL(/alegere=program:sah/);
  });
});
