"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/types";

/**
 * Small, self-contained gallery - no third-party carousel library (the old
 * site's OWL Carousel dependency is exactly the failure class this rebuild
 * avoids, see research/ux-audit.md §1). Degrades to a plain scrollable strip
 * with the first image shown large if JavaScript never runs.
 */
export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-surface-sunken">
        <Image
          src={current.src}
          alt={current.alt || `${productName} — product photo`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          priority
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${productName}`}
              aria-current={i === active}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border ${
                i === active ? "border-brand-steel" : "border-border"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
