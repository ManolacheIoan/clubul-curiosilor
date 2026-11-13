import { expect, test } from "@playwright/test";
import { site } from "../config/site";
import { rooms } from "../data/spaces";

test.describe("Calendar", () => {
  test("evenimentele trecute dispar după data din browser", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2027-03-20T10:00:00"));
    await page.goto("/calendar/");
    const months = page.locator(".events__month");
    await expect(months.first()).toHaveText("Martie 2027");
    await expect(page.getByRole("heading", { name: "Spectacolul de iarnă" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Festivalul exploratorilor" })).toBeVisible();
  });

  test("fără evenimente viitoare apare un mesaj, nu o pagină goală", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2028-01-01T10:00:00"));
    await page.goto("/calendar/");
    await expect(page.getByText("Momentan nu avem evenimente anunțate")).toBeVisible();
  });

  test("„Adaugă în calendar” descarcă un fișier .ics complet", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-11-13T10:00:00"));
    await page.goto("/calendar/");
    const link = page.locator("#porti-deschise-toamna").getByRole("link", { name: /Adaugă în calendar/ });
    await expect(link).toHaveAttribute("download", "porti-deschise-toamna.ics");
    const ics = decodeURIComponent((await link.getAttribute("href"))!.split(",")[1]);
    expect(ics).toContain("DTSTART:20261121T100000");
    expect(ics).toContain("END:VCALENDAR");
  });

  test("pagina principală arată cel mult 3 evenimente și duce la calendar", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-11-13T10:00:00"));
    await page.goto("/");
    const section = page.locator("section", { has: page.getByRole("heading", { name: "Ce urmează la Club" }) });
    await expect(section.locator(".event")).toHaveCount(3);
    await section.getByRole("link", { name: /Tot calendarul/ }).click();
    await expect(page).toHaveURL(/\/calendar\/$/);
  });
});

test.describe("Termeni și subsol", () => {
  test("subsolul are datele firmei și legăturile ANPC", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator(".site-footer");
    await expect(footer).toContainText(`CUI ${site.legal.cui}`);
    await expect(footer.getByRole("link", { name: "ANPC", exact: true })).toHaveAttribute("href", site.legal.anpcUrl);
    await expect(footer.getByRole("link", { name: /ANPC – SAL/ })).toHaveAttribute("href", site.legal.anpcSalUrl);
  });

  test("termenii trimit spre prețuri și siguranță", async ({ page }) => {
    await page.goto("/termeni/");
    await page.locator("article").getByRole("link", { name: "Prețuri" }).click();
    await expect(page).toHaveURL(/\/preturi\/$/);
  });
});

test("Spațiul nostru: toate încăperile, fiecare cu desen și trei detalii", async ({ page }) => {
  await page.goto("/spatiul-nostru/");
  await expect(page.locator(".room")).toHaveCount(rooms.length);
  for (const r of rooms) {
    const card = page.locator(".room", { has: page.getByRole("heading", { name: r.name, exact: true }) });
    await expect(card.locator(".room__art")).toBeVisible();
    await expect(card.locator(".checklist li")).toHaveCount(3);
  }
});
