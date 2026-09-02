import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductCard({ product, categorySlug }: { product: Product; categorySlug: string }) {
  const image = product.images[0];

  return (
    <Link
      href={`/products/${categorySlug}/${product.slug}`}
      className="group block overflow-hidden rounded-sm border border-border bg-surface-raised transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-sunken">
        {image && (
          <Image
            src={image.src}
            alt={image.alt || `${product.name} — ${product.name.toLowerCase()} manufactured by Standard Automation`}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {!product.navLive && (
          <span className="absolute left-2 top-2 rounded-sm bg-surface-raised/90 px-2 py-0.5 text-[0.65rem] font-medium text-ink-muted">
            Pending nav reinstatement
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-semibold">{product.name}</h3>
        {product.shortDescription && (
          <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">
            {product.shortDescription}
          </p>
        )}
        <span className="mt-3 inline-block text-sm font-medium text-brand-steel">
          View details &rarr;
        </span>
      </div>
    </Link>
  );
}
