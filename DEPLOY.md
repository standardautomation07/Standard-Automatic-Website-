# Publishing this repository and deploying a preview

The repository is committed and clean; it just has no remote yet. Everything
below is a one-time setup.

## Status

**GitHub — done.** Pushed 2026-09-04 to
<https://github.com/standardautomation07/Standard-Automatic-Website->
(note the trailing hyphen in the repository name). The local branch was
renamed `master` → `main` to match the repository's default branch, which is
also what Vercel treats as the production branch.

The repository is **public**. If this should be private, change it in
GitHub → Settings → General → Danger Zone → Change repository visibility.

**Vercel — not deployed yet, and needs one action in the dashboard.**

Creating the project through the Vercel connector left an inconsistent state:

- `create_git_project` reported that project `standard-automation-website`
  (`prj_q3ourrRMxBcOGrZHLLu1v8Wp8acL`) was created, but could not verify the
  git link to the repository.
- Fetching that project id returns 404, and listing projects for team
  `standard9` returns an empty list.
- Re-creating the project returns 409 "already exists", and listing its
  deployments returns 403.
- No deployment is live: both `standard-automation-website.vercel.app` and
  `standard-automation-website-standard9.vercel.app` return 404.

The most likely cause is that Vercel's GitHub integration is not connected to
the `standardautomation07` GitHub account, so Vercel cannot read the
repository to link it — and the half-created project record is not visible to
the connector's token.

**To finish it (about a minute):**

1. Go to <https://vercel.com/new>.
2. If prompted, install/authorise the **Vercel GitHub app** for the
   `standardautomation07` account and grant it access to
   `Standard-Automatic-Website-`.
3. Import that repository.
4. Set **Root Directory** to `web` — this is the one setting that is not
   auto-detected, and the build fails without it.
5. Deploy.

Also check the project list for a stray, empty `standard-automation-website`
project and either reuse it (connect the repo in its Git settings) or delete
it before importing.

Once the GitHub app is authorised, the connector can drive this instead.

## Vercel project settings that matter

| Setting | Value |
| --- | --- |
| Framework | Next.js (auto-detected) |
| Root directory | `web` |
| Build command | `next build` (default) |
| Install command | `npm install` (default) |
| Node version | 22.x or later |
| Environment variables | none required — `ENQUIRY_PROVIDER` is intentionally unset, which makes the enquiry form report "recorded" rather than "sent" |

## Before the site goes to a real domain

- Configure http→https and non-www→www at the hosting/edge layer. The app
  deliberately does not handle protocol or host redirects.
- Replace the stand-in Unsplash photography with owned project photography
  (`web/public/images/photography/CREDITS.md` lists every file).
- Connect an email provider and implement `sendViaProvider` in
  `web/src/lib/enquiry.ts`, then set `ENQUIRY_PROVIDER`.
- Resolve the open items in `research/product-source-matrix.csv` — the
  POTENTIAL products and the two unconfirmed product names.
