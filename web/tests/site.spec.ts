import { expect, test, type Page } from "@playwright/test";

const NAV_LINKS = [
  { label: "Industries", path: "/industries" },
  { label: "Projects", path: "/projects" },
  { label: "Resources", path: "/resources" },
  { label: "Service & Support", path: "/service-support" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const FAMILIES = [
  "high-speed-doors",
  "industrial-doors",
  "rolling-shutters",
  "fire-safety-doors",
  "automatic-gates",
  "entrance-automation",
  "loading-bay",
  "access-control",
];

const INDUSTRIES = [
  "manufacturing",
  "warehousing-logistics",
  "cold-chain-food",
  "pharmaceutical-cleanroom",
  "automotive",
  "retail-commercial",
  "healthcare",
  "infrastructure-transit",
];

const SAMPLE_PRODUCTS = [
  "/products/high-speed-doors/high-speed-roll-up-doors",
  "/products/industrial-doors/industrial-sectional-overhead-doors",
  "/products/rolling-shutters/polycarbonate-rolling-shutters",
  "/products/fire-safety-doors/fire-rated-rolling-shutters",
  "/products/automatic-gates/retractable-gates",
  "/products/entrance-automation/automatic-sliding-glass-doors",
  "/products/loading-bay/dock-levellers",
  "/products/access-control/tripod-turnstiles",
];

const isDesktop = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024;

/**
 * Next.js streams the page before React hydrates, so a click fired the
 * instant navigation resolves can land on markup with no listener attached
 * yet. Retry the click until the expected effect is observable.
 */
async function clickUntil(locator: ReturnType<Page["locator"]>, assert: () => Promise<void>) {
  await expect(async () => {
    await locator.click();
    await assert();
  }).toPass({ timeout: 15_000 });
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(overflow.scroll).toBeLessThanOrEqual(overflow.client + 1);
}

test.describe("page loads and SEO head", () => {
  const pages = [
    "/",
    "/products",
    "/products/catalogue",
    "/industries",
    "/service-support",
    "/resources",
    "/about",
    "/contact",
    "/projects",
    "/products/high-speed-doors",
    "/products/high-speed-doors/high-speed-roll-up-doors",
    "/industries/manufacturing",
  ];

  for (const path of pages) {
    test(`${path} loads with title, description, canonical and one h1`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);

      await expect(page).toHaveTitle(/.{10,}/);

      const description = page.locator('head meta[name="description"]');
      await expect(description).toHaveCount(1);
      expect((await description.getAttribute("content"))?.length ?? 0).toBeGreaterThan(50);

      const canonical = page.locator('head link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      expect(await canonical.getAttribute("href")).toContain("standardautomation.in");

      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("product page emits Product and BreadcrumbList structured data", async ({ page }) => {
    await page.goto("/products/high-speed-doors/high-speed-roll-up-doors");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = blocks.map((block) => JSON.parse(block)["@type"]);
    expect(types).toContain("Product");
    expect(types).toContain("BreadcrumbList");

    const product = blocks.map((b) => JSON.parse(b)).find((b) => b["@type"] === "Product");
    // No prices, ratings or reviews exist, so none may be claimed.
    expect(product.offers).toBeUndefined();
    expect(product.aggregateRating).toBeUndefined();
    expect(product.review).toBeUndefined();
    expect(product.additionalProperty.length).toBeGreaterThan(5);
  });

  test("family page emits CollectionPage structured data", async ({ page }) => {
    await page.goto("/products/rolling-shutters");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = blocks.map((block) => JSON.parse(block)["@type"]);
    expect(types).toContain("CollectionPage");
  });
});

test.describe("navigation", () => {
  test("desktop products mega-menu opens and links to a family", async ({ page }) => {
    test.skip(!isDesktop(page), "desktop-only navigation");
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Products" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await clickUntil(trigger, async () => {
      await expect(trigger).toHaveAttribute("aria-expanded", "true", { timeout: 1000 });
    });

    // Scope the click to the panel. The same link text also appears in the
    // footer, and at laptop widths the footer sits under the fixed action bar,
    // so an unscoped locator clicked the wrong one and then timed out.
    const panelId = await trigger.getAttribute("aria-controls");
    await page.locator(`#${panelId} a[href="/products/loading-bay"]`).click();
    await expect(page).toHaveURL(/\/products\/loading-bay$/);
  });

  test("mega-menu lists every family", async ({ page }) => {
    test.skip(!isDesktop(page), "desktop-only navigation");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Products" });
    await clickUntil(trigger, async () => {
      await expect(trigger).toHaveAttribute("aria-expanded", "true", { timeout: 1000 });
    });
    for (const family of FAMILIES) {
      await expect(page.locator(`#${await trigger.getAttribute("aria-controls")} a[href="/products/${family}"]`)).toHaveCount(1);
    }
  });

  test("escape closes the mega-menu", async ({ page }) => {
    test.skip(!isDesktop(page), "desktop-only navigation");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Products" });
    await clickUntil(trigger, async () => {
      await expect(trigger).toHaveAttribute("aria-expanded", "true", { timeout: 1000 });
    });
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile drawer opens, expands products and closes", async ({ page }) => {
    test.skip(isDesktop(page), "mobile-only navigation");
    await page.goto("/");

    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await clickUntil(page.getByRole("button", { name: "Open menu" }), async () => {
      await expect(mobileNav).toBeVisible({ timeout: 1000 });
    });

    await clickUntil(mobileNav.getByRole("button", { name: "Products" }), async () => {
      await expect(mobileNav.getByRole("link", { name: "Rolling Shutters" })).toBeVisible({
        timeout: 1000,
      });
    });

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(mobileNav).toBeHidden();
  });

  for (const link of NAV_LINKS) {
    test(`primary nav link "${link.label}" reaches ${link.path}`, async ({ page }) => {
      await page.goto("/");

      if (isDesktop(page)) {
        await page
          .getByRole("navigation", { name: "Primary" })
          .getByRole("link", { name: link.label, exact: true })
          .click();
      } else {
        const mobileNav = page.getByRole("navigation", { name: "Mobile" });
        await clickUntil(page.getByRole("button", { name: "Open menu" }), async () => {
          await expect(mobileNav).toBeVisible({ timeout: 1000 });
        });
        await mobileNav.getByRole("link", { name: link.label, exact: true }).click();
      }

      await expect(page).toHaveURL(new RegExp(`${link.path}$`));
      await expect(page.locator("h1")).toBeVisible();
    });
  }
});

test.describe("catalogue hierarchy", () => {
  test("products landing shows nine families, not a flat product grid", async ({ page }) => {
    await page.goto("/products");
    for (const family of FAMILIES) {
      // Scoped to main: the header mega-menu holds the same hrefs but is
      // collapsed, so an unscoped locator matched a hidden link.
      await expect(page.locator(`main a[href="/products/${family}"]`).first()).toBeVisible();
    }
    // A flat grid of every product would be far more than nine cards.
    expect(await page.locator("article").count()).toBe(FAMILIES.length);
  });

  for (const family of FAMILIES) {
    test(`family page /products/${family} renders categories and products`, async ({ page }) => {
      const response = await page.goto(`/products/${family}`);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("article").first()).toBeVisible();
      // The comparison table proves the family level is rendering its children.
      await expect(page.getByRole("table")).toBeVisible();
    });
  }

  for (const path of SAMPLE_PRODUCTS) {
    test(`product page ${path} renders the full template`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.getByRole("heading", { name: /Key benefits|What this product gets you/i }).first()).toBeVisible();
      await expect(page.getByText("Applications", { exact: false }).first()).toBeVisible();
      await expect(page.locator("#enquiry")).toBeAttached();
    });
  }

  test("specifications are grouped into multiple tables", async ({ page }) => {
    await page.goto("/products/loading-bay/dock-levellers");
    expect(await page.getByRole("table").count()).toBeGreaterThan(3);
    await expect(page.getByText("Working range above dock")).toBeVisible();
  });

  test("a product with no supplied figures still shows the full field list, marked to be confirmed", async ({ page }) => {
    await page.goto("/products/access-control/tripod-turnstiles");
    await expect(page.getByRole("table").first()).toBeVisible();
    await expect(page.getByText("0 of 29 fields published")).toBeVisible();
    // Every row is unanswered, and none of them invents a number.
    expect(await page.getByText("To be confirmed", { exact: false }).count()).toBeGreaterThan(20);
  });

  test("a product with supplied figures shows them alongside the unanswered fields", async ({ page }) => {
    await page.goto("/products/loading-bay/dock-levellers");
    await expect(page.getByText(/\d+ of \d+ fields published/)).toBeVisible();
    await expect(page.getByText("725–750 mm")).toBeVisible();
    await expect(page.getByText("To be confirmed", { exact: false }).first()).toBeVisible();
  });

  test("variants render with their configuration notes", async ({ page }) => {
    await page.goto("/products/industrial-doors/industrial-sectional-overhead-doors");
    await expect(page.getByRole("heading", { name: "Available configurations" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Low headroom" })).toBeVisible();
  });

  test("a POTENTIAL product is shown with a visible marker, not hidden", async ({ page }) => {
    await page.goto("/products/access-control/boom-barriers");
    await expect(page.getByText("To be confirmed").first()).toBeVisible();
  });

  test("catalogue filters by family, industry, environment and search", async ({ page }) => {
    await page.goto("/products/catalogue");

    const cards = page.locator("article");
    await expect(cards).toHaveCount(28);

    await clickUntil(page.getByRole("button", { name: /^Loading Bay/ }), async () => {
      await expect(cards).toHaveCount(2, { timeout: 1000 });
    });
    await clickUntil(page.getByRole("button", { name: /^All/ }), async () => {
      await expect(cards).toHaveCount(28, { timeout: 1000 });
    });

    await page.getByLabel("Industry").selectOption("cold-chain-food");
    expect(await cards.count()).toBeLessThan(28);
    await page.getByLabel("Industry").selectOption("all");

    await page.getByLabel("Operating environment").selectOption("fire");
    expect(await cards.count()).toBeGreaterThan(0);
    expect(await cards.count()).toBeLessThan(28);
    await page.getByLabel("Operating environment").selectOption("all");

    await page.getByLabel("Search products").fill("turnstile");
    expect(await cards.count()).toBeGreaterThan(0);
    await page.getByLabel("Search products").fill("zzzznotaproduct");
    await expect(page.getByText("Nothing matches that combination.")).toBeVisible();
  });
});

test.describe("industries", () => {
  for (const industry of INDUSTRIES) {
    test(`industry page /industries/${industry} loads with recommendations`, async ({ page }) => {
      const response = await page.goto(`/industries/${industry}`);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("article").first()).toBeVisible();
      // "Engineering considerations" is the section eyebrow, not the heading —
      // assert both the label and the heading it introduces.
      await expect(page.getByText("Engineering considerations")).toBeVisible();
      await expect(
        page.getByRole("heading", { name: /What to settle before you order/i }),
      ).toBeVisible();
    });
  }
});

test.describe("conversion routes", () => {
  test("phone, WhatsApp and email links are present and correctly formed", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href^="tel:"]').first()).toHaveAttribute("href", "tel:+918888100280");
    await expect(page.locator('a[href*="wa.me"]').first()).toHaveAttribute("href", /wa\.me\/918888100280/);
    await expect(page.locator('a[href^="mailto:sales@standardautomation.in"]').first()).toHaveCount(1);
  });

  test("product page CTA reaches the on-page engineering enquiry", async ({ page }) => {
    await page.goto("/products/loading-bay/dock-levellers");
    await page.locator("main").getByRole("link", { name: "Request a Quote" }).first().click();
    await expect(page).toHaveURL(/#enquiry$/);
    await expect(page.getByLabel(/Product or solution/)).toHaveValue("dock-levellers");
  });
});

