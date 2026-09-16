# Access Control and Entrance Automation — technical data sources

Provenance for the specification tables authored in
`web/src/data/product-specs-access.ts` and
`web/src/data/product-specs-entrance.ts`.

These nine products had no issued technical data. Every published value is
a family-level statement derived from the manufacturer documentation listed
here, worded as "typically", "up to", or "depending on model", and never as a
figure for a specific Standard Automatic Solutions model — no model is named
on these pages. Where the sources did not agree, or only one source covered a
parameter, the wording says so or the row stays unanswered.

Nothing below is a claim that a product sold by Standard Automatic Solutions
carries any of these ratings. The compliance rows on every page state the
framework that applies and defer to the supplied operator's own declaration.

Retrieved 2026-09-16.

---

## Boom Barriers

Family-level ranges drawn from three manufacturers' current models.

| Parameter | FAAC B680H | CAME GARD PX | Nice M3/M5/M7BAR, L9BAR |
| --- | --- | --- | --- |
| Boom length | 2–8 m (2.50–8.30 range table); beams over 5 m in two pieces | passage up to 3.8 m | clear opening 2.32–9 m by model |
| Opening / manoeuvre time | adjustable 1.5 s (2 m) to 6 s (8 m) | 1–2 s | 1.5–4 / 3–6 / 6–10 / 11–18 s by model, adjustable |
| Duty | continuous | continuous | 500 / 350 / 200 / 150 cycles per hour by model |
| Rated life | over 2,000,000 cycles | MCBF 10,000,000 | see manual "Product durability" |
| Supply | 100–240 V AC | 100–240 V AC | 230 V AC 50/60 Hz |
| Power | 240 W | 270 W; standby 2.5 W | 40–50 W nominal; 110–160 W peak by model |
| Motor | hydraulic + 36 V DC brushless hybrid | 36 V DC brushless, oil-bath gearbox | 24 V DC electromechanical |
| IP rating | IP56 (reseller summaries; not on the fetched page) | not stated on page; IP54 in reseller summaries | IP54 |
| Operating temperature | −20 to +55 °C | −20 to +55 °C | −20 to +55 °C |
| Cabinet | removable case, 4 colours or stainless | RAL 7043 galvanized steel | 400×299×1215 mm (M-Bar), 500×299×1215 mm (L9BAR); 80–98 kg |
| Boom | extruded aluminium, elliptical or round, one-piece or modular | not stated | aluminium XBA profiles, white |
| Obstacle detection | integrated encoder, reverses on obstacle | encoder | encoder-based, adjustable |
| Loop detectors | 2 integrated | — | 2 inputs |
| Interfaces | integrated control board | RS485 with native Modbus | STOP / SbS / OPEN / CLOSE / HP inputs, radio connector, BlueBUS |
| Battery | — | not stated | optional PS224 emergency supply |
| Lighting | reflectors, optional lights | red/green LEDs | XBA rod lights, cover warning/traffic light options |
| Standards named | — | "EN tested" | Machinery Directive (manual §1) |

Sources:

- FAAC UK, B680 Automatic Barrier — https://www.faac.co.uk/barriers/b680-automatic-barrier
- FAAC B680H manual — https://www.faac.co.uk/productfiles/278_Manual_rad82906.pdf
- CAME, GARD PX — https://www.came.com/global/en/products/automatic-barriers-gard-px/
- Nice, M/L-Bar installation manual IS0647A03EN, §12 Technical specifications, Table 23 — https://www.niceforyou.com/sites/default/files/upload/manuals/IS0647A03EN.pdf
- Nice XBA boom arms (aluminium profile) — reseller listings, e.g. https://allsecurityequipment.com/products/nice-apollo-white-aluminum-boom-xba15

---

## Bollards (automatic rising)

