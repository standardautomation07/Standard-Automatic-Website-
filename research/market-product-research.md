# Market & product research — entrance automation and industrial door systems

Prepared 2026-09-04 for the Standard Automatic Solutions Pvt Ltd website
rebuild. This document is the evidence base for `product-taxonomy.json` and
`product-source-matrix.csv`, and for every product page on the new site.

**Scope of this research.** It establishes how the market names, groups and
specifies these products — terminology, family structure, variant logic,
which specifications are conventionally published, and which industries are
addressed. It does **not** establish what Standard Automatic Solutions itself
supplies; that question is handled separately in §7 and in the source matrix.

**Copying policy.** No competitor text, image, branding or page design has
been copied. Manufacturer sites were read to learn vocabulary and structure
only. Where a specific figure appears below it is attributed, and it is used
in this document as market context — never republished on the Standard
Automation site as a Standard Automation specification.

---

## 1. Sources consulted

| # | Company | Market | What it was read for | URL |
| --- | --- | --- | --- | --- |
| S1 | Gandhi Automations | India (Mumbai) | Family-level taxonomy of the Indian market leader; loading bay and gate standards references | geapl.com |
| S2 | Avians Innovations Technology | India (Pune) | The most granular Indian taxonomy found — family → category → product, including rolling shutter single/double-wall split | avians.co.in |
| S3 | ASSA ABLOY Entrance Systems | Global | Top-level entrance solution grouping; automatic pedestrian door types | assaabloyentrance.com |
| S4 | EFAFLEX | Germany | High speed door variant logic: one platform, environment-specific series | efaflex.com |
| S5 | Rytec | USA | High speed door segmentation by curtain material (rigid / fabric / rubber) and by environment | rytecdoors.com |
| S6 | Stertil Dock Products | Netherlands | Loading bay taxonomy: levellers, shelters/seals, restraints, accessories | stertil-dockproducts.com |
| S7 | Automatic Systems | Belgium | Pedestrian vs vehicle access control split; high-security sub-range | automatic-systems.com |
| S8 | Boon Edam | Netherlands | Pedestrian entry security tiers: revolving, portal, optical, full height, tripod | boonedam.com |
| S9 | Amarr / Overhead Door / trade references | USA | Sectional door track and lift configurations | amarr.com, overheaddoorco.com |
| S10 | Halspan, Studio Matrx, Jensen Hughes, B2B Purchase | India / global | Fire rating standards applicable in India | halspan.com, studiomatrx.org, jensenhughes.com |

Sites that could not be read (connection refused, 403 or 404 at the time of
research) and were therefore **not** used: Hörmann, Novoferm, Nice, FAAC,
Dortek. Their absence does not change the conclusions — the taxonomy below is
corroborated by at least two independent sources at every level.

---

## 2. How this market structures a catalogue

Every serious manufacturer in this space uses a **three-level catalogue plus a
variant axis**, not a flat product list:

```
FAMILY        the buying category a specifier searches for
  CATEGORY    the construction or operating principle
    PRODUCT   the thing that gets quoted
      VARIANT the environment or configuration it is built for
```

The variant axis is the important insight, and it is where the Indian market
is generally weaker than the European one. EFAFLEX (S4) is the clearest
example: a single high speed spiral door platform is published as six series —
Universal, Explosion protection (EX), Machine protection (MS), Clean room
(CR), Refrigerated/freezer (TK) and Security — because the *environment*, not
the door, is what the customer is actually selecting. Rytec (S5) does the same
thing along two axes at once: curtain material (rigid spiral / fabric /
rubber) and environment (cleanroom, cooler-freezer, food, chemical, hurricane
zone, low headroom).

Gandhi Automations (S1) publishes ten flat families with no visible variant
layer on its navigation. Avians (S2) is the closest Indian analogue to the
European structure, and is the model this taxonomy follows most closely — its
rolling shutter branch splits Single Wall / Double Wall Insulated before
splitting by material, which is the correct engineering distinction.

**Conclusion adopted:** family → category → product → variant, with variants
expressed as environment/configuration options on the product page rather than
as separate products. This avoids the count-inflation that flat catalogues
produce, and it matches how a specifier actually narrows a choice.

---

## 3. Family-level structure observed

