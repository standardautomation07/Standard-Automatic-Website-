/**
 * Catalogue model.
 *
 * The hierarchy is FAMILY → CATEGORY → PRODUCT → VARIANT, with APPLICATION
 * and TECHNICAL information hanging off the product. It mirrors
 * `research/product-taxonomy.json` exactly — `tests/taxonomy.spec.ts` fails
 * if the two drift apart. Nothing in the UI hardcodes a product; every page
 * renders from this data.
 */

export type FamilyId =
  | "industrial-doors"
  | "high-speed-doors"
  | "rolling-shutters"
  | "fire-safety-doors"
  | "automatic-gates"
  | "entrance-automation"
  | "loading-bay"
  | "access-control";

export type IndustryId =
  | "manufacturing"
  | "warehousing-logistics"
  | "cold-chain-food"
  | "pharmaceutical-cleanroom"
  | "automotive"
  | "retail-commercial"
  | "healthcare"
  | "infrastructure-transit";

/**
 * Business status. Only two values reach the site: NOT_CONFIRMED products are
 * absent from this data entirely and live only in the research matrix.
 */
export type Status = "CONFIRMED" | "POTENTIAL";

/** Operating environment, used as a product filter. */
export type Environment = "internal" | "external" | "hygiene" | "cold" | "fire" | "security";

export interface Variant {
  id: string;
  name: string;
  /** What this configuration changes and when you would choose it. */
  note: string;
  status: Status;
}

/** A resolved variant: the configuration plus the specification fields that
 *  differ from the base product. */
export interface VariantSpec {
  variant: Variant;
  specs: Spec[];
}

/** One field a specifier needs answered. The schema declares it; the value
 *  is supplied separately, so a field can never acquire an invented number. */
export interface SpecField {
  label: string;
  /** Expected unit or format, shown as a hint while the value is unknown. */
  unit?: string;
  /** What the field decides, or which standard defines it. */
  note?: string;
}

export interface SpecGroupSchema {
  group: string;
  fields: SpecField[];
}

/**
 * How firm a published figure is.
 *
 *  - CONFIRMED    — a fixed characteristic of the product as supplied.
 *  - CONFIGURABLE — a real figure, but the achievable value is set by the
 *                   size, configuration and environment of the opening. This
 *                   is what the business marks with an asterisk on its own
 *                   data. It is published, with the dependency stated.
 *  - TBC          — the parameter exists and is named, but no precise value
 *                   can be stated ahead of the project. Either the supplied
 *                   data itself says "application dependent" or "project
 *                   specific", or nothing supportable has been supplied at
 *                   all, in which case `value` is null.
 *
 * There is deliberately no state in which a plausible-looking number appears
 * from nowhere.
 */
export type SpecStatus = "CONFIRMED" | "CONFIGURABLE" | "TBC";

/**
 * A resolved specification row. `label` is the parameter name, `note` carries
 * the notes a specifier needs, and `unit` is the expected unit — so the row
 * holds name, value, unit, status and notes together.
 */
export interface Spec extends SpecField {
  /** null when no supportable value has been supplied. Rendered as "to be
   *  confirmed" — never filled with a plausible guess. */
  value: string | null;
  status: SpecStatus;
}

/** Specifications are grouped so a long table stays readable. */
export interface SpecGroup {
  group: string;
  specs: Spec[];
}

export interface Benefit {
  title: string;
  body: string;
}

/** A real buyer or engineering question with a factual answer. Written from
 *  search intent, never invented to pad a page. */
export interface Faq {
  question: string;
  answer: string;
}

/** "Which configuration is right for your application?" — the decision, and
 *  what it turns on. */
export interface SelectionRule {
  condition: string;
  recommendation: string;
}

/** How the product ties into other systems. Only where technically true. */
export interface Integration {
  system: string;
  detail: string;
}

