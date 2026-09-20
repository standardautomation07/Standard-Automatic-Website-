# "To be confirmed" worklist — every page that still shows unconfirmed data

Regenerated 2026-09-20 after the first technical-data research pass (37 fields filled from the company's own published pages; see the commit history). Resolved exactly as the site does (`specCompleteness()` in `web/src/lib/catalog.ts`).

- Products on the site: **38**
- Product pages showing "To be confirmed" somewhere: **22**
- Specification rows rendered as "To be confirmed": **121**

Where it shows up:

1. **Specification table rows** — a field in the product's spec schema with no value in `web/src/data/spec-values.json` (or an authored `status: "TBC"` row in `web/src/data/product-specs-*.ts`). Fix: fill the value in `research/technical-data-request.csv` and run `npm run spec:import`, or edit the authored spec file.
2. **Quick facts** — a `quickFacts` entry whose value literally reads "To be confirmed per …" in `web/src/data/products/<family>.ts`. Fix: replace with a real statement or remove the fact.
3. **Status badges** — a product or variant with `status: "POTENTIAL"` shows an amber "To be confirmed" badge on its page and on every card that lists it (family pages, `/products/catalogue`, industry pages). Fix: set `status: "CONFIRMED"` in the product data once the business confirms the line/variant, or remove it.

Remaining rows are certification-, survey- or supplier-dependent: none of them is stated in the company's published material, so they wait for the business (fire certificates, EN performance classes, headroom/side-room, duty ratings, control/safety hardware, compliance marking).

## By product page (worst first)

### Residential Garage Doors
- Page: `/products/industrial-doors/residential-garage-doors` · data: `web/src/data/products/industrial-doors.ts` · specs published 12/38
- **Spec rows to confirm (26):**
  - Dimensions › Maximum clear width (mm)
  - Dimensions › Maximum clear height (mm)
  - Dimensions › Minimum headroom required (mm)
  - Dimensions › Minimum side room required (mm)
  - Dimensions › Lift configuration
  - Construction › Panel thickness (mm)
  - Construction › Panel height (mm)
  - Construction › Finish and colour
  - Construction › Glazing and vision panels
  - Declared performance › Water tightness (class)
  - Declared performance › Air permeability (class)
  - Declared performance › Thermal transmittance (U) (W/m²K)
  - Declared performance › Airborne sound reduction (dB)
  - Drive › Rated motor power (kW)
  - Drive › Duty rating (cycles per hour or %ED)
  - Drive › Manual override
  - Control › Control system
  - Control › Activation devices
  - Control › Travel limit setting
  - Control › Interfaces
  - Safety › Finger-trap protection
  - Safety › Operating force limitation
  - Safety › Manual release
  - Compliance › Product standard
  - Compliance › Conformity marking
  - Compliance › Certificate reference

### Fire Rated Sliding Doors
- Page: `/products/fire-safety-doors/fire-rated-sliding-doors` · data: `web/src/data/products/fire-safety-doors.ts` · specs published 9/35
- **Spec rows to confirm (26):**
  - Dimensions › Maximum clear width (mm)
  - Dimensions › Maximum clear height (mm)
  - Dimensions › Minimum headroom required (mm)
  - Dimensions › Minimum side room required (mm)
  - Leaf construction › Surface finish
  - Fire performance › Integrity rating (minutes)
  - Fire performance › Insulation rating (minutes)
  - Fire performance › Test standard
  - Fire performance › Certificate reference
  - Fire performance › Behaviour on alarm
  - Drive › Operator type
  - Drive › Rated motor power (kW)
  - Drive › Supply voltage (V / phase / Hz)
  - Drive › Duty rating (cycles per hour or %ED)
  - Drive › Manual override
  - Control › Control system
  - Control › Activation devices
  - Control › Travel limit setting
  - Control › Interfaces
  - Safety › Presence detection
  - Safety › Obstruction detection
  - Safety › Escape route provision
  - Safety › Manual operation without power
  - Compliance › Product standard
  - Compliance › Conformity marking
  - Compliance › Certificate reference

### Aluminium Garage Doors
- Page: `/products/industrial-doors/aluminium-garage-doors` · data: `web/src/data/products/industrial-doors.ts` · specs published 13/38
- **Spec rows to confirm (25):**
  - Dimensions › Maximum clear width (mm)
  - Dimensions › Maximum clear height (mm)
  - Dimensions › Minimum headroom required (mm)
  - Dimensions › Minimum side room required (mm)
  - Dimensions › Lift configuration
  - Construction › Panel thickness (mm)
  - Construction › Panel height (mm)
  - Construction › Insulation core
  - Declared performance › Water tightness (class)
  - Declared performance › Air permeability (class)
  - Declared performance › Thermal transmittance (U) (W/m²K)
  - Declared performance › Airborne sound reduction (dB)
  - Drive › Rated motor power (kW)
  - Drive › Duty rating (cycles per hour or %ED)
  - Drive › Manual override
  - Control › Control system
  - Control › Activation devices
  - Control › Travel limit setting
  - Control › Interfaces
  - Safety › Finger-trap protection
  - Safety › Operating force limitation
  - Safety › Manual release
  - Compliance › Product standard
  - Compliance › Conformity marking
  - Compliance › Certificate reference

### Retractable Gates
- Page: `/products/automatic-gates/retractable-gates` · data: `web/src/data/products/automatic-gates.ts` · specs published 19/36
- **Spec rows to confirm (17):**
  - Dimensions › Maximum leaf weight (kg)
  - Dimensions › Side-run or swing room required (mm)
  - Cycle performance › Rated daily cycles (cycles/day)
  - Construction › Posts and foundations
  - Drive › Duty rating (cycles per hour or %ED)
  - Drive › Manual override
  - Control › Control system
  - Control › Travel limit setting
  - Control › Interfaces
  - Safety › Photocells
  - Safety › Safety edge
  - Safety › Operating force limitation
  - Safety › Manual release
  - Safety › Warning light and audible warning
  - Compliance › Product standard
  - Compliance › Conformity marking
  - Compliance › Certificate reference

### Industrial Sectional Overhead Doors
- Page: `/products/industrial-doors/industrial-sectional-overhead-doors` · data: `web/src/data/products/industrial-doors.ts` · specs published 25/40
- **Variant badges (3):** High lift; Vertical lift; Low headroom
- **Spec rows to confirm (15):**
  - Dimensions › Minimum headroom required (mm)
  - Dimensions › Minimum side room required (mm)
  - Declared performance › Water tightness (class)
  - Declared performance › Air permeability (class)
  - Declared performance › Thermal transmittance (U) (W/m²K)
  - Declared performance › Airborne sound reduction (dB)
  - Drive › Duty rating (cycles per hour or %ED)
  - Control › Interfaces
  - Safety › Obstruction detection
  - Safety › Finger-trap protection
  - Safety › Operating force limitation
  - Safety › Manual release
  - Compliance › Product standard
  - Compliance › Conformity marking
  - Compliance › Certificate reference

### Dock Shelters & Dock Houses
- Page: `/products/loading-bay/dock-shelters-and-houses` · data: `web/src/data/products/loading-bay.ts` · specs published 11/16
- **Variant badges (1):** Inflatable shelter
- **Spec rows to confirm (5):**
  - Dimensions › Projection from the building line (mm)
  - Performance › Operating temperature (°C)
  - Compliance › Product standard
  - Compliance › Conformity marking
  - Compliance › Certificate reference

### High Speed Cleanroom / Hygiene Door
- Page: `/products/high-speed-doors/high-speed-cleanroom-hygiene-door` · data: `web/src/data/products/high-speed-doors.ts` · specs published 14/16
- **Spec rows to confirm (2):**
  - Drive & control › Drive (operator type)
  - Drive & control › Power (V / phase / Hz)

### High Speed Cold Storage / Freezer Door
- Page: `/products/high-speed-doors/high-speed-cold-storage-freezer-door` · data: `web/src/data/products/high-speed-doors.ts` · specs published 13/15
- **Spec rows to confirm (2):**
  - Drive & control › Drive (operator type)
  - Drive & control › Power (V / phase / Hz)

### Dock Levellers
- Page: `/products/loading-bay/dock-levellers` · data: `web/src/data/products/loading-bay.ts` · specs published 28/30
- **Variant badges (1):** Telescopic lip
- **Spec rows to confirm (2):**
  - Construction › Deck plate thickness
  - Construction › Hinge arrangement

### Retractable Barriers
- Page: `/products/access-control/retractable-barriers` · data: `web/src/data/products/access-control.ts` · specs published 27/28
- **Product status badge:** `POTENTIAL` → shows "To be confirmed" on the page and on every card listing it
- **Variant badges (2):** Powered; Manual
- **Quick fact:** Specification: To be confirmed per installation
- **Spec rows to confirm (1):**
  - Power and environment › IP rating

### Fire Rated Rolling Shutters
- Page: `/products/fire-safety-doors/fire-rated-rolling-shutters` · data: `web/src/data/products/fire-safety-doors.ts` · specs published 57/57
- **Variant badges (1):** Alarm-linked auto-close

### Automatic Sliding Gates
- Page: `/products/automatic-gates/automatic-sliding-gates` · data: `web/src/data/products/automatic-gates.ts` · specs published 32/32
- **Variant badges (1):** Cantilever
- **Quick fact:** Specification: To be confirmed per opening

### Telescopic Sliding Gates
- Page: `/products/automatic-gates/telescopic-sliding-gates` · data: `web/src/data/products/automatic-gates.ts` · specs published 32/32
- **Variant badges (1):** Three-leaf nesting
- **Quick fact:** Specification: To be confirmed per opening

### Automatic Swing Gates
- Page: `/products/automatic-gates/automatic-swing-gates` · data: `web/src/data/products/automatic-gates.ts` · specs published 32/32
- **Variant badges (1):** Underground operator
- **Quick fact:** Specification: To be confirmed per opening

### Automatic Sliding Glass Doors
- Page: `/products/entrance-automation/automatic-sliding-glass-doors` · data: `web/src/data/products/entrance-automation.ts` · specs published 32/32
- **Variant badges (2):** Telescopic; Break-out escape leaves
- **Quick fact:** Specification: To be confirmed per opening

### Automatic Swing Doors
- Page: `/products/entrance-automation/automatic-swing-doors` · data: `web/src/data/products/entrance-automation.ts` · specs published 32/32
- **Product status badge:** `POTENTIAL` → shows "To be confirmed" on the page and on every card listing it
- **Variant badges (4):** Low energy; Full power; Double leaf with sequencing; Concealed operator
- **Quick fact:** Specification: To be confirmed per opening

### Hermetic & Cleanroom Doors
- Page: `/products/entrance-automation/hermetic-cleanroom-doors` · data: `web/src/data/products/entrance-automation.ts` · specs published 32/32
- **Product status badge:** `POTENTIAL` → shows "To be confirmed" on the page and on every card listing it
- **Variant badges (4):** Single leaf; Bi-parting; Airlock interlocked pair; Shielded
- **Quick fact:** Specification: To be confirmed per room

### Tripod Turnstiles
- Page: `/products/access-control/tripod-turnstiles` · data: `web/src/data/products/access-control.ts` · specs published 29/29
- **Quick fact:** Specification: To be confirmed per lane

### Flap Barriers
- Page: `/products/access-control/flap-barriers` · data: `web/src/data/products/access-control.ts` · specs published 29/29
- **Quick fact:** Specification: To be confirmed per lane

### Full Height Turnstiles
- Page: `/products/access-control/full-height-turnstiles` · data: `web/src/data/products/access-control.ts` · specs published 29/29
- **Quick fact:** Specification: To be confirmed per lane

### Bollards
- Page: `/products/access-control/bollards` · data: `web/src/data/products/access-control.ts` · specs published 28/28
- **Variant badges (1):** Automatic rising
- **Quick fact:** Specification: To be confirmed per installation

### Boom Barriers
- Page: `/products/access-control/boom-barriers` · data: `web/src/data/products/access-control.ts` · specs published 28/28
- **Product status badge:** `POTENTIAL` → shows "To be confirmed" on the page and on every card listing it
- **Variant badges (3):** Straight boom; Folding boom; Fence boom
- **Quick fact:** Specification: To be confirmed per installation
