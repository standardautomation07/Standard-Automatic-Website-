import { expect, test } from "@playwright/test";
import { authoredSpecs, CONFIGURATION_NOTE } from "../src/data/product-specs";
import { highSpeedDoorProducts } from "../src/data/products/high-speed-doors";
import { productGuidance, productSpecGroups } from "../src/lib/catalog";
import { image } from "../src/data/images";

/**
 * The High Speed Doors family is built from technical data the business
 * issued on 2026-09-05. These tests exist to make one thing hard to break by
 * accident: that the data on the page is still that data.
 *
 * The parameters below are transcribed independently from the issued brief.
 * If someone edits product-specs.ts, these fail — which is the point.
 */

const SLUGS = [
  "high-speed-roll-up-door",
  "high-speed-fold-up-door",
  "high-speed-self-repairing-door",
  "high-speed-spiral-door",
  "high-speed-rigid-insulated-door",
  "high-speed-cleanroom-hygiene-door",
  "high-speed-cold-storage-freezer-door",
] as const;

/** Every parameter in the issued data, transcribed from the brief. */
const ISSUED: Record<string, Record<string, string>> = {
  "high-speed-roll-up-door": {
    "Door type": "High Speed Roll-Up",
    Construction: "Flexible PVC curtain",
    "Maximum width": "Up to 5,000 mm",
    "Maximum height": "Up to 5,000 mm",
    "Opening speed": "0.8–2.5 m/s",
    "Closing speed": "0.5–0.8 m/s",
    Curtain: "High-density PVC-coated polyester fabric",
    "Curtain thickness": "0.8–1.2 mm",
    Frame: "Galvanized steel / aluminium / stainless steel",
    "Guide rails": "Galvanized steel / stainless steel option",
    "Wind resistance": "EN 12424 Class 2",
    Drive: "Industrial geared motor",
    Power: "230 V / 415 V, 50 Hz",
    Control: "PLC / inverter / encoder",
    "Activation options": "Radar / push button / photocell / loop",
    "Vision panels": "Optional transparent PVC",
    Safety: "Photocell + safety edge",
    "Emergency operation": "Manual crank / manual override",
    Mounting: "Internal / external depending on configuration",
  },
  "high-speed-fold-up-door": {
    "Door type": "High Speed Fold-Up",
    "Maximum width": "Up to 5,000 mm",
    "Maximum height": "Up to 8,000 mm",
    "Opening speed": "0.8–2.5 m/s",
    "Closing speed": "0.8–2.5 m/s",
    Curtain: "Reinforced PVC-coated fabric",
    "Curtain thickness": "0.8–1.2 mm",
    Frame: "Galvanized steel / aluminium / stainless steel",
    "Track / cover": "Heavy-duty galvanized steel",
    "Wind resistance": "EN 12424 Class 2 / Class 3 configuration",
    Drive: "Industrial geared motor",
    "Motor options": "0.75 / 1.1 / 1.5 kW configurations",
    Control: "PLC + inverter + encoder",
    Activation: "Radar / push button / infrared",
    "Vision panels": "Transparent PVC windows",
    Safety: "Photoelectric protection / safety edge",
    "Emergency opening": "Manual crank",
    Mounting: "Internal / external",
  },
  "high-speed-self-repairing-door": {
    "Door type": "Self-Repairing High Speed Door",
    Curtain: "Flexible reinforced PVC",
    "Opening speed": "Up to 2.0–2.5 m/s",
    "Closing speed": "Approximately 0.5–0.8 m/s",
    "Maximum width": "Application dependent; engineered to opening",
    "Maximum height": "Application dependent",
    "Curtain recovery": "Automatic re-entry into guide system",
    "Impact recovery": "Automatic / self-resetting",
    "Guide system": "Flexible self-repairing guides",
    "Wind resistance": "Typically Class 2–3 configuration",
    Drive: "High-cycle geared motor",
    Control: "Inverter-based controller",
    Activation: "Radar / loop / pull switch / remote",
    "Vision panel": "Optional",
    Safety: "Photocells + bottom safety edge",
    "Emergency operation": "Manual override",
  },
  "high-speed-spiral-door": {
    "Door type": "High Speed Spiral Door",
    "Door leaf": "Insulated rigid aluminium panels",
    "Panel thickness": "Approximately 40–43 mm",
    "Maximum width": "Up to 5,000–6,000 mm",
    "Maximum height": "Up to 5,000–6,000 mm",
    "Opening speed": "Up to 2.5 m/s",
    "Closing speed": "Approximately 0.5 m/s",
    Insulation: "PU / thermal insulation configuration",
    "Guide system": "Spiral / high-speed track",
    "Wind resistance": "Configuration dependent; engineered for applicable wind conditions",
    "Thermal performance": "Configuration dependent",
    Drive: "High-cycle industrial motor",
    Control: "Frequency-controlled",
    Activation: "Radar / photocell / loop / push button",
    Safety: "Light curtain / photocell / safety edge",
    Vision: "Optional transparent panel configuration",
    "Emergency operation": "Manual release",
  },
  "high-speed-rigid-insulated-door": {
    "Door type": "High Speed Rigid / Insulated",
    Construction: "Double-skin insulated rigid panels",
    "Panel material": "Aluminium alloy / engineered metal panel",
    "Panel thickness": "40–43 mm",
    Insulation: "PU / thermal insulation core",
    "Maximum width": "Up to 5,000 mm",
    "Maximum height": "Up to 7,500 mm",
    "Opening speed": "Approximately 1.2–1.5 m/s",
    "Closing speed": "Approximately 0.6 m/s",
    "Wind resistance": "Engineered for external applications",
    Drive: "Industrial geared motor",
    Control: "PLC / inverter / encoder",
    Activation: "Radar / infrared / push button",
    Vision: "Optional",
    Safety: "Photocell / safety edge / emergency stop",
  },
  "high-speed-cleanroom-hygiene-door": {
    "Door type": "High Speed Cleanroom / Hygiene Door",
    Curtain: "Hygienic PVC / smooth cleanable surface",
    Construction: "Sealed rapid-door assembly",
    "Opening speed": "Application dependent",
    "Closing speed": "Application dependent",
    "Maximum dimensions": "Project specific",
    Frame: "Stainless steel / hygienic-coated construction",
    "Guide rails": "Stainless steel / hygienic construction",
    "Vision panel": "Optional",
    "Control enclosure": "Hygienic / suitable IP-rated configuration",
    Activation: "Radar / touchless sensor / push button",
    Safety: "Photocells + safety edge",
    Sealing: "Side and bottom seals",
    Cleaning: "Designed for routine cleaning/washdown where specified",
  },
  "high-speed-cold-storage-freezer-door": {
    "Door type": "High Speed Cold Storage / Freezer Door",
    Curtain: "Insulated flexible PVC / specialist cold-temperature curtain",
    "Opening speed": "Application dependent",
    "Closing speed": "Application dependent",
    "Operating temperature": "Project-specific",
    "Maximum dimensions": "Project-specific",
    Guides: "Heated / temperature-resistant configuration where required",
    "Bottom seal": "Cold-storage sealing system",
    Control: "Frequency-controlled",
    Activation: "Radar / pull switch / loop / remote",
    Safety: "Photocells / safety edge",
    "Anti-condensation": "Optional depending on environment",
    "Heater system": "Optional / application dependent",
  },
};

