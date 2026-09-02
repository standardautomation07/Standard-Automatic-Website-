import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-border bg-ink"
    >
      {category.heroImage && (
        <Image
          src={category.heroImage}
          alt={`${category.name} manufactured by Standard Automation`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-display text-lg font-semibold text-white">{category.name}</h3>
        {category.status === "pending-confirmation" && (
          <span className="mt-1 inline-block rounded-sm bg-white/90 px-2 py-0.5 text-[0.65rem] font-medium text-ink">
            Status pending confirmation
          </span>
        )}
      </div>
    </Link>
  );
}
