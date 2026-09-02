import Link from "next/link";
import { BreadcrumbJsonLd, type Crumb } from "@/components/seo/breadcrumb-json-ld";

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb" className="container-x py-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-brand-steel">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
