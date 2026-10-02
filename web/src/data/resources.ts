import type { Faq } from "@/lib/types";

/**
 * Resource guides, published under /resources/[slug].
 *
 * The same rule as the product data applies: every figure here is one the
 * site already publishes for the product concerned, qualified the same way.
 * Where a value depends on the opening, the configuration or the survey, the
 * guide says so rather than quoting a number.
 */

/** A run of text, optionally linking to an existing page on the site. */
export type Inline = string | { text: string; href: string };

/**
 * A comparison table. The first column is the row label; `columns` names the
 * value columns. A row with `href` links its label to that page.
 */
export interface GuideTable {
  /** Header for the row-label column, if it needs one. */
  labelHeading?: string;
  columns: string[];
  rows: { label: string; href?: string; values: string[] }[];
}

export interface GuideSection {
  heading: string;
  paragraphs?: Inline[][];
  bullets?: Inline[][];
  /** Rendered as a numbered list. */
  steps?: Inline[][];
  /** Rendered after the section's text. */
  table?: GuideTable;
}

export interface ResourceGuide {
  slug: string;
  /** H1. */
  title: string;
  /** <title>, before the site suffix. */
  metaTitle: string;
  description: string;
  eyebrow: string;
  lede: string;
  /** The direct answer, stated before any detail. */
  answer: string;
  /** Shown as "At a glance" after the short answer. */
  comparison?: GuideTable;
  sections: GuideSection[];
  faq: Faq[];
  related: { href: string; label: string }[];
  /** Sidebar call to action, where the default door wording does not fit. */
  sidebarCta?: { title: string; body: string };
  /** Closing band, where the default door wording does not fit. */
  closing?: { title: string; lede: string };
}

