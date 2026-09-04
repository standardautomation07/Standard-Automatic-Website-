import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { families } from "@/lib/catalog";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="shell">
        <p className="eyebrow text-amber-deep">Error 404</p>
        <h1 className="mt-5 max-w-2xl text-display-2 text-steel-900">
          That page is not here.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-600">
          The page may have been retired, or the address may be wrong. The product index below
          covers the full range.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/products" variant="primary" size="lg">
            Browse products
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Contact us
          </ButtonLink>
        </div>

        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
          {families.map((family) => (
            <li key={family.id} className="bg-paper-raised">
              <Link
                href={`/products/${family.id}`}
                className="group flex h-full items-start justify-between gap-3 p-6"
              >
                <span className="font-display text-base font-medium text-steel-900">
                  {family.name}
                </span>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