| Parameter | FAAC J275 V2 | BFT Stoppy B 200/700 |
| --- | --- | --- |
| Cylinder diameter | 275 mm (J200 series: 200 mm) | 194 mm |
| Height above ground | 600 / 800 mm | 700 mm (115/500 model: 500 mm) |
| Rise time | ~5 s (600) / ~7 s (800) | 9 s (115/500: 6 s) |
| Descent | ~3.5 / 4.5 s standard; 1.2 / 1.5 s rapid | 9 s |
| Duty | intensive use | semi-intensive |
| Drive | hydraulic, integrated in cylinder | electromechanical |
| Supply / power | not stated on page | 230 V; 300 W |
| IP rating | IP67 (reseller summaries) | IP67 |
| Operating temperature | not stated | −20 to +60 °C |
| Material and finish | painted steel or brushed AISI 316 stainless; cataphoresis + polyester powder, RAL 7021 | S 235 JR carbon steel, cataphoresis + paint RAL 7015 |
| Impact resistance | 128 kJ steel / 207 kJ stainless | 10,000 J |
| Power failure | emergency and mechanical release | lowers automatically; reversible without voltage |
| Lighting | 12 built-in flashing LEDs; buzzer | LED light cap |
| Control | not stated | PERSEO CBE |
| Foundation | not stated | foundation box 965 mm deep (reseller summary) |
| Standards named | none | none |

Sources:

- FAAC UK, J275 V2 automatic traffic bollard — https://www.faac.co.uk/bollards/faac-j275-v2-automatic-traffic-bollard
- FAAC UK bollards range — https://www.faac.co.uk/bollards
- BFT Stoppy B 200/700 (reseller datasheet transcription) — https://allsecurityequipment.com/products/bft-p970089-00001
- BFT Stoppy B 115/500 (reseller) — https://allsecurityequipment.com/products/bft-p970088-00001

---

## Retractable Barriers (folding / trackless retractable gates)

This product type is not made by the European operator manufacturers; the
market is OEM suppliers. Two supplier datasheets were used and only figures the
two agree on, or that one states and the other does not contradict, are
published. Both suppliers claim "ISO / CE"; neither claim is verifiable from
the page and neither is published.

| Parameter | Elefine EF-SSM101 | CXHA CH-907B |
| --- | --- | --- |
| Material | 201 / 304 stainless or aluminium alloy, brushed | aluminium alloy |
| Height | 1.6 m standard | 1–2.5 m |
| Length | up to 30 m | 3.5–30 m |
| Motor | 370 / 550 / 750 W | not stated |
| Supply | 220 V ±10 % 50 Hz (110 V 60 Hz) | not stated |
| Speed | 17–19 m/min | not stated |
| Running gear | cast aluminium and rubber wheels; trackless, single or double track; 2,000,000 wheel cycles | bottom wheels with bearings; trackless, single or double track |
| Control | remote (< 50 m); LED display | remote (30 m); LED display |
| Safety | infrared anti-collision, stops 30–40 cm from obstacle; optional anti-climb alarm | not stated |
| Power failure | clutch key, 180° | manual clutch |
| Operating temperature | −25 to +75 °C | not stated |
| IP rating | not stated | not stated |

Sources:

- Elefine, 304 stainless electric folding retractable gate — https://www.elefinetech.com/304-stainless-steel-automatic-security-electric-folding-retractable-sliding-gate/
- CXHA, retractable electric trackless auto gate — https://automaingate.com/project/retractable-electric-trackless-auto-gate/

---

## Tripod Turnstiles

