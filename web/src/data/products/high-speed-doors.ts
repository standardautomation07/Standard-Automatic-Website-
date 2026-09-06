import type { Product, SelectionRule } from "@/lib/types";

/**
 * High Speed Doors — 7 products.
 *
 * The technical parameters for this family were issued by Standard Automatic
 * Solutions on 2026-09-05 and are held verbatim in `src/data/product-specs.ts`.
 * They are the source of truth. Nothing on this page may contradict them,
 * extend them with a figure they do not contain, or import a number from
 * another manufacturer.
 *
 * Two rules follow from that, and they are worth stating because they explain
 * why some copy below reads more carefully than a brochure would:
 *
 *  - Where the issued data qualifies a figure — an asterisk, "application
 *    dependent", "project specific", "configuration dependent" — the copy
 *    qualifies it the same way. It is never quietly promoted into a promise.
 *  - Where the issued data is silent, the copy is silent. The cleanroom and
 *    hygiene door in particular publishes no cleanroom classification and no
 *    certification of any kind, because none was supplied. It says so on the
 *    page rather than staying quiet about it, and it does so without naming
 *    any scheme — naming one is how a denial turns into a search result that
 *    looks like a claim.
 *
 * Selection guidance and FAQ are authored per product rather than inherited
 * from the category: these seven doors are chosen against one another, so a
 * shared answer would be the wrong answer six times out of seven. Integration
 * and installation stay at category level, where they belong.
 */

/**
 * The three questions that decide any powered opening before the product type
 * even comes up. Every door below builds its own selection guidance on top of
 * these rather than restating them seven times.
 */
const cycleFirstSelection: SelectionRule[] = [
  {
    condition: "The opening is used continuously through the shift",
    recommendation:
      "Size on duty cycle first. An operator chosen only for leaf weight will overheat long before it fails mechanically.",
  },
  {
    condition: "The opening separates two environments",
    recommendation:
      "State the differential — temperature, dust, insects, noise or pressure. It decides curtain or panel construction and the sealing requirement.",
  },
  {
    condition: "The opening is on an external elevation",
    recommendation:
      "Wind exposure sets the class the assembly must be built to, and rules out lighter constructions regardless of opening size.",
  },
];

/**
 * What we need before a high speed door can be configured and priced. Shared,
 * because the same five answers drive every door in the family; individual
 * products append the one extra question their environment raises.
 */
const hsdOrdering: string[] = [
  "Clear opening width and height, measured between the finished reveals",
  "Headroom above the lintel and side room at both jambs, which decide the drum, stack or spiral track and the guides",
  "Roughly how many cycles a day the opening takes — this sizes the drive and is what justifies a high speed door at all",
  "Internal or external, and the exposure of the elevation if external",
  "What the two sides of the opening have to keep different from each other: temperature, dust, insects, noise or pressure",
  "How close the traffic route runs to the guides, and whether forklift contact is likely",
  "Power supply available at the opening, and any access control or signalling it has to interface with",
];

const brochure = (name: string) => ({
  title: `${name} brochure`,
  kind: "Brochure" as const,
  href: null,
  note: "In preparation — ask us for the specification sheet in the meantime.",
});

const drawing = {
  title: "Opening survey and technical drawing",
  kind: "Technical drawing" as const,
  href: null,
  note: "Produced per project after the site survey.",
};

/** Every door in this family is quoted from the same five answers. */
const quotationFaq = {
  question: "What information do you need to quote?",
  answer:
    "Clear width and height of the opening, the headroom and side room available, roughly how many cycles a day it will take, whether it is internal or external, and what the two sides of the opening have to keep different from each other. Five answers and a photograph are usually enough for a configuration and a price.",
};

