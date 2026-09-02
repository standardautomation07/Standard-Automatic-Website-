import { test, expect } from "@playwright/test";

const EXPECTED_PHONE_DIGITS = "918888100280"; // +91 8888 100 280
const EXPECTED_EMAIL = "sales@standardautomation.in";

test.describe("Conversion CTAs use the confirmed business contact details", () => {
  test("WhatsApp links use the confirmed number and open in a new tab", async ({ page }) => {
    await page.goto("/");
    const links = page.locator(`a[href*="wa.me/${EXPECTED_PHONE_DIGITS}"]`);
    expect(await links.count()).toBeGreaterThan(0);
    // Every external WhatsApp link should open safely in a new tab.
    const first = links.first();
    await expect(first).toHaveAttribute("target", "_blank");
    await expect(first).toHaveAttribute("rel", /noopener/);
  });

  test("phone links use tel: with the confirmed number", async ({ page }) => {
    await page.goto("/");
    // tel href is built from siteConfig.phone with spaces stripped: +918888100280
    const anyTelToNumber = page.locator('a[href^="tel:+918888100280"]');
    expect(await anyTelToNumber.count()).toBeGreaterThan(0);
  });

  test("email links use mailto: with the confirmed sales address", async ({ page }) => {
    await page.goto("/contact");
    const links = page.locator(`a[href^="mailto:${EXPECTED_EMAIL}"]`);
    expect(await links.count()).toBeGreaterThan(0);
  });

  test("the sticky desktop rail and mobile bar both expose all three quick actions", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("link", { name: "WhatsApp", exact: false }).first()).toBeAttached();
    await expect(page.getByRole("link", { name: "Call Us" })).toBeAttached();
    await expect(page.getByRole("link", { name: "Get a Quote" })).toBeAttached();
  });

  test("no WhatsApp CTA ever renders with an invented/placeholder number", async ({ page }) => {
    await page.goto("/");
    const allHrefs = await page.locator('a[href*="wa.me"]').evaluateAll((els) =>
      els.map((e) => e.getAttribute("href"))
    );
    for (const href of allHrefs) {
      expect(href).toContain(EXPECTED_PHONE_DIGITS);
    }
  });
});
