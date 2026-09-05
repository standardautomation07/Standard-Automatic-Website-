import type { Product } from "@/lib/types";

/**
 * Entrance Automation — 3 products.
 *
 * Automatic swing doors and hermetic/cleanroom doors were added after the
 * 2026-09-05 market review. Both are standard adjacencies for a company
 * already supplying automatic sliding doors and fire-rated sliding doors into
 * healthcare and pharmaceutical work, and both are supplied by comparable
 * Pune-based manufacturers. Neither is evidenced as a current Standard
 * Automation line, so both carry status POTENTIAL and are shown with a
 * visible "to be confirmed" marker rather than presented as established
 * products.
 *
 * Revolving doors and interlocking security portals remain NOT CONFIRMED and
 * are still absent — see research/product-source-matrix.csv.
 */
export const entranceAutomationProducts: Product[] = [
  {
    id: "automatic-sliding-glass-doors",
    familyId: "entrance-automation",
    categoryId: "automatic-sliding-doors",
    name: "Automatic Sliding Glass Doors",
    status: "CONFIRMED",
    tagline: "Hands-free pedestrian entrances that still hold the building envelope.",
    summary:
      "Sensor-operated sliding glass door systems for lobbies, retail and healthcare entrances, in single-leaf and bi-parting arrangements with defined egress behaviour.",
    overview: [
      "An automatic sliding glass door is a pedestrian entrance driven by an operator concealed in a header above the opening. Motion and presence sensors on each side open the leaves as people approach and hold them open while anyone remains in the threshold.",
      "Three questions decide the specification: throughput, sealing and egress. Bi-parting leaves clear the opening faster than a single leaf; a well-sealed door reduces conditioning loss through a busy lobby; and the door's behaviour on power failure and on alarm has to be defined against the building's escape strategy before installation, not discovered afterwards.",
    ],
    quickFacts: [
      { label: "Operation", value: "Sensor activated, hands-free" },
      { label: "Arrangements", value: "Single leaf and bi-parting" },
      { label: "Modes", value: "Auto, partial, exit only, locked, hold open" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      { title: "Hands-free passage", body: "Motion and presence detection open the door before the user reaches it and hold it open while the threshold is occupied." },
      { title: "Controlled air loss", body: "A powered door stands open only as long as it is needed, and a part-open mode cuts conditioning loss further." },
      { title: "Accessible by default", body: "No leaf to pull, which removes the main barrier for wheelchair users, trolleys, beds and carried loads." },
      { title: "Defined egress behaviour", body: "Break-out leaves and fail-safe modes are specified against the escape route requirement for that opening." },
    ],
    variants: [
      { id: "single-leaf", name: "Single leaf", note: "One leaf sliding to one side. Suits narrower openings and lower footfall.", status: "CONFIRMED" },
      { id: "bi-parting", name: "Bi-parting", note: "Two leaves parting from the centre. Clears the opening in roughly half the time, which matters at peak footfall.", status: "CONFIRMED" },
      { id: "telescopic", name: "Telescopic", note: "Nested leaves give a wider clear opening from a narrower overall frame — for openings where the structure limits the header width.", status: "POTENTIAL" },
      { id: "break-out", name: "Break-out escape leaves", note: "Leaves swing out under push force to give a clear escape width. Required where the opening sits on a designated escape route.", status: "POTENTIAL" },
    ],
    applications: [
      "Office and corporate building lobbies",
      "Retail and showroom entrances",
      "Hospitals, clinics and diagnostic centres",
      "Hotels and hospitality entrances",
      "Institutional and public buildings",
    ],
    industries: ["retail-commercial", "healthcare", "infrastructure-transit"],
    environments: ["internal", "external"],
    operatingMethod: [
      "An operator in the header carries the leaves on a track and drives them by belt.",
      "Overhead sensors detect approach; safety sensors in the threshold hold the door open while it is occupied.",
      "The controller manages opening width, hold-open time and part-open modes through a mode selector.",
      "On power failure the leaves are released to be pushed open by hand, or driven open automatically, depending on the escape strategy agreed for the opening.",
    ],
    construction: [
      "Header-mounted belt-drive operator with a carriage and track",
      "Toughened glass leaves in an aluminium frame, or frameless where specified",
      "Approach and presence sensors on both sides of the opening",
      "Threshold and side seals where the lobby is conditioned",
    ],
    related: ["tripod-turnstiles", "flap-barriers", "fire-rated-sliding-doors"],
    documents: [
      { title: "Automatic Sliding Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
      { title: "Header and threshold detail", kind: "Technical drawing", href: null, note: "Produced per project once the opening and header depth are surveyed." },
    ],
    imageId: "p-auto-sliding-doors",
    legacyUrls: ["sliding-glass-door.html"],
  },
  {
    id: "automatic-swing-doors",
    familyId: "entrance-automation",
    categoryId: "automatic-swing-doors",
    name: "Automatic Swing Doors",
    status: "POTENTIAL",
    tagline: "Powered hinged leaves where a sliding track will not fit.",
    summary:
      "Operator-driven swing doors for corridors, lobbies and accessible entrances, in low-energy and full-power configurations with hands-free activation.",
    overview: [
      "An automatic swing door puts a powered operator on a conventional hinged leaf. It suits openings where there is no room beside the door for a sliding leaf to run, where the door must remain usable as an ordinary swing door, and where an existing doorset is being upgraded rather than replaced.",
      "The distinction that matters is low-energy against full-power operation. A low-energy door opens slowly enough that its kinetic energy is limited by design, which is why it is the usual choice on accessible entrances used by people who may not move out of the way quickly. A full-power door moves faster and therefore needs presence sensing and guarding around the swing arc.",
    ],
    quickFacts: [
      { label: "Operation", value: "Powered hinged leaf" },
      { label: "Modes", value: "Low-energy or full-power" },
      { label: "Activation", value: "Push plate, wave, reader" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      { title: "Fits where sliding cannot", body: "No side-run is needed for a retracting leaf, so a swing operator suits corridors and openings with walls close to both jambs." },
      { title: "Upgrades an existing doorset", body: "An operator can often be added to a sound existing leaf and frame rather than replacing the whole opening." },
      { title: "Accessible by design", body: "Low-energy operation gives assisted opening on accessible entrances without the guarding a fast leaf requires." },
      { title: "Still a door without power", body: "The leaf remains manually operable, which matters where the opening also serves as an escape route." },
    ],
    variants: [
      { id: "low-energy", name: "Low energy", note: "Opens slowly enough that kinetic energy is limited by design. The usual choice for accessible entrances and public corridors.", status: "POTENTIAL" },
      { id: "full-power", name: "Full power", note: "Faster operation for higher traffic, requiring presence sensing and guarding around the swing arc.", status: "POTENTIAL" },
      { id: "double-leaf", name: "Double leaf with sequencing", note: "Two operators sequenced so the leaves open and close in the correct order at a meeting stile.", status: "POTENTIAL" },
      { id: "concealed", name: "Concealed operator", note: "Operator housed within the transom where the entrance is architecturally sensitive.", status: "POTENTIAL" },
    ],
    applications: [
      "Hospital and clinic corridors",
      "Accessible building entrances",
      "Office and institutional lobbies",
      "Upgrades to existing hinged doorsets",
    ],
    industries: ["healthcare", "retail-commercial", "infrastructure-transit"],
    environments: ["internal"],
    operatingMethod: [
      "An operator mounted on the frame or within the transom drives the leaf through its arc.",
      "Activation by push plate, wave sensor, reader or remote release opens the door; presence sensors hold it while the threshold is occupied.",
      "The controller sets opening angle, speed and hold-open time, and sequences a second leaf where one is fitted.",
      "Without power the operator releases so the leaf works as an ordinary swing door.",
    ],
    construction: [
      "Surface-mounted or concealed operator with an arm or slide-track linkage",
      "Existing or new hinged leaf and frame, checked for weight and hinge condition",
      "Presence and activation sensors on both faces",
    ],
    related: ["automatic-sliding-glass-doors", "hermetic-cleanroom-doors", "fire-rated-sliding-doors"],
    documents: [
      { title: "Automatic Swing Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-swing-doors",
  },
  {
    id: "hermetic-cleanroom-doors",
    familyId: "entrance-automation",
    categoryId: "hermetic-cleanroom-doors",
    name: "Hermetic & Cleanroom Doors",
    status: "POTENTIAL",
    tagline: "An opening that can hold a pressure differential and a classification.",
    summary:
      "Automatic sliding doors that seal on all four edges, for operating theatres, gowning rooms, material airlocks and classified production areas.",
    overview: [
      "A hermetic door seals against its frame on all four edges as it closes, rather than simply meeting a stop. That is what allows the opening to sit in a wall separating two classified areas without breaking the pressure cascade that keeps the cleaner side clean.",
      "In practice these doors are specified with the room, not after it. Seal detail, surface finish, vision panel construction and interlocking with a second door all follow from the classification, the pressure regime and the cleaning agents in use — which is why the door and the room are designed together.",
    ],
    quickFacts: [
      { label: "Sealing", value: "All four edges on closing" },
      { label: "Operation", value: "Automatic sliding, hands-free" },
      { label: "Airlocks", value: "Interlockable pairs" },
      { label: "Specification", value: "To be confirmed per room" },
    ],
    benefits: [
      { title: "Holds the pressure cascade", body: "A sealed leaf lets a classified area keep its differential across an opening that has to be crossed constantly." },
      { title: "Cleanable by design", body: "Flush faces, concealed fixings and coved details leave nowhere for residue to collect." },
      { title: "Interlockable", body: "Paired doors can be prevented from opening together, which is what makes an airlock an airlock." },
      { title: "Hands-free", body: "Wave, elbow or foot activation suits gowned staff and anyone carrying instruments or materials." },
    ],
    variants: [
      { id: "single-leaf", name: "Single leaf", note: "The standard arrangement for gowning rooms and personnel access between classified areas.", status: "POTENTIAL" },
      { id: "bi-parting", name: "Bi-parting", note: "Two leaves for wider openings such as material and equipment transfer.", status: "POTENTIAL" },
      { id: "airlock-interlocked", name: "Airlock interlocked pair", note: "Two doors electrically interlocked so both are never open at once, with override defined against the escape strategy.", status: "POTENTIAL" },
      { id: "shielded", name: "Shielded", note: "Lead-lined leaf where the room also requires radiation shielding, coordinated with the room shielding design.", status: "POTENTIAL" },
    ],
    applications: [
      "Operating theatres and recovery suites",
      "Gowning rooms and personnel airlocks",
      "Material and equipment transfer airlocks",
      "Classified production and packing areas",
      "Laboratories and biotech facilities",
    ],
    industries: ["pharmaceutical-cleanroom", "healthcare", "cold-chain-food"],
    environments: ["internal", "hygiene"],
    operatingMethod: [
      "A header-mounted operator drives the leaf, which presses onto its seals as it reaches the closed position.",
      "Hands-free activation opens the door; presence detection holds it while the threshold is occupied.",
      "Where the opening forms an airlock, an interlock prevents the paired door opening until this one is sealed.",
      "On alarm or power failure the door adopts the behaviour agreed with the containment and escape strategy.",
    ],
    construction: [
      "Sealing leaf with perimeter gaskets on all four edges",
      "Flush hygienic facings with concealed fixings",
      "Flush-glazed vision panel where sightlines are required",
      "Header operator with interlock and access control inputs",
    ],
    related: ["automatic-sliding-glass-doors", "fire-rated-sliding-doors", "automatic-swing-doors"],
    documents: [
      { title: "Hermetic Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
      { title: "Room interface drawing", kind: "Technical drawing", href: null, note: "Produced per project, coordinated with the cleanroom designer." },
    ],
    imageId: "p-hermetic-doors",
  },
];