| Parameter | Automatic Systems TriLane TL2 (datasheet rev. 16, 11/2022) | Boon Edam Trilock 60 | CAME 500 E |
| --- | --- | --- | --- |
| Free passage | 510 mm arm; ~550 mm lane (brochure) | 457 / 508 / 559 mm | — |
| Housing | 1300 L × 235 W × ~920–995 H mm; 60 kg | 686 L × 178 W × 965 H mm | — |
| Arm height | 750 (dropping) / 755 mm | barrier height 33" | — |
| Throughput | 20 passages/min | 20–25 people/min | — |
| MCBF | 5,000,000 cycles with recommended maintenance | — | — |
| Supply | 100–230 V single phase 50/60 Hz; 24 V DC control | 110–240 V AC 50/60 Hz | — |
| Consumption | < 20 W max; < 85 W max motorised | 220 W | — |
| IP rating | IP44 | not stated | — |
| Operating temperature | −10 to +50 °C; heating options to −20 / −40 °C | 5–113 °F (≈ −15 to +45 °C) | — |
| Body | painted steel RAL 9005; aluminium end boxes; stainless top cover; AISI 304L / 316L full-stainless options; zinc-coated internals | stainless steel | — |
| Arm | AISI 304 stainless | not stated | fixed or drop arm |
| Mechanism | electromagnet + locking cam; unidirectional standard, bidirectional option; motorisation option | lock and motor disengage on power failure | electromechanical or motor-driven, bidirectional |
| Power failure | 5 working modes incl. free rotation on power failure; dropping-arm option | free passage | drop-arm version gives free passage |
| Indicators | status lights options; reader integration kit; TOF fraud detection option | red/green lights, arrow pictograms | — |
| Interface | dry contact; IP network option | dry contacts | — |
| Standards | "Complies with European standards" (unspecified) | none | none |

Sources:

- Automatic Systems, TriLane TL2 technical sheet — https://portal.automatic-systems.com/asGetDocument/TRILANE_TL2/FT/EN
- Automatic Systems, TriLane TL2 product page — https://www.automatic-systems.com/range/pedestrian-products/tripod-turnstiles/trilane-tripod-turnstiles/tl-2/
- Boon Edam, Trilock 60 — https://www.boonedam.com/en-us/products/tripod-turnstiles/trilock-60
- CAME UK, 500 E — https://www.came.com/uk/installers/solutions/turnstiles-and-automatic-doors/turnstiles/500-e

---

## Flap Barriers (speed gates)

| Parameter | Automatic Systems SlimLane 950 (datasheet rev. 16, 12/2019) | Boon Edam Speedlane Slide |
| --- | --- | --- |
| Passage | 900 mm (855–950); SlimLane 940: 600 mm | 510–910 mm |
| Housing | ~1555 L × 200–250 W × 991 H mm; 64 kg end unit, 95 kg intermediate | 1440 L × 312–512 W × 1035 H mm |
| Throughput | not stated as persons/min; min opening or closing 0.9 s | 25–30 persons/min |
| MCBF | 5,000,000 with recommended maintenance | — |
| Supply | 110–240 V AC 50/60 Hz, 5 A | — |
| Consumption | 50 W standby / 170 W cycle / 300 W max; 2 × 24 V DC motors, 93 W | — |
| IP rating | IP40 | — |
| Operating temperature | 0 to +50 °C | — |
| Housing | brushed AISI 304L stainless; zinc-plated steel frame | — |
| Obstacle | 10 mm tempered glass, 900 mm; 1200 / 1500 / 1700 mm options | glass wings |
| Mechanism | DC motor + epicyclic gearbox, electromagnetic brake, obstacle position sensor; locks on forced entry | sliding glass wings |
| Detection | DIRAS infrared matrix for tracking, safety and fraud | tailgating, safety and object detection sensors as standard |
| Interface | dry contacts; Ethernet / USB, XML-RPC; embedded web server | — |
| Power failure | battery backup option opens obstacles; EGRESS push-open mode option | — |
| Standards | "Conform to European standards" (unspecified) | — |

Sources:

- Automatic Systems, SlimLane 950 datasheet — https://www.automatic-systems.com/wp-content/uploads/2020/03/slimlane950-ft-en-16.pdf
- Boon Edam, Lifeline Speedlane Slide — https://www.boonedam.com/en-us/products/optical-turnstiles/lifeline-speedlane-slide

