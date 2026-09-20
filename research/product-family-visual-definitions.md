# Product family visualisations — master visual definition

Governs the eight family (category) images generated on 2026-09-20 through
Google Flow (Nano Banana Pro, 2K download, 16:9, centre-cropped to the 16:10
frame of the landing-page family card) for the eight main product-family cards
on the landing page; the same registry entries also feed the category cards on
`/products`, the family page heroes and the related-family panels. Every family image is registered in `web/src/data/images.ts` through
`familyVisual()` and stored as
`web/public/images/products/<family>/<family>-family-flow.webp`.

## Rules shared by all family images

- One distinct concept per family: a different product type, setting, time of
  day and camera position for each, so no two category cards read alike.
- Wide composition with the product centred and safely inside the frame,
  generated at 16:9 and cropped to the card's 16:10 (the family hero crops it
  further to a full-width band).
- Photorealistic B2B architectural / industrial photography, real materials,
  believable engineering proportions, no distortion or duplicated parts.
- No people, text, signage, logos, brand names, labels, watermarks or
  fantasy elements. The Flow watermark corner is patched before export.
- None of the previously used family stock/own photographs are reused.
- Interim visualisations, replaced by installation photography under the
  same filenames when it exists.

## Concept per family

### Access Control (`access-control`)

Wide 16:9 photograph of a controlled pedestrian entrance in a modern corporate lobby: a bank of four brushed stainless steel flap-barrier lanes with clear glass wings, black glass sensor panels and sloped black reader caps with a blue LED line, one wide accessible lane at the end, glass balustrades either side, polished stone floor, marble wall and full-height glazing behind, bright even lighting, camera three-quarter at eye level, 35 mm lens, the lanes centred. Access control equipment is the subject, no cameras.

### Automatic Gates (`automatic-gates`)

Wide 16:9 exterior photograph of a premium industrial site entrance in early-morning light: a large anthracite-grey powder-coated aluminium automatic sliding gate with wide horizontal slats, half open across a wide vehicle lane, running on its steel track past a compact grey operator with a black toothed rack along the bottom rail, dark grey steel posts with an amber beacon and a photocell, a gatehouse and light-grey clad factory beyond, block-paved approach, camera three-quarter at eye level, 35 mm lens, the gate centred. Physically believable gate geometry.

### Entrance Automation (`entrance-automation`)

Wide 16:9 photograph of a premium corporate headquarters entrance at dusk: a bi-parting automatic sliding glass door with clear toughened glass leaves in a slim satin-silver aluminium frame, the leaves open, black activation sensor on the full-width aluminium header, warm-lit lobby with a stone reception desk visible inside, large-format stone cladding and a cantilevered canopy outside, polished stone paving, blue-hour sky, camera square-on at eye level, 35 mm lens, the doorway centred.

### Fire Safety Doors (`fire-safety-doors`)

Wide 16:9 interior photograph of an engineered fire-compartment wall inside a modern industrial building: a heavy fire-rated steel rolling shutter, its galvanised double-skin slats closed across a wide opening in a fair-faced concrete and blockwork wall, exposed steel barrel on thick end plates above, heavy angle guides bolted to the jambs, a red-and-white release control box beside it, a fire-rated steel sliding door on its overhead track further along the same wall, clean concrete floor, cool even industrial lighting, camera three-quarter at eye level, 28 mm lens. Fire protection engineering, calm and clean — absolutely no flames, smoke or fire.

### High Speed Doors (`high-speed-doors`)

Wide 16:9 interior photograph of a modern logistics warehouse: a large high-speed flexible PVC roll-up door in saturated royal blue with a full-width clear vision band, installed in a steel-framed internal opening, the curtain raised about two-thirds so the bright dispatch hall beyond is visible, brushed stainless guide columns and hood, yellow-and-black bollards, polished grey concrete floor with yellow line markings, pallet racking softly out of focus, bright even LED daylight from roof lights, camera at eye level with a 28 mm architectural lens, the door centred. Clearly a fast-acting fabric door, not a rolling shutter.

### Industrial Doors (`industrial-doors`)

Wide 16:9 exterior photograph of a modern manufacturing plant elevation in late-afternoon sun: a row of three large white insulated sectional overhead doors with horizontal panel joints and a row of small windows, set in a light-grey clad steel-framed facade above a concrete apron, one door raised showing the production hall inside, yellow-and-black bollards, clean concrete forecourt, three-quarter architectural view with the middle door centred, 35 mm lens, crisp natural light. Clearly sectional overhead doors, not roller shutters.

### Loading Bay (`loading-bay`)

Wide 16:9 exterior photograph of a modern distribution centre loading dock in daylight: three loading bays on a light-grey clad building, each with a black curtain dock shelter with yellow guide stripes around a white sectional door, a hydraulic dock leveller with a chequer-plate deck visible at each dock edge, black rubber dock bumpers, a plain white unmarked articulated trailer reversed onto the nearest bay with its rear against the shelter, yellow wheel guides on the concrete apron, camera three-quarter at dock height, 28 mm lens, the occupied bay centred. Loading equipment clearly visible.

### Rolling Shutters (`rolling-shutters`)

Wide 16:9 architectural photograph of a premium commercial and light-industrial street facade in soft morning light: a run of four motorised rolling shutters closed across the bays of a stone- and metal-clad building, each shutter a curtain of clearly visible horizontal interlocking slats — two in satin anodised aluminium, two in galvanised steel — under plain square hoods, dark channel guides at each jamb, wall control stations, a wide paved forecourt, camera square-on and slightly elevated, 35 mm lens, the shutters filling the middle of the frame. Rolling shutters only, no sectional doors.
