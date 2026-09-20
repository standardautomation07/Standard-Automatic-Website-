import type { Spec, SpecGroup } from "@/lib/types";

/**
 * Access Control specification tables.
 *
 * None of these products had issued technical data, and none names a model.
 * What is published is the range current manufacturers document for the
 * product type — worded as typical, up to, or depending on model — and the
 * source for every row is recorded in
 * research/access-entrance-technical-sources.md.
 *
 * Labels and groups are the `vehicleAccess` and `pedestrianAccess` schemas',
 * unchanged. The vehicle schema is shared by boom barriers, bollards and
 * retractable barriers, so some rows do not apply to a given product; those
 * say "Not applicable" rather than being left as though the figure were
 * missing.
 *
 * Status follows the classification the brief asked for:
 *
 *  - CONFIRMED    — a defensible statement that holds across the product type.
 *  - CONFIGURABLE — a range or capability that depends on the model chosen.
 *  - TBC          — site or configuration dependent with no figure, or not
 *                   verified from documentation and left unanswered.
 *
 * No IP rating, cycle rating, impact rating, certificate or standard is
 * claimed for a Standard Automatic Solutions product. Compliance rows state
 * the framework and defer to the supplied operator's own declaration.
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

/* ------------------------------------------------------- Boom Barriers */

const boomBarriers: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable(
        "Boom length or barrier width",
        "Typically 2–9 m depending on model; booms over about 5 m are supplied in two sections",
      ),
      fixed("Bollard diameter", "Not applicable"),
      fixed("Bollard height above ground", "Not applicable"),
      dependent(
        "Foundation depth required",
        "Site dependent; set by the cabinet base plate and the supplied operator's foundation drawing",
      ),
      configurable(
        "Cabinet or body dimensions",
        "Depending on model; a typical cabinet is around 400 × 300 × 1,200 mm",
      ),
    ],
  },
  {
    group: "Performance",
    specs: [
      configurable(
        "Opening time",
        "Typically 1.5–6 s for booms up to about 6 m, adjustable on the control unit; longer booms take up to 10–18 s depending on model",
      ),
      configurable("Closing time", "As opening time; adjustable on the control unit"),
      configurable(
        "Mean cycles between failure",
        "Manufacturer ratings range from about 1,000,000 to 10,000,000 cycles depending on model; continuous-duty models are common",
      ),
      fixed(
        "Impact resistance",
        "Not impact rated. A boom barrier is a traffic control device, not a vehicle security barrier",
        "Only for products actually tested to an impact standard.",
      ),
    ],
  },
  {
    group: "Construction",
    specs: [
      configurable(
        "Body material and finish",
        "Galvanized or painted steel cabinet; stainless steel option on some models",
      ),
      configurable(
        "Boom or barrier material",
        "Extruded aluminium boom, round or elliptical profile depending on model, painted white",
      ),
      configurable(
        "Drive mechanism",
        "Electromechanical or hydraulic operator with spring balancing; brushless DC motors and an encoder for position and obstacle detection on current models",
      ),
      configurable(
        "Reflective marking and lighting",
        "Reflective strips on the boom; LED boom lighting and a cover-mounted warning or traffic light available on most models",
      ),
    ],
  },
  {
    group: "Power and environment",
    specs: [
      configurable(
        "Supply voltage",
        "230 V AC 50/60 Hz single phase; wide-range 100–240 V AC on some models",
      ),
      configurable(
        "Power consumption",
        "Typically 40–270 W depending on model; standby around 2.5 W on current models",
      ),
      configurable("Battery backup", "Optional battery backup on most models"),
      configurable("IP rating", "Typically IP54 depending on model; IP56 on some"),
      fixed("Operating temperature", "-20 °C to +55 °C typical"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed(
        "Activation devices",
        "Push button, remote control, key switch, reader, intercom or gatehouse control through open, close, step and stop inputs; radio receiver connector",
      ),
      fixed("Loop detectors", "Two loop detector inputs, integrated on most models"),
      configurable(
        "Access system interface",
        "Dry-contact inputs for any access control system; RS485 or Modbus on some models",
      ),
      fixed("Manual release", "Key-operated manual release for hand operation on power failure"),
    ],
  },
  {
    group: "Safety",
    specs: [
      fixed("Photocells", "Photocell input as standard; photocells fitted to the installation"),
      fixed("Ground loop safety", "Safety loop input holds the boom open while a vehicle is beneath it"),
      configurable(
        "Behaviour on power failure",
        "Boom can be released and raised by hand; optional battery backup keeps the barrier operating",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "Powered vehicle barriers fall under EN 12453 and the Machinery Directive; the supplied operator's own declaration applies",
        "EN 12453 applies to powered vehicle barriers where they form part of a gate installation.",
      ),
      dependent("Conformity marking", "As applicable to the supplied operator and market"),
      dependent("Certificate reference", "Manufacturer's declaration for the supplied model; available on request"),
    ],
  },
];

