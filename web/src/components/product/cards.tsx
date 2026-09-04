import Link from "next/link";
import { familyById, familyPath, productPath, productsInFamily } from "@/lib/catalog";
import type { Family, Product } from "@/lib/types";
import { Media, StatusBadge } from "@/components/ui/media";
import { ArrowRight } from "@/components/ui/icons";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const family = familyById[product.familyId];

  return (
    <article className="group relative flex flex-col border border-line bg-paper-raised transition-colors duration-300 hover:border-steel-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-sunken">
        <Media
          id={product.imageId}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          priority={priority}
          decorative
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-steel-500">{family.shortName}</p>
        <h3 className="mt-3 font-display text-xl font-medium text-steel-900">
          <Link href={productPath(product)} className="before:absolute before:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-600">{product.summary}</p>

        {product.variants.length > 0 && (
          <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-500">
            {product.variants.length} {product.variants.length === 1 ? "configuration" : "configurations"}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-steel-900">
            Explore product
            <ArrowRight className="h-4 w-4 text-amber transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <StatusBadge status={product.status} />
        </div>
      </div>
    </article>
  );
}

/**
 * Family card for the products landing page. Shows a few representative
 * product names so the family is legible without a click.
 */
export function FamilyCard({ family, index }: { family: Family; index: number }) {
  const inFamily = productsInFamily(family.id);
  const representative = inFamily.slice(0, 3);

  return (
    <article className="group relative flex flex-col bg-paper-raised">
      <Link
        href={familyPath(family.id)}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Media
            id={family.imageId}
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            decorative
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
          <span className="absolute left-5 top-5 font-mono text-[0.65rem] text-white/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute bottom-4 left-5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/80">
            {inFamily.length} products
          </span>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="flex items-start justify-between gap-4 font-display text-xl font-medium text-steel-900">
            {family.name}
            <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-amber transition-transform duration-300 group-hover:translate-x-1" />
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-steel-600">{family.summary}</p>

          <ul className="mt-5 flex flex-1 flex-wrap content-start gap-x-2 gap-y-1.5">
            {representative.map((product) => (
              <li
                key={product.id}
                className="rounded-edge border border-line px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-steel-500"
              >
                {product.name}
              </li>
            ))}
            {inFamily.length > representative.length && (
              <li className="px-1 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-steel-400">
                +{inFamily.length - representative.length} more
              </li>
            )}
          </ul>
        </div>
      </Link>
    </article>
  );
}
