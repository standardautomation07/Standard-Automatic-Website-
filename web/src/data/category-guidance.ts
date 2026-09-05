import type { Faq, Integration, SelectionRule } from "@/lib/types";

/**
 * Integration, installation, selection guidance and FAQ, held at category
 * level because all four are properties of how a product type works rather
 * than of an individual model. A product may override any of them.
 *
 * Rules for this file:
 *
 *  - Integration entries describe couplings that are technically true for the
 *    product type. Nothing claims a specific brand, protocol or certification.
 *  - Selection rules state what the decision turns on, not what to buy.
 *  - FAQ entries are questions buyers and specifiers actually ask — headroom,
 *    duty cycle, power failure, fire rating, lead time. None is invented to
 *    pad a page, and none answers with a figure the site cannot support.
 */

interface Guidance {
  integration: Integration[];
  installation: string[];
  /** Optional: a family whose products each carry their own selection logic
   *  and question set supplies them on the product instead. High Speed Doors
   *  works that way — seven products that are chosen against each other need
   *  seven distinct answers, not one shared set. */
  selectionGuide?: SelectionRule[];
  faq?: Faq[];
}

// ------------------------------------------------------------ shared blocks

const poweredOpeningIntegration: Integration[] = [
  {
    system: "Access control",
    detail:
      "A dry contact from a card reader, keypad, biometric or visitor system triggers the operator. The opening does not care which credential technology is used — it responds to the release signal.",
  },
  {
    system: "Vehicle detection",
    detail:
      "Ground loops or radar hold the opening while a vehicle is in the threshold and confirm it has cleared before closing, rather than closing on a timer.",
  },
  {
    system: "Traffic signalling",
    detail:
      "Volt-free outputs drive red/green lights either side of the opening so drivers are told when to approach.",
  },
  {
    system: "Building management",
    detail:
      "Open, closed and fault states can be reported to a BMS or SCADA point where the panel provides the outputs.",
  },
  {
    system: "Fire alarm",
    detail:
      "Where the opening sits on a compartment line or an escape route, its behaviour on alarm is wired to the alarm panel and agreed with the building's fire strategy before installation.",
  },
];

const pedestrianIntegration: Integration[] = [
  {
    system: "Access control",
    detail:
      "Reader, intercom or visitor system releases the door. Mode selection can be driven remotely from reception where the controller provides the input.",
  },
  {
    system: "Fire alarm and escape strategy",
    detail:
      "On alarm the door adopts the behaviour agreed for that opening — released for manual push, driven open, or break-out — set against the building's escape route requirement.",
  },
  {
    system: "Building management",
    detail:
      "Fault and mode status can be reported where the operator's controller exposes the outputs.",
  },
];

const doorInstallation = (specifics: string[]): string[] => [
  "A site survey confirms clear width and height, headroom, side room, floor level across the opening and the available supply before anything is manufactured.",
  ...specifics,
  "Structural fixings are agreed against the substrate — masonry, concrete, steel portal or cladding rail all behave differently under the loads an opening imposes.",
  "A single-phase or three-phase supply and an isolator are required local to the opening, provided by the electrical contractor.",
  "Commissioning sets travel limits, tests every safety device, and hands over normal operation plus the manual release to the people who will use it.",
];

// ------------------------------------------------------------------ per category