test.describe("engineering enquiry form", () => {
  test("asks for width, height, application, location and usage", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel("Clear width")).toBeVisible();
    await expect(page.getByLabel("Clear height")).toBeVisible();
    await expect(page.getByLabel("Application")).toBeVisible();
    await expect(page.getByLabel("Site location")).toBeVisible();
    await expect(page.getByLabel("Usage")).toBeVisible();
  });

  test("rejects an empty submission with field errors", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter a phone number we can reach you on.")).toBeVisible();
  });

  test("rejects a malformed email and phone", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name", { exact: false }).fill("Test Person");
    await page.getByLabel("Phone", { exact: false }).fill("123");
    await page.getByLabel("Email", { exact: false }).fill("not-an-email");
    await page.getByLabel("Message", { exact: false }).fill("We need a high speed door for a busy bay.");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText("That does not look like a valid phone number.")).toBeVisible();
    await expect(page.getByText("That does not look like a valid email address.")).toBeVisible();
  });

  test("accepts a valid submission and reports delivery state honestly", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name", { exact: false }).fill("Test Person");
    await page.getByLabel("Phone", { exact: false }).fill("9876543210");
    await page.getByLabel("Email", { exact: false }).fill("test@example.com");
    await page.getByLabel("Clear width").fill("4200 mm");
    await page.getByLabel("Clear height").fill("4000 mm");
    await page.getByLabel("Usage").selectOption("heavy");
    await page.getByLabel("Message", { exact: false }).fill("High speed door for a busy dispatch bay.");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText("Thank you — we have your enquiry.")).toBeVisible();
  });
});