| Family | S1 Gandhi | S2 Avians | S3 ASSA ABLOY | S4/S5 HSD specialists | S6 Stertil | S7/S8 access |
| --- | --- | --- | --- | --- | --- | --- |
| High speed doors | ✓ | ✓ | ✓ | ✓ | – | – |
| Sectional overhead doors | – (under commercial) | ✓ | ✓ (industrial doors) | – | – | – |
| Rolling shutters | ✓ | ✓ | – | – | – | – |
| Fire rated shutters & doors | ✓ | ✓ | – | – | – | – |
| Industrial sliding doors | ✓ | ✓ | – | – | – | – |
| Cold storage doors | ✓ | – | – | ✓ (as variants) | – | – |
| Motorised / entrance gates | ✓ | ✓ | – | – | – | ✓ (perimeter) |
| Automatic pedestrian doors | ✓ (commercial) | ✓ | ✓ | – | – | ✓ |
| Loading bay equipment | ✓ | ✓ | ✓ (docking) | – | ✓ | – |
| Barriers / turnstiles / bollards | ✓ (boom barriers) | ✓ | – | – | – | ✓ |
| Hangar doors | ✓ | ✓ | ✓ | – | – | – |

Ten families is the market norm. Nine of them are relevant to Standard
Automatic Solutions on current evidence; hangar doors and cold storage doors
are **not confirmed** (see §7).

---

## 4. Variant logic per family

### 4.1 High speed doors
Two independent axes, both used by S4 and S5:

- **Construction:** roll-up fabric curtain · fold-up (stacking) fabric curtain
  · rigid insulated panel (spiral or vertical) · sliding.
- **Environment:** internal · external (wind-loaded) · self-repairing
  (impact-prone) · cleanroom · cold store / freezer · food-grade ·
  explosion-protected · machine protection.

Avians (S2) expresses the Indian version of this as Roll Up Doors → Flexi Roll
Up / Anti Crash / Clean Room, plus Fold Up Doors. Gandhi (S1) publishes ~22
model names under one page, differentiated almost entirely by environment
(Food, Cold, Freezer, Atex, Machine, Conveyor, Mining), which confirms the
same logic under different naming.

Conventional published specifications: opening and closing speed (m/s),
maximum width and height, curtain material and thickness, wind load class
(EN 12424 / EN 12444), drive power and supply, control system (PLC / inverter
/ encoder), activation method, manual override, safety devices.
Gandhi (S1) publicly cites opening speeds "up to 3 m/s".

### 4.2 Sectional overhead doors
Variant axis is the **track and lift configuration**, which is set by the
building, not the door (S9): standard lift · high lift · vertical lift · low
headroom · follow-the-roof-pitch. Standard lift assumes roughly 380–900 mm of
headroom; high lift is used where more than ~900 mm is available; low headroom
where less than ~380 mm is available. Secondary axes: panel insulation
(typically 40–45 mm PU-cored steel or aluminium), glazing (vision panels,
full-vision aluminium), and wicket door.

Avians (S2) splits these as Industrial / Transparent / Garage sectional doors —
the same distinctions expressed as products.

### 4.3 Rolling shutters
The primary engineering split is **single-wall vs double-wall insulated**
(S2), then material within each:

- Single wall: M.S. / galvanised steel · galvalume · aluminium · stainless
  steel · grille (bright bar) · perforated · transparent polycarbonate.
- Double wall insulated: galvanised insulated · aluminium insulated ·
  aluminium non-insulated.

Conventional published specifications: slat profile height, slat thickness,
curtain material and finish, guide and frame material, maximum span,
operation (manual push-pull / gear / motorised), and drive type.

### 4.4 Fire rated shutters and doors
Rated by **integrity duration**, published in minutes. In India the governing
standard is **IS 3614** (Part 2 for metallic fire check doors; IS 3614:2021 is
the current revision), commonly cross-referenced to **BS 476 Part 20/22** and
**EN 1634-1**, with UL 10B/10C cited for US-referenced projects (S10). Ratings
published in the Indian market run 30 / 60 / 90 / 120 minutes, with 240-minute
(T240) shutters offered by several suppliers. The National Building Code
determines where they are mandatory.

**Critical caveat carried into the site:** a fire rating belongs to a tested
*assembly* — shutter, guides, fixings, motor and release mechanism as
installed — and is only meaningful with a certificate for that assembly.
No rating is published on the Standard Automation site without one.

### 4.5 Automatic gates
Types (S1, S2): conventional tracked sliding · cantilever sliding · telescopic
sliding · swing (single/double leaf) · retractable/collapsible · folding.
Selection is driven by available side-run, driveway crossing constraints,
leaf weight and duty cycle. Gandhi (S1) cites EN 13241 as the applicable
product standard for gate assemblies.

### 4.6 Loading bay equipment
Stertil (S6) gives the fullest taxonomy: levellers (telescopic lip · swing lip
· variable/telescopic variable lip · mini/edge dock) · shelters and seals
(curtain · cushion · inflatable · van/hybrid) · vehicle restraints (automatic
· manual · wheel chock) · accessories (bumpers, wheel guides, traffic lights,
dock lights, safety fences, control pedestals). Gandhi (S1) additionally
publishes dock houses, mobile dock ramps, lift tables and motorised wheel
block systems, and cites **EN 1398** as the dock leveller standard.

