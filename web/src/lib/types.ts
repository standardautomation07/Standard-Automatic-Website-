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
  | "access-control"
  | "motors-automation";

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

export interface Spec {
  label: string;
  value: string;
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

/** Three or four headline facts shown directly under the product hero. */
export interface QuickFact {
  label: string;
  value: string;
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
  /** Only specifications that can be supported. Empty is allowed. */
  specGroups: SpecGroup[];
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
  related: string[];
  documents: DocumentRef[];
  imageId: string;
  galleryIds?: string[];
  /** Rendered as a visible caveat when the product's own name is unresolved. */
  namingNote?: string;
  /** Old .html pages this product's business status was evidenced from. */
  legacyUrls?: string[];
}

export interface Category {
  id: string;
  familyId: FamilyId;
  name: string;
  /** The construction or operating principle that defines the group. */
  principle: string;
  /** Inherited by every product in the category unless it overrides them. */
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
