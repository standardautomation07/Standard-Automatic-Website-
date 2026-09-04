import type { Product } from "@/lib/types";

/**
 * High Speed Doors — 4 products.
 *
 * Copy is original, written from research/market-product-research.md §4.1.
 *
 * Specification values are reproduced only from specification tables Standard
 * Automatic Solutions has itself published for these lines; nothing here is
 * inferred from a competitor's data sheet or estimated. Products with no
 * published table carry no table, and the page says so.
 */
export const highSpeedDoorProducts: Product[] = [
  {
    id: "high-speed-roll-up-doors",
    familyId: "high-speed-doors",
    categoryId: "roll-up-high-speed-doors",
    name: "High Speed Roll-Up Doors",
    status: "CONFIRMED",
    tagline: "Seconds per cycle on the openings that never stop moving.",
    summary:
      "PVC-curtain roll-up doors travelling at up to 2.5 m/s, for internal and external openings crossed continuously by forklift and pallet traffic.",
    overview: [
      "A high speed roll-up door replaces a rigid leaf with a flexible, high-density coated fabric curtain that winds onto a compact drum above the opening. Because there is no heavy panel to accelerate, the door can open and close in a few seconds — which changes the economics of a busy opening entirely: the building spends far less time standing open between vehicle movements.",
      "That matters most where the opening separates two environments. Every second the door is open is dust, insects, conditioned air and temperature moving in the wrong direction. On an opening used several hundred times a day, cycle time is the specification that pays for the door.",
    ],
    quickFacts: [
      { label: "Travel speed", value: "Up to 2.5 m/s" },
      { label: "Maximum size", value: "5000 × 5000 mm" },
      { label: "Wind load", value: "EN 12424 Class 2" },
      { label: "Control", value: "PLC, inverter, encoder" },
    ],
    benefits: [
      {
        title: "Open only while traffic passes",
        body: "Opening and closing speeds are adjustable up to 2.5 m/s, so the opening is not left standing open between movements.",
      },
      {
        title: "Environmental separation",
        body: "A sealed, fast-cycling curtain limits dust, insect and temperature transfer between production, storage and dispatch areas.",
      },
      {
        title: "Hands-free activation",
        body: "Radar, infrared, pull switch or push button opens the door on approach — the operator never leaves the vehicle.",
      },
      {
        title: "Sight of the far side",
        body: "Transparent vision sections in the curtain give a view through the opening before the door has finished travelling.",
      },
    ],
    variants: [
      { id: "internal", name: "Internal", note: "Standard curtain and guides for openings inside the building envelope, where wind load is not a factor.", status: "CONFIRMED" },
      { id: "external", name: "External / wind-loaded", note: "Reinforced curtain and guide arrangement for elevations exposed to wind, specified against the EN 12424 class required.", status: "CONFIRMED" },
      { id: "food-grade", name: "Food-grade washdown", note: "Stainless steel frame and guides with a wipe-down curtain for areas that are hosed or foamed down.", status: "POTENTIAL" },
      { id: "cold-store", name: "Cold store / freezer", note: "Insulated or heated-guide configuration for openings into chilled and frozen rooms.", status: "POTENTIAL" },
      { id: "cleanroom", name: "Cleanroom", note: "Interlocked pairing and a low-particulate curtain for classified area transitions.", status: "POTENTIAL" },
    ],
    specGroups: [
      {
        group: "Dimensions",
        specs: [
          { label: "Maximum width", value: "5000 mm" },
          { label: "Maximum height", value: "5000 mm" },
        ],
      },
      {
        group: "Performance",
        specs: [
          { label: "Opening speed", value: "0.80–2.5 m/s, adjustable" },
          { label: "Closing speed", value: "0.80–2.5 m/s, adjustable" },
          { label: "Wind load resistance", value: "EN 12424 Class 2" },
        ],
      },
      {
        group: "Construction",
        specs: [
          { label: "Curtain", value: "0.8–1.2 mm high-density PVC coated fabric" },
          { label: "Vision panel", value: "Transparent PVC film" },
          { label: "Side guides", value: "Aluminium extrusion" },
          { label: "Frame material", value: "Galvanized steel, aluminium alloy or stainless steel" },
          { label: "Track and box cover", value: "2.0 mm folded galvanized steel" },
          { label: "Curtain colours", value: "Blue, yellow, orange, grey, red and others to order" },
        ],
      },
      {
        group: "Drive and control",
        specs: [
          { label: "Drive", value: "SEW or equivalent geared motor, 380 V or 220 V 50 Hz, 0.75 / 1.1 / 1.5 kW" },
          { label: "Control system", value: "PLC with inverter and encoder" },
          { label: "Activation", value: "Double-side radar, push button or infrared sensors" },
          { label: "Manual operation", value: "Crank handle" },
        ],
      },
    ],
    applications: [
      "Warehouse internal and external openings",
      "Loading and dispatch bays",
      "Production and packing hall separations",
      "Food, pharmaceutical and clean-area transitions",
      "High-traffic vehicle throughways",
    ],
    industries: ["warehousing-logistics", "manufacturing", "cold-chain-food", "pharmaceutical-cleanroom", "automotive"],
    environments: ["internal", "external", "hygiene"],
    operatingMethod: [
      "The flexible curtain runs in aluminium side guides and winds onto a drum above the opening.",
      "A geared motor under inverter and encoder control accelerates and decelerates the curtain; a PLC manages the cycle and the stop positions.",
      "Radar or infrared activation opens the door on approach, and a threshold photocell prevents it closing on an obstruction.",
      "A crank handle allows the door to be operated by hand during a power failure.",
    ],
    construction: [
      "High-density PVC coated fabric curtain, 0.8–1.2 mm, with transparent PVC vision sections",
      "Aluminium extruded side guides",
      "Frame in galvanized steel, aluminium alloy or stainless steel to suit the environment",
      "2.0 mm folded galvanized steel track and drum cover",
    ],
    related: ["self-repairing-high-speed-doors", "high-speed-insulated-panel-doors", "dock-levellers"],
    documents: [
      { title: "High Speed Roll-Up Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
      { title: "Opening survey and technical drawing", kind: "Technical drawing", href: null, note: "Produced per project after the site survey." },
    ],
    imageId: "p-hsd-roll-up",
    legacyUrls: ["high-speed-door.html", "high-speed-roll-up-door.html"],
  },
  {
    id: "self-repairing-high-speed-doors",
    familyId: "high-speed-doors",
    categoryId: "roll-up-high-speed-doors",
    name: "Self-Repairing High Speed Doors",
    status: "CONFIRMED",
    tagline: "Takes the forklift hit and puts itself back in the guides.",
    summary:
      "High speed doors whose curtain releases from the side guides on impact and re-seats itself on the next cycle, so a strike does not take the opening out of service.",
    overview: [
      "In a busy opening the door will eventually be hit. On a conventional high speed door that means a bent guide, a torn curtain and an opening out of service until an engineer attends. A self-repairing door is designed around that certainty: the curtain is held in the guides by a mechanism that lets go under impact rather than tearing.",
      "After a strike the door is driven to its top limit, where the curtain re-engages the guides automatically, and normal service resumes. The value here is measured less in door specification than in the downtime and call-outs that never happen.",
    ],
    quickFacts: [
      { label: "Impact behaviour", value: "Curtain releases and re-seats" },
      { label: "Reset", value: "On the next full opening cycle" },
      { label: "Configurations", value: "Internal and external" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      {
        title: "Impact does not stop the opening",
        body: "The curtain releases from the guides instead of tearing, and re-seats on the next full opening cycle.",
      },
      {
        title: "Fewer emergency call-outs",
        body: "Routine forklift contact stops generating an emergency attendance and a curtain replacement.",
      },
      {
        title: "Same cycle speed",
        body: "Impact tolerance is added without giving up the fast travel that justified a high speed door in the first place.",
      },
      {
        title: "Suited to tight traffic",
        body: "Appropriate where vehicles and pedestrians share a constrained route and the guides sit close to the traffic line.",
      },
    ],
    variants: [
      { id: "internal", name: "Internal", note: "Standard configuration for internal throughways and production separations.", status: "CONFIRMED" },
      { id: "external", name: "External", note: "Reinforced curtain and guides where the opening is also wind-exposed.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: [
      "High-traffic warehouse throughways",
      "Narrow openings with heavy forklift movement",
      "Production areas with continuous internal traffic",
      "Cold and chilled store entrances",
    ],
    industries: ["warehousing-logistics", "manufacturing", "cold-chain-food", "automotive"],
    environments: ["internal", "external"],
    operatingMethod: [
      "The curtain is retained in the side guides by a releasing mechanism rather than a fixed profile.",
      "On impact the curtain leaves the guide instead of tearing, and the drive stops.",
      "The door is driven to its top limit, where the curtain re-engages the guides automatically.",
      "Normal operation resumes without a curtain change or an engineer visit.",
    ],
    construction: [
      "Flexible coated fabric curtain with a releasing guide retention system",
      "Side guides profiled to allow controlled release and re-entry",
      "Inverter-controlled drive with a defined reset cycle",
    ],
    related: ["high-speed-roll-up-doors", "high-speed-fold-up-doors", "high-speed-insulated-panel-doors"],
    documents: [
      { title: "Self-Repairing High Speed Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-hsd-self-repairing",
    legacyUrls: ["high-speed-self-repairing-doors.html"],
  },
  {
    id: "high-speed-fold-up-doors",
    familyId: "high-speed-doors",
    categoryId: "fold-up-high-speed-doors",
    name: "High Speed Fold-Up Doors",
    status: "CONFIRMED",
    tagline: "Fast cycling on wide openings where a roll needs more headroom than you have.",
    summary:
      "High speed doors whose curtain folds upward into a stack rather than rolling onto a drum, for wide external openings with restricted lintel depth.",
    overview: [
      "A fold-up door gathers its curtain into horizontal folds as it opens instead of winding it onto a drum. That gives a shallower stack above the opening, which is what makes the type practical on wide external openings and on facades where the lintel detail cannot accommodate a roll.",
      "Fold-up curtains are typically reinforced with horizontal wind bars. That reinforcement is what allows a fabric curtain to span a wide external opening while keeping high speed travel.",
    ],
    quickFacts: [
      { label: "Curtain storage", value: "Folded stack, not a drum" },
      { label: "Best suited to", value: "Wide external openings" },
      { label: "Reinforcement", value: "Horizontal wind bars" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      {
        title: "Wide external openings",
        body: "Reinforced curtains span wide apertures while retaining the fast cycle time of a high speed door.",
      },
      {
        title: "Shallow stack",
        body: "A folded curtain needs less depth above the opening than a rolled one on large doors.",
      },
      {
        title: "Wind resistance",
        body: "Horizontal wind bars carry load across the span on exposed elevations.",
      },
      {
        title: "Fast cycling retained",
        body: "Keeps the short open time that makes a high speed door worth specifying on a busy opening.",
      },
    ],
    variants: [
      { id: "external-wide-span", name: "External wide span", note: "For wide vehicle openings on exposed elevations, where a single rolled curtain would need excessive headroom.", status: "CONFIRMED" },
      { id: "reinforced-wind-bars", name: "Wind-bar reinforced", note: "Additional horizontal reinforcement where the elevation carries significant wind load.", status: "CONFIRMED" },
    ],
    specGroups: [],
    applications: [
      "Wide external warehouse openings",
      "Dispatch and vehicle access doors",
      "Facades with limited lintel depth",
      "Exposed elevations with wind loading",
    ],
    industries: ["warehousing-logistics", "manufacturing"],
    environments: ["external"],
    operatingMethod: [
      "The curtain is carried on straps that gather it into horizontal folds as the door opens.",
      "An inverter-controlled drive raises and lowers the curtain at an adjustable speed.",
      "Activation devices open the door on approach; a threshold photocell prevents closing on an obstruction.",
      "A manual release allows operation during a power failure.",
    ],
    construction: [
      "Coated fabric curtain with horizontal wind-bar reinforcement",
      "Lifting straps and a folding stack arrangement above the opening",
      "Steel or aluminium guides sized to the span",
    ],
    related: ["high-speed-roll-up-doors", "high-speed-insulated-panel-doors", "industrial-sectional-overhead-doors"],
    documents: [
      { title: "High Speed Fold-Up Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-hsd-fold-up",
    legacyUrls: ["high-speed-fold-up-doors.html"],
  },
  {
    id: "high-speed-insulated-panel-doors",
    familyId: "high-speed-doors",
    categoryId: "rigid-panel-high-speed-doors",
    name: "High Speed Insulated Panel Doors",
    status: "CONFIRMED",
    tagline: "Insulated rigid panels moving at high speed travel.",
    summary:
      "Aluminium alloy PU-foam panel doors up to 5000 × 7500 mm, rated to 120 km/h wind velocity, under PLC and inverter control.",
    overview: [
      "Where an opening needs insulation and speed together, a rigid-panel high speed door uses insulated aluminium sections rather than a fabric curtain. The panel adds thermal separation and structural resistance that a flexible curtain cannot provide, at the cost of a heavier assembly and a slightly slower closing cycle.",
      "This configuration suits tall external openings on exposed sites, and internal openings between areas held at different temperatures where a fabric curtain would not hold the differential.",
    ],
    quickFacts: [
      { label: "Maximum size", value: "5000 × 7500 mm" },
      { label: "Opening speed", value: "1.2–1.5 m/s" },
      { label: "Panel", value: "43 mm aluminium alloy, PU foam core" },
      { label: "Rated wind velocity", value: "120 km/h" },
    ],
    benefits: [
      {
        title: "Insulated panel",
        body: "43 mm aluminium alloy sections with a PU foam core, for openings that separate different thermal environments.",
      },
      {
        title: "Rated for wind",
        body: "Specified to a rated wind velocity of 120 km/h, for exposed external elevations.",
      },
      {
        title: "Tall openings",
        body: "Configurations to 5000 mm wide and 7500 mm high — openings a fabric curtain would struggle to span at speed.",
      },
      {
        title: "Controlled acceleration",
        body: "Inverter and encoder control ramps a heavier panel up and down smoothly rather than snatching it.",
      },
    ],
    variants: [
      { id: "external", name: "External / wind-rated", note: "For exposed elevations where the panel has to carry wind load as well as cycle quickly.", status: "CONFIRMED" },
      { id: "thermal-separation", name: "Thermal separation", note: "For internal openings between areas held at different temperatures, where a fabric curtain will not hold the differential.", status: "CONFIRMED" },
    ],
    specGroups: [
      {
        group: "Dimensions",
        specs: [
          { label: "Maximum width", value: "5000 mm" },
          { label: "Maximum height", value: "7500 mm" },
        ],
      },
      {
        group: "Performance",
        specs: [
          { label: "Opening speed", value: "1.2–1.5 m/s, adjustable" },
          { label: "Closing speed", value: "0.6 m/s, adjustable" },
          { label: "Rated wind velocity", value: "120 km/h" },
        ],
      },
      {
        group: "Construction",
        specs: [
          { label: "Panel", value: "Aluminium alloy with PU foam core" },
          { label: "Panel thickness", value: "43 mm" },
          { label: "Panel finish", value: "Silver or customised" },
        ],
      },
      {
        group: "Drive and control",
        specs: [
          { label: "Drive", value: "SEW or equivalent geared motor, 380 V or 220 V 50 Hz, 0.75 / 1.1 / 1.5 kW" },
          { label: "Control system", value: "PLC with inverter and encoder" },
          { label: "Activation", value: "Double-side radar, infrared sensors or as specified" },
        ],
      },
    ],
    applications: [
      "Tall external industrial openings",
      "Temperature-separated internal openings",
      "Exposed elevations with high wind loading",
      "Production halls needing insulation and speed together",
    ],
    industries: ["manufacturing", "cold-chain-food", "warehousing-logistics"],
    environments: ["internal", "external", "cold"],
    operatingMethod: [
      "Insulated aluminium sections are carried in side guides and driven vertically.",
      "An inverter and encoder ramp the panel up to speed and back down, so a heavier leaf is not snatched at either end of travel.",
      "Radar or infrared activation opens the door; a threshold photocell and leading-edge safety device govern closing.",
      "A manual release allows operation during a power failure.",
    ],
    construction: [
      "43 mm aluminium alloy sections with a PU foam core",
      "Side guides and structure rated for the stated wind velocity",
      "Perimeter sealing between the panel and the opening",
    ],
    related: ["high-speed-roll-up-doors", "industrial-sectional-overhead-doors", "insulated-double-wall-rolling-shutters"],
    documents: [
      { title: "High Speed Insulated Panel Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-hsd-rigid",
    legacyUrls: ["high-speed-industrial-door.html"],
  },
];