/* ------------------------------------------------------------ Bollards */

const bollards: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      fixed(
        "Boom length or barrier width",
        "Not applicable; the protected width is set by the number and spacing of bollards",
      ),
      configurable("Bollard diameter", "Typically 200–275 mm depending on model"),
      configurable("Bollard height above ground", "Typically 500–800 mm depending on model"),
      dependent(
        "Foundation depth required",
        "Typically around 1,000 mm including the foundation box; set by the supplied model's foundation drawing and site drainage",
      ),
      configurable(
        "Cabinet or body dimensions",
        "Drive housed in the bollard body or in a remote power-pack cabinet, depending on model",
      ),
    ],
  },
  {
    group: "Performance",
    specs: [
      configurable("Opening time", "Typically 5–9 s to rise, depending on model and height"),
      configurable(
        "Closing time",
        "Typically 3.5–9 s to lower; rapid descent of about 1.2–1.5 s available on some hydraulic models",
      ),
      dependent(
        "Mean cycles between failure",
        "Not published as a cycle count; manufacturers rate models from semi-intensive to intensive use",
      ),
      configurable(
        "Impact resistance",
        "Ranges from around 10 kJ on light-duty electromechanical models to over 100 kJ on hydraulic security models; crash-tested ratings apply only to the specific certified model",
        "Only for products actually tested to an impact standard.",
      ),
    ],
  },
  {
    group: "Construction",
    specs: [
      configurable(
        "Body material and finish",
        "Painted carbon steel with cataphoresis primer and polyester powder finish; AISI 316 stainless steel option",
      ),
      fixed("Boom or barrier material", "Steel or stainless steel cylinder"),
      configurable(
        "Drive mechanism",
        "Electromechanical or hydraulic, integrated in the bollard or in a remote power pack depending on model",
      ),
      configurable(
        "Reflective marking and lighting",
        "Reflective band and LED crown lighting; buzzer on some models",
      ),
    ],
  },
  {
    group: "Power and environment",
    specs: [
      configurable("Supply voltage", "230 V AC single phase, depending on model"),
      configurable(
        "Power consumption",
        "Around 300 W on electromechanical models; hydraulic models depend on the power pack",
      ),
      configurable(
        "Battery backup",
        "Optional on some models; most lower automatically on power failure so the lane is never blocked",
      ),
      configurable("IP rating", "Typically IP67 for the buried unit, depending on model"),
      configurable("Operating temperature", "-20 °C to +60 °C typical"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed(
        "Activation devices",
        "Push button, remote control, key switch, reader or gatehouse control through dry-contact inputs",
      ),
      fixed("Loop detectors", "Loop detector inputs for safety and presence loops"),
      configurable(
        "Access system interface",
        "Dry-contact inputs; traffic light and interlock outputs on the control unit",
      ),
      configurable(
        "Manual release",
        "Manual lowering by key; electromechanical models lower automatically on power failure",
      ),
    ],
  },
  {
    group: "Safety",
    specs: [
      fixed("Photocells", "Photocell input on the control unit"),
      fixed("Ground loop safety", "Safety loop holds the bollard down while a vehicle is over it"),
      configurable(
        "Behaviour on power failure",
        "Lowers automatically on most models, leaving the lane open; hydraulic models lower by manual release",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "No single product standard governs rising bollards; crash-rated models are tested to PAS 68, IWA 14-1 or ASTM F2656 per model, and the supplied unit's own documentation applies",
        "EN 12453 applies to powered vehicle barriers where they form part of a gate installation.",
      ),
      dependent("Conformity marking", "As applicable to the supplied unit and market"),
      dependent("Certificate reference", "Crash-test or manufacturer's documentation for the supplied model; available on request"),
    ],
  },
];