test.describe("assets, layout and links", () => {
  const pages = [
    "/",
    "/products",
    "/products/catalogue",
    "/products/rolling-shutters",
    "/products/loading-bay/dock-levellers",
    "/industries/manufacturing",
  ];

  for (const path of pages) {
    test(`${path} loads every image and has no horizontal overflow`, async ({ page }) => {
      const failed: string[] = [];
      page.on("response", (response) => {
        if (response.request().resourceType() === "image" && response.status() >= 400) {
          failed.push(`${response.status()} ${response.url()}`);
        }
      });

      await page.goto(path);
      await page.evaluate(() => {
        for (const img of document.querySelectorAll("img")) img.loading = "eager";
      });
      await expect
        .poll(
          () =>
            page.evaluate(
              () => [...document.querySelectorAll("img")].filter((img) => !img.complete).length,
            ),
          { timeout: 30_000 },
        )
        .toBe(0);

      expect(failed, `broken images on ${path}`).toEqual([]);
      await expectNoHorizontalOverflow(page);
    });
  }

  test("internal links on the products landing page all resolve", async ({ page, request }) => {
    test.skip(!isDesktop(page), "run once, on desktop");
    await page.goto("/products");
    const hrefs = await page.evaluate(() => [
      ...new Set(
        [...document.querySelectorAll("a[href]")]
          .map((a) => a.getAttribute("href") ?? "")
          .filter((href) => href.startsWith("/")),
      ),
    ]);
    expect(hrefs.length).toBeGreaterThan(20);
    for (const href of hrefs) {
      const response = await request.get(href.split("#")[0]);
      expect(response.status(), `${href} returned ${response.status()}`).toBeLessThan(400);
    }
  });

  test("retired legacy URL still 404s and is not redirected", async ({ request }) => {
    const response = await request.get("/hotels-in-alibaug.html", { maxRedirects: 0 });
    expect(response.status()).toBe(404);
  });

  test("legacy product URLs redirect into the new hierarchy", async ({ request }) => {
    const cases: [string, string][] = [
      ["/m-s-rolling-shutters.html", "/products/rolling-shutters/galvanized-steel-rolling-shutters"],
      ["/high-speed-door.html", "/products/high-speed-doors/high-speed-roll-up-doors"],
      ["/fire-proof-rolling-shutters.html", "/products/fire-safety-doors/fire-rated-rolling-shutters"],
      ["/sliding-gate-motor.html", "/products/automatic-gates"],
    ];
    for (const [from, to] of cases) {
      const response = await request.get(from, { maxRedirects: 0 });
      expect([301, 308]).toContain(response.status());
      expect(response.headers()["location"]).toContain(to);
    }
  });

  test("sitemap lists families, products and industries but not /projects", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    expect(body).toContain("/products/high-speed-doors/high-speed-roll-up-doors");
    expect(body).toContain("/industries/manufacturing");
    expect(body).not.toContain("/projects");
  });
});

test.describe("accessibility basics", () => {
  test("skip link is the first focusable element", async ({ page }) => {
    test.skip(!isDesktop(page), "keyboard test, desktop only");
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("every image has an alt attribute", async ({ page }) => {
    await page.goto("/products/catalogue");
    const missing = await page.evaluate(
      () => [...document.querySelectorAll("img")].filter((img) => img.getAttribute("alt") === null).length,
    );
    expect(missing).toBe(0);
  });

  test("headings do not skip a level on a product page", async ({ page }) => {
    await page.goto("/products/high-speed-doors/high-speed-roll-up-doors");
    const levels = await page.evaluate(() =>
      [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => Number(h.tagName[1])),
    );
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
});
