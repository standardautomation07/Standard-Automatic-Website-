"use client";

import { useId, useState } from "react";

/**
 * Independent collapsible sections.
 *
 * Each panel opens and closes on its own and any number can be open at once,
 * which is what a specifier actually wants: technical data and dimensions side
 * by side while they work, rather than one closing because another opened.
 *
 * Accessibility is the standard disclosure pattern — a real <button> carrying
 * aria-expanded and aria-controls, a region labelled by that button, and the
 * panel removed from the tree when closed rather than hidden with CSS. That
 * gets keyboard and screen reader behaviour for free instead of reimplementing
 * it.
 *
 * The chevron rotates and nothing else moves. A height animation on a panel
 * containing a wide specification table costs more than it gives.
 */

export interface AccordionSection {
  id: string;
  title: string;
  /** Shown next to the title — a count, or a one-word hint at the contents. */
  meta?: string;
  content: React.ReactNode;
}

export function Accordion({
  sections,
  defaultOpen = [],
}: {
  sections: AccordionSection[];
  /** Section ids open on first render. Technical data is usually the one. */
  defaultOpen?: string[];
}) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(defaultOpen);

  const toggle = (id: string) =>
    setOpen((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );

  const visible = sections.filter((section) => section.content);

  return (
    <div className="border-t border-line">
      {visible.map((section) => {
        const isOpen = open.includes(section.id);
        const buttonId = `${baseId}-${section.id}-button`;
        const panelId = `${baseId}-${section.id}-panel`;

        return (
          <div key={section.id} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(section.id)}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-amber-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-lg font-medium text-steel-900 group-hover:text-amber-deep">
                    {section.title}
                  </span>
                  {section.meta && (
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-400">
                      {section.meta}
                    </span>
                  )}
                </span>
                <Chevron open={isOpen} />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="pb-8 pt-1"
              >
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center border border-line text-steel-500 transition-colors group-hover:border-steel-900 group-hover:text-steel-900"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Small presentational helpers, so the nine sections on a product page
 * are laid out the same way without repeating markup.
 * ------------------------------------------------------------------ */

export function AccordionList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-steel-700">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function AccordionNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 border-l-2 border-amber bg-amber-soft/50 p-4 text-xs leading-relaxed text-steel-700">
      {children}
    </p>
  );
}