/* ------------------------------------------------ Retractable Barriers */

const retractableBarriers: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable(
        "Boom length or barrier width",
        "Closed width typically 3.5–30 m depending on model; retracts to a short stack against the boundary",
      ),
      fixed("Bollard diameter", "Not applicable"),
      fixed("Bollard height above ground", "Not applicable"),
      dependent(
        "Foundation depth required",
        "Site dependent; a level running surface is needed, with a guide track set into it on tracked models",
      ),
      configurable(
        "Cabinet or body dimensions",
        "Barrier height typically 1.0–2.5 m depending on model, 1.6 m being common; the drive is housed in the leading post",
      ),
    ],
  },
  {
    group: "Performance",
    specs: [
      configurable(
        "Opening time",
        "Set by the width and the running speed; powered models run at around 17–19 m/min",
      ),
      configurable("Closing time", "As opening time"),
      dependent(
        "Mean cycles between failure",
        "Not published as a cycle count; supplier ratings refer to the running gear rather than the barrier",
      ),
      fixed(
        "Impact resistance",
        "Not impact rated. A retractable barrier marks and holds a line; it is not a vehicle security barrier",
        "Only for products actually tested to an impact standard.",
      ),
    ],
  },
  {
    group: "Construction",
    specs: [
      configurable(
        "Body material and finish",
        "Stainless steel, brushed, or powder-coated aluminium alloy, depending on model",
      ),
      configurable(
        "Boom or barrier material",
        "Folding lattice in the same material as the posts",
      ),
      configurable(
        "Drive mechanism",
        "Powered models: motor in the leading post driving rubber-tyred wheels, trackless or on a single or double guide track; manual models are pushed by hand",
      ),
      configurable(
        "Reflective marking and lighting",
        "Warning lamp on the leading post; LED message display available on some models",
      ),
    ],
  },
  {
    group: "Power and environment",
    specs: [
      configurable("Supply voltage", "220–230 V AC 50 Hz single phase on powered models"),
      configurable("Power consumption", "Motor typically 370–750 W depending on model and width"),
      fixed("Battery backup", "Not normally fitted; the barrier is released and moved by hand on power failure"),
      dependent("IP rating", "Model dependent", "Not stated in the supplier documentation reviewed; confirmed against the model quoted."),
      configurable("Operating temperature", "Typically -25 °C to +75 °C, depending on model"),
    ],
  },
  {
    group: "Control",
    specs: [
      configurable(
        "Activation devices",
        "Remote control as standard on powered models, typically 30–50 m range; push button or gatehouse control through the control unit",
      ),
      fixed("Loop detectors", "Not normally fitted; the line is opened and closed on a time or shift basis"),
      configurable("Access system interface", "Dry-contact input on the control unit, depending on model"),
      fixed("Manual release", "Clutch key releases the drive so the barrier can be moved by hand"),
    ],
  },
  {
    group: "Safety",
    specs: [
      configurable(
        "Photocells",
        "Infrared anti-collision sensing on the leading post, stopping the barrier around 30–40 cm from an obstacle",
      ),
      fixed("Ground loop safety", "Not applicable"),
      fixed("Behaviour on power failure", "Stops in place; released by the clutch key and moved by hand"),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "Powered folding barriers fall under the powered-gate safety framework; the supplied unit's own documentation applies",
        "EN 12453 applies to powered vehicle barriers where they form part of a gate installation.",
      ),
      dependent("Conformity marking", "As applicable to the supplied unit and market"),
      dependent("Certificate reference", "Supplier documentation for the supplied model; available on request"),
    ],
  },
];