/** Three or four headline facts shown directly under the product hero. */
export interface QuickFact {
  label: string;
  value: string;
  /** True where the underlying specification is CONFIGURABLE or TBC. The hero
   *  marks the figure and carries a footnote, so a headline number is never
   *  read as a universal guarantee. */
  qualified?: boolean;
}

export interface DocumentRef {
  title: string;
  kind: "Brochure" | "Datasheet" | "Technical drawing" | "Certificate";
  /** null until the business supplies the file — rendered as unavailable. */
  href: string | null;
  note?: string;
}

/**
 * Every image on the site is declared here rather than inline, so that each
 * one carries its source, licence/usage status and product association
 * alongside its alt text.
 */
export interface ImageRef {
  id: string;
  src: string;
  alt: string;
  source: string;
  usage: string;
  association: string;
  /** `contain` renders on a light plate — used for catalogue renders. */
  fit?: "cover" | "contain";
}

/**
 * Catalogue facets for filtering within a family. Optional because only
 * families whose products are genuinely chosen against these axes declare
 * them — Rolling Shutters is the first.
 */
export interface ProductFacets {
  material: string[];
  construction: string;
  duty: string[];
  operation: string[];
  performance: string[];
}

/** One row of the family comparison table. Kept factual and short. */
export interface ComparisonRow {
  material: string;
  thickness: string;
  corrosion: string;
  operation: string;
}

export interface Product {
  id: string;
  familyId: FamilyId;
  categoryId: string;
  name: string;
  status: Status;
  /** One-line engineering positioning statement, shown under the H1. */
  tagline: string;
  /** Card and meta-description length. */
  summary: string;
  overview: string[];
  quickFacts: QuickFact[];
  benefits: Benefit[];
  variants: Variant[];
  applications: string[];
  industries: IndustryId[];
  environments: Environment[];
  operatingMethod: string[];
  construction: string[];
  /** Overrides the category defaults when present. */
  safety?: string[];
  controls?: string[];
  options?: string[];
  maintenance?: string[];
  integration?: Integration[];
  installation?: string[];
  selectionGuide?: SelectionRule[];
  faq?: Faq[];
  related: string[];
  documents: DocumentRef[];
  imageId: string;
  galleryIds?: string[];
  /** Rendered as a visible caveat when the product's own name is unresolved. */
  namingNote?: string;
  /** Old .html pages this product's business status was evidenced from. */
  legacyUrls?: string[];
  /** Filter axes for the family listing. */
  facets?: ProductFacets;
  /** Headline figures for the family comparison table. */
  comparison?: ComparisonRow;
  /**
   * Families this product should also be listed under. A product lives in one
   * family and has one URL; this surfaces it as a clearly-labelled cross-listed
   * card elsewhere rather than duplicating the page, which would be a doorway.
   */
  crossListedIn?: FamilyId[];
  /** Ordering questions specific to this product type. */
  ordering?: string[];
  /** Motors, controls and accessories that genuinely couple to this product. */
  compatibility?: Integration[];
}

export interface Category {
  id: string;
  familyId: FamilyId;
  name: string;
  /** The construction or operating principle that defines the group. */
  principle: string;
  /** Inherited by every product in the category unless it overrides them.
   *  Integration, installation, selection guidance and FAQ are almost always
   *  a property of how the product type works, so they live here rather than
   *  being restated on every product. */
  defaults: {
    safety: string[];
    controls: string[];
    options: string[];
    maintenance: string[];
  };
}

export interface Family {
  id: FamilyId;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  intro: string[];
  /** "Why this family" — the case for the product type, not for us. */
  why: Benefit[];
  /** What actually decides a specification in this family. */
  considerations: string[];
  applications: string[];
  industries: IndustryId[];
  imageId: string;
}

export interface Industry {
  id: IndustryId;
  name: string;
  tagline: string;
  challenges: Benefit[];
  considerations: string[];
  typicalApplications: string[];
  recommendedProductIds: string[];
  imageId: string;
}
