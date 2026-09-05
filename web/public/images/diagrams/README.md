# Door type illustrations

Original artwork, produced for this website by Standard Automation. No
third-party rights apply to any file in this folder, and no part of any file
is derived from another manufacturer's drawing, render or photograph.

Do not edit these files by hand. They are generated:

```bash
node scripts/build-door-diagrams.mjs
```

The source is `web/scripts/build-door-diagrams.mjs`, which also records why
they exist: each of the seven high speed door types is defined by how its leaf
is stored and guided, and a photograph of a closed industrial door shows none
of that. Each illustration depicts one mechanism, described only in terms the
issued technical data supports.

They are diagrams, not renders. They do not represent a particular model,
finish or dimension, and nothing in them should be scaled off.

Every file is registered in `web/src/data/images.ts` with its source, usage
status, product association and alt text. Components take an image id, never
a path, so none of these can appear on a page without that record.
