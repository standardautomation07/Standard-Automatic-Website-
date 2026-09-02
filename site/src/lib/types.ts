export type CategoryStatus = "active" | "pending-confirmation";

export interface ProductImage {
  src: string;
  alt: string | null;
}

export interface ProductSection {
  heading: string;
  text: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  categorySlug: string;
  legacyUrl: string;
  navLive: boolean;
  confirmedVariant: boolean;
  confirmationNote: string | null;
  shortDescription: string | null;
  sections: ProductSection[];
  featuresText: string | null;
  specifications: Specification[];
  applications: string[];
  images: ProductImage[];
  materials: string | null;
  dimensions: string | null;
  certifications: string | null;
  relatedSlugs: string[];
}

export interface Category {
  slug: string;
  name: string;
  status: CategoryStatus;
  legacyUrl: string;
  seoTitle: string | null;
  seoDescription: string | null;
  h1: string;
  productSlugs: string[];
  heroImage: string | null;
}

export interface Catalog {
  categories: Category[];
  products: Product[];
}