/* ---------------------------------------------------- Tripod Turnstiles */

const tripodTurnstiles: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable("Clear passage width", "Typically 450–560 mm depending on model"),
      dependent(
        "Accessible lane width",
        "Provided by a separate swing gate alongside the bank, sized to the accessibility requirement",
        "At least one wide lane is normally required per bank.",
      ),
      configurable("Housing length", "Typically 700–1,300 mm depending on model"),
      configurable("Housing width", "Typically 180–240 mm depending on model"),
      configurable("Housing height", "Typically 920–1,000 mm; arm at about 750 mm"),
    ],
  },
  {
    group: "Throughput",
    specs: [
      configurable(
        "Throughput",
        "Typically 20–25 persons/min, depending on the access control system's response and the users",
      ),
      fixed("Opening time", "Unlocks on a valid read; the user turns the arm"),
      fixed("Closing time", "Re-locks after one rotation of the arm"),
      configurable(
        "Mean cycles between failure",
        "Manufacturer ratings of up to 5,000,000 cycles with recommended maintenance, depending on model",
      ),
    ],
  },
  {
    group: "Construction",
    specs: [
      configurable(
        "Housing material and finish",
        "Painted steel or stainless steel housing with stainless top cover; full AISI 304 or 316 stainless options for outdoor and coastal sites",
      ),
      fixed("Arm or wing material", "AISI 304 stainless steel arms"),
      configurable(
        "Mechanism",
        "Electromagnetically locked tripod with locking cams; unidirectional as standard, bidirectional as an option; motorised arm assistance on some models",
      ),
      configurable(
        "Reader mounting provision",
        "Space in the top cover and the housing for readers, keypads and collectors; integration kits per model",
      ),
    ],
  },
  {
    group: "Power and environment",
    specs: [
      fixed("Supply voltage", "100–240 V AC single phase 50/60 Hz; 24 V DC control circuit"),
      configurable(
        "Power consumption",
        "Typically under 20 W; up to around 85 W with motorised arms, and higher on some models",
      ),
      configurable("IP rating", "Typically IP44 depending on model"),
      configurable(
        "Operating temperature",
        "Typically -10 °C to +50 °C; heating options extend the range on some models",
      ),
      configurable("Indoor or outdoor", "Indoor as standard; outdoor versions in stainless steel with a weather-rated housing"),
    ],
  },
  {
    group: "Control",
    specs: [
      fixed("Reader interface", "Dry-contact input per direction from any access control reader; optional IP connectivity on some models"),
      fixed("Signal type", "Volt-free contacts for passage request and passage confirmation"),
      configurable("Direction control", "Unidirectional as standard; bidirectional and free-exit configurations available"),
      configurable("Indicators and counting", "Red and green status lights with direction pictograms; passage count output on some models"),
    ],
  },
  {
    group: "Safety and egress",
    specs: [
      configurable(
        "Behaviour on power failure",
        "Configurable per direction: free rotation, or a drop-arm that falls to clear the lane; the arm is reset by hand or by motor when power returns",
      ),
      dependent(
        "Behaviour on fire alarm",
        "Set by the building's fire strategy; a fire alarm input releases the lane where required",
      ),
      fixed("Emergency release", "Drop-arm or free-rotation release on loss of power or on the emergency input"),
      configurable(
        "Obstruction and tailgate detection",
        "Anti-return device prevents reverse rotation; jump-over and crawl-under detection available on some models",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "No single product standard governs turnstiles; escape-route behaviour is set by the building's fire strategy and the supplied unit's own documentation applies",
        "Escape route behaviour is set by the building's fire strategy.",
      ),
      dependent("Conformity marking", "As applicable to the supplied unit and market"),
      dependent("Certificate reference", "Manufacturer's documentation for the supplied model; available on request"),
    ],
  },
];

/* ------------------------------------------------------- Flap Barriers */

