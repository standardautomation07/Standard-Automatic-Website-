import type { Product, SpecGroupSchema } from "@/lib/types";

/**
 * Specification schemas.
 *
 * A schema is the list of fields a specifier actually needs answered for a
 * product type — not the values. Values live in `spec-values.json` and are
 * merged over the schema at read time, so a field is either answered from a
 * supportable source or shown as "to be confirmed". There is no third state
 * in which a plausible-looking number appears from nowhere.
 *
 * Field lists are grounded in the standards this market declares against:
 *
 *  - EN 13241 — the product standard for industrial, commercial and garage
 *    doors and gates. Its declared characteristics are water tightness, wind
 *    load resistance, thermal resistance, air permeability, safe opening of
 *    vertically moving doors, mechanical strength and stability, operating
 *    forces for powered doors, safe geometry of glazing, and the durability
 *    of those performances.
 *  - EN 12424 / 12425 / 12426 / 12428 — the test methods behind the wind
 *    load, water tightness, air permeability and thermal transmittance
 *    classes respectively.
 *  - EN 12453 / EN 12604 — safety in use and mechanical aspects of powered
 *    doors and gates.
 *  - EN 16005 — power-operated pedestrian doorsets.
 *  - EN 1398 — dock levellers, including rated capacity and working range.
 *
 * Naming a standard here is a statement about what the field means, not a
 * claim that any Standard Automation product is certified to it. A
 * certification claim only appears when a certificate reference is supplied.
 */

const dimensions = (extra: SpecGroupSchema["fields"] = []): SpecGroupSchema => ({
  group: "Dimensions",
  fields: [
    { label: "Maximum clear width", unit: "mm", note: "Clear opening between finished reveals." },
    { label: "Maximum clear height", unit: "mm" },
    { label: "Minimum headroom required", unit: "mm", note: "Space above the opening for the barrel, stack or track." },
    { label: "Minimum side room required", unit: "mm", note: "Per side, for guides and drive." },
    ...extra,
  ],
});

const drive: SpecGroupSchema = {
  group: "Drive",
  fields: [
    { label: "Operator type" },
    { label: "Rated motor power", unit: "kW" },
    { label: "Supply voltage", unit: "V / phase / Hz" },
    { label: "Duty rating", unit: "cycles per hour or %ED", note: "Duty, not torque, is what usually limits an operator." },
    { label: "Manual override" },
  ],
};

const control: SpecGroupSchema = {
  group: "Control",
  fields: [
    { label: "Control system" },
    { label: "Activation devices" },
    { label: "Travel limit setting" },
    { label: "Interfaces", note: "Access control, traffic lights, alarm panel, interlocks." },
  ],
};

const doorSafety: SpecGroupSchema = {
  group: "Safety",
  fields: [
    { label: "Obstruction detection" },
    { label: "Safety edge" },
    { label: "Photocells" },
    { label: "Operating force limitation", note: "EN 12453 for powered industrial doors and gates." },
    { label: "Emergency release" },
  ],
};

const performanceClasses: SpecGroupSchema = {
  group: "Declared performance",
  fields: [
    { label: "Wind load resistance", unit: "class", note: "EN 12424." },
    { label: "Water tightness", unit: "class", note: "EN 12425." },
    { label: "Air permeability", unit: "class", note: "EN 12426." },
    { label: "Thermal transmittance (U)", unit: "W/m²K", note: "EN 12428, for the complete door." },
    { label: "Airborne sound reduction", unit: "dB" },
  ],
};

const compliance = (standard: string): SpecGroupSchema => ({
  group: "Compliance",
  fields: [
    { label: "Product standard", note: standard },
    { label: "Conformity marking" },
    { label: "Certificate reference", note: "Required before any rating is published." },
  ],
});

const cycleSpeed: SpecGroupSchema = {
  group: "Cycle performance",
  fields: [
    { label: "Opening speed", unit: "m/s" },
    { label: "Closing speed", unit: "m/s" },
    { label: "Rated daily cycles", unit: "cycles/day" },
  ],
};

