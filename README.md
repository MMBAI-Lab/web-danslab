# DansLab website

Static, bilingual site for [DansLab](https://www.danslab.xyz) — Molecular Modeling, Bioinformatics & AI group (MMBAI), Universidad de la República (Salto, Uruguay).

Built with Next.js 15 (App Router) · TypeScript · Tailwind CSS · framer-motion. Deployed to GitHub Pages on every push to `main`.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev          # http://localhost:3000 — auto-runs sync-figures (predev)
npm run build        # static export to out/
```

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes to GitHub Pages on push to `main`. The workflow sets `NEXT_PUBLIC_BASE_PATH=/web-danslab` so the site works at `https://pablodans.github.io/web-danslab/`. Restore `public/CNAME` and unset that env var to switch to the custom domain at root.

## Site features

- **Bilingual** — English at `/`, Spanish at `/es/...`. The `LangSwitch` button in the nav preserves the current section when changing language. **Every site-data file ships in two parallel languages** — see _Translation parity_ below.
- **Light & dark themes** — toggle in the nav, persisted in `localStorage`. Theme palette lives in CSS variables (see [app/globals.css](app/globals.css)); an anti-FOUC inline script in [app/layout.tsx](app/layout.tsx) applies the theme before hydration.
- **Animated backgrounds** — DNA helix (SVG), Matrix-style molecule rain (canvas), neural network with signal pulses (canvas), large floating DNA/RNA bases (canvas). All theme-aware, paused off-screen, and respect `prefers-reduced-motion`.
- **Photo optimization** — [scripts/sync-figures.mjs](scripts/sync-figures.mjs) uses `sharp` to resize images from `data/figures/` to a 1400-px long edge and re-encode at JPEG q82 / PNG c9, mirroring the result into `public/figures/` on every `dev`/`build`.

## Where content lives

All content is in JSON or in TypeScript modules under `data/` — no CSV, no parser. Most edits don't need React.

| What                  | Edit this                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| Current members       | [data/members.en.json](data/members.en.json) and [data/members.es.json](data/members.es.json)            |
| Past members          | [data/past_members.en.json](data/past_members.en.json) and [data/past_members.es.json](data/past_members.es.json) |
| Member display order  | `CURRENT_ORDER` list in [lib/members.ts](lib/members.ts)                                                  |
| Publications          | [data/publications.json](data/publications.json) (single file; titles stay in their original language)    |
| Research projects     | [data/research.en.json](data/research.en.json) and [data/research.es.json](data/research.es.json)         |
| Collaborators         | [data/collaborators.en.json](data/collaborators.en.json) and [data/collaborators.es.json](data/collaborators.es.json) |
| Page text & headings  | the matching dict in [data/content/](data/content/) — `home.ts`, `research.ts`, `outreach.ts`, `common.ts` |
| Figures               | drop into [data/figures/](data/figures/) — auto-synced/optimized to `public/figures/` on next dev/build  |
| Outreach galleries    | drop optimized images into [public/outreach/&lt;slug&gt;/](public/outreach/)                              |

## Translation parity

The site is bilingual: every visible string exists in EN and ES. Files under `data/` come in pairs, one per language:

- `data/<thing>.en.json` and `data/<thing>.es.json`
- TypeScript dicts in `data/content/*.ts` export `{ en, es }`

**Both languages must move together.** When you edit any `*.en.json` or `*.es.json`, update its sibling in the other language in the same change. When you add a new entry to a content dict, add the `en` and `es` versions in the same edit. Same for new typed fields: if you add `new_field` to the `CommonDict` type, populate it in both `en` and `es` immediately.

Operationally, this means:

- Adding a new member → edit `members.en.json` and `members.es.json`.
- Translating a research project description → edit `research.en.json` and `research.es.json`.
- Removing a collaborator → remove from `collaborators.en.json` and `collaborators.es.json`.

Skipping the second language will surface as `undefined` strings (TypeScript) or missing rows (JSON) on the corresponding language route.

## Project layout

```
app/                              Routes (App Router); thin wrappers around components/pages/
  page.tsx, contact/, research/, members/, publications/, collaborators/,
  courses/, outreach/             English routes (/)
  es/...                          Spanish routes (/es/...) — mirror of the English tree
  layout.tsx, globals.css         Root layout + Tailwind base + theme CSS variables

components/
  Nav.tsx, Footer.tsx             Lang-aware (read URL via usePathname)
  ThemeToggle.tsx, LangSwitch.tsx Persistent theme + language switchers
  DnaHelix.tsx, MoleculeRain.tsx, NeuralNetwork.tsx, FloatingBases.tsx,
    SequenceTicker.tsx            Decorative backgrounds (canvas / SVG)
  FadeIn.tsx                      framer-motion scroll-in wrapper
  MemberCard.tsx, Gallery.tsx     UI primitives
  pages/                          One *Page.tsx per route; takes a `lang` prop

data/
  content/                        Typed { en, es } dicts: common, home, research, outreach
  members.{en,es}.json            Current members
  past_members.{en,es}.json       Past members
  research.{en,es}.json           Research projects
  collaborators.{en,es}.json      Collaborators
  publications.json               Single publications file (titles in original language)
  figures/                        Canonical figures (logos, member photos). Tracked.
  Danslab*.html, danslab-googlesite/, figures_old/   Migration sources (gitignored)

lib/
  i18n.ts                         Lang type, detectLang(), localizePath()
  asset.ts                        Prepend basePath to public/* URLs
  members.ts, research.ts,
    collaborators.ts              Typed JSON loaders, one per language pair
  publications.ts                 Year grouping, consecutive numbering, venue formatter
  gallery.ts                      Build-time directory scanner for outreach galleries

public/
  figures/                        Auto-generated mirror of data/figures/ — gitignored
  outreach/<slug>/                Optimized gallery images per outreach activity
  .nojekyll                       Disables Jekyll on Pages

scripts/
  sync-figures.mjs                Optimizing mirror data/figures/ → public/figures/
  extract-text.mjs                One-off helper to dump text from saved Google Sites HTML
```

## Migration sources (gitignored)

Original Google Site material lives entirely under `data/`:

- `data/danslab-googlesite/` — Drive folder export (mol files, PDF, raw photos).
- `data/Danslab*.html` + `data/Danslab*_files/` — saved HTML copies of each tab.
- `data/figures_old/` — older figures kept for reference.

To use any of it on the site, copy/move into `data/figures/` (or directly under `public/...` for non-figures). See [`.gitignore`](.gitignore).
