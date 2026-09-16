import type { Spec, SpecGroup } from "@/lib/types";

/**
 * Entrance Automation specification tables.
 *
 * These three products had no issued technical data and name no operator.
 * What is published is the range current operator manufacturers document
 * for the door type, worded as typical or depending on the operator, and the
 * source for every row is recorded in
 * research/access-entrance-technical-sources.md.
 *
 * Labels and groups are the `pedestrianDoor` schema's, unchanged.
 *
 * No standard is claimed for a Standard Automatic Solutions doorset. The
 * operator manufacturers type-test their own drives; the compliance rows say
 * which framework applies and defer to the supplied operator's declaration.
 */

const fixed = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIRMED",
  ...(note ? { note } : {}),
});

const configurable = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIGURABLE",
  ...(note ? { note } : {}),
});

const dependent = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "TBC",
  ...(note ? { note } : {}),
});

const unanswered = (label: string, note?: string): Spec => ({
  label,
  value: null,
  status: "TBC",
  ...(note ? { note } : {}),
});

/* ------------------------------------------ Automatic Sliding Glass Doors */

const slidingGlassDoors: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable(
        "Maximum clear width",
        "Typically 700–3,000 mm single leaf and 900–3,000 mm bi-parting, depending on the operator",
        "Clear opening between finished reveals.",
      ),
      dependent("Maximum clear height", "Set by the leaf construction and the glazing; confirmed per project"),
      configurable(
        "Minimum headroom required",
        "The operator header, typically 70–150 mm high depending on the operator",
        "Space above the opening for the barrel, stack or track.",
      ),
      dependent(
        "Minimum side room required",
        "Side room equal to the leaf width for each leaf to park into; confirmed per project",
        "Per side, for guides and drive.",
      ),
      configurable(
        "Header depth and height",
        "Typically 70–150 mm high and around 180–190 mm deep, depending on the operator",
      ),
      configurable(
        "Maximum leaf weight",
        "Typically up to 120–125 kg per leaf, or around 240 kg total, depending on the operator",
      ),
    ],
  },
  {
    group: "Cycle performance",
    specs: [
      configurable("Opening speed", "Up to about 0.7 m/s per leaf, adjustable"),
      configurable(
        "Closing speed",
        "Up to about 0.7 m/s per leaf, adjustable; slowed on approach to the closed position",
      ),
      configurable("Hold-open time", "Adjustable, typically 0–60 s; extends automatically for through traffic"),
      configurable(
        "Rated daily cycles",
        "Continuous duty; operators are endurance tested to around 1,000,000 cycles by their manufacturers",
      ),
    ],
  },
  {
    group: "Construction",
    specs: [
      configurable(
        "Leaf arrangement",
        "Single or bi-parting sliding leaves; telescopic arrangements where side room is short",
        "Single, bi-parting or telescopic.",
      ),
      configurable(
        "Glazing",
        "Toughened or laminated safety glass in framed or frameless leaves, to the project specification",
      ),
      fixed(
        "Frame and track",
        "Aluminium header housing the drive, with roller carriages on a track and a floor guide at the threshold",
      ),
      configurable("Threshold detail", "Flush floor guide as standard; recessed track or brush seals where specified"),
      configurable("Finish", "Anodised or powder-coated aluminium to match the facade, with RAL colour options"),
    ],
  },
  {
    group: "Drive",
    specs: [
      fixed("Operator type", "Electromechanical sliding door operator with a DC motor driving a toothed belt"),
      dependent("Rated motor power", "Operator dependent; low-voltage DC drive"),
      fixed("Supply voltage", "230 V AC single phase 50 Hz to the operator"),
      configurable("Duty rating", "Continuous automatic operation; the operator adjusts to traffic"),
      fixed("Manual override", "Leaves can be moved by hand when the operator is switched off or on power failure"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed(
        "Mode selector",
        "Programme switch with automatic, permanent open, one-way, night and off modes; key-lockable on escape routes",
      ),
      fixed(
        "Activation sensors",
        "Radar motion detectors on each side; push button, key switch, access control or remote input",
      ),
      fixed("Presence sensors", "Infrared light curtains protecting the main closing edge and the leaf travel path"),
      configurable(
        "Part-open width",
        "Reduced opening width mode, set on commissioning, typically for winter or low-traffic use",
      ),
      configurable(
        "Interfaces",
        "Volt-free inputs and outputs for access control, fire alarm and building management; wireless or serial service interface on some operators",
      ),
    ],
  },
  {
    group: "Safety and egress",
    specs: [
      configurable(
        "Behaviour on power failure",
        "Leaves free to move by hand; integral backup supply opens or closes the leaves automatically on operators fitted with it",
      ),
      configurable(
        "Break-out leaves",
        "Break-out leaves that swing outward under push are available for escape-route doorsets",
      ),
      fixed(
        "Presence detection in the threshold",
        "Light curtain across the threshold holds the leaves open while a person is in the opening",
      ),
      configurable(
        "Escape route compliance",
        "Where the door is on an escape route an operator type-tested for that use is specified, with backup opening or break-out leaves; the supplied operator's declaration applies",
        "EN 16005.",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "Power-operated pedestrian doorsets fall under EN 16005; operators are type-tested by their manufacturers and the supplied operator's declaration applies",
        "EN 16005 applies to power-operated pedestrian doorsets.",
      ),
      dependent("Conformity marking", "As applicable to the supplied operator and market"),
      dependent(
        "Certificate reference",
        "Operator manufacturer's type-test documentation for the supplied model; available on request",
      ),
    ],
  },
];

