import type { Spec, SpecGroup } from "@/lib/types";

/**
 * Automatic Sliding Gate specification table.
 *
 * Authored from the baseline specification Standard Automatic Solutions
 * approved for this product. Before this the gate resolved through
 * `spec-schema.ts` with no entry in `spec-values.json`, so every row rendered
 * as "to be confirmed".
 *
 * The group names and field labels below are exactly those of the `gate`
 * schema, so the page structure a specifier already knows is unchanged — only
 * the values arrive.
 *
 * Authoring it here rather than adding it to `spec-values.json` is deliberate.
 * A value in that file renders as CONFIRMED with no qualification available,
 * which would have published "application dependent" and "site-specific"
 * answers as though they were fixed guarantees. This file can say what each
 * figure actually is:
 *
 *  - CONFIRMED    — a fixed answer that holds for the product as offered.
 *  - CONFIGURABLE — a real published figure whose achievable value is set by
 *                   the size, weight and configuration of the gate. Every
 *                   "up to" maximum sits here, as does motor power.
 *  - TBC          — the approved baseline is itself a dependency rather than
 *                   a figure: application dependent, site-specific, or
 *                   available on request.
 *
 * Two schema notes are deliberately not carried across, because on a page that
 * publishes no test evidence they read as compliance claims rather than as
 * context: "EN 12453" beside operating force limitation, and "EN 13241 and EN
 * 12604 apply to powered gates in this market" beside the product standard.
 * The published answers reference applicable standards without asserting that
 * conformity has been assessed or certified. No certificate number, CE mark or
 * declaration is claimed anywhere below.
 */

const fixed = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIRMED",
  ...(note ? { note } : {}),
});

/** A real figure, bounded by the configuration it is quoted against. */
const configurable = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIGURABLE",
  ...(note ? { note } : {}),
});

/** The approved answer is a dependency, not a figure. */
const dependent = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "TBC",
  ...(note ? { note } : {}),
});

