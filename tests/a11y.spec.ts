import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { fillChildAndParent, next, pages } from "./helpers";

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const audit = async (page: Page) =>
  (await new AxeBuilder({ page }).withTags(tags).analyze()).violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`,
  );

test.use({ reducedMotion: "reduce" });

for (const path of [...pages, "/pagina-inexistenta/"]) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(await audit(page)).toEqual([]);
  });
}

test("axe: înscriere cu erori, pe fiecare pas și la rezultat", async ({ page }) => {
  await page.goto("/inscriere/?alegere=tabara:micii-arheologi");
  await next(page);
  expect(await audit(page)).toEqual([]);
  await fillChildAndParent(page);
  await next(page);
  expect(await audit(page)).toEqual([]);
  await page.getByRole("radio", { name: /19–23 iulie/ }).check();
  await next(page);
  await page.getByRole("button", { name: "Adaugă o persoană" }).click();
  await next(page);
  expect(await audit(page)).toEqual([]);
  await page.getByRole("button", { name: "Șterge persoana 2" }).click();
  await next(page);
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  await expect(page.getByRole("heading", { name: /Cererea e pregătită/ })).toBeVisible();
  expect(await audit(page)).toEqual([]);
});

test("axe: programe fără rezultate și rezultatul chestionarului", async ({ page }) => {
  await page.goto("/programe/?varsta=4-6&domeniu=tehnologie");
  await expect(page.getByRole("heading", { name: /Nicio misiune/ })).toBeVisible();
  expect(await audit(page)).toEqual([]);

  await page.goto("/ce-explorator-esti/");
  await page.getByRole("button", { name: /Pornește/ }).click();
  for (let i = 0; i < 6; i++) await page.locator(".quiz__answer").first().click();
  await expect(page.getByRole("heading", { name: /^Ești/ })).toBeVisible();
  expect(await audit(page)).toEqual([]);
});

test("axe: meniul deschis pe telefon", async ({ page, isMobile }) => {
  test.skip(!isMobile, "doar pe telefon");
  await page.goto("/");
  await page.getByRole("button", { name: "Meniu" }).click();
  expect(await audit(page)).toEqual([]);
});
