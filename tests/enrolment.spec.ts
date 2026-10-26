import { expect, test } from "@playwright/test";
import { fillChildAndParent, next } from "./helpers";

test.describe("Înscriere", () => {
  test("flux complet: rezultat onest în demo, fără nicio cerere trimisă", async ({ page }) => {
    const posts: string[] = [];
    page.on("request", (r) => {
      if (r.method() === "POST") posts.push(r.url());
    });
    await page.goto("/inscriere/");
    await fillChildAndParent(page);

    await expect(page.getByRole("heading", { name: "Programul" })).toBeVisible();
    await page.getByLabel("Programul sau tabăra").selectOption("program:engleza");
    await next(page);

    await page.getByLabel(/Alergii/).fill("Alergie la arahide");
    await page.getByLabel("Nume și prenume").fill("Ion Ionescu");
    await page.getByLabel("Relația cu copilul").fill("bunic");
    await page.getByLabel("Telefon").fill("0733 111 222");
    await page.getByRole("button", { name: "Adaugă o persoană" }).click();
    await expect(page.getByText("Persoana 2", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Șterge persoana 2" }).click();
    await next(page);

    await expect(page.getByRole("heading", { name: "Confirmare" })).toBeVisible();
    await expect(page.getByText("Maria Ionescu, 8 ani, Clubul Busolelor")).toBeVisible();
    await expect(page.getByText("Alergie la arahide")).toBeVisible();
    await page.getByRole("button", { name: "Trimite cererea" }).click();
    await expect(page.locator(".error-summary")).toContainText("Avem nevoie de acordul tău");

    await page.getByRole("checkbox", { name: /Sunt părintele/ }).check();
    await page.getByRole("button", { name: "Trimite cererea" }).click();
    await expect(page.getByRole("heading", { name: "Cererea e pregătită, mai e un pas" })).toBeVisible();
    await expect(page.getByText("cererea nu a fost trimisă nicăieri")).toBeVisible();
    await expect(page.getByRole("link", { name: /Sună la/ })).toHaveAttribute("href", /^tel:\+40/);
    await expect(page.getByRole("link", { name: "Trimite pe e-mail" })).toHaveAttribute("href", /^mailto:.*Maria%20Ionescu/);
    expect(posts).toEqual([]);
  });

  test("validare: rezumatul erorilor primește focusul și duce la câmp", async ({ page }) => {
    await page.goto("/inscriere/");
    await next(page);
    const summary = page.locator(".error-summary");
    await expect(summary).toBeFocused();
    await expect(summary).toContainText("Mai sunt 3 lucruri de completat");
    await expect(page.getByLabel("Numele și prenumele copilului")).toHaveAttribute("aria-invalid", "true");
    await summary.getByRole("link", { name: /Vârsta/ }).click();
    await expect(page.getByLabel("Vârsta")).toBeFocused();
  });

  test("vârsta alege singură grupa; telefonul și e-mailul greșite sunt semnalate", async ({ page }) => {
    await page.goto("/inscriere/");
    await page.getByLabel("Vârsta").selectOption("12");
    await expect(page.getByRole("radio", { name: /Clubul Telescoapelor/ })).toBeChecked();
    await page.getByLabel("Numele și prenumele copilului").fill("Tudor Pop");
    await next(page);
    await page.getByLabel("Numele tău").fill("Ioan Pop");
    await page.getByLabel("Telefon").fill("12345");
    await page.getByLabel("E-mail").fill("ioan@");
    await next(page);
    await expect(page.getByText("Scrie un număr de telefon românesc").first()).toBeVisible();
    await expect(page.getByText("Adresa de e-mail nu pare corectă").first()).toBeVisible();
  });

  test("programul nepotrivit vârstei e respins", async ({ page }) => {
    await page.goto("/inscriere/?alegere=program:robotica-si-programare");
    await fillChildAndParent(page, "5");
    await expect(page.getByLabel("Programul sau tabăra")).toHaveValue("program:robotica-si-programare");
    await next(page);
    await expect(page.locator(".error-summary")).toContainText("7–14 ani");
  });

  test("tabăra: perioada completă nu se poate alege, cea liberă da", async ({ page }) => {
    await page.goto("/inscriere/?alegere=tabara:laboratorul-inventatorilor");
    await fillChildAndParent(page, "9");
    await expect(page.getByRole("radio", { name: /28 iunie – 2 iulie 2027/ })).toBeDisabled();
    await next(page);
    await expect(page.locator(".error-summary")).toContainText("Alege săptămâna");
    await page.getByRole("radio", { name: /2–6 august 2027/ }).check();
    await next(page);
    await expect(page.getByRole("heading", { name: "Sănătate și preluare" })).toBeVisible();
  });

  test("butonul „Modifică” din confirmare duce înapoi la pasul potrivit", async ({ page }) => {
    await page.goto("/inscriere/?alegere=program:engleza");
    await fillChildAndParent(page);
    await next(page);
    await next(page);
    await page.getByRole("button", { name: "Modifică părintele" }).click();
    await expect(page.getByRole("heading", { name: "Părintele" })).toBeFocused();
    await expect(page.getByLabel("Numele tău")).toHaveValue("Ana Ionescu");
  });
});