const slidingGate: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable("Maximum clear opening", "Up to 12,000 mm"),
      configurable("Maximum leaf width", "Up to 12,000 mm"),
      configurable("Maximum leaf height", "Up to 2,500 mm"),
      configurable("Maximum leaf weight", "Up to 2,500 kg", "With the operator, this is what sizes the drive."),
      dependent(
        "Side-run or swing room required",
        "Approximately equal to the gate leaf width; final requirement is configuration and site dependent",
      ),
    ],
  },
  {
    group: "Cycle performance",
    specs: [
      configurable("Travel speed", "Up to 10 m/min"),
      dependent(
        "Opening time for full travel",
        "Application dependent",
        "Set by the clear opening, the leaf weight, the operator configuration and its acceleration and deceleration, so no single figure covers every installation.",
      ),
      configurable("Rated daily cycles", "Up to 300 cycles/day"),
    ],
  },
  {
    group: "Construction",
    specs: [
      fixed("Frame section", "Heavy-duty MS structural steel section"),
      fixed("Infill", "MS, GI, SS or aluminium, and customised infill options"),
      fixed("Running gear", "Heavy-duty rollers with guide system", "Wheels, rollers, cantilever carriage or hinges."),
      configurable(
        "Ground arrangement",
        "Tracked sliding or cantilever configuration available",
        "Tracked, trackless or cantilever.",
      ),
      dependent("Posts and foundations", "Site-specific structural design"),
      fixed("Finish and colour", "Powder coated, PU painted or hot-dip galvanized options"),
    ],
  },
  {
    group: "Drive",
    specs: [
      fixed("Operator type", "Rack-and-pinion geared operator"),
      configurable(
        "Rated motor power",
        "0.75–1.5 kW, depending on gate size and weight",
        "Selected per gate rather than fixed across the range.",
      ),
      fixed("Supply voltage", "230 V AC single phase, or 415 V AC three phase"),
      fixed("Duty rating", "Heavy-duty, intensive use"),
      fixed("Manual override", "Key-operated emergency manual release"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed("Control system", "Microprocessor-based electronic control panel"),
      fixed(
        "Activation devices",
        "Remote control, push button, key switch, RFID or access control, and loop detector",
      ),
      configurable(
        "Travel limit setting",
        "Electronic or magnetic limit system, depending on the operator",
      ),
      fixed(
        "Interfaces",
        "Access control, traffic lights, interlocks, and external control systems",
        "Access control, traffic lights, alarm panel, interlocks.",
      ),
    ],
  },
  {
    group: "Safety",
    specs: [
      fixed("Photocells", "Dual safety photocells with presence detection"),
      configurable("Safety edge", "Sensitive safety edge where required"),
      fixed("Obstruction detection", "Electronic obstruction detection with automatic stop and reverse"),
      fixed("Operating force limitation", "Designed and tested according to applicable powered-gate safety requirements"),
      fixed("Manual release", "Emergency manual release"),
      fixed(
        "Warning light and audible warning",
        "Flashing warning light; audible warning optional where the application requires it",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed("Product standard", "Designed with reference to applicable standards for powered gates"),
      dependent("Conformity marking", "As applicable to the supplied configuration and market"),
      dependent("Certificate reference", "Available on request; configuration dependent"),
    ],
  },
];

/**
 * Automatic Swing Gate specification table.
 *
 * Authored from the indicative specification Standard Automatic Solutions
 * issued for this product. The asterisks in that table mark the parameters it
 * states are dependent on gate construction, leaf dimensions, wind load, hinge
 * and pivot geometry, operator model, installation conditions and operating
 * frequency; those rows are published as CONFIGURABLE so the figure is shown
 * and the dependency travels with it. "Model dependent" answers carry no
 * figure at all and stay TBC.
 *
 * Field labels are the `gate` schema's, unchanged. The issued table calls one
 * row "Maximum leaf weight with the operator"; the page keeps its existing
 * label and its existing note, which already says the weight is quoted with
 * the operator.
 */
const swingGate: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable("Maximum clear opening", "Up to 10,000 mm"),
      configurable("Maximum leaf width", "Up to 5,000 mm"),
      configurable("Maximum leaf height", "Up to 2,500 mm"),
      configurable("Maximum leaf weight", "Up to 800 kg", "With the operator, this is what sizes the drive."),
      dependent("Side-run or swing room required", "Gate geometry dependent"),
    ],
  },
  {
    group: "Cycle performance",
    specs: [
      dependent("Travel speed", "Model dependent"),
      configurable(
        "Opening time for full travel",
        "Approximately 15–25 s",
        "Set by the leaf dimensions, the hinge and pivot geometry and the operator model.",
      ),
      configurable("Rated daily cycles", "Up to 300 cycles/day"),
    ],
  },
  {
    group: "Construction",
    specs: [
      fixed("Frame section", "Mild steel or fabricated steel frame"),
      dependent("Infill", "As per gate design"),
      fixed("Running gear", "Hinges and heavy-duty pivot system", "Wheels, rollers, cantilever carriage or hinges."),
      fixed("Ground arrangement", "Hinged or pivot mounted", "Tracked, trackless or cantilever."),
      fixed("Posts and foundations", "Reinforced steel posts with an engineered foundation"),
      fixed("Finish and colour", "Powder coating or paint finish, with RAL colour options"),
    ],
  },
  {
    group: "Drive",
    specs: [
      fixed("Operator type", "Electromechanical swing gate operator"),
      dependent("Rated motor power", "Model dependent"),
      configurable("Supply voltage", "230 V AC / 50 Hz, model dependent"),
      configurable(
        "Duty rating",
        "Model dependent, up to continuous and high-duty configurations",
        "Duty, not torque, is what usually limits an operator.",
      ),
      fixed("Manual override", "Mechanical emergency release"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed("Control system", "Electronic control panel"),
      fixed(
        "Activation devices",
        "Remote control, push button, RFID, keypad or access-control system",
      ),
      configurable("Travel limit setting", "Electronic or mechanical, model dependent"),
      fixed(
        "Interfaces",
        "Access control, traffic lights, alarm systems, interlocks and safety devices",
        "Access control, traffic lights, alarm panel, interlocks.",
      ),
    ],
  },
  {
    group: "Safety",
    specs: [
      configurable("Photocells", "Compatible and recommended"),
      configurable("Safety edge", "Compatible"),
      configurable("Obstruction detection", "Integrated or configurable, model dependent"),
      configurable(
        "Operating force limitation",
        "Configurable according to the installation and the applicable requirements",
      ),
      fixed("Manual release", "Yes"),
      configurable("Warning light and audible warning", "Optional and compatible"),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed("Product standard", "Applicable powered-gate standards and local requirements"),
      dependent("Conformity marking", "Applicable to the selected product and configuration"),
      dependent("Certificate reference", "Model or project dependent"),
    ],
  },
];

/**
 * Telescopic Sliding Gate specification table.
 *
 * Authored from the baseline Standard Automatic Solutions issued for this
 * product. It is not derived from the Automatic Sliding Gate table: the
 * figures that distinguish a telescopic gate are different, and side-run in
 * particular is the whole reason the type exists, so it is published as issued
 * for this product rather than carried across.
 *
 * The issued brief states these are design-envelope maxima and that no single
 * configuration reaches all of them at once. Every such row is CONFIGURABLE,
 * which publishes the figure and keeps the dependency attached to it, and the
 * envelope caveat is stated in the note on the rows it governs. Field labels
 * are the `gate` schema's, unchanged; where the brief names a per-leaf figure
 * the value says so rather than the label being rewritten.
 */
