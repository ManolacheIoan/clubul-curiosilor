import { expect, test } from "@playwright/test";
import { BUSINESS_NAME } from "../config/site";
import { pages } from "./helpers";

test.describe("Site", () => {
  test("nicio cerere externă pe nicio pagină (cu animații pornite)", async ({ page, baseURL }) => {
    const external: string[] = [];
    page.on("request", (r) => {
      if (!r.url().startsWith(baseURL!) && !r.url().startsWith("data:")) external.push(r.url());
    });
    for (const path of [...pages, "/nu-exista/"]) {
      await page.goto(path, { waitUntil: "networkidle" });
      await page.mouse.wheel(0, 2000);
      await page.waitForTimeout(150);
    }
    // și navigare client-side
    await page.goto("/");
    await page.getByRole("link", { name: /Vezi programele/ }).click();
    await expect(page).toHaveURL(/\/programe\/$/);
    expect(external).toEqual([]);
  });

  test("fiecare pagină are titlu cu numele din config, noindex și un singur h1", async ({ page }) => {
    for (const path of pages) {
      await page.goto(path);
      await expect(page).toHaveTitle(new RegExp(BUSINESS_NAME));
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(page.locator("h1")).toHaveCount(1);
    }
  });

  test("fără derulare orizontală și fără lărgirea ferestrei pe telefon", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (const path of pages) {
      await page.goto(path);
      await page.waitForTimeout(300);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
      // Pe telefon, un element prea lat ar „lărgi” fereastra (și ar muta bara fixă).
      expect(await page.evaluate(() => window.innerWidth), path).toBe(page.viewportSize()!.width);
    }
  });

  test("bara fixă de pe telefon", async ({ page, isMobile }) => {
    await page.goto("/");
    const bar = page.locator(".mobile-bar");
    if (isMobile) {
      await expect(bar).toBeVisible();
      await expect(bar.getByRole("link", { name: "Sună" })).toHaveAttribute("href", /^tel:/);
      await expect(bar.getByRole("link", { name: "Înscrie copilul" })).toHaveAttribute("href", "/inscriere/");
    } else {
      await expect(bar).toBeHidden();
    }
  });

  test("meniul de pe telefon se deschide, se închide cu Escape și după navigare", async ({ page, isMobile }) => {
    test.skip(!isMobile, "doar pe telefon");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Meniu" });
    await toggle.click();
    await expect(page.getByRole("navigation", { name: "Meniu mobil" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Meniu mobil" })).toBeHidden();
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page.getByRole("navigation", { name: "Meniu mobil" }).getByRole("link", { name: "Tabere" }).click();
    await expect(page).toHaveURL(/\/tabere\/$/);
    await expect(page.getByRole("navigation", { name: "Meniu mobil" })).toBeHidden();
  });

  test("linkul „Sari la conținut” e primul element focusabil", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Sari la conținut" })).toBeFocused();
  });

  test("pagina 404 e jucăușă și oferă drumul înapoi", async ({ page }) => {
    const res = await page.goto("/pagina-inexistenta/");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /te-ai rătăcit pe hartă/i })).toBeVisible();
    await page.getByRole("link", { name: "Acasă" }).last().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("mișcare redusă: salutul nu se schimbă și harta e desenată complet", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForTimeout(2200);
    await expect(page.locator(".greeting__words .is-on")).toHaveText("Bună!");
    await page.goto("/o-zi-la-club/");
    await expect(page.locator(".tmap")).toHaveAttribute("style", /--p: ?1/);
    await expect(page.locator(".tmap__stop.is-reached")).toHaveCount(8);
  });

  test("cu animații, salutul trece prin mai multe limbi fără să miște textul", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const h1 = page.locator("h1");
    const before = await h1.boundingBox();
    await expect(page.locator(".greeting__words .is-on")).not.toHaveText("Bună!", { timeout: 4000 });
    expect(await h1.boundingBox()).toEqual(before);
  });
});
