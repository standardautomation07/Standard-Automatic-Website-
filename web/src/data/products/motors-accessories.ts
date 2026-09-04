import type { Product } from "@/lib/types";

/**
 * Motors & Accessories — 10 products.
 *
 * This whole line was live on the old server but commented out of its
 * navigation. Per the brief the products are retained rather than dropped,
 * and every record carries `pendingConfirmation` until the business confirms
 * the line is still active. No motor here publishes a torque, power or duty
 * figure, because none is available from confirmed material — inventing one
 * would be worse than omitting it.
 */
const pending = { pendingConfirmation: true } as const;

export const motorProducts: Product[] = [
  {
    slug: "side-motor-with-chain-drive",
    category: "motors-accessories",
    name: "Side Motor with Chain Drive",
    tagline: "Shaft-driven power for heavy shutter curtains.",
    summary:
      "Side-mounted shutter operators driving the barrel shaft through a chain and sprocket, for heavy steel curtains and large openings.",
    overview: [
      "A side motor mounts on the end plate beside the barrel and drives the shaft through a chain and sprocket. Because the drive is external and geared down, it can move much heavier curtains than a motor housed inside the barrel, which is why it is the standard arrangement on large industrial shutters.",
      "Chain drives are tolerant of misalignment and easy to service in place, and the ratio can be selected to trade travel speed against available torque.",
    ],
    benefits: [
      { title: "Heavy curtains", body: "Geared external drive handles the large steel curtains used on industrial openings." },
      { title: "Serviceable in place", body: "Chain and sprocket can be inspected, tensioned and replaced without dismantling the barrel." },
      { title: "Selectable ratio", body: "Sprocket ratio trades travel speed against torque to suit the curtain." },
      { title: "Manual override", body: "Chain hoist operation when there is no power." },
    ],
    applications: ["Heavy industrial rolling shutters", "Large warehouse openings", "Motorising existing manual shutters"],
    specs: [],
    image: "/images/photography/motor-gears.jpg",
    imageAlt: "Close view of a geared drive assembly",
    ...pending,
    related: ["side-motor-with-gear-drive", "central-motor", "galvanized-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/side-motor-with-chain.html",
  },
  {
    slug: "side-motor-with-gear-drive",
    category: "motors-accessories",
    name: "Side Motor with Gear Drive",
    tagline: "Direct gear coupling to the barrel shaft.",
    summary:
      "Side-mounted shutter operators coupled directly to the barrel shaft through a gearbox, for heavy curtains where a chain run is undesirable.",
    overview: [
      "A gear-drive side motor couples straight to the barrel shaft instead of driving it through a chain. That removes the chain as a maintenance item and a noise source, and gives a more compact installation at the end plate.",
      "It suits heavy curtains in environments where an exposed chain would collect dust or is not acceptable — food handling areas and clean environments in particular.",
    ],
    benefits: [
      { title: "No exposed chain", body: "Direct gear coupling removes a maintenance item and a dust trap at the end plate." },
      { title: "Quieter running", body: "Enclosed gearing runs more quietly than an open chain and sprocket." },
      { title: "Compact at the end plate", body: "Less projection beside the barrel than a chain drive of equivalent capacity." },
      { title: "Manual override", body: "Hand-chain or crank release for operation during a power failure." },
    ],
    applications: ["Heavy rolling shutters", "Food and clean-area openings", "Industrial and warehouse shutters"],
    specs: [],
    image: "/images/photography/motor-gear-detail.jpg",
    imageAlt: "Close detail of a drive gear",
    ...pending,
    related: ["side-motor-with-chain-drive", "central-motor", "insulated-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/side-motor-with-gear.html",
  },
  {
    slug: "central-motor",
    category: "motors-accessories",
    name: "Central Motor",
    tagline: "Drive mounted at the centre of the barrel.",
    summary:
      "Centrally mounted shutter operators that drive the barrel from the middle of the span, balancing torque across a wide curtain.",
    overview: [
      "A central motor drives the barrel from the middle of its span rather than from one end. On a wide shutter that halves the torsional distance the shaft has to carry the load over, which reduces wind-up and keeps the curtain travelling squarely in its guides.",
      "The arrangement also removes the need for clear space at the end plates, which can matter where the opening runs close to a return wall on both sides.",
    ],
    benefits: [
      { title: "Balanced across the span", body: "Driving from the centre reduces shaft wind-up on wide curtains." },
      { title: "Squarer travel", body: "Even torque distribution helps the curtain stay aligned in its guides." },
      { title: "No end-plate clearance needed", body: "Useful where the opening sits tight against return walls on both sides." },
      { title: "Manual override", body: "Hand operation available during a power failure." },
    ],
    applications: ["Wide industrial shutters", "Openings tight against return walls", "Large commercial frontages"],
    specs: [],
    image: "/images/photography/motor-unit.jpg",
    imageAlt: "An electric drive motor unit",
    ...pending,
    related: ["side-motor-with-chain-drive", "tubular-motor", "galvanized-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/central-motor.html",
  },
  {
    slug: "tubular-motor",
    category: "motors-accessories",
    name: "Tubular Motor",
    tagline: "The drive disappears inside the barrel.",
    summary:
      "Tubular motors housed inside the shutter barrel, for light aluminium and single-wall curtains where no external drive should be visible.",
    overview: [
      "A tubular motor sits inside the barrel itself, so there is no drive unit projecting beside the shutter. On a shopfront or a domestic opening that keeps the installation clean and leaves nothing exposed on the frontage.",
      "Capacity is limited by what will fit inside the tube, so tubular motors suit light aluminium and single-wall curtains rather than heavy steel ones.",
    ],
    benefits: [
      { title: "Nothing visible", body: "The complete drive is inside the barrel, leaving the frontage clean." },
      { title: "Quiet", body: "An enclosed motor inside the tube runs quietly, which matters on domestic and retail openings." },
      { title: "Simple installation", body: "Fewer external components to align and mount at the end plates." },
      { title: "Manual override", body: "Crank or release mechanism for operation without power." },
    ],
    applications: ["Aluminium and single-wall shutters", "Shopfronts and showrooms", "Domestic and light commercial openings"],
    specs: [],
    image: "/images/photography/motor-service.jpg",
    imageAlt: "A technician servicing a drive unit",
    ...pending,
    related: ["australian-type-motor", "aluminium-rolling-shutters", "aluminium-single-wall-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/tubular-motor.html",
  },
  {
    slug: "australian-type-motor",
    category: "motors-accessories",
    name: "Australian Type Motor",
    tagline: "A compact external drive for medium shutter curtains.",
    summary:
      "Australian-type shutter operators for medium-weight curtains, mounted externally at the barrel with an integral manual release.",
    overview: [
      "The Australian-type operator is a compact externally mounted drive that sits between a tubular motor and a full side motor in capacity. It suits medium curtains that are too heavy for an in-barrel motor but do not need the size of an industrial side drive.",
      "Its integral manual release makes it straightforward to operate the shutter by hand when power is lost.",
    ],
    benefits: [
      { title: "Medium-duty capacity", body: "Handles curtains beyond tubular motor capacity without a full industrial side drive." },
      { title: "Compact mounting", body: "Small external footprint at the barrel." },
      { title: "Integral manual release", body: "Hand operation without additional hardware during a power failure." },
      { title: "Retrofit friendly", body: "Commonly used to motorise existing manual shutters." },
    ],
    applications: ["Medium commercial shutters", "Motorising existing manual shutters", "Showroom and warehouse frontages"],
    specs: [],
    image: "/images/photography/engineering-panel.jpg",
    imageAlt: "Engineer operating an industrial equipment control panel",
    ...pending,
    related: ["tubular-motor", "central-motor", "aluminium-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/australian-type-motor.html",
  },
  {
    slug: "sliding-gate-motor",
    category: "motors-accessories",
    name: "Sliding Gate Motor",
    tagline: "Rack-driven operators for sliding gate leaves.",
    summary:
      "Sliding gate operators driving a rack along the leaf, with adjustable limits, obstruction detection and manual release.",
    overview: [
      "A sliding gate operator drives a toothed rack fixed along the bottom of the leaf. Because the load is a rolling one rather than a hinged one, sizing is governed by leaf weight, roller friction and how many cycles a day the gate has to complete.",
      "Adjustable open and close limits set the travel, and obstruction detection reverses the leaf if it meets resistance during a cycle.",
    ],
    benefits: [
      { title: "Matched to leaf weight", body: "Operator selected against leaf mass and daily cycle count, not opening width alone." },
      { title: "Adjustable travel limits", body: "Open and close positions set on site to suit the installation." },
      { title: "Obstruction detection", body: "The leaf stops and reverses when it meets resistance during travel." },
      { title: "Manual release", body: "Key release to move the leaf by hand during a power failure." },
    ],
    applications: ["Automatic sliding gates", "Industrial and commercial site entrances", "Housing society gates"],
    specs: [],
    image: "/images/photography/gate-sliding.jpg",
    imageAlt: "A powered site gate across a vehicle entrance",
    ...pending,
    related: ["automatic-sliding-gates", "swing-gate-motor", "industrial-sliding-gate-motor"],
    legacyUrl: "https://www.standardautomation.in/sliding-gate-motor.html",
  },
  {
    slug: "swing-gate-motor",
    category: "motors-accessories",
    name: "Swing Gate Motor",
    tagline: "Arm, ram and underground drives for hinged leaves.",
    summary:
      "Swing gate operators in articulated arm, linear ram and underground configurations, with leaf sequencing and soft stop at both ends of travel.",
    overview: [
      "A swing gate operator has to accelerate and decelerate a hinged leaf through an arc, which loads the hinge post very differently from a rolling leaf. Articulated arms suit wide or heavy leaves, linear rams suit typical residential and light commercial leaves, and underground units keep the drive out of sight.",
      "On a double gate the controller also has to sequence the leaves so they open and close in the right order and do not clash at the meeting stile.",
    ],
    benefits: [
      { title: "Three drive types", body: "Articulated arm, linear ram or underground, chosen against leaf size and appearance." },
      { title: "Leaf sequencing", body: "Double gates are opened and closed in order so the leaves do not clash." },
      { title: "Soft start and stop", body: "Controlled acceleration and deceleration reduce load on the hinge post." },
      { title: "Manual release", body: "Each operator releases so the leaves can be swung by hand." },
    ],
    applications: ["Swing gates, single and double leaf", "Residential and villa entrances", "Institutional and office gates"],
    specs: [],
    image: "/images/photography/gate-driveway.jpg",
    imageAlt: "A gated driveway entrance",
    ...pending,
    related: ["swing-gates", "sliding-gate-motor", "automatic-sliding-gates"],
    legacyUrl: "https://www.standardautomation.in/swing-gate-motor.html",
  },
  {
    slug: "sliding-glass-door-motor",
    category: "motors-accessories",
    name: "Sliding Glass Door Motor",
    tagline: "Header operators for automatic pedestrian doors.",
    summary:
      "Belt-driven header operators for automatic sliding glass doors, with sensor inputs, adjustable hold-open and defined power-failure behaviour.",
    overview: [
      "A sliding glass door operator lives in the header above the opening and drives the leaves along a track by belt. Compared with a gate operator it is a light, high-cycle duty: it may run several thousand times a day, quietly, in an occupied lobby.",
      "The controller manages opening width, hold-open time and part-open modes, and defines what the door does when power is lost — released for manual push, or driven open, depending on the building's escape strategy.",
    ],
    benefits: [
      { title: "High cycle, low noise", body: "Built for continuous pedestrian duty in occupied lobbies." },
      { title: "Sensor driven", body: "Approach and presence sensor inputs govern opening and hold-open behaviour." },
      { title: "Part-open modes", body: "Reduced opening width to limit conditioning loss in cooler or warmer months." },
      { title: "Defined fail behaviour", body: "Release for manual push or power-open, set against the escape strategy." },
    ],
    applications: ["Automatic sliding glass doors", "Office and retail lobbies", "Hospitals and hospitality entrances"],
    specs: [],
    image: "/images/photography/entrance-night.jpg",
    imageAlt: "Illuminated building lobby behind automatic glass doors",
    ...pending,
    related: ["automatic-sliding-glass-doors", "sectional-door-motor", "swing-gate-motor"],
    legacyUrl: "https://www.standardautomation.in/sliding-glass-door-motor.html",
  },
  {
    slug: "sectional-door-motor",
    category: "motors-accessories",
    name: "Sectional Door Motor",
    tagline: "Shaft and trolley operators for overhead sectional doors.",
    summary:
      "Operators for overhead sectional and garage doors, driving the torsion shaft or the leaf directly, with limits, obstruction detection and manual release.",
    overview: [
      "A sectional door operator works with the door's torsion counterbalance rather than against it: the springs carry most of the leaf weight and the motor supplies the movement. Shaft-mounted operators drive the torsion tube directly; trolley operators pull the top panel along a rail.",
      "Because the leaf travels overhead, obstruction detection and a manual release are not optional extras — they are the difference between a safe door and a hazard.",
    ],
    benefits: [
      { title: "Works with the counterbalance", body: "The springs carry the leaf weight; the operator supplies controlled movement." },
      { title: "Shaft or trolley drive", body: "Direct torsion shaft drive for industrial doors, trolley drive for lighter leaves." },
      { title: "Obstruction detection", body: "The door stops and reverses if it meets resistance while closing." },
      { title: "Manual release", body: "Chain hoist or release cord so the door can be moved without power." },
    ],
    applications: ["Overhead sectional doors", "Aluminium and residential garage doors", "Workshop and service bay doors"],
    specs: [],
    image: "/images/photography/garage-door-house.jpg",
    imageAlt: "A closed sectional overhead door",
    ...pending,
    related: ["overhead-sectional-doors", "aluminium-garage-doors", "residential-garage-doors"],
    legacyUrl: "https://www.standardautomation.in/sectional-door-motor.html",
  },
  {
    slug: "industrial-sliding-gate-motor",
    category: "motors-accessories",
    name: "Industrial Sliding Gate Motor",
    tagline: "Heavy-duty operators for large site gates.",
    summary:
      "High-duty sliding gate operators for heavy industrial leaves and gates that cycle continuously through the working day.",
    overview: [
      "An industrial sliding gate operator is a heavier-duty version of the same rack-drive arrangement used on commercial gates, rated for larger leaf masses and far higher cycle counts.",
      "On a plant gate that opens for every vehicle movement, duty rating rather than raw torque is usually the constraint — an operator sized only for leaf weight will overheat long before it fails mechanically.",
    ],
    benefits: [
      { title: "High duty rating", body: "Specified for gates that cycle continuously through a working shift." },
      { title: "Heavy leaves", body: "Rated for large industrial gate masses beyond commercial operator capacity." },
      { title: "Access-system driven", body: "Loop detectors, readers and gatehouse controls drive the operator directly." },
      { title: "Manual release", body: "Release mechanism so a heavy leaf can still be moved without power." },
    ],
    applications: ["Industrial and plant main gates", "Logistics yards", "High-cycle site entrances"],
    specs: [],
    image: "/images/photography/gates-industrial.jpg",
    imageAlt: "Industrial site entrance with a large powered gate",
    namingNote:
      "Working name, taken from the page address. The source page at `industrial-sliding-gate-motor.html` is headlined \"Retractable Barriers\", which does not match its own URL — the business needs to confirm the product and its name.",
    ...pending,
    related: ["sliding-gate-motor", "automatic-sliding-gates", "retractable-gates"],
    legacyUrl: "https://www.standardautomation.in/industrial-sliding-gate-motor.html",
  },
];