export const highSpeedDoorProducts: Product[] = [
  /* ============================================================== 1 */
  {
    id: "high-speed-roll-up-door",
    familyId: "high-speed-doors",
    categoryId: "roll-up-high-speed-doors",
    name: "High Speed Roll-Up Door",
    status: "CONFIRMED",
    tagline:
      "A flexible PVC rapid door for high-frequency industrial and internal traffic.",
    summary:
      "Flexible PVC curtain rolling onto a drum above the opening, up to 5,000 × 5,000 mm, opening at 0.8–2.5 m/s under PLC, inverter and encoder control.",
    overview: [
      "A high speed roll-up door replaces a rigid leaf with a high-density PVC-coated polyester curtain that winds onto a drum above the opening. There is no heavy panel to accelerate, which is what allows the door to clear a busy opening in seconds rather than tens of seconds. On an aperture crossed a few hundred times a shift, that difference is the whole business case: the building spends far less of the day standing open.",
      "The economics sit in the open time, not in the door. Every second an opening is open is dust, insects, conditioned air and noise moving in the wrong direction, and a pedestrian and vehicle conflict that nobody is managing. A roll-up door is the most economical way to buy that time back on an internal or sheltered opening, which is why it is the default high speed type and the one the other configurations are compared against.",
      "Curtain, frame and guide materials are selected against the environment rather than the opening size. Galvanized steel suits a dry internal throughway; stainless steel is specified where the area is washed down. Transparent PVC vision sections are available so a driver sees the far side before the door has finished travelling.",
    ],
    quickFacts: [
      { label: "Maximum size", value: "5,000 × 5,000 mm", qualified: true },
      { label: "Opening speed", value: "0.8–2.5 m/s", qualified: true },
      { label: "Wind resistance", value: "EN 12424 Class 2", qualified: true },
      { label: "Control", value: "PLC / inverter / encoder" },
    ],
    benefits: [
      {
        title: "Open only while traffic passes",
        body: "An opening speed of 0.8–2.5 m/s means the aperture is not left standing open between movements. On a high-traffic route that is where the cost of an opening actually lives.",
      },
      {
        title: "Environmental separation",
        body: "A high-density PVC-coated polyester curtain closing behind every movement limits dust, insect and temperature transfer between production, storage and dispatch areas.",
      },
      {
        title: "Hands-free activation",
        body: "Radar, push button, photocell or loop opens the door on approach, so the driver never leaves the vehicle and nobody touches the door.",
      },
      {
        title: "Built for the environment, not just the opening",
        body: "Frame and guides in galvanized steel, aluminium or stainless steel, so a washdown area and a dry internal throughway are not given the same door.",
      },
    ],
    variants: [
      {
        id: "internal",
        name: "Internal mounting",
        note: "For openings inside the building envelope, where wind load is not part of the specification and the curtain is working against dust, noise and temperature rather than weather.",
        status: "CONFIRMED",
      },
      {
        id: "external",
        name: "External mounting",
        note: "For openings in an external elevation, specified against the wind resistance the exposure requires.",
        status: "CONFIRMED",
      },
      {
        id: "stainless",
        name: "Stainless steel frame and guides",
        note: "Stainless frame and guide rails for areas that are hosed or foamed down, where painted steel does not survive the cleaning regime.",
        status: "CONFIRMED",
      },
    ],
    applications: [
      "Warehouses",
      "Factories",
      "Logistics facilities",
      "Workshops",
      "Production areas",
      "Material movement areas",
    ],
    industries: ["warehousing-logistics", "manufacturing", "automotive", "cold-chain-food"],
    environments: ["internal", "external"],
    operatingMethod: [
      "The flexible PVC curtain runs in side guides and winds onto a drum above the opening.",
      "An industrial geared motor under PLC, inverter and encoder control accelerates and decelerates the curtain and holds repeatable stop positions.",
      "Radar, a push button, a photocell or a ground loop opens the door on approach.",
      "A threshold photocell and a safety edge prevent the curtain closing on an obstruction.",
      "A manual crank or override allows the door to be operated by hand during a power failure.",
    ],
    construction: [
      "High-density PVC-coated polyester fabric curtain, 0.8–1.2 mm",
      "Frame in galvanized steel, aluminium or stainless steel",
      "Guide rails in galvanized steel, with a stainless steel option",
      "Optional transparent PVC vision panels",
    ],
    safety: [
      "Photocell across the threshold prevents the curtain closing on an obstruction",
      "Safety edge on the leading edge, reversing travel on contact",
      "Manual crank or manual override for operation during a power failure",
    ],
    controls: [
      "PLC control with inverter and encoder",
      "Supply at 230 V or 415 V, 50 Hz",
      "Activation by radar, push button, photocell or loop detector",
      "Adjustable open and close speeds within the published range",
    ],
    options: [
      "Optional transparent PVC vision panels",
      "Internal or external mounting depending on configuration",
      "Frame in galvanized steel, aluminium or stainless steel",
      "Guide rails with a stainless steel option",
    ],
    maintenance: [
      "Curtain, guides and bottom beam inspected on a scheduled interval — cycle count, not calendar time, is what drives wear on a high speed door",
      "Photocell and safety edge function-tested at every service visit",
      "The curtain and the bottom beam seal are the consumables; both are replaceable without changing the drive",
    ],
    selectionGuide: [
      ...cycleFirstSelection,
      {
        condition: "The opening is inside the building and crossed constantly",
        recommendation:
          "This is the type the others are compared against. A roll-up door gives the fastest cycle for the money on an internal aperture.",
      },
      {
        condition: "Forklifts pass close to the guides",
        recommendation:
          "Move to the self-repairing door. Impact is a question of when rather than if, and a releasing curtain avoids taking the opening out of service.",
      },
      {
        condition: "The area is hosed or foamed down",
        recommendation:
          "Specify the stainless steel frame and guide configuration. Painted steel does not survive a washdown regime.",
      },
      {
        condition: "The opening is taller than 5,000 mm",
        recommendation:
          "Look at the fold-up door, which is published to a greater maximum height.",
      },
    ],
    faq: [
      {
        question: "Where is a high speed roll-up door suitable?",
        answer:
          "Internal and sheltered openings crossed continuously through the shift — warehouses, factories, logistics facilities, workshops, production areas and material movement routes. It is the general-purpose rapid door, and the one to start from unless something about the opening rules it out.",
      },
      {
        question: "What opening sizes are possible?",
        answer:
          "Up to 5,000 mm wide and up to 5,000 mm high. Both figures depend on the configuration and are confirmed for your opening rather than promised from a table — a door at the top of the width range and one at the top of the height range are not the same door.",
      },
      {
        question: "How fast does it open and close?",
        answer:
          "Opening speed is 0.8–2.5 m/s and closing speed is 0.5–0.8 m/s, both subject to configuration. Closing is deliberately the slower of the two on any high speed door, because a descending curtain is the movement that has to be safe.",
      },
      {
        question: "Which activation systems are available?",
        answer:
          "Radar, push button, photocell and loop detector. Which one suits depends on the traffic: radar for mixed vehicle and pedestrian flow, a loop where only vehicles should open the door, a push button where opening should be a deliberate act.",
      },
      {
        question: "What safety systems are included?",
        answer:
          "A photocell and a safety edge as standard, so the curtain will not close on an obstruction and reverses on contact. Manual crank or override operation is part of the specification, not an accessory.",
      },
      {
        question: "Can it be integrated with our existing automation?",
        answer:
          "Yes. The control is PLC-based with an inverter and encoder, and takes a release signal from an access control system, a loop or a plant signal. It does not care which credential technology sits in front of it.",
      },
      {
        question: "How much headroom does it need?",
        answer:
          "Enough for the drum and its cover above the lintel, plus the guides at each jamb. It is configuration dependent, so it is measured at survey rather than quoted from a table — and it is the dimension that rules out more high speed doors than opening width does.",
      },
      quotationFaq,
    ],
    ordering: hsdOrdering,
    related: [
      "high-speed-fold-up-door",
      "high-speed-self-repairing-door",
      "high-speed-cold-storage-freezer-door",
    ],
    documents: [brochure("High Speed Roll-Up Door"), drawing],
    imageId: "hsd-roll-up-hero",
    galleryIds: [
      "hsd-roll-up-front",
      "hsd-roll-up-angle",
      "hsd-roll-up-operational",
      "hsd-roll-up-detail",
      "hsd-roll-up-application",
      "p-hsd-roll-up",
    ],
    legacyUrls: ["high-speed-door.html", "high-speed-roll-up-door.html"],
  },

  /* ============================================================== 2 */
  {
    id: "high-speed-fold-up-door",
    familyId: "high-speed-doors",
    categoryId: "fold-up-high-speed-doors",
    name: "High Speed Fold-Up Door",
    status: "CONFIRMED",
    tagline:
      "A rapid vertical-folding industrial door for larger openings and high-frequency vehicle and material movement.",
    summary:
      "Reinforced PVC-coated curtain folding into a stack above the opening, up to 5,000 × 8,000 mm, at 0.8–2.5 m/s in both directions.",
    overview: [
      "A fold-up door gathers its curtain into horizontal folds as it opens rather than winding it onto a drum. That single difference is why the type exists: a folded stack sits shallower above the opening than a roll of the same span, and it lets a fabric door reach heights a drum would struggle with. Published maximum height is 8,000 mm, against 5,000 mm for the roll-up configuration.",
      "The curtain is a reinforced PVC-coated fabric, and the reinforcement is what makes a fabric leaf viable at that size. It is also why this is the configuration to look at on an exposed elevation: wind resistance is published as an EN 12424 Class 2 or Class 3 configuration, selected against what the elevation actually sees.",
      "Speed is not traded away for size. Opening and closing are both published at 0.8–2.5 m/s, so a tall vehicle opening still clears in seconds. Motor rating is selected from 0.75, 1.1 or 1.5 kW against the leaf and the duty the opening imposes, rather than fixed and hoped for.",
    ],
    quickFacts: [
      { label: "Maximum size", value: "5,000 × 8,000 mm", qualified: true },
      { label: "Travel speed", value: "0.8–2.5 m/s both ways", qualified: true },
      { label: "Wind resistance", value: "EN 12424 Class 2 / Class 3", qualified: true },
      { label: "Motor", value: "0.75 / 1.1 / 1.5 kW", qualified: true },
    ],
    benefits: [
      {
        title: "Height a rolled curtain will not reach",
        body: "Published to 8,000 mm high against 5,000 mm for the roll-up configuration, which is usually the reason this type is on the drawing at all.",
      },
      {
        title: "Shallow stack above the opening",
        body: "The curtain folds rather than rolls, so it needs less depth behind the lintel than a drum of the same span.",
      },
      {
        title: "Speed both ways",
        body: "0.8–2.5 m/s opening and closing, so a tall vehicle opening is not slow simply because it is large.",
      },
      {
        title: "Motor matched to the duty",
        body: "0.75, 1.1 or 1.5 kW configurations, selected against leaf size and cycle count rather than fixed and hoped for.",
      },
    ],
    variants: [
      {
        id: "internal",
        name: "Internal mounting",
        note: "For large internal openings between halls and bays, where the curtain is working against dust, noise and traffic separation rather than weather.",
        status: "CONFIRMED",
      },
      {
        id: "external",
        name: "External mounting",
        note: "For openings in an external elevation, with the wind resistance configuration selected against the exposure.",
        status: "CONFIRMED",
      },
      {
        id: "class-3-wind",
        name: "Class 3 wind configuration",
        note: "The higher of the two published wind resistance configurations, for elevations where a Class 2 assembly is not enough.",
        status: "CONFIRMED",
      },
    ],
    applications: [
      "Large logistics openings",
      "Warehouses",
      "Manufacturing facilities",
      "Loading areas",
      "Industrial buildings",
      "High-frequency traffic areas",
    ],
    industries: ["warehousing-logistics", "manufacturing", "automotive"],
    environments: ["internal", "external"],
    operatingMethod: [
      "The reinforced PVC-coated curtain is carried on straps that gather it into horizontal folds as the door opens.",
      "An industrial geared motor under PLC, inverter and encoder control drives the curtain at an adjustable speed in both directions.",
      "Radar, a push button or an infrared device opens the door on approach.",
      "Photoelectric protection and a safety edge prevent the curtain closing on an obstruction.",
      "A manual crank allows the door to be opened by hand during a power failure.",
    ],
    construction: [
      "Reinforced PVC-coated fabric curtain, 0.8–1.2 mm",
      "Frame in galvanized steel, aluminium or stainless steel",
      "Heavy-duty galvanized steel track and cover",
      "Transparent PVC vision windows",
    ],
    safety: [
      "Photoelectric protection across the opening",
      "Safety edge on the leading edge, reversing travel on contact",
      "Manual crank for emergency opening during a power failure",
    ],
    controls: [
      "PLC control with inverter and encoder",
      "Activation by radar, push button or infrared",
      "Motor selected from 0.75, 1.1 or 1.5 kW configurations",
      "Adjustable open and close speeds within the published range",
    ],
    options: [
      "Transparent PVC vision windows",
      "Internal or external mounting",
      "Frame in galvanized steel, aluminium or stainless steel",
      "Class 2 or Class 3 wind resistance configuration",
    ],
    maintenance: [
      "Fold straps, curtain and track inspected on a scheduled interval — the straps carry the leaf and are what to watch on a folding door",
      "Photoelectric protection and safety edge function-tested at every service visit",
      "Structural fixings on an external elevation checked periodically, because a large curtain transfers wind load into the building",
    ],
    selectionGuide: [
      ...cycleFirstSelection,
      {
        condition: "The opening is taller than 5,000 mm",
        recommendation:
          "This is the fabric configuration published to 8,000 mm. Above the roll-up range it is normally the answer.",
      },
      {
        condition: "The lintel detail cannot take the depth of a drum",
        recommendation:
          "A folded stack is shallower than a roll of the same span, which is often what decides between the two types.",
      },
      {
        condition: "The elevation is exposed and wind loaded",
        recommendation:
          "Specify the Class 3 wind configuration rather than Class 2. The exposure decides this, not the opening size.",
      },
      {
        condition: "The opening also has to hold a temperature difference",
        recommendation:
          "A reinforced fabric curtain is not a thermal barrier. Look at the rigid insulated or spiral configurations instead.",
      },
    ],
    faq: [
      {
        question: "When is a fold-up door the right choice over a roll-up?",
        answer:
          "Two situations. When the opening is taller than the roll-up range, since this configuration is published to 8,000 mm against 5,000 mm. And when the lintel detail cannot accommodate a drum, because a folded stack is shallower for the same span.",
      },
      {
        question: "What opening sizes are possible?",
        answer:
          "Up to 5,000 mm wide and up to 8,000 mm high, both subject to configuration. A door at the top of the height range is engineered for that height rather than simply built taller.",
      },
      {
        question: "How fast does it operate?",
        answer:
          "0.8–2.5 m/s opening and closing, subject to configuration. Unlike most rapid door types it is published at the same range in both directions.",
      },
      {
        question: "Does it work on an exposed external elevation?",
        answer:
          "Yes. Wind resistance is published as an EN 12424 Class 2 or Class 3 configuration, chosen against the exposure of the elevation. EN 12424 is the test method that defines those classes; naming it describes what the field means rather than claiming a certificate.",
      },
      {
        question: "Which motor rating will our opening need?",
        answer:
          "One of 0.75, 1.1 or 1.5 kW. It is selected against the leaf size and the duty the opening imposes, which is why we ask for cycle count before quoting rather than after.",
      },
      {
        question: "What safety systems are fitted?",
        answer:
          "Photoelectric protection and a safety edge, with a manual crank for emergency opening. Activation is by radar, push button or infrared.",
      },
      quotationFaq,
    ],
    ordering: hsdOrdering,
    related: [
      "high-speed-roll-up-door",
      "high-speed-rigid-insulated-door",
      "high-speed-self-repairing-door",
    ],
    documents: [brochure("High Speed Fold-Up Door"), drawing],
    imageId: "hsd-fold-up-hero",
    galleryIds: ["hsd-fold-up-front", "p-hsd-fold-up"],
    legacyUrls: ["high-speed-fold-up-doors.html"],
  },

  /* ============================================================== 3 */
  {
    id: "high-speed-self-repairing-door",
    familyId: "high-speed-doors",
    categoryId: "roll-up-high-speed-doors",
    name: "High Speed Self-Repairing Door",
    status: "CONFIRMED",
    tagline:
      "A high speed door for heavy forklift traffic, with automatic curtain recovery after accidental impact.",
    summary:
      "Flexible reinforced PVC curtain that leaves its guides on impact and re-enters them automatically, for openings where forklift contact is routine.",
    overview: [
      "In an opening with continuous forklift traffic the door will be hit. On a conventional rapid door that means a torn curtain, a distorted guide and an aperture out of service until an engineer attends. The self-repairing configuration is designed around that certainty rather than against it: the curtain is retained in flexible guides by a system that releases under impact instead of tearing.",
      "Recovery is automatic. After a strike the curtain re-enters the guide system on its own — automatic, self-resetting, with no tools and no call-out. The value of this door is measured in the downtime and the emergency attendances that never happen, which is a different calculation from the one that justifies a rapid door in the first place.",
      "None of that is bought at the cost of speed. Opening is published at up to 2.0–2.5 m/s under an inverter-based controller, so the door still does the job a high speed door is specified for. Maximum width and height are engineered to the opening rather than published as a fixed ceiling.",
    ],
    quickFacts: [
      { label: "Impact recovery", value: "Automatic / self-resetting" },
      { label: "Opening speed", value: "Up to 2.0–2.5 m/s", qualified: true },
      { label: "Guides", value: "Flexible self-repairing" },
      { label: "Size", value: "Engineered to the opening", qualified: true },
    ],
    benefits: [
      {
        title: "Impact does not stop the opening",
        body: "The curtain releases from the flexible guide system instead of tearing, and re-enters it automatically. The aperture stays in service.",
      },
      {
        title: "Fewer emergency call-outs",
        body: "Routine forklift contact stops generating an emergency attendance and a curtain replacement, which is where the cost of a busy opening usually hides.",
      },
      {
        title: "Speed is not traded away",
        body: "Published at up to 2.0–2.5 m/s opening, so impact tolerance is added without giving up the cycle time that justified a high speed door.",
      },
      {
        title: "Engineered to the opening",
        body: "Width and height are worked to the aperture rather than forced into a standard size, which suits the constrained routes where impact happens most.",
      },
    ],
    variants: [
      {
        id: "class-2",
        name: "Class 2 wind configuration",
        note: "The lower of the two published wind resistance configurations, for internal openings and sheltered elevations.",
        status: "CONFIRMED",
      },
      {
        id: "class-3",
        name: "Class 3 wind configuration",
        note: "For openings that are both impact-exposed and wind-exposed, where a Class 2 assembly is not enough for the elevation.",
        status: "CONFIRMED",
      },
    ],
    applications: [
      "Forklift traffic",
      "Warehouses",
      "Factories",
      "Logistics facilities",
      "Production areas",
      "Material handling areas",
    ],
    industries: ["warehousing-logistics", "manufacturing", "automotive", "cold-chain-food"],
    environments: ["internal", "external"],
    operatingMethod: [
      "The flexible reinforced PVC curtain is held in flexible self-repairing guides rather than a fixed retention profile.",
      "On impact the curtain leaves the guide instead of tearing, and the drive stops.",
      "The curtain re-enters the guide system automatically — the recovery is self-resetting and needs no tools.",
      "An inverter-based controller drives the curtain, with activation by radar, loop, pull switch or remote.",
      "Photocells and a bottom safety edge govern closing; a manual override operates the door during a power failure.",
    ],
    construction: [
      "Flexible reinforced PVC curtain",
      "Flexible self-repairing guide system with automatic curtain re-entry",
      "High-cycle geared motor under inverter control",
      "Optional vision panel",
    ],
    safety: [
      "Photocells prevent the curtain closing on an obstruction",
      "Bottom safety edge reverses travel on contact",
      "Manual override for operation during a power failure",
      "Impact releases the curtain rather than resisting it, so a strike does not load the guides or the vehicle",
    ],
    controls: [
      "Inverter-based controller",
      "Activation by radar, loop detector, pull switch or remote",
      "Adjustable open and close speeds within the published range",
    ],
    options: ["Optional vision panel", "Class 2 or Class 3 wind resistance configuration"],
    maintenance: [
      "Guide system and curtain retention inspected on a scheduled interval — the releasing mechanism is what the door is bought for, so it is what gets checked",
      "Recovery cycle function-tested at every service visit, not just the photocells",
      "A curtain that has released repeatedly in the same place is telling you about the traffic route, and is worth reporting rather than simply re-seating",
    ],
    selectionGuide: [
      ...cycleFirstSelection,
      {
        condition: "Forklifts pass close to the guides on a constrained route",
        recommendation:
          "This is the configuration. Impact is a matter of when rather than if, and a releasing curtain keeps the opening in service.",
      },
      {
        condition: "The opening has already cost you curtain replacements",
        recommendation:
          "Count the call-outs rather than the cycles. On an aperture that is struck routinely, the recovery mechanism pays for itself in attendances avoided.",
      },
      {
        condition: "The opening is impact-exposed and also wind-exposed",
        recommendation:
          "Specify the Class 3 wind configuration. The two requirements are independent and both have to be met.",
      },
      {
        condition: "Impact is unlikely and the route is wide",
        recommendation:
          "A standard roll-up door is the more economical choice. Pay for impact recovery where impact actually happens.",
      },
    ],
    faq: [
      {
        question: "What does self-repairing actually mean?",
        answer:
          "The curtain is held in flexible guides by a system that releases under impact rather than tearing. After a strike the curtain re-enters the guide system automatically — the recovery is self-resetting, with no tools and no engineer visit.",
      },
      {
        question: "Where is this door suitable?",
        answer:
          "Openings with heavy forklift and material handling traffic: warehouses, factories, logistics facilities and production areas, particularly on constrained routes where the guides sit close to the traffic line.",
      },
      {
        question: "What opening sizes are possible?",
        answer:
          "Maximum width and height are application dependent and engineered to the opening rather than published as a fixed ceiling. Send us the aperture dimensions and we will confirm what is achievable for it.",
      },
      {
        question: "How fast does it operate?",
        answer:
          "Up to 2.0–2.5 m/s opening and approximately 0.5–0.8 m/s closing, both subject to configuration. Impact tolerance does not cost you the cycle time.",
      },
      {
        question: "Which activation systems are available?",
        answer:
          "Radar, loop detector, pull switch or remote. On a forklift route a loop or a pull switch is often preferred, because it opens the door for vehicles without responding to every pedestrian crossing the area.",
      },
      {
        question: "What safety systems are included?",
        answer:
          "Photocells and a bottom safety edge, with manual override operation. The releasing curtain is itself a safety characteristic: a strike is absorbed rather than resisted.",
      },
      {
        question: "Will it still hold a wind load?",
        answer:
          "It is published as a Class 2 to Class 3 configuration, subject to the specification for the opening. A door that has to release under impact and also hold a wind load is a genuine engineering trade-off, so we confirm it against the elevation rather than assuming it.",
      },
      quotationFaq,
    ],
    ordering: hsdOrdering,
    related: [
      "high-speed-roll-up-door",
      "high-speed-fold-up-door",
      "high-speed-cold-storage-freezer-door",
    ],
    documents: [brochure("High Speed Self-Repairing Door"), drawing],
    imageId: "p-hsd-self-repairing",
    galleryIds: ["g-hsd-forklift", "g-hsd-warehouse"],
    legacyUrls: ["high-speed-self-repairing-doors.html"],
  },

  /* ============================================================== 4 */
  {
    id: "high-speed-spiral-door",
    familyId: "high-speed-doors",
    categoryId: "spiral-high-speed-doors",
    name: "High Speed Spiral Door",
    status: "CONFIRMED",
    tagline:
      "A high speed rigid industrial door on a spiral-guided system, for demanding internal and external openings.",
    summary:
      "Insulated rigid aluminium panels carried into a spiral track above the opening, up to 5,000–6,000 mm each way, opening at up to 2.5 m/s.",
    overview: [
      "A spiral door answers a specific problem: an opening that needs a rigid, insulated leaf but cannot accept the cycle time that usually comes with one. The panels are guided into a spiral above the opening rather than stacked or wound, so the leaf never rests on itself. Nothing rubs, and the door can run at up to 2.5 m/s — flexible-door speed from a rigid door.",
      "The leaf is insulated rigid aluminium panelling, approximately 40–43 mm thick, with the insulation configuration selected against the thermal requirement. That is what makes it viable on an external factory entrance or a temperature-controlled area, where a fabric curtain would be doing neither job well.",
      "Wind resistance and thermal performance are both configuration dependent and engineered against the conditions the opening actually sees. That is deliberate rather than evasive: a spiral door is specified around its opening, and quoting a single class for every installation would misrepresent how the type is engineered.",
    ],
    quickFacts: [
      { label: "Maximum size", value: "5,000–6,000 mm each way", qualified: true },
      { label: "Opening speed", value: "Up to 2.5 m/s", qualified: true },
      { label: "Panel", value: "Insulated rigid aluminium, approx. 40–43 mm", qualified: true },
      { label: "Guide system", value: "Spiral / high-speed track" },
    ],
    benefits: [
      {
        title: "Rigid leaf at flexible-door speed",
        body: "Up to 2.5 m/s opening from an insulated aluminium leaf, which is the combination the spiral geometry exists to make possible.",
      },
      {
        title: "The panels never touch",
        body: "The leaf is carried into a spiral rather than stacked on itself, so the panel faces and finish are not worn by the door simply operating.",
      },
      {
        title: "Insulated where it matters",
        body: "A PU or thermal insulation configuration in an approximately 40–43 mm rigid panel, for external entrances and temperature-controlled areas.",
      },
      {
        title: "Engineered to the elevation",
        body: "Wind resistance is configured for the conditions the opening actually sees rather than quoted as a single class for every site.",
      },
    ],
    variants: [
      {
        id: "insulated",
        name: "Insulated panel configuration",
        note: "PU or thermal insulation configuration in the panel, selected against the thermal requirement of the opening.",
        status: "CONFIRMED",
      },
      {
        id: "vision",
        name: "Transparent panel configuration",
        note: "Transparent panel sections in the leaf, so a driver sees the far side of the opening before the door has finished travelling.",
        status: "CONFIRMED",
      },
    ],
    applications: [
      "External factory entrances",
      "Warehouses",
      "Logistics facilities",
      "Industrial buildings",
      "High-traffic entrances",
      "Temperature-controlled areas",
    ],
    industries: ["manufacturing", "warehousing-logistics", "cold-chain-food", "automotive"],
    environments: ["internal", "external", "cold"],
    operatingMethod: [
      "Insulated rigid aluminium panels run in a spiral high-speed track above the opening, so the leaf never rests on itself.",
      "A high-cycle industrial motor under frequency control accelerates and decelerates the leaf.",
      "Radar, a photocell, a loop detector or a push button opens the door on approach.",
      "A light curtain, photocells and a safety edge govern closing.",
      "A manual release allows the door to be operated during a power failure.",
    ],
    construction: [
      "Insulated rigid aluminium door leaf, approximately 40–43 mm panel thickness",
      "PU or thermal insulation configuration",
      "Spiral high-speed guide track",
      "Optional transparent panel configuration",
    ],
    safety: [
      "Light curtain across the opening",
      "Photocell across the threshold",
      "Safety edge on the leading panel",
      "Manual release for operation during a power failure",
    ],
    controls: [
      "Frequency-controlled drive",
      "Activation by radar, photocell, loop detector or push button",
      "Adjustable open and close speeds within the published range",
    ],
    options: [
      "Optional transparent panel configuration",
      "Insulation configuration selected against the thermal requirement",
    ],
    maintenance: [
      "Spiral track and panel rollers inspected on a scheduled interval — the track geometry is what keeps the panels apart, so it is the first thing to check",
      "Panel seals inspected where the opening separates temperatures, since sealing is what the insulation is there to support",
      "Light curtain, photocells and safety edge function-tested at every service visit",
    ],
    selectionGuide: [
      ...cycleFirstSelection,
      {
        condition: "The opening needs a rigid leaf but cannot lose the cycle time",
        recommendation:
          "This is what the spiral geometry exists for. Up to 2.5 m/s from an insulated aluminium panel is not available from a conventional rigid door.",
      },
      {
        condition: "Panel finish matters and the door cycles constantly",
        recommendation:
          "The spiral keeps the panels apart in the stored position, so the leaf is not worn by the door simply operating.",
      },
      {
        condition: "The opening serves a temperature-controlled area",
        recommendation:
          "State the differential. Thermal performance is configuration dependent and is engineered to it rather than assumed.",
      },
      {
        condition: "The head detail is shallow",
        recommendation:
          "A spiral track is a deeper head detail than a drum of the same span. If headroom is the binding constraint, look at the fold-up configuration instead.",
      },
    ],
    faq: [
      {
        question: "What is a spiral door and how is it different?",
        answer:
          "The rigid leaf is guided into a spiral above the opening instead of being stacked or wound, so the panels never rest on one another. That is what lets a rigid insulated door run at up to 2.5 m/s without wearing its own panel faces.",
      },
      {
        question: "Where is it suitable?",
        answer:
          "External factory entrances, warehouses, logistics facilities, industrial buildings, high-traffic entrances and temperature-controlled areas — openings that need a rigid, insulated leaf and cannot afford a slow one.",
      },
      {
        question: "What opening sizes are possible?",
        answer:
          "Up to 5,000–6,000 mm wide and up to 5,000–6,000 mm high, subject to configuration. As with any rigid high speed door the achievable size and the achievable speed are related, so both are confirmed together for your opening.",
      },
      {
        question: "What wind loading can it take?",
        answer:
          "Wind resistance is configuration dependent and engineered for the applicable wind conditions. We do not publish a single class, because a spiral door is engineered around its opening and one figure would misrepresent every other installation.",
      },
      {
        question: "How well does it insulate?",
        answer:
          "The leaf is an insulated rigid aluminium panel of approximately 40–43 mm with a PU or thermal insulation configuration. Thermal performance itself is configuration dependent — tell us the differential the opening has to hold and we will confirm the configuration that meets it.",
      },
      {
        question: "What safety systems are fitted?",
        answer:
          "A light curtain, photocells and a safety edge, with a manual release for operation during a power failure. A rigid leaf makes presence detection more important rather than less, which is why the light curtain is part of the specification.",
      },
      {
        question: "Can it integrate with site access control?",
        answer:
          "Yes. The drive is frequency-controlled and takes activation from radar, a photocell, a loop detector or a push button, and a release signal from an access control system on a volt-free contact.",
      },
      quotationFaq,
    ],
    ordering: hsdOrdering,
    related: [
      "high-speed-rigid-insulated-door",
      "high-speed-fold-up-door",
      "high-speed-roll-up-door",
    ],
    documents: [brochure("High Speed Spiral Door"), drawing],
    imageId: "p-hsd-spiral",
    galleryIds: ["g-hsd-production", "g-hsd-warehouse"],
  },

  /* ============================================================== 5 */
  {
    id: "high-speed-rigid-insulated-door",
    familyId: "high-speed-doors",
    categoryId: "rigid-panel-high-speed-doors",
    name: "High Speed Rigid / Insulated Door",
    status: "CONFIRMED",
    tagline:
      "A rigid insulated high speed door for openings that need more structural rigidity and thermal separation than a fabric curtain can give.",
    summary:
      "Double-skin insulated rigid panels up to 5,000 × 7,500 mm, opening at approximately 1.2–1.5 m/s under PLC, inverter and encoder control.",
    overview: [
      "There is a point at which a fabric curtain stops being the right answer. An opening that has to hold a genuine temperature difference, or that sits on an exposed elevation and has to carry the load, needs a leaf with structure in it. This configuration uses double-skin insulated rigid panels in aluminium alloy or engineered metal, 40–43 mm thick, with a PU or thermal insulation core.",
      "The trade is speed. Published opening is approximately 1.2–1.5 m/s and closing approximately 0.6 m/s — quick, but not roll-up quick, because a heavier leaf has to be accelerated and decelerated under control rather than snatched. PLC, inverter and encoder control is what makes that possible without punishing the structure at either end of travel.",
      "Where the spiral configuration guides its leaf into a spiral to keep the panels apart, this door lifts them vertically. It is the more direct arrangement, published to a greater height — 7,500 mm — and it is normally the answer where insulation and height matter more than the very top of the speed range.",
    ],
    quickFacts: [
      { label: "Maximum size", value: "5,000 × 7,500 mm", qualified: true },
      { label: "Opening speed", value: "Approx. 1.2–1.5 m/s", qualified: true },
      { label: "Panel", value: "Double-skin insulated, 40–43 mm", qualified: true },
      { label: "Control", value: "PLC / inverter / encoder" },
    ],
    benefits: [
      {
        title: "A leaf with structure in it",
        body: "Double-skin insulated rigid panels in aluminium alloy or engineered metal, for openings where a fabric curtain is not doing the job.",
      },
      {
        title: "Thermal separation",
        body: "A PU or thermal insulation core in a 40–43 mm panel, so the opening can separate two temperatures rather than merely close.",
      },
      {
        title: "Height without a fabric leaf",
        body: "Published to 7,500 mm high, for tall industrial openings that also need insulation or rigidity.",
      },
      {
        title: "Controlled acceleration",
        body: "PLC, inverter and encoder control ramps a heavier panel up and back down rather than snatching it, which is what makes a rigid leaf viable at speed.",
      },
    ],
    variants: [
      {
        id: "external",
        name: "External configuration",
        note: "Engineered for external applications, where the leaf has to carry the elevation load as well as cycle quickly.",
        status: "CONFIRMED",
      },
      {
        id: "thermal-separation",
        name: "Thermal separation configuration",
        note: "For internal openings between areas held at different temperatures, where a fabric curtain will not hold the differential.",
        status: "CONFIRMED",
      },
    ],
    applications: [
      "External industrial entrances",
      "Warehouses",
      "Loading areas",
      "Manufacturing facilities",
      "Temperature-controlled spaces",
      "High-traffic industrial buildings",
    ],
    industries: ["manufacturing", "warehousing-logistics", "cold-chain-food", "automotive"],
    environments: ["internal", "external", "cold"],
    operatingMethod: [
      "Double-skin insulated rigid panels are carried in side guides and driven vertically.",
      "A PLC with an inverter and encoder ramps the panel up to speed and back down, so a heavier leaf is not snatched at either end of travel.",
      "Radar, an infrared device or a push button opens the door on approach.",
      "A photocell, a safety edge and an emergency stop govern the closing cycle.",
      "Perimeter sealing between the panel and the opening maintains the separation the insulation is there to support.",
    ],
    construction: [
      "Double-skin insulated rigid panels, 40–43 mm thick",
      "Panel material in aluminium alloy or engineered metal panel",
      "PU or thermal insulation core",
      "Optional vision sections",
    ],
    safety: [
      "Photocell across the threshold",
      "Safety edge on the leading panel, reversing travel on contact",
      "Emergency stop",
      "Controlled acceleration and deceleration, so a heavier leaf is not snatched",
    ],
    controls: [
      "PLC control with inverter and encoder",
      "Activation by radar, infrared or push button",
      "Adjustable open and close speeds within the published range",
    ],
    options: ["Optional vision sections in the panel", "External or thermal separation configuration"],
    maintenance: [
      "Panel joints, rollers and guides inspected on a scheduled interval — a rigid leaf shows its wear at the joints rather than in the middle",
      "Perimeter seals treated as a consumable on any temperature-separated opening",
      "Photocell, safety edge and emergency stop function-tested at every service visit",
    ],
    selectionGuide: [
      ...cycleFirstSelection,
      {
        condition: "The opening has to hold a real temperature difference",
        recommendation:
          "A fabric curtain will not. An insulated rigid panel with a PU or thermal core will, at a slower closing cycle.",
      },
      {
        condition: "The opening is tall and on an external elevation",
        recommendation:
          "This configuration is engineered for external applications and published to 7,500 mm, the taller of the two rigid options.",
      },
      {
        condition: "Cycle time is the single most important requirement",
        recommendation:
          "Look at the spiral configuration, published at up to 2.5 m/s, or at a fabric door if insulation is not actually needed.",
      },
      {
        condition: "The room is a freezer or cold store",
        recommendation:
          "The cold storage configuration is the more specific answer — heated guides and a cold-store bottom seal are not the same thing as an insulated panel.",
      },
    ],
    faq: [
      {
        question: "Why choose a rigid insulated door over a fabric one?",
        answer:
          "Two reasons, and both have to be real to justify the cost. Insulation, where the opening separates two temperatures and a curtain will not hold the difference. And rigidity, on a tall external elevation where the leaf has to carry load.",
      },
      {
        question: "Is it slower than a roll-up door?",
        answer:
          "Yes, and deliberately. Published opening is approximately 1.2–1.5 m/s with closing at approximately 0.6 m/s, both subject to configuration. A heavier leaf has to be decelerated under control rather than dropped.",
      },
      {
        question: "What opening sizes are possible?",
        answer:
          "Up to 5,000 mm wide and up to 7,500 mm high, subject to configuration — the tallest published figure in this family after the fold-up door.",
      },
      {
        question: "How is it different from the spiral door?",
        answer:
          "Both use rigid insulated panels. The spiral guides the leaf into a spiral so the panels never touch, and is published faster and to a slightly greater width. This configuration lifts the panels vertically and is published taller, to 7,500 mm. Which one fits usually comes down to the head detail and whether height or speed is the binding requirement.",
      },
      {
        question: "What wind loading can it take?",
        answer:
          "It is engineered for external applications, against the conditions the elevation actually sees. We confirm that per opening rather than publishing one figure for every site.",
      },
      {
        question: "What safety systems are fitted?",
        answer:
          "A photocell, a safety edge and an emergency stop. Activation is by radar, infrared or push button, with the whole cycle managed by a PLC with an inverter and encoder.",
      },
      quotationFaq,
    ],
    ordering: hsdOrdering,
    related: [
      "high-speed-spiral-door",
      "high-speed-fold-up-door",
      "industrial-sectional-overhead-doors",
    ],
    documents: [brochure("High Speed Rigid / Insulated Door"), drawing],
    imageId: "p-hsd-rigid",
    galleryIds: ["g-hsd-production", "g-hsd-wide-opening"],
    legacyUrls: ["high-speed-industrial-door.html"],
  },

  /* ============================================================== 6 */
  {
    id: "high-speed-cleanroom-hygiene-door",
    familyId: "high-speed-doors",
    categoryId: "controlled-environment-high-speed-doors",
    name: "High Speed Cleanroom / Hygiene Door",
    status: "CONFIRMED",
    tagline:
      "A high speed hygienic door for controlled production, pharmaceutical, healthcare and food-processing environments.",
    summary:
      "Sealed rapid-door assembly with a hygienic PVC curtain, stainless steel or hygienic-coated frame and guides, and side and bottom seals.",
    overview: [
      "In a controlled area the door is part of the room, not a fitting in it. This configuration is a sealed rapid-door assembly: a hygienic PVC curtain with a smooth, cleanable surface, running in stainless steel or hygienic-construction guide rails, in a stainless steel or hygienic-coated frame, with side and bottom seals at the perimeter.",
      "Two properties do the work. Sealing, because an opening that merely closes does not maintain a separation between two rooms — the side and bottom seals are what make the closed door mean something. And cleanability, because every surface in a controlled area has to survive the cleaning regime the room owner has set. The assembly is designed for routine cleaning or washdown where that is specified.",
      "We publish no classification against this door, and that is deliberate. A cleanroom class is a property of the room and its air handling, not of any single opening in it. We specify the door to suit the classification your cleanroom designer has set, and we will not quote a class or an approval for a door in isolation.",
    ],
    quickFacts: [
      { label: "Construction", value: "Sealed rapid-door assembly" },
      { label: "Curtain", value: "Hygienic PVC, cleanable surface" },
      { label: "Frame and guides", value: "Stainless steel / hygienic-coated" },
      { label: "Dimensions", value: "Project specific", qualified: true },
    ],
    benefits: [
      {
        title: "Sealed, not merely closed",
        body: "Side and bottom seals at the perimeter, so a closed door actually maintains the separation between two controlled areas.",
      },
      {
        title: "Built for the cleaning regime",
        body: "A smooth, cleanable hygienic PVC curtain with stainless steel or hygienic-coated frame and guides, designed for routine cleaning or washdown where specified.",
      },
      {
        title: "Touchless activation",
        body: "Radar or a touchless sensor opens the door without contact, which matters in a gowned area where every touched surface is a procedure.",
      },
      {
        title: "Specified to your room, not to a claim",
        body: "The door is configured against the classification your cleanroom designer has set. We publish no class or approval for it, because none has been established for the door alone.",
      },
    ],
    variants: [
      {
        id: "stainless",
        name: "Stainless steel construction",
        note: "Stainless steel frame and guide rails, for areas washed down or cleaned with agents that painted and coated finishes do not survive.",
        status: "CONFIRMED",
      },
      {
        id: "hygienic-coated",
        name: "Hygienic-coated construction",
        note: "Hygienic-coated frame and guide construction where the cleaning regime allows it and full stainless is not required.",
        status: "CONFIRMED",
      },
    ],
    applications: [
      "Pharmaceutical manufacturing",
      "Healthcare facilities",
      "Food processing",
      "Food manufacturing",
      "Laboratories",
      "Controlled production areas",
      "Hygiene-sensitive environments",
    ],
    industries: ["pharmaceutical-cleanroom", "healthcare", "cold-chain-food", "manufacturing"],
    environments: ["hygiene", "internal"],
    operatingMethod: [
      "A hygienic PVC curtain with a smooth cleanable surface runs in stainless steel or hygienic-construction guide rails.",
      "Side and bottom seals close the perimeter, so the closed door maintains the separation between the two areas.",
      "Radar, a touchless sensor or a push button opens the door — touchless activation avoids adding a hand contact to a gowned procedure.",
      "Photocells and a safety edge prevent the curtain closing on an obstruction.",
      "The control enclosure is a hygienic, suitably IP-rated configuration, so the controls survive the same cleaning regime as the door.",
    ],
    construction: [
      "Sealed rapid-door assembly",
      "Hygienic PVC curtain with a smooth cleanable surface",
      "Frame in stainless steel or hygienic-coated construction",
      "Guide rails in stainless steel or hygienic construction",
      "Side and bottom seals",
    ],
    safety: [
      "Photocells prevent the curtain closing on an obstruction",
      "Safety edge reverses travel on contact",
      "Behaviour on fire alarm agreed against the building escape strategy before installation",
    ],
    controls: [
      "Hygienic, suitably IP-rated control enclosure",
      "Activation by radar, touchless sensor or push button",
      "Interlock pairing where the opening forms one side of an airlock",
    ],
    options: [
      "Optional vision panel",
      "Designed for routine cleaning and washdown where specified",
      "Stainless steel or hygienic-coated construction",
    ],
    maintenance: [
      "Side and bottom seals inspected on a scheduled interval — sealing is what this door is bought for, so it is what gets checked first",
      "Cleaning regime agreed with the room owner and followed, since it is the room and not the door that sets it",
      "Photocells and safety edge function-tested at every service visit, and the control enclosure checked for ingress after any change to the cleaning method",
    ],
    selectionGuide: [
      {
        condition: "The opening sits between two classified or controlled areas",
        recommendation:
          "Sealing is the requirement, not speed. Confirm the classification your cleanroom designer has set and we configure the door to suit it.",
      },
      {
        condition: "The area is hosed, foamed or chemically cleaned",
        recommendation:
          "Specify stainless steel construction. Hygienic-coated construction suits a lighter regime; the cleaning method decides, not the room label.",
      },
      {
        condition: "The opening is a gowning room or material airlock",
        recommendation:
          "An interlocked pair, so both doors are never open at once. Both openings are set out together so the interlock is commissioned as one system.",
      },
      {
        condition: "The room is also below zero",
        recommendation:
          "The cold storage configuration is the more specific answer. Hygiene and sub-zero operation are different problems and are solved by different doors.",
      },
      {
        condition: "The opening is in a food area but not classified",
        recommendation:
          "The stainless steel configuration of the standard roll-up door may be sufficient and more economical. The washdown regime is what decides.",
      },
    ],
    faq: [
      {
        question: "Where is a high speed hygiene door suitable?",
        answer:
          "Pharmaceutical manufacturing, healthcare facilities, food processing and manufacturing, laboratories, controlled production areas and other hygiene-sensitive environments — openings where the door has to maintain a separation rather than simply close.",
      },
      {
        question: "What cleanroom classification can you achieve?",
        answer:
          "Classification is a property of the room and its air handling, not of the door alone, and none has been established for this door in isolation. We specify the door to suit the classification your cleanroom designer has set. We publish no class and no approval of any kind for the door on its own — if you need one, it has to be established for the assembly as installed, and we will tell you so rather than let a specification pass on an assumption.",
      },
      {
        question: "What makes it hygienic rather than just a rapid door?",
        answer:
          "A hygienic PVC curtain with a smooth cleanable surface, stainless steel or hygienic-coated frame and guide construction, side and bottom seals, and a hygienic, suitably IP-rated control enclosure. It is designed for routine cleaning and washdown where that is specified.",
      },
      {
        question: "What opening sizes are possible?",
        answer:
          "Maximum dimensions are project specific for this configuration. Send us the opening and the room requirement and we will confirm what is achievable rather than quoting a figure that may not apply to your installation.",
      },
      {
        question: "How fast does it operate?",
        answer:
          "Opening and closing speeds are application dependent for this configuration. In a controlled area the speed is set by the pressure regime and the traffic, not by how fast the mechanism can be driven.",
      },
      {
        question: "Which activation systems are available?",
        answer:
          "Radar, touchless sensor or push button. Touchless activation is usually preferred in a gowned area, because every touched surface is a procedure.",
      },
      {
        question: "Can two doors be interlocked as an airlock?",
        answer:
          "Yes. A pair can be electrically interlocked so both are never open together. The override behaviour on fire alarm is agreed against the building escape strategy before commissioning rather than after.",
      },
      quotationFaq,
    ],
    ordering: hsdOrdering,
    related: [
      "high-speed-cold-storage-freezer-door",
      "hermetic-cleanroom-doors",
      "high-speed-roll-up-door",
    ],
    documents: [brochure("High Speed Cleanroom / Hygiene Door"), drawing],
    imageId: "p-hsd-cleanroom",
    galleryIds: ["g-hsd-cleanroom", "g-hsd-food"],
  },

  /* ============================================================== 7 */
  {
    id: "high-speed-cold-storage-freezer-door",
    familyId: "high-speed-doors",
    categoryId: "controlled-environment-high-speed-doors",
    name: "High Speed Cold Storage / Freezer Door",
    status: "CONFIRMED",
    tagline:
      "A high speed door for temperature-controlled logistics, cold rooms, freezer environments and food-processing facilities.",
    summary:
      "Insulated flexible PVC or specialist cold-temperature curtain with heated or temperature-resistant guides and a cold-storage bottom seal, under frequency control.",
    overview: [
      "A cold store opening is not a warehouse opening that happens to be cold. Every cycle exchanges air across a large temperature difference, and the consequences arrive at the door before they arrive anywhere else: ice in the guides, condensation on the surfaces, frost at the threshold. A door specified for ambient conditions fails in a freezer room quickly, and in ways that are expensive to unpick.",
      "This configuration is built for that. The curtain is an insulated flexible PVC or specialist cold-temperature material. The guides are a heated or temperature-resistant configuration where the room requires it. The bottom seal is a cold-storage sealing system rather than a general-purpose one, because the threshold is where a cold room leaks. Anti-condensation and heater systems are available depending on the environment.",
      "Operating temperature, speeds and dimensions are all project-specific here, and that is the honest position rather than a hedge. A chilled room at a few degrees above zero and a blast freezer are different engineering problems, and the same figures would not describe both. Tell us the room temperature and the traffic and we will configure against it.",
    ],
    quickFacts: [
      { label: "Curtain", value: "Insulated flexible PVC / cold-temperature" },
      { label: "Guides", value: "Heated / temperature-resistant", qualified: true },
      { label: "Operating temperature", value: "Project-specific", qualified: true },
      { label: "Control", value: "Frequency-controlled" },
    ],
    benefits: [
      {
        title: "Built for the temperature, not adapted to it",
        body: "An insulated flexible PVC or specialist cold-temperature curtain, rather than a standard curtain asked to survive a freezer room.",
      },
      {
        title: "Guides that do not ice up",
        body: "A heated or temperature-resistant guide configuration where the room requires it — this is the failure mode that takes cold store doors out of service.",
      },
      {
        title: "Sealed at the threshold",
        body: "A cold-storage sealing system at the bottom of the opening, which is where a cold room actually leaks.",
      },
      {
        title: "Condensation managed as part of the design",
        body: "Anti-condensation and heater systems available depending on the environment, rather than added after the first season.",
      },
    ],
    variants: [
      {
        id: "heated-guides",
        name: "Heated guide configuration",
        note: "Guide heating for rooms cold enough that ice formation in the guides would otherwise take the door out of service.",
        status: "CONFIRMED",
      },
      {
        id: "temperature-resistant",
        name: "Temperature-resistant guide configuration",
        note: "For chilled rooms where the temperature is low enough to need a specified guide material but not low enough to require heating.",
        status: "CONFIRMED",
      },
    ],
    applications: [
      "Cold rooms",
      "Frozen storage",
      "Cold-chain logistics",
      "Food processing",
      "Temperature-controlled warehouses",
      "Refrigerated production areas",
    ],
    industries: ["cold-chain-food", "warehousing-logistics", "manufacturing", "pharmaceutical-cleanroom"],
    environments: ["cold", "internal"],
    operatingMethod: [
      "An insulated flexible PVC or specialist cold-temperature curtain closes the opening between the temperature-controlled room and the area outside it.",
      "The guides are a heated or temperature-resistant configuration where the room requires it, so ice formation does not take the door out of service.",
      "A cold-storage sealing system closes the threshold, which is where a cold room leaks.",
      "A frequency-controlled drive handles the cycle, with activation by radar, pull switch, loop detector or remote.",
      "Photocells and a safety edge prevent the curtain closing on an obstruction.",
    ],
    construction: [
      "Insulated flexible PVC or specialist cold-temperature curtain",
      "Heated or temperature-resistant guide configuration where required",
      "Cold-storage bottom sealing system",
      "Optional anti-condensation and heater systems",
    ],
    safety: [
      "Photocells prevent the curtain closing on an obstruction",
      "Safety edge reverses travel on contact",
      "Manual override for operation during a power failure",
    ],
    controls: [
      "Frequency-controlled drive",
      "Activation by radar, pull switch, loop detector or remote",
      "Interlock pairing where the opening forms one side of an airlock",
    ],
    options: [
      "Anti-condensation, optional depending on environment",
      "Heater system, optional and application dependent",
      "Heated or temperature-resistant guide configuration",
    ],
    maintenance: [
      "Bottom seal and guides inspected on a scheduled interval — ice and seal wear at the threshold are the two failures that actually happen on a cold store door",
      "Guide heating and any anti-condensation system function-tested before the season that needs them, not during it",
      "Photocells and safety edge function-tested at every service visit, and the control enclosure checked for condensation",
    ],
    selectionGuide: [
      {
        condition: "The room is a freezer or a blast-frozen store",
        recommendation:
          "Specify the heated guide configuration. Ice formation in the guides, not curtain wear, is what takes these doors out of service.",
      },
      {
        condition: "The room is chilled rather than frozen",
        recommendation:
          "A temperature-resistant guide configuration is usually sufficient. Give us the room temperature and we will confirm which side of that line you are on.",
      },
      {
        condition: "Condensation has been a problem on the existing opening",
        recommendation:
          "Anti-condensation and heater systems are available depending on the environment. Describe where the condensation forms — it points at the cause.",
      },
      {
        condition: "The opening is also a hygiene boundary",
        recommendation:
          "Look at the cleanroom and hygiene configuration alongside this one. Cold and clean are different requirements and it is worth being explicit about which one governs.",
      },
      {
        condition: "The opening is on the warm side of the cold chain",
        recommendation:
          "A standard roll-up door may be sufficient at the dock end. The temperature the door itself has to work at is what decides, not the goods passing through it.",
      },
    ],
    faq: [
      {
        question: "Where is a high speed cold storage door suitable?",
        answer:
          "Cold rooms, frozen storage, cold-chain logistics, food processing, temperature-controlled warehouses and refrigerated production areas — openings where the door itself has to work at the room temperature.",
      },
      {
        question: "What temperature can it work at?",
        answer:
          "Operating temperature is project-specific. A chilled room and a blast freezer are different engineering problems and one figure would not describe both, so we configure the curtain, guides and sealing against the actual room temperature.",
      },
      {
        question: "Why do the guides need heating?",
        answer:
          "Because ice formation in the guides, not curtain wear, is what usually takes a cold store door out of service. A heated or temperature-resistant guide configuration is supplied where the room requires it.",
      },
      {
        question: "What opening sizes are possible?",
        answer:
          "Maximum dimensions are project-specific for this configuration. Send us the opening dimensions along with the room temperature and we will confirm what is achievable.",
      },
      {
        question: "How fast does it operate?",
        answer:
          "Opening and closing speeds are application dependent. On a cold store opening the useful speed is the one that minimises air exchange for the traffic you actually have, which is a different calculation from a warehouse throughway.",
      },
      {
        question: "How is condensation handled?",
        answer:
          "Anti-condensation is optional depending on the environment, and a heater system is optional and application dependent. Both are specified against the room and the ambient conditions outside it rather than fitted as standard.",
      },
      {
        question: "Can it be interlocked with a second door?",
        answer:
          "Yes, where the opening forms one side of an airlock, so both doors are never open together and the air exchange happens once rather than twice.",
      },
      quotationFaq,
    ],
    ordering: hsdOrdering,
    related: [
      "high-speed-cleanroom-hygiene-door",
      "high-speed-rigid-insulated-door",
      "insulated-double-wall-rolling-shutters",
    ],
    documents: [brochure("High Speed Cold Storage / Freezer Door"), drawing],
    imageId: "p-hsd-cold-store",
    galleryIds: ["g-hsd-cold-chain", "g-hsd-food"],
  },
];

/**
 * Size statements, published per line. The published maximums appear in the
 * specification table; this is the plain-language answer to "how big can it
 * be", and it deliberately says what the limit depends on rather than implying
 * one number covers every opening.
 */
export const highSpeedSizeStatements: Record<string, string> = {
  "high-speed-roll-up-door": "Up to 5,000 × 5,000 mm, subject to configuration.",
  "high-speed-fold-up-door": "Up to 5,000 × 8,000 mm, subject to configuration.",
  "high-speed-self-repairing-door": "Engineered to the opening; width and height are application dependent.",
  "high-speed-spiral-door": "Up to 5,000–6,000 mm each way, subject to configuration.",
  "high-speed-rigid-insulated-door": "Up to 5,000 × 7,500 mm, subject to configuration.",
  "high-speed-cleanroom-hygiene-door": "Project specific; maximum dimensions confirmed with the room requirement.",
  "high-speed-cold-storage-freezer-door": "Project-specific; confirmed with the room temperature and the opening.",
};