export const categoryGuidance: Record<string, Guidance> = {
  // High Speed Doors carry their own selection guidance and FAQ on each
  // product: the seven doors in this family are chosen against one another,
  // so a shared answer would be the wrong answer six times out of seven.
  // Integration and installation genuinely are properties of the mechanism,
  // so they stay here.

  "roll-up-high-speed-doors": {
    integration: poweredOpeningIntegration,
    installation: doorInstallation([
      "The drum and side guides need clear headroom above the lintel and clear side room at both jambs; these two dimensions rule out more high speed doors than opening width does.",
      "Where the door pairs with a second opening as an airlock, both are set out together so the interlock can be commissioned as one system.",
    ]),
  },

  "fold-up-high-speed-doors": {
    integration: poweredOpeningIntegration,
    installation: doorInstallation([
      "A folding curtain stacks in less depth above the opening than a rolled one, which is usually why it is chosen — but the stack still has to be accommodated and is confirmed at survey.",
      "Tall and wide openings need the structural fixing checked against wind load before the frame is set out, because the curtain transfers that load into the building.",
    ]),
  },

  "spiral-high-speed-doors": {
    integration: poweredOpeningIntegration,
    installation: doorInstallation([
      "The spiral track sits above the opening and needs both headroom and clear space behind the lintel; it is a deeper head detail than a drum of the same span.",
      "A rigid leaf is heavier than a fabric curtain, so lintel capacity and the structural fixing are confirmed before manufacture rather than on the day.",
    ]),
  },

  "rigid-panel-high-speed-doors": {
    integration: poweredOpeningIntegration,
    installation: doorInstallation([
      "A rigid panel assembly is heavier than a fabric curtain, so the structural fixing and lintel capacity are checked before manufacture.",
      "Where the door separates temperatures, the perimeter seal detail is set out with the building fabric rather than fitted afterwards.",
    ]),
  },

  "controlled-environment-high-speed-doors": {
    integration: [
      ...poweredOpeningIntegration,
      {
        system: "Room and airlock interlocking",
        detail:
          "Where the opening is one side of an airlock, the pair is electrically interlocked so both are never open together. The override behaviour on alarm is agreed against the building fire strategy before commissioning.",
      },
      {
        system: "Refrigeration and environmental control",
        detail:
          "Open, closed and fault states can be reported to the plant or BMS point that owns the room, so a door left open is visible where the temperature is being watched.",
      },
    ],
    installation: doorInstallation([
      "The room owner sets the cleaning or washdown regime before the door is specified, because it decides the frame, guide and control enclosure construction rather than the other way round.",
      "On a cold or freezer opening, the floor condition and any threshold heating are agreed with the refrigeration contractor; frost heave and condensation at the threshold are building problems that arrive at the door.",
      "Where the opening forms one side of an airlock, both doors are set out together so the interlock is commissioned as one system.",
    ]),
  },

  "sectional-overhead-doors": {
    integration: poweredOpeningIntegration,
    installation: doorInstallation([
      "Headroom above the opening decides the track and lift configuration before anything else — standard, high, vertical or low headroom.",
      "The horizontal track needs clear ceiling space to the depth of the door leaf plus the operator, and any services in that zone have to be identified at survey.",
      "Torsion springs are set for the finished leaf weight; a change of panel, glazing or wicket door after manufacture changes the counterbalance.",
    ]),
    selectionGuide: [
      {
        condition: "There is generous clear height above the opening",
        recommendation:
          "High lift or vertical lift frees usable height beneath the track, which matters where cranes or racking run close to the door.",
      },
      {
        condition: "There is very little space above the opening",
        recommendation:
          "A low headroom track arrangement lets the door operate where a standard lift will not fit.",
      },
      {
        condition: "Pedestrians pass through the opening when it is closed",
        recommendation:
          "Specify a wicket door, interlocked so the main leaf only runs when the wicket is shut.",
      },
      {
        condition: "The space behind needs daylight",
        recommendation:
          "Vision panels in selected sections, or a full-vision glazed leaf where the opening is on show.",
      },
    ],
    faq: [
      {
        question: "How much headroom does a sectional door need?",
        answer:
          "It depends on the lift configuration, which is chosen from the headroom available rather than the other way round. Standard lift needs the most conventional allowance; low headroom track exists specifically for openings that cannot provide it. The figure is confirmed at survey.",
      },
      {
        question: "Can a sectional door be insulated?",
        answer:
          "Yes — our published specification is a 40–50 mm PUF-cored aluminium or galvanized steel panel, which gives both thermal and acoustic separation.",
      },
      {
        question: "What stops the door falling if a spring breaks?",
        answer:
          "A spring-break device arrests the torsion assembly and an anti-fall device arrests the leaf if a lifting cable breaks. Both are part of the door, not options.",
      },
      {
        question: "How wide can a sectional door be?",
        answer:
          "Our published configurations span up to 10 m. Beyond that the assembly is engineered against the specific opening.",
      },
    ],
  },

  "garage-doors": {
    integration: [
      {
        system: "Remote and wall control",
        detail: "Handset, wall button or keypad releases the operator; additional handsets can be paired.",
      },
      {
        system: "Access control",
        detail: "Where the garage forms part of a controlled site, the operator accepts a release signal from the site access system.",
      },
      {
        system: "Lighting",
        detail: "Operator-driven courtesy lighting can be timed to the door cycle where the control board provides the output.",
      },
    ],
    installation: doorInstallation([
      "Headroom and side room are checked against the chosen track arrangement before manufacture.",
      "The counterbalance is set for the finished leaf, including glazing, so changes after manufacture are not trivial.",
    ]),
    selectionGuide: [
      {
        condition: "The opening is part of the visible elevation",
        recommendation:
          "Aluminium sections with glazed inserts give daylight and a lighter architectural line than a solid steel leaf.",
      },
      {
        condition: "The garage adjoins heated living space",
        recommendation:
          "A foam-cored insulated leaf with good perimeter sealing, because the door is part of the building envelope.",
      },
      {
        condition: "There is no power at the opening",
        recommendation:
          "A spring-balanced manual door still works properly; automation can be added later without replacing the leaf.",
      },
    ],
    faq: [
      {
        question: "Can an existing garage door be automated later?",
        answer:
          "Usually yes, provided the counterbalance is sound and the track arrangement suits an operator. Both are checked before quoting a retrofit.",
      },
      {
        question: "What happens in a power cut?",
        answer:
          "A release cord disengages the operator so the door can be lifted by hand.",
      },
    ],
  },

  "single-wall-rolling-shutters": {
    integration: [
      {
        system: "Access control",
        detail: "A release signal from a reader, keypad or gatehouse control can drive the operator in place of a local push button.",
      },
      {
        system: "Building management",
        detail: "Open, closed and fault status can be reported where the control panel provides volt-free outputs.",
      },
      {
        system: "Fire alarm",
        detail: "A standard shutter is not a fire assembly. Where an opening sits on a compartment line, it moves to the fire rated range and its alarm behaviour is designed in.",
      },
    ],
    installation: [
      "A survey confirms clear width and height, the barrel space available above the lintel and the side room for guides at both jambs.",
      "The structural lintel or supporting steel is checked against the finished curtain weight, which varies substantially between slat materials.",
      "Guides are fixed to a sound substrate and set plumb; a shutter that binds is almost always a guide alignment problem rather than a curtain problem.",
      "A local supply and isolator are required for motorised shutters, provided by the electrical contractor.",
      "Commissioning sets the open and close limits and tests the safety edge and obstruction detection before handover.",
    ],
    selectionGuide: [
      {
        condition: "The opening must stay visible when closed",
        recommendation:
          "Grille for maximum airflow and sightlines, perforated where slat rigidity still matters, polycarbonate where the display behind should read as a shop window.",
      },
      {
        condition: "The frontage is part of the building's face",
        recommendation:
          "Aluminium takes a powder coat and resists corrosion without repainting, at lower curtain weight than steel.",
      },
      {
        condition: "The opening is wide and back-of-house",
        recommendation:
          "Galvanized steel gives the span and the physical resistance at sensible cost.",
      },
      {
        condition: "The shutter runs many times a day",
        recommendation:
          "Move the operator selection up a duty band. Curtain weight and cycle count together decide the drive, not opening width.",
      },
    ],
    faq: [
      {
        question: "Which rolling shutter material should I choose?",
        answer:
          "Galvanized steel for span and security on industrial openings, aluminium for lighter curtains and a cleaner finish on visible frontages, and grille, perforated or polycarbonate where the closed opening still has to be seen or ventilated.",
      },
      {
        question: "How much space is needed above the opening?",
        answer:
          "Enough for the barrel and the coiled curtain. It varies with curtain height, slat profile and material, so it is confirmed at survey rather than quoted as a single figure.",
      },
      {
        question: "Can a manual shutter be motorised later?",
        answer:
          "Often yes. The barrel, guides and curtain weight are checked first — a curtain sized for hand operation is not automatically suitable for a high-cycle drive.",
      },
      {
        question: "Is a rolling shutter a security product?",
        answer:
          "A solid steel curtain in steel guides is a real physical barrier, but security performance depends on the whole assembly and its fixings. We do not publish a security rating without a tested assembly behind it.",
      },
    ],
  },

  "insulated-rolling-shutters": {
    integration: [
      {
        system: "Access control",
        detail: "Release signal from the site access system in place of a local control station.",
      },
      {
        system: "Interlocking",
        detail: "Can be paired with a second opening so both are not open at once, where the areas either side are held at different conditions.",
      },
      {
        system: "Building management",
        detail: "Status and fault reporting where the panel provides the outputs.",
      },
    ],
    installation: [
      "A survey confirms the opening, barrel space and side room, and the temperature either side of the opening.",
      "Perimeter and bottom seals are set out with the building fabric — an insulated curtain in an unsealed reveal loses most of its benefit.",
      "The lintel is checked against the finished curtain weight, which is higher than a single-skin shutter of the same size.",
      "Commissioning tests the seal contact along the full width as well as the travel limits.",
    ],
    selectionGuide: [
      {
        condition: "The opening separates conditioned and unconditioned space",
        recommendation:
          "A double-wall insulated slat with a properly sealed perimeter. A single-skin curtain will not hold the differential.",
      },
      {
        condition: "Noise through a large aperture is the problem",
        recommendation:
          "The same double-wall construction gives useful acoustic reduction as a by-product of the insulation.",
      },
      {
        condition: "The opening also needs to cycle quickly",
        recommendation:
          "Consider an insulated rigid panel high speed door instead; a shutter optimised for insulation is not optimised for cycle time.",
      },
    ],
    faq: [
      {
        question: "How much insulation does a double-wall shutter give?",
        answer:
          "That depends on the slat, the core and — critically — the perimeter sealing. A U-value for the complete assembly is confirmed per configuration rather than published as a headline number.",
      },
      {
        question: "Is an insulated shutter suitable for a cold store?",
        answer:
          "It suits openings between conditioned and unconditioned areas. Dedicated cold store and freezer room doors are a separate product class that we do not currently supply, and we will say so rather than fit the wrong product.",
      },
    ],
  },

  "fire-rated-shutters": {
    integration: [
      {
        system: "Fire alarm panel",
        detail:
          "The shutter's release is wired to the alarm system so it closes on the signal defined by the building's fire strategy, at a governed descent speed.",
      },
      {
        system: "Battery-backed release",
        detail:
          "Where the strategy requires closure during a power failure, a backed-up release holds and then controls the descent.",
      },
      {
        system: "Warning devices",
        detail: "Audible and visual warning before and during closure, where the opening is trafficked.",
      },
      {
        system: "Access control",
        detail: "Normal daily operation can still be driven from the site access system; the fire function sits above it.",
      },
    ],
    installation: [
      "The compartment line, the required integrity period and the wall construction are established from the fire strategy before anything is specified.",
      "The shutter is installed as part of a tested assembly — curtain, guides, fixings, motor and release — because the rating belongs to the assembly and not to the curtain.",
      "Fixings and the surrounding construction must match what the certificate covers; substituting either invalidates it.",
      "Commissioning includes a drop test and sign-off of the alarm interface, recorded for the building's fire file.",
    ],
    selectionGuide: [
      {
        condition: "The opening passes through a rated compartment wall",
        recommendation:
          "The required period comes from the fire strategy and the National Building Code, not from the product. Start there.",
      },
      {
        condition: "The opening is in daily use as well",
        recommendation:
          "Specify the normal-use duty alongside the fire function — the shutter still has to work as a shutter for the rest of its life.",
      },
      {
        condition: "People may be on the wrong side when it closes",
        recommendation:
          "Warning devices and an agreed escape route are part of the design, not an afterthought.",
      },
    ],
    faq: [
      {
        question: "What fire rating do these shutters carry?",
        answer:
          "We do not publish a rating against a product name. A rating belongs to a tested assembly — curtain, guides, fixings, motor and release, as installed — and we quote it only against a certificate covering that configuration. Tell us the opening and the required period and we will confirm what can be certified.",
      },
      {
        question: "Which standard applies in India?",
        answer:
          "IS 3614 is the governing standard for metallic fire check doors, and BS 476 Part 22 and EN 1634-1 are commonly cross-referenced on projects. Where a rating is required, the certificate names the standard it was tested to.",
      },
      {
        question: "Does the shutter close automatically in a fire?",
        answer:
          "Where the design requires it, yes — via an alarm interface or a fusible link, with controlled descent. The trigger and the behaviour are agreed with the fire strategy.",
      },
      {
        question: "Can it be used as a normal shutter day to day?",
        answer:
          "Yes. It is operated conventionally in normal use; the fire function is a separate layer that takes priority on alarm.",
      },
    ],
  },

  "fire-rated-doors": {
    integration: [
      {
        system: "Fire alarm panel",
        detail: "Behaviour on alarm is wired to the panel and agreed against the escape and containment strategy for that opening.",
      },
      {
        system: "Hands-free activation",
        detail: "Elbow switches, foot controls or wave sensors suit clinical and classified areas where hands are occupied or contact is undesirable.",
      },
      {
        system: "Access control",
        detail: "Reader or interlock control where the room is restricted, including airlock pairing.",
      },
      {
        system: "Room interlocks",
        detail: "Paired doors can be interlocked so both are never open together, where a pressure or containment regime requires it.",
      },
    ],
    installation: doorInstallation([
      "Where the door is shielded, the lead lining is continuous with the room's shielding design — the door and the room are specified together, not separately.",
      "Surface finishes are selected against the cleaning regime actually used in that area.",
    ]),
    selectionGuide: [
      {
        condition: "The room is an imaging or diagnostic space",
        recommendation:
          "Lead-lined leaf with lead glass vision panels, coordinated with the room's shielding design.",
      },
      {
        condition: "The corridor carries beds and trolleys continuously",
        recommendation:
          "Automatic operation with hands-free activation. A door that has to be pulled is a door that gets propped open.",
      },
      {
        condition: "The opening is on a compartment line",
        recommendation:
          "The required integrity period comes from the fire strategy, and the assembly must be certified for it.",
      },
    ],
    faq: [
      {
        question: "Can one door be both automatic and fire rated?",
        answer:
          "It can be an automatic door that closes correctly against its frame when the strategy requires it. Whether a given configuration can be certified for a specific period is confirmed against a test certificate for that assembly.",
      },
      {
        question: "Are the surfaces suitable for a cleanroom?",
        answer:
          "HPL, painted steel and powder-coated aluminium faces wipe down. The right choice depends on the cleaning agents used, which we ask about at survey.",
      },
      {
        question: "What lead thickness is available for shielded rooms?",
        answer:
          "Our published specification includes a 3.0 mm lead sheet with lead glass vision panels. The thickness actually required comes from the room's shielding calculation.",
      },
    ],
  },

  "sliding-gates": {
    integration: poweredOpeningIntegration,
    installation: [
      "A survey establishes clear opening, the side-run available for the leaf to retract into, ground level and fall across the entrance, and wind exposure.",
      "Track-guided gates need a level, well-drained approach and a track that can be kept clear; cantilever gates need a foundation for the roller carriage set back from the opening.",
      "Foundations are sized for the leaf weight and the operator, and cure before the gate is hung.",
      "Ducting for loops, photocells, readers and the supply is laid before the surface is made good — retrofitting it means breaking up the driveway.",
      "Commissioning sets travel limits and soft stop, and tests photocells, safety edge and manual release.",
    ],
    selectionGuide: [
      {
        condition: "Nothing may cross the driveway",
        recommendation:
          "Cantilever or trackless. Drainage, silt and heavy axle loads all argue against a ground track.",
      },
      {
        condition: "There is not enough boundary to park a single leaf",
        recommendation:
          "A telescopic gate needs roughly half the side-run, at the cost of a more involved drive and guidance arrangement.",
      },
      {
        condition: "The entrance runs for every vehicle movement",
        recommendation:
          "Specify the operator on duty cycle, not leaf weight alone, and plan for loop-confirmed closing rather than a timer.",
      },
      {
        condition: "The site is wind exposed",
        recommendation:
          "Infill choice matters as much as the frame — a solid leaf presents far more area to the wind than a bar infill.",
      },
    ],
    faq: [
      {
        question: "How much space is needed beside a sliding gate?",
        answer:
          "A single leaf needs roughly its own width of clear boundary to retract into, plus the operator. Where that does not exist, a telescopic arrangement halves it and a swing or retractable gate may suit better.",
      },
      {
        question: "Tracked or cantilever?",
        answer:
          "Cantilever where the driveway must stay clear for drainage, silt or heavy loading. Tracked where the approach is level and well drained and the leaf is long and heavy.",
      },
      {
        question: "What happens if the power fails?",
        answer:
          "A key-operated manual release disengages the drive so the leaf can be moved by hand. Battery backup can be specified where the entrance must keep operating.",
      },
      {
        question: "How is the gate stopped from closing on a vehicle?",
        answer:
          "Photocells across the opening, a safety edge on the leading edge, obstruction detection in the operator, and ground loops that confirm the vehicle has cleared before closing.",
      },
    ],
  },

  "swing-gates": {
    integration: poweredOpeningIntegration,
    installation: [
      "A survey establishes the swing room available, the ground fall through the arc, hinge post condition and wind exposure.",
      "Hinge posts and foundations carry high loads on a powered swing leaf and are sized for the finished leaf, not the frame alone.",
      "Underground operators need a drained foundation box; standing water is the usual cause of premature failure.",
      "Ducting for photocells, the electric lock and the supply is laid before the surface is finished.",
      "Commissioning sets leaf sequencing, soft start and stop, and tests photocells and the manual release on each operator.",
    ],
    selectionGuide: [
      {
        condition: "There is depth for the leaf to open inward",
        recommendation:
          "A swing gate is the simplest and least expensive automation, and keeps the driveway free of tracks.",
      },
      {
        condition: "The entrance is architecturally sensitive",
        recommendation:
          "An underground operator keeps the hardware out of sight, provided the foundation box can be drained.",
      },
      {
        condition: "The leaf is wide or heavy",
        recommendation:
          "An articulated arm handles the geometry better than a linear ram, particularly where the hinge post sits back from the opening.",
      },
      {
        condition: "The site is exposed",
        recommendation:
          "Wind matters more here than on a sliding gate — an open leaf stands at right angles to the boundary. A bar infill reduces the load substantially.",
      },
    ],
    faq: [
      {
        question: "Swing or sliding gate?",
        answer:
          "Geometry decides it. Swing needs depth for the arc and keeps the driveway clear of tracks; sliding needs side-run but tolerates wind and heavy leaves better.",
      },
      {
        question: "Can both leaves be automated independently?",
        answer:
          "Yes, and on a double gate the controller sequences them so they open and close in the right order and do not clash at the meeting stile.",
      },
      {
        question: "Is an electric lock necessary?",
        answer:
          "On longer or wind-exposed leaves it holds the gate closed against the meeting stile. Whether it is needed depends on leaf length, exposure and the operator type.",
      },
    ],
  },

  "retractable-gates": {
    integration: poweredOpeningIntegration,
    installation: [
      "A survey establishes the opening width, the short length of boundary the lattice will park against, and the ground condition across the run.",
      "Trackless arrangements leave the driveway clear; single and double track arrangements need the rail set level and kept free of silt.",
      "The parked stack needs a clear, protected position — it is the part most often damaged by vehicle movement.",
      "Commissioning sets travel limits and tests photocells, obstruction detection and the manual release.",
    ],
    selectionGuide: [
      {
        condition: "The opening is long and the boundary is short",
        recommendation:
          "A folding lattice parks into a fraction of the opening width — the main reason this type is chosen.",
      },
      {
        condition: "Nothing may cross the driveway",
        recommendation: "Trackless, at some cost in lateral stability on very long runs.",
      },
      {
        condition: "The run is long or wind exposed",
        recommendation: "Single or double track adds the stability a trackless arrangement gives up.",
      },
    ],
    faq: [
      {
        question: "How long an opening can a retractable gate close?",
        answer:
          "Our published configuration covers openings up to 30 m at a standard 1.6 m height, driven at 17–19 m/min.",
      },
      {
        question: "Does it need a track?",
        answer:
          "No — trackless, single-track and double-track arrangements are all available. Track adds lateral stability; trackless keeps the driveway clear.",
      },
    ],
  },

  "automatic-sliding-doors": {
    integration: pedestrianIntegration,
    installation: doorInstallation([
      "The header needs sufficient depth and a structural fixing above the opening; on a glazed facade this is coordinated with the glazier before manufacture.",
      "Threshold detail and floor level are set out so the leaves run true and the seal contacts along the full width.",
      "Where the opening is on an escape route, the break-out or fail-safe arrangement is agreed with the fire strategy before order.",
    ]),
    selectionGuide: [
      {
        condition: "Peak footfall is high",
        recommendation:
          "Bi-parting leaves clear the opening in roughly half the time of a single leaf.",
      },
      {
        condition: "The structure limits header width",
        recommendation:
          "A telescopic arrangement gives a wider clear opening from a narrower overall frame.",
      },
      {
        condition: "The opening sits on a designated escape route",
        recommendation:
          "Break-out leaves, and a power-failure behaviour agreed with the building's escape strategy.",
      },
      {
        condition: "The lobby is air conditioned",
        recommendation:
          "Specify a part-open mode and check the threshold and side sealing — most conditioning loss at an entrance is avoidable.",
      },
    ],
    faq: [
      {
        question: "What happens to an automatic door in a power cut?",
        answer:
          "It adopts the behaviour specified for that opening: released so it can be pushed open by hand, or driven open automatically. Which one is correct comes from the building's escape strategy, and is agreed before installation.",
      },
      {
        question: "Are automatic doors suitable for an escape route?",
        answer:
          "Yes, with the right arrangement — typically break-out leaves that swing clear under push force, giving the full escape width.",
      },
      {
        question: "How much clear opening do I need?",
        answer:
          "That comes from the footfall and the accessibility requirement rather than the door. Tell us both and we will size the leaves and the header around them.",
      },
      {
        question: "Can the door be locked out of hours?",
        answer:
          "Yes — a mode selector gives automatic, partial, exit only, locked and hold open, and can be driven remotely from reception where the controller supports it.",
      },
    ],
  },

  "dock-levellers": {
    integration: [
      {
        system: "Bay door interlock",
        detail:
          "The leveller and the door above it are interlocked so the platform cannot deploy against a closed door, and the door cannot close onto a deployed lip.",
      },
      {
        system: "Traffic signalling",
        detail: "Red/green lights inside and outside the bay tell the driver and the loading team when it is safe to move.",
      },
      {
        system: "Vehicle restraint",
        detail:
          "Where a restraint is fitted, its status can be interlocked with the leveller controls. We do not currently supply restraints, and will say so rather than quote one.",
      },
      {
        system: "Warehouse management",
        detail: "Bay status can be reported where the control station provides volt-free outputs.",
      },
    ],
    installation: [
      "The foundation pit is formed by the building contractor to the dimensions issued for the selected leveller — this is the item most often built wrong, and it cannot be corrected afterwards.",
      "Pit drainage matters: standing water shortens the life of the hydraulics and the hinge.",
      "Dock height is set against the vehicle mix actually using the bay, not a nominal figure.",
      "A three-phase supply and isolator are required at the bay, provided by the electrical contractor.",
      "Commissioning tests the full working range above and below dock, the lip operation, and every safety device including the maintenance strut.",
    ],
    selectionGuide: [
      {
        condition: "The fleet varies widely in bed height",
        recommendation:
          "Specify the working range against the extremes, not the common case — one bay serving a mixed fleet is exactly what the range is for.",
      },
      {
        condition: "Vehicles cannot always reverse on accurately",
        recommendation:
          "A telescopic lip gives longer reach and more forgiving placement than a swing lip.",
      },
      {
        condition: "The bay is temperature controlled",
        recommendation:
          "Specify the shelter and the door with the leveller. A sealed bay is an assembly, not three separate purchases.",
      },
      {
        condition: "Heavy handling equipment crosses the deck",
        recommendation:
          "Rated capacity under EN 1398 refers to the axle load of the equipment, not its gross weight — quote the axle load when asking.",
      },
    ],
    faq: [
      {
        question: "What capacity dock leveller do I need?",
        answer:
          "It is set by the axle load of the heaviest handling equipment crossing the deck, plus its load — not the gross vehicle weight. EN 1398 rates levellers on that basis.",
      },
      {
        question: "What pit size is required?",
        answer:
          "It follows the platform selected. Our published configurations use pit lengths of 2000 or 2500 mm, widths of 1880, 2050 or 2180 mm and depths of 515 or 615 mm, all to ±2 mm. Drawings are issued before the pit is formed.",
      },
      {
        question: "Can one leveller serve both vans and trailers?",
        answer:
          "Within its working range, yes. Ours work both above and below dock level — published as 725–750 mm above and 225–380 mm below — which is what allows a mixed fleet at one bay.",
      },
      {
        question: "Does it work in a cold store?",
        answer:
          "The published operating range is -35 °C to +50 °C, which covers cold chain bays.",
      },
    ],
  },

  "dock-shelters": {
    integration: [
      {
        system: "Bay assembly",
        detail: "Specified together with the leveller and the bay door — sealing only works if all three are set out as one opening.",
      },
      {
        system: "Dock lighting",
        detail: "Integrated dock lights can be mounted within the shelter frame.",
      },
      {
        system: "Traffic signalling",
        detail: "Signal heads can be mounted on the frame where the bay is controlled.",
      },
    ],
    installation: [
      "The frame is fixed around the dock opening to a substrate checked for the loads a vehicle impact will impose.",
      "The projection from the building line is set against the vehicle mix and the approach.",
      "Curtains are set so they contact the vehicle body without being repeatedly crushed — over-tight sealing is the main cause of premature curtain wear.",
      "Fixings should be re-checked after any vehicle impact.",
    ],
    selectionGuide: [
      {
        condition: "The fleet varies widely in body size",
        recommendation:
          "A curtain shelter is the most forgiving arrangement; a tighter seal suits a consistent fleet.",
      },
      {
        condition: "Temperature loss is the governing concern",
        recommendation:
          "An inflatable arrangement forms to the vehicle and seals tightest, at higher cost and more maintenance.",
      },
      {
        condition: "The dock face is flush with the building line",
        recommendation: "A dock house enclosing the bay may suit better than a surface-mounted shelter.",
      },
    ],
    faq: [
      {
        question: "Do I need a shelter if I already have a leveller?",
        answer:
          "They do different jobs. The leveller closes the gap under the trailer; the shelter closes it around the trailer. Without one, the opening is effectively open for as long as the vehicle is on the bay.",
      },
      {
        question: "How long do the curtains last?",
        answer:
          "Curtains are a consumable and their life depends on the accuracy of vehicle placement and the number of movements. Our published frame service life is 10–20 years; curtains are replaced within that.",
      },
    ],
  },

  "pedestrian-access-control": {
    integration: [
      {
        system: "Credential readers",
        detail:
          "Card, fob, QR, biometric and mobile credentials all present the same way to the lane — a release signal from the reader. The housing carries provision for reader mounting.",
      },
      {
        system: "Access control panel",
        detail: "Dry-contact inputs and outputs let the lane report passage and accept release from the site's controller.",
      },
      {
        system: "Visitor management",
        detail: "Single-use credentials issued by a visitor system release the lane in the same way as a permanent card.",
      },
      {
        system: "Attendance systems",
        detail: "Passage events can be counted and reported where the controller exposes the outputs.",
      },
      {
        system: "Fire alarm",
        detail:
          "On alarm the lane drops, free-spins or releases so it becomes clear escape width. The behaviour is set by the building's escape strategy.",
      },
    ],
    installation: [
      "Lane layout is set out from peak flow and the accessibility requirement — at least one wide lane per bank is normally required.",
      "Units are fixed to a sound, level floor; a lane that is not level will not seat correctly and the mechanism will wear unevenly.",
      "Cable routes for power and reader wiring are coordinated with the floor build-up before it is finished.",
      "Escape route behaviour is tested and documented at commissioning as part of the building's fire file.",
    ],
    selectionGuide: [
      {
        condition: "The point is supervised and throughput is moderate",
        recommendation:
          "A tripod turnstile enforces single passage mechanically at the lowest cost and footprint.",
      },
      {
        condition: "The point is a corporate lobby at peak flow",
        recommendation:
          "Flap barriers move people faster and read as building fit-out rather than security equipment.",
      },
      {
        condition: "The point is an unsupervised perimeter",
        recommendation:
          "A full height turnstile. A waist-height unit with nobody watching it is a formality.",
      },
      {
        condition: "Wheelchair users, trolleys or luggage pass through",
        recommendation: "Provision at least one wide accessible lane alongside the standard lanes.",
      },
    ],
    faq: [
      {
        question: "Which turnstile type suits my entrance?",
        answer:
          "It follows supervision and throughput. Flap barriers for high-flow supervised lobbies, tripod turnstiles for gate houses and staff entrances, full height turnstiles where the point is unsupervised and has to be genuinely unclimbable.",
      },
      {
        question: "Do they work with our existing access control system?",
        answer:
          "In almost all cases, yes. The lane accepts a release signal and returns passage events over standard dry contacts, so the credential technology is your choice.",
      },
      {
        question: "What happens on a fire alarm?",
        answer:
          "Arms drop, free-spin or the wings retract so the lane becomes clear escape width. The exact behaviour is specified against the building's escape strategy and tested at commissioning.",
      },
      {
        question: "Can one lane be used for both entry and exit?",
        answer:
          "Yes — direction is configurable per lane as entry only, exit only, bi-directional or free passage.",
      },
    ],
  },

  "vehicle-access-control": {
    integration: [
      {
        system: "RFID and UHF readers",
        detail:
          "Long-range tag reading releases the barrier without the driver stopping, which is the usual arrangement for staff and fleet vehicles.",
      },
      {
        system: "ANPR",
        detail:
          "Number plate recognition releases the barrier from the plate alone, avoiding credentials entirely. It is commonly deployed alongside RFID rather than instead of it.",
      },
      {
        system: "Ticketing and parking management",
        detail: "Ticket machines and parking systems drive the barrier and receive its status over standard interfaces.",
      },
      {
        system: "Loop detectors",
        detail:
          "Ground loops provide safety and free-exit, and confirm the vehicle has cleared before the boom descends — closing on a timer alone is not acceptable.",
      },
      {
        system: "Gatehouse control",
        detail: "Manual override from a guard position, alongside automatic release.",
      },
    ],
    installation: [
      "Lane geometry, approach and queuing space are established first — a barrier in the wrong position creates a queue on the public road.",
      "Foundations are sized for the unit and, for bollards, for the sleeve depth required below the carriageway.",
      "Ground loops are cut and ducted before the surface is made good, and re-tested after any resurfacing.",
      "A local supply and isolator are required, provided by the electrical contractor.",
      "Commissioning tests loop behaviour, photocells and the manual release before handover.",
    ],
    selectionGuide: [
      {
        condition: "You need to meter traffic and record movements",
        recommendation:
          "A boom barrier. It is a control device — it regulates flow, it does not stop a determined vehicle.",
      },
      {
        condition: "The line has to be physically enforced",
        recommendation:
          "Bollards. Where hostile vehicle mitigation is the requirement, a tested and certified product is needed and we will say if we cannot supply one.",
      },
      {
        condition: "Headroom above the lane is restricted",
        recommendation: "A folding boom articulates as it rises, for basement and covered entries.",
      },
      {
        condition: "Pedestrians share the vehicle entry",
        recommendation:
          "A fence or skirted boom deters ducking under, and the pedestrian route should be separated where possible.",
      },
    ],
    faq: [
      {
        question: "Will a boom barrier stop an unauthorised vehicle?",
        answer:
          "No, and it is not designed to. A boom meters traffic and records movements. Where the line must be physically held, bollards are the correct product.",
      },
      {
        question: "Can the barrier work with RFID or ANPR?",
        answer:
          "Yes. Long-range RFID or UHF tags and number-plate recognition both release the barrier through standard interfaces, and are frequently deployed together — tags for fleet vehicles, ANPR for visitors.",
      },
      {
        question: "How does the barrier know the vehicle has passed?",
        answer:
          "A ground loop under the lane confirms the vehicle has cleared before the boom descends, rather than closing on a timer.",
      },
      {
        question: "Do rising bollards carry a crash rating?",
        answer:
          "Only where the specific product has been tested and certified to an impact standard. We publish an impact rating only against that evidence, and we will tell you plainly when a product does not carry one.",
      },
    ],
  },
};

