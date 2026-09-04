import type { Family } from "@/lib/types";

/**
 * Eight product families. Structure and terminology derived from
 * research/market-product-research.md §3; every family is corroborated by at
 * least two independent manufacturer sources.
 *
 * Copy is original and describes how the product type works and what decides
 * a specification. It contains no company-specific performance claims.
 */
export const families: Family[] = [
  {
    id: "high-speed-doors",
    name: "High Speed Doors",
    shortName: "High Speed Doors",
    tagline: "Seconds per cycle on the openings that never stop moving.",
    summary:
      "Roll-up, fold-up and rigid insulated panel doors for openings crossed hundreds of times a day, where the cost is in the time the building stands open.",
    intro: [
      "A high speed door is bought for cycle time, not for the door. On an opening used continuously, the expensive thing is not the leaf — it is the minutes per hour the building spends open to dust, insects, temperature loss and pedestrian risk while a slow door travels.",
      "The market segments these doors along two axes at once: how the curtain is stored (rolled onto a drum, folded into a stack, or made of rigid insulated panels) and what environment the door has to survive (internal, external and wind-loaded, impact-prone, hygienic, or cold). Both axes are represented here.",
    ],
    why: [
      {
        title: "Open time, not opening size",
        body: "Travel speeds measured in metres per second mean the door is open only while traffic is actually passing, which is where the energy and contamination cost of an opening actually lives.",
      },
      {
        title: "Environmental separation",
        body: "A sealed, fast-cycling curtain limits dust, insect and temperature transfer between areas that have to stay different from each other.",
      },
      {
        title: "Impact tolerance",
        body: "Self-repairing designs re-seat the curtain after a strike instead of taking a critical opening out of service until an engineer attends.",
      },
      {
        title: "Hands-free operation",
        body: "Radar, infrared and loop activation mean the driver never leaves the vehicle and no one touches the door.",
      },
    ],
    considerations: [
      "Cycle count per day — this, not opening width, sizes the drive and decides whether a high speed door is justified at all.",
      "Internal or external: an external opening carries wind load and needs a curtain and guide system rated for it.",
      "What the opening separates — temperature, dust, insects, noise, or nothing at all.",
      "Impact exposure: how close the traffic route runs to the guides, and whether forklift contact is a matter of if or when.",
      "Available headroom and side room for the drum or stack, and the depth of the lintel.",
      "Activation and safety: what opens the door, and what stops it closing on something.",
    ],
    applications: [
      "Warehouse internal and external openings",
      "Loading and dispatch bays",
      "Production and packing hall separations",
      "Cold and chilled store entrances",
      "Clean and controlled area transitions",
      "Vehicle throughways in constrained routes",
    ],
    industries: ["warehousing-logistics", "manufacturing", "cold-chain-food", "pharmaceutical-cleanroom", "automotive"],
    imageId: "family-high-speed-doors",
  },
  {
    id: "industrial-doors",
    name: "Industrial Doors",
    shortName: "Industrial Doors",
    tagline: "Insulated panels that stack overhead and free the whole opening.",
    summary:
      "Sectional overhead doors for industrial elevations, and aluminium and insulated garage doors for commercial and residential parking.",
    intro: [
      "A sectional door is built from hinged insulated panels running on tracks that turn from vertical to horizontal above the opening. Open, the whole door sits flat under the roof: the aperture is completely clear, and so is the wall on either side of it.",
      "The variant that matters is the track and lift configuration, and it is set by the building rather than by the door. Standard lift, high lift, vertical lift and low headroom are all the same door on different tracks — chosen by how much clear space exists above the opening.",
    ],
    why: [
      {
        title: "Full clear opening",
        body: "The leaf stacks horizontally under the roof, leaving both the aperture and the flanking wall usable.",
      },
      {
        title: "Real insulation",
        body: "PU-cored steel or aluminium sections give thermal and acoustic separation that a single-skin curtain cannot.",
      },
      {
        title: "Sealed perimeter",
        body: "Seals at the head, jambs and floor limit draught, rain and dust ingress at the opening.",
      },
      {
        title: "Protected counterbalance",
        body: "Torsion springs carry the leaf weight; spring-break and cable-break devices arrest it if the counterbalance fails.",
      },
    ],
    considerations: [
      "Headroom above the opening decides the lift configuration before anything else does.",
      "Side room for the vertical track, and whether the wall beside the opening has to stay usable.",
      "Insulation requirement: is the opening in the thermal envelope of the building?",
      "Whether pedestrians need to pass through when the door is shut — that is a wicket door decision.",
      "Daylight: vision panels or a full-vision glazed leaf.",
      "Wind exposure on the elevation, and the resulting panel and track specification.",
    ],
    applications: [
      "Warehouse and factory external openings",
      "Large apertures over 16 sq m",
      "Vehicle and workshop access doors",
      "Showroom and display frontages",
      "Commercial garages and service bays",
      "Residential and society parking",
    ],
    industries: ["manufacturing", "warehousing-logistics", "automotive", "retail-commercial"],
    imageId: "family-industrial-doors",
  },
  {
    id: "rolling-shutters",
    name: "Rolling Shutters",
    shortName: "Rolling Shutters",
    tagline: "The curtain rolls above the lintel and the opening stays clear.",
    summary:
      "Single-wall galvanized, aluminium, grille, perforated and polycarbonate shutters, plus double-wall insulated shutters for thermal and acoustic separation.",
    intro: [
      "A rolling shutter stores its curtain in a barrel above the opening, so it needs almost no side room and leaves the aperture completely clear when open. That is why it remains the default for wide industrial openings and for frontages where floor and wall space is at a premium.",
      "The primary engineering split is single-wall against double-wall insulated, and only then material. A single folded slat is the choice when span, security or visibility matters; a double-wall insulated slat is the choice when the opening separates two environments.",
    ],
    why: [
      {
        title: "Almost no side room needed",
        body: "The curtain rolls into a barrel above the lintel, so the full opening width stays usable and nothing intrudes beside it.",
      },
      {
        title: "Wide spans",
        body: "Steel curtains cover large industrial apertures that would need multiple leaves in other door types.",
      },
      {
        title: "Material chosen for the job",
        body: "Security, insulation, visibility, airflow or transparency — the slat profile follows the requirement, not the other way round.",
      },
      {
        title: "Manual or motorised",
        body: "Side, central, tubular and Australian-type drives, with a manual override on every powered shutter.",
      },
    ],
    considerations: [
      "Clear width and height of the opening, and the barrel space available above the lintel.",
      "Whether the opening needs to be seen through when closed — that rules in grille, perforated or polycarbonate.",
      "Insulation and acoustic requirements, which push the specification to a double-wall slat.",
      "Corrosion exposure: humid, coastal or washdown environments favour galvanized or aluminium.",
      "Curtain weight and daily cycle count, which together size the operator.",
      "Fire compartment lines, which move the requirement into the Fire & Safety family.",
    ],
    applications: [
      "Factory and warehouse openings",
      "Shopfronts, showrooms and malls",
      "Godowns and storage yards",
      "Basement and parking entries",
      "Service counters and kiosks",
      "Openings needing light and airflow with security",
    ],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial", "cold-chain-food"],
    imageId: "family-rolling-shutters",
  },
  {
    id: "fire-safety-doors",
    name: "Fire & Safety Doors",
    shortName: "Fire & Safety",
    tagline: "Holding the compartment line when a large aperture cuts through it.",
    summary:
      "Fire rated rolling shutters and fire rated sliding doors for openings that pass through a rated wall, specified against a tested assembly.",
    intro: [
      "A fire rated shutter or door closes an opening in a fire compartment wall. Its job is to hold that line for a stated period so the building's escape and containment strategy still works after a large aperture has been cut through a rated wall.",
      "The point that matters more than any other in this family: a fire rating belongs to a tested assembly — curtain or leaf, guides, fixings, motor and release mechanism, as installed — not to a product name. In India the governing standard is IS 3614, commonly cross-referenced to BS 476 Part 20/22 and EN 1634-1. We publish a rating for your opening only against a certificate for that assembly.",
    ],
    why: [
      {
        title: "Compartment integrity",
        body: "Specified where a large aperture passes through a fire-rated wall and the compartment line has to be maintained for a stated period.",
      },
      {
        title: "Insulated construction",
        body: "Double-skin curtains with an insulating layer limit radiant heat transfer through the closed assembly.",
      },
      {
        title: "Defined behaviour on alarm",
        body: "Release and auto-close arrangements are specified against the building's fire strategy, not added afterwards.",
      },
      {
        title: "Daily-use door as well",
        body: "These openings are used normally the rest of the time, so operation, sealing and duty cycle still have to be right.",
      },
    ],
    considerations: [
      "The required integrity period in minutes, taken from the building's fire strategy and the National Building Code.",
      "The standard the assembly must be certified to — IS 3614, BS 476 Part 22, EN 1634-1 or another.",
      "What triggers closure: alarm interface, fusible link, or a controlled release.",
      "Egress: what happens to people on the wrong side, and whether an adjacent escape route exists.",
      "Whether the opening also needs shielding, hygiene or acoustic performance.",
      "Certification paperwork — which assembly the certificate covers, and who holds it.",
    ],
    applications: [
      "Fire compartment openings",
      "Warehouse and plant separations",
      "Basements, service and plant rooms",
      "Hospitals and diagnostic suites",
      "Clean rooms and controlled areas",
      "Cold storage compartment lines",
    ],
    industries: ["manufacturing", "warehousing-logistics", "healthcare", "pharmaceutical-cleanroom"],
    imageId: "family-fire-safety",
  },
  {
    id: "automatic-gates",
    name: "Automatic Gates",
    shortName: "Automatic Gates",
    tagline: "The vehicle line at the boundary, opened without anyone getting out.",
    summary:
      "Sliding, telescopic, swing and retractable gate systems, sized to the leaf weight and the number of times a day the entrance actually runs.",
    intro: [
      "An automated gate has to do two things at once: let the right traffic through without delay, and stop reliably when something is in the way. Everything in this family is built around that pairing — a drive matched to leaf weight and duty cycle, and a detection and safety layer that governs it.",
      "Which gate type suits a site is decided almost entirely by geometry: how much clear boundary exists beside the opening, whether anything may cross the driveway, and how much room a leaf has to swing into.",
    ],
    why: [
      {
        title: "Sized to the duty cycle",
        body: "Drive, gearbox and control are matched to leaf weight and daily cycle count. An operator sized only for weight overheats long before it fails mechanically.",
      },
      {
        title: "Detection before contact",
        body: "Photocells, safety edges and obstruction sensing stop and reverse travel before the leaf touches anything.",
      },
      {
        title: "Manual release as standard",
        body: "Every powered gate can be released and moved by hand during a power failure.",
      },
      {
        title: "Part of the access system",
        body: "Loop detectors, readers, remotes, keypads and intercoms drive the operator directly, so the gate becomes a decision point rather than an obstacle.",
      },
    ],
    considerations: [
      "Clear opening width, and the clear side-run available for a leaf to retract into.",
      "Whether anything may cross the driveway — that decides tracked against cantilever or trackless.",
      "Leaf weight, height and wind exposure, especially for a swing leaf standing open.",
      "Cycles per day, which sizes the operator and its duty rating.",
      "Ground condition and fall across the opening.",
      "Access devices, and what the gate should do when power or the access system is lost.",
    ],
    applications: [
      "Factory and plant main gates",
      "Warehouse and logistics yards",
      "Corporate campus vehicle entries",
      "Housing societies and gated developments",
      "School, college and institutional entrances",
      "Constrained urban plots with limited boundary run",
    ],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial", "infrastructure-transit"],
    imageId: "family-automatic-gates",
  },
  {
    id: "entrance-automation",
    name: "Entrance Automation",
    shortName: "Entrance Automation",
    tagline: "Hands-free pedestrian entrances that hold the building envelope.",
    summary:
      "Sensor-operated automatic sliding glass door systems for lobbies, retail frontages and healthcare corridors, with defined egress behaviour.",
    intro: [
      "An automatic pedestrian door is driven by an operator concealed in a header above the opening, with motion and presence sensors on both sides. It opens before the user reaches it and holds open while the threshold is occupied.",
      "Three questions decide the specification: throughput, sealing and egress. Bi-parting leaves clear the opening faster than a single leaf; a well-sealed door cuts conditioning loss through a busy lobby; and what the door does on power failure and on alarm has to be set against the building's escape strategy before it is installed, not after.",
    ],
    why: [
      {
        title: "Hands-free passage",
        body: "Detection opens the door ahead of the user and holds it while the threshold is occupied — no handle, no push.",
      },
      {
        title: "Controlled air loss",
        body: "A powered door stands open only as long as it is needed, and part-open modes cut the loss further in conditioned lobbies.",
      },
      {
        title: "Accessible by default",
        body: "No leaf to pull removes the main barrier for wheelchair users, trolleys, beds and carried loads.",
      },
      {
        title: "Defined egress behaviour",
        body: "Break-out leaves and fail-safe modes are specified against the escape route requirement for that opening.",
      },
    ],
    considerations: [
      "Peak footfall, which decides single-leaf against bi-parting or telescopic.",
      "Clear opening width required when fully open, including accessibility requirements.",
      "Whether the opening sits on a designated escape route.",
      "Header depth available above the opening for the operator.",
      "Sealing and threshold detail where the lobby is conditioned.",
      "Integration with access control, intercom and building management.",
    ],
    applications: [
      "Office and corporate building lobbies",
      "Retail and showroom entrances",
      "Hospitals, clinics and diagnostic centres",
      "Hotels and hospitality entrances",
      "Institutional and public buildings",
    ],
    industries: ["retail-commercial", "healthcare", "infrastructure-transit"],
    imageId: "family-entrance-automation",
  },
  {
    id: "loading-bay",
    name: "Loading Bay Equipment",
    shortName: "Loading Bay",
    tagline: "A joint between two structures that never quite line up.",
    summary:
      "Dock levellers that bridge the gap to the vehicle bed, and dock shelters and houses that seal the opening around it.",
    intro: [
      "A loading bay joins a fixed dock floor to a vehicle bed whose height changes with every truck and every pallet moved. A leveller closes the gap underneath; a shelter or dock house closes it around the sides and top.",
      "Specification is driven by the vehicle mix, the height range that has to be covered, the capacity of the equipment crossing it, and whether the goods inside need the bay sealed against weather or temperature loss.",
    ],
    why: [
      {
        title: "Safe, continuous crossing",
        body: "A levelled ramp lets handling equipment drive on and off the trailer over one surface — no step, no loose dock plate.",
      },
      {
        title: "Height range coverage",
        body: "Working range above and below dock level lets one bay serve a mixed fleet without packing or improvisation.",
      },
      {
        title: "Sealed opening",
        body: "A shelter closes the gap around the trailer, holding temperature and keeping rain and dust out of the building.",
      },
      {
        title: "Faster turnaround",
        body: "A fixed, powered bay removes the manual setup that slows every vehicle movement.",
      },
    ],
    considerations: [
      "Vehicle mix and the resulting bed-height range above and below dock level.",
      "Capacity: the heaviest handling equipment plus load that will cross the deck.",
      "Pit dimensions available, or whether a surface-mounted arrangement is required.",
      "Whether the bay is temperature controlled, which raises the sealing requirement.",
      "Approach and manoeuvring space, and how accurately vehicles can be reversed on.",
      "The door above the bay, which is usually specified at the same time.",
    ],
    applications: [
      "Distribution centres and 3PL warehouses",
      "Manufacturing dispatch bays",
      "Cold chain and food logistics",
      "Packaging and FMCG plants",
      "Retail distribution hubs",
      "Transport and freight terminals",
    ],
    industries: ["warehousing-logistics", "cold-chain-food", "manufacturing", "retail-commercial"],
    imageId: "family-loading-bay",
  },
  {
    id: "access-control",
    name: "Access Control & Vehicle Barriers",
    shortName: "Access Control",
    tagline: "One authorised movement at a time, on foot and on wheels.",
    summary:
      "Tripod turnstiles, flap barriers and full height turnstiles at the door line; boom barriers, bollards and retractable barriers at the vehicle line.",
    intro: [
      "Access control is a layered problem. Vehicles are metered at the gate line, pedestrians at the door line, and each layer tolerates a different amount of delay and fails in a different way.",
      "Pedestrian products are graded by physical resistance: flap barriers detect and deter at speed, tripod turnstiles enforce single passage mechanically, and full height turnstiles make an unsupervised line genuinely unclimbable. On the vehicle side, a boom barrier is a control device rather than a security barrier — it meters traffic and records movements, and it will not stop a determined vehicle. Bollards will.",
    ],
    why: [
      {
        title: "Enforced single passage",
        body: "Tripod, flap and full height units allow one authorised movement at a time rather than only signalling that a rule was broken.",
      },
      {
        title: "Graded resistance",
        body: "The right layer for the risk: lane detection in a lobby, a mechanical rotor at a gate house, a fixed bollard at the vehicle line.",
      },
      {
        title: "Integrates with your access system",
        body: "Standard dry-contact and reader interfaces for cards, biometrics, QR and visitor management.",
      },
      {
        title: "Defined fail state",
        body: "Free-exit and emergency release behaviour is specified up front, so egress never depends on power.",
      },
    ],
    considerations: [
      "Peak throughput per lane, in people or vehicles per minute.",
      "Whether the point is supervised or unsupervised — that is the tripod versus full height decision.",
      "Physical resistance actually required, and whether the threat is casual or hostile.",
      "Accessibility: at least one wide lane for wheelchair users, trolleys and luggage.",
      "Escape strategy and what happens on alarm and on power loss.",
      "The reader, credential and visitor system it has to interface with.",
    ],
    applications: [
      "Factory and plant gate houses",
      "Corporate lobbies and IT campuses",
      "Transit, stadium and venue entries",
      "Data centres and restricted zones",
      "Car park entries and exits",
      "Public buildings and institutions",
    ],
    industries: ["manufacturing", "retail-commercial", "infrastructure-transit", "warehousing-logistics"],
    imageId: "family-access-control",
  },
];

export const familyById = Object.fromEntries(families.map((f) => [f.id, f])) as Record<
  Family["id"],
  Family
>;
