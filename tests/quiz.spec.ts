import { expect, test } from "@playwright/test";

test.describe("Chestionarul „Ce explorator ești?”", () => {
  test("răspunsurile de artist dau rezultatul Artistul, cu progres și recomandări", async ({ page }) => {
    await page.goto("/ce-explorator-esti/");
    await page.getByRole("button", { name: /Pornește în expediție/ }).click();
    const bar = page.getByRole("progressbar");
    await expect(bar).toHaveAttribute("aria-valuenow", "0");

    const picks = [/O pictez/, /Desenez sau construiesc/, /Să dau viață desenelor/, /Creioane colorate/, /vulpe jucăușă/, /spectacol/];
    for (const [i, name] of picks.entries()) {
      await expect(page.getByText(`Întrebarea ${i + 1} din 6`)).toBeVisible();
      await page.getByRole("button", { name }).click();
      if (i < picks.length - 1) await expect(bar).toHaveAttribute("aria-valuenow", String(i + 1));
    }
    await expect(page.getByRole("heading", { name: "Ești Artistul!" })).toBeVisible();
    await expect(bar).toHaveAttribute("aria-valuetext", "Gata!");
    await expect(page.getByRole("link", { name: /Arte și creație/ })).toBeVisible();

    await page.getByRole("button", { name: "Încearcă din nou" }).click();
    await expect(page.getByText("Întrebarea 1 din 6")).toBeVisible();
  });

  test("se poate reveni la întrebarea anterioară și se joacă din tastatură", async ({ page }) => {
    await page.goto("/ce-explorator-esti/");
    await page.getByRole("button", { name: /Pornește/ }).press("Enter");
    await page.getByRole("button", { name: /O desfac/ }).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText("Întrebarea 2 din 6")).toBeVisible();
    await page.getByRole("button", { name: "Întrebarea anterioară" }).click();
    await expect(page.getByRole("button", { name: /O desfac/ })).toHaveAttribute("aria-pressed", "true");
  });
});