export function guidanceFor(categoryId: string): Guidance | undefined {
  return categoryGuidance[categoryId];
}

// Added 2026-09-05 with the two new Entrance Automation categories.
categoryGuidance["automatic-swing-doors"] = {
  integration: pedestrianIntegration,
  installation: doorInstallation([
    "The existing or new leaf, frame and hinges are checked for weight and condition — an operator will find any weakness in the doorset it is fitted to.",
    "Swing arc and approach are checked for guarding requirements, which differ between low-energy and full-power operation.",
  ]),
  selectionGuide: [
    {
      condition: "The entrance is an accessible route used by the public",
      recommendation:
        "Low-energy operation. Its kinetic energy is limited by design, which is why it does not need the guarding a fast leaf requires.",
    },
    {
      condition: "There is no side-run for a sliding leaf",
      recommendation: "A swing operator fits openings where walls sit close to both jambs.",
    },
    {
      condition: "An existing doorset is sound and only needs automating",
      recommendation:
        "An operator can often be added to the existing leaf and frame, provided hinge condition and leaf weight check out.",
    },
  ],
  faq: [
    {
      question: "What is the difference between low-energy and full-power?",
      answer:
        "Low-energy doors open slowly enough that their kinetic energy is limited by design, which is why they suit accessible public entrances. Full-power doors move faster and need presence sensing and guarding around the swing arc.",
    },
    {
      question: "Can our existing doors be automated?",
      answer:
        "Often yes. We check leaf weight, frame and hinge condition first — an operator amplifies any existing weakness in the doorset.",
    },
    {
      question: "Does it still work in a power cut?",
      answer: "Yes. The operator releases so the leaf works as an ordinary swing door.",
    },
  ],
};

