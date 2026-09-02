import { test, expect } from "@playwright/test";
import { CORE_ROUTES, CATEGORY_ROUTES, SAMPLE_PRODUCT_ROUTES } from "./helpers";

const ROUTES_TO_CHECK = [...CORE_ROUTES, ...CATEGORY_ROUTES, ...SAMPLE_PRODUCT_ROUTES];

test.describe("Per-route metadata", () => {
  const seenTitles = new Map<string, string>();

  for (const route of ROUTES_TO_CHECK) {
    test(`${route} has a unique title, description, and canonical`, async ({ page }) => {
      await page.goto(route);

      const title = await page.title();
      expect(title.length, "title should not be empty").toBeGreaterThan(0);
      expect(title.length, "title should be reasonably short").toBeLessThanOrEqual(70);

      const dupeRoute = seenTitles.get(title);
      expect(dupeRoute, `title "${title}" is duplicated on ${dupeRoute} and ${route}`).toBeUndefined();
      seenTitles.set(title, route);

      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description, `${route} is missing a meta description`).toBeTruthy();

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical, `${route} is missing a canonical tag`).toBeTruthy();
      expect(canonical).toMatch(/^https:\/\/www\.standardautomation\.in/);
    });
  }
});

test.describe("Structured data", () => {
  test("homepage has valid Organization and LocalBusiness JSON-LD with confirmed NAP", async ({ page }) => {
    await page.goto("/");
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const parsed = scripts.map((s) => JSON.parse(s));
    const org = parsed.find((d) => d["@type"] === "Organization");
    const biz = parsed.find((d) => d["@type"] === "LocalBusiness");
    expect(org, "Organization schema missing").toBeTruthy();
    expect(biz, "LocalBusiness schema missing").toBeTruthy();

    expect(biz.address.streetAddress).toContain("Business Square");
    expect(biz.telephone).toBe("+91 8888 100 280");
    expect(biz.email).toBe("sales@standardautomation.in");
  });

  test("product pages emit valid Product and BreadcrumbList JSON-LD with no offers/pricing", async ({ page }) => {
    await page.goto("/products/gates/sliding-gate");
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const parsed = scripts.map((s) => JSON.parse(s));

    const product = parsed.find((d) => d["@type"] === "Product");
    const breadcrumb = parsed.find((d) => d["@type"] === "BreadcrumbList");
    expect(product, "Product schema missing").toBeTruthy();
    expect(breadcrumb, "BreadcrumbList schema missing").toBeTruthy();
    expect(product.offers).toBeUndefined();
    expect(breadcrumb.itemListElement.length).toBeGreaterThanOrEqual(3);
  });

  test("no FAQPage schema is emitted anywhere (no real FAQ content exists yet)", async ({ page }) => {
    await page.goto("/products/gates/sliding-gate");
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const parsed = scripts.map((s) => JSON.parse(s));
    expect(parsed.find((d) => d["@type"] === "FAQPage")).toBeUndefined();
  });
});

test.describe("Site-wide crawl infrastructure", () => {
  test("sitemap.xml is served and lists real routes over HTTPS", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("https://www.standardautomation.in/products/rolling-shutters");
    expect(body).not.toContain("hotels-in-alibaug");
  });

  test("robots.txt allows crawling and points at the HTTPS sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap: https://www.standardautomation.in/sitemap.xml");
  });
});

test("Open Graph tags are present on the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:type"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_IN");
});

test("exactly one H1 and a logical heading hierarchy on the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  const headingLevels = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h1, h2, h3")).map((h) => Number(h.tagName[1]))
  );
  expect(headingLevels[0]).toBe(1);
});
