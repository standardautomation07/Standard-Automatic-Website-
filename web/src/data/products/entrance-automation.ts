import type { Product } from "@/lib/types";

/**
 * Entrance Automation — 5 products.
 *
 * Specifications are reproduced only where Standard Automation already
 * publishes them for the line. Overview and benefit copy is original and
 * describes how the product type works (industry information); it does not
 * assert company-specific claims that have not been confirmed.
 */
export const entranceAutomationProducts: Product[] = [
  {
    slug: "automatic-sliding-gates",
    category: "entrance-automation",
    name: "Automatic Sliding Gates",
    tagline: "The default for wide site entrances with room to run the leaf sideways.",
    summary:
      "Motorised sliding gate systems for factory, warehouse and campus entrances, driven on a floor track or cantilevered clear of the ground.",
    overview: [
      "A sliding gate moves a single leaf parallel to the boundary line, which makes it the practical choice wherever there is no room for a leaf to swing into the road or the yard. Two arrangements are common: track-guided, where the leaf runs on a ground rail, and cantilever, where the leaf is carried on rollers set back from the opening and nothing crosses the driveway.",
      "Cantilever suits sites where the driveway must stay clear for drainage, snow, silt or heavy vehicle loading. Track-guided suits long, heavy leaves on a level, well-drained approach. In both cases the operator is sized to the leaf weight and to how many times a day the gate has to run.",
    ],
    benefits: [
      {
        title: "No swing arc required",
        body: "The leaf runs alongside the boundary, so no part of the road or yard has to be kept clear for the gate to open.",
      },
      {
        title: "Suits heavy, wide leaves",
        body: "Sliding arrangements carry long spans better than swing leaves, which load the hinge post harder as they get wider.",
      },
      {
        title: "Wind tolerant",
        body: "A guided leaf is less exposed to wind loading than a swing leaf standing open at right angles to the boundary.",
      },
      {
        title: "Access control at the gate line",
        body: "Loop detectors, remotes, readers and intercoms drive the operator directly, so the gate becomes part of the site's access system.",
      },
    ],
    applications: [
      "Factory and plant main gates",
      "Warehouse and logistics yards",
      "Corporate campus vehicle entries",
      "Housing societies and gated developments",
    ],
    howItWorks: [
      "The leaf is carried on rollers — on a ground track, or cantilevered on a support beam clear of the driveway.",
      "A gear motor drives a rack fixed along the leaf, with adjustable open and close limits.",
      "Photocells across the opening and a safety edge on the leading edge stop and reverse travel on obstruction.",
      "Access devices — remote, card reader, keypad, loop detector or intercom — trigger the operator; a manual release allows hand operation during a power failure.",
    ],
    specs: [],
    image: "/images/photography/gates-industrial.jpg",
    imageAlt: "Industrial site entrance with a large powered gate",
    related: ["swing-gates", "telescopic-gates", "sliding-gate-motor"],
    legacyUrl: "https://www.standardautomation.in/sliding-gate.html",
  },
  {
    slug: "swing-gates",
    category: "entrance-automation",
    name: "Swing Gates",
    tagline: "For entrances with clear swing room and moderate traffic.",
    summary:
      "Single or double leaf swing gates with underground, articulated or ram operators, for entrances where there is space for the leaf to open inward.",
    overview: [
      "A swing gate hinges on posts either side of the opening. Where the site has the depth for a leaf to open inward and traffic is moderate, it is the simplest and least expensive way to automate an entrance, and it keeps the driveway free of tracks and guides.",
      "Operator choice follows the leaf: an articulated arm for wide or heavy leaves, a linear ram for typical residential and light commercial leaves, and an underground operator where the drive must be invisible. Wind exposure matters more here than on a sliding gate, because an open leaf presents a large surface at right angles to the boundary.",
    ],
    benefits: [
      {
        title: "Nothing crosses the driveway",
        body: "No ground track or guide rail, so drainage and heavy vehicle loading across the entrance are unaffected.",
      },
      {
        title: "Simple, low-cost automation",
        body: "Fewer moving parts than a sliding arrangement on entrances that do not need continuous duty.",
      },
      {
        title: "Concealed drive options",
        body: "Underground operators keep the hardware out of sight where the entrance is architecturally sensitive.",
      },
      {
        title: "Safe leaf travel",
        body: "Photocells and obstruction detection govern the swing arc, with an adjustable soft stop at both ends of travel.",
      },
    ],
    applications: [
      "Residential and villa entrances",
      "Housing society side gates",
      "Office and institutional entrances",
      "Secondary gates on industrial sites",
    ],
    howItWorks: [
      "Each leaf carries an operator — articulated arm, linear ram, or an underground unit at the hinge.",
      "The controller sequences the two leaves so they open and close in the right order and do not clash at the meeting stile.",
      "Photocells across the opening stop travel when the arc is obstructed.",
      "A manual release on each operator allows the leaves to be swung by hand when there is no power.",
    ],
    specs: [],
    image: "/images/photography/gate-driveway.jpg",
    imageAlt: "A gated driveway entrance",
    related: ["automatic-sliding-gates", "swing-gate-motor", "telescopic-gates"],
    legacyUrl: "https://www.standardautomation.in/swing-gate.html",
  },
  {
    slug: "telescopic-gates",
    category: "entrance-automation",
    name: "Telescopic Gates",
    tagline: "Full opening width on sites with only half the side-run.",
    summary:
      "Multi-leaf sliding gates whose panels nest as they retract, covering a wide opening where there is not enough side space for a single leaf.",
    overview: [
      "A telescopic gate solves a specific site constraint: the opening is wide, but there is nowhere near enough clear boundary alongside it for a single sliding leaf to retract into. Two or three leaves run on parallel tracks and nest inside one another, so the retracted stack is a fraction of the open width.",
      "Because the leaves move at different speeds and must stay synchronised, the drive and guidance arrangement is more involved than a single-leaf gate. In exchange, the entrance also opens faster, since each leaf travels a shorter distance.",
    ],
    benefits: [
      {
        title: "Half the side-run",
        body: "Nested leaves retract into roughly half the space a single sliding leaf of the same opening width would need.",
      },
      {
        title: "Faster opening",
        body: "Each leaf covers a shorter distance, so the entrance clears more quickly than an equivalent single-leaf slide.",
      },
      {
        title: "Wide clear openings",
        body: "Suited to entrances that must admit trailers and large vehicles but sit on a constrained boundary.",
      },
      {
        title: "Synchronised, controlled travel",
        body: "Leaves are driven and guided together, with obstruction detection across the full opening.",
      },
    ],
    applications: [
      "Constrained industrial entrances",
      "Urban plots with limited boundary run",
      "Commercial premises on narrow frontages",
      "Yards needing a wide clear opening",
    ],
    specs: [],
    image: "/images/photography/gate-metal.jpg",
    imageAlt: "A black metal gate at a site entrance",
    related: ["automatic-sliding-gates", "swing-gates", "retractable-gates"],
    legacyUrl: "https://www.standardautomation.in/telescoping-gate.html",
  },
  {
    slug: "retractable-gates",
    category: "entrance-automation",
    name: "Retractable Gates",
    tagline: "A folding lattice leaf that collapses into a narrow stack.",
    summary:
      "Motorised retractable (collapsible lattice) gates that fold to a compact stack, available trackless or on single and double tracks, in lengths up to 30 m.",
    overview: [
      "A retractable gate uses a folding lattice frame instead of a rigid leaf. Because the structure collapses on itself, a long opening can be closed by a gate that stacks into a very short length of boundary — the reason this type is common on factory, school and campus gates in India.",
      "Trackless, single-track and double-track arrangements are available. Trackless is preferred where nothing may cross the driveway; tracked arrangements give more lateral stability on long runs and exposed sites.",
    ],
    benefits: [
      {
        title: "Very compact when open",
        body: "The lattice folds on itself, so long openings need only a short parked length of boundary.",
      },
      {
        title: "Long spans",
        body: "Standard configurations cover openings up to 30 m, closed by a single powered leaf.",
      },
      {
        title: "Trackless option",
        body: "A no-track arrangement leaves the driveway completely clear for drainage and heavy vehicles.",
      },
      {
        title: "Remote operated",
        body: "Supplied with remote control, with a stated working range of 30 m or more.",
      },
    ],
    applications: [
      "Factory and enterprise gates",
      "School and university entrances",
      "Government and institutional premises",
      "Large yards and depots",
    ],
    specs: [
      { label: "Maximum length", value: "30 m" },
      { label: "Standard height", value: "1.6 m" },
      { label: "Track options", value: "No track, single track, double track" },
      { label: "Main tube", value: "52 x 50 x 0.65 mm" },
      { label: "Cross tube", value: "44 x 35 x 0.6 mm" },
      { label: "Wheels", value: "Plastic or cast aluminium, 95 mm diameter" },
      { label: "Supply", value: "220 V ±10%, 50 Hz" },
      { label: "Motor power", value: "370 W / 550 W / 750 W" },
      { label: "Travel speed", value: "17–19 m/min" },
      { label: "Operating current", value: "≤ 2.5 A x 2" },
      { label: "Remote control range", value: "≥ 30 m" },
      { label: "Working temperature", value: "-25 °C to +75 °C" },
      { label: "Finishes", value: "Silver, black, red" },
    ],
    image: "/images/photography/gate-sliding.jpg",
    imageAlt: "A yellow and black site gate across a vehicle entrance",
    related: ["automatic-sliding-gates", "telescopic-gates", "retractable-barriers"],
    legacyUrl: "https://www.standardautomation.in/retractable-gates.html",
  },
  {
    slug: "automatic-sliding-glass-doors",
    category: "entrance-automation",
    name: "Automatic Sliding Glass Doors",
    tagline: "Hands-free pedestrian entrances for lobbies, retail and healthcare.",
    summary:
      "Sensor-operated sliding glass door systems for building entrances, with single or bi-parting leaves and break-out or fail-safe egress arrangements.",
    overview: [
      "An automatic sliding glass door is a pedestrian entrance driven by an overhead operator concealed in a header above the opening. Motion and presence sensors on each side open the leaves as people approach and hold them open while anyone remains in the threshold.",
      "The specification questions that matter are throughput, sealing, and egress. Bi-parting leaves clear the opening faster than a single leaf; a well-sealed door reduces conditioning loss in an air-conditioned lobby; and the door's behaviour on power failure and in an emergency has to be defined against the building's escape strategy before it is installed.",
    ],
    benefits: [
      {
        title: "Hands-free passage",
        body: "Motion and presence detection open the door before the user reaches it and hold it open while the threshold is occupied.",
      },
      {
        title: "Controlled air loss",
        body: "A powered door stands open only as long as it is needed, cutting conditioning losses through a busy lobby entrance.",
      },
      {
        title: "Accessible by default",
        body: "No door leaf to pull, which removes the main barrier for wheelchair users, trolleys and carried loads.",
      },
      {
        title: "Defined egress behaviour",
        body: "Break-out leaves and fail-safe modes are specified against the building's escape route requirements.",
      },
    ],
    applications: [
      "Office and corporate building lobbies",
      "Retail and showroom entrances",
      "Hospitals and clinics",
      "Hotels and hospitality entrances",
    ],
    howItWorks: [
      "An operator in the header carries the leaves on a track and drives them by belt.",
      "Overhead sensors detect approach; safety sensors in the threshold hold the door open while it is occupied.",
      "The controller manages opening width, hold-open time, and part-open (winter) modes.",
      "On power failure the leaves are released to be pushed open by hand, or driven open automatically where the building requires it.",
    ],
    specs: [],
    image: "/images/photography/entrance-automation.jpg",
    imageAlt: "Automatic glass entrance doors at a modern building",
    related: ["sliding-glass-door-motor", "automatic-sliding-gates", "fire-sliding-doors"],
    legacyUrl: "https://www.standardautomation.in/sliding-glass-door.html",
  },
];
