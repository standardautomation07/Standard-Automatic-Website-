# High Speed Doors — master visual definitions

Internal document. The controlling reference for every product image in the
High Speed Doors family.

Prepared 2026-09-05.

---

## How to read this document

Each product has a **master visual definition**: the fixed set of visual
characteristics that must be identical in all six images of that product. Once
the lead image is approved it becomes the visual reference, and every
subsequent image in that package is generated conditioned on it. If a generated
image changes any locked characteristic, it is rejected and regenerated.

Two kinds of statement appear, and they are deliberately kept apart:

- **VERIFIED** — taken from the technical parameters Standard Automatic
  Solutions issued on 2026-09-05, held verbatim in
  `web/src/data/product-specs.ts`. These are properties of the product.
- **ASSUMPTION** — a visual decision made to produce a coherent image, not a
  statement about the product. Colours, opening sizes, buildings, motor
  placement and hardware detail are assumptions unless listed as verified.
  When Standard Automation supplies real photographs, the assumptions are what
  gets replaced.

Nothing in any image asserts a figure. No image contains a speed, a dimension,
a wind class, a temperature, a material grade or a certification, because those
belong in the product data where they can be checked, not burned into a
picture.

---

## House photographic style

Applied to every image in the family so the library reads as one commissioned
shoot rather than a collection.

| Attribute | Setting |
| --- | --- |
| Format | Full frame, tripod |
| Lens | 24 mm tilt-shift for elevations, 35 mm for context, 50 mm for catalogue views, 100 mm macro for details |
| Aperture | f/5.6 to f/8 — everything readable, no cinematic bokeh |
| Verticals | Straight. No keystone, no fisheye, no distortion |
| Light | Daylight from roof lights or overcast sky, mixed with neutral high-bay LED. No glow, no flare, no rim lighting |
| Colour | Neutral white balance, true to life, no grading |
| Treatment | Documentary industrial and architectural photography |
| Excluded | Text, lettering, numbers, logos, branding, stickers, signage, watermarks, CGI look, HDR halos, duplicated objects, malformed people |

Vehicles and equipment that appear in any image must have **completely plain,
unmarked bodywork** — no manufacturer name, model number, badge or decal. This
is enforced in every prompt; an earlier operational frame was rejected and
regenerated because the model invented a forklift brand name.

### Image package, per product

| # | View | Aspect | Purpose |
| --- | --- | --- | --- |
| 1 | Hero | 3:2 or 4:3 | Website hero and product lead image |
| 2 | Front | 4:3 | Catalogue elevation, complete door, even light |
| 3 | Angle | 4:3 | Three-quarter view showing installation depth |
| 4 | Operational | 3:2 | Same door in use, partly open, traffic passing |
| 5 | Detail | 4:3 | Close-up of genuine components |
| 6 | Application | 16:9 | Same door in its real working environment |

---

## 01 — High Speed Roll-Up Door

**Status: complete. Six of six images approved.**

Environment: internal opening in a distribution warehouse.

| Characteristic | Definition | Basis |
| --- | --- | --- |
| Curtain | Single continuous flexible PVC-coated fabric sheet, signal blue, matte, visible woven texture | VERIFIED as flexible PVC / high-density PVC-coated polyester fabric. Colour is an ASSUMPTION |
| Vision | Two horizontal clear transparent PVC vision bands across the curtain | VERIFIED as optional transparent PVC. Two bands is an ASSUMPTION |
| Side guides | Galvanized steel, square section, full height, bolted to concrete jambs, visible fixings | VERIFIED as galvanized steel with a stainless option |
| Head | Exposed galvanized steel barrel spanning the opening on end bearing plates | ASSUMPTION — consistent with a curtain that winds onto a drum |
| Drive | Grey industrial geared motor, right-hand end of the barrel | VERIFIED as industrial geared motor. Side is an ASSUMPTION |
| Manual override | Hand chain hanging at the right-hand jamb | VERIFIED as manual crank / manual override |
| Control | Grey wall-mounted control panel on the right, red mushroom stop below | VERIFIED as PLC / inverter / encoder control |
| Bottom | Black rubber safety bottom edge | VERIFIED as photocell + safety edge |
| Opening | Approximately 4 m × 4 m | ASSUMPTION, within the published maximum |
| Setting | Concrete jambs, polished concrete floor, blue pallet racking beyond | ASSUMPTION |

---

## 02 — High Speed Fold-Up Door

**Status: hero and front approved. Angle, operational, detail and application outstanding.**

Environment: external elevation of a logistics distribution building.