const telescopicGate: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable(
        "Maximum clear opening",
        "Up to 18,000 mm",
        "A design envelope rather than a combination: no single telescopic configuration reaches the maximum opening, leaf size and weight at once.",
      ),
      configurable("Maximum leaf width", "Up to 9,000 mm per telescopic leaf"),
      configurable("Maximum leaf height", "Up to 2,500 mm"),
      configurable(
        "Maximum leaf weight",
        "Up to 1,500 kg per leaf",
        "With the operator, this is what sizes the drive.",
      ),
      configurable(
        "Side-run or swing room required",
        "Approximately 50–60% of the clear opening, depending on the telescopic configuration",
      ),
    ],
  },
  {
    group: "Cycle performance",
    specs: [
      configurable("Travel speed", "Up to 10 m/min"),
      dependent(
        "Opening time for full travel",
        "Application dependent",
        "Set by the clear opening, the number of leaves, the leaf weight, the operator configuration and its acceleration and deceleration, so no single figure covers every installation.",
      ),
      configurable("Rated daily cycles", "Up to 300 cycles/day"),
    ],
  },
  {
    group: "Construction",
    specs: [
      fixed("Frame section", "Heavy-duty MS structural steel section"),
      fixed("Infill", "MS, GI, SS or aluminium, and customised infill options"),
      fixed(
        "Running gear",
        "Heavy-duty guide rollers and telescopic carriage system",
        "Wheels, rollers, cantilever carriage or hinges.",
      ),
      configurable(
        "Ground arrangement",
        "Tracked telescopic or trackless configuration available, depending on the design",
        "Tracked, trackless or cantilever.",
      ),
      dependent("Posts and foundations", "Site-specific structural design"),
      fixed("Finish and colour", "Powder coated, PU painted or hot-dip galvanized options"),
    ],
  },
  {
    group: "Drive",
    specs: [
      fixed("Operator type", "Rack-and-pinion geared operator"),
      configurable(
        "Rated motor power",
        "0.75–1.5 kW, depending on gate size, weight and number of leaves",
        "Selected per gate rather than fixed across the range.",
      ),
      fixed("Supply voltage", "230 V AC single phase, or 415 V AC three phase"),
      fixed("Duty rating", "Heavy-duty, intensive use"),
      fixed("Manual override", "Key-operated emergency manual release"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed("Control system", "Microprocessor-based electronic control panel"),
      fixed(
        "Activation devices",
        "Remote control, push button, key switch, RFID or access control, and loop detector",
      ),
      configurable("Travel limit setting", "Electronic or magnetic limit system, depending on the operator"),
      fixed(
        "Interfaces",
        "Access control, traffic lights, interlocks, and external control systems",
        "Access control, traffic lights, alarm panel, interlocks.",
      ),
    ],
  },
  {
    group: "Safety",
    specs: [
      fixed("Photocells", "Dual safety photocells with presence detection"),
      configurable("Safety edge", "Sensitive safety edge where required"),
      fixed("Obstruction detection", "Electronic obstruction detection with automatic stop and reverse"),
      fixed(
        "Operating force limitation",
        "Designed and tested according to applicable powered-gate safety requirements",
      ),
      fixed("Manual release", "Emergency manual release"),
      fixed(
        "Warning light and audible warning",
        "Flashing warning light; audible warning optional where the application requires it",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed("Product standard", "Designed with reference to applicable standards for powered gates"),
      dependent("Conformity marking", "As applicable to the supplied configuration and market"),
      dependent("Certificate reference", "Available on request; configuration dependent"),
    ],
  },
];

/**
 * Shown under the swing gate table in place of the generic note.
 *
 * Issued with the swing gate data and specific to it — it speaks of hinge and
 * pivot geometry, which a sliding or telescopic gate does not have. It is
 * therefore keyed to that product rather than applied across the family, and
 * published as issued rather than paraphrased.
 */
export const GATE_DISCLAIMER =
  "Maximum dimensions, weight, speed, cycle performance and opening time depend on gate construction, leaf dimensions, wind load, hinge and pivot geometry, operator model, installation conditions and operating frequency. Final sizing must be confirmed from the actual gate and site conditions.";

/** Authored gate tables, merged into `authoredSpecs`. */
export const gateSpecs: Record<string, SpecGroup[]> = {
  "automatic-sliding-gates": slidingGate,
  "automatic-swing-gates": swingGate,
  "telescopic-sliding-gates": telescopicGate,
};
