"use client";

import { useId, useRef, useState } from "react";

/**
 * Horizontal tabs for the product detail sections.
 *
 * One panel is shown at a time, selected from a row of tabs across the top.
 * That suits a long specification better than a stack of always-open sections:
 * the reader sees everything on offer at a glance, and the page stays one
 * screen tall regardless of how much data sits behind it.
 *
 * The tab strip wraps rather than scrolling. Nine labels sit on one line on a
 * desktop and fold onto several short rows on a phone, which keeps every
 * section visible instead of hiding half of them off the edge of a scrolling
 * strip — the usual failure of horizontal tabs on a narrow screen. The count
 * under each label is dropped on small screens, where the space costs more
 * than the information is worth.
 *
 * Accessibility follows the standard tabs pattern: a labelled tablist, tabs
 * carrying aria-selected and aria-controls, one tab in the tab order at a time
 * with the arrow keys moving between them, Home and End jumping to the ends,
 * and a focusable panel labelled by its tab. Only the selected panel is in the
 * DOM, so assistive technology and find-in-page see what is actually on show.
 */

export interface TabSection {
  id: string;
  title: string;
  /** Shown under the title — a count, or a one-word hint at the contents. */
  meta?: string;
  content: React.ReactNode;
}

export function Tabs({
  sections,
  defaultTab,
  label = "Product detail",
}: {
  sections: TabSection[];
  /** Section shown first. Defaults to the first one. */
  defaultTab?: string;
  label?: string;
}) {
  const baseId = useId();
  const visible = sections.filter((section) => section.content);
  const [selected, setSelected] = useState(defaultTab ?? visible[0]?.id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  if (visible.length === 0) return null;

  const current = visible.find((section) => section.id === selected) ?? visible[0];

  const focusTab = (id: string) => {
    setSelected(id);
    tabRefs.current[id]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = visible.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      focusTab(visible[next].id);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        className="flex flex-wrap gap-px border-b border-line bg-line"
      >
        {visible.map((section, index) => {
          const isSelected = section.id === current.id;
          return (
            <button
              key={section.id}
              ref={(node) => {
                tabRefs.current[section.id] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-${section.id}-tab`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-${section.id}-panel`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(section.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`flex-1 basis-[calc(50%-1px)] px-3 py-2.5 text-left sm:px-4 sm:py-3.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber sm:basis-[calc(33.333%-1px)] lg:flex-none lg:basis-auto ${
                isSelected
                  ? "bg-paper-raised"
                  : "bg-paper-sunken text-steel-600 hover:bg-paper-raised hover:text-steel-900"
              }`}
            >
              <span
                className={`block font-display text-sm font-medium leading-tight ${
                  isSelected ? "text-steel-900" : ""
                }`}
              >
                {section.title}
              </span>
              {section.meta && (
                <span className="mt-1 hidden font-mono text-[0.6rem] uppercase tracking-[0.1em] text-steel-400 sm:block">
                  {section.meta}
                </span>
              )}
              <span
                aria-hidden="true"
                className={`mt-1.5 block h-0.5 w-full sm:mt-2.5 ${isSelected ? "bg-amber" : "bg-transparent"}`}
              />
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-${current.id}-panel`}
        aria-labelledby={`${baseId}-${current.id}-tab`}
        tabIndex={0}
        className="border border-t-0 border-line bg-paper-raised p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber lg:p-8"
      >
        {current.content}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Small presentational helpers, so the sections on a product page are
 * laid out the same way without repeating markup.
 * ------------------------------------------------------------------ */

export function DetailList({ items }: { items: string[] }) {
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

export function DetailNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 border-l-2 border-amber bg-amber-soft/50 p-4 text-xs leading-relaxed text-steel-700">
      {children}
    </p>
  );
}
