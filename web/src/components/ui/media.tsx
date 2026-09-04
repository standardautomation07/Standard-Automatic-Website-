import NextImage from "next/image";
import { image } from "@/data/images";

/**
 * The only way an image reaches the page. It takes a registry id, never a
 * path, so alt text, source and usage status always travel with the picture.
 */
interface MediaProps {
  id: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Overrides the registry's fit — used where the same asset is cropped
   *  differently in a hero than in a card. */
  fit?: "cover" | "contain";
  /** Decorative use: the image repeats an adjacent caption, so it is hidden
   *  from assistive technology rather than described twice. */
  decorative?: boolean;
}

export function Media({ id, sizes, className = "", priority, fit, decorative }: MediaProps) {
  const ref = image(id);
  const resolved = fit ?? ref.fit ?? "cover";
  const objectFit = resolved === "contain" ? "object-contain p-8" : "object-cover";

  return (
    <NextImage
      src={ref.src}
      alt={decorative ? "" : ref.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`${objectFit} ${className}`}
    />
  );
}

export function StatusBadge({ status, className = "" }: { status: "CONFIRMED" | "POTENTIAL"; className?: string }) {
  if (status === "CONFIRMED") return null;
  return (
    <span
      className={`inline-flex items-center rounded-edge border border-amber-deep/30 bg-amber-soft px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-amber-deep ${className}`}
    >
      To be confirmed
    </span>
  );
}