| Characteristic | Definition | Basis |
| --- | --- | --- |
| Curtain | Reinforced PVC-coated fabric, anthracite dark grey, matte | VERIFIED as reinforced PVC-coated fabric. Colour is an ASSUMPTION |
| Wind bars | Slim silver horizontal aluminium bars crossing the full width at regular intervals, giving a strongly banded appearance | ASSUMPTION — the standard means of achieving the verified Class 2 / Class 3 wind configuration on a fabric leaf |
| Vision | One row of wide rectangular clear PVC windows across the middle third | VERIFIED as transparent PVC windows |
| Head | Large square-edged rectangular galvanized steel box housing the folded stack. **Explicitly not a round drum** | VERIFIED as heavy-duty galvanized steel track / cover; the rectangular form follows from a folding rather than rolling leaf |
| Side guides | Heavy galvanized steel, full height, standing proud of the cladding | VERIFIED as galvanized steel / aluminium / stainless steel |
| Drive | Grey industrial geared motor, right-hand end of the head box | VERIFIED as industrial geared motor |
| Bottom | Black bottom bar on a concrete apron | VERIFIED as safety edge |
| Opening | Tall portrait proportion, approximately 5 m wide × 7.5 m high | ASSUMPTION, within the published maximum. The tall proportion is the point: it is what distinguishes this product from the roll-up |
| Setting | Grey profiled metal cladding above a concrete plinth, overcast daylight | ASSUMPTION |

The first hero attempt was **rejected**: it drew a round barrel head, which is
a roll-up detail and wrong for a folding leaf, and the tall proportion that
distinguishes the product did not come through. Regenerated with both corrected.

---

## 03 — High Speed Self-Repairing Door

**Status: not started.**

Environment: constrained internal forklift route in a warehouse.

| Characteristic | Definition | Basis |
| --- | --- | --- |
| Curtain | Flexible reinforced PVC, safety orange, matte | VERIFIED as flexible reinforced PVC. Colour is an ASSUMPTION, chosen because a high-visibility curtain suits an impact-exposed route and distinguishes this product from the blue roll-up |
| Guide system | Distinctive soft-edged flexible guides with a rounded profile and a brush lip, visibly different from the square galvanized guide on product 01 | VERIFIED as flexible self-repairing guides. Form is an ASSUMPTION |
| Bottom | Soft flexible bottom edge with no rigid bar | VERIFIED as bottom safety edge; the soft form follows from a curtain designed to release rather than resist |
| Vision | Single wide clear PVC window band | VERIFIED as optional vision panel |
| Head | Compact galvanized barrel and cover | ASSUMPTION |
| Drive | Grey high-cycle geared motor, right-hand side | VERIFIED as high-cycle geared motor |
| Opening | Approximately 3.5 m × 3.5 m, narrower than product 01 | ASSUMPTION — width is application dependent in the issued data |
| Setting | Internal warehouse, yellow floor demarcation, scuffed guide posts, evidence of traffic | ASSUMPTION |

**Operational view must show the mechanism**: the curtain released from one
side guide after a strike, hanging clear of the guide, with the door otherwise
intact. This is the product, and no other image in the family shows it.

---

## 04 — High Speed Spiral Door

**Status: not started.**

Environment: external factory entrance.

| Characteristic | Definition | Basis |
| --- | --- | --- |
| Leaf | Horizontal rigid aluminium panels, natural silver anodised, slim shadow gap between panels | VERIFIED as insulated rigid aluminium panels |
| Panel | Slim horizontal sections, flat faced | VERIFIED as approximately 40–43 mm. The image must not assert the figure |
| Vision | One row of rectangular windows set into a panel course | VERIFIED as optional transparent panel configuration |
| Head | Deep box housing the spiral track, visibly deeper and rounder than a roll-up hood | VERIFIED as spiral / high-speed track |
| Side guides | Heavier aluminium side tracks | ASSUMPTION |
| Drive | Grey high-cycle industrial motor with a frequency inverter enclosure | VERIFIED as high-cycle industrial motor, frequency-controlled |
| Bottom | Aluminium bottom rail with a black seal | ASSUMPTION |
| Opening | Approximately 5 m × 5 m | ASSUMPTION, within the published maximum |
| Setting | External factory entrance, concrete apron, daylight | ASSUMPTION |

**Angle view must show the spiral**: photographed with the door part open so
the panels are visibly carried into the spiral above the opening, not stacked
on one another. That geometry is the entire product.

---

## 05 — High Speed Rigid / Insulated Door

**Status: not started.**

Environment: external loading area of a manufacturing plant.

| Characteristic | Definition | Basis |
| --- | --- | --- |
| Leaf | Double-skin insulated rigid panels, white / light grey, horizontal, flat faced with a shallow profile | VERIFIED as double-skin insulated rigid panels in aluminium alloy or engineered metal |
| Vision | One row of rectangular windows | VERIFIED as optional vision |
| Head | Rectangular hood, shallower than the spiral head | ASSUMPTION |
| Side guides | Aluminium side guides | ASSUMPTION |
| Drive | Grey industrial geared motor with a separate control enclosure | VERIFIED as industrial geared motor, PLC / inverter / encoder |
| Safety | Visible photocell heads at low level on both jambs, red mushroom emergency stop | VERIFIED as photocell / safety edge / emergency stop |
| Bottom | Panel bottom rail with a black seal | ASSUMPTION |
| Opening | Tall, approximately 5 m × 7 m | ASSUMPTION, within the published maximum |
| Setting | External elevation, loading apron, dock bumpers | ASSUMPTION |

