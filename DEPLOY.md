# Publishing this repository and deploying a preview

The repository is committed and clean; it just has no remote yet. Everything
below is a one-time setup.

## Why this needs you

Claude Code cannot authenticate to GitHub from this machine. There is no
`gh` CLI installed, git has no credential helper configured, and the only
GitHub credential on the machine belongs to GitHub Desktop — Claude will not
read a stored token out of Windows Credential Manager to authenticate on your
behalf. So the push is yours; everything after it can be automated again.

## Pre-publish check (already done)

- Working tree clean, branch `master`, 22 MB packed.
- No `.env`, key, token or credential file is tracked.
- No API keys or secrets found in tracked source.
- `node_modules/`, `.next/`, `test-results/`, `playwright-report/` and
  `shots/` are all ignored.

## Step 1 — publish to GitHub

**Option A — GitHub Desktop** (installed, already signed in as
`standardautomation07`):

1. File → Add local repository → choose this folder.
2. Click **Publish repository**.
3. Name it `standard-automation-website`.
4. Leave **Keep this code private** ticked unless you want it public.
5. Publish.

**Option B — command line.** Create an empty repository on GitHub first (do
not add a README, licence or .gitignore), then:

```bash
cd "C:/Users/Dinesh Makwana/OneDrive/Desktop/Standard Automation Website" && git remote add origin https://github.com/standardautomation07/standard-automation-website.git && git push -u origin master
```

The first push opens a browser sign-in via Git Credential Manager.

## Step 2 — Vercel preview

Once the repository exists, Claude can create the Vercel project and the
preview deployment through the Vercel connector — tell it the repository name
and it will link the project with **root directory `web`** and deploy.

To do it yourself instead:

```bash
cd "C:/Users/Dinesh Makwana/OneDrive/Desktop/Standard Automation Website/web" && npx vercel --name standard-automation
```

Answer the prompts: link to the existing scope `standard`, set the root
directory to the current folder, and accept the detected Next.js settings.
`npx vercel --prod` promotes it afterwards.

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
