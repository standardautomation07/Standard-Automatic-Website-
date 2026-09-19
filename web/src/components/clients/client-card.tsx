"use client";

import { useId, useRef, useState } from "react";
import { MapPin, Close } from "@/components/ui/icons";
import {
  organisationCounts,
  organisationLocations,
  type ClientOrganisation,
} from "@/data/clients";

const SHOW_LOCATIONS = 3;

/**
 * One organisation in the Trusted Clients & Project Partners grid.
 *
 * The logo is the hero, the name is secondary, the location line is
 * tertiary. Product types are deliberately not rendered here; they live in
 * the dataset for future project pages. Clicking the card opens a small
 * native <dialog> with the organisation's projects — the grid itself stays
 * clean.
 */
export function ClientCard({ org }: { org: ClientOrganisation }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState(false);
  const titleId = useId();
  const locations = organisationLocations(org);
  const counts = organisationCounts(org);
  const shown = expanded ? locations : locations.slice(0, SHOW_LOCATIONS);
  const hidden = locations.length - shown.length;

  return (
    <article className="group relative flex h-full flex-col bg-paper-raised transition-colors duration-300 hover:bg-paper">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        aria-label={`${org.displayName} — projects and locations`}
        className="flex flex-1 flex-col items-center px-6 pb-7 pt-8 text-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber"
      >
        <ClientLogo org={org} />
        <h3 className="mt-6 font-display text-base font-medium leading-snug text-steel-900">
          {org.displayName}
        </h3>
      </button>

      <p className="flex items-start justify-center gap-1.5 px-6 pb-7 text-center text-xs leading-relaxed text-steel-500">
        <MapPin className="mt-[3px] h-3.5 w-3.5 shrink-0 text-amber" />
        <span>
          {shown.join(" · ")}
          {hidden > 0 && (
            <>
              {" · "}
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="font-medium text-amber-deep underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                +{hidden} more
              </button>
            </>
          )}
        </span>
      </p>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[min(92vw,34rem)] rounded-edge border border-line bg-paper-raised p-0 text-steel-900 shadow-2xl backdrop:bg-ink/70"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="p-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow text-steel-500">Client / project partner</p>
              <h4 id={titleId} className="mt-3 font-display text-xl font-medium text-steel-900">
                {org.displayName}
              </h4>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-500">
                {counts.completed} completed
                {counts.ongoing > 0 && ` · ${counts.ongoing} ongoing`}
                {" · "}
                {locations.length} {locations.length === 1 ? "location" : "locations"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="-mr-2 -mt-2 p-2 text-steel-500 transition-colors hover:text-steel-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>

          <ul className="mt-6 divide-y divide-line border-y border-line">
            {org.projects.map((project) => (
              <li key={project.ref} className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium text-steel-900">{project.projectName}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-steel-500">
                    <MapPin className="h-3 w-3 text-amber" />
                    {project.location}
                  </p>
                </div>
                <span
                  className={`shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] ${
                    project.status === "ongoing" ? "text-amber-deep" : "text-steel-500"
                  }`}
                >
                  {project.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </article>
  );
}

/**
 * Consistent logo well. Logos keep their aspect ratio inside a fixed box;
 * the default state is desaturated and the brand colour returns on hover or
 * focus. Logos published only as a white knockout sit on a dark well, and
 * organisations without a verified logo get an initials placeholder.
 */
function ClientLogo({ org }: { org: ClientOrganisation }) {
  if (!org.logo) {
    return (
      <div
        className="flex h-24 w-full items-center justify-center border border-dashed border-line bg-paper-sunken"
        aria-hidden="true"
      >
        <span className="font-display text-2xl font-medium tracking-tight text-steel-500">
          {org.initials}
        </span>
      </div>
    );
  }

  const well = org.logoOnDark
    ? "bg-ink px-6"
    : "px-4";

  return (
    <div className={`flex h-24 w-full items-center justify-center ${well}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static logo assets of mixed formats (SVG/PNG); no optimisation pipeline needed */}
      <img
        src={org.logo}
        alt={org.displayName}
        loading="lazy"
        decoding="async"
        className={`max-h-16 w-auto max-w-[11rem] object-contain transition-all duration-300 ${
          org.logoOnDark
            ? "opacity-90 group-hover:opacity-100"
            : "opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-focus-within:opacity-100 group-focus-within:grayscale-0"
        }`}
      />
    </div>
  );
}
