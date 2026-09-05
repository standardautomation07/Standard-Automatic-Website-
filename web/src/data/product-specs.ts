import type { Spec, SpecGroup } from "@/lib/types";

/**
 * Authored specification tables.
 *
 * Two mechanisms produce a specification table on this site:
 *
 *  1. `spec-schema.ts` + `spec-values.json` — a field list for the product
 *     type, merged with whatever figures the business can support. Used where
 *     the data we hold is partial.
 *
 *  2. This file — a complete parameter set issued by the business for a
 *     specific product, authored as it was given. Used where the field list
 *     should follow that data rather than a generic schema.
 *
 * The High Speed Doors family is authored here from the technical data issued
 * by Standard Automatic Solutions on 2026-09-05. Every value below is
 * reproduced exactly as supplied. Nothing is rounded, converted, widened,
 * narrowed or "corrected", and no figure is carried across from another
 * manufacturer.
 *
 * Status is assigned mechanically from the supplied data:
 *
 *  - CONFIRMED    — supplied as a fixed value.
 *  - CONFIGURABLE — supplied with an asterisk, meaning the achievable figure
 *                   depends on the size, configuration and environment of the
 *                   opening. The value is published; the dependency is stated
 *                   next to it and repeated as a note under the tables.
 *  - TBC          — the supplied data itself reads "application dependent",
 *                   "project specific" or "configuration dependent", so no
 *                   precise figure can be stated ahead of the project. Where a
 *                   parameter is named but nothing at all was supplied, the
 *                   row carries a null value and renders as to be confirmed.
 *
 * Groups follow the order a specifier reads them in: what will it fit, how
 * does it perform, what is it made of, what drives it, what makes it safe,
 * and what can be added.
 */

/** Supplied as a fixed value. */
const fixed = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIRMED",
  ...(note ? { note } : {}),
});

/** Supplied with an asterisk — a real figure, set by the configuration. */
const configurable = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIGURABLE",
  ...(note ? { note } : {}),
});

/** Supplied as application dependent, project specific or configuration
 *  dependent — the parameter is named, the figure is not fixed. */
const projectSpecific = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "TBC",
  ...(note ? { note } : {}),
});

/** Named because a specifier needs it, with nothing supplied to answer it. */
const unanswered = (label: string, unit?: string, note?: string): Spec => ({
  label,
  value: null,
  status: "TBC",
  ...(unit ? { unit } : {}),
  ...(note ? { note } : {}),
});

const DIMENSIONS = "Dimensions";
const PERFORMANCE = "Performance";
const CONSTRUCTION = "Construction";
const DRIVE = "Drive & control";
const SAFETY = "Safety";
const OPTIONS = "Options";

const group = (name: string, specs: Spec[]): SpecGroup => ({ group: name, specs });

const WIND_CLASS_NOTE = "EN 12424 is the test method behind the wind load class.";
const CLEAR_OPENING_NOTE = "Clear opening between finished reveals.";

/* ------------------------------------------------------------------ *
 * 1. High Speed Roll-Up Door
 * ------------------------------------------------------------------ */
const rollUp: SpecGroup[] = [
  group(DIMENSIONS, [
    configurable("Maximum width", "Up to 5,000 mm", CLEAR_OPENING_NOTE),
    configurable("Maximum height", "Up to 5,000 mm"),
    configurable("Curtain thickness", "0.8–1.2 mm"),
  ]),
  group(PERFORMANCE, [
    configurable("Opening speed", "0.8–2.5 m/s"),
    configurable("Closing speed", "0.5–0.8 m/s"),
    configurable("Wind resistance", "EN 12424 Class 2", WIND_CLASS_NOTE),
  ]),
  group(CONSTRUCTION, [
    fixed("Door type", "High Speed Roll-Up"),
    fixed("Construction", "Flexible PVC curtain"),
    fixed("Curtain", "High-density PVC-coated polyester fabric"),
    fixed("Frame", "Galvanized steel / aluminium / stainless steel"),
    fixed("Guide rails", "Galvanized steel / stainless steel option"),
  ]),
  group(DRIVE, [
    fixed("Drive", "Industrial geared motor"),
    fixed("Power", "230 V / 415 V, 50 Hz"),
    fixed("Control", "PLC / inverter / encoder"),
    fixed("Activation options", "Radar / push button / photocell / loop"),
  ]),
  group(SAFETY, [
    fixed("Safety", "Photocell + safety edge"),
    fixed("Emergency operation", "Manual crank / manual override"),
  ]),
  group(OPTIONS, [
    fixed("Vision panels", "Optional transparent PVC"),
    fixed("Mounting", "Internal / external depending on configuration"),
  ]),
];

/* ------------------------------------------------------------------ *
 * 2. High Speed Fold-Up Door
 * ------------------------------------------------------------------ */