/* ------------------------------------------------ Automatic Swing Doors */

const swingDoors: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable(
        "Maximum clear width",
        "Leaf widths typically 700–1,100 mm on standard operators and up to 1,600 mm on heavy-duty operators; double-leaf sets from about 1,400 mm between hinges",
        "Clear opening between finished reveals.",
      ),
      dependent("Maximum clear height", "Set by the leaf construction; confirmed per project"),
      configurable(
        "Minimum headroom required",
        "The operator body, typically 70 mm high, fitted to the door head or the transom",
        "Space above the opening for the barrel, stack or track.",
      ),
      fixed(
        "Minimum side room required",
        "None beyond the leaf swing; the operator sits above the leaf",
        "Per side, for guides and drive.",
      ),
      configurable(
        "Header depth and height",
        "Operator typically around 685 × 70 × 130 mm; reveal depths to 300 mm with a standard arm, up to 500 mm on heavy-duty operators",
      ),
      configurable(
        "Maximum leaf weight",
        "Typically up to 160 kg on standard operators and up to 400 kg on heavy-duty operators, reducing with leaf width and reveal depth",
      ),
    ],
  },
  {
    group: "Cycle performance",
    specs: [
      configurable(
        "Opening speed",
        "0–90° in about 3–12 s, adjustable; limited automatically in low-energy mode",
      ),
      configurable("Closing speed", "90–0° in about 4–21 s, adjustable"),
      configurable("Hold-open time", "Adjustable, typically up to 30 s; 180 s on some operators"),
      configurable(
        "Rated daily cycles",
        "Continuous duty; operators carry a cycle counter to 1,000,000 and are designed for heavily frequented doors",
      ),
    ],
  },
  {
    group: "Construction",
    specs: [
      configurable(
        "Leaf arrangement",
        "Single or double leaf, push or pull side, with an integrated door coordinator on double-leaf sets",
        "Single, bi-parting or telescopic.",
      ),
      configurable("Glazing", "To the door leaf specification; the operator is independent of the leaf construction"),
      configurable(
        "Frame and track",
        "Surface-mounted operator on the frame head with a standard arm on the push side or a slide channel on the pull side",
      ),
      fixed("Threshold detail", "No threshold hardware; the existing door threshold is retained"),
      configurable("Finish", "Operator cover in silver anodised aluminium as standard, or powder coated to a RAL colour"),
    ],
  },
  {
    group: "Drive",
    specs: [
      fixed("Operator type", "Electromechanical swing door operator with force-balancing gear and an integrated door closer function"),
      configurable("Rated motor power", "Low; operator consumption typically 120–240 W maximum depending on model"),
      fixed("Supply voltage", "230 V AC single phase 50 Hz; 24 V DC supply for external accessories"),
      configurable("Duty rating", "Continuous automatic operation; temperature-managed overload protection on current operators"),
      fixed("Manual override", "Leaf opens by hand at all times; power-assist reduces the effort while the operator is powered"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed("Mode selector", "Integrated programme switch with off, automatic, permanent open and exit-only modes; key switch for night operation"),
      fixed(
        "Activation sensors",
        "Radar motion detectors, push buttons, key switches, access control or push-and-go on the leaf itself",
      ),
      configurable(
        "Presence sensors",
        "Safety sensors on the hinge and opposite-hinge sides with self-test, required for full-energy operation",
      ),
      fixed("Part-open width", "Not applicable; the opening angle is set on commissioning, up to about 110°"),
      configurable(
        "Interfaces",
        "Potential-free door status contacts, motor lock feedback, emergency-off and lock inputs; fire alarm and building management through the same terminals",
      ),
    ],
  },
  {
    group: "Safety and egress",
    specs: [
      fixed(
        "Behaviour on power failure",
        "The leaf remains a manually operable door and closes under the operator's spring; no backup supply is needed for egress",
      ),
      fixed("Break-out leaves", "Not applicable; a swing door leaf is already free to open by hand"),
      configurable(
        "Presence detection in the threshold",
        "Safety sensors on both faces of the leaf stop or reverse it against a person in the swing path",
      ),
      configurable(
        "Escape route compliance",
        "Low-energy operation limits speed and force where sensors are not fitted; full-energy operation with safety sensors on higher-traffic doors; the supplied operator's declaration applies",
        "EN 16005.",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "Power-operated pedestrian doorsets fall under EN 16005; operators are type-tested by their manufacturers and the supplied operator's declaration applies",
        "EN 16005 applies to power-operated pedestrian doorsets.",
      ),
      dependent("Conformity marking", "As applicable to the supplied operator and market"),
      dependent(
        "Certificate reference",
        "Operator manufacturer's type-test documentation for the supplied model; available on request",
      ),
    ],
  },
];