---

## Full Height Turnstiles

| Parameter | Automatic Systems TRS 372 (engineering spec) | Gunnebo RotaSec (A&E spec) |
| --- | --- | --- |
| Height | 2289.5 mm max | 2395 mm overall; 2100 mm passage |
| Width / depth | 1370 W × 2400 D mm (double) | 1603 W (single) / 2442 (double interlocking); 1160–1655 D |
| Passage | 2 × 640 mm | 692 mm; entrance 547 / 761 mm by model |
| Rotor | 3 rotors at 120°, straight arms | 3 or 4 locking positions at 120° / 90°; 600 mm arms, Ø 38 mm; 140 mm bottom clearance |
| Supply | 230 V AC 50/60 Hz or 120 V 60 Hz | not stated |
| Consumption | 70 W max | 50 VA max per rotor |
| IP rating | IP43 | IP44 |
| Operating temperature | −10 to +50 °C | −5 to +50 °C, 95 % RH |
| Material | galvanized steel, 2 coats RAL 7038; AISI 304 brushed stainless option | curved casework with overhead cabinet |
| Mechanism | manually pushed; mechanical locking; hydraulic damper | manually driven, bi-directional |
| Power failure | selectable fail-safe (unlocks) or fail-lock | normally closed |
| Fire alarm | emergency input unlocks for exit | emergency / fire alarm mode |
| Anti-backup | anti-passback after 60° rotation | improper transit control with buzzer |
| Interface | CAN bus; RS232 | building access control |
| MCBF | 1,000,000 | not stated |
| Standards | "EC compliance"; UL 325 optional | none |

Sources:

- Automatic Systems, TRS 372 engineering specification — https://www.automatic-systems.com/wp-content/uploads/2018/02/trs372-si-en-0.doc
- Gunnebo, RotaSec full height A&E specification — https://img.protogetic.com/media/public/Gunnebo_RotaSec_Full_Height_Specifications.pdf

---

## Automatic Sliding Glass Doors

| Parameter | GEZE Slimdrive SL NT (brochure, p. 6) | dormakaba ES 200 |
| --- | --- | --- |
| Drive | 70 mm H x 190 mm D | operator heights 100 / 150 mm |
| Leaf weight | up to 125 kg per leaf | total door weight to 240 kg |
| Opening width | single 700-3000 mm; bi-parting 900-3000 mm | - |
| Speed | opening and closing max 0.7 m/s per leaf | - |
| Hold-open | 0-60 s | - |
| Force limitation | max 150 N, automatic reversing on obstacle | - |
| Temperature | -15 to +55 C | - |
| IP rating | IP20 | - |
| Modes | permanent open, night, one-way (shop closing), automatic, reduced opening width, off | - |
| Sensors | radar motion detectors; infrared light curtains (GC 333, Presence S) | - |
| Emergency | integral backup supply opens or closes leaves on power failure (variant dependent); FR variant for escape routes | rechargeable battery pack (optional) |
| Approvals named | DIN 18650-1/2; BGR 232; DIN EN ISO 13849 PL d; AutSchR; TUV certificates | AS 5007, 1,000,000-cycle endurance |

Sources:

- GEZE Slimdrive SL NT sliding door systems brochure (GEZE document 135982) - https://iomax.ru/upload/iblock/b45/Slimdrive_SL-NT_EN_135982.pdf
- GEZE Slimdrive SL NT product page - https://www.geze.com/en/products-solutions/sliding_doors/automatic_sliding_doors/slimdrive/slimdrive_sl_nt/p_89291
- dormakaba ES 200 - https://www.dormakaba.com/au-en/offering/products/entrance-systems/automatic-sliding-door-operators/es-200-automatic-door--do_172

---

## Automatic Swing Doors