// ---------------------------------------------------------------- families

const highSpeedDoor: SpecGroupSchema[] = [
  dimensions(),
  cycleSpeed,
  {
    group: "Construction",
    fields: [
      { label: "Curtain or panel material" },
      { label: "Curtain or panel thickness", unit: "mm" },
      { label: "Vision panel" },
      { label: "Side guide material" },
      { label: "Frame material" },
      { label: "Finish and colour" },
      { label: "Perimeter sealing" },
    ],
  },
  performanceClasses,
  drive,
  control,
  doorSafety,
  compliance("EN 13241 applies to powered industrial doors in this market."),
];

const sectionalDoor: SpecGroupSchema[] = [
  dimensions([{ label: "Lift configuration", note: "Standard, high, vertical or low headroom — set by the building." }]),
  {
    group: "Construction",
    fields: [
      { label: "Panel material" },
      { label: "Panel thickness", unit: "mm" },
      { label: "Panel height", unit: "mm" },
      { label: "Insulation core" },
      { label: "Finish and colour" },
      { label: "Glazing and vision panels" },
      { label: "Track and hardware" },
      { label: "Counterbalance" },
      { label: "Perimeter sealing" },
    ],
  },
  performanceClasses,
  drive,
  control,
  {
    group: "Safety",
    fields: [
      { label: "Spring-break device" },
      { label: "Anti-fall device" },
      { label: "Obstruction detection" },
      { label: "Finger-trap protection" },
      { label: "Operating force limitation", note: "EN 12453." },
      { label: "Manual release" },
    ],
  },
  compliance("EN 13241 applies to industrial and garage doors in this market."),
];

const rollingShutter: SpecGroupSchema[] = [
  dimensions([{ label: "Barrel space required", unit: "mm" }]),
  {
    group: "Curtain",
    fields: [
      { label: "Slat material" },
      { label: "Slat profile height", unit: "mm" },
      { label: "Slat thickness", unit: "mm" },
      { label: "Slat construction", note: "Single wall, double wall insulated, perforated, grille or transparent." },
      { label: "Curtain weight", unit: "kg/m²", note: "Sizes the barrel, the guides and the operator." },
      { label: "Finish and colour" },
      { label: "Bottom rail" },
    ],
  },
  {
    group: "Frame",
    fields: [
      { label: "Guide material and section" },
      { label: "Barrel diameter", unit: "mm" },
      { label: "End plates and brackets" },
      { label: "Perimeter sealing" },
    ],
  },
  performanceClasses,
  drive,
  control,
  doorSafety,
  compliance("EN 13241 applies to powered shutters in this market."),
];

const fireShutter: SpecGroupSchema[] = [
  ...rollingShutter.slice(0, 3),
  performanceClasses,
  {
    group: "Fire performance",
    fields: [
      { label: "Integrity rating", unit: "minutes", note: "Only published against a certificate for the tested assembly." },
      { label: "Insulation rating", unit: "minutes" },
      { label: "Radiation rating", unit: "minutes" },
      { label: "Test standard", note: "IS 3614, BS 476 Pt 22 or EN 1634-1." },
      { label: "Certificate reference" },
      { label: "Tested assembly scope", note: "Curtain, guides, fixings, motor and release, as installed." },
    ],
  },
  {
    group: "Closure on alarm",
    fields: [
      { label: "Release mechanism" },
      { label: "Alarm interface" },
      { label: "Controlled descent speed", unit: "m/s" },
      { label: "Battery backup" },
      { label: "Audible and visual warning" },
    ],
  },
  drive,
  control,
  doorSafety,
  compliance("IS 3614 and the National Building Code govern fire assemblies in India."),
];

