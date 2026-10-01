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

export interface GuideSection {
  heading: string;
  paragraphs?: Inline[][];
  bullets?: Inline[][];
  /** Rendered as a numbered list. */
  steps?: Inline[][];
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
  comparison?: {
    columns: [string, string];
    rows: { label: string; values: [string, string] }[];
  };
  sections: GuideSection[];
  faq: Faq[];
  related: { href: string; label: string }[];
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
];

export function getResourceGuide(slug: string): ResourceGuide | undefined {
  return resourceGuides.find((guide) => guide.slug === slug);
}