/**
 * Parameters the issued data marks with an asterisk AND gives a figure for.
 * These are CONFIGURABLE: a real number, qualified by the configuration.
 */
const ASTERISKED: Record<string, string[]> = {
  "high-speed-roll-up-door": [
    "Maximum width",
    "Maximum height",
    "Opening speed",
    "Closing speed",
    "Curtain thickness",
    "Wind resistance",
  ],
  "high-speed-fold-up-door": [
    "Maximum width",
    "Maximum height",
    "Opening speed",
    "Closing speed",
    "Curtain thickness",
    "Wind resistance",
    "Motor options",
  ],
  "high-speed-self-repairing-door": ["Opening speed", "Closing speed", "Wind resistance"],
  // Wind resistance is deliberately absent here — see NO_FIGURE below.
  "high-speed-spiral-door": [
    "Panel thickness",
    "Maximum width",
    "Maximum height",
    "Opening speed",
    "Closing speed",
  ],
  "high-speed-rigid-insulated-door": [
    "Panel thickness",
    "Maximum width",
    "Maximum height",
    "Opening speed",
    "Closing speed",
  ],
  // Every asterisked parameter on these two is a dependency statement rather
  // than a figure, so they are all in NO_FIGURE instead.
  "high-speed-cleanroom-hygiene-door": [],
  "high-speed-cold-storage-freezer-door": [],
};