| Parameter | dormakaba ED 100 | dormakaba ED 250 |
| --- | --- | --- |
| Door leaf width | 700-1,100 mm | 700-1,600 mm |
| Door leaf weight | up to 160 kg (reveal to 300 mm) | up to 400 kg (reveal to 300 mm); 160 kg at 301-500 mm |
| Opening speed 0-90 deg | 4-12 s | 3-12 s |
| Closing speed 90-0 deg | 5-21 s | 4-21 s |
| Hold-open | 30 s; 180 s optional | same |
| Opening angle | max 110 deg | same |
| Closing force | EN 1154 size EN 2-4, adjustable | EN 4-7, adjustable |
| Power consumption | 120 W max | 240 W max |
| Supply | 230 V AC 50 Hz +/-10 %; 24 V DC 1.5 A for accessories | same |
| Ambient | -15 to +50 C, dry, 93 % RH | same |
| IP rating | IP20 | same |
| Dimensions | 685 x 70 x 130 mm (W x H x D); 735 mm with smoke detector; 12 kg | same |
| Modes | OFF, AUTOMATIC, PERMANENT OPEN, EXIT ONLY; Night/Bank key switch | same |
| Functions | Power Assist, Push & Go, wind load control to 150 N, reversing on obstruction, cycle counter to 1,000,000, EVAC | same |
| Inputs | potential-free activators inside/outside; safety sensors both sides with test signal; emergency-off; lock switch | same |
| Low / full energy | speed auto-limited in low-energy mode per EN 16005 / DIN 18650 / BS 7036-4 / ANSI 156.19; full energy needs safety sensors | same |
| Fire doors | slide channel and standard arm versions suitable for fire and smoke doors; integrated smoke detector option | same |
| Approvals named | ISO 9001; EPD ISO 14025 | same |

Sources:

- dormakaba, ED 100 / ED 250 technical product brochure, p. 2-3 - https://dormakaba-res.cloudinary.com/image/upload/v1745406585/dormakaba-prod/120000000161-dormakaba-swingdoor-operator-ed100-ed250-brochure-en.pdf
- dormakaba UK, ED 100/250 A product page - https://www.dormakaba.com/gb-en/offering/products/entrance-systems/swing-door-operators-and-swing-door-systems/ed-100250-a--do_15158

---

## Hermetic & Cleanroom Doors

No ISO 14644 class, GMP or FDA claim appears in either source and none is
published. Air-tightness is published as the manufacturers state it - a
leakage figure and an EN 12207 class - and only as what the product type
offers, not as a rating of a Standard Automatic Solutions doorset.

| Parameter | Portalp automatic hermetic sliding door | Grupsa hermetic sliding doors |
| --- | --- | --- |
| Clear opening | 700-1,800 mm depending on configuration | single 1,200-1,600 mm; double 1,600-2,000 mm |
| Leaf weight | 150 kg max | not stated |
| Leaf facing | HPL laminate, melamine, lacquered aluminium; 50 HPL colours | stainless steel, antibacterial HPL, glass |
| Sealing | tubular gaskets blocking contaminant passage | Class 4 to UNE-EN 12207 |
| Air permeability | leakage under 20 Pa less than 1 m3/h, NF EN 1026 | EN 12207 Class 4 |
| Activation | contactless controls, touch switches, foot control | range of activation devices |
| Sensors | motion sensors; safety detectors in opening and closing | not stated |
| Radiation shielding | lead-lined X-ray panels | lead 1-4 mm |
| Standards named | CE, EN 61000-6-3/-2, EN 60335-1/-2-103, EN 16005, NF EN 1026; CSTB test report | UNE-EN 12207 Class 4, UNE-EN 16005 |

Sources:

- Portalp, automatic hermetic sliding door - https://www.portalp.com/en/solutions/automatic-doors/hospitals-and-clean-rooms/automatic-hermetic-sliding-door/
- Grupsa, hermetic sliding doors for operating rooms - https://grupsa.com/en/hermetic-sliding-doors-for-operating-rooms/
