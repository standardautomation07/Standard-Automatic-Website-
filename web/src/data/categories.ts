import type { Category } from "@/lib/types";

/**
 * Twenty-six categories. A category is a construction or operating *principle*,
 * not a marketing group — it is the level at which two products genuinely
 * work differently rather than just being finished differently.
 *
 * `defaults` are inherited by every product in the category. A product may
 * override any of them; the UI merges product over category. This is why the
 * site can carry safety and control detail on 28 products without 28 copies
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
        "Safety edge on the leading edge, reversing travel on contact",
        "Soft bottom beam, so contact with a person or vehicle is absorbed rather than resisted",
        "Manual crank or override for operation during a power failure",
      ],
      controls: [
        "PLC control with inverter and encoder for ramped acceleration and repeatable stop positions",
        "Adjustable open and close speeds and hold-open time",
        "Activation by radar, push button, photocell or loop detector",
        "Interface for traffic lights and for interlocking with a second door",
      ],
      options: [
        "Transparent PVC vision panels",
        "Frame and guide material selected for the environment",
        "Interlock pairing for airlocks and clean transitions",
        "Internal or external mounting depending on configuration",
      ],
      maintenance: [
        "Curtain, guides and bottom beam should be inspected on a scheduled interval — cycle count, not calendar time, drives wear",
        "Safety devices should be function-tested at every service visit",
        "Consumables are the curtain, the bottom beam seal and the drive transmission",
      ],
    },
  },
  {
    id: "fold-up-high-speed-doors",
    familyId: "high-speed-doors",
    name: "Fold-Up High Speed Doors",
    principle:
      "The curtain gathers into horizontal folds instead of rolling, giving a shallower stack above the opening — which is what makes tall and wide openings practical.",
    defaults: {
      safety: [
        "Photoelectric protection across the threshold",
        "Safety edge on the leading edge, reversing travel on contact",
        "Manual crank for operation during a power failure",
      ],
      controls: [
        "PLC control with inverter and encoder",
        "Adjustable open and close speeds",
        "Activation by radar, push button or infrared",
      ],
      options: [
        "Transparent PVC vision windows",
        "Motor rating selected against the leaf size and duty",
        "Internal or external mounting",
      ],
      maintenance: [
        "Fold straps, curtain and track should be inspected on a scheduled interval",
        "Safety devices should be function-tested at every service visit",
      ],
    },
  },
  {
    id: "spiral-high-speed-doors",
    familyId: "high-speed-doors",
    name: "Spiral High Speed Doors",
    principle:
      "Rigid insulated panels guided into a spiral above the opening, so the leaf never rests on itself. A rigid door that keeps flexible-door cycle times.",
    defaults: {
      safety: [
        "Light curtain and photocell across the threshold",
        "Safety edge on the leading panel",
        "Controlled acceleration and deceleration, so a rigid leaf is not snatched",
        "Manual release for operation during a power failure",
      ],
      controls: [
        "Frequency-controlled drive with adjustable speeds",
        "Activation by radar, photocell, loop detector or push button",
        "Adjustable hold-open time",
      ],
      options: [
        "Transparent panel configuration for sight of the far side",
        "Insulation configuration selected against the thermal requirement",
        "Panel finish to requirement",
      ],
      maintenance: [
        "Spiral track, panel rollers and seals should be inspected on a scheduled interval",
        "Safety devices should be function-tested at every service visit",
      ],
    },
  },
  {
    id: "rigid-panel-high-speed-doors",
    familyId: "high-speed-doors",
    name: "Rigid Panel High Speed Doors",
    principle:
      "Double-skin insulated panels instead of a fabric curtain, for openings that need structural rigidity and thermal separation as well as speed.",
    defaults: {
      safety: [
        "Photocell across the threshold and safety edge on the leading panel",
        "Emergency stop",
        "Controlled acceleration and deceleration, so a heavier panel is not snatched",
      ],
      controls: [
        "PLC control with inverter and encoder",
        "Adjustable open and close speeds",
        "Activation by radar, infrared or push button",
      ],
      options: [
        "Vision panels in selected sections",
        "Panel finish to requirement",
        "Interlock pairing for temperature-separated areas",
      ],
      maintenance: [
        "Panel joints, rollers and guides should be inspected on a scheduled interval",
        "Seals are a consumable in temperature-separated openings",
      ],
    },
  },
  {
    id: "controlled-environment-high-speed-doors",
    familyId: "high-speed-doors",
    name: "Controlled Environment High Speed Doors",
    principle:
      "The same rapid-door mechanism built for the room rather than the traffic — hygienic and cleanable for classified areas, insulated and heated for sub-zero ones.",
    defaults: {
      safety: [
        "Photocells across the threshold",
        "Safety edge on the leading edge, reversing travel on contact",
        "Manual override for operation during a power failure",
      ],
      controls: [
        "Frequency-controlled drive with adjustable speeds",
        "Activation by radar, touchless sensor, pull switch, loop or remote",
        "Interlock pairing where the opening forms one side of an airlock",
      ],
      options: [
        "Vision panel",
        "Anti-condensation and guide heating where the environment requires it",
        "Stainless steel and hygienic-coated construction",
      ],
      maintenance: [
        "Seals, curtain and guides should be inspected on a scheduled interval — sealing is what the door is bought for, so it is what gets checked",
        "Cleaning regime should be agreed with the room owner, since it is the room, not the door, that sets it",
        "Safety devices should be function-tested at every service visit",
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
    id: "solid-steel-rolling-shutters",
    familyId: "rolling-shutters",
    name: "Solid Steel Rolling Shutters",
    principle:
      "An interlocking steel slat curtain rolling onto a barrel above the opening. The three lines here differ by what the steel is protected with, not by how the shutter works.",
    defaults: {
      safety: [
        "Safety edge on the bottom rail where the shutter is motorised",
        "Obstruction detection on the operator",
        "Manual override on every powered shutter, by hand chain, crank or release",
        "Guides sized to retain the curtain under the load the opening imposes",
      ],
      controls: [
        "Push button station, key switch or remote handset",
        "Adjustable open and close limits set at commissioning",
        "Single-phase or three-phase supply selected against curtain weight",
      ],
      options: [
        "Locking arrangements at the bottom rail",
        "Powder coat finish to a specified colour",
        "Vision or ventilation slats within the curtain",
        "Motorisation of an existing manual shutter",
      ],
      maintenance: [
        "Guides and bottom rail should be kept clear and inspected on a scheduled interval",
        "Curtain, barrel bearings and the drive are the wear points on a high-cycle shutter",
        "Coating condition decides service life on a steel curtain, so damage is worth making good early",
      ],
    },
  },
  {
    id: "architectural-rolling-shutters",
    familyId: "rolling-shutters",
    name: "Aluminium & Stainless Shutters",
    principle:
      "A non-ferrous curtain, chosen where appearance, weight or corrosion resistance decides the specification rather than cost.",
    defaults: {
      safety: [
        "Safety edge on the bottom rail where the shutter is motorised",
        "Obstruction detection on the operator",
        "Manual override on every powered shutter, by hand chain, crank or release",
        "Guides sized to retain the curtain under the load the opening imposes",
      ],
      controls: [
        "Push button station, key switch or remote handset",
        "Adjustable open and close limits set at commissioning",
        "Single-phase or three-phase supply selected against curtain weight",
      ],
      options: [
        "Anodised, powder coated or RAL colour finish",
        "Brushed, satin or polished stainless finish",
        "Locking arrangements at the bottom rail",
        "Motorisation with remote or access control release",
      ],
      maintenance: [
        "Guides and bottom rail should be kept clear and inspected on a scheduled interval",
        "A non-ferrous curtain is cleaned rather than repainted, and the cleaning method should suit the finish",
      ],
    },
  },
  {
    id: "open-curtain-rolling-shutters",
    familyId: "rolling-shutters",
    name: "Perforated, Vision & Grille Curtains",
    principle:
      "An open curtain that secures the opening while letting light, air or sight through it. What changes between these lines is how much of the curtain is open, and in what pattern.",
    defaults: {
      safety: [
        "Safety edge on the bottom rail where the shutter is motorised",
        "Obstruction detection on the operator",
        "Manual override on every powered shutter, by hand chain, crank or release",
        "Guides sized to retain the curtain under the load the opening imposes",
      ],
      controls: [
        "Push button station, key switch or remote handset",
        "Adjustable open and close limits set at commissioning",
        "Single-phase or three-phase supply selected against curtain weight",
      ],
      options: [
        "Perforation pattern and open area selected against the visibility required",
        "Mixed curtain combining solid, perforated and vision sections",
        "Powder coat or anodised finish",
        "Locking arrangements at the bottom rail",
      ],
      maintenance: [
        "An open curtain collects debris in the guides more readily than a solid one and benefits from more frequent cleaning",
        "Guides, bottom rail and barrel bearings should be inspected on a scheduled interval",
      ],
    },
  },
  {
    id: "transparent-rolling-shutters",
    familyId: "rolling-shutters",
    name: "Transparent Shutters",
    principle:
      "A polycarbonate curtain that closes the opening while leaving the display behind it visible. Specified where the shop front has to keep working after hours.",
    defaults: {
      safety: [
        "Safety edge on the bottom rail",
        "Obstruction detection on the operator",
        "Manual emergency operation where the configuration allows it",
      ],
      controls: [
        "Primarily motorised operation, by push button, key switch or remote",
        "Adjustable open and close limits set at commissioning",
      ],
      options: [
        "Clear or tinted polycarbonate",
        "Aluminium connector and bottom profile finish to requirement",
        "Locking arrangements at the bottom profile",
      ],
      maintenance: [
        "Polycarbonate is cleaned rather than painted, and the cleaning agent has to suit the material because solvents craze it",
        "Connectors, guides and the bottom profile should be inspected on a scheduled interval",
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
        "Seals are a consumable and decide whether the thermal performance is retained",
        "Guides and barrel bearings should be inspected on a scheduled interval",
      ],
    },
  },
  {
    id: "industrial-rolling-shutters",
    familyId: "rolling-shutters",
    name: "Industrial & Wind-Rated Shutters",
    principle:
      "An engineered shutter rather than a catalogue size: curtain, guide, shaft and drive are sized together against the opening and the load it carries.",
    defaults: {
      safety: [
        "Photocell across the opening",
        "Safety edge on the bottom rail",
        "Emergency stop",
        "Emergency manual override independent of the power supply",
        "Anti-drop device on the barrel assembly",
      ],
      controls: [
        "Industrial push button station with key switch isolation",
        "Adjustable limits set at commissioning against the engineered travel",
        "Interface for traffic signalling and for access control release",
      ],
      options: [
        "Wind locks and reinforced end locks",
        "Wicket door for pedestrian passage",
        "Intermediate mullion on a wide opening",
        "Vision section within the curtain",
      ],
      maintenance: [
        "Guides, wind locks and end locks carry the load on an exposed shutter and are the first things to inspect",
        "Shaft bearings, brackets and the drive should be inspected on an interval driven by cycle count",
        "Anchoring and structural fixings should be checked periodically on any wind-rated installation",
      ],
    },
  },
  {
    id: "counter-rolling-shutters",
    familyId: "rolling-shutters",
    name: "Counter & Service Shutters",
    principle:
      "A small shutter closing a service opening rather than a doorway. Light curtain, compact headbox, and a finish that suits the room it sits in.",
    defaults: {
      safety: [
        "Bottom rail profiled so it can be closed by hand without a trap risk",
        "Obstruction detection where the shutter is motorised",
        "Manual override on every powered shutter",
      ],
      controls: [
        "Manual, gear or motorised operation selected against the curtain size",
        "Key switch or push button where motorised",
      ],
      options: [
        "Integral lock at the bottom rail",
        "Stainless, anodised or powder coated finish",
        "Face mounted, between jamb or recessed installation",
      ],
      maintenance: [
        "A counter shutter is operated by hand many times a day, so the guides and the bottom rail lock are the wear points",
        "Finish should be cleaned with an agent that suits the material, particularly stainless in a food area",
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

  {
    id: "automatic-swing-doors",
    familyId: "entrance-automation",
    name: "Automatic Swing Doors",
    principle:
      "A powered operator on a hinged pedestrian leaf, for openings where a sliding track cannot be fitted or the door must also work as a conventional swing door.",
    defaults: {
      safety: [
        "Presence sensing on both sides of the swing arc",
        "Low-energy operation, or guarding where full-power operation is required",
        "Obstruction detection stops and reverses the leaf",
        "Manual operation retained without power",
      ],
      controls: [
        "Activation by push plate, wave sensor, reader or remote release",
        "Adjustable opening angle, speed and hold-open time",
        "Mode selector including hold-open and manual-only",
      ],
      options: [
        "Hands-free elbow, foot or wave activation",
        "Concealed overhead or surface-mounted operator",
        "Double-leaf sequencing",
        "Integration with access control and nurse-call systems",
      ],
      maintenance: [
        "Operator, arm linkage and sensors should be inspected on a scheduled interval",
        "Hold-open and obstruction behaviour must be function-tested at every visit",
      ],
    },
  },
  {
    id: "hermetic-cleanroom-doors",
    familyId: "entrance-automation",
    name: "Hermetic & Cleanroom Doors",
    principle:
      "An automatic leaf that seals against its frame on all four edges, so the opening can hold a pressure differential and a cleanliness classification.",
    defaults: {
      safety: [
        "Presence detection in the threshold",
        "Obstruction detection stops and reverses the leaf",
        "Defined behaviour on alarm, agreed against the containment and escape strategy",
        "Manual operation available without power",
      ],
      controls: [
        "Hands-free activation by wave sensor, elbow switch or foot control",
        "Airlock interlocking so paired doors are never open together",
        "Access control and mode selection from a controlled position",
      ],
      options: [
        "Flush vision panels with concealed frames",
        "Stainless steel or powder-coated hygienic facings",
        "Interlocked pairing for gowning rooms and material airlocks",
        "Integration with pressure monitoring and BMS alarms",
      ],
      maintenance: [
        "Seals are the consumable that determines whether the opening still holds its differential",
        "Interlock and sensor function must be tested as part of the area's periodic qualification",
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

];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  string,
  Category
>;