export const resourceGuides: ResourceGuide[] = [
  {
    slug: "high-speed-door-vs-sectional-overhead-door",
    title: "High Speed Door vs Sectional Overhead Door",
    metaTitle: "High Speed Door vs Sectional Overhead Door: How to Choose",
    description:
      "How high speed doors and sectional overhead doors differ in construction and operation, which openings each suits, and the site questions that decide the choice.",
    eyebrow: "Selection guide",
    lede: "Both close large industrial openings, but they are built for different jobs. This guide sets out how each works, where each fits, and what decides the choice for a particular opening.",
    answer:
      "A high speed door is specified for an opening that is crossed many times a shift and should spend as little time open as possible. An industrial sectional overhead door is specified where the opening needs insulated panels, a sealed perimeter and a completely clear aperture when open — typically on an external elevation. For a specific opening, the choice depends on how often it is used, the headroom and side room available, whether it is internal or external, and what the two sides of the opening need to keep separate.",
    comparison: {
      columns: ["High speed door", "Sectional overhead door"],
      rows: [
        {
          label: "How it opens",
          values: [
            "A flexible PVC curtain winds onto a drum above the opening (roll-up). Fold-up, spiral and rigid panel configurations are also available.",
            "Hinged insulated panels run in tracks that curve from vertical to horizontal, and the leaf stores under the roof.",
          ],
        },
        {
          label: "Leaf construction",
          values: [
            "High-density PVC-coated polyester curtain, 0.8–1.2 mm, on the roll-up door; double-skin insulated rigid panels on the rigid / insulated configuration.",
            "40–50 mm PUF-cored aluminium or galvanized steel panels, 300 mm high.",
          ],
        },
        {
          label: "Opening speed",
          values: [
            "0.8–2.5 m/s on the roll-up door, depending on configuration.",
            "Not specified for speed; the operator is sized to the leaf and the duty.",
          ],
        },
        {
          label: "Typical role",
          values: [
            "Frequent internal or sheltered traffic, where open time costs dust, temperature, noise or hygiene separation.",
            "External and large openings, where insulation, sealing and a fully clear aperture matter.",
          ],
        },
        {
          label: "Control and activation",
          values: [
            "PLC with inverter and encoder; radar, push button, photocell or loop detector.",
            "Electric or manual operation; PLC with inverter and encoder on motorised doors; key switch, radio remote or rocker switch.",
          ],
        },
        {
          label: "Safety",
          values: [
            "Threshold photocell and safety edge; manual crank or override for a power failure.",
            "Spring-break and anti-fall devices; manual operation available.",
          ],
        },
        {
          label: "Space at the opening",
          values: [
            "Headroom for the drum, stack or spiral track, and side room for the guides — confirmed at survey.",
            "Headroom decides the lift configuration: standard, high, vertical or low headroom — confirmed at survey.",
          ],
        },
        {
          label: "Size",
          values: [
            "Up to 5,000 × 5,000 mm on the roll-up door, depending on configuration.",
            "Maximum clear height 8000 mm; maximum width confirmed for the specific door configuration.",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "How a high speed door works",
        paragraphs: [
          [
            "A ",
            { text: "high speed roll-up door", href: "/products/high-speed-doors/high-speed-roll-up-door" },
            " replaces a rigid leaf with a flexible PVC curtain that winds onto a drum above the opening. With no heavy panel to accelerate, the door clears a busy opening quickly and closes again behind the traffic, so the building spends far less of the day standing open.",
          ],
          [
            "An industrial geared motor under PLC, inverter and encoder control accelerates and decelerates the curtain and holds repeatable stop positions. Radar, a push button, a photocell or a ground loop opens the door on approach, and a threshold photocell and safety edge stop it closing on an obstruction.",
          ],
          [
            "Where a fast-acting door also needs insulated panels, the ",
            { text: "rigid / insulated", href: "/products/high-speed-doors/high-speed-rigid-insulated-door" },
            " and ",
            { text: "spiral", href: "/products/high-speed-doors/high-speed-spiral-door" },
            " configurations are the ones to compare. The full range is on the ",
            { text: "High Speed Doors", href: "/products/high-speed-doors" },
            " page.",
          ],
        ],
      },
      {
        heading: "How a sectional overhead door works",
        paragraphs: [
          [
            "An ",
            { text: "industrial sectional overhead door", href: "/products/industrial-doors/industrial-sectional-overhead-doors" },
            " is built from horizontal insulated panels hinged together, running in tracks that curve from vertical to horizontal above the opening. When it is open, the whole door sits under the roof: the aperture is completely clear, and so is the wall on either side of it.",
          ],
          [
            "A torsion spring counterbalances the leaf, so it can be moved by hand or by a modest operator, and spring-break and anti-fall devices arrest the door if the counterbalance or a lifting cable fails. The track arrangement — standard, high, vertical or low-headroom lift — is set by the headroom available above the opening rather than by the door itself.",
          ],
        ],
      },
      {
        heading: "When a high speed door is the better fit",
        bullets: [
          ["The opening is crossed constantly through the shift, and the time it stands open matters."],
          ["It separates two areas with different dust, temperature, noise or hygiene conditions."],
          ["Vehicles and pedestrians need hands-free activation by radar, loop or photocell."],
          ["The area is washed down, so a stainless steel frame and guides are specified."],
        ],
      },
      {
        heading: "When a sectional overhead door is the better fit",
        bullets: [
          ["The opening is on an external elevation and needs insulated panels and a sealed perimeter."],
          ["The whole aperture, and the wall beside it, must be clear when the door is open."],
          ["People need to pass when the main door is closed — a wicket door, interlocked so the leaf only runs when the wicket is shut."],
          ["Daylight or sightlines matter, so vision panels are specified in selected sections."],
          [
            "It serves a dispatch bay, where it is usually paired with a ",
            { text: "dock leveller", href: "/products/loading-bay/dock-levellers" },
            ".",
          ],
        ],
      },
      {
        heading: "When a building needs both",
        paragraphs: [
          [
            "The choice is made per opening, not per building. A site may specify a sectional door on an external dispatch opening for insulation and weather sealing, and a high speed door on an internal route between production and storage where the traffic never stops.",
          ],
          [
            "Where an external opening is also crossed constantly, a high speed door built for external mounting — specified against the wind resistance the exposure requires — is the alternative to compare. The industry pages for ",
            { text: "warehousing and logistics", href: "/industries/warehousing-logistics" },
            ", ",
            { text: "manufacturing", href: "/industries/manufacturing" },
            " and ",
            { text: "cold chain and food", href: "/industries/cold-chain-food" },
            " show the door types recommended for each sector.",
          ],
        ],
      },
      {
        heading: "What decides the choice for your opening",
        steps: [
          ["Roughly how many cycles a day the opening takes. This sizes the drive, and it is what justifies a high speed door at all."],
          ["The clear opening width and height, measured between the finished reveals."],
          ["The headroom above the lintel and the side room at both jambs. These decide the lift configuration of a sectional door, and the drum, stack or spiral track of a high speed door."],
          ["Whether the opening is internal or external, and the exposure of the elevation if it is external."],
          ["What the two sides of the opening have to keep different: temperature, dust, insects, noise or pressure."],
          ["How close the traffic route runs to the door, and the power supply and any access control the door has to work with."],
        ],
      },
    ],
    faq: [
      {
        question: "Is a high speed door faster than a sectional overhead door?",
        answer:
          "High speed doors are specified for opening speed: the roll-up door opens at 0.8–2.5 m/s, depending on configuration. A sectional door is not chosen for speed; its operator is sized to the leaf and the duty.",
      },
      {
        question: "Which one is insulated?",
        answer:
          "Sectional overhead doors use 40–50 mm PUF-cored panels. A high speed roll-up door has a flexible PVC curtain; where a fast-acting door must also be insulated, the rigid / insulated and spiral configurations use insulated panels.",
      },
      {
        question: "Which needs more headroom?",
        answer:
          "Neither has a single figure. A sectional door's lift configuration is chosen from the headroom available, including a low-headroom track; a high speed door needs space for its drum, stack or spiral track. Both are confirmed at survey.",
      },
      {
        question: "Can either door work with our access control?",
        answer:
          "A high speed door's PLC control takes a release signal from an access control system, a loop or a plant signal. On a motorised sectional door, interfaces beyond the wicket door interlock are configuration dependent and are confirmed when the operator is selected.",
      },
      {
        question: "What information is needed for a quotation?",
        answer:
          "The clear width and height of the opening, the headroom and side room available, roughly how many cycles a day it will take, whether it is internal or external, and what the two sides of the opening need to keep separate. A photograph of the opening helps.",
      },
    ],
    related: [
      { href: "/products/high-speed-doors", label: "High Speed Doors" },
      { href: "/products/high-speed-doors/high-speed-roll-up-door", label: "High Speed Roll-Up Door" },
      { href: "/products/high-speed-doors/high-speed-rigid-insulated-door", label: "High Speed Rigid / Insulated Door" },
      { href: "/products/industrial-doors", label: "Industrial Doors" },
      { href: "/products/industrial-doors/industrial-sectional-overhead-doors", label: "Industrial Sectional Overhead Doors" },
      { href: "/products/loading-bay/dock-levellers", label: "Dock Levellers" },
      { href: "/service-support", label: "Service & Support" },
    ],
  },
  {
    slug: "how-to-choose-a-high-speed-door",
    title: "How to Choose a High Speed Door",
    metaTitle: "How to Choose a High Speed Door | Selection Guide",
    description:
      "How to choose a high speed door by application, traffic, environment and installation constraints — and which of the seven high speed door types fits your opening.",
    eyebrow: "Selection guide",
    lede: "Seven high speed door types cover very different openings. This guide works through the questions that separate them, and links each type to its product page.",
    answer:
      "Choosing a high speed door starts with what the opening does: the application, how often it is crossed and by what traffic, and the environment on each side — internal or external, temperature-controlled or hygiene-sensitive. Those answers point to one of seven door types. The final configuration then depends on the opening dimensions, the headroom and side room available, the exposure of the elevation and the controls the door must work with, confirmed at survey.",
    sections: [
      {
        heading: "Start with the application",
        paragraphs: [
          [
            "A high speed door is justified by the time an opening would otherwise stand open. Before comparing door types, be clear about what this opening is for: an internal throughway between production and storage, an external entrance on the building envelope, or a boundary between two environments that have to be kept apart.",
          ],
          [
            "For a constantly crossed internal opening, the ",
            { text: "High Speed Roll-Up Door", href: "/products/high-speed-doors/high-speed-roll-up-door" },
            " is the type the others are compared against. Each of the other six answers a specific requirement the roll-up door does not: height, impact, rigidity, insulation, hygiene or sub-zero operation. The full range is on the ",
            { text: "High Speed Doors", href: "/products/high-speed-doors" },
            " page.",
          ],
        ],
      },
      {
        heading: "Consider traffic and operating conditions",
        paragraphs: [
          [
            "Size on duty cycle first. Roughly how many times a day the opening is used decides the drive, and an operator chosen only for leaf weight will overheat long before it fails mechanically.",
          ],
          [
            "Then look at what crosses the opening and how close it runs to the door. Where forklifts pass close to the guides and contact is routine, the ",
            { text: "High Speed Self-Repairing Door", href: "/products/high-speed-doors/high-speed-self-repairing-door" },
            " is the configuration to consider: its curtain leaves the guides on impact and re-enters them automatically, keeping the opening in service. Where impact is unlikely and the route is wide, a standard roll-up door is the more economical choice.",
          ],
          [
            "Activation follows the traffic. On the roll-up door, for example, radar suits mixed vehicle and pedestrian flow, a ground loop suits openings only vehicles should open, and a push button suits openings where opening should be a deliberate act.",
          ],
        ],
      },
      {
        heading: "Match the door to the environment",
        bullets: [
          [
            { text: "Manufacturing", href: "/industries/manufacturing" },
            " and ",
            { text: "warehousing and logistics", href: "/industries/warehousing-logistics" },
            ": high-frequency internal routes and larger openings for vehicle and material movement. The roll-up, fold-up and self-repairing doors are the types published for these applications.",
          ],
          [
            { text: "Cold chain and food", href: "/industries/cold-chain-food" },
            ": a reinforced fabric curtain is not a thermal barrier. Where the opening has to hold a temperature difference, compare the rigid insulated and spiral doors; where the door itself operates in a cold room or freezer, the cold storage configuration is the more specific answer.",
          ],
          [
            { text: "Pharmaceutical and cleanroom", href: "/industries/pharmaceutical-cleanroom" },
            " and ",
            { text: "healthcare", href: "/industries/healthcare" },
            ": hygiene-sensitive areas call for a sealed assembly with a cleanable curtain and stainless steel or hygienic-coated frame and guides. The room's cleaning regime decides the construction.",
          ],
          [
            "External openings: the exposure of the elevation sets the wind class the assembly must be built to. The fold-up and self-repairing doors have a Class 3 wind configuration alongside Class 2; the exposure decides which, not the opening size.",
          ],
          [
            "Washdown areas that are not hygiene-classified: the stainless steel frame and guide configuration of the roll-up door may be sufficient.",
          ],
        ],
      },
      {
        heading: "Choose the appropriate high speed door type",
        paragraphs: [
          [
            "Each type below links to its product page, where the published specification and its qualifications are set out in full.",
          ],
        ],
        table: {
          labelHeading: "Door type",
          columns: ["Typical application", "Key selection consideration"],
          rows: [
            {
              label: "High Speed Roll-Up Door",
              href: "/products/high-speed-doors/high-speed-roll-up-door",
              values: [
                "Frequent internal traffic in warehouses, factories, logistics facilities and production areas.",
                "The reference type for a constantly crossed internal opening. Specify the stainless steel frame and guides where the area is washed down.",
              ],
            },
            {
              label: "High Speed Fold-Up Door",
              href: "/products/high-speed-doors/high-speed-fold-up-door",
              values: [
                "Larger logistics openings, loading areas and high-frequency vehicle and material movement.",
                "Published to a greater height than the roll-up door, and its folded stack is shallower than a drum of the same span. The fabric curtain is not a thermal barrier.",
              ],
            },
            {
              label: "High Speed Self-Repairing Door",
              href: "/products/high-speed-doors/high-speed-self-repairing-door",
              values: [
                "Forklift and material-handling routes in warehouses, factories and logistics facilities.",
                "For openings where curtain impact is routine: the curtain leaves its guides on impact and re-enters them automatically.",
              ],
            },
            {
              label: "High Speed Spiral Door",
              href: "/products/high-speed-doors/high-speed-spiral-door",
              values: [
                "External factory entrances, high-traffic entrances and temperature-controlled areas.",
                "A rigid insulated aluminium leaf without giving up cycle time. The spiral track needs a deeper head detail than a drum of the same span.",
              ],
            },
            {
              label: "High Speed Rigid / Insulated Door",
              href: "/products/high-speed-doors/high-speed-rigid-insulated-door",
              values: [
                "External industrial entrances, loading areas and temperature-controlled spaces.",
                "Double-skin insulated panels for structural rigidity and thermal separation, at a slower cycle than the spiral door.",
              ],
            },
            {
              label: "High Speed Cleanroom / Hygiene Door",
              href: "/products/high-speed-doors/high-speed-cleanroom-hygiene-door",
              values: [
                "Pharmaceutical manufacturing, healthcare, laboratories and food processing.",
                "A sealed assembly with a cleanable hygienic curtain and stainless steel or hygienic-coated frame; dimensions are project specific.",
              ],
            },
            {
              label: "High Speed Cold Storage / Freezer Door",
              href: "/products/high-speed-doors/high-speed-cold-storage-freezer-door",
              values: [
                "Cold rooms, frozen storage, cold-chain logistics and refrigerated production areas.",
                "Heated or temperature-resistant guides and a cold-storage bottom seal; the operating temperature is project specific.",
              ],
            },
          ],
        },
      },
      {
        heading: "Check installation constraints",
        paragraphs: [
          [
            "Headroom above the lintel and side room at both jambs decide the drum, stack or spiral track and the guides — and headroom rules out more high speed doors than opening width does. Where the lintel cannot take the depth of a drum, the fold-up door's stack is shallower; the spiral door needs a deeper head detail. These dimensions are configuration dependent and are measured at survey rather than quoted from a table.",
          ],
          [
            "Check the power supply available at the opening. On an external elevation, the structural fixings have to carry the wind load a large curtain transfers into the building. On a cold or freezer opening, the floor condition and any threshold heating are agreed with the refrigeration contractor; in a hygiene area, the cleaning regime is set before the door is specified.",
          ],
        ],
      },
      {
        heading: "Consider integration and service",
        paragraphs: [
          [
            "Doors in this range run under inverter or frequency control. The roll-up door's PLC control, for example, takes a release signal from an access control system, a loop or a plant signal. Where an opening forms one side of an airlock, both doors are set out together so the interlock is commissioned as one system.",
          ],
          [
            "Cycle count, not calendar time, drives wear on a high speed door. Photocells and safety edges are function-tested at every service visit, and the consumables differ by type — curtain and bottom seal on a roll-up door, fold straps on a folding door, seals on an insulated, hygiene or cold-store opening. See ",
            { text: "Service & Support", href: "/service-support" },
            " for maintenance and service.",
          ],
        ],
      },
      {
        heading: "Questions to confirm before ordering",
        steps: [
          ["Where is the door installed, and what does the opening connect?"],
          ["What traffic passes through it — vehicles, forklifts, pedestrians — and roughly how many cycles a day?"],
          ["Does the opening have to hold a temperature difference, or does the door itself operate in a cold room or freezer?"],
          ["Are hygiene or cleanroom requirements involved, and what is the cleaning regime?"],
          ["Is the opening internal or external, and how exposed is the elevation?"],
          ["What are the clear opening width and height, measured between the finished reveals?"],
          ["What headroom and side room are available, and what site constraints affect installation?"],
          ["What power supply is available, and what access control, signalling or interlocks must the door work with?"],
        ],
      },
      {
        heading: "Related resources",
        bullets: [
          [
            { text: "High Speed Door vs Sectional Overhead Door", href: "/resources/high-speed-door-vs-sectional-overhead-door" },
            " — when a sectional overhead door is the better fit.",
          ],
          [{ text: "High Speed Doors", href: "/products/high-speed-doors" }, " — the full product family."],
          [
            "Industry pages: ",
            { text: "manufacturing", href: "/industries/manufacturing" },
            ", ",
            { text: "warehousing and logistics", href: "/industries/warehousing-logistics" },
            ", ",
            { text: "cold chain and food", href: "/industries/cold-chain-food" },
            " and ",
            { text: "pharmaceutical and cleanroom", href: "/industries/pharmaceutical-cleanroom" },
            ".",
          ],
          [{ text: "Service & Support", href: "/service-support" }, " — maintenance and service."],
          [{ text: "Contact", href: "/contact" }, " — send the opening details for a recommendation."],
        ],
      },
    ],
    faq: [
      {
        question: "Which high speed door suits a cold store or freezer?",
        answer:
          "The High Speed Cold Storage / Freezer Door, with heated or temperature-resistant guides and a cold-storage bottom seal; its operating temperature is project specific. On the warm side of the cold chain, a standard roll-up door may be sufficient — the temperature the door itself works at decides, not the goods passing through.",
      },
      {
        question: "Is a fabric high speed door insulated?",
        answer:
          "No. A reinforced fabric curtain is not a thermal barrier. Where the opening has to hold a temperature difference, the rigid / insulated and spiral doors use insulated panels, and thermal performance is engineered to the stated differential.",
      },
      {
        question: "What if forklifts regularly hit the door?",
        answer:
          "Consider the High Speed Self-Repairing Door. Its curtain leaves the guides on impact and re-enters them automatically, so the opening stays in service. Where impact is unlikely, a standard roll-up door is more economical.",
      },
      {
        question: "Can a high speed door be used on an external opening?",
        answer:
          "Yes. Several types have an external configuration, specified against the wind class the exposure requires. The rigid / insulated door is engineered for external applications, and the fold-up and self-repairing doors have a Class 3 wind configuration.",
      },
      {
        question: "How much headroom does a high speed door need?",
        answer:
          "There is no single figure. It depends on whether the leaf is stored on a drum, in a folded stack or in a spiral track, and it is measured at survey. A folded stack is shallower than a drum of the same span; a spiral track is deeper.",
      },
    ],
    related: [
      { href: "/products/high-speed-doors", label: "High Speed Doors" },
      { href: "/resources/high-speed-door-vs-sectional-overhead-door", label: "High Speed Door vs Sectional Overhead Door" },
      { href: "/products/high-speed-doors/high-speed-cold-storage-freezer-door", label: "High Speed Cold Storage / Freezer Door" },
      { href: "/products/high-speed-doors/high-speed-cleanroom-hygiene-door", label: "High Speed Cleanroom / Hygiene Door" },
      { href: "/service-support", label: "Service & Support" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    slug: "what-is-a-dock-leveller",
    title: "What Is a Dock Leveller? How to Choose One",
    metaTitle: "What Is a Dock Leveller? How to Choose One",
    description:
      "What a dock leveller does and how to choose one for your loading bay: vehicle mix, working range, lip type, handling equipment, pit and site requirements.",
    eyebrow: "Selection guide",
    lede: "A practical guide for warehouse, logistics and project teams: what a dock leveller does, why it is used, and what to settle before one is specified.",
    answer:
      "A dock leveller is a hinged platform recessed into the dock edge that bridges the gap between the warehouse floor and the vehicle bed. Raised and lowered hydraulically, it places a lip on the bed and forms a continuous, load-bearing ramp, so handling equipment can drive on and off the vehicle. Choosing one depends on the vehicle mix, the working range above and below dock, the lip type, the handling equipment and the pit arrangement at the bay.",
    sections: [
      {
        heading: "What is a dock leveller?",
        paragraphs: [
          [
            "A ",
            { text: "dock leveller", href: "/products/loading-bay/dock-levellers" },
            " is a platform set into a foundation pit at the dock edge and hinged along its rear edge. A hydraulic cylinder raises the platform, the lip extends and lowers onto the vehicle bed, and the deck settles onto the bed and follows it as the vehicle's suspension moves under load.",
          ],
          [
            "After loading, the lip retracts and the platform returns to its stored, level position. In normal use it is operated from a hold-to-run push-button control station at the bay, which includes an emergency stop.",
          ],
        ],
      },
      {
        heading: "Why dock levellers are used",
        paragraphs: [
          [
            "Vehicle beds sit at different heights depending on the vehicle, its suspension and how much of the load has already come off. Without a leveller, the step between the dock floor and the bed has to be bridged with packing or a loose dock plate.",
          ],
          [
            "A leveller gives handling equipment a single load-bearing surface to drive across, with no step and no loose plate. Because it works both above and below dock level, one bay can serve a mixed fleet.",
          ],
        ],
      },
      {
        heading: "What to consider when choosing a dock leveller",
        bullets: [
          ["The vehicle mix and its bed heights. Specify the working range against the extremes of the fleet, not the common case."],
          ["How accurately vehicles reverse onto the bay. This decides between a swing lip and a telescopic lip."],
          ["The handling equipment that crosses the deck, and its axle loading. Load capacity is confirmed for the selected configuration and application, so provide the equipment type, the vehicle and axle loading and the application for engineering confirmation."],
          ["How many vehicles the bay turns round in a day."],
          ["The operating environment. The published operating range is −35 °C to +50 °C, which covers cold chain bays; on a temperature-controlled bay, specify the shelter and the door with the leveller."],
          ["The power supply at the bay, and any interlock with the bay door, traffic lights or vehicle restraint signalling."],
          ["Any levelling, sealing or vehicle restraint already in place at the bay."],
        ],
      },
      {
        heading: "Types and configurations",
        paragraphs: [
          [
            "The configurations below are published for our dock levellers. Platform sizes and the full specification are on the ",
            { text: "Dock Levellers", href: "/products/loading-bay/dock-levellers" },
            " product page.",
          ],
        ],
        table: {
          labelHeading: "Lip type",
          columns: ["How it works", "When it suits"],
          rows: [
            {
              label: "Swing lip",
              values: [
                "The lip hinges out and lowers onto the vehicle bed.",
                "The standard arrangement where vehicles dock consistently.",
              ],
            },
            {
              label: "Telescopic lip",
              values: [
                "The lip extends horizontally onto the vehicle bed.",
                "Longer reach and more accurate placement where the fleet is mixed or vehicles cannot always reverse on accurately.",
              ],
            },
          ],
        },
      },
      {
        heading: "Dock leveller installation considerations",
        paragraphs: [
          [
            "Final civil and structural requirements depend on the selected leveller and on the project and site conditions. The points below are the ones that matter most at the planning stage.",
          ],
        ],
        bullets: [
          ["The foundation pit is formed by the building contractor to the dimensions issued for the selected leveller. Drawings are issued before the pit is formed, and the pit cannot be corrected afterwards."],
          ["Pit drainage matters: standing water shortens the life of the hydraulics and the hinge."],
          ["Dock height is set against the vehicle mix actually using the bay, not a nominal figure."],
          ["The electrical contractor provides the power supply and an isolator at the bay."],
          ["Commissioning tests the full working range above and below dock, the lip operation and every safety device, including the maintenance strut."],
          [
            "In service, the hydraulic system, hinges and lip mechanism are inspected on a scheduled interval, and the pit is kept clear and free-draining. See ",
            { text: "Service & Support", href: "/service-support" },
            ".",
          ],
        ],
      },
      {
        heading: "Dock leveller vs dock shelter",
        paragraphs: [
          [
            "They do different jobs, and one does not replace the other. A dock leveller closes the gap under the vehicle, so equipment can cross between the dock and the bed. A ",
            { text: "dock shelter or dock house", href: "/products/loading-bay/dock-shelters-and-houses" },
            " closes the gap around the vehicle, so the docked opening is not left open to the weather and the outside air while a vehicle is on the bay.",
          ],
          [
            "Shelters are made to the bay, in curtain, dock house and inflatable arrangements. Where the bay is temperature controlled, the leveller, the shelter and the door are specified together as one assembly rather than as three separate purchases.",
          ],
        ],
      },
      {
        heading: "Questions to confirm before ordering",
        steps: [
          ["What is the dock height above the yard, and what range of vehicle bed heights does the bay serve?"],
          ["How accurately can vehicles reverse onto the bay?"],
          ["What handling equipment crosses the deck, and what is its axle load?"],
          ["How many vehicles does the bay turn round in a day?"],
          ["What is the bay width, and what pit or structural arrangement is available?"],
          ["Is the bay exposed or temperature controlled, and what does the building have to keep out?"],
          ["What power supply is available at the bay, and must the leveller interlock with the bay door or traffic signals?"],
          ["What levelling, sealing or vehicle restraint is already in place?"],
        ],
      },
      {
        heading: "Related products and resources",
        bullets: [
          [{ text: "Dock Levellers", href: "/products/loading-bay/dock-levellers" }, " — published configurations and specification."],
          [{ text: "Dock Shelters & Dock Houses", href: "/products/loading-bay/dock-shelters-and-houses" }, " — sealing around the vehicle."],
          [{ text: "Loading Bay Equipment", href: "/products/loading-bay" }, " — the full product family."],
          [
            "Industry pages: ",
            { text: "warehousing and logistics", href: "/industries/warehousing-logistics" },
            " and ",
            { text: "manufacturing", href: "/industries/manufacturing" },
            ".",
          ],
          [{ text: "Service & Support", href: "/service-support" }, " — maintenance and service."],
          [{ text: "Contact", href: "/contact" }, " — send the bay details for a recommendation."],
        ],
      },
    ],
    faq: [
      {
        question: "What capacity dock leveller do I need?",
        answer:
          "Load capacity is confirmed for the selected dock leveller configuration and application. Provide the handling equipment type, the vehicle and axle loading and the pit dimensions for engineering confirmation.",
      },
      {
        question: "What pit size is required?",
        answer:
          "It follows the platform selected. Pit drawings for the chosen leveller are issued before the pit is formed, and final dimensions depend on the installation and configuration.",
      },
      {
        question: "Can one dock leveller serve both vans and trailers?",
        answer:
          "Within its working range, yes. Our dock levellers work both above and below dock level, which is what allows a mixed fleet to use one bay. Specify the range against the extremes of the fleet.",
      },
      {
        question: "Does a dock leveller work in a cold store?",
        answer:
          "The published operating range is −35 °C to +50 °C, which covers cold chain bays. On a temperature-controlled bay, specify the shelter and the door together with the leveller.",
      },
      {
        question: "Do I need a dock shelter if I already have a dock leveller?",
        answer:
          "They do different jobs. The leveller closes the gap under the vehicle; the shelter closes it around the vehicle. Without a shelter, the opening is effectively open for as long as a vehicle is on the bay.",
      },
    ],
    related: [
      { href: "/products/loading-bay/dock-levellers", label: "Dock Levellers" },
      { href: "/products/loading-bay/dock-shelters-and-houses", label: "Dock Shelters & Dock Houses" },
      { href: "/products/loading-bay", label: "Loading Bay Equipment" },
      { href: "/industries/warehousing-logistics", label: "Warehousing & Logistics" },
      { href: "/service-support", label: "Service & Support" },
      { href: "/contact", label: "Contact" },
    ],
    sidebarCta: {
      title: "Planning a loading bay?",
      body: "Send the dock height, the vehicle mix and the handling equipment, and we will recommend a configuration.",
    },
    closing: {
      title: "Describe the bay. We will specify the leveller.",
      lede: "Dock height, the vehicles and handling equipment using the bay, and the pit or structure available — that is enough for a configuration and a quotation.",
    },
  },
  {
    slug: "how-to-choose-an-industrial-rolling-shutter",
    title: "How to Choose an Industrial Rolling Shutter",
    metaTitle: "How to Choose an Industrial Rolling Shutter | Selection Guide",
    description:
      "How to choose an industrial rolling shutter by application, material, visibility, ventilation and environmental exposure — compared across eleven shutter types.",
    eyebrow: "Selection guide",
    lede: "Eleven rolling shutter types cover very different openings. This guide sets out what separates them, and links each type to its product page.",
    answer:
      "Choosing a rolling shutter starts with what the opening is for and where it is: a shop front, a godown, a warehouse opening or an exposed elevation. From there, the material is chosen against corrosion and appearance, the curtain against visibility and ventilation, and the construction against insulation, wind exposure and how often the shutter is operated. Sizes are custom, and the final configuration depends on the opening and the project requirements.",
    sections: [
      {
        heading: "Start with the opening and application",
        paragraphs: [
          [
            "The opening's purpose decides most of the specification. A small shop operated by hand, a general commercial opening, a warehouse or industrial opening, a showroom that must stay visible after hours and an opening that separates two temperatures all lead to different shutters. The full range is on the ",
            { text: "Rolling Shutters", href: "/products/rolling-shutters" },
            " page.",
          ],
          [
            "Two things apply to every type. If the shutter is opened and closed many times a day, size on duty first and motorise it: a shutter chosen only on curtain size will wear at the barrel and drive long before the curtain gives out. If the opening is external or exposed, state the exposure: it decides the guide section, whether wind locks are needed, and rules out lighter curtains regardless of opening size.",
          ],
        ],
      },
      {
        heading: "Choose the shutter material and construction",
        bullets: [
          [
            { text: "MS (mild steel)", href: "/products/rolling-shutters/ms-solid-rolling-shutters" },
            ": the standard steel shutter, in light, standard and heavy duty curtains, push-up, gear or motorised. Mild steel is the wrong base for a coastal or chemically aggressive opening.",
          ],
          [
            { text: "Galvanized steel (GI)", href: "/products/rolling-shutters/galvanized-steel-rolling-shutters" },
            ": the same steel shutter, galvanized before it is formed. Chosen over mild steel where the opening is outdoors or gets wet, because the protection is in the material rather than in a finish that has to be maintained.",
          ],
          [
            { text: "Galvalume", href: "/products/rolling-shutters/galvalume-rolling-shutters" },
            ": aluminium-zinc coated steel, the step up where galvanized has been marginal, while keeping a steel curtain.",
          ],
          [
            { text: "Aluminium", href: "/products/rolling-shutters/aluminium-rolling-shutters" },
            ": chosen for corrosion resistance, weight and finish — showrooms, offices and commercial entrances. Where security rather than appearance is the dominant requirement, a steel curtain gives more resistance for the money.",
          ],
          [
            { text: "Stainless steel", href: "/products/rolling-shutters/stainless-steel-rolling-shutters" },
            ": SS304 for food, pharmaceutical and healthcare areas, and SS316 for coastal or chemically aggressive conditions. Where the area is hosed down at pressure, specify stainless guides as well as a stainless curtain.",
          ],
        ],
      },
      {
        heading: "Consider visibility and ventilation",
        bullets: [
          [
            { text: "Perforated", href: "/products/rolling-shutters/perforated-rolling-shutters" },
            ": a closed shutter you can see and breathe through, in fine, standard vision or heavy-duty patterns. Fine perforation moves air and light while keeping the opening visually closed.",
          ],
          [
            { text: "Vision / window", href: "/products/rolling-shutters/vision-window-rolling-shutters" },
            ": a solid curtain with defined vision sections, for shop fronts with a lit display. A mixed curtain can be solid at the bottom, vision at eye level and perforated where airflow is needed.",
          ],
          [
            { text: "Rolling grille", href: "/products/rolling-shutters/grille-rolling-shutters" },
            ": maximum visibility and airflow on a curtain that still locks, for mall units and retail lines. A grille does not keep weather out; pair it with a solid shutter or specify a solid curtain where that matters.",
          ],
          [
            { text: "Transparent polycarbonate", href: "/products/rolling-shutters/polycarbonate-rolling-shutters" },
            ": clear or tinted polycarbonate sections so the display stays visible behind the closed shutter. It is not presented as an impact- or forced-entry-rated barrier, so select the closure against the site's documented security requirement.",
          ],
        ],
      },
      {
        heading: "Consider insulation and environmental requirements",
        bullets: [
          [
            { text: "Insulated double-wall", href: "/products/rolling-shutters/insulated-double-wall-rolling-shutters" },
            ": a double-wall slat with an insulating core, where the opening separates two temperatures. State the temperature differential — it decides the core, the core thickness and the perimeter sealing. Thermal performance is configuration dependent, and an acoustic requirement should be stated explicitly.",
          ],
          [
            { text: "Windproof / storm-resistant", href: "/products/rolling-shutters/windproof-rolling-shutters" },
            ": reinforced curtains with wind locks, end locks and engineered anchoring, engineered to the project wind load. Where a specification calls for a tested wind classification, say so at enquiry: it is confirmed against tested configurations and the documentation required.",
          ],
          [
            "Corrosion: move from mild steel to GI where the opening gets wet, to Galvalume where galvanized has been marginal, and to stainless — SS316 — where the environment is genuinely aggressive.",
          ],
          [
            "Constant use with a temperature difference: an insulated shutter is not a rapid door. Where cycle time drives the air exchange, see ",
            { text: "How to Choose a High Speed Door", href: "/resources/how-to-choose-a-high-speed-door" },
            ".",
          ],
        ],
      },
      {
        heading: "Match the requirement to the shutter type",
        paragraphs: [
          ["Each type links to its product page, where the published specification and its qualifications are set out in full."],
        ],
        table: {
          labelHeading: "Shutter type",
          columns: ["Typical application", "Selection consideration"],
          rows: [
            {
              label: "MS Solid Rolling Shutter",
              href: "/products/rolling-shutters/ms-solid-rolling-shutters",
              values: [
                "Small shops, garages, shops and commercial buildings, godowns and small warehouses.",
                "Light, standard or heavy duty curtain chosen against use; not for coastal or chemically aggressive openings.",
              ],
            },
            {
              label: "GI Solid Rolling Shutter",
              href: "/products/rolling-shutters/galvanized-steel-rolling-shutters",
              values: [
                "Shops, commercial buildings, godowns, outdoor openings, warehouses and industrial buildings.",
                "Chosen over mild steel for outdoor or wet openings; heavy duty with the reinforced guide for warehouse and industrial openings.",
              ],
            },
            {
              label: "Galvalume Rolling Shutter",
              href: "/products/rolling-shutters/galvalume-rolling-shutters",
              values: [
                "Commercial and industrial buildings, outdoor openings, exposed environments and warehouses.",
                "The step up from galvanized on exposed elevations, keeping a steel curtain.",
              ],
            },
            {
              label: "Aluminium Rolling Shutter",
              href: "/products/rolling-shutters/aluminium-rolling-shutters",
              values: [
                "Shops, showrooms, offices, premium retail and commercial entrances.",
                "Chosen for corrosion, weight and finish; premium extruded profile where the profile is part of the architecture.",
              ],
            },
            {
              label: "Stainless Steel Rolling Shutter",
              href: "/products/rolling-shutters/stainless-steel-rolling-shutters",
              values: [
                "Food processing, pharmaceutical manufacturing, healthcare, premium commercial and coastal areas.",
                "SS304 for hygiene areas, SS316 for coastal or aggressive conditions; stainless guides where the area is hosed down.",
              ],
            },
            {
              label: "Perforated Rolling Shutter",
              href: "/products/rolling-shutters/perforated-rolling-shutters",
              values: [
                "Shops and retail, showrooms, shopping malls, parking structures and commercial buildings.",
                "Airflow and light through a closed curtain; the perforation pattern is selected per project.",
              ],
            },
            {
              label: "Vision / Window Rolling Shutter",
              href: "/products/rolling-shutters/vision-window-rolling-shutters",
              values: [
                "Showrooms, retail and commercial storefronts and shopping malls.",
                "Defined vision sections set out against where the display sits; a mixed curtain where parts of the opening need different things.",
              ],
            },
            {
              label: "Rolling Grille",
              href: "/products/rolling-shutters/grille-rolling-shutters",
              values: [
                "Retail units, shopping malls, parking structures, airports and transit, and commercial entrances.",
                "Maximum visibility and airflow; does not keep weather out. A high-cycle configuration for openings operated many times a day.",
              ],
            },
            {
              label: "Transparent Polycarbonate Rolling Shutter",
              href: "/products/rolling-shutters/polycarbonate-rolling-shutters",
              values: [
                "Showrooms, luxury and jewellery retail, shopping malls and premium commercial.",
                "Clear or tinted sections keep the display visible; not presented as an impact- or forced-entry-rated barrier.",
              ],
            },
            {
              label: "Insulated Rolling Shutter",
              href: "/products/rolling-shutters/insulated-double-wall-rolling-shutters",
              values: [
                "Warehouses, factories, loading areas, food processing and temperature-controlled spaces.",
                "The temperature differential decides the core and sealing; thermal performance is configuration dependent.",
              ],
            },
            {
              label: "Windproof / Storm-Resistant Rolling Shutter",
              href: "/products/rolling-shutters/windproof-rolling-shutters",
              values: [
                "Coastal buildings, cyclone-prone locations, high-wind sites, exposed commercial buildings and industrial facilities.",
                "Engineered to the project wind load; the wind configuration can be applied as an upgrade to suitable shutters on mixed elevations.",
              ],
            },
          ],
        },
      },
      {
        heading: "Questions to confirm before ordering",
        steps: [
          ["What are the clear opening width and height? Sizes are custom, so the opening is measured rather than matched to a standard."],
          ["What is the opening for, and what environment is it in — internal, external, coastal, hygiene or temperature-controlled?"],
          ["Is there a material or finish preference for the elevation?"],
          ["Does the display or the space behind need to stay visible when the shutter is closed?"],
          ["Does air need to pass through the closed shutter?"],
          ["Does the opening separate two temperatures, or is there an acoustic requirement?"],
          ["What security or closure requirement does the site have, and is it documented?"],
          ["How exposed is the elevation, and is a tested wind classification required?"],
          ["How often will the shutter be operated, and should it be push-up, gear or motorised?"],
          ["What site and installation conditions apply at the opening?"],
        ],
      },
      {
        heading: "Related products and applications",
        bullets: [
          [{ text: "Rolling Shutters", href: "/products/rolling-shutters" }, " — the full product family."],
          [
            { text: "Fire Rated Rolling Shutters", href: "/products/fire-safety-doors/fire-rated-rolling-shutters" },
            " — for openings within fire compartmentation systems.",
          ],
          [
            "Industry pages: ",
            { text: "manufacturing", href: "/industries/manufacturing" },
            ", ",
            { text: "warehousing and logistics", href: "/industries/warehousing-logistics" },
            " and ",
            { text: "retail and commercial", href: "/industries/retail-commercial" },
            ".",
          ],
          [{ text: "Service & Support", href: "/service-support" }, " — maintenance and service."],
          [{ text: "Contact", href: "/contact" }, " — send the opening details for a recommendation."],
        ],
      },
    ],
    faq: [
      {
        question: "Which rolling shutter material suits a coastal site?",
        answer:
          "Mild steel is the wrong base. Galvanized may not be enough; Galvalume is the step up while keeping a steel curtain, and stainless steel SS316 is specified where the environment is genuinely aggressive. The windproof and storm-resistant configurations address wind exposure separately.",
      },
      {
        question: "What is the difference between perforated, vision and grille shutters?",
        answer:
          "A perforated curtain passes diffuse light and air through an overall pattern. A vision shutter is a solid curtain with defined window sections for seeing a display. A rolling grille gives maximum visibility and airflow but does not keep weather out.",
      },
      {
        question: "Can a rolling shutter be insulated?",
        answer:
          "Yes. The insulated double-wall shutter has an insulating core between two faces. Its thermal performance is configuration dependent, so state the temperature differential. Where the opening is used constantly and cycle time drives air exchange, a high speed door is the alternative to consider.",
      },
      {
        question: "Do I need a windproof rolling shutter?",
        answer:
          "It depends on the exposure. Windproof standard or heavy duty suits an exposed elevation; the storm-resistant configuration suits coastal and cyclone-prone sites and is engineered against the project wind load. A tested wind classification is confirmed against tested configurations.",
      },
      {
        question: "Should a rolling shutter be manual or motorised?",
        answer:
          "It depends on how often it is used. Mild steel shutters are available push-up, gear operated or motorised; where a shutter is opened and closed many times a day, size it on duty first and motorise it.",
      },
    ],
    related: [
      { href: "/products/rolling-shutters", label: "Rolling Shutters" },
      { href: "/products/rolling-shutters/galvanized-steel-rolling-shutters", label: "GI Solid Rolling Shutter" },
      { href: "/products/rolling-shutters/insulated-double-wall-rolling-shutters", label: "Insulated Rolling Shutter" },
      { href: "/products/rolling-shutters/windproof-rolling-shutters", label: "Windproof / Storm-Resistant Rolling Shutter" },
      { href: "/resources/how-to-choose-a-high-speed-door", label: "How to Choose a High Speed Door" },
      { href: "/service-support", label: "Service & Support" },
      { href: "/contact", label: "Contact" },
    ],
    sidebarCta: {
      title: "Not sure which shutter fits?",
      body: "Send the opening size, what it is for and how exposed it is, and we will recommend a configuration.",
    },
    closing: {
      title: "Describe the opening. We will specify the shutter.",
      lede: "Clear width and height, what the opening is for, how exposed it is and how often it is used — that is enough for a configuration and a quotation.",
    },
  },
];

export function getResourceGuide(slug: string): ResourceGuide | undefined {
  return resourceGuides.find((guide) => guide.slug === slug);
}
