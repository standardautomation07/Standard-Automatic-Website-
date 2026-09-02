import { test, expect } from "@playwright/test";
import { CORE_ROUTES, CATEGORY_ROUTES, ALL_PRODUCT_ROUTES } from "./helpers";

test.describe("Core pages load with exactly one H1 and no console errors", () => {
  for (const route of CORE_ROUTES) {
    test(`${route} loads correctly`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (err) => errors.push(err.message));

      const response = await page.goto(route);
      expect(response?.status(), `${route} should return 200`).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(errors, `console errors on ${route}: ${errors.join("; ")}`).toEqual([]);
    });
  }
});

test.describe("Every category page loads with exactly one H1", () => {
  for (const route of CATEGORY_ROUTES) {
    test(`${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("nav[aria-label=Breadcrumb]")).toBeVisible();
    });
  }
});

test.describe("Every product page loads with exactly one H1 (full catalogue smoke test)", () => {
  for (const route of ALL_PRODUCT_ROUTES) {
    test(`${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }
});

test("unknown routes return a real 404, not a redirect to home", async ({ page }) => {
  const response = await page.goto("/products/rolling-shutters/this-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("Page Not Found")).toBeVisible();
});

test("hotels-in-alibaug.html is retired, not redirected anywhere", async ({ page }) => {
  const response = await page.goto("/hotels-in-alibaug.html");
  expect(response?.status()).toBe(404);
  expect(page.url()).toContain("/hotels-in-alibaug.html");
});
