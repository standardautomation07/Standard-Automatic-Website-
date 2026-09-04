export type CategorySlug =
  | "entrance-automation"
  | "industrial-doors"
  | "rolling-shutters"
  | "loading-bay"
  | "security-access"
  | "motors-accessories";

export interface Spec {
  label: string;
  value: string;
}

export interface Benefit {
  title: string;
  body: string;
}

export interface Product {
  slug: string;
  category: CategorySlug;
  /** Display name used everywhere. */
  name: string;
  /** One-line positioning statement shown under the H1. */
  tagline: string;
  /** Short description used on cards and in meta descriptions. */
  summary: string;
  /** Original overview copy — general industry information about how the
   *  product type works, not company-specific claims. */
  overview: string[];
  benefits: Benefit[];
  applications: string[];
  howItWorks?: string[];
  /** Only specifications published by Standard Automation for this line. */
  specs: Spec[];
  image: string | null;
  imageAlt: string;
  /** `contain` renders the image on a light plate — used for the clean
   *  catalogue renders (turnstiles, barriers) rather than photography. */
  imageFit?: "cover" | "contain";
  /** Extra imagery, product cut-outs from the existing product library. */
  gallery?: { src: string; alt: string }[];
  related: string[];
  /** True when the product line itself is awaiting confirmation from the
   *  business (surfaced in the UI, never silently hidden). */
  pendingConfirmation?: boolean;
  /** Set when the product's *name* could not be resolved from the existing
   *  material and needs the business to confirm it. */
  namingNote?: string;
  /** Old .html URL this record was researched from. */
  legacyUrl?: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short label for compact UI (nav, filters, breadcrumbs). */
  shortName: string;
  tagline: string;
  summary: string;
  intro: string[];
  image: string;
  imageAlt: string;
  benefits: Benefit[];
  applications: string[];
}
