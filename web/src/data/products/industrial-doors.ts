import type { Product } from "@/lib/types";

/**
 * Industrial Doors — 8 products.
 *
 * Two deliberate merges from the researched catalogue, both flagged in
 * planning/OPEN-BUSINESS-DECISIONS.md as open questions:
 *
 *  - `high-speed-door.html` and `high-speed-roll-up-door.html` carried an
 *    identical specification table whose own "Application" row reads
 *    "High Speed Roll Up Door". They are published here as one product.
 *  - `sectional-door.html` ("Overhead Sectional Doors") and
 *    `overhead-sectional-doors.html` ("Sectional Overhead Doors") are two
 *    URLs for what reads as one product. Published here as one product.
 *
 * Both old URLs still resolve — the redirect map points each pair at the
 * single new page. If the business confirms they are genuinely different
 * products, they should be split back out.
 */
export const industrialDoorProducts: Product[] = [
  {
    slug: "high-speed-roll-up-doors",
    category: "industrial-doors",
    name: "High Speed Roll Up Doors",
    tagline: "Seconds per cycle on the openings that never stop moving.",
    summary:
      "PVC-curtain high speed roll-up doors opening at up to 2.5 m/s, for internal and external openings with continuous forklift and pallet traffic.",
    overview: [
      "A high speed roll-up door replaces a rigid leaf with a flexible, high-density coated fabric curtain that rolls into a compact drum. Because there is no heavy panel to accelerate, the door can open and close in a few seconds, which changes the economics of a busy opening: the building spends far less time standing open between vehicle movements.",
      "That matters most where the opening separates two environments. Every second a door is open is dust, insects, conditioned air and temperature moving in the wrong direction. On an opening used hundreds of times a day, cycle time is the specification that pays for itself.",
    ],
    benefits: [
      {
        title: "Up to 2.5 m/s travel",
        body: "Opening and closing speeds are adjustable up to 2.5 m/s, so the door is only open while traffic is actually passing.",
      },
      {
        title: "Environmental separation",
        body: "A sealed, fast-cycling curtain limits dust, insect and temperature transfer between production and storage areas.",
      },
      {
        title: "Hands-free activation",
        body: "Radar, infrared sensors, pull switches or push buttons trigger the door — the operator never leaves the vehicle.",
      },
      {
        title: "Vision panels",
        body: "Transparent sections in the curtain give sight of the far side of the opening before the door has finished travelling.",
      },
    ],
    applications: [
      "Warehouse internal and external openings",
      "Loading and dispatch bays",
      "Production and packing hall separations",
      "Food, pharmaceutical and clean-area transitions",
    ],
    howItWorks: [
      "A flexible PVC curtain runs in aluminium side guides and rolls onto a drum above the opening.",
      "A geared motor under inverter and encoder control accelerates and decelerates the curtain, with a PLC managing the cycle.",
      "Radar or infrared activation opens the door on approach; a safety photocell across the threshold prevents closing on an obstruction.",
      "A crank handle allows manual operation during a power failure.",
    ],
    specs: [
      { label: "Maximum width", value: "5000 mm" },
      { label: "Maximum height", value: "5000 mm" },
      { label: "Opening speed", value: "0.80–2.5 m/s (adjustable)" },
      { label: "Closing speed", value: "0.80–2.5 m/s (adjustable)" },
      { label: "Wind load resistance", value: "EN 12424 Class 2" },
      { label: "Curtain", value: "0.8–1.2 mm high-density PVC coated fabric" },
      { label: "Vision panel", value: "Transparent PVC film" },
      { label: "Side guides", value: "Aluminium extrusion" },
      { label: "Frame material", value: "Galvanized steel, aluminium alloy or stainless steel" },
      { label: "Track and box cover", value: "2.0 mm folded galvanized steel" },
      { label: "Drive", value: "SEW or equivalent, 380 V / 220 V 50 Hz, 0.75 / 1.1 / 1.5 kW" },
      { label: "Control", value: "PLC with inverter and encoder" },
      { label: "Activation", value: "Double-side radar, push button or infrared sensors" },
      { label: "Manual operation", value: "Crank handle" },
      { label: "Curtain colours", value: "Blue, yellow, orange, grey, red and others to order" },
    ],
    image: "/images/legacy/intro.jpg",
    imageAlt: "High speed door at a warehouse opening with a forklift passing through",
    related: ["high-speed-self-repairing-doors", "high-speed-fold-up-doors", "high-speed-industrial-doors"],
    legacyUrl: "https://www.standardautomation.in/high-speed-roll-up-door.html",
  },
  {
    slug: "high-speed-self-repairing-doors",
    category: "industrial-doors",
    name: "High Speed Self-Repairing Doors",
    tagline: "Takes a forklift hit and puts itself back in the guides.",
    summary:
      "High speed doors whose curtain releases from the side guides on impact and re-seats itself on the next cycle, avoiding downtime and call-outs.",
    overview: [
      "In a busy opening, the door will eventually be hit. On a conventional high speed door that means a bent guide, a torn curtain and an opening out of service until an engineer attends. A self-repairing door is designed around that certainty: the curtain is held in the guides by a mechanism that lets go under impact rather than tearing.",
      "After a strike the door is driven to its top limit, where the curtain re-engages the guides automatically, and normal service resumes. The result is measured less in door specification than in avoided downtime on a critical opening.",
    ],
    benefits: [
      {
        title: "Impact does not stop the opening",
        body: "The curtain releases instead of tearing, and re-seats on the next full opening cycle.",
      },
      {
        title: "Fewer service call-outs",
        body: "Routine forklift contact no longer generates an emergency attendance and a curtain replacement.",
      },
      {
        title: "Same cycle speed",
        body: "Impact tolerance is added without giving up the fast travel that justified a high speed door in the first place.",
      },
      {
        title: "Suited to tight traffic",
        body: "Appropriate for openings where vehicles and pedestrians share a constrained route.",
      },
    ],
    applications: [
      "High-traffic warehouse throughways",
      "Narrow openings with heavy forklift movement",
      "Production areas with continuous internal traffic",
      "Cold and chilled store entrances",
    ],
    specs: [],
    image: "/images/photography/industrial-doors.jpg",
    imageAlt: "Industrial roll-up door on a building opening",
    related: ["high-speed-roll-up-doors", "high-speed-fold-up-doors", "high-speed-industrial-doors"],
    legacyUrl: "https://www.standardautomation.in/high-speed-self-repairing-doors.html",
  },
  {
    slug: "high-speed-fold-up-doors",
    category: "industrial-doors",
    name: "High Speed Fold Up Doors",
    tagline: "Fast cycling for wide openings with restricted headroom.",
    summary:
      "High speed doors whose curtain folds upward into a stack rather than rolling onto a drum, for wide openings where roll-up headroom is limited.",
    overview: [
      "A fold-up door gathers its curtain into horizontal folds as it opens instead of winding it onto a drum. That gives a shallower stack above the opening, which is useful on wide external openings and on facades where the lintel detail cannot accommodate a roll.",
      "Fold-up curtains are typically reinforced with horizontal wind bars, which is what allows the type to span wide external openings while keeping high speed travel.",
    ],
    benefits: [
      {
        title: "Wide external openings",
        body: "Reinforced curtains span wide apertures while retaining fast cycle times.",
      },
      {
        title: "Shallow stack",
        body: "A folded curtain needs less depth above the opening than a rolled one on large doors.",
      },
      {
        title: "Wind resistance",
        body: "Horizontal reinforcement carries wind load across the span on exposed elevations.",
      },
      {
        title: "Fast cycling",
        body: "Retains the short open time that makes a high speed door worthwhile on a busy opening.",
      },
    ],
    applications: [
      "Wide external warehouse openings",
      "Dispatch and vehicle access doors",
      "Facades with limited lintel depth",
      "Exposed elevations with wind loading",
    ],
    specs: [],
    image: "/images/photography/loading-bay.jpg",
    imageAlt: "Wide industrial door openings on a distribution building",
    related: ["high-speed-roll-up-doors", "high-speed-self-repairing-doors", "overhead-sectional-doors"],
    legacyUrl: "https://www.standardautomation.in/high-speed-fold-up-doors.html",
  },
  {
    slug: "high-speed-industrial-doors",
    category: "industrial-doors",
    name: "High Speed Industrial Doors",
    tagline: "Insulated rigid-panel doors at high speed travel.",
    summary:
      "Aluminium alloy PU-foam panel high speed doors up to 5000 x 7500 mm, rated to 120 km/h wind velocity, under PLC and inverter control.",
    overview: [
      "Where an opening needs both insulation and speed, a rigid-panel high speed door uses insulated aluminium sections rather than a fabric curtain. The panel adds thermal separation and structural resistance that a flexible curtain cannot provide, at the cost of a heavier assembly and a slightly slower cycle.",
      "This configuration suits tall external openings on exposed sites, and internal openings between areas held at different temperatures where a fabric curtain would not hold the differential.",
    ],
    benefits: [
      {
        title: "Insulated panel",
        body: "43 mm aluminium alloy sections with PU foam core, for openings that separate different thermal environments.",
      },
      {
        title: "Rated for wind",
        body: "Specified to a rated wind velocity of 120 km/h for exposed external elevations.",
      },
      {
        title: "Tall openings",
        body: "Configurations to 5000 mm wide and 7500 mm high, covering openings a fabric curtain would struggle to span.",
      },
      {
        title: "Controlled acceleration",
        body: "Inverter and encoder control ramps a heavier panel up and down smoothly rather than snatching it.",
      },
    ],
    applications: [
      "Tall external industrial openings",
      "Temperature-separated internal openings",
      "Exposed elevations with high wind loading",
      "Production halls needing insulation and speed",
    ],
    specs: [
      { label: "Maximum width", value: "5000 mm" },
      { label: "Maximum height", value: "7500 mm" },
      { label: "Opening speed", value: "1.2–1.5 m/s (adjustable)" },
      { label: "Closing speed", value: "0.6 m/s (adjustable)" },
      { label: "Panel", value: "Aluminium alloy with PU foam, 43 mm" },
      { label: "Panel finish", value: "Silver or customised" },
      { label: "Rated wind velocity", value: "120 km/h" },
      { label: "Drive", value: "SEW motor, 380 V / 220 V 50 Hz, 0.75 / 1.1 / 1.5 kW" },
      { label: "Control", value: "PLC with inverter and encoder" },
      { label: "Activation", value: "Double-side radar, infrared sensors or as specified" },
    ],
    image: "/images/photography/manufacturing.jpg",
    imageAlt: "Large production machinery inside a manufacturing plant",
    related: ["high-speed-roll-up-doors", "overhead-sectional-doors", "high-speed-fold-up-doors"],
    legacyUrl: "https://www.standardautomation.in/high-speed-industrial-door.html",
  },
  {
    slug: "overhead-sectional-doors",
    category: "industrial-doors",
    name: "Overhead Sectional Doors",
    tagline: "Insulated panels that stack overhead and free the whole opening.",
    summary:
      "Insulated sectional overhead doors in aluminium or galvanized steel with a PUF core, 40–50 mm thick, in manual and motorised configurations.",
    overview: [
      "A sectional door is built from horizontal insulated panels hinged together, running on tracks that curve from vertical to horizontal above the opening. When open, the whole door sits flat under the roof — the opening is completely clear, and so is the wall either side of it.",
      "That geometry is the reason sectional doors are standard on industrial elevations: nothing intrudes into the opening or the space beside it, the panels carry real insulation, and the perimeter can be properly sealed against weather.",
    ],
    benefits: [
      {
        title: "Full clear opening",
        body: "The door stacks horizontally under the roof, leaving both the aperture and the flanking wall usable.",
      },
      {
        title: "Insulated panels",
        body: "40–50 mm PUF-cored aluminium or galvanized steel sections give real thermal and acoustic separation.",
      },
      {
        title: "Sealed perimeter",
        body: "Seals at the head, jambs and floor limit draught, rain and dust ingress at the opening.",
      },
      {
        title: "Safety hardware",
        body: "Anti-fall devices and spring-break protection are integral to the counterbalance assembly.",
      },
    ],
    applications: [
      "Warehouse and factory external openings",
      "Large apertures over 16 sq m",
      "Vehicle and workshop access doors",
      "Industrial units and godowns",
    ],
    howItWorks: [
      "Hinged insulated panels run in vertical tracks that curve to horizontal above the opening.",
      "A torsion spring counterbalances the door weight so it can be moved by hand or by a modest operator.",
      "Spring-break and cable-break safety devices arrest the door if the counterbalance fails.",
      "A wicket door can be built into the leaf, interlocked so the main door only runs when the wicket is closed.",
    ],
    specs: [
      { label: "Type code", value: "SD40, SD50" },
      { label: "Panel material", value: "Aluminium or galvanized steel, PUF insulated" },
      { label: "Panel thickness", value: "40 mm to 50 mm" },
      { label: "Panel height", value: "300 mm" },
      { label: "Standard colour", value: "White or customised" },
      { label: "Maximum span", value: "Up to 10 m wide" },
      { label: "Frame", value: "Steel" },
      { label: "Operation", value: "Electric or manual" },
      { label: "Finish options", value: "Powder coated or plastisol coated to any RAL colour" },
      { label: "Wind resistance", value: "EN 12424" },
      { label: "Options", value: "Wicket access door, key switch, remote control, rocker switch" },
    ],
    image: "/images/photography/garage-door-house.jpg",
    imageAlt: "A closed sectional overhead door beside a brick wall",
    related: ["aluminium-garage-doors", "sectional-door-motor", "high-speed-industrial-doors"],
    legacyUrl: "https://www.standardautomation.in/overhead-sectional-doors.html",
  },
  {
    slug: "aluminium-garage-doors",
    category: "industrial-doors",
    name: "Aluminium Garage Doors",
    tagline: "Glazed aluminium sectional doors where the opening is seen.",
    summary:
      "Sectional garage doors in aluminium with glazed panels, powder coated hardware and a full set of counterbalance safety devices.",
    overview: [
      "An aluminium garage door is a sectional door built for appearance as much as for function: aluminium sections with glazed inserts admit daylight and give the elevation a lighter, more architectural line than a solid steel panel.",
      "The mechanics are the same as any sectional door — torsion counterbalance, tracks curving overhead, perimeter sealing — so the safety hardware that matters on a heavy overhead leaf is unchanged.",
    ],
    benefits: [
      {
        title: "Daylight through the opening",
        body: "Glazed aluminium sections light the space behind the door without leaving it open.",
      },
      {
        title: "Protected counterbalance",
        body: "Spring-break and anti-fall devices arrest the leaf if a spring or cable fails.",
      },
      {
        title: "Sealed and insulated perimeter",
        body: "Seals around the leaf hold heat and keep weather out of the space behind.",
      },
      {
        title: "Wind rated",
        body: "Assembly specified against EN 12424 wind loading classes.",
      },
    ],
    applications: [
      "Showroom and display frontages",
      "Commercial garages and service bays",
      "Premium residential garages",
      "Openings up to 10 m wide",
    ],
    specs: [
      { label: "Panel", value: "Aluminium sections with glazed inserts, foam-filled" },
      { label: "Hardware and track", value: "2.5 mm galvanized steel, powder coated" },
      { label: "Spring-break safety", value: "Device arrests the spring axis and cable if a spring fails" },
      { label: "Anti-fall device", value: "Arrests the leaf if a wire rope breaks" },
      { label: "Supply", value: "220 V / 380 V / 400 V" },
      { label: "Protection class", value: "IP55" },
      { label: "Wind resistance", value: "EN 12424" },
      { label: "Options", value: "Wicket door and vision windows, interlocked with the main leaf" },
    ],
    image: "/images/photography/garage-door-modern.jpg",
    imageAlt: "A modern elevation with a sectional garage door",
    related: ["overhead-sectional-doors", "residential-garage-doors", "sectional-door-motor"],
    legacyUrl: "https://www.standardautomation.in/garage-door.html",
  },
  {
    slug: "residential-garage-doors",
    category: "industrial-doors",
    name: "Residential Garage Doors",
    tagline: "Insulated sectional doors sized for private garages.",
    summary:
      "Insulated steel sectional garage doors for private and residential garages, with remote operation and full counterbalance safety hardware.",
    overview: [
      "A residential garage door is a smaller sectional door, usually operated by remote and often forming part of the house envelope rather than an outbuilding. That makes insulation, seal quality and quiet running more important than raw duty cycle.",
      "The safety requirements do not scale down with the door. A counterbalanced overhead leaf in a domestic setting still needs spring-break protection, an anti-fall device and obstruction detection on the operator.",
    ],
    benefits: [
      {
        title: "Insulated leaf",
        body: "Foam-cored steel sections reduce heat loss where the garage adjoins living space.",
      },
      {
        title: "Quiet, sealed operation",
        body: "Perimeter sealing and adjustable pulley brackets keep the leaf running smoothly and quietly.",
      },
      {
        title: "Full safety hardware",
        body: "Spring-break and cable-break devices as standard, with obstruction detection on the operator.",
      },
      {
        title: "Remote operated",
        body: "Handset or wall control, with a manual release for use during a power failure.",
      },
    ],
    applications: [
      "Private residences and villas",
      "Apartment and society parking",
      "Small commercial garages",
    ],
    specs: [
      { label: "Panel", value: "Galvanized steel sections with foam core" },
      { label: "Hardware and track", value: "2.5 mm galvanized steel, powder coated" },
      { label: "Spring-break safety", value: "Device arrests the spring axis and cable if a spring fails" },
      { label: "Anti-fall device", value: "Arrests the leaf if a wire rope breaks" },
      { label: "Protection class", value: "IP55" },
      { label: "Wind resistance", value: "EN 12424" },
    ],
    image: "/images/photography/parking-entry.jpg",
    imageAlt: "A controlled vehicle entrance to a parking structure",
    related: ["aluminium-garage-doors", "overhead-sectional-doors", "sectional-door-motor"],
    legacyUrl: "https://www.standardautomation.in/residential-garage-door.html",
  },
  {
    slug: "fire-sliding-doors",
    category: "industrial-doors",
    name: "Fire Sliding Doors",
    tagline: "Automatic sliding doors for compartment and controlled-area openings.",
    summary:
      "Automatic sliding doors with HPL, painted steel or powder-coated aluminium leaves and lead-lined options, for hospital, clean room and cold store openings.",
    overview: [
      "A sliding door on a compartment or controlled-area opening has to satisfy two things at once: it must move automatically and hygienically for the traffic that uses it, and it must close properly against its frame when the building's fire or containment strategy requires it.",
      "Leaf construction is specified accordingly — HPL, painted steel or powder-coated aluminium faces, with lead sheet where radiation shielding is required and single or double glazed vision panels for sightlines.",
    ],
    benefits: [
      {
        title: "Automatic, hands-free",
        body: "Powered sliding operation suits corridors where trolleys and beds are moved constantly.",
      },
      {
        title: "Hygienic surfaces",
        body: "HPL and powder-coated faces wipe down for clean room and healthcare environments.",
      },
      {
        title: "Shielding option",
        body: "Lead sheet in the leaf where radiation shielding is required, with lead glass vision panels.",
      },
      {
        title: "Vision panels",
        body: "Single or double glazed windows in an aluminium frame give sightlines through the opening.",
      },
    ],
    applications: [
      "Hospitals and diagnostic suites",
      "Clean rooms and controlled areas",
      "Cold storage systems",
      "Warehouse compartment openings",
    ],
    specs: [
      { label: "Door type", value: "Automatic sliding" },
      { label: "Leaf facing", value: "HPL, painted steel or powder-coated aluminium" },
      { label: "Frame material", value: "Aluminium" },
      { label: "Leaf thickness", value: "4.5 mm" },
      { label: "Lead sheet thickness", value: "3.0 mm" },
      { label: "Door plate thickness", value: "1.0 mm" },
      { label: "Vision window", value: "Single glazing in aluminium frame, or double glazing with lead glass" },
      { label: "Glass thickness", value: "5 mm / 6 mm" },
      { label: "Reference size", value: "1800 x 2100 mm" },
    ],
    image: "/images/photography/installation.jpg",
    imageAlt: "Technician inspecting a door installation on site",
    related: ["automatic-sliding-glass-doors", "fire-rated-rolling-shutters", "overhead-sectional-doors"],
    legacyUrl: "https://www.standardautomation.in/fire-sliding-door.html",
  },
];
