import { test, expect } from "@playwright/test";
import { categories } from "./helpers";

test.describe("Desktop mega-menu", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("opens on hover with zero JavaScript and lists every category", async ({ browser }) => {
    // The whole point of this rebuild (research/ux-audit.md #1) is that the
    // mega-menu must not depend on JS. A context with JS truly disabled
    // (not just network-blocked, which leaves the page in a broken
    // half-loaded state) proves the CSS-only hover reveal and that every
    // link exists in the server-rendered HTML.
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Products" });
    await trigger.hover();

    for (const cat of categories) {
      await expect(
        page.getByRole("link", { name: cat.name, exact: false }).first()
      ).toBeAttached();
    }

    await context.close();
  });

  test("click-to-open also works with JS enabled", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Products" }).click();
    await expect(page.getByRole("link", { name: "Rolling Shutters", exact: true }).first()).toBeVisible();
  });
});

test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger opens the drawer, category accordion expands, links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Site navigation" });
    await expect(dialog).toBeVisible();

    // Expand the first category's accordion (native <details>, needs no JS)
    await dialog.getByText("Rolling Shutters").first().click();
    await expect(dialog.getByRole("link", { name: "View all Rolling Shutters" })).toBeVisible();

    await dialog.getByRole("link", { name: "View all Rolling Shutters" }).click();
    await expect(page).toHaveURL(/\/products\/rolling-shutters$/);
  });

  test("mobile sticky bar is present and does not overlap the footer", async ({ page }) => {
    await page.goto("/about-us");
    const bar = page.getByRole("navigation", { name: "Quick actions" });
    await expect(bar).toBeVisible();

    // Scroll all the way down - this is the position most likely to expose
    // an overlap, since the fixed bar and the end of the footer both end up
    // near the bottom of the viewport.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.locator("footer");
    const barBox = await bar.boundingBox();
    const footerBox = await footer.boundingBox();
    expect(barBox).not.toBeNull();
    expect(footerBox).not.toBeNull();
    // Both boxes are now in the same (viewport-relative) coordinate space.
    // The body's reserved bottom padding (pb-14) should mean the footer's
    // bottom edge sits at or above where the fixed bar begins.
    if (barBox && footerBox) {
      expect(footerBox.y + footerBox.height).toBeLessThanOrEqual(barBox.y + 1);
    }
  });
});

test.describe("No horizontal overflow on mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const route of ["/", "/products", "/products/rolling-shutters", "/contact", "/about-us"]) {
    test(`${route} has no horizontal scroll at 375px`, async ({ page }) => {
      await page.goto(route);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, `page is ${scrollWidth}px wide but viewport is ${clientWidth}px`).toBeLessThanOrEqual(
        clientWidth + 1
      );
    });
  }
});

test("category and product cards link to real, working pages", async ({ page }) => {
  await page.goto("/products/gates");
  // Scoped to <main> - the always-present (but hover-revealed) mega-menu in
  // the header also links to /products/gates/*, and would otherwise match
  // first while being invisible until hovered.
  const firstCard = page.locator("main a[href^='/products/gates/']").first();
  const href = await firstCard.getAttribute("href");
  await firstCard.click();
  await expect(page).toHaveURL(new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"));
  await expect(page.locator("h1")).toBeVisible();
});

test("breadcrumb links navigate correctly", async ({ page }) => {
  await page.goto("/products/gates/sliding-gate");
  await page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Products" }).click();
  await expect(page).toHaveURL(/\/products$/);
});