const fireDoor: SpecGroupSchema[] = [
  dimensions(),
  {
    group: "Leaf construction",
    fields: [
      { label: "Leaf facing material" },
      { label: "Leaf thickness", unit: "mm" },
      { label: "Frame material" },
      { label: "Shielding — lead sheet thickness", unit: "mm" },
      { label: "Vision panel glazing" },
      { label: "Glass thickness", unit: "mm" },
      { label: "Surface finish", note: "Cleanability matters in clinical and classified areas." },
    ],
  },
  {
    group: "Fire performance",
    fields: [
      { label: "Integrity rating", unit: "minutes", note: "Only published against a certificate for the tested assembly." },
      { label: "Insulation rating", unit: "minutes" },
      { label: "Test standard", note: "IS 3614, BS 476 Pt 22 or EN 1634-1." },
      { label: "Certificate reference" },
      { label: "Behaviour on alarm" },
    ],
  },
  drive,
  control,
  {
    group: "Safety",
    fields: [
      { label: "Presence detection" },
      { label: "Obstruction detection" },
      { label: "Escape route provision" },
      { label: "Manual operation without power" },
    ],
  },
  compliance("EN 16005 applies to power-operated pedestrian doorsets."),
];

const gate: SpecGroupSchema[] = [
  {
    group: "Dimensions",
    fields: [
      { label: "Maximum clear opening", unit: "mm" },
      { label: "Maximum leaf width", unit: "mm" },
      { label: "Maximum leaf height", unit: "mm" },
      { label: "Maximum leaf weight", unit: "kg", note: "With the operator, this is what sizes the drive." },
      { label: "Side-run or swing room required", unit: "mm" },
    ],
  },
  {
    group: "Cycle performance",
    fields: [
      { label: "Travel speed", unit: "m/min" },
      { label: "Opening time for full travel", unit: "s" },
      { label: "Rated daily cycles", unit: "cycles/day" },
    ],
  },
  {
    group: "Construction",
    fields: [
      { label: "Frame section" },
      { label: "Infill" },
      { label: "Running gear", note: "Wheels, rollers, cantilever carriage or hinges." },
      { label: "Ground arrangement", note: "Tracked, trackless or cantilever." },
      { label: "Posts and foundations" },
      { label: "Finish and colour" },
    ],
  },
  drive,
  control,
  {
    group: "Safety",
    fields: [
      { label: "Photocells" },
      { label: "Safety edge" },
      { label: "Obstruction detection" },
      { label: "Operating force limitation", note: "EN 12453." },
      { label: "Manual release" },
      { label: "Warning light and audible warning" },
    ],
  },
  compliance("EN 13241 and EN 12604 apply to powered gates in this market."),
];

const pedestrianDoor: SpecGroupSchema[] = [
  dimensions([{ label: "Header depth and height", unit: "mm" }, { label: "Maximum leaf weight", unit: "kg" }]),
  {
    group: "Cycle performance",
    fields: [
      { label: "Opening speed", unit: "m/s" },
      { label: "Closing speed", unit: "m/s" },
      { label: "Hold-open time", unit: "s" },
      { label: "Rated daily cycles", unit: "cycles/day" },
    ],
  },
  {
    group: "Construction",
    fields: [
      { label: "Leaf arrangement", note: "Single, bi-parting or telescopic." },
      { label: "Glazing" },
      { label: "Frame and track" },
      { label: "Threshold detail" },
      { label: "Finish" },
    ],
  },
  drive,
  {
    group: "Control",
    fields: [
      { label: "Mode selector" },
      { label: "Activation sensors" },
      { label: "Presence sensors" },
      { label: "Part-open width", unit: "%" },
      { label: "Interfaces" },
    ],
  },
  {
    group: "Safety and egress",
    fields: [
      { label: "Behaviour on power failure" },
      { label: "Break-out leaves" },
      { label: "Presence detection in the threshold" },
      { label: "Escape route compliance", note: "EN 16005." },
    ],
  },
  compliance("EN 16005 applies to power-operated pedestrian doorsets."),
];