### 4.7 Access control — pedestrian and vehicle
S7 and S8 both split the range at the top level into **pedestrian** and
**vehicle**, then grade pedestrian products by physical resistance:

optical/speed gates (detect) → tripod turnstiles (single passage, waist
height) → full height turnstiles (single passage, unclimbable) → interlocking
mantrap portals (highest assurance).

Vehicle side: rising/boom barriers (traffic metering) → automatic bollards →
road blockers and tyre killers (hostile vehicle mitigation). S7 groups the
last two under a separate "High Security" range, which is the correct
distinction — a boom barrier is a control device, not a security barrier, and
the site says so.

### 4.8 Automatic pedestrian doors
S3: sliding · swing · revolving · security · hermetic. Sliding subdivides into
single-leaf, bi-parting and telescopic (S2). Low-energy operators and
break-out (escape route) leaves are the two configuration options that matter
for specification.

---

## 5. Industries the market addresses

Consistently named across S1–S8, in rough order of frequency:

manufacturing · warehousing and logistics · cold chain and freezer storage ·
pharmaceutical and cleanroom · food and beverage processing · automotive ·
retail and shopping centres · commercial and corporate buildings · healthcare
· data centres · airports and aviation · transit and infrastructure · mining
and heavy industry.

The industry pages on the new site cover the subset where the confirmed
product range is genuinely applicable, and each is written around the
*constraint* that industry has rather than around a claim of work delivered.

---

## 6. Specification fields conventionally published

Used as the schema for the `specifications` block on every product page. A
field is rendered only when a value exists; there are no placeholder rows.

| Group | Fields |
| --- | --- |
| Dimensions | maximum width, maximum height, minimum headroom, side room |
| Performance | opening speed, closing speed, cycles per day, wind load class |
| Construction | curtain/panel material, thickness, slat profile, frame and guides, finish |
| Thermal / environmental | insulation, U-value, temperature range, sealing, IP rating |
| Drive | motor type, power, supply voltage, duty rating, manual override |
| Control | control system, activation devices, limit setting |
| Safety | photocells, safety edge, obstruction detection, anti-fall device, emergency release |
| Compliance | product standard, fire rating and test standard, certificate reference |

---

## 7. What this means for Standard Automatic Solutions

Market research establishes what the *market* offers. It cannot establish what
this company offers. The only admissible evidence for that is Standard
Automatic Solutions' own published material, which is archived in
`legacy/content/` from the previous site audit.

That archive is used here for exactly one purpose — **deciding a product's
business status** — and for nothing else. No product description, page
structure, specification or image from the previous website has been carried
into the new site; all product copy is newly written from the research above.

Three statuses are applied, and they are recorded per product in
`product-source-matrix.csv`:

- **CONFIRMED** — the company published a dedicated product page for it and it
  was live in the previous site's navigation.
- **POTENTIAL** — the company published a page for it but had removed it from
  navigation, or it is a straightforward configuration of something confirmed.
  Published on the site with a visible "to be confirmed" marker.
- **NOT CONFIRMED** — found in market research with no evidence the company
  supplies it. **Not published as a Standard Automation product at all.**

Products currently in the NOT CONFIRMED set, held back from the catalogue:
hangar doors (steel sliding and PVC fabric), cold storage / freezer room doors,
industrial sliding doors as a distinct line, revolving doors, interlocking
security portals, road blockers and tyre killers, vehicle restraint systems,
mobile dock ramps, lift tables, guillotine vertical sliding doors, cleanroom
hermetic doors, explosion-protected and machine-protection door series.

Several of those are commercially obvious adjacencies for a Pune-based
entrance automation company — cold storage doors and industrial sliding doors
in particular are offered by both S1 and S2. They are listed in the matrix as
market opportunities so the business can confirm or reject them, but they do
not appear on the website until it does.

---

## 8. Positioning conclusion

The Indian market is dominated by one national player (S1) whose site is a
flat ten-family catalogue with thin per-product engineering content, and by
regional specialists (S2 and others) with better taxonomy but limited
specification depth. Neither publishes selection guidance.

The gap the new Standard Automation site targets is therefore **engineering
legibility**: publishing the small number of constraints that actually decide
a specification (clear opening, headroom and side room, duty cycle, what the
opening has to separate, wind exposure, failure behaviour), grouping products
by the engineering principle rather than by page count, and being explicit
about what is confirmed and what is not. That is a defensible differentiator
that costs nothing to maintain honestly, and it is what the site's structure,
copy and enquiry form are all built around.
