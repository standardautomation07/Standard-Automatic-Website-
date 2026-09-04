import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { categories, families, products, productSpecGroups } from "../src/lib/catalog";

/**
 * The research taxonomy and the site's typed data are two representations of
 * the same decision. If they drift, one of them is lying to somebody — so
 * this asserts they agree, id for id.
 */
const taxonomy = JSON.parse(
  readFileSync(resolve(__dirname, "../../research/product-taxonomy.json"), "utf8"),
) as {
  counts: { families: number; categories: number; products: number };
  families: {
    id: string;
    name: string;
    categories: {
      id: string;
      name: string;
      products: { id: string; name: string; status: string; variants: { id: string }[] }[];
    }[];
  }[];
};

test.describe("catalogue data matches the research taxonomy", () => {
  test("counts agree", () => {
    expect(families.length).toBe(taxonomy.counts.families);
    expect(categories.length).toBe(taxonomy.counts.categories);
    expect(products.length).toBe(taxonomy.counts.products);
  });

  test("every family, category and product id matches", () => {
    for (const tFamily of taxonomy.families) {
      const family = families.find((f) => f.id === tFamily.id);
      expect(family, `family missing from site data: ${tFamily.id}`).toBeTruthy();
      expect(family?.name).toBe(tFamily.name);

      for (const tCategory of tFamily.categories) {
        const category = categories.find((c) => c.id === tCategory.id);
        expect(category, `category missing from site data: ${tCategory.id}`).toBeTruthy();
        expect(category?.familyId).toBe(tFamily.id);
        expect(category?.name).toBe(tCategory.name);

        for (const tProduct of tCategory.products) {
          const product = products.find((p) => p.id === tProduct.id);
          expect(product, `product missing from site data: ${tProduct.id}`).toBeTruthy();
          expect(product?.name).toBe(tProduct.name);
          expect(product?.status).toBe(tProduct.status);
          expect(product?.categoryId).toBe(tCategory.id);
          expect(product?.familyId).toBe(tFamily.id);
          expect(product?.variants.map((v) => v.id).sort()).toEqual(
            tProduct.variants.map((v) => v.id).sort(),
          );
        }
      }
    }
  });

  test("no product appears on the site that the taxonomy does not list", () => {
    const known = new Set(
      taxonomy.families.flatMap((f) => f.categories.flatMap((c) => c.products.map((p) => p.id))),
    );
    for (const product of products) {
      expect(known.has(product.id), `product not in taxonomy: ${product.id}`).toBe(true);
    }
  });

  test("every related-product reference resolves", () => {
    const ids = new Set(products.map((p) => p.id));
    for (const product of products) {
      for (const related of product.related) {
        expect(ids.has(related), `${product.id} → unknown related product ${related}`).toBe(true);
      }
    }
  });

  test("no NOT CONFIRMED market product leaked into the catalogue", () => {
    const forbidden = [
      "hangar",
      "cold-storage-door",
      "revolving",
      "mantrap",
      "road-blocker",
      "tyre-killer",
      "vehicle-restraint",
      "mobile-dock-ramp",
      "lift-table",
      "hermetic",
    ];
    for (const product of products) {
      for (const term of forbidden) {
        expect(product.id.includes(term), `${product.id} should not be published`).toBe(false);
      }
    }
  });
});

test.describe("content honesty rules", () => {
  test("no product publishes a fire rating", () => {
    for (const product of products) {
      for (const group of productSpecGroups(product)) {
        for (const spec of group.specs) {
          if (spec.value && /rating/i.test(spec.label) && /fire|integrity|insulation|radiation/i.test(group.group)) {
            throw new Error(
              `${product.id} publishes a fire rating (${spec.label}: ${spec.value}) with no certificate reference`,
            );
          }
        }
      }
    }
  });

  test("no product publishes a warranty period", () => {
    for (const product of products) {
      const text = JSON.stringify(product).toLowerCase();
      expect(/\bwarranty\b/.test(text), `${product.id} mentions a warranty`).toBe(false);
    }
  });

  test("every product resolves a specification schema", () => {
    for (const product of products) {
      const groups = productSpecGroups(product);
      const fields = groups.flatMap((g) => g.specs);
      expect(groups.length, `${product.id} has no specification groups`).toBeGreaterThan(3);
      expect(fields.length, `${product.id} has too few specification fields`).toBeGreaterThan(14);
      for (const spec of fields) {
        expect(spec.label.length, `${product.id} has an unlabelled field`).toBeGreaterThan(1);
      }
    }
  });

  test("every published value traces to spec-values.json", () => {
    const values = JSON.parse(
      readFileSync(resolve(__dirname, "../src/data/spec-values.json"), "utf8"),
    ) as Record<string, Record<string, string>>;

    for (const product of products) {
      for (const group of productSpecGroups(product)) {
        for (const spec of group.specs) {
          if (spec.value === null) continue;
          expect(
            values[product.id]?.[spec.label],
            `${product.id} / ${spec.label} has a value that is not in spec-values.json`,
          ).toBe(spec.value);
        }
      }
    }
  });

  test("every product has an image id, quick facts and applications", () => {
    for (const product of products) {
      expect(product.imageId, `${product.id} has no image`).toBeTruthy();
      expect(product.quickFacts.length, `${product.id} has no quick facts`).toBeGreaterThan(2);
      expect(product.applications.length, `${product.id} has no applications`).toBeGreaterThan(1);
      expect(product.benefits.length, `${product.id} has no benefits`).toBeGreaterThan(2);
      expect(product.overview.length, `${product.id} has no overview`).toBeGreaterThan(0);
    }
  });
});
