import { expect, test, type Page } from "@playwright/test";

const NAV_LINKS = [
  { label: "Products", path: "/products" },
  { label: "Industries", path: "/industries" },
  { label: "Projects", path: "/projects" },
  { label: "Resources", path: "/resources" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const CATEGORIES = [
  "entrance-automation",
  "industrial-doors",
  "rolling-shutters",
  "loading-bay",
  "security-access",
  "motors-accessories",
];

const SAMPLE_PRODUCTS = [
  "/products/industrial-doors/high-speed-roll-up-doors",
  "/products/entrance-automation/automatic-sliding-gates",
  "/products/rolling-shutters/polycarbonate-rolling-shutters",
  "/products/loading-bay/dock-levellers",
  "/products/security-access/flap-barriers",
  "/products/motors-accessories/tubular-motor",
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
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return { scroll: doc.scrollWidth, client: doc.clientWidth };
  });
  // 1px of tolerance for sub-pixel rounding.
  expect(overflow.scroll).toBeLessThanOrEqual(overflow.client + 1);
}

test.describe("page loads and SEO head", () => {
  const pages = ["/", "/products", "/industries", "/resources", "/about", "/contact", "/projects"];

  for (const path of pages) {
    test(`${path} loads with title, description and canonical`, async ({ page }) => {
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
});

test.describe("navigation", () => {
  test("desktop solutions flyout opens and links to a category", async ({ page }) => {
    test.skip(!isDesktop(page), "desktop-only navigation");
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Solutions" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await clickUntil(trigger, async () => {
      await expect(trigger).toHaveAttribute("aria-expanded", "true", { timeout: 1000 });
    });

    const flyoutLink = page.getByRole("link", { name: "Entrance Automation", exact: false }).first();
    await flyoutLink.click();
    await expect(page).toHaveURL(/\/products\/entrance-automation$/);
  });

  test("escape closes the desktop flyout", async ({ page }) => {
    test.skip(!isDesktop(page), "desktop-only navigation");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Solutions" });
    await clickUntil(trigger, async () => {
      await expect(trigger).toHaveAttribute("aria-expanded", "true", { timeout: 1000 });
    });
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile drawer opens, exposes solutions and closes", async ({ page }) => {
    test.skip(isDesktop(page), "mobile-only navigation");
    await page.goto("/");

    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await clickUntil(page.getByRole("button", { name: "Open menu" }), async () => {
      await expect(mobileNav).toBeVisible({ timeout: 1000 });
    });

    await clickUntil(mobileNav.getByRole("button", { name: "Solutions" }), async () => {
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

test.describe("product catalogue", () => {
  test("product index lists every product and filters", async ({ page }) => {
    await page.goto("/products");

    const cards = page.locator("article");
    await expect(cards).toHaveCount(40);

    await clickUntil(page.getByRole("button", { name: /^Loading Bay/ }), async () => {
      await expect(cards).toHaveCount(2, { timeout: 1000 });
    });

    await clickUntil(page.getByRole("button", { name: /^All/ }), async () => {
      await expect(cards).toHaveCount(40, { timeout: 1000 });
    });
    await page.getByLabel("Search products").fill("turnstile");
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeLessThan(40);

    await page.getByLabel("Search products").fill("zzzznotaproduct");
    await expect(page.getByText("No products match that search.")).toBeVisible();
  });

  for (const slug of CATEGORIES) {
    test(`category page /products/${slug} loads`, async ({ page }) => {
      const response = await page.goto(`/products/${slug}`);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("article").first()).toBeVisible();
    });
  }

  for (const path of SAMPLE_PRODUCTS) {
    test(`product page ${path} loads with CTA`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();

      const quote = page.locator("main").getByRole("link", { name: "Request a Quote" }).first();
      await expect(quote).toBeVisible();
      await quote.click();
      await expect(page).toHaveURL(/\/contact\?product=/);
      await expect(page.getByLabel(/Product or solution/)).toBeVisible();
    });
  }

  test("product page preselects the product on the enquiry form", async ({ page }) => {
    await page.goto("/products/loading-bay/dock-levellers");
    await page.locator("main").getByRole("link", { name: "Request a Quote" }).first().click();
    await expect(page.getByLabel(/Product or solution/)).toHaveValue("dock-levellers");
  });
});

test.describe("conversion routes", () => {
  test("phone and WhatsApp links are present and correctly formed", async ({ page }) => {
    await page.goto("/");

    const tel = page.locator('a[href^="tel:"]').first();
    await expect(tel).toHaveAttribute("href", "tel:+918888100280");

    const whatsapp = page.locator('a[href*="wa.me"]').first();
    await expect(whatsapp).toHaveAttribute("href", /wa\.me\/918888100280/);
  });

  test("mailto link is present in the footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href^="mailto:sales@standardautomation.in"]').first()).toHaveCount(1);
  });
});

test.describe("enquiry form", () => {
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
    await page.getByLabel("Message", { exact: false }).fill("We need a high speed door for a busy dispatch bay.");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(page.getByText("Thank you — we have your enquiry.")).toBeVisible();
  });
});

test.describe("assets and layout", () => {
  const pages = ["/", "/products", "/products/rolling-shutters", "/products/loading-bay/dock-levellers"];

  for (const path of pages) {
    test(`${path} loads every image and has no horizontal overflow`, async ({ page }) => {
      const failed: string[] = [];
      page.on("response", (response) => {
        if (response.request().resourceType() === "image" && response.status() >= 400) {
          failed.push(`${response.status()} ${response.url()}`);
        }
      });

      // Not `networkidle`: the App Router keeps prefetching route payloads in
      // the background, so the network never actually goes idle. Instead,
      // promote every lazy image to eager so the whole page's imagery is
      // actually fetched, then wait for all of it to settle.
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

      const broken = await page.evaluate(() =>
        [...document.querySelectorAll("img")]
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src),
      );
      expect(broken, `images that failed to decode on ${path}`).toEqual([]);

      await expectNoHorizontalOverflow(page);
    });
  }

  test("internal links on the homepage all resolve", async ({ page, request }) => {
    test.skip(!isDesktop(page), "run once, on desktop");
    await page.goto("/");

    const hrefs = await page.evaluate(() =>
      [...new Set(
        [...document.querySelectorAll("a[href]")]
          .map((a) => a.getAttribute("href") ?? "")
          .filter((href) => href.startsWith("/")),
      )],
    );

    expect(hrefs.length).toBeGreaterThan(10);

    for (const href of hrefs) {
      const response = await request.get(href);
      expect(response.status(), `${href} returned ${response.status()}`).toBeLessThan(400);
    }
  });

  test("retired legacy URL still 404s and is not redirected", async ({ request }) => {
    const response = await request.get("/hotels-in-alibaug.html", { maxRedirects: 0 });
    expect(response.status()).toBe(404);
  });

  test("legacy product URLs redirect to their new home", async ({ request }) => {
    const response = await request.get("/m-s-rolling-shutters.html", { maxRedirects: 0 });
    expect([301, 308]).toContain(response.status());
    expect(response.headers()["location"]).toContain(
      "/products/rolling-shutters/galvanized-rolling-shutters",
    );
  });
});

test.describe("accessibility basics", () => {
  test("skip link is the first focusable element and works", async ({ page }) => {
    test.skip(!isDesktop(page), "keyboard test, desktop only");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
  });

  test("every image has an alt attribute", async ({ page }) => {
    await page.goto("/products");
    const missing = await page.evaluate(() =>
      [...document.querySelectorAll("img")].filter((img) => img.getAttribute("alt") === null).length,
    );
    expect(missing).toBe(0);
  });

  test("headings start at h1 and do not skip to h3", async ({ page }) => {
    await page.goto("/products/industrial-doors/high-speed-roll-up-doors");
    const levels = await page.evaluate(() =>
      [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => Number(h.tagName[1])),
    );
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
});