const dockLeveller: SpecGroupSchema[] = [
  {
    group: "Platform",
    fields: [
      { label: "Platform length", unit: "mm" },
      { label: "Platform width", unit: "mm" },
      { label: "Platform height", unit: "mm" },
      { label: "Lip length", unit: "mm" },
      { label: "Lip type", note: "Swing lip or telescopic lip." },
    ],
  },
  {
    group: "Foundation pit",
    fields: [
      { label: "Pit length", unit: "mm" },
      { label: "Pit width", unit: "mm" },
      { label: "Pit depth", unit: "mm" },
      { label: "Pit tolerances", unit: "mm" },
    ],
  },
  {
    group: "Working range and capacity",
    fields: [
      { label: "Rated capacity", unit: "kN", note: "EN 1398 rates the axle load of the handling equipment, not its gross weight." },
      { label: "Working range above dock", unit: "mm" },
      { label: "Working range below dock", unit: "mm" },
      { label: "Operating temperature", unit: "°C" },
    ],
  },
  {
    group: "Construction",
    fields: [
      { label: "Deck plate thickness", unit: "mm" },
      { label: "Deck plate type" },
      { label: "Hinge arrangement" },
      { label: "Finish" },
    ],
  },
  {
    group: "Hydraulics and power",
    fields: [
      { label: "Power pack rating", unit: "kW" },
      { label: "Supply voltage", unit: "V / phase / Hz" },
      { label: "Cylinder arrangement" },
    ],
  },
  {
    group: "Control",
    fields: [
      { label: "Control station" },
      { label: "Door interlock" },
      { label: "Bay signalling interface" },
    ],
  },
  {
    group: "Safety",
    fields: [
      { label: "Maintenance strut" },
      { label: "Hose burst protection" },
      { label: "Toe guards" },
      { label: "Emergency stop" },
    ],
  },
  compliance("EN 1398 is the safety standard for dock levellers."),
];

const dockShelter: SpecGroupSchema[] = [
  {
    group: "Dimensions",
    fields: [
      { label: "Opening width", unit: "mm" },
      { label: "Opening height", unit: "mm" },
      { label: "Projection from the building line", unit: "mm" },
    ],
  },
  {
    group: "Construction",
    fields: [
      { label: "Frame material" },
      { label: "Sealing arrangement", note: "Curtain, cushion or inflatable." },
      { label: "Curtain material and weight" },
      { label: "Head and side seal configuration" },
      { label: "Impact behaviour", note: "The frame should deflect rather than load the building." },
      { label: "Finish and colour" },
    ],
  },
  {
    group: "Performance",
    fields: [
      { label: "Wind loading" },
      { label: "Service life", unit: "years" },
      { label: "Operating temperature", unit: "°C" },
      { label: "Function", note: "Heat retention, dust and water exclusion." },
    ],
  },
  compliance("No harmonised product standard applies to dock shelters; the bay is specified as an assembly."),
];

const pedestrianAccess: SpecGroupSchema[] = [
  {
    group: "Dimensions",
    fields: [
      { label: "Clear passage width", unit: "mm" },
      { label: "Accessible lane width", unit: "mm", note: "At least one wide lane is normally required per bank." },
      { label: "Housing length", unit: "mm" },
      { label: "Housing width", unit: "mm" },
      { label: "Housing height", unit: "mm" },
    ],
  },
  {
    group: "Throughput",
    fields: [
      { label: "Throughput", unit: "persons/min" },
      { label: "Opening time", unit: "s" },
      { label: "Closing time", unit: "s" },
      { label: "Mean cycles between failure", unit: "cycles" },
    ],
  },
  {
    group: "Construction",
    fields: [
      { label: "Housing material and finish" },
      { label: "Arm or wing material" },
      { label: "Mechanism" },
      { label: "Reader mounting provision" },
    ],
  },
  {
    group: "Power and environment",
    fields: [
      { label: "Supply voltage", unit: "V / phase / Hz" },
      { label: "Power consumption", unit: "W" },
      { label: "IP rating" },
      { label: "Operating temperature", unit: "°C" },
      { label: "Indoor or outdoor" },
    ],
  },
  {
    group: "Control",
    fields: [
      { label: "Reader interface" },
      { label: "Signal type" },
      { label: "Direction control" },
      { label: "Indicators and counting" },
    ],
  },
  {
    group: "Safety and egress",
    fields: [
      { label: "Behaviour on power failure" },
      { label: "Behaviour on fire alarm" },
      { label: "Emergency release" },
      { label: "Obstruction and tailgate detection" },
    ],
  },
  compliance("Escape route behaviour is set by the building's fire strategy."),
];

