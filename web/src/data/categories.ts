import type { Category } from "@/lib/types";

/**
 * Six solution categories. This taxonomy is new — the old site had eight
 * overlapping menu groups with a duplicated "High Speed Doors" label and
 * doors split across two unrelated branches. Every product from the
 * researched catalogue maps into exactly one category here.
 *
 * Copy is original. Product-type explanations are general industry
 * information about how these systems work; nothing here asserts a
 * company-specific capability that has not been confirmed.
 */
export const categories: Category[] = [
  {
    slug: "entrance-automation",
    name: "Entrance Automation",
    shortName: "Entrance Automation",
    tagline: "Automated gates and entrance doors for sites that move all day.",
    summary:
      "Automatic sliding gates, swing gates, telescopic and retractable gates, and automatic sliding glass doors — sized to the opening and the traffic it carries.",
    intro: [
      "An automated entrance has to do two jobs at once: let the right traffic through without delay, and stop reliably when something is in the way. Everything in this category is built around that pairing — a drive sized to the leaf weight and duty cycle, and a detection and safety layer that governs it.",
      "Selection starts with the opening: clear width, available side-run, slope, wind exposure, and how many cycles a day the entrance will see. A gate that opens forty times a day and one that opens four hundred times are not the same specification, even at the same width.",
    ],
    image: "/images/photography/entrance-automation.jpg",
    imageAlt: "Modern building entrance with automatic glass doors",
    benefits: [
      {
        title: "Sized to the duty cycle",
        body: "Drive, gearbox and control are matched to leaf weight and daily cycle count, not to opening width alone.",
      },
      {
        title: "Safety edges and detection",
        body: "Photocells, safety edges and obstruction sensing stop and reverse travel before contact — the baseline for any powered leaf.",
      },
      {
        title: "Manual release",
        body: "Every powered gate and door can be released and operated by hand during a power failure.",
      },
      {
        title: "Access control ready",
        body: "Interfaces for card readers, remotes, keypads, loop detectors and intercoms so the entrance fits your existing access system.",
      },
    ],
    applications: [
      "Factory and plant main gates",
      "Warehouse and logistics yards",
      "Corporate campuses and office parks",
      "Retail and showroom entrances",
      "Housing societies and gated developments",
      "Hospitals and institutional buildings",
    ],
  },
  {
    slug: "industrial-doors",
    name: "Industrial Doors",
    shortName: "Industrial Doors",
    tagline: "High speed, sectional and fire-rated doors for production and storage.",
    summary:
      "High speed roll-up, fold-up and self-repairing doors, overhead sectional doors, garage doors and fire sliding doors for industrial and commercial openings.",
    intro: [
      "Industrial doors are chosen on cycle time, seal and headroom. A high speed door earns its cost back in a busy opening by cutting the time the building is open to dust, temperature loss and pedestrian risk; a sectional door earns it in insulation and clear headroom.",
      "The right door for an opening depends on how often it runs, what has to stay in or out, and what is above and beside the opening. Specification works from those constraints rather than from a catalogue default.",
    ],
    image: "/images/photography/industrial-doors.jpg",
    imageAlt: "Closed roll-up industrial door on a warehouse facade",
    benefits: [
      {
        title: "Cycle time that matches the traffic",
        body: "High speed doors open and close in seconds, so an opening used continuously is not left standing open between movements.",
      },
      {
        title: "Environmental separation",
        body: "Insulated panels and perimeter sealing hold temperature, keep dust and insects out, and reduce conditioning losses.",
      },
      {
        title: "Impact tolerance",
        body: "Self-repairing designs re-seat the curtain after a forklift strike instead of taking the opening out of service.",
      },
      {
        title: "Clear headroom",
        body: "Sectional doors stack overhead, leaving the full opening width and the wall either side usable.",
      },
    ],
    applications: [
      "Production halls and clean areas",
      "Cold storage and temperature-controlled rooms",
      "Warehouse internal and external openings",
      "Loading and dispatch bays",
      "Vehicle workshops and service bays",
      "Pharmaceutical and food processing facilities",
    ],
  },
  {
    slug: "rolling-shutters",
    name: "Rolling Shutters",
    shortName: "Rolling Shutters",
    tagline: "Steel, aluminium, polycarbonate and fire-rated shutter systems.",
    summary:
      "Galvanized, aluminium, insulated, perforated, grille, polycarbonate and fire-rated rolling shutters, in manual and motorised configurations.",
    intro: [
      "A rolling shutter stores its curtain in a barrel above the opening, so it needs almost no side room and leaves the aperture completely clear when open. That makes it the default for wide industrial openings and for shopfronts where floor space is at a premium.",
      "The variants differ mainly in curtain material and slat profile: galvanized steel for security and span, aluminium for weight and finish, insulated double-wall for thermal and acoustic separation, perforated or grille for visibility and airflow, polycarbonate for full transparency, and fire-rated for compartment openings.",
    ],
    image: "/images/photography/rolling-shutters.jpg",
    imageAlt: "Closed roller shutters across a commercial frontage",
    benefits: [
      {
        title: "Almost no side room needed",
        body: "The curtain rolls into a barrel above the lintel, so the full opening width stays usable.",
      },
      {
        title: "Wide spans",
        body: "Steel curtains cover large industrial apertures that would need multiple leaves in other door types.",
      },
      {
        title: "Material chosen for the job",
        body: "Security, insulation, visibility, airflow or fire rating — the slat profile follows the requirement.",
      },
      {
        title: "Manual or motorised",
        body: "Side, central, tubular or Australian-type drives, with manual override on every powered shutter.",
      },
    ],
    applications: [
      "Factory and warehouse openings",
      "Shopfronts, showrooms and malls",
      "Godowns and storage yards",
      "Basement and parking entries",
      "Fire compartment openings",
      "Service counters and kiosks",
    ],
  },
  {
    slug: "loading-bay",
    name: "Loading Bay Solutions",
    shortName: "Loading Bay",
    tagline: "Bridging the gap between the dock floor and the vehicle bed.",
    summary:
      "Dock levellers and dock houses/shelters that make the transition from building to trailer level sealed, level and safe to drive across.",
    intro: [
      "A loading bay is a joint between two structures that never quite line up: a fixed dock floor and a vehicle bed whose height changes with every truck and every pallet loaded. Levellers close that gap; shelters seal around it.",
      "Specification is driven by the vehicle mix, the height range to be covered, the capacity of the equipment crossing it, and whether the goods inside need the bay sealed against weather or temperature loss.",
    ],
    image: "/images/photography/loading-bay.jpg",
    imageAlt: "Row of loading docks on a distribution building",
    benefits: [
      {
        title: "Safe, continuous crossing",
        body: "A levelled ramp lets forklifts drive on and off the trailer without a step or a loose dock plate.",
      },
      {
        title: "Height range coverage",
        body: "Working range above and below dock level accommodates a mixed vehicle fleet at one bay.",
      },
      {
        title: "Sealed opening",
        body: "Dock shelters close the gap around the trailer, holding temperature and keeping rain and dust out of the building.",
      },
      {
        title: "Faster turnaround",
        body: "A fixed, powered bay removes the manual setup that slows each vehicle movement.",
      },
    ],
    applications: [
      "Distribution centres and 3PL warehouses",
      "Manufacturing dispatch bays",
      "Cold chain and food logistics",
      "Packaging and FMCG plants",
      "Retail distribution hubs",
      "Transport and freight terminals",
    ],
  },
  {
    slug: "security-access",
    name: "Security & Access",
    shortName: "Security & Access",
    tagline: "Controlling who enters, on foot and on wheels.",
    summary:
      "Bollards, tripod turnstiles, flap barriers, full height turnstiles, boom barriers and retractable barriers for pedestrian and vehicle control.",
    intro: [
      "Perimeter and lobby control is a layered problem: vehicles are metered at the gate line, pedestrians are metered at the door line, and each layer has a different tolerance for delay and a different failure mode.",
      "These products all do the same underlying job — allow one authorised movement at a time and record it — but they differ in throughput, physical resistance and how they behave when power or the access system is lost.",
    ],
    image: "/images/photography/security-access.jpg",
    imageAlt: "Row of access-control turnstiles in a building lobby",
    benefits: [
      {
        title: "One authorised movement at a time",
        body: "Tripod, flap and full height units enforce single-person passage rather than simply signalling it.",
      },
      {
        title: "Integrates with your access system",
        body: "Standard dry-contact and reader interfaces for cards, biometrics, QR and visitor systems.",
      },
      {
        title: "Graded physical resistance",
        body: "From lobby flap barriers up to full height turnstiles and fixed or retractable bollards at the vehicle line.",
      },
      {
        title: "Defined fail state",
        body: "Free-exit and emergency release behaviour specified up front, so egress is never dependent on power.",
      },
    ],
    applications: [
      "Factory and plant gate houses",
      "Corporate lobbies and IT campuses",
      "Metro, transit and stadium entries",
      "Data centres and restricted zones",
      "Parking entries and exits",
      "Public buildings and institutions",
    ],
  },
  {
    slug: "motors-accessories",
    name: "Motors & Accessories",
    shortName: "Motors",
    tagline: "The drive units behind shutters, gates and doors.",
    summary:
      "Side, central, tubular and Australian-type shutter motors, plus sliding gate, swing gate, sectional door and sliding glass door operators.",
    intro: [
      "The operator is the part of an automated opening that determines its duty cycle, its noise, and how it behaves when the power fails. Sizing is a function of curtain or leaf weight, opening height, and how many cycles a day it has to complete.",
      "Motor types are not interchangeable: a tubular motor sits inside the barrel of a light shutter, a side motor drives the barrel shaft on a heavy one, and a gate operator has an entirely different load profile again.",
    ],
    image: "/images/photography/engineering-panel.jpg",
    imageAlt: "Engineer operating an industrial equipment control panel",
    benefits: [
      {
        title: "Sized to the load",
        body: "Torque and duty rating selected against curtain or leaf weight and daily cycle count.",
      },
      {
        title: "Manual override",
        body: "Chain hoist, crank or release mechanism so the opening still works during a power failure.",
      },
      {
        title: "Limit and safety control",
        body: "Adjustable travel limits, with obstruction detection and safety edge inputs on the control side.",
      },
      {
        title: "Retrofit friendly",
        body: "Drive types to suit both new installations and the motorisation of existing manual shutters and gates.",
      },
    ],
    applications: [
      "New shutter, gate and door installations",
      "Motorising existing manual shutters",
      "Replacement of failed or undersized operators",
      "Service and AMC spares",
    ],
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
) as Record<Category["slug"], Category>;