const flapBarriers: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable("Clear passage width", "Typically 500–650 mm for a standard lane, depending on model"),
      configurable(
        "Accessible lane width",
        "Typically 900 mm, with some models adjustable to about 950 mm",
        "At least one wide lane is normally required per bank.",
      ),
      configurable("Housing length", "Typically 1,400–1,600 mm depending on model"),
      configurable("Housing width", "Typically 200–500 mm per housing depending on model"),
      configurable("Housing height", "Typically 1,000–1,050 mm; glass obstacles from 900 mm up to 1,700 mm on some models"),
    ],
  },
  {
    group: "Throughput",
    specs: [
      configurable(
        "Throughput",
        "Typically 25–30 persons/min per lane, depending on the access control system's response and the users",
      ),
      configurable("Opening time", "Around 0.9–1.2 s depending on model"),
      configurable("Closing time", "Around 0.9–1.2 s depending on model"),
      configurable(
        "Mean cycles between failure",
        "Manufacturer ratings of up to 5,000,000 cycles with recommended maintenance, depending on model",
      ),
    ],
  },
  {
    group: "Construction",
    specs: [
      configurable(
        "Housing material and finish",
        "Brushed AISI 304 stainless steel housing on a zinc-plated steel frame; painted finishes available on some models",
      ),
      fixed("Arm or wing material", "Tempered glass obstacles, typically 10 mm, swinging or sliding clear of the lane"),
      configurable(
        "Mechanism",
        "DC motor with epicyclic gearbox and electromagnetic brake per obstacle; controlled acceleration and deceleration, locking against forced entry",
      ),
      configurable("Reader mounting provision", "Reader integration in the housing or on an extension housing; support posts for third-party readers"),
    ],
  },
  {
    group: "Power and environment",
    specs: [
      fixed("Supply voltage", "110–240 V AC single phase 50/60 Hz; 24 V DC motors"),
      configurable("Power consumption", "Typically around 50 W standby, 170 W per cycle and 300 W maximum per lane, depending on model"),
      configurable("IP rating", "Typically IP40; indoor product"),
      configurable("Operating temperature", "Typically 0 °C to +50 °C"),
      fixed("Indoor or outdoor", "Indoor; sheltered lobbies and reception areas"),
    ],
  },
  {
    group: "Control",
    specs: [
      configurable("Reader interface", "Dry-contact input per direction from any access control reader; Ethernet or USB interface on some models"),
      fixed("Signal type", "Volt-free contacts for passage authorisation, passage confirmation, fraud and fault"),
      fixed("Direction control", "Bidirectional, with each direction independently free, controlled or locked"),
      configurable("Indicators and counting", "Orientation and status pictograms on the housing; passage counting through the controller"),
    ],
  },
  {
    group: "Safety and egress",
    specs: [
      configurable(
        "Behaviour on power failure",
        "Obstacles release for egress; battery backup opens them automatically on some models",
      ),
      dependent(
        "Behaviour on fire alarm",
        "Set by the building's fire strategy; a fire alarm input opens or releases the lane where required",
      ),
      configurable("Emergency release", "Push-to-open egress mode and manual release, depending on model"),
      configurable(
        "Obstruction and tailgate detection",
        "Infrared photocell matrix tracks each user through the lane, detects tailgating and wrong-way entry, and holds the obstacles clear of a person in the lane",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "No single product standard governs speed gates; escape-route behaviour is set by the building's fire strategy and the supplied unit's own documentation applies",
        "Escape route behaviour is set by the building's fire strategy.",
      ),
      dependent("Conformity marking", "As applicable to the supplied unit and market"),
      dependent("Certificate reference", "Manufacturer's documentation for the supplied model; available on request"),
    ],
  },
];

/* ------------------------------------------------ Full Height Turnstiles */