const vehicleAccess: SpecGroupSchema[] = [
  {
    group: "Dimensions",
    fields: [
      { label: "Boom length or barrier width", unit: "mm" },
      { label: "Bollard diameter", unit: "mm" },
      { label: "Bollard height above ground", unit: "mm" },
      { label: "Foundation depth required", unit: "mm" },
      { label: "Cabinet or body dimensions", unit: "mm" },
    ],
  },
  {
    group: "Performance",
    fields: [
      { label: "Opening time", unit: "s" },
      { label: "Closing time", unit: "s" },
      { label: "Mean cycles between failure", unit: "cycles" },
      { label: "Impact resistance", note: "Only for products actually tested to an impact standard." },
    ],
  },
  {
    group: "Construction",
    fields: [
      { label: "Body material and finish" },
      { label: "Boom or barrier material" },
      { label: "Drive mechanism" },
      { label: "Reflective marking and lighting" },
    ],
  },
  {
    group: "Power and environment",
    fields: [
      { label: "Supply voltage", unit: "V / phase / Hz" },
      { label: "Power consumption", unit: "W" },
      { label: "Battery backup" },
      { label: "IP rating" },
      { label: "Operating temperature", unit: "°C" },
    ],
  },
  {
    group: "Control",
    fields: [
      { label: "Activation devices" },
      { label: "Loop detectors" },
      { label: "Access system interface" },
      { label: "Manual release" },
    ],
  },
  {
    group: "Safety",
    fields: [
      { label: "Photocells" },
      { label: "Ground loop safety" },
      { label: "Behaviour on power failure" },
    ],
  },
  compliance("EN 12453 applies to powered vehicle barriers where they form part of a gate installation."),
];

/** Category first, then family — a category is the level at which two
 *  products genuinely need different fields. */
const byCategory: Record<string, SpecGroupSchema[]> = {
  // The seven High Speed Doors products take their tables from
  // product-specs.ts instead, because the business issued a complete parameter
  // set for each. These entries are the fallback for anything added to those
  // categories later without issued data.
  "roll-up-high-speed-doors": highSpeedDoor,
  "fold-up-high-speed-doors": highSpeedDoor,
  "spiral-high-speed-doors": highSpeedDoor,
  "rigid-panel-high-speed-doors": highSpeedDoor,
  "controlled-environment-high-speed-doors": highSpeedDoor,
  "sectional-overhead-doors": sectionalDoor,
  "garage-doors": sectionalDoor,
  "single-wall-rolling-shutters": rollingShutter,
  "insulated-rolling-shutters": rollingShutter,
  "fire-rated-shutters": fireShutter,
  "fire-rated-doors": fireDoor,
  "sliding-gates": gate,
  "swing-gates": gate,
  "retractable-gates": gate,
  "automatic-sliding-doors": pedestrianDoor,
  "automatic-swing-doors": pedestrianDoor,
  "hermetic-cleanroom-doors": pedestrianDoor,
  "dock-levellers": dockLeveller,
  "dock-shelters": dockShelter,
  "pedestrian-access-control": pedestrianAccess,
  "vehicle-access-control": vehicleAccess,
};

export function schemaFor(product: Product): SpecGroupSchema[] {
  const schema = byCategory[product.categoryId];
  if (!schema) throw new Error(`No specification schema for category ${product.categoryId}`);
  return schema;
}

export const schemaCategories = Object.keys(byCategory);
