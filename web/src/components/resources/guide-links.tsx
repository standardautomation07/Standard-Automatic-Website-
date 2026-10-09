import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import type { ResourceGuide } from "@/data/resources";

/**
 * A grid of links to resource guides — the list on the Resources page, and
 * the "Selection guides" block on product and family pages.
 */
export function GuideLinks({ guides, className = "mt-6" }: { guides: ResourceGuide[]; className?: string }) {
  return (
    <ul className={`${className} grid hairline-grid sm:grid-cols-2 xl:grid-cols-3`}>
      {guides.map((guide) => (
        <li key={guide.slug} className="bg-paper-raised">
          <Link href={`/resources/${guide.slug}`} className="group flex h-full items-start justify-between gap-3 p-6">
            <span>
              <span className="block font-display text-base font-medium text-steel-900">{guide.title}</span>
              <span className="mt-1 block text-sm text-steel-600">{guide.description}</span>
            </span>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