categoryGuidance["hermetic-cleanroom-doors"] = {
  integration: [
    ...pedestrianIntegration,
    {
      system: "Airlock interlocking",
      detail:
        "Paired doors are electrically interlocked so both are never open together, with an override behaviour defined against the escape strategy.",
    },
    {
      system: "Pressure monitoring and BMS",
      detail:
        "Door status can be reported alongside room pressure so a held-open door is visible as a cause when a differential drops.",
    },
    {
      system: "Hands-free activation",
      detail: "Wave sensors, elbow switches and foot controls suit gowned staff and anyone carrying materials.",
    },
  ],
  installation: doorInstallation([
    "The door is set out with the cleanroom design, not after it — seal detail, wall interface and finish all follow from the classification and the pressure regime.",
    "Wall construction and the panel system have to accept the frame without breaking the sealed line around the opening.",
    "Interlocked pairs are commissioned together, including the override behaviour required on alarm.",
  ]),
  selectionGuide: [
    {
      condition: "The opening separates two classified areas",
      recommendation:
        "A hermetic leaf sealing on all four edges. A conventional automatic door will not hold the pressure cascade.",
    },
    {
      condition: "The opening is a gowning room or material airlock",
      recommendation: "An interlocked pair, so both doors are never open at once.",
    },
    {
      condition: "The room also requires radiation shielding",
      recommendation: "A shielded leaf, coordinated with the room's shielding calculation rather than specified separately.",
    },
    {
      condition: "Wide equipment has to pass through",
      recommendation: "Bi-parting leaves give the clear width without an excessively long single leaf.",
    },
  ],
  faq: [
    {
      question: "What makes a door hermetic?",
      answer:
        "It seals against its frame on all four edges as it closes, rather than simply meeting a stop. That is what lets the opening sit in a wall between two classified areas without breaking the pressure cascade.",
    },
    {
      question: "Can these doors be interlocked as an airlock?",
      answer:
        "Yes. Paired doors are electrically interlocked so both are never open together, with the override behaviour on alarm agreed against the escape strategy.",
    },
    {
      question: "Which classification can you achieve?",
      answer:
        "Classification is a property of the room and its air handling, not of the door alone. We specify the door to suit the classification the cleanroom designer has set, and we will not quote a class for a door in isolation.",
    },
  ],
};
