import type { Product } from "@/lib/types";

/**
 * Security & Access — 6 products.
 *
 * Boom Barriers and Retractable Barriers were live on the old server but
 * commented out of its navigation. Per the brief they are retained rather
 * than dropped, and carry `pendingConfirmation` until the business confirms
 * they are still active, sellable lines. The UI surfaces that state; it
 * never silently hides them.
 */
export const securityAccessProducts: Product[] = [
  {
    slug: "bollards",
    category: "security-access",
    name: "Bollards",
    tagline: "The vehicle line, held physically rather than advisorily.",
    summary:
      "Fixed, removable and automatic rising bollards for controlling vehicle access to plazas, entrances and restricted zones.",
    overview: [
      "A bollard is the simplest way to make a boundary that vehicles physically cannot cross while pedestrians walk over it freely. Fixed units mark a permanent line; removable units open it occasionally for service access; automatic rising units retract into the road surface on demand and re-deploy behind the vehicle.",
      "Selection is about how often the line has to open and what has to be stopped. A bollard controlling a delivery yard and one protecting a building entrance are different specifications even where they look similar above ground.",
    ],
    benefits: [
      {
        title: "Physical vehicle control",
        body: "A barrier vehicles cannot cross, while pedestrian movement over the line is unaffected.",
      },
      {
        title: "Fixed, removable or automatic",
        body: "Chosen against how frequently the line needs to open and for whom.",
      },
      {
        title: "Flush when retracted",
        body: "Automatic units drop into the road surface, leaving the carriageway clear when access is granted.",
      },
      {
        title: "Access-system driven",
        body: "Operated from readers, remotes, loop detectors or a gatehouse control, like any other access point.",
      },
    ],
    applications: [
      "Building entrances and forecourts",
      "Pedestrian plazas and service access routes",
      "Restricted zones and parking control",
      "Campus and facility perimeters",
    ],
    specs: [],
    image: "/images/legacy/bollard-cover.jpg",
    imageAlt: "A protection bollard installed beside an industrial door opening",
    related: ["boom-barriers", "full-height-turnstiles", "retractable-barriers"],
    legacyUrl: "https://www.standardautomation.in/bollard.html",
  },
  {
    slug: "tripod-turnstiles",
    category: "security-access",
    name: "Tripod Turnstiles",
    tagline: "One person, one authorisation, at the door line.",
    summary:
      "Tripod turnstiles (HTO series) for controlled pedestrian entry in lobbies, plant gate houses and transit areas, with drop-arm emergency release.",
    overview: [
      "A tripod turnstile enforces single-person passage: three arms rotate one-third of a turn per authorisation, so a valid credential admits exactly one person. It is the most compact and most economical way to make an access decision physical rather than advisory.",
      "Throughput is moderate, which suits staff entrances and gate houses rather than peak-flow public concourses. Arms usually drop or release on alarm or power loss so the lane becomes a free escape route.",
    ],
    benefits: [
      {
        title: "Enforced single passage",
        body: "One rotation per authorisation, so tailgating is prevented mechanically rather than only detected.",
      },
      {
        title: "Compact footprint",
        body: "Fits gate houses and lobbies where a full-width lane would not.",
      },
      {
        title: "Reader agnostic",
        body: "Accepts card, biometric, QR and visitor system inputs through standard interfaces.",
      },
      {
        title: "Emergency release",
        body: "Arms drop or free-spin on alarm or power failure, leaving an unobstructed escape route.",
      },
    ],
    applications: [
      "Factory and plant gate houses",
      "Corporate and IT campus entrances",
      "Transit, stadium and venue entries",
      "Attendance-controlled staff entrances",
    ],
    specs: [],
    image: "/images/legacy/HL145.PNG",
    imageAlt: "Tripod turnstile unit",
    imageFit: "contain",
    gallery: [
      { src: "/images/legacy/YL121.PNG", alt: "Tripod turnstile, alternative model" },
      { src: "/images/legacy/EL128.PNG", alt: "Tripod turnstile with extended housing" },
    ],
    related: ["flap-barriers", "full-height-turnstiles", "boom-barriers"],
    legacyUrl: "https://www.standardautomation.in/tripod-turnstile.html",
  },
  {
    slug: "flap-barriers",
    category: "security-access",
    name: "Flap Barriers",
    tagline: "High-throughput lobby control that does not look like a fence.",
    summary:
      "Flap barrier lanes (ATO series) with retracting acrylic or glass wings, for corporate lobbies and high-footfall entrances including accessible-width lanes.",
    overview: [
      "A flap barrier controls a lane with retracting wings rather than a rotating arm. Because the wings open ahead of an authorised user and close behind them, throughput is much higher than a tripod, and the visual language suits a lobby rather than a plant gate.",
      "Lanes are usually mixed: several standard-width lanes for normal flow plus at least one wide lane for wheelchair users, trolleys and luggage. Sensor arrays in the lane detect direction, tailgating and objects left in the lane.",
    ],
    benefits: [
      {
        title: "High throughput",
        body: "Wings open ahead of the user, so authorised flow is not slowed to a mechanical rotation.",
      },
      {
        title: "Lobby appropriate",
        body: "Glass or acrylic wings in a stainless housing read as building fit-out rather than security equipment.",
      },
      {
        title: "Accessible lanes",
        body: "Wide-lane variants for wheelchair users, trolleys and luggage alongside standard lanes.",
      },
      {
        title: "Tailgate detection",
        body: "Lane sensor arrays detect direction, tailgating and objects left in the lane.",
      },
    ],
    applications: [
      "Corporate and IT campus lobbies",
      "Commercial building receptions",
      "Metro and transit concourses",
      "Hotels, hospitals and public buildings",
    ],
    specs: [],
    image: "/images/legacy/Flap-A203.PNG",
    imageAlt: "Flap barrier lane unit",
    imageFit: "contain",
    gallery: [
      { src: "/images/legacy/FLAPE242.PNG", alt: "Flap barrier, alternative housing" },
      { src: "/images/legacy/FLAPH249.PNG", alt: "Flap barrier with angled housing" },
      { src: "/images/legacy/FLAPY248.PNG", alt: "Flap barrier lane pair" },
    ],
    related: ["tripod-turnstiles", "full-height-turnstiles", "automatic-sliding-glass-doors"],
    legacyUrl: "https://www.standardautomation.in/flap-barrier.html",
  },
  {
    slug: "full-height-turnstiles",
    category: "security-access",
    name: "Full Height Turnstiles",
    tagline: "An unclimbable, unpassable line at the perimeter.",
    summary:
      "Full height turnstiles (G535 and G538 series) for unsupervised perimeter entry points where climbing over or crawling under has to be impossible.",
    overview: [
      "A full height turnstile extends the rotor from floor to head height inside a cage, so there is no over or under. That makes it the correct choice at an unsupervised perimeter point, where a waist-height unit could simply be stepped over.",
      "Single and twin-lane rotor configurations are available, and the unit's behaviour on power failure — free-spin, locked, or controlled release — is chosen against the site's escape and security requirements.",
    ],
    benefits: [
      {
        title: "No over, no under",
        body: "A floor-to-head-height rotor inside a cage removes the obvious defeats of a waist-height unit.",
      },
      {
        title: "Unsupervised operation",
        body: "Suited to perimeter points with no permanent guard presence.",
      },
      {
        title: "Single or twin lane",
        body: "One or two rotors in a shared frame depending on the flow the point has to carry.",
      },
      {
        title: "Defined fail state",
        body: "Free-spin, locked or controlled release on power loss, specified against the escape strategy.",
      },
    ],
    applications: [
      "Plant and site perimeter entry points",
      "Data centres and restricted zones",
      "Stadium and venue perimeters",
      "Unmanned staff and contractor entrances",
    ],
    specs: [],
    image: "/images/legacy/fullG535.PNG",
    imageAlt: "Full height turnstile, G535 series",
    imageFit: "contain",
    gallery: [
      { src: "/images/legacy/FULLG538.PNG", alt: "Full height turnstile, G538 series" },
      { src: "/images/legacy/FULLG535-2.PNG", alt: "Twin-lane full height turnstile" },
      { src: "/images/legacy/FULLG538-2.PNG", alt: "Full height turnstile frame detail" },
    ],
    related: ["tripod-turnstiles", "flap-barriers", "bollards"],
    legacyUrl: "https://www.standardautomation.in/full-height-barrier.html",
  },
  {
    slug: "boom-barriers",
    category: "security-access",
    name: "Boom Barriers",
    tagline: "Metering vehicles at the gate line.",
    summary:
      "Automatic boom barriers for parking entries, plant gates and toll points, driven from loop detectors, readers, remotes or a gatehouse control.",
    overview: [
      "A boom barrier meters vehicles: it holds the gate line closed, opens for one authorised vehicle, and closes again behind it. It is a control device rather than a security barrier — its job is to regulate flow and record movements, not to stop a determined vehicle.",
      "Specification comes down to boom length, cycle speed and duty. A barrier on a busy car park entry runs thousands of cycles a month and needs an operator rated for it.",
    ],
    benefits: [
      {
        title: "One vehicle per authorisation",
        body: "Loop detectors close the boom behind each vehicle rather than on a timer.",
      },
      {
        title: "Fast cycling",
        body: "Short open and close times keep queues moving at busy entries and exits.",
      },
      {
        title: "Access-system driven",
        body: "Card readers, remotes, ANPR, ticket machines and gatehouse controls all drive the same barrier.",
      },
      {
        title: "Safety interlocked",
        body: "Ground loops and photocells prevent the boom descending onto a vehicle or a person.",
      },
    ],
    applications: [
      "Car park entries and exits",
      "Factory and plant gate houses",
      "Toll and weighbridge points",
      "Campus and society vehicle entries",
    ],
    specs: [],
    image: "/images/photography/barrier-arm.jpg",
    imageAlt: "A boom barrier arm at a controlled vehicle entry",
    pendingConfirmation: true,
    related: ["bollards", "retractable-barriers", "automatic-sliding-gates"],
    legacyUrl: "https://www.standardautomation.in/boom-barriers.html",
  },
  {
    slug: "retractable-barriers",
    category: "security-access",
    name: "Retractable Barriers",
    tagline: "A folding barrier line that stacks away when it is not needed.",
    summary:
      "Retractable barrier systems that close a wide vehicle or pedestrian line and fold back into a compact stack when the line is open.",
    overview: [
      "A retractable barrier closes a line that only needs to exist some of the time. The barrier folds into a short stack against the boundary when open, so nothing obstructs the route, and extends across the full width when the line has to be held.",
      "It suits sites where the same opening is a wide free-flow route during the day and a controlled or closed line outside working hours.",
    ],
    benefits: [
      {
        title: "Wide lines, compact stack",
        body: "A folding structure closes a wide opening but parks in a short length of boundary.",
      },
      {
        title: "Nothing left in the route",
        body: "When retracted, the carriageway or walkway is completely clear.",
      },
      {
        title: "Time-based control",
        body: "Suits openings that are free-flow during working hours and closed outside them.",
      },
      {
        title: "Powered or manual",
        body: "Motorised operation with manual release, or manual-only where duty is light.",
      },
    ],
    applications: [
      "Yard and service entrances",
      "Temporary and shift-based closures",
      "Wide site openings",
      "Parking and access route control",
    ],
    specs: [],
    image: "/images/photography/barrier-closed.jpg",
    imageAlt: "A vehicle waiting at a closed barrier line",
    pendingConfirmation: true,
    related: ["boom-barriers", "retractable-gates", "bollards"],
    legacyUrl: "https://www.standardautomation.in/retractable-barriers.html",
  },
];
