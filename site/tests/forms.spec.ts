import { test, expect } from "@playwright/test";

test.describe("Enquiry form", () => {
  test("full form on /contact submits and shows a confirmation", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name", { exact: false }).first().fill("QA Tester");
    await page.getByLabel("Email", { exact: false }).first().fill("qa@example.com");
    await page.getByLabel("Message", { exact: false }).fill("Automated Playwright test enquiry.");
    await page.getByRole("button", { name: "Send Enquiry" }).click();
    await expect(page.getByText("Thank you")).toBeVisible({ timeout: 10_000 });
  });

  test("required fields are enforced", async ({ page }) => {
    await page.goto("/contact");
    const email = page.getByLabel("Email", { exact: false }).first();
    await expect(email).toHaveAttribute("required", "");
    const name = page.getByLabel("Name", { exact: false }).first();
    await expect(name).toHaveAttribute("required", "");
  });

  test("product context is passed automatically via the Request Quote CTA", async ({ page }) => {
    await page.goto("/products/gates/sliding-gate");
    await page.getByRole("link", { name: /Request Quote for/ }).first().click();
    await expect(page).toHaveURL(/\/contact\?product=/);
    const productField = page.locator("#productInterest");
    await expect(productField).toHaveValue(/Sliding|Gate/i);
  });

  test("compact enquiry form on a product page pre-fills product context as a hidden field", async ({ page }) => {
    await page.goto("/products/gates/sliding-gate");
    await expect(page.getByText(/Enquiring about:/)).toBeVisible();
    const hidden = page.locator('input[name="productInterest"][type="hidden"]');
    await expect(hidden).toHaveCount(1);
  });

  test("honeypot field is present in the DOM but positioned off-screen from real users", async ({ page }) => {
    await page.goto("/contact");
    const honeypot = page.locator("#company_website");
    await expect(honeypot).toBeAttached();
    // Off-screen positioning (not display:none) is deliberate - some spam
    // bots skip fields hidden via display:none/visibility:hidden but still
    // fill in off-screen ones. Assert it's actually off-screen, not just
    // present.
    const box = await honeypot.boundingBox();
    expect(box).not.toBeNull();
    if (box) expect(box.x).toBeLessThan(0);
  });
});
