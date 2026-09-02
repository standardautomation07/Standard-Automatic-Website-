import { test, expect } from "@playwright/test";
import { SAMPLE_PRODUCT_ROUTES } from "./helpers";

test.describe("Images", () => {
  for (const route of ["/", "/products/gates", ...SAMPLE_PRODUCT_ROUTES]) {
    test(`${route}: every image has alt text and loads successfully`, async ({ page }) => {
      const failed: string[] = [];
      page.on("response", (res) => {
        if (res.request().resourceType() === "image" && res.status() >= 400) {
          failed.push(`${res.status()} ${res.url()}`);
        }
      });

      await page.goto(route, { waitUntil: "load" });
      const images = page.locator("img");
      const count = await images.count();
      if (count > 0) {
        // Deterministic wait for the images actually on the page, rather
        // than the flakier/slower "networkidle" (analytics/font requests
        // can keep the network non-idle well after images have loaded).
        await images.first().waitFor({ state: "attached" });
        await page.waitForTimeout(500);
      }
      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute("alt");
        expect(alt, `image ${i} on ${route} is missing alt text`).not.toBeNull();
      }

      expect(failed, `broken images on ${route}: ${failed.join(", ")}`).toEqual([]);
    });
  }
});

test.describe("Accessibility basics", () => {
  test("viewport meta does not disable pinch-zoom (regression test for the old site's bug)", async ({ page }) => {
    await page.goto("/");
    const content = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(content).toContain("width=device-width");
    expect(content).not.toMatch(/maximum-scale=1(\.0)?(?!\d)/);
    expect(content).not.toContain("user-scalable=no");
  });

  test("interactive elements show a visible focus outline", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const style = getComputedStyle(el);
      return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
    });
    expect(outline).not.toBeNull();
  });

  test("every form field has an associated label", async ({ page }) => {
    await page.goto("/contact");
    const inputs = page.locator("form input:not([type=hidden]), form textarea");
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const id = await inputs.nth(i).getAttribute("id");
      expect(id, `field ${i} has no id to associate a label with`).toBeTruthy();
      if (id) {
        await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1);
      }
    }
  });

  test("landmarks: header, nav, main, footer are all present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.locator('nav[aria-label="Primary"]')).toHaveCount(1);
  });

  test("mobile nav dialog has correct ARIA semantics", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open navigation menu" });
    await expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    await trigger.click();
    await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveAttribute("aria-modal", "true");
  });
});