/* --------------------------------------------- Hermetic & Cleanroom Doors */

/**
 * No cleanroom classification, GMP or FDA claim is made here. Air-tightness
 * is stated the way the door manufacturers state it — a leakage rate at a
 * test pressure and an EN 12207 class the door type is offered to — and as
 * a property of the product type, not a rating of a doorset supplied by
 * Standard Automatic Solutions.
 */
const hermeticDoors: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable(
        "Maximum clear width",
        "Typically 700–1,800 mm single leaf and up to about 2,000 mm bi-parting, depending on the manufacturer",
        "Clear opening between finished reveals.",
      ),
      dependent("Maximum clear height", "Set by the leaf construction; confirmed per project"),
      configurable(
        "Minimum headroom required",
        "The operator header above the opening; depth and height depend on the operator",
        "Space above the opening for the barrel, stack or track.",
      ),
      dependent(
        "Minimum side room required",
        "Side room equal to the leaf width for the leaf to park against the wall; confirmed per project",
        "Per side, for guides and drive.",
      ),
      configurable("Header depth and height", "Operator dependent; the header carries the drive and the descending track that seals the leaf"),
      configurable("Maximum leaf weight", "Typically up to about 150 kg per leaf, depending on the operator"),
    ],
  },
  {
    group: "Cycle performance",
    specs: [
      configurable("Opening speed", "Adjustable on the operator; typically in the same range as a standard sliding door operator"),
      configurable("Closing speed", "Adjustable on the operator, with a slowed final travel as the leaf seals"),
      configurable("Hold-open time", "Adjustable on the operator; set to suit trolley and bed movement"),
      configurable("Rated daily cycles", "Continuous duty; operators are endurance tested by their manufacturers"),
    ],
  },
  {
    group: "Construction",
    specs: [
      configurable(
        "Leaf arrangement",
        "Single or bi-parting sliding leaves, sealing on all four edges when closed",
        "Single, bi-parting or telescopic.",
      ),
      configurable(
        "Glazing",
        "Flush vision panel, double glazed and set level with the leaf face for cleaning; full-glass leaves available",
      ),
      fixed(
        "Frame and track",
        "Aluminium header with a track that drops the leaf onto its seals in the final travel; flush guide at the floor",
      ),
      configurable("Threshold detail", "Flush threshold with a drop seal on the leaf; no floor rail across the opening"),
      configurable(
        "Finish",
        "Antibacterial HPL laminate, stainless steel or lacquered aluminium leaf faces; lead-lined leaves for radiology",
      ),
    ],
  },
  {
    group: "Drive",
    specs: [
      fixed("Operator type", "Electromechanical sliding door operator with a DC motor driving a toothed belt"),
      dependent("Rated motor power", "Operator dependent; low-voltage DC drive"),
      fixed("Supply voltage", "230 V AC single phase 50 Hz to the operator"),
      configurable("Duty rating", "Continuous automatic operation"),
      fixed("Manual override", "Leaf can be moved by hand on power failure"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed("Mode selector", "Programme switch with automatic, permanent open, one-way and off modes"),
      configurable(
        "Activation sensors",
        "Touchless wave sensors, elbow or foot switches, push buttons or access control; radar detectors where hands-free approach opening is wanted",
      ),
      fixed("Presence sensors", "Safety detectors covering the opening and the closing path of the leaf"),
      configurable("Part-open width", "Reduced opening width mode, set on commissioning"),
      configurable(
        "Interfaces",
        "Volt-free inputs and outputs for access control, interlocking with an adjacent door, fire alarm and building management",
      ),
    ],
  },
  {
    group: "Safety and egress",
    specs: [
      configurable(
        "Behaviour on power failure",
        "Leaf free to move by hand; battery backup for automatic opening on operators fitted with it",
      ),
      fixed("Break-out leaves", "Not normally fitted; the sealed leaf is opened by hand on power failure"),
      fixed("Presence detection in the threshold", "Safety detectors hold the leaf open while a person or trolley is in the opening"),
      configurable(
        "Escape route compliance",
        "Where the door is on an escape route the operator and its backup opening are specified for that use; the supplied operator's declaration applies",
        "EN 16005.",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "Power-operated pedestrian doorsets fall under EN 16005; air permeability is tested by the door manufacturer to EN 1026 and classed to EN 12207, and the supplied doorset's own test documentation applies",
        "EN 16005 applies to power-operated pedestrian doorsets.",
      ),
      dependent("Conformity marking", "As applicable to the supplied doorset and market"),
      dependent(
        "Certificate reference",
        "Door manufacturer's air-permeability test report and operator type-test documentation for the supplied model; available on request",
      ),
    ],
  },
];

/** Authored entrance automation tables, merged into `authoredSpecs`. */
export const entranceSpecs: Record<string, SpecGroup[]> = {
  "automatic-sliding-glass-doors": slidingGlassDoors,
  "automatic-swing-doors": swingDoors,
  "hermetic-cleanroom-doors": hermeticDoors,
};

// Reserved for rows a future baseline cannot answer.
void unanswered;
