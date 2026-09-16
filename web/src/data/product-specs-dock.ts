import type { Spec, SpecGroup } from "@/lib/types";

/**
 * Dock Leveller specification table.
 *
 * This product already held twelve confirmed values in `spec-values.json`.
 * They are reproduced here character for character, with the schema notes
 * they were displayed with, so nothing a specifier has already read changes.
 * The rows that were "to be confirmed" take the baseline Standard Automatic
 * Solutions issued for this product.
 *
 * Authoring it here rather than extending `spec-values.json` is what lets a
 * baseline answer keep its qualification. A value in that file renders as
 * CONFIRMED with nothing beside it; "where required", "configuration
 * dependent" and "available on request" are not confirmed figures and should
 * not be shown as though they were.
 *
 * Group names and field labels are the `dockLeveller` schema's, unchanged.
 * The issued baseline uses its own labels, so it is mapped onto the existing
 * ones and nothing is added: where the baseline names a parameter the schema
 * has no row for — operating system, control enclosure rating, warning
 * markings, duty, application — it is not published, because adding rows was
 * ruled out.
 *
 * Two rows stay unanswered on purpose and are called out below. Where the
 * baseline conflicts with an already-confirmed value, the confirmed value is
 * kept and the conflict is reported rather than silently resolved either way.
 */

const fixed = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIRMED",
  ...(note ? { note } : {}),
});

/** Offered, and fitted according to the configuration. */
const configurable = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIGURABLE",
  ...(note ? { note } : {}),
});

/** The answer is a dependency rather than a figure. */
const dependent = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "TBC",
  ...(note ? { note } : {}),
});

/** Nothing supplied that answers it; still renders as to be confirmed. */
const unanswered = (label: string, note?: string): Spec => ({
  label,
  value: null,
  status: "TBC",
  ...(note ? { note } : {}),
});

const dockLeveller: SpecGroup[] = [
  {
    group: "Platform",
    specs: [
      // Confirmed before this change; kept verbatim.
      fixed("Platform length", "2000 mm or 2500 mm (±2)"),
      fixed("Platform width", "1830 mm, 2000 mm or 2130 mm (±2)"),
      fixed("Platform height", "500 mm or 600 mm (±2)"),
      // From the issued baseline.
      configurable("Lip length", "400–600 mm"),
      // The baseline describes the lip and its construction; the schema has one
      // row for both. Swing versus telescopic was not stated, so neither is.
      fixed("Lip type", "Heavy-duty welded steel lip with an anti-slip surface", "Swing lip or telescopic lip."),
    ],
  },
  {
    group: "Foundation pit",
    specs: [
      fixed("Pit length", "2000 mm or 2500 mm (±2)"),
      fixed("Pit width", "1880 mm, 2050 mm or 2180 mm (±2)"),
      fixed("Pit depth", "515 mm or 615 mm (±2)"),
      // No tolerance figure was issued; the confirmed dimensions above already
      // carry ±2, so this row states the dependency rather than a number.
      dependent("Pit tolerances", "Final pit dimensions are installation and configuration dependent"),
    ],
  },
  {
    group: "Working range and capacity",
    specs: [
      // Published in the units issued. Rated load and evenly distributed load
      // are stated separately and named as such; neither is converted to kN,
      // and the schema's axle-load note is not attached because the issued
      // figures were not given as axle loads.
      fixed(
        "Rated capacity",
        "Rated load 6,000 kg; evenly distributed load capacity up to 15,000 kg",
        "Rated load and evenly distributed load are different quantities and are quoted separately.",
      ),
      fixed("Working range above dock", "725–750 mm"),
      fixed("Working range below dock", "225–380 mm"),
      fixed("Operating temperature", "-35 °C to +50 °C"),
    ],
  },
  {
    group: "Construction",
    specs: [
      // Deliberately unanswered: the baseline says typically 6–8 mm, but the
      // confirmed deck plate type below reads 14 mm. Publishing both would
      // contradict the page; engineering must say which is current.
      unanswered("Deck plate thickness"),
      fixed("Deck plate type", "14 mm tear plate, double 5° bending"),
      // Nothing in the baseline describes the hinge arrangement.
      unanswered("Hinge arrangement"),
      fixed("Finish", "Epoxy resin, long-term anti-corrosion"),
    ],
  },
  {
    group: "Hydraulics and power",
    specs: [
      fixed("Power pack rating", "≤ 1.5 kW"),
      // Volts and phase as issued; frequency was not stated, so no Hz figure
      // is shown or implied.
      configurable("Supply voltage", "400 V AC three phase, or 230 V AC configuration where applicable"),
      fixed("Cylinder arrangement", "Hydraulic cylinder-operated platform and lip"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed("Control station", "Push-button control panel with hold-to-run operation and emergency stop"),
      // The baseline offers these as integrations rather than as standard
      // fittings, and says vehicle restraint must not be described as included.
      configurable("Door interlock", "Loading-bay door interlock integration available"),
      configurable(
        "Bay signalling interface",
        "Integration with traffic lights, vehicle restraints and other dock equipment available",
      ),
    ],
  },
  {
    group: "Safety",
    specs: [
      fixed("Maintenance strut", "Mechanical maintenance support prop"),
      fixed("Hose burst protection", "Hydraulic safety valve and velocity fuse to prevent uncontrolled descent"),
      configurable("Toe guards", "Side safety guards and toe protection where required"),
      fixed("Emergency stop", "Emergency stop function"),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "Designed with reference to EN 1398 for dock levellers",
        "EN 1398 is the safety standard for dock levellers.",
      ),
      dependent("Conformity marking", "As applicable to the supplied configuration and market"),
      dependent("Certificate reference", "Available on request; configuration dependent"),
    ],
  },
];

/** Authored loading bay tables, merged into `authoredSpecs`. */
export const dockSpecs: Record<string, SpecGroup[]> = {
  "dock-levellers": dockLeveller,
};
