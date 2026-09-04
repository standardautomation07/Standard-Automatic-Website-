import type { Product } from "@/lib/types";

/**
 * Access Control & Vehicle Barriers — 6 products.
 *
 * Boom Barriers and Retractable Barriers carry status POTENTIAL: both were
 * published on the company's own server but removed from its navigation, so
 * the line exists but was not being promoted. They are shown with a visible
 * marker rather than hidden — see research/product-source-matrix.csv.
 */
export const accessControlProducts: Product[] = [
  {
    id: "tripod-turnstiles",
    familyId: "access-control",
    categoryId: "pedestrian-access-control",
    name: "Tripod Turnstiles",
    status: "CONFIRMED",
    tagline: "One person, one authorisation, enforced mechanically.",
    summary:
      "Tripod turnstiles for controlled pedestrian entry at gate houses, staff entrances and transit points, with drop-arm emergency release.",
    overview: [
      "A tripod turnstile enforces single-person passage: three arms rotate one third of a turn per authorisation, so a valid credential admits exactly one person. It is the most compact and most economical way to make an access decision physical rather than advisory.",
      "Throughput is moderate, which suits staff entrances and gate houses rather than peak-flow public concourses. Arms drop or free-spin on alarm or power loss so the lane becomes a clear escape route.",
    ],
    quickFacts: [
      { label: "Passage control", value: "One person per authorisation" },
      { label: "Resistance", value: "Waist height, mechanical" },
      { label: "Emergency", value: "Drop-arm release" },
      { label: "Specification", value: "To be confirmed per lane" },
    ],
    benefits: [
      { title: "Enforced single passage", body: "One rotation per authorisation, so tailgating is prevented mechanically rather than only detected." },
      { title: "Compact footprint", body: "Fits gate houses and lobbies where a full-width lane would not." },
      { title: "Reader agnostic", body: "Accepts card, biometric, QR and visitor system inputs through standard interfaces." },
      { title: "Emergency release", body: "Arms drop or free-spin on alarm or power failure, leaving an unobstructed escape route." },
    ],
    variants: [
      { id: "drop-arm", name: "Drop-arm emergency release", note: "The arms fall clear on alarm or power failure, converting the lane into open escape width.", status: "CONFIRMED" },
      { id: "stainless-housing", name: "Stainless steel housing", note: "For external gate houses and washdown or coastal environments where a painted housing would not last.", status: "CONFIRMED" },
    ],
    specGroups: [],
    applications: [
      "Factory and plant gate houses",
      "Corporate and IT campus entrances",
      "Transit, stadium and venue entries",
      "Attendance-controlled staff entrances",
    ],
    industries: ["manufacturing", "infrastructure-transit", "warehousing-logistics", "retail-commercial"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "A valid credential at the reader releases the rotor for one third of a turn.",
      "The rotor locks again once the passage is complete, so the next person needs their own authorisation.",
      "Direction can be set to entry only, exit only, bi-directional or free passage.",
      "On alarm or power failure the arms drop or free-spin, clearing the lane.",
    ],
    construction: [
      "Stainless steel or painted steel housing on a floor-fixed base",
      "Three-arm rotor with a damped, locking mechanism",
      "Reader mounting provision in the housing top",
    ],
    related: ["flap-barriers", "full-height-turnstiles", "boom-barriers"],
    documents: [
      { title: "Pedestrian Access Control brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-tripod-turnstile",
    galleryIds: ["g-tripod-yl121", "g-tripod-el128"],
    legacyUrls: ["tripod-turnstile.html"],
  },
  {
    id: "flap-barriers",
    familyId: "access-control",
    categoryId: "pedestrian-access-control",
    name: "Flap Barriers",
    status: "CONFIRMED",
    tagline: "High-throughput lobby control that does not read as a fence.",
    summary:
      "Flap barrier lanes with retracting acrylic or glass wings for corporate lobbies and high-footfall entrances, including wide accessible lanes.",
    overview: [
      "A flap barrier controls a lane with retracting wings rather than a rotating arm. Because the wings open ahead of an authorised user and close behind them, throughput is much higher than a tripod, and the visual language suits a building lobby rather than a plant gate.",
      "Lanes are usually mixed: several standard-width lanes for normal flow plus at least one wide lane for wheelchair users, trolleys and luggage. Sensor arrays in the lane detect direction, tailgating and objects left behind.",
    ],
    quickFacts: [
      { label: "Throughput", value: "Higher than a tripod turnstile" },
      { label: "Wings", value: "Retracting acrylic or glass" },
      { label: "Accessibility", value: "Wide lane variant" },
      { label: "Specification", value: "To be confirmed per lane" },
    ],
    benefits: [
      { title: "High throughput", body: "Wings open ahead of the user, so authorised flow is not slowed to a mechanical rotation." },
      { title: "Lobby appropriate", body: "Glass or acrylic wings in a stainless housing read as building fit-out rather than security equipment." },
      { title: "Accessible lanes", body: "Wide-lane variants for wheelchair users, trolleys and luggage alongside standard lanes." },
      { title: "Tailgate detection", body: "Lane sensor arrays detect direction, tailgating and objects left in the lane." },
    ],
    variants: [
      { id: "standard-lane", name: "Standard lane", note: "The normal-width lane used for the majority of flow in a lobby installation.", status: "CONFIRMED" },
      { id: "accessible-lane", name: "Wide accessible lane", note: "A wider clear passage for wheelchair users, trolleys and luggage. At least one is normally required per bank of lanes.", status: "CONFIRMED" },
    ],
    specGroups: [],
    applications: [
      "Corporate and IT campus lobbies",
      "Commercial building receptions",
      "Metro and transit concourses",
      "Hotels, hospitals and public buildings",
    ],
    industries: ["retail-commercial", "infrastructure-transit", "healthcare"],
    environments: ["internal", "security"],
    operatingMethod: [
      "A valid credential at the reader retracts the wings ahead of the user.",
      "Sensor arrays along the lane track the passage, close the wings behind the user, and detect tailgating or an object left in the lane.",
      "Direction and mode are set per lane: entry only, exit only, bi-directional or free passage.",
      "On alarm or power failure the wings retract and stay open, clearing the lane.",
    ],
    construction: [
      "Stainless steel lane housings with integrated reader mountings",
      "Retracting acrylic or toughened glass wings",
      "Infrared sensor array along the lane for direction and presence",
    ],
    related: ["tripod-turnstiles", "full-height-turnstiles", "automatic-sliding-glass-doors"],
    documents: [
      { title: "Pedestrian Access Control brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-flap-barrier",
    galleryIds: ["g-flap-e242", "g-flap-h249", "g-flap-y248"],
    legacyUrls: ["flap-barrier.html"],
  },
  {
    id: "full-height-turnstiles",
    familyId: "access-control",
    categoryId: "pedestrian-access-control",
    name: "Full Height Turnstiles",
    status: "CONFIRMED",
    tagline: "An unclimbable line where nobody is watching.",
    summary:
      "Full height turnstiles in single and twin rotor configurations, for unsupervised perimeter entry points where over and under have to be impossible.",
    overview: [
      "A full height turnstile extends the rotor from floor to head height inside a cage, so there is no over and no under. That makes it the correct choice at an unsupervised perimeter point, where a waist-height unit could simply be stepped over.",
      "Single and twin-lane rotor configurations are available, and the unit's behaviour on power failure — free-spin, locked, or controlled release — is chosen against the site's escape and security requirements rather than assumed.",
    ],
    quickFacts: [
      { label: "Resistance", value: "Floor-to-head-height rotor" },
      { label: "Supervision", value: "Suited to unsupervised points" },
      { label: "Configurations", value: "Single or twin rotor" },
      { label: "Specification", value: "To be confirmed per lane" },
    ],
    benefits: [
      { title: "No over, no under", body: "A floor-to-head-height rotor inside a cage removes the obvious defeats of a waist-height unit." },
      { title: "Unsupervised operation", body: "Suited to perimeter points with no permanent guard presence." },
      { title: "Single or twin lane", body: "One or two rotors in a shared frame, depending on the flow the point has to carry." },
      { title: "Defined fail state", body: "Free-spin, locked or controlled release on power loss, specified against the escape strategy." },
    ],
    variants: [
      { id: "single-lane", name: "Single rotor", note: "One controlled passage in a self-contained frame. The usual arrangement at a secondary perimeter point.", status: "CONFIRMED" },
      { id: "twin-lane", name: "Twin rotor", note: "Two rotors in a shared frame, typically set for entry and exit, where flow justifies both in one footprint.", status: "CONFIRMED" },
    ],
    specGroups: [],
    applications: [
      "Plant and site perimeter entry points",
      "Data centres and restricted zones",
      "Stadium and venue perimeters",
      "Unmanned staff and contractor entrances",
    ],
    industries: ["manufacturing", "infrastructure-transit", "warehousing-logistics"],
    environments: ["external", "security"],
    operatingMethod: [
      "A valid credential releases the rotor for one controlled passage.",
      "The rotor locks again once the passage is complete; the cage prevents climbing over or crawling under.",
      "Direction is set per rotor: entry only, exit only, or bi-directional.",
      "On power failure the rotor free-spins, locks or is released, according to the behaviour specified for the site.",
    ],
    construction: [
      "Galvanised or stainless steel cage and frame with a floor-to-head-height rotor",
      "Damped rotor mechanism with a controlled locking arrangement",
      "Reader mounting and roof canopy options for external points",
    ],
    related: ["tripod-turnstiles", "flap-barriers", "bollards"],
    documents: [
      { title: "Pedestrian Access Control brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-full-height-turnstile",
    galleryIds: ["g-full-g538", "g-full-g535-2"],
    legacyUrls: ["full-height-barrier.html"],
  },
  {
    id: "bollards",
    familyId: "access-control",
    categoryId: "vehicle-access-control",
    name: "Bollards",
    status: "CONFIRMED",
    tagline: "A vehicle line held physically, not advisorily.",
    summary:
      "Fixed, removable and automatic rising bollards for controlling vehicle access to entrances, plazas and restricted zones while pedestrians pass freely.",
    overview: [
      "A bollard is the simplest way to make a boundary that vehicles physically cannot cross while pedestrians walk over it freely. Fixed units mark a permanent line; removable units open it occasionally for service access; automatic rising units retract into the road surface on demand and re-deploy behind the vehicle.",
      "Selection is about how often the line has to open and what has to be stopped. A bollard controlling a delivery yard and one protecting a building entrance are different specifications even where they look similar above ground.",
    ],
    quickFacts: [
      { label: "Line type", value: "Physical vehicle barrier" },
      { label: "Pedestrians", value: "Unaffected" },
      { label: "Configurations", value: "Fixed, removable, automatic" },
      { label: "Specification", value: "To be confirmed per installation" },
    ],
    benefits: [
      { title: "Physical vehicle control", body: "A barrier vehicles cannot cross, while pedestrian movement over the line is unaffected." },
      { title: "Fixed, removable or automatic", body: "Chosen against how frequently the line needs to open, and for whom." },
      { title: "Flush when retracted", body: "Automatic units drop into the road surface, leaving the carriageway clear when access is granted." },
      { title: "Access-system driven", body: "Operated from readers, remotes, loop detectors or a gatehouse control, like any other access point." },
    ],
    variants: [
      { id: "fixed", name: "Fixed", note: "A permanent line. The cheapest and most robust option where the line never has to open.", status: "CONFIRMED" },
      { id: "removable", name: "Removable", note: "Lifted out with a key for occasional service access, then replaced. Suits lines that open a few times a month.", status: "CONFIRMED" },
      { id: "automatic-rising", name: "Automatic rising", note: "Retracts flush into the carriageway on demand and re-deploys behind the vehicle. For lines that open many times a day.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: [
      "Building entrances and forecourts",
      "Pedestrian plazas and service access routes",
      "Restricted zones and parking control",
      "Campus and facility perimeters",
    ],
    industries: ["retail-commercial", "infrastructure-transit", "manufacturing"],
    environments: ["external", "security"],
    operatingMethod: [
      "Fixed bollards are set into a foundation and mark a permanent line.",
      "Removable bollards lift out of a ground socket with a key and are replaced afterwards.",
      "Automatic bollards are driven down into a sleeve below the carriageway on a valid authorisation and re-deploy once the vehicle has passed.",
      "Automatic units are operated from readers, remotes, loop detectors or a gatehouse control.",
    ],
    construction: [
      "Steel or stainless steel bollard body with a protective finish",
      "Ground socket or foundation sleeve appropriate to the type",
      "Drive and control unit on automatic rising installations",
    ],
    related: ["boom-barriers", "retractable-barriers", "full-height-turnstiles"],
    documents: [
      { title: "Vehicle Access Control brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-bollard",
    legacyUrls: ["bollard.html"],
  },
  {
    id: "boom-barriers",
    familyId: "access-control",
    categoryId: "vehicle-access-control",
    name: "Boom Barriers",
    status: "POTENTIAL",
    tagline: "Metering vehicles at the gate line, one at a time.",
    summary:
      "Automatic boom barriers for car park entries, plant gate houses and toll points, driven from loop detectors, readers, remotes or a gatehouse control.",
    overview: [
      "A boom barrier meters vehicles: it holds the gate line closed, opens for one authorised vehicle, and closes again behind it. It is a control device rather than a security barrier — its job is to regulate flow and record movements, and it will not stop a determined vehicle. Where the line has to be enforced physically, a bollard is the correct product.",
      "Specification comes down to boom length, cycle speed and duty. A barrier on a busy car park entry runs thousands of cycles a month and needs an operator rated for it.",
    ],
    quickFacts: [
      { label: "Function", value: "Traffic metering, not physical security" },
      { label: "Closure", value: "Loop-confirmed behind each vehicle" },
      { label: "Manual release", value: "Yes" },
      { label: "Specification", value: "To be confirmed per installation" },
    ],
    benefits: [
      { title: "One vehicle per authorisation", body: "Loop detectors close the boom behind each vehicle rather than on a timer." },
      { title: "Fast cycling", body: "Short open and close times keep queues moving at busy entries and exits." },
      { title: "Access-system driven", body: "Card readers, remotes, ANPR, ticket machines and gatehouse controls all drive the same barrier." },
      { title: "Safety interlocked", body: "Ground loops and photocells prevent the boom descending onto a vehicle or a person." },
    ],
    variants: [
      { id: "straight-boom", name: "Straight boom", note: "The standard arrangement for a normal-width lane with clear headroom above the barrier.", status: "POTENTIAL" },
      { id: "folding-boom", name: "Folding boom", note: "The boom articulates as it rises, for lanes with restricted headroom such as basement entries.", status: "POTENTIAL" },
      { id: "fence-boom", name: "Fence boom", note: "A skirted boom that deters pedestrians from ducking under the barrier at a mixed-traffic entry.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: [
      "Car park entries and exits",
      "Factory and plant gate houses",
      "Toll and weighbridge points",
      "Campus and society vehicle entries",
    ],
    industries: ["retail-commercial", "manufacturing", "infrastructure-transit", "warehousing-logistics"],
    environments: ["external"],
    operatingMethod: [
      "A valid credential, ticket or loop trigger raises the boom.",
      "A ground loop under the lane confirms the vehicle has cleared before the boom is lowered.",
      "Photocells prevent the boom descending onto a vehicle or person.",
      "A manual release allows the boom to be raised by hand during a power failure.",
    ],
    construction: [
      "Steel cabinet housing the drive, spring balance and control board",
      "Aluminium boom, straight or articulated, sized to the lane width",
      "Ground loops and photocells at the lane",
    ],
    related: ["bollards", "retractable-barriers", "automatic-sliding-gates"],
    documents: [
      { title: "Vehicle Access Control brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-boom-barrier",
    legacyUrls: ["boom-barriers.html"],
  },
  {
    id: "retractable-barriers",
    familyId: "access-control",
    categoryId: "vehicle-access-control",
    name: "Retractable Barriers",
    status: "POTENTIAL",
    tagline: "A barrier line that exists only when you need it.",
    summary:
      "Retractable barrier systems that close a wide vehicle or pedestrian line and fold back into a compact stack when the route is open.",
    overview: [
      "A retractable barrier closes a line that only needs to exist some of the time. The barrier folds into a short stack against the boundary when open, so nothing obstructs the route, and extends across the full width when the line has to be held.",
      "It suits sites where the same opening is a wide free-flow route during working hours and a controlled or closed line outside them.",
    ],
    quickFacts: [
      { label: "Line type", value: "Time-based, foldable" },
      { label: "When open", value: "Route completely clear" },
      { label: "Operation", value: "Powered or manual" },
      { label: "Specification", value: "To be confirmed per installation" },
    ],
    benefits: [
      { title: "Wide lines, compact stack", body: "A folding structure closes a wide opening but parks in a short length of boundary." },
      { title: "Nothing left in the route", body: "When retracted, the carriageway or walkway is completely clear." },
      { title: "Time-based control", body: "Suits openings that are free-flow during working hours and closed outside them." },
      { title: "Powered or manual", body: "Motorised operation with manual release, or manual-only where duty is light." },
    ],
    variants: [
      { id: "powered", name: "Powered", note: "Motorised extension and retraction with a manual release, where the line opens and closes several times a day.", status: "POTENTIAL" },
      { id: "manual", name: "Manual", note: "Hand-operated, for lines that change state once or twice a day on a shift pattern.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: [
      "Yard and service entrances",
      "Temporary and shift-based closures",
      "Wide site openings",
      "Parking and access route control",
    ],
    industries: ["warehousing-logistics", "manufacturing", "retail-commercial"],
    environments: ["external"],
    operatingMethod: [
      "A folding structure extends across the opening from a parked stack at one side.",
      "Powered units are driven from a control station, remote or gatehouse; manual units are pulled across by hand.",
      "When retracted, the structure parks against the boundary leaving the route clear.",
      "A manual release allows a powered unit to be moved during a power failure.",
    ],
    construction: [
      "Folding lattice or link structure with ground wheels",
      "Parked stack arrangement at one side of the opening",
      "Drive unit and control station on powered installations",
    ],
    related: ["boom-barriers", "retractable-gates", "bollards"],
    documents: [
      { title: "Vehicle Access Control brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-retractable-barrier",
    legacyUrls: ["retractable-barriers.html"],
  },
];
