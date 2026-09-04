import type { Product } from "@/lib/types";

/** Automatic Gates — 4 products. */
export const automaticGateProducts: Product[] = [
  {
    id: "automatic-sliding-gates",
    familyId: "automatic-gates",
    categoryId: "sliding-gates",
    name: "Automatic Sliding Gates",
    status: "CONFIRMED",
    tagline: "The default for wide site entrances with room to run the leaf sideways.",
    summary:
      "Motorised sliding gates for factory, warehouse and campus entrances, running on a floor track or cantilevered clear of the driveway.",
    overview: [
      "A sliding gate moves a single leaf parallel to the boundary line, which makes it the practical choice wherever there is no room for a leaf to swing into the road or the yard. Two arrangements are common: track-guided, where the leaf runs on a ground rail, and cantilever, where the leaf is carried on rollers set back from the opening so nothing crosses the driveway.",
      "Cantilever suits sites where the driveway must stay clear for drainage, silt or heavy vehicle loading. Track-guided suits long, heavy leaves on a level, well-drained approach. In both cases the operator is sized to the leaf weight and to how many times a day the gate actually runs.",
    ],
    quickFacts: [
      { label: "Leaf travel", value: "Parallel to the boundary" },
      { label: "Arrangements", value: "Track guided or cantilever" },
      { label: "Manual release", value: "Key operated" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      { title: "No swing arc required", body: "The leaf runs alongside the boundary, so no part of the road or yard has to be kept clear for the gate to open." },
      { title: "Suits heavy, wide leaves", body: "Sliding arrangements carry long spans better than swing leaves, which load the hinge post harder as they get wider." },
      { title: "Wind tolerant", body: "A guided leaf is less exposed than a swing leaf standing open at right angles to the boundary." },
      { title: "Access control at the gate line", body: "Loop detectors, remotes, readers and intercoms drive the operator directly, so the gate becomes part of the site's access system." },
    ],
    variants: [
      { id: "tracked", name: "Track guided", note: "The leaf runs on a ground rail. Suits long, heavy leaves on a level, well-drained approach; the track must be kept clear of silt.", status: "CONFIRMED" },
      { id: "cantilever", name: "Cantilever", note: "The leaf is carried on rollers set back from the opening, so nothing crosses the driveway. Chosen where drainage, silt or heavy axle loads rule out a ground track.", status: "POTENTIAL" },
    ],
    applications: [
      "Factory and plant main gates",
      "Warehouse and logistics yards",
      "Corporate campus vehicle entries",
      "Housing societies and gated developments",
    ],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial", "infrastructure-transit"],
    environments: ["external", "security"],
    operatingMethod: [
      "The leaf is carried on rollers — on a ground track, or cantilevered on a support beam clear of the driveway.",
      "A gear motor drives a rack fixed along the leaf, with adjustable open and close limits and soft stop at both ends.",
      "Photocells across the opening and a safety edge on the leading edge stop and reverse travel on obstruction.",
      "Remotes, readers, keypads, loop detectors or an intercom trigger the operator; a key-operated manual release allows hand operation without power.",
    ],
    construction: [
      "Steel leaf frame with infill to match the boundary treatment",
      "Ground track and guide rollers, or a cantilever beam and roller carriage",
      "Toothed rack along the leaf, driven by a gear motor",
    ],
    related: ["telescopic-sliding-gates", "automatic-swing-gates", "boom-barriers"],
    documents: [
      { title: "Automatic Gate range brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
      { title: "Gate layout drawing", kind: "Technical drawing", href: null, note: "Produced per project once the opening and side-run are surveyed." },
    ],
    imageId: "p-gate-sliding",
    legacyUrls: ["sliding-gate.html"],
  },
  {
    id: "telescopic-sliding-gates",
    familyId: "automatic-gates",
    categoryId: "sliding-gates",
    name: "Telescopic Sliding Gates",
    status: "CONFIRMED",
    tagline: "Full opening width on a site with only half the side-run.",
    summary:
      "Multi-leaf sliding gates whose panels nest as they retract, for wide openings on boundaries too short for a single leaf.",
    overview: [
      "A telescopic gate solves a specific site constraint: the opening is wide, but there is nowhere near enough clear boundary alongside it for a single sliding leaf to retract into. Two or three leaves run on parallel tracks and nest inside one another, so the retracted stack is a fraction of the open width.",
      "Because the leaves move at different speeds and have to stay synchronised, the drive and guidance arrangement is more involved than a single-leaf gate. In exchange, the entrance also opens faster — each leaf travels a shorter distance.",
    ],
    quickFacts: [
      { label: "Side-run needed", value: "About half a single leaf" },
      { label: "Leaves", value: "Two or three, nesting" },
      { label: "Opening time", value: "Shorter than an equivalent single leaf" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      { title: "Half the side-run", body: "Nested leaves retract into roughly half the space a single sliding leaf of the same opening width would need." },
      { title: "Faster opening", body: "Each leaf covers a shorter distance, so the entrance clears more quickly than an equivalent single-leaf slide." },
      { title: "Wide clear openings", body: "Suited to entrances that must admit trailers and large vehicles from a constrained boundary." },
      { title: "Synchronised travel", body: "Leaves are driven and guided together, with obstruction detection across the full opening." },
    ],
    variants: [
      { id: "two-leaf", name: "Two-leaf nesting", note: "The usual arrangement. Halves the required side-run compared with a single leaf of the same opening width.", status: "CONFIRMED" },
      { id: "three-leaf", name: "Three-leaf nesting", note: "For very wide openings on very short boundaries, at the cost of a more involved drive and guidance arrangement.", status: "POTENTIAL" },
    ],
    applications: [
      "Constrained industrial entrances",
      "Urban plots with limited boundary run",
      "Commercial premises on narrow frontages",
      "Yards needing a wide clear opening",
    ],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial"],
    environments: ["external", "security"],
    operatingMethod: [
      "Two or three leaves run on parallel tracks, coupled so they extend and nest together.",
      "A gear motor drives the leading leaf; the coupling carries the others at proportional speeds.",
      "Photocells and safety edges cover the full opening width during travel.",
      "A manual release allows the leaves to be moved by hand during a power failure.",
    ],
    construction: [
      "Two or three steel leaf frames on parallel tracks",
      "Coupling and guidance arrangement to keep the leaves synchronised",
      "Gear motor with rack drive on the leading leaf",
    ],
    related: ["automatic-sliding-gates", "retractable-gates", "boom-barriers"],
    documents: [
      { title: "Automatic Gate range brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-gate-telescopic",
    legacyUrls: ["telescoping-gate.html"],
  },
  {
    id: "automatic-swing-gates",
    familyId: "automatic-gates",
    categoryId: "swing-gates",
    name: "Automatic Swing Gates",
    status: "CONFIRMED",
    tagline: "For entrances with clear swing room and moderate traffic.",
    summary:
      "Single or double leaf swing gates with articulated arm, linear ram or underground operators, and nothing crossing the driveway.",
    overview: [
      "A swing gate hinges on posts either side of the opening. Where the site has depth for a leaf to open inward and traffic is moderate, it is the simplest and least expensive way to automate an entrance, and it keeps the driveway free of tracks and guides.",
      "Operator choice follows the leaf: an articulated arm for wide or heavy leaves, a linear ram for typical residential and light commercial leaves, and an underground operator where the drive must be invisible. Wind exposure matters more here than on a sliding gate, because an open leaf presents a large surface at right angles to the boundary.",
    ],
    quickFacts: [
      { label: "Driveway", value: "No track or guide across it" },
      { label: "Operators", value: "Arm, ram or underground" },
      { label: "Leaves", value: "Single or double" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      { title: "Nothing crosses the driveway", body: "No ground track or guide rail, so drainage and heavy vehicle loading across the entrance are unaffected." },
      { title: "Simple, lower-cost automation", body: "Fewer moving parts than a sliding arrangement on entrances that do not need continuous duty." },
      { title: "Concealed drive options", body: "Underground operators keep the hardware out of sight where the entrance is architecturally sensitive." },
      { title: "Safe leaf travel", body: "Photocells and obstruction detection govern the swing arc, with an adjustable soft stop at both ends." },
    ],
    variants: [
      { id: "articulated-arm", name: "Articulated arm operator", note: "For wide or heavy leaves, and where the hinge post sits back from the opening. The arm folds as the leaf swings.", status: "CONFIRMED" },
      { id: "linear-ram", name: "Linear ram operator", note: "The usual choice for residential and light commercial leaves. Compact and simple to install on a standard hinge post.", status: "CONFIRMED" },
      { id: "underground", name: "Underground operator", note: "The drive sits in a foundation box at the hinge, invisible when the gate is closed. Requires drainage in the box.", status: "POTENTIAL" },
    ],
    applications: [
      "Residential and villa entrances",
      "Housing society side gates",
      "Office and institutional entrances",
      "Secondary gates on industrial sites",
    ],
    industries: ["retail-commercial", "manufacturing", "healthcare"],
    environments: ["external"],
    operatingMethod: [
      "Each leaf carries an operator — an articulated arm, a linear ram, or an underground unit at the hinge.",
      "The controller sequences the two leaves so they open and close in the right order and do not clash at the meeting stile.",
      "Photocells across the opening stop travel when the arc is obstructed.",
      "A manual release on each operator lets the leaves be swung by hand when there is no power.",
    ],
    construction: [
      "Steel leaf frames on hinge posts either side of the opening",
      "Operator per leaf, sized against leaf weight, width and wind exposure",
      "Electric lock at the meeting stile where required",
    ],
    related: ["automatic-sliding-gates", "telescopic-sliding-gates", "retractable-gates"],
    documents: [
      { title: "Automatic Gate range brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-gate-swing",
    legacyUrls: ["swing-gate.html"],
  },
  {
    id: "retractable-gates",
    familyId: "automatic-gates",
    categoryId: "retractable-gates",
    name: "Retractable Gates",
    status: "CONFIRMED",
    tagline: "A folding lattice leaf that collapses into a very short stack.",
    summary:
      "Motorised retractable gates in lengths to 30 m and a standard 1.6 m height, trackless or on single and double tracks, with 220 V drive and remote control.",
    overview: [
      "A retractable gate uses a folding lattice frame instead of a rigid leaf. Because the structure collapses on itself, a long opening can be closed by a gate that parks into a very short length of boundary — which is why the type is so common on factory, school and campus gates in India.",
      "Trackless, single-track and double-track arrangements are available. Trackless is preferred where nothing may cross the driveway; tracked arrangements give more lateral stability on long runs and exposed sites.",
    ],
    quickFacts: [
      { label: "Maximum length", value: "30 m" },
      { label: "Standard height", value: "1.6 m" },
      { label: "Travel speed", value: "17–19 m/min" },
      { label: "Remote range", value: "30 m or more" },
    ],
    benefits: [
      { title: "Very compact when open", body: "The lattice folds on itself, so long openings need only a short parked length of boundary." },
      { title: "Long spans", body: "Standard configurations cover openings up to 30 m, closed by a single powered leaf." },
      { title: "Trackless option", body: "A no-track arrangement leaves the driveway completely clear for drainage and heavy vehicles." },
      { title: "Remote operated", body: "Supplied with remote control, with a stated working range of 30 m or more." },
    ],
    variants: [
      { id: "trackless", name: "Trackless", note: "Nothing crosses the driveway. Preferred where drainage, silt or heavy axle loads make a ground track impractical.", status: "CONFIRMED" },
      { id: "single-track", name: "Single track", note: "One ground rail for added lateral stability on longer runs.", status: "CONFIRMED" },
      { id: "double-track", name: "Double track", note: "Two ground rails for the greatest stability on long or wind-exposed openings.", status: "CONFIRMED" },
    ],
    applications: [
      "Factory and enterprise gates",
      "School and university entrances",
      "Government and institutional premises",
      "Large yards and depots",
    ],
    industries: ["manufacturing", "warehousing-logistics", "infrastructure-transit"],
    environments: ["external", "security"],
    operatingMethod: [
      "A folding lattice frame extends across the opening and collapses into a short stack against the boundary.",
      "A drive unit within the leading section pulls the lattice open and closed at 17–19 m/min.",
      "A remote handset with a stated working range of 30 m or more operates the gate.",
      "A manual release allows the lattice to be moved by hand during a power failure.",
    ],
    construction: [
      "Folding lattice of 52 × 50 × 0.65 mm main tube and 44 × 35 × 0.6 mm cross tube",
      "Plastic or cast aluminium wheels, 95 mm diameter",
      "Trackless, single-track or double-track ground arrangement",
    ],
    related: ["automatic-sliding-gates", "telescopic-sliding-gates", "retractable-barriers"],
    documents: [
      { title: "Retractable Gate datasheet", kind: "Datasheet", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-gate-retractable",
    legacyUrls: ["retractable-gates.html"],
  },
];
