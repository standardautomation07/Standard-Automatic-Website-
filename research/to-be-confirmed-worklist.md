# "To be confirmed" worklist

Updated 2026-09-20 after the second pass. Every specification row on every product page now carries an answer: figures where the company has published them, otherwise a stated dependency (configuration, survey or certification) entered on the sheet with a trailing ` *`, which the site renders as a qualified row with the configuration note under the table. Rows that are certification dependent must be replaced with the certified figure once a certificate exists.

- Specification rows rendered as "To be confirmed": **0** (was 157)
- Quick facts reading "To be confirmed per …": **0** (was 12)

## What still shows a "To be confirmed" badge

Only the `status: "POTENTIAL"` business-status badges remain. These are not data gaps — `research/product-source-matrix.csv` records that the lines were commented out of the previous site's navigation and need the business to confirm they are offered. Set `status: "CONFIRMED"` in `web/src/data/products/<family>.ts` once confirmed, or remove the line/variant.

- Products: Boom Barriers, Retractable Barriers (`access-control.ts`); Automatic Swing Doors, Hermetic & Cleanroom Doors (`entrance-automation.ts`)
- Variants: Industrial Sectional Overhead Doors — high lift, vertical lift, low headroom; Dock Shelters — inflatable; Dock Levellers — telescopic lip; Retractable Barriers — powered, manual; Fire Rated Rolling Shutters (1); Automatic Sliding / Telescopic / Swing Gates (1 each); Automatic Sliding Glass Doors (2); Automatic Swing Doors (4); Hermetic & Cleanroom Doors (4); Bollards (1); Boom Barriers (3)
- Pages that inherit those badges through cards: `/products/catalogue`, `/products/entrance-automation`, `/products/access-control`, `/industries/retail-commercial`, `/industries/infrastructure-transit`
