import Image from "next/image";
import Link from "next/link";
import { categoryBySlug, productPath } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { ArrowRight } from "@/components/ui/icons";

export function PendingBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-edge border border-amber-deep/30 bg-amber-soft px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-amber-deep ${className}`}
    >
      Awaiting confirmation
    </span>
  );
}

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const category = categoryBySlug[product.category];

  return (
    <article className="group relative flex flex-col border border-line bg-paper-raised transition-colors duration-300 hover:border-steel-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-sunken">
        {product.image && (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${product.imageFit === "contain" ? "object-contain p-8" : "object-cover"}`}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-steel-500">{category.shortName}</p>
        <h3 className="mt-3 font-display text-xl font-medium text-steel-900">
          <Link href={productPath(product)} className="before:absolute before:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-600">{product.summary}</p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-steel-900">
            Explore product
            <ArrowRight className="h-4 w-4 text-amber transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          {product.pendingConfirmation && <PendingBadge />}
        </div>
      </div>
    </article>
  );
}