const foldUp: SpecGroup[] = [
  group(DIMENSIONS, [
    configurable("Maximum width", "Up to 5,000 mm", CLEAR_OPENING_NOTE),
    configurable("Maximum height", "Up to 8,000 mm"),
    configurable("Curtain thickness", "0.8–1.2 mm"),
  ]),
  group(PERFORMANCE, [
    configurable("Opening speed", "0.8–2.5 m/s"),
    configurable("Closing speed", "0.8–2.5 m/s"),
    configurable("Wind resistance", "EN 12424 Class 2 / Class 3 configuration", WIND_CLASS_NOTE),
  ]),
  group(CONSTRUCTION, [
    fixed("Door type", "High Speed Fold-Up"),
    fixed("Curtain", "Reinforced PVC-coated fabric"),
    fixed("Frame", "Galvanized steel / aluminium / stainless steel"),
    fixed("Track / cover", "Heavy-duty galvanized steel"),
  ]),
  group(DRIVE, [
    fixed("Drive", "Industrial geared motor"),
    configurable(
      "Motor options",
      "0.75 / 1.1 / 1.5 kW configurations",
      "Selected against the leaf size and the duty the opening imposes.",
    ),
    fixed("Control", "PLC + inverter + encoder"),
    fixed("Activation", "Radar / push button / infrared"),
  ]),
  group(SAFETY, [
    fixed("Safety", "Photoelectric protection / safety edge"),
    fixed("Emergency opening", "Manual crank"),
  ]),
  group(OPTIONS, [
    fixed("Vision panels", "Transparent PVC windows"),
    fixed("Mounting", "Internal / external"),
  ]),
];

/* ------------------------------------------------------------------ *
 * 3. High Speed Self-Repairing Door
 * ------------------------------------------------------------------ */
const selfRepairing: SpecGroup[] = [
  group(DIMENSIONS, [
    projectSpecific("Maximum width", "Application dependent; engineered to opening"),
    projectSpecific("Maximum height", "Application dependent"),
  ]),
  group(PERFORMANCE, [
    configurable("Opening speed", "Up to 2.0–2.5 m/s"),
    configurable("Closing speed", "Approximately 0.5–0.8 m/s"),
    configurable("Wind resistance", "Typically Class 2–3 configuration", WIND_CLASS_NOTE),
  ]),
  group(CONSTRUCTION, [
    fixed("Door type", "Self-Repairing High Speed Door"),
    fixed("Curtain", "Flexible reinforced PVC"),
    fixed("Guide system", "Flexible self-repairing guides"),
    fixed("Curtain recovery", "Automatic re-entry into guide system"),
    fixed("Impact recovery", "Automatic / self-resetting"),
  ]),
  group(DRIVE, [
    fixed("Drive", "High-cycle geared motor"),
    fixed("Control", "Inverter-based controller"),
    fixed("Activation", "Radar / loop / pull switch / remote"),
  ]),
  group(SAFETY, [
    fixed("Safety", "Photocells + bottom safety edge"),
    fixed("Emergency operation", "Manual override"),
  ]),
  group(OPTIONS, [fixed("Vision panel", "Optional")]),
];

/* ------------------------------------------------------------------ *
 * 4. High Speed Spiral Door
 * ------------------------------------------------------------------ */
const spiral: SpecGroup[] = [
  group(DIMENSIONS, [
    configurable("Maximum width", "Up to 5,000–6,000 mm", CLEAR_OPENING_NOTE),
    configurable("Maximum height", "Up to 5,000–6,000 mm"),
    configurable("Panel thickness", "Approximately 40–43 mm"),
  ]),
  group(PERFORMANCE, [
    configurable("Opening speed", "Up to 2.5 m/s"),
    configurable("Closing speed", "Approximately 0.5 m/s"),
    projectSpecific(
      "Wind resistance",
      "Configuration dependent; engineered for applicable wind conditions",
    ),
    projectSpecific("Thermal performance", "Configuration dependent"),
  ]),
  group(CONSTRUCTION, [
    fixed("Door type", "High Speed Spiral Door"),
    fixed("Door leaf", "Insulated rigid aluminium panels"),
    fixed("Insulation", "PU / thermal insulation configuration"),
    fixed(
      "Guide system",
      "Spiral / high-speed track",
      "The leaf follows a spiral above the opening, so the panels do not rest on one another.",
    ),
  ]),
  group(DRIVE, [
    fixed("Drive", "High-cycle industrial motor"),
    fixed("Control", "Frequency-controlled"),
    fixed("Activation", "Radar / photocell / loop / push button"),
  ]),
  group(SAFETY, [
    fixed("Safety", "Light curtain / photocell / safety edge"),
    fixed("Emergency operation", "Manual release"),
  ]),
  group(OPTIONS, [fixed("Vision", "Optional transparent panel configuration")]),
];

/* ------------------------------------------------------------------ *
 * 5. High Speed Rigid / Insulated Door
 * ------------------------------------------------------------------ */
