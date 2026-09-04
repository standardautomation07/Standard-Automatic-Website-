import type { Product } from "@/lib/types";

/**
 * Entrance Automation — 1 product.
 *
 * This family is deliberately small. The market (and both Indian
 * comparators) also publishes automatic swing, telescopic, revolving and
 * hermetic pedestrian doors; none of those is confirmed as a Standard
 * Automatic Solutions line, so none is published here. They are recorded as
 * NOT CONFIRMED in research/product-source-matrix.csv.
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
];
