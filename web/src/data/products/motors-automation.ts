import type { Product } from "@/lib/types";
import type { DocumentRef } from "@/lib/types";

/**
 * Motors & Automation — 10 products.
 *
 * The whole line carries status POTENTIAL: every one of these was published
 * on the company's own server, but the line was commented out of its site
 * navigation, so it exists without being promoted. Shown with a visible
 * marker rather than dropped — see research/product-source-matrix.csv.
 *
 * No torque, power or duty figure is published for any operator here,
 * because none was available from a supportable source. Sizing is stated as
 * a process rather than a number, and every page says the specification is
 * to be confirmed.
 */
const brochure: DocumentRef[] = [
  {
    title: "Operator selection guide",
    kind: "Datasheet",
    href: null,
    note: "In preparation. Ask us with the curtain or leaf weight, opening height and daily cycle count and we will size the drive.",
  },
];

const noSpec = { label: "Specification", value: "To be confirmed" };

export const motorProducts: Product[] = [
  {
    id: "side-motors-chain-drive",
    familyId: "motors-automation",
    categoryId: "shutter-operators",
    name: "Side Motors — Chain Drive",
    status: "POTENTIAL",
    tagline: "Shaft-driven power for heavy shutter curtains.",
    summary:
      "Side-mounted shutter operators driving the barrel shaft through a chain and sprocket, for heavy steel curtains on large industrial openings.",
    overview: [
      "A side motor mounts on the end plate beside the barrel and drives the shaft through a chain and sprocket. Because the drive is external and geared down, it moves much heavier curtains than a motor housed inside the barrel — which is why it is the standard arrangement on large industrial shutters.",
      "Chain drives tolerate a degree of misalignment and can be inspected, tensioned and replaced in place. The sprocket ratio can also be selected to trade travel speed against available torque.",
    ],
    quickFacts: [
      { label: "Mounting", value: "End plate, beside the barrel" },
      { label: "Drive", value: "Chain and sprocket to the barrel shaft" },
      { label: "Override", value: "Hand chain" },
      noSpec,
    ],
    benefits: [
      { title: "Heavy curtains", body: "A geared external drive handles the large steel curtains used on industrial openings." },
      { title: "Serviceable in place", body: "Chain and sprocket can be inspected, tensioned and replaced without dismantling the barrel." },
      { title: "Selectable ratio", body: "Sprocket ratio trades travel speed against torque to suit the curtain." },
      { title: "Manual override", body: "Hand-chain operation when there is no power." },
    ],
    variants: [
      { id: "hand-chain-override", name: "Hand-chain override", note: "Extended hand chain where the opening is high and the chain has to reach an operator at floor level.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Heavy industrial rolling shutters", "Large warehouse openings", "Motorising existing manual shutters"],
    industries: ["manufacturing", "warehousing-logistics"],
    environments: ["internal", "external"],
    operatingMethod: [
      "The operator is mounted on the shutter end plate beside the barrel.",
      "A chain and sprocket transmit drive from the gearbox to the barrel shaft.",
      "Adjustable limit gearing sets the open and close positions at commissioning.",
      "A hand chain disengages the drive for manual operation during a power failure.",
    ],
    construction: ["Geared motor with external chain and sprocket transmission", "End-plate mounting bracket", "Limit gear assembly and hand-chain override"],
    related: ["side-motors-gear-drive", "central-motors", "galvanized-steel-rolling-shutters"],
    documents: brochure,
    imageId: "p-motor-chain",
    legacyUrls: ["side-motor-with-chain.html"],
  },
  {
    id: "side-motors-gear-drive",
    familyId: "motors-automation",
    categoryId: "shutter-operators",
    name: "Side Motors — Gear Drive",
    status: "POTENTIAL",
    tagline: "Direct gear coupling to the barrel shaft.",
    summary:
      "Side-mounted operators coupled directly to the barrel shaft through a gearbox, for heavy curtains where an exposed chain is not acceptable.",
    overview: [
      "A gear-drive side motor couples straight to the barrel shaft instead of driving it through a chain. That removes the chain as a maintenance item and a noise source, and gives a more compact installation at the end plate.",
      "It suits heavy curtains in environments where an exposed chain would collect dust or is not acceptable — food handling areas and clean environments in particular.",
    ],
    quickFacts: [
      { label: "Mounting", value: "End plate, direct to the shaft" },
      { label: "Drive", value: "Enclosed gearbox, no exposed chain" },
      { label: "Override", value: "Crank or release" },
      noSpec,
    ],
    benefits: [
      { title: "No exposed chain", body: "Direct gear coupling removes a maintenance item and a dust trap at the end plate." },
      { title: "Quieter running", body: "Enclosed gearing runs more quietly than an open chain and sprocket." },
      { title: "Compact at the end plate", body: "Less projection beside the barrel than a chain drive of equivalent capacity." },
      { title: "Manual override", body: "Crank or release mechanism for operation during a power failure." },
    ],
    variants: [
      { id: "crank-override", name: "Crank override", note: "Removable crank handle for manual operation, used where a hanging hand chain would be in the way.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Heavy rolling shutters", "Food and clean-area openings", "Industrial and warehouse shutters"],
    industries: ["manufacturing", "cold-chain-food", "pharmaceutical-cleanroom"],
    environments: ["internal", "hygiene"],
    operatingMethod: [
      "The gearbox output couples directly to the barrel shaft at the end plate.",
      "Adjustable limit gearing sets the open and close positions.",
      "A crank or release allows manual operation without power.",
    ],
    construction: ["Enclosed geared motor with direct shaft coupling", "End-plate mounting bracket", "Limit gear assembly and manual release"],
    related: ["side-motors-chain-drive", "central-motors", "insulated-double-wall-rolling-shutters"],
    documents: brochure,
    imageId: "p-motor-gear",
    legacyUrls: ["side-motor-with-gear.html"],
  },
  {
    id: "central-motors",
    familyId: "motors-automation",
    categoryId: "shutter-operators",
    name: "Central Motors",
    status: "POTENTIAL",
    tagline: "Driving the barrel from the middle of the span.",
    summary:
      "Centrally mounted shutter operators that drive the barrel from mid-span, balancing torque across a wide curtain.",
    overview: [
      "A central motor drives the barrel from the middle of its span rather than from one end. On a wide shutter that halves the torsional distance the shaft carries the load over, which reduces wind-up and keeps the curtain travelling squarely in its guides.",
      "The arrangement also removes the need for clear space at the end plates, which matters where the opening runs tight against a return wall on both sides.",
    ],
    quickFacts: [
      { label: "Mounting", value: "Mid-span on the barrel" },
      { label: "Benefit", value: "Halves shaft wind-up on wide curtains" },
      { label: "Override", value: "Manual release" },
      noSpec,
    ],
    benefits: [
      { title: "Balanced across the span", body: "Driving from the centre reduces shaft wind-up on wide curtains." },
      { title: "Squarer travel", body: "Even torque distribution helps the curtain stay aligned in its guides." },
      { title: "No end-plate clearance needed", body: "Useful where the opening sits tight against return walls on both sides." },
      { title: "Manual override", body: "Hand operation available during a power failure." },
    ],
    variants: [
      { id: "wide-span", name: "Wide span", note: "For curtains wide enough that end-drive shaft wind-up would pull the curtain out of square.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Wide industrial shutters", "Openings tight against return walls", "Large commercial frontages"],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial"],
    environments: ["internal", "external"],
    operatingMethod: [
      "The operator is mounted at the centre of the barrel and drives the shaft directly.",
      "Adjustable limits set the open and close positions.",
      "A manual release allows hand operation during a power failure.",
    ],
    construction: ["Geared motor mounted mid-span on the barrel", "Support bracket carrying the operator weight", "Limit assembly and manual release"],
    related: ["side-motors-chain-drive", "tubular-motors", "galvanized-steel-rolling-shutters"],
    documents: brochure,
    imageId: "p-motor-central",
    legacyUrls: ["central-motor.html"],
  },
  {
    id: "tubular-motors",
    familyId: "motors-automation",
    categoryId: "shutter-operators",
    name: "Tubular Motors",
    status: "POTENTIAL",
    tagline: "The drive disappears inside the barrel.",
    summary:
      "Tubular motors housed inside the shutter barrel, for light aluminium and single-wall curtains where no external drive should be visible.",
    overview: [
      "A tubular motor sits inside the barrel itself, so nothing projects beside the shutter. On a shopfront or a domestic opening that keeps the installation clean and leaves the frontage uncluttered.",
      "Capacity is limited by what will fit inside the tube, so tubular motors suit light aluminium and single-wall curtains rather than heavy steel ones.",
    ],
    quickFacts: [
      { label: "Mounting", value: "Inside the barrel" },
      { label: "Suits", value: "Light aluminium and single-wall curtains" },
      { label: "Override", value: "Crank or release" },
      noSpec,
    ],
    benefits: [
      { title: "Nothing visible", body: "The complete drive is inside the barrel, leaving the frontage clean." },
      { title: "Quiet", body: "An enclosed motor inside the tube runs quietly, which matters on domestic and retail openings." },
      { title: "Simple installation", body: "Fewer external components to align and mount at the end plates." },
      { title: "Manual override", body: "Crank or release mechanism for operation without power." },
    ],
    variants: [
      { id: "in-barrel", name: "In-barrel", note: "The motor, gearbox and limits all sit inside the barrel tube. Capacity is bounded by the tube diameter.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Aluminium and single-wall shutters", "Shopfronts and showrooms", "Domestic and light commercial openings"],
    industries: ["retail-commercial"],
    environments: ["internal", "external"],
    operatingMethod: [
      "The motor and gearbox are housed inside the barrel tube and drive it directly.",
      "Limits are set on the motor body at commissioning.",
      "A crank or release allows manual operation without power.",
    ],
    construction: ["Motor, gearbox and limit assembly inside the barrel tube", "Drive head and idler at the end plates", "Manual override arrangement"],
    related: ["australian-type-motors", "aluminium-rolling-shutters", "central-motors"],
    documents: brochure,
    imageId: "p-motor-tubular",
    legacyUrls: ["tubular-motor.html"],
  },
  {
    id: "australian-type-motors",
    familyId: "motors-automation",
    categoryId: "shutter-operators",
    name: "Australian Type Motors",
    status: "POTENTIAL",
    tagline: "A compact external drive for medium curtains.",
    summary:
      "Compact externally mounted shutter operators for medium-weight curtains, with an integral manual release.",
    overview: [
      "The Australian-type operator is a compact externally mounted drive sitting between a tubular motor and a full industrial side motor in capacity. It suits medium curtains that are too heavy for an in-barrel motor but do not need a full industrial side drive.",
      "Its integral manual release makes it straightforward to operate the shutter by hand when power is lost, which is one reason it is common on retrofits.",
    ],
    quickFacts: [
      { label: "Mounting", value: "External, at the barrel" },
      { label: "Capacity", value: "Between tubular and industrial side drive" },
      { label: "Override", value: "Integral manual release" },
      noSpec,
    ],
    benefits: [
      { title: "Medium-duty capacity", body: "Handles curtains beyond tubular motor capacity without a full industrial side drive." },
      { title: "Compact mounting", body: "Small external footprint at the barrel." },
      { title: "Integral manual release", body: "Hand operation without additional hardware during a power failure." },
      { title: "Retrofit friendly", body: "Commonly used to motorise existing manual shutters." },
    ],
    variants: [
      { id: "external-mount", name: "External mount", note: "Bracket-mounted beside or behind the barrel, chosen to suit the space available at the head of the opening.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Medium commercial shutters", "Motorising existing manual shutters", "Showroom and warehouse frontages"],
    industries: ["retail-commercial", "warehousing-logistics"],
    environments: ["internal", "external"],
    operatingMethod: [
      "The operator is bracket-mounted externally and drives the barrel shaft.",
      "Adjustable limits set the open and close positions.",
      "An integral release allows hand operation during a power failure.",
    ],
    construction: ["Compact geared motor in an external housing", "Mounting bracket at the barrel", "Integral manual release"],
    related: ["tubular-motors", "central-motors", "aluminium-rolling-shutters"],
    documents: brochure,
    imageId: "p-motor-australian",
    legacyUrls: ["australian-type-motor.html"],
  },
  {
    id: "sliding-gate-operators",
    familyId: "motors-automation",
    categoryId: "gate-operators",
    name: "Sliding Gate Operators",
    status: "POTENTIAL",
    tagline: "Rack-driven operators for sliding gate leaves.",
    summary:
      "Sliding gate operators driving a toothed rack along the leaf, with adjustable limits, obstruction detection and a key-operated manual release.",
    overview: [
      "A sliding gate operator drives a toothed rack fixed along the bottom of the leaf. Because the load is a rolling one rather than a hinged one, sizing is governed by leaf weight, roller friction and how many cycles a day the gate has to complete.",
      "Adjustable open and close limits set the travel, and obstruction detection reverses the leaf if it meets resistance during a cycle.",
    ],
    quickFacts: [
      { label: "Drive", value: "Pinion on a toothed rack" },
      { label: "Sizing input", value: "Leaf weight and cycles per day" },
      { label: "Override", value: "Key-operated release" },
      noSpec,
    ],
    benefits: [
      { title: "Matched to leaf weight", body: "Operator selected against leaf mass and daily cycle count, not opening width alone." },
      { title: "Adjustable travel limits", body: "Open and close positions set on site to suit the installation." },
      { title: "Obstruction detection", body: "The leaf stops and reverses when it meets resistance during travel." },
      { title: "Manual release", body: "Key release to move the leaf by hand during a power failure." },
    ],
    variants: [
      { id: "rack-drive", name: "Rack drive", note: "Pinion engaging a toothed rack along the leaf — the standard arrangement for a sliding gate.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Automatic sliding gates", "Industrial and commercial site entrances", "Housing society gates"],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial"],
    environments: ["external"],
    operatingMethod: [
      "The operator is fixed on a foundation beside the gate line and engages a rack along the leaf.",
      "Adjustable limits set the open and close positions, with soft stop at both ends.",
      "Photocells and a safety edge govern travel; obstruction detection reverses the leaf.",
      "A key-operated release disengages the drive for manual operation.",
    ],
    construction: ["Geared motor and pinion in a weatherproof housing", "Foundation plate beside the gate line", "Toothed rack fixed along the leaf"],
    related: ["automatic-sliding-gates", "industrial-sliding-gate-operators", "swing-gate-operators"],
    documents: brochure,
    imageId: "p-operator-sliding-gate",
    legacyUrls: ["sliding-gate-motor.html"],
  },
  {
    id: "industrial-sliding-gate-operators",
    familyId: "motors-automation",
    categoryId: "gate-operators",
    name: "Industrial Sliding Gate Operators",
    status: "POTENTIAL",
    tagline: "Heavy-duty drives for gates that never stop cycling.",
    summary:
      "High-duty sliding gate operators for heavy industrial leaves and gates that cycle continuously through the working day.",
    overview: [
      "An industrial sliding gate operator is a heavier-duty version of the same rack-drive arrangement used on commercial gates, rated for larger leaf masses and far higher cycle counts.",
      "On a plant gate that opens for every vehicle movement, duty rating rather than raw torque is usually the constraint — an operator sized only for leaf weight will overheat long before it fails mechanically.",
    ],
    quickFacts: [
      { label: "Governing factor", value: "Duty rating, not torque" },
      { label: "Suits", value: "Heavy leaves, continuous cycling" },
      { label: "Override", value: "Manual release" },
      noSpec,
    ],
    benefits: [
      { title: "High duty rating", body: "Specified for gates that cycle continuously through a working shift." },
      { title: "Heavy leaves", body: "Rated for large industrial gate masses beyond commercial operator capacity." },
      { title: "Access-system driven", body: "Loop detectors, readers and gatehouse controls drive the operator directly." },
      { title: "Manual release", body: "Release mechanism so a heavy leaf can still be moved without power." },
    ],
    variants: [
      { id: "high-duty", name: "High duty cycle", note: "Uprated motor and thermal capacity for gates opening for every vehicle movement at a busy plant entrance.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Industrial and plant main gates", "Logistics yards", "High-cycle site entrances"],
    industries: ["manufacturing", "warehousing-logistics"],
    environments: ["external"],
    operatingMethod: [
      "The operator engages a heavy-duty rack along the leaf from a foundation beside the gate line.",
      "Adjustable limits and soft stop control travel at both ends.",
      "Loop detectors, readers or a gatehouse control trigger the operator.",
      "A manual release allows a heavy leaf to be moved without power.",
    ],
    construction: ["Uprated geared motor and pinion in a weatherproof housing", "Heavy-duty foundation plate", "Heavy-section toothed rack"],
    namingNote:
      "Working name, taken from the page address. The previous site's page at this address was headlined “Retractable Barriers”, which does not match its own URL. The product and its name need confirming from the business.",
    related: ["sliding-gate-operators", "automatic-sliding-gates", "telescopic-sliding-gates"],
    documents: brochure,
    imageId: "p-operator-industrial-gate",
    legacyUrls: ["industrial-sliding-gate-motor.html"],
  },
  {
    id: "swing-gate-operators",
    familyId: "motors-automation",
    categoryId: "gate-operators",
    name: "Swing Gate Operators",
    status: "POTENTIAL",
    tagline: "Arm, ram and underground drives for hinged leaves.",
    summary:
      "Swing gate operators in articulated arm, linear ram and underground configurations, with leaf sequencing and soft stop at both ends of travel.",
    overview: [
      "A swing gate operator has to accelerate and decelerate a hinged leaf through an arc, which loads the hinge post very differently from a rolling leaf. Articulated arms suit wide or heavy leaves, linear rams suit typical residential and light commercial leaves, and underground units keep the drive out of sight.",
      "On a double gate the controller also has to sequence the leaves so they open and close in the right order and do not clash at the meeting stile.",
    ],
    quickFacts: [
      { label: "Types", value: "Articulated arm, linear ram, underground" },
      { label: "Double gates", value: "Leaf sequencing" },
      { label: "Override", value: "Release on each operator" },
      noSpec,
    ],
    benefits: [
      { title: "Three drive types", body: "Articulated arm, linear ram or underground, chosen against leaf size and appearance." },
      { title: "Leaf sequencing", body: "Double gates are opened and closed in order so the leaves do not clash." },
      { title: "Soft start and stop", body: "Controlled acceleration and deceleration reduce load on the hinge post." },
      { title: "Manual release", body: "Each operator releases so the leaves can be swung by hand." },
    ],
    variants: [
      { id: "articulated-arm", name: "Articulated arm", note: "For wide or heavy leaves and hinge posts set back from the opening. The arm folds as the leaf swings.", status: "POTENTIAL" },
      { id: "linear-ram", name: "Linear ram", note: "Compact and simple to install on a standard hinge post. The usual choice for residential leaves.", status: "POTENTIAL" },
      { id: "underground", name: "Underground", note: "Drive in a foundation box at the hinge, invisible when the gate is closed. The box needs drainage.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Swing gates, single and double leaf", "Residential and villa entrances", "Institutional and office gates"],
    industries: ["retail-commercial", "healthcare", "manufacturing"],
    environments: ["external"],
    operatingMethod: [
      "One operator is fitted per leaf, at the hinge or on the leaf frame.",
      "The controller sequences the leaves on a double gate and applies soft start and soft stop.",
      "Photocells stop travel when the arc is obstructed.",
      "A release on each operator allows the leaves to be swung by hand.",
    ],
    construction: ["Articulated arm, linear ram or underground drive unit", "Hinge-post or foundation-box mounting", "Controller with leaf sequencing and safety inputs"],
    related: ["automatic-swing-gates", "sliding-gate-operators", "automatic-sliding-gates"],
    documents: brochure,
    imageId: "p-operator-swing-gate",
    legacyUrls: ["swing-gate-motor.html"],
  },
  {
    id: "sectional-door-operators",
    familyId: "motors-automation",
    categoryId: "door-operators",
    name: "Sectional Door Operators",
    status: "POTENTIAL",
    tagline: "Shaft and trolley drives that work with the counterbalance.",
    summary:
      "Operators for overhead sectional and garage doors, driving the torsion shaft or the leaf directly, with limits, obstruction detection and manual release.",
    overview: [
      "A sectional door operator works with the door's torsion counterbalance rather than against it: the springs carry most of the leaf weight and the motor supplies the movement. Shaft-mounted operators drive the torsion tube directly; trolley operators pull the top panel along a rail.",
      "Because the leaf travels overhead, obstruction detection and a manual release are not extras — they are the difference between a safe door and a hazard.",
    ],
    quickFacts: [
      { label: "Types", value: "Shaft mounted or trolley" },
      { label: "Works with", value: "The door's torsion counterbalance" },
      { label: "Override", value: "Hand chain or release cord" },
      noSpec,
    ],
    benefits: [
      { title: "Works with the counterbalance", body: "The springs carry the leaf weight; the operator supplies controlled movement." },
      { title: "Shaft or trolley drive", body: "Direct torsion shaft drive for industrial doors, trolley drive for lighter leaves." },
      { title: "Obstruction detection", body: "The door stops and reverses if it meets resistance while closing." },
      { title: "Manual release", body: "Chain hoist or release cord so the door can be moved without power." },
    ],
    variants: [
      { id: "shaft-mounted", name: "Shaft mounted", note: "Couples to the torsion tube beside the door. The standard arrangement on industrial sectional doors.", status: "POTENTIAL" },
      { id: "trolley", name: "Trolley", note: "Pulls the top panel along a ceiling rail. Suits lighter residential and light commercial leaves.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Overhead sectional doors", "Aluminium and residential garage doors", "Workshop and service bay doors"],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial"],
    environments: ["internal", "external"],
    operatingMethod: [
      "The operator couples to the torsion tube, or to a trolley carriage on a ceiling rail.",
      "Adjustable limits set the open and close positions at commissioning.",
      "Obstruction detection stops and reverses a closing leaf.",
      "A hand chain or release cord disengages the drive for manual operation.",
    ],
    construction: ["Geared motor with shaft coupling or trolley carriage", "Mounting bracket at the torsion tube or ceiling rail", "Limit assembly and manual release"],
    related: ["industrial-sectional-overhead-doors", "aluminium-garage-doors", "residential-garage-doors"],
    documents: brochure,
    imageId: "p-operator-sectional",
    legacyUrls: ["sectional-door-motor.html"],
  },
  {
    id: "automatic-sliding-door-operators",
    familyId: "motors-automation",
    categoryId: "door-operators",
    name: "Automatic Sliding Door Operators",
    status: "POTENTIAL",
    tagline: "Header operators for high-cycle pedestrian doors.",
    summary:
      "Belt-driven header operators for automatic sliding glass doors, with sensor inputs, adjustable hold-open and defined power-failure behaviour.",
    overview: [
      "A sliding glass door operator lives in the header above the opening and drives the leaves along a track by belt. Compared with a gate operator this is a light, high-cycle duty: it may run several thousand times a day, quietly, in an occupied lobby.",
      "The controller manages opening width, hold-open time and part-open modes, and defines what the door does when power is lost — released for manual push, or driven open, according to the building's escape strategy.",
    ],
    quickFacts: [
      { label: "Mounting", value: "Header above the opening" },
      { label: "Duty", value: "High cycle, low noise" },
      { label: "Fail behaviour", value: "Manual push or power-open" },
      noSpec,
    ],
    benefits: [
      { title: "High cycle, low noise", body: "Built for continuous pedestrian duty in occupied lobbies." },
      { title: "Sensor driven", body: "Approach and presence sensor inputs govern opening and hold-open behaviour." },
      { title: "Part-open modes", body: "Reduced opening width to limit conditioning loss in cooler or warmer months." },
      { title: "Defined fail behaviour", body: "Release for manual push or power-open, set against the escape strategy." },
    ],
    variants: [
      { id: "belt-drive-header", name: "Belt-drive header", note: "Motor, belt, carriage and controller in a single header profile above the opening.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: ["Automatic sliding glass doors", "Office and retail lobbies", "Hospitals and hospitality entrances"],
    industries: ["retail-commercial", "healthcare", "infrastructure-transit"],
    environments: ["internal"],
    operatingMethod: [
      "The operator sits in a header profile above the opening and drives the leaf carriages by belt.",
      "Approach and presence sensors on both sides govern opening and hold-open time.",
      "A mode selector sets automatic, partial, exit only, locked or hold open.",
      "On power failure the leaves are released for manual push, or driven open, as specified.",
    ],
    construction: ["Belt-drive motor, carriage and controller in an aluminium header", "Track and carriage assembly for the leaves", "Sensor set for approach and presence"],
    related: ["automatic-sliding-glass-doors", "sectional-door-operators", "flap-barriers"],
    documents: brochure,
    imageId: "p-operator-sliding-door",
    legacyUrls: ["sliding-glass-door-motor.html"],
  },
];