Must read as visibly **more solid and heavier** than the spiral door, with a
plainer panel face and a shallower head. The two rigid products are the pair
most at risk of looking identical, and they must not.

---

## 06 — High Speed Cleanroom / Hygiene Door

**Status: not started.**

Environment: pharmaceutical or food production corridor.

| Characteristic | Definition | Basis |
| --- | --- | --- |
| Curtain | Smooth white hygienic PVC with no visible weave — deliberately smoother than the fabric on products 01, 02 and 03 | VERIFIED as hygienic PVC with a smooth cleanable surface |
| Frame | Brushed stainless steel, smooth rounded profiles, continuous welded seams, no exposed fixings | VERIFIED as stainless steel / hygienic-coated construction |
| Side guides | Stainless steel with visible perimeter sealing at the edges | VERIFIED as stainless steel / hygienic construction, side and bottom seals |
| Sealing | Visible side and bottom seal detail closing the perimeter | VERIFIED |
| Control | Stainless IP-rated control enclosure, not a painted steel box | VERIFIED as hygienic / suitable IP-rated configuration |
| Activation | Touchless sensor plate beside the opening, no push plate to touch | VERIFIED as radar / touchless sensor / push button |
| Vision | Single clear window | VERIFIED as optional vision panel |
| Opening | Approximately 2.5 m × 3 m — a room-to-room opening, not a vehicle opening | ASSUMPTION |
| Setting | White hygienic wall panels, coved skirting, seamless resin floor, flush ceiling with sealed light panels | ASSUMPTION |

**Nothing in any image of this product may suggest a classification, an
approval or a certification** — no rating plates, no wall notices, no gowning
signage, no readable labels of any kind. No classification has been supplied
for this door and the imagery must not imply one. Where people appear they wear
plain unbranded cleanroom garments.

---

## 07 — High Speed Cold Storage / Freezer Door

**Status: not started.**

Environment: cold store or freezer room in a cold-chain facility.

| Characteristic | Definition | Basis |
| --- | --- | --- |
| Curtain | Insulated flexible PVC, light grey-blue, visibly thicker and more substantial than the standard roll-up curtain, with a quilted multi-layer appearance | VERIFIED as insulated flexible PVC / specialist cold-temperature curtain |
| Side guides | Stainless steel guides with a visible heating element channel running their length | VERIFIED as heated / temperature-resistant configuration where required |
| Bottom | Heavy cold-store bottom seal, deeper than a standard bottom edge | VERIFIED as cold-storage sealing system |
| Head | Insulated hood | ASSUMPTION |
| Drive | Grey geared motor with a frequency inverter enclosure | VERIFIED as frequency-controlled |
| Environmental cues | Light frost on the surrounding panel joints, faint cold vapour at the threshold, condensation-free door face | ASSUMPTION, consistent with the verified anti-condensation and heater options |
| Opening | Approximately 3 m × 3.5 m | ASSUMPTION |
| Setting | White insulated sandwich-panel cold room walls, resin floor, racking with wrapped frozen pallets beyond | ASSUMPTION |

Cold must be shown through the **building**, not through colour grading. No
blue push, no cinematic haze. Frost on the panel joints and a hint of vapour at
the threshold are enough.

---

## Asset structure

```
web/public/images/products/high-speed-doors/
  high-speed-roll-up-door/
    high-speed-roll-up-door-hero.webp
    high-speed-roll-up-door-front.webp
    high-speed-roll-up-door-angle.webp
    high-speed-roll-up-door-operational.webp
    high-speed-roll-up-door-detail.webp
    high-speed-roll-up-door-application.webp
  high-speed-fold-up-door/
  high-speed-self-repairing-door/
  high-speed-spiral-door/
  high-speed-rigid-insulated-door/
  high-speed-cleanroom-hygiene-door/
  high-speed-cold-storage-freezer-door/
```

One folder per product, six predictable filenames per folder. Every file is
registered in `web/src/data/images.ts` with its source, usage status, product
association and alt text, because components on this site take an image id and
never a path.

## Provenance and the replacement path

These are **AI-generated visual assumptions, not photographs of Standard
Automation installations**, and they are recorded as such in the image
registry. They are technically plausible and consistent, and they are not
photographs of anyone else's product either.

When real installation photography exists:

1. Store the real photographs as the official product reference for that product.
2. Replace the ASSUMPTION rows above with what the real product actually looks like.
3. Regenerate the package, using the real photograph as the visual reference so
   new environments can be built around the real product without changing it.
4. Keep the same folder structure, the same six views and the same filenames,
   so nothing downstream has to change.
5. Update the usage status in the image registry from generated to owned.