const rigid: SpecGroup[] = [
  group(DIMENSIONS, [
    configurable("Maximum width", "Up to 5,000 mm", CLEAR_OPENING_NOTE),
    configurable("Maximum height", "Up to 7,500 mm"),
    configurable("Panel thickness", "40–43 mm"),
  ]),
  group(PERFORMANCE, [
    configurable("Opening speed", "Approximately 1.2–1.5 m/s"),
    configurable("Closing speed", "Approximately 0.6 m/s"),
    projectSpecific("Wind resistance", "Engineered for external applications"),
  ]),
  group(CONSTRUCTION, [
    fixed("Door type", "High Speed Rigid / Insulated"),
    fixed("Construction", "Double-skin insulated rigid panels"),
    fixed("Panel material", "Aluminium alloy / engineered metal panel"),
    fixed("Insulation", "PU / thermal insulation core"),
  ]),
  group(DRIVE, [
    fixed("Drive", "Industrial geared motor"),
    fixed("Control", "PLC / inverter / encoder"),
    fixed("Activation", "Radar / infrared / push button"),
  ]),
  group(SAFETY, [fixed("Safety", "Photocell / safety edge / emergency stop")]),
  group(OPTIONS, [fixed("Vision", "Optional")]),
];

/* ------------------------------------------------------------------ *
 * 6. High Speed Cleanroom / Hygiene Door
 *
 * No classification and no approval of any kind is published against this
 * product. A cleanroom class is a property of the room and its air handling,
 * and nothing of that kind has been supplied for the door.
 * ------------------------------------------------------------------ */
const cleanroom: SpecGroup[] = [
  group(DIMENSIONS, [projectSpecific("Maximum dimensions", "Project specific")]),
  group(PERFORMANCE, [
    projectSpecific("Opening speed", "Application dependent"),
    projectSpecific("Closing speed", "Application dependent"),
  ]),
  group(CONSTRUCTION, [
    fixed("Door type", "High Speed Cleanroom / Hygiene Door"),
    fixed("Construction", "Sealed rapid-door assembly"),
    fixed("Curtain", "Hygienic PVC / smooth cleanable surface"),
    fixed("Frame", "Stainless steel / hygienic-coated construction"),
    fixed("Guide rails", "Stainless steel / hygienic construction"),
    fixed("Sealing", "Side and bottom seals"),
  ]),
  group(DRIVE, [
    unanswered("Drive", "operator type", "Not stated in the issued data for this line."),
    unanswered("Power", "V / phase / Hz"),
    fixed("Control enclosure", "Hygienic / suitable IP-rated configuration"),
    fixed("Activation", "Radar / touchless sensor / push button"),
  ]),
  group(SAFETY, [fixed("Safety", "Photocells + safety edge")]),
  group(OPTIONS, [
    fixed("Vision panel", "Optional"),
    fixed("Cleaning", "Designed for routine cleaning/washdown where specified"),
  ]),
];

/* ------------------------------------------------------------------ *
 * 7. High Speed Cold Storage / Freezer Door
 * ------------------------------------------------------------------ */
const coldStorage: SpecGroup[] = [
  group(DIMENSIONS, [projectSpecific("Maximum dimensions", "Project-specific")]),
  group(PERFORMANCE, [
    projectSpecific("Opening speed", "Application dependent"),
    projectSpecific("Closing speed", "Application dependent"),
    projectSpecific(
      "Operating temperature",
      "Project-specific",
      "The room temperature the door has to work at, which is what drives the curtain and guide configuration.",
    ),
  ]),
  group(CONSTRUCTION, [
    fixed("Door type", "High Speed Cold Storage / Freezer Door"),
    fixed("Curtain", "Insulated flexible PVC / specialist cold-temperature curtain"),
    fixed("Guides", "Heated / temperature-resistant configuration where required"),
    fixed("Bottom seal", "Cold-storage sealing system"),
  ]),
  group(DRIVE, [
    unanswered("Drive", "operator type", "Not stated in the issued data for this line."),
    unanswered("Power", "V / phase / Hz"),
    fixed("Control", "Frequency-controlled"),
    fixed("Activation", "Radar / pull switch / loop / remote"),
  ]),
  group(SAFETY, [fixed("Safety", "Photocells / safety edge")]),
  group(OPTIONS, [
    fixed("Anti-condensation", "Optional depending on environment"),
    fixed("Heater system", "Optional / application dependent"),
  ]),
];

/**
 * Authored specification tables, keyed by product id. A product listed here
 * takes its table from this file; everything else resolves through the schema
 * and spec-values.json.
 */
export const authoredSpecs: Record<string, SpecGroup[]> = {
  "high-speed-roll-up-door": rollUp,
  "high-speed-fold-up-door": foldUp,
  "high-speed-self-repairing-door": selfRepairing,
  "high-speed-spiral-door": spiral,
  "high-speed-rigid-insulated-door": rigid,
  "high-speed-cleanroom-hygiene-door": cleanroom,
  "high-speed-cold-storage-freezer-door": coldStorage,
};

/**
 * Shown wherever a table carries a CONFIGURABLE or TBC row, so a figure that
 * depends on the project is never read as a universal guarantee.
 */
export const CONFIGURATION_NOTE =
  "Final specification depends on door dimensions, configuration, operating environment and project requirements.";
