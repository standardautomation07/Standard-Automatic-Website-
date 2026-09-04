import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Two-digit section number, e.g. "02". */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "start" | "between";
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "start",
  action,
  className = "",
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-steel-400" : "text-steel-600";
  const heading = tone === "dark" ? "text-white" : "text-steel-900";

  return (
    <div
      className={`${
        align === "between"
          ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          : ""
      } ${className}`}
    >
      <div className="max-w-2xl">
        <p className={`eyebrow flex items-center gap-3 ${muted}`}>
          {index && <span className="text-amber">{index}</span>}
          <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className={`mt-5 text-display-3 ${heading}`}>{title}</h2>
        {lede && <p className={`mt-5 text-base leading-relaxed ${muted}`}>{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