/**
 * Parameters whose issued value is a statement of dependency rather than a
 * number — "application dependent", "project specific", "configuration
 * dependent". Some of these also carry an asterisk, but there is no figure
 * for the asterisk to qualify, so they are TBC and the page reproduces the
 * words the data uses instead of implying a value exists.
 */
const NO_FIGURE: Record<string, string[]> = {
  "high-speed-roll-up-door": [],
  "high-speed-fold-up-door": [],
  "high-speed-self-repairing-door": ["Maximum width", "Maximum height"],
  "high-speed-spiral-door": ["Wind resistance", "Thermal performance"],
  "high-speed-rigid-insulated-door": ["Wind resistance"],
  "high-speed-cleanroom-hygiene-door": [
    "Maximum dimensions",
    "Opening speed",
    "Closing speed",
  ],
  "high-speed-cold-storage-freezer-door": [
    "Maximum dimensions",
    "Opening speed",
    "Closing speed",
    "Operating temperature",
  ],
};

const specsFor = (id: string) =>
  Object.fromEntries(
    (authoredSpecs[id] ?? []).flatMap((group) => group.specs.map((spec) => [spec.label, spec])),
  );

test.describe("the issued technical data reached the site unchanged", () => {
  test("all seven products exist", () => {
    expect(highSpeedDoorProducts.map((p) => p.id).sort()).toEqual([...SLUGS].sort());
  });

  for (const id of SLUGS) {
    test(`${id} publishes every issued parameter, with no value altered`, () => {
      const specs = specsFor(id);
      for (const [label, value] of Object.entries(ISSUED[id])) {
        expect(specs[label], `${id} is missing the parameter "${label}"`).toBeTruthy();
        expect(specs[label].value, `${id} / ${label} does not match the issued value`).toBe(value);
      }
    });

    test(`${id} marks every asterisked figure as configuration dependent`, () => {
      const specs = specsFor(id);
      for (const label of ASTERISKED[id]) {
        expect(specs[label].status, `${id} / ${label} should be CONFIGURABLE`).toBe("CONFIGURABLE");
      }
    });

    test(`${id} does not promote a dependency statement into a figure`, () => {
      const specs = specsFor(id);
      for (const label of NO_FIGURE[id]) {
        expect(specs[label].status, `${id} / ${label} should be TBC`).toBe("TBC");
        // the value stays on the page — the data is not deleted, only unpromoted
        expect(specs[label].value, `${id} / ${label} lost its issued wording`).toBe(
          ISSUED[id][label],
        );
      }
    });

    test(`${id} classifies every parameter as one of the three states`, () => {
      const specs = Object.values(specsFor(id));
      const asterisked = new Set(ASTERISKED[id]);
      const noFigure = new Set(NO_FIGURE[id]);
      for (const spec of specs) {
        if (asterisked.has(spec.label)) continue;
        if (noFigure.has(spec.label)) continue;
        if (spec.value === null) {
          expect(spec.status).toBe("TBC");
          continue;
        }
        expect(spec.status, `${id} / ${spec.label} should be a fixed value`).toBe("CONFIRMED");
      }
    });

    test(`${id} publishes no parameter the issued data does not contain`, () => {
      for (const [label, spec] of Object.entries(specsFor(id))) {
        if (spec.value === null) continue; // named for the specifier, deliberately unanswered
        expect(
          ISSUED[id][label],
          `${id} publishes "${label}" which is not in the issued data`,
        ).toBe(spec.value);
      }
    });

    test(`${id} groups its specification, and the site resolves those groups`, () => {
      const product = highSpeedDoorProducts.find((p) => p.id === id)!;
      // productSpecGroups is what the page actually calls; assert it returns
      // the authored table rather than falling through to the schema.
      expect(productSpecGroups(product)).toEqual(authoredSpecs[id]);
      const groups = (authoredSpecs[id] ?? []).map((g) => g.group);
      expect(groups).toEqual([
        "Dimensions",
        "Performance",
        "Construction",
        "Drive & control",
        "Safety",
        "Options",
      ]);
    });

    test(`${id} carries 5 to 8 FAQs and its own selection guidance`, () => {
      const product = highSpeedDoorProducts.find((p) => p.id === id)!;
      const guidance = productGuidance(product);
      expect(guidance.faq.length).toBeGreaterThanOrEqual(5);
      expect(guidance.faq.length).toBeLessThanOrEqual(8);
      expect(product.faq, `${id} should author its own FAQ`).toBeTruthy();
      expect(product.selectionGuide?.length ?? 0).toBeGreaterThan(2);
      expect(guidance.integration.length).toBeGreaterThan(0);
      expect(guidance.installation.length).toBeGreaterThan(0);
    });

    test(`${id} has its own lead image with descriptive alt text`, () => {
      const product = highSpeedDoorProducts.find((p) => p.id === id)!;
      const lead = image(product.imageId);
      expect(lead.alt.length).toBeGreaterThan(40);
      expect(lead.src).toContain(id);
      expect(product.galleryIds?.length ?? 0).toBeGreaterThan(0);
      for (const galleryId of product.galleryIds ?? []) {
        expect(image(galleryId).alt.length).toBeGreaterThan(10);
      }
    });
  }

  test("no two products share a lead image", () => {
    const leads = highSpeedDoorProducts.map((p) => p.imageId);
    expect(new Set(leads).size).toBe(leads.length);
  });

  test("no unsupported certification is claimed anywhere in the family", () => {
    // The issued data carries no classification, approval or certificate. The
    // cleanroom door is the one most likely to attract one by accident.
    const forbidden = [
      /\bISO\s*\d/i,
      /\bGMP\b/,
      /\bFDA\b/,
      /\bcGMP\b/i,
      /\bcertified\b/i,
      /\bcertification\b/i,
      /\bapproved by\b/i,
      /\bclass\s*(100|1000|10000)\b/i,
      /\bISO\s*14644/i,
    ];
    for (const product of highSpeedDoorProducts) {
      const text = JSON.stringify(product);
      for (const pattern of forbidden) {
        expect(pattern.test(text), `${product.id} matches ${pattern}`).toBe(false);
      }
    }
    // Scoped to this family. The authored registry also holds the rolling
    // shutters, and the fire-rated shutter legitimately talks about certified
    // configurations — that is its whole subject.
    for (const [id, groups] of Object.entries(authoredSpecs).filter(([key]) =>
      (SLUGS as readonly string[]).includes(key),
    )) {
      const text = JSON.stringify(groups);
      for (const pattern of forbidden) {
        expect(pattern.test(text), `${id} specification matches ${pattern}`).toBe(false);
      }
    }
  });

  test("every product cross-links to other doors in the family", () => {
    const ids = new Set<string>(SLUGS);
    for (const product of highSpeedDoorProducts) {
      const withinFamily = product.related.filter((r) => ids.has(r));
      expect(withinFamily.length, `${product.id} does not link to its siblings`).toBeGreaterThan(1);
    }
  });
});

