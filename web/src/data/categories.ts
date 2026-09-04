import type { Category } from "@/lib/types";

/**
 * Twenty categories. A category is a construction or operating *principle*,
 * not a marketing group — it is the level at which two products genuinely
 * work differently rather than just being finished differently.
 *
 * `defaults` are inherited by every product in the category. A product may
 * override any of them; the UI merges product over category. This is why the
 * site can carry safety and control detail on 38 products without 38 copies
 * of the same four sentences.
 */
export const categories: Category[] = [
  // ------------------------------------------------------- high speed doors
  {
    id: "roll-up-high-speed-doors",
    familyId: "high-speed-doors",
    name: "Roll-Up High Speed Doors",
    principle:
      "A flexible curtain rolling onto a drum above the opening. No heavy panel to accelerate, so this is the fastest cycle time per rupee of the high speed types.",
    defaults: {
      safety: [
        "Photocell across the threshold prevents the curtain closing on an obstruction",
        "Light curtain or safety edge on the leading edge, reversing travel on contact",
        "Soft bottom beam, so contact with a person or vehicle is absorbed rather than resisted",
        "Crank handle or manual release for operation during a power failure",
      ],
      controls: [
        "PLC control with inverter and encoder for ramped acceleration and repeatable stop positions",
        "Adjustable open and close speeds and hold-open time",
        "Activation by radar, infrared sensor, pull switch, push button, loop detector or remote",
        "Interface for traffic lights and for interlocking with a second door",
      ],
      options: [
        "Transparent vision sections in the curtain",
        "Curtain colour to requirement",
        "Interlock pairing for airlocks and clean transitions",
        "Stainless steel frame and guides for washdown areas",
      ],
      maintenance: [
        "Curtain, guides and bottom beam should be inspected on a scheduled interval — cycle count, not calendar time, drives wear",
        "Safety devices should be function-tested at every service visit",
        "Consumables are the curtain, the bottom beam seal and the drive belt or chain",
      ],
    },
  },
  {
    id: "fold-up-high-speed-doors",
    familyId: "high-speed-doors",
    name: "Fold-Up High Speed Doors",
    principle:
      "The curtain gathers into horizontal folds instead of rolling, giving a shallower stack above the opening — which is what makes wide external openings practical.",
    defaults: {
      safety: [
        "Photocell across the threshold prevents the curtain closing on an obstruction",
        "Safety edge on the leading edge, reversing travel on contact",
        "Manual release for operation during a power failure",
      ],
      controls: [
        "Inverter-controlled drive with adjustable speeds",
        "Activation by radar, push button, pull switch or remote",
        "Adjustable hold-open time",
      ],
      options: [
        "Transparent vision sections",
        "Horizontal wind-bar reinforcement for exposed elevations",
        "Curtain colour to requirement",
      ],
      maintenance: [
        "Fold straps and wind bars should be inspected on a scheduled interval",
        "Safety devices should be function-tested at every service visit",
      ],
    },
  },
  {
    id: "rigid-panel-high-speed-doors",
    familyId: "high-speed-doors",
    name: "Rigid Panel High Speed Doors",
    principle:
      "Insulated aluminium sections instead of a fabric curtain, for openings that need thermal separation and wind resistance as well as speed.",
    defaults: {
      safety: [
        "Photocell across the threshold and safety edge on the leading section",
        "Controlled acceleration and deceleration, so a heavier panel is not snatched",
        "Manual release for operation during a power failure",
      ],
      controls: [
        "PLC control with inverter and encoder",
        "Adjustable open and close speeds",
        "Activation by radar, infrared sensor or as specified",
      ],
      options: [
        "Vision panels in selected sections",
        "Panel finish to requirement",
        "Interlock pairing for temperature-separated areas",
      ],
      maintenance: [
        "Panel hinges, rollers and guides should be inspected on a scheduled interval",
        "Seals are a consumable in temperature-separated openings",
      ],
    },
  },

  // ------------------------------------------------------ industrial doors
  {
    id: "sectional-overhead-doors",
    familyId: "industrial-doors",
    name: "Sectional Overhead Doors",
    principle:
      "Hinged insulated panels running on tracks that turn from vertical to horizontal above the opening, so the leaf stores flat under the roof.",
    defaults: {
      safety: [
        "Spring-break device arrests the torsion assembly if a spring fails",
        "Anti-fall device arrests the leaf if a lifting cable breaks",
        "Obstruction detection on the operator stops and reverses a closing leaf",
        "Finger-trap-resistant panel joints",
      ],
      controls: [
        "Push button, key switch, remote handset or rocker switch",
        "Adjustable open and close limits set at commissioning",
        "Interface for photocells and traffic lights",
      ],
      options: [
        "Wicket access door, interlocked so the main leaf only runs when it is closed",
        "Vision panels or a full-vision glazed leaf",
        "Powder coat or plastisol finish to a specified RAL colour",
        "High lift, vertical lift or low headroom track arrangements",
      ],
      maintenance: [
        "Springs, cables and rollers are wear items and should be inspected on a scheduled interval",
        "Safety devices should be function-tested at every service visit",
        "Seals around the perimeter are a consumable",
      ],
    },
  },
  {
    id: "garage-doors",
    familyId: "industrial-doors",
    name: "Garage Doors",
    principle:
      "Sectional doors sized and finished for vehicle parking rather than industrial duty — appearance, insulation and quiet running matter more than cycle count.",
    defaults: {
      safety: [
        "Spring-break device arrests the torsion assembly if a spring fails",
        "Anti-fall device arrests the leaf if a lifting cable breaks",
        "Obstruction detection on the operator stops and reverses a closing leaf",
      ],
      controls: [
        "Remote handset and wall control",
        "Adjustable travel limits",
        "Manual release cord for use during a power failure",
      ],
      options: [
        "Glazed sections and vision windows",
        "Wicket access door",
        "Finish to a specified colour",
      ],
      maintenance: [
        "Springs, cables and rollers are wear items and should be inspected on a scheduled interval",
        "Perimeter seals are a consumable",
      ],
    },
  },

  // ------------------------------------------------------ rolling shutters
  {
    id: "single-wall-rolling-shutters",
    familyId: "rolling-shutters",
    name: "Single-Wall Rolling Shutters",
    principle:
      "A single folded slat profile — chosen when span, security, visibility or airflow matters more than insulation.",
    defaults: {
      safety: [
        "Safety edge on the bottom rail where the shutter is motorised",
        "Obstruction detection on the operator",
        "Manual override on every powered shutter — hand chain, crank or release",
        "Guides sized to retain the curtain under wind load",
      ],
      controls: [
        "Push button station, key switch or remote handset",
        "Adjustable open and close limits set at commissioning",
        "Three-phase or single-phase supply depending on curtain weight",
      ],
      options: [
        "Locking arrangements at the bottom rail",
        "Powder coat finish to a specified colour",
        "Vision or ventilation slats within the curtain",
        "Motorisation of an existing manual shutter",
      ],
      maintenance: [
        "Guides and bottom rail should be kept clear and inspected on a scheduled interval",
        "Curtain and barrel bearings are the wear points on a high-cycle shutter",
      ],
    },
  },
  {
    id: "insulated-rolling-shutters",
    familyId: "rolling-shutters",
    name: "Insulated Rolling Shutters",
    principle:
      "A double-wall slat with an insulating core, for openings that separate two thermal or acoustic environments without giving up the compact roll.",
    defaults: {
      safety: [
        "Safety edge on the bottom rail",
        "Obstruction detection on the operator",
        "Manual override on every powered shutter",
      ],
      controls: [
        "Push button station, key switch or remote handset",
        "Adjustable open and close limits",
        "Interface for interlocking with a second opening",
      ],
      options: [
        "Perimeter and bottom seals for a tighter thermal envelope",
        "Powder coat finish to a specified colour",
        "Vision sections",
      ],
      maintenance: [
        "Seals are a consumable and determine whether the thermal performance is retained",
        "Guides and barrel bearings should be inspected on a scheduled interval",
      ],
    },
  },

  // ---------------------------------------------------------- fire & safety
  {
    id: "fire-rated-shutters",
    familyId: "fire-safety-doors",
    name: "Fire Rated Shutters",
    principle:
      "A rolling shutter built and tested as an assembly to hold a compartment line for a stated duration.",
    defaults: {
      safety: [
        "Controlled descent on release, so the curtain closes at a governed speed",
        "Manual release for testing and for use during a power failure",
        "Escape route strategy defined for the opening before installation",
        "Safety edge on the bottom rail during normal daily operation",
      ],
      controls: [
        "Normal daily operation by push button, key switch or remote",
        "Interface to the fire alarm panel for automatic closure",
        "Fusible link release where an alarm interface is not available",
      ],
      options: [
        "Alarm-linked auto-close with a battery-backed release",
        "Audible and visual warning before closure",
        "Powder coat finish to a specified colour",
      ],
      maintenance: [
        "The release mechanism and drop test should be carried out on a scheduled interval as part of fire system maintenance",
        "Certification paperwork should be held with the building's fire file",
      ],
    },
  },
  {
    id: "fire-rated-doors",
    familyId: "fire-safety-doors",
    name: "Fire Rated Doors",
    principle:
      "Sliding leaves on compartment and controlled-area openings, where the door is also in daily hygienic or clinical use.",
    defaults: {
      safety: [
        "Presence detection in the threshold during normal operation",
        "Defined behaviour on alarm, agreed against the building's fire strategy",
        "Manual operation available without power",
      ],
      controls: [
        "Automatic operation by sensor, push plate or hands-free switch",
        "Interface to the fire alarm panel",
        "Adjustable hold-open time",
      ],
      options: [
        "Lead sheet lining and lead glass vision panels for shielded rooms",
        "Hands-free elbow or foot activation for clinical areas",
        "Vision panels in single or double glazing",
      ],
      maintenance: [
        "Sensors, seals and the release mechanism should be function-tested on a scheduled interval",
        "Certification paperwork should be held with the building's fire file",
      ],
    },
  },

  // -------------------------------------------------------- automatic gates
  {
    id: "sliding-gates",
    familyId: "automatic-gates",
    name: "Sliding Gates",
    principle:
      "The leaf runs parallel to the boundary — the default wherever there is no room for a swing arc into the road or the yard.",
    defaults: {
      safety: [
        "Photocells across the opening stop and reverse travel on obstruction",
        "Safety edge on the leading edge of the leaf",
        "Obstruction detection in the operator",
        "Key-operated manual release for use during a power failure",
      ],
      controls: [
        "Remote handset, card reader, keypad, intercom or loop detector",
        "Adjustable open and close limits with soft stop at both ends",
        "Auto-close timer with loop-detector confirmation",
      ],
      options: [
        "Ground loop detectors for free exit and safety",
        "Warning light and audible warning before movement",
        "Infill to match the boundary treatment",
        "Integration with a gatehouse control or access system",
      ],
      maintenance: [
        "Rollers, guides and the drive rack should be kept clear and inspected on a scheduled interval",
        "Safety devices should be function-tested at every service visit",
      ],
    },
  },
  {
    id: "swing-gates",
    familyId: "automatic-gates",
    name: "Swing Gates",
    principle:
      "Hinged leaves on posts either side of the opening, for entrances with clear swing room and moderate duty.",
    defaults: {
      safety: [
        "Photocells across the opening stop travel when the arc is obstructed",
        "Soft start and soft stop reduce load on the hinge post",
        "Manual release on each operator so the leaves can be swung by hand",
      ],
      controls: [
        "Leaf sequencing so a double gate opens and closes in the correct order",
        "Remote handset, keypad, reader or intercom",
        "Adjustable travel and hold-open time",
      ],
      options: [
        "Underground operators where the drive must be concealed",
        "Electric lock at the meeting stile",
        "Warning light and audible warning before movement",
      ],
      maintenance: [
        "Hinges, posts and operator mountings carry high loads and should be inspected on a scheduled interval",
        "Safety devices should be function-tested at every service visit",
      ],
    },
  },
  {
    id: "retractable-gates",
    familyId: "automatic-gates",
    name: "Retractable Gates",
    principle:
      "A folding lattice leaf that collapses on itself, so a long opening parks into a very short length of boundary.",
    defaults: {
      safety: [
        "Photocells across the opening",
        "Obstruction detection in the operator",
        "Manual release for use during a power failure",
      ],
      controls: [
        "Remote handset with a stated working range",
        "Push button station or gatehouse control",
        "Adjustable travel limits",
      ],
      options: [
        "Trackless, single-track or double-track arrangement",
        "Finish to a specified colour",
        "Warning light and audible warning before movement",
      ],
      maintenance: [
        "Wheels, lattice pivots and the drive should be inspected on a scheduled interval",
        "Track, where fitted, must be kept clear of silt and debris",
      ],
    },
  },

  // ---------------------------------------------------- entrance automation
  {
    id: "automatic-sliding-doors",
    familyId: "entrance-automation",
    name: "Automatic Sliding Doors",
    principle:
      "A belt-driven operator concealed in a header above the opening, carrying glass leaves on a track.",
    defaults: {
      safety: [
        "Approach and presence sensors hold the door open while the threshold is occupied",
        "Safety sensors in the door leaves detect a person in the closing path",
        "Defined power-failure behaviour: released for manual push, or driven open",
        "Break-out leaves where the opening sits on an escape route",
      ],
      controls: [
        "Mode selector: automatic, partial open, exit only, locked, hold open",
        "Adjustable opening width, speed and hold-open time",
        "Interface for access control, intercom and building management",
      ],
      options: [
        "Bi-parting or telescopic leaf arrangements",
        "Part-open winter mode to cut conditioning loss",
        "Break-out escape leaves",
        "Integration with a card reader or visitor system",
      ],
      maintenance: [
        "Sensors, belt and carriage rollers should be inspected on a scheduled interval",
        "Break-out function, where fitted, must be tested as part of the escape route check",
      ],
    },
  },

  // ------------------------------------------------------------ loading bay
  {
    id: "dock-levellers",
    familyId: "loading-bay",
    name: "Dock Levellers",
    principle:
      "A hinged, load-bearing platform set into the dock edge, raised hydraulically and lowered onto the vehicle bed.",
    defaults: {
      safety: [
        "Maintenance strut to hold the platform safely while work is carried out beneath it",
        "Toe guards along the sides of the platform",
        "Hydraulic hose burst protection to prevent uncontrolled descent",
        "Emergency stop at the control station",
      ],
      controls: [
        "Dead-man push button control station at the bay",
        "Interlock with the bay door so the leveller cannot deploy against a closed door",
        "Interface for traffic lights and vehicle restraint signalling",
      ],
      options: [
        "Telescopic lip for longer reach and more accurate placement",
        "Traffic lights and bay signalling",
        "Bumpers, wheel guides and dock bollards",
        "Weather sealing between the platform and the pit",
      ],
      maintenance: [
        "Hydraulic system, hinges and lip mechanism should be inspected on a scheduled interval",
        "The pit must be kept clear of debris and free-draining",
      ],
    },
  },
  {
    id: "dock-shelters",
    familyId: "loading-bay",
    name: "Dock Shelters & Houses",
    principle:
      "A frame and sealing curtain, or a built-out housing, that closes the opening around a docked vehicle rather than the gap beneath it.",
    defaults: {
      safety: [
        "Frame designed to deflect on vehicle impact rather than transferring load into the building",
        "High-visibility guidance markings on the approach",
      ],
      controls: [
        "Passive for a curtain shelter; no controls required",
        "Bay signalling and traffic lights supplied as part of the bay",
      ],
      options: [
        "Curtain, cushion or inflatable sealing arrangements",
        "Top and side seal configurations for a mixed vehicle fleet",
        "Integrated dock lights",
      ],
      maintenance: [
        "Sealing curtains are a consumable and their condition determines whether the bay is still sealed",
        "Frame fixings should be inspected after any vehicle impact",
      ],
    },
  },

  // --------------------------------------------------------- access control
  {
    id: "pedestrian-access-control",
    familyId: "access-control",
    name: "Pedestrian Access Control",
    principle:
      "Graded by physical resistance: detect and deter at lane speed, then enforce single passage mechanically, then make the line unclimbable.",
    defaults: {
      safety: [
        "Free-exit and emergency release behaviour defined before installation",
        "Arms or wings release, drop or free-spin on alarm and on power failure",
        "Lane sensors detect a person or object in the closing path",
      ],
      controls: [
        "Dry-contact and reader interfaces for card, biometric, QR and visitor systems",
        "Directional control: entry only, exit only, bi-directional or free passage",
        "Interface to an access control panel and to attendance systems",
      ],
      options: [
        "Integrated reader mountings in the housing",
        "Directional indicators and passage counting",
        "Stainless steel or painted housing finishes",
        "Wide accessible lane alongside standard lanes",
      ],
      maintenance: [
        "Mechanism, sensors and release should be function-tested on a scheduled interval",
        "The emergency release must be tested as part of the building's escape route check",
      ],
    },
  },
  {
    id: "vehicle-access-control",
    familyId: "access-control",
    name: "Vehicle Access Control",
    principle:
      "Metering devices that regulate and record vehicle movement, and physical barriers where a decision has to be enforced rather than signalled.",
    defaults: {
      safety: [
        "Ground loops and photocells prevent a boom descending onto a vehicle or person",
        "Manual release for use during a power failure",
        "High-visibility markings and, where required, warning lights",
      ],
      controls: [
        "Loop detectors, card readers, remotes, ticket machines or a gatehouse control",
        "Adjustable open and close timing",
        "Interface to parking management and ANPR systems",
      ],
      options: [
        "Boom skirts and fencing for pedestrian deterrence",
        "LED-lit booms for night-time visibility",
        "Traffic lights and signage",
        "Battery backup for continued operation during a power failure",
      ],
      maintenance: [
        "Spring balance, bearings and the boom mounting should be inspected on a scheduled interval",
        "Ground loops should be tested after any resurfacing work",
      ],
    },
  },

  // ------------------------------------------------------- motors and drives
  {
    id: "shutter-operators",
    familyId: "motors-automation",
    name: "Shutter Operators",
    principle:
      "Sized against curtain weight, opening height and daily cycle count — duty rating usually binds before torque does.",
    defaults: {
      safety: [
        "Manual override on every drive — hand chain, crank or release",
        "Adjustable travel limits set at commissioning",
        "Input for a bottom-rail safety edge and obstruction detection",
        "Thermal protection appropriate to the duty rating",
      ],
      controls: [
        "Push button station, key switch or remote handset",
        "Up / stop / down control with optional auto-close",
        "Single or three phase supply depending on curtain weight",
      ],
      options: [
        "Emergency hand chain of extended length for high openings",
        "Radio remote control and additional handsets",
        "Interlocking with a second opening",
      ],
      maintenance: [
        "Drive chains, sprockets and limit gearing are the wear points and should be inspected on a scheduled interval",
        "Duty rating should be reviewed if the opening's usage pattern changes",
      ],
    },
  },
  {
    id: "gate-operators",
    familyId: "motors-automation",
    name: "Gate Operators",
    principle:
      "Rolling and hinged loads behave differently: a sliding leaf is driven along a rack, a swing leaf is accelerated through an arc against the hinge post.",
    defaults: {
      safety: [
        "Obstruction detection stops and reverses the leaf",
        "Inputs for photocells and safety edges",
        "Key-operated manual release",
        "Soft start and soft stop at both ends of travel",
      ],
      controls: [
        "Remote handset, keypad, card reader, intercom or loop detector",
        "Adjustable travel limits and auto-close timing",
        "Leaf sequencing on double swing gates",
      ],
      options: [
        "Ground loop detectors for free exit",
        "Warning light and audible warning before movement",
        "Battery backup for operation during a power failure",
      ],
      maintenance: [
        "Rack, pinion and release mechanism should be inspected on a scheduled interval",
        "Duty rating should be reviewed if traffic through the gate increases",
      ],
    },
  },
  {
    id: "door-operators",
    familyId: "motors-automation",
    name: "Door Operators",
    principle:
      "High-cycle, low-noise duty in occupied buildings, where the defining specification is what the door does when power is lost.",
    defaults: {
      safety: [
        "Obstruction detection stops and reverses a closing leaf",
        "Presence sensing in the threshold on pedestrian doors",
        "Defined power-failure behaviour: manual release, or fail-safe open",
      ],
      controls: [
        "Mode selector on pedestrian doors: automatic, partial, exit only, locked, hold open",
        "Adjustable opening width, speed and hold-open time",
        "Interface for access control and building management",
      ],
      options: [
        "Battery backup for fail-safe opening",
        "Part-open mode to reduce conditioning loss",
        "Integration with a card reader or visitor system",
      ],
      maintenance: [
        "Belt, carriage and sensors should be inspected on a scheduled interval",
        "On a counterbalanced door, the springs — not the operator — carry the leaf and must be maintained",
      ],
    },
  },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  string,
  Category
>;