const fullHeightTurnstiles: SpecGroup[] = [
  {
    group: "Dimensions",
    specs: [
      configurable("Clear passage width", "Typically 550–700 mm per lane depending on model and rotor configuration"),
      dependent(
        "Accessible lane width",
        "Provided by a separate full-height swing gate alongside the turnstile, sized to the accessibility requirement",
        "At least one wide lane is normally required per bank.",
      ),
      configurable("Housing length", "Typically 1,200–1,700 mm for a single lane; up to about 2,400 mm for a double lane"),
      configurable("Housing width", "Typically 1,400–1,600 mm for a single lane; around 2,400 mm for a double interlocking lane"),
      configurable("Housing height", "Typically 2,300–2,400 mm overall, giving about 2,100 mm passage height"),
    ],
  },
  {
    group: "Throughput",
    specs: [
      dependent(
        "Throughput",
        "Not published by the manufacturers reviewed; set by the reader response and the user, and lower than a tripod because the user walks the full rotation",
      ),
      fixed("Opening time", "Unlocks on a valid read; the user pushes the rotor through"),
      fixed("Closing time", "Re-locks after one 120° or 90° rotation"),
      configurable(
        "Mean cycles between failure",
        "Manufacturer ratings of around 1,000,000 cycles, depending on model",
      ),
    ],
  },
  {
    group: "Construction",
    specs: [
      configurable(
        "Housing material and finish",
        "Galvanized and painted steel as standard; AISI 304 or 316 stainless steel for outdoor and coastal sites",
      ),
      configurable("Arm or wing material", "Steel or stainless steel rotor arms, typically about 600 mm long and 38 mm diameter"),
      configurable(
        "Mechanism",
        "Manually pushed rotor with 3 arms at 120° or 4 arms at 90°, electromagnetically locked in each position, with a damper for controlled rotation",
      ),
      configurable("Reader mounting provision", "Reader box or support post on the housing for each direction"),
    ],
  },
  {
    group: "Power and environment",
    specs: [
      configurable("Supply voltage", "230 V AC single phase 50/60 Hz, depending on model"),
      configurable("Power consumption", "Low; typically 50–70 W maximum per rotor"),
      configurable("IP rating", "Typically IP43–IP44 depending on model"),
      configurable("Operating temperature", "Typically -10 °C to +50 °C, depending on model"),
      fixed("Indoor or outdoor", "Indoor or outdoor; the standard product is intended for site perimeters and yard gates"),
    ],
  },
  {
    group: "Control",
    specs: [
      configurable("Reader interface", "Dry-contact input per direction from any access control reader; CAN bus or serial interface on some models"),
      fixed("Signal type", "Volt-free contacts for passage request and passage confirmation"),
      fixed("Direction control", "Bidirectional, with each direction independently free, controlled or locked"),
      configurable("Indicators and counting", "Traffic-light indicators or LED pictograms per direction; passage counting through the controller"),
    ],
  },
  {
    group: "Safety and egress",
    specs: [
      configurable(
        "Behaviour on power failure",
        "Selectable per model: fail-safe, with the rotor free to turn, or fail-secure, with the rotor locked",
      ),
      dependent(
        "Behaviour on fire alarm",
        "Set by the building's fire strategy; an emergency input unlocks the rotor for exit where required",
      ),
      configurable("Emergency release", "Manual release kit on some models; fail-safe configuration for escape routes"),
      configurable(
        "Obstruction and tailgate detection",
        "Anti-passback mechanism prevents reverse rotation once a passage has started; improper-transit alarm on some models",
      ),
    ],
  },
  {
    group: "Compliance",
    specs: [
      fixed(
        "Product standard",
        "No single product standard governs turnstiles; escape-route behaviour is set by the building's fire strategy and the supplied unit's own documentation applies",
        "Escape route behaviour is set by the building's fire strategy.",
      ),
      dependent("Conformity marking", "As applicable to the supplied unit and market"),
      dependent("Certificate reference", "Manufacturer's documentation for the supplied model; available on request"),
    ],
  },
];

/** Authored access control tables, merged into `authoredSpecs`. */
export const accessSpecs: Record<string, SpecGroup[]> = {
  "boom-barriers": boomBarriers,
  "bollards": bollards,
  "retractable-barriers": retractableBarriers,
  "tripod-turnstiles": tripodTurnstiles,
  "flap-barriers": flapBarriers,
  "full-height-turnstiles": fullHeightTurnstiles,
};

// Kept for the products that follow in this file.
void unanswered;