test.describe("the pages render that data", () => {
  for (const id of SLUGS) {
    test(`/products/high-speed-doors/${id} renders the full template`, async ({ page }) => {
      const response = await page.goto(`/products/high-speed-doors/${id}`);
      expect(response?.status()).toBeLessThan(400);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Available configurations" })).toBeVisible();

      // Detail is presented as accordion panels. Every one of the nine has to
      // be on the page; only Technical Data is open to begin with.
      for (const panel of [
        "Technical Data",
        "Features",
        "Applications",
        "Compatibility",
        "Installation",
        "Dimensions",
        "Safety",
        "Ordering Information",
        "Downloads",
      ]) {
        await expect(page.getByRole("button", { name: new RegExp(panel) })).toBeVisible();
      }
      await expect(page.getByRole("button", { name: /Technical Data/ })).toHaveAttribute(
        "aria-expanded",
        "true",
      );

      await expect(
        page.getByRole("heading", { name: /Which configuration is right for your application/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Questions we are actually asked" }),
      ).toBeVisible();
      await expect(page.locator("#enquiry")).toBeAttached();
      await expect(
        page.locator("main").getByRole("link", { name: "Request a Quote" }).first(),
      ).toBeVisible();

      // Specifications, grouped into the six briefed tables.
      expect(await page.getByRole("table").count()).toBeGreaterThanOrEqual(6);

      // Nothing that depends on the project is presented as a guarantee.
      await expect(page.getByText(CONFIGURATION_NOTE).first()).toBeVisible();
    });

    test(`/products/high-speed-doors/${id} has unique SEO metadata and schema`, async ({ page }) => {
      await page.goto(`/products/high-speed-doors/${id}`);

      await expect(page).toHaveTitle(/.{10,}/);
      const description = page.locator('head meta[name="description"]');
      await expect(description).toHaveCount(1);
      expect((await description.getAttribute("content"))?.length ?? 0).toBeGreaterThan(50);
      expect(await page.locator('head link[rel="canonical"]').getAttribute("href")).toContain(
        `/products/high-speed-doors/${id}`,
      );
      await expect(page.locator('head meta[property="og:title"]')).toHaveCount(1);

      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const types = blocks.map((block) => JSON.parse(block)["@type"]);
      expect(types).toContain("Product");
      expect(types).toContain("BreadcrumbList");
      expect(types).toContain("FAQPage");

      // FAQ schema must match what a reader can actually see.
      const faq = blocks.map((b) => JSON.parse(b)).find((b) => b["@type"] === "FAQPage");
      for (const entry of faq.mainEntity) {
        await expect(page.getByRole("term").filter({ hasText: entry.name }).first()).toBeVisible();
      }
    });
  }

  test("titles and descriptions are unique across the seven products", async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const id of SLUGS) {
      await page.goto(`/products/high-speed-doors/${id}`);
      titles.add(await page.title());
      descriptions.add(
        (await page.locator('head meta[name="description"]').getAttribute("content")) ?? "",
      );
    }
    expect(titles.size).toBe(SLUGS.length);
    expect(descriptions.size).toBe(SLUGS.length);
  });

  test("the family page lists all seven, in five categories", async ({ page }) => {
    await page.goto("/products/high-speed-doors");
    for (const id of SLUGS) {
      await expect(page.locator(`main a[href="/products/high-speed-doors/${id}"]`).first()).toBeVisible();
    }
    await expect(page.getByRole("heading", { name: "Spiral High Speed Doors" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Controlled Environment High Speed Doors" }),
    ).toBeVisible();
  });

  test("published figures appear in the tables exactly as issued", async ({ page }) => {
    await page.goto("/products/high-speed-doors/high-speed-roll-up-door");
    const tables = page.getByRole("table");
    for (const value of ["Up to 5,000 mm", "0.8–2.5 m/s", "EN 12424 Class 2", "230 V / 415 V, 50 Hz"]) {
      await expect(tables.getByText(value, { exact: true }).first()).toBeVisible();
    }
  });

  test("a configuration-dependent figure is visibly qualified", async ({ page }) => {
    await page.goto("/products/high-speed-doors/high-speed-spiral-door");
    // The qualification is carried by the note under the tables and by the
    // marked headline facts, not by a badge on every row.
    await expect(page.getByText(CONFIGURATION_NOTE).first()).toBeVisible();
    await expect(
      page
        .getByRole("table")
        .getByText("Configuration dependent; engineered for applicable wind conditions")
        .first(),
    ).toBeVisible();
  });

  test("the cleanroom door claims no classification anywhere on the page", async ({ page }) => {
    await page.goto("/products/high-speed-doors/high-speed-cleanroom-hygiene-door");
    const text = (await page.locator("body").innerText()).toLowerCase();

    // Scheme names cannot appear at all: there is no phrasing in which one of
    // these is not read as a claim once it is quoted out of context.
    for (const term of ["iso 14644", "iso 1464", "gmp", "fda", "class 100", "class 1000"]) {
      expect(text.includes(term), `page mentions "${term}"`).toBe(false);
    }

    // "certified" is allowed in exactly one place: the standing footnote under
    // every specification table, which exists to say the opposite of a claim.
    // Anywhere else on this page it would be one.
    const certified = text.split("certified").length - 1;
    const inDisclaimer =
      text.split("it is not a claim that this product is certified to it").length - 1;
    expect(certified, "the page uses \"certified\" outside the standards footnote").toBe(
      inDisclaimer,
    );

    // And the page states the position rather than staying quiet about it.
    await expect(page.getByText(/classification is a property of the room/i)).toBeVisible();
  });

  test("all seven appear in the sitemap and the old URLs still redirect", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    for (const id of SLUGS) {
      expect(body, `${id} missing from sitemap`).toContain(`/products/high-speed-doors/${id}`);
    }

    const moved: [string, string][] = [
      ["/products/high-speed-doors/high-speed-roll-up-doors", "high-speed-roll-up-door"],
      ["/products/high-speed-doors/self-repairing-high-speed-doors", "high-speed-self-repairing-door"],
      ["/products/high-speed-doors/high-speed-fold-up-doors", "high-speed-fold-up-door"],
      ["/products/high-speed-doors/high-speed-insulated-panel-doors", "high-speed-rigid-insulated-door"],
    ];
    for (const [from, to] of moved) {
      const response = await request.get(from, { maxRedirects: 0 });
      expect([301, 308], `${from} did not redirect`).toContain(response.status());
      expect(response.headers()["location"]).toContain(to);
    }
  });

  test("every image on a high speed door page loads and has alt text", async ({ page }) => {
    // The poll below waits up to 30s, which is the default test timeout, so
    // the test would expire before the poll could ever report. On a cold image
    // cache the optimizer genuinely needs that long.
    test.slow();
    const failed: string[] = [];
    page.on("response", (response) => {
      if (response.request().resourceType() === "image" && response.status() >= 400) {
        failed.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto("/products/high-speed-doors/high-speed-cold-storage-freezer-door");
    await page.evaluate(() => {
      for (const img of document.querySelectorAll("img")) img.loading = "eager";
    });
    await expect
      .poll(
        () =>
          page.evaluate(
            () => [...document.querySelectorAll("img")].filter((img) => !img.complete).length,
          ),
        // The poll carries its own deadline, which test.slow() does not
        // extend. On a cold optimizer cache 30s is not enough.
        { timeout: 90_000 },
      )
      .toBe(0);

    expect(failed).toEqual([]);
    expect(
      await page.evaluate(
        () => [...document.querySelectorAll("img")].filter((img) => img.getAttribute("alt") === null).length,
      ),
    ).toBe(0);

    const overflow = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(overflow.scroll).toBeLessThanOrEqual(overflow.client + 1);
  });
});
