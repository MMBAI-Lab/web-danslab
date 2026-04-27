# DansLab website

Static, bilingual site for [DansLab](https://www.danslab.xyz) — Molecular Modeling, Bioinformatics & AI group, Universidad de la República (Salto, Uruguay).

Built with Next.js 15 (App Router) · TypeScript · Tailwind CSS · framer-motion. Deployed to GitHub Pages on every push to `main`.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev          # http://localhost:3000 — auto-runs sync-figures (predev)
npm run build        # static export to out/
```

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes to GitHub Pages on push to `main`. Custom domain `www.danslab.xyz` is configured via [`public/CNAME`](public/CNAME).

## Site features

- **Bilingual** — English at `/`, Spanish at `/es/...`. The `LangSwitch` button in the nav preserves the current section when changing language.
- **Light & dark themes** — toggle in the nav, persisted in `localStorage`. Theme palette lives in CSS variables (see [app/globals.css](app/globals.css)); an anti-FOUC inline script in [app/layout.tsx](app/layout.tsx) applies the theme before hydration.
- **Animated backgrounds** — DNA helix (SVG), Matrix-style molecule rain (canvas), neural network with signal pulses (canvas). All theme-aware, paused off-screen, and respect `prefers-reduced-motion`.
- **Photo optimization** — [scripts/sync-figures.mjs](scripts/sync-figures.mjs) uses `sharp` to resize images from `data/figures/` to a 1400-px long edge and re-encode at JPEG q82 / PNG c9, mirroring the result into `public/figures/` on every `dev`/`build`.

## Where content lives

Most edits don't need React.

| What                 | Edit this                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Member roster        | [members/members.csv](members/members.csv), [members/past_members.csv](members/past_members.csv)    |
| Member display order | `CURRENT_ORDER` list in [lib/members.ts](lib/members.ts)                                            |
| Publications         | [data/publications.json](data/publications.json) (also includes Drive PDF links)                    |
| Research projects    | `RESEARCH.en.projects` / `RESEARCH.es.projects` in [data/content/research.ts](data/content/research.ts) |
| Page text (any page) | the matching dict in [data/content/](data/content/) — `home.ts`, `research.ts`, `outreach.ts`, `common.ts` (nav, footer, contact, members labels) |
| Figures (logo, photos, etc.) | drop into [data/figures/](data/figures/) — auto-synced/optimized to `public/figures/` on next dev/build |
| Outreach galleries   | drop optimized images into [public/outreach/&lt;slug&gt;/](public/outreach/)                         |

See [members/README.md](members/README.md), [data/figures/README.md](data/figures/README.md) and [public/outreach/README.md](public/outreach/README.md) for editing details and image-optimization tips.

## Project layout

```
app/                              Routes (App Router); thin wrappers around components/pages/
  page.tsx, contact/, research/, members/, publications/, outreach/   English routes (/)
  es/...                          Spanish routes (/es/...) — mirror of the English tree
  layout.tsx, globals.css         Root layout + Tailwind base + theme CSS variables

components/
  Nav.tsx, Footer.tsx             Lang-aware (read URL via usePathname)
  ThemeToggle.tsx, LangSwitch.tsx Persistent theme + language switchers
  DnaHelix.tsx, MoleculeRain.tsx, NeuralNetwork.tsx, SequenceTicker.tsx   Decorative backgrounds
  FadeIn.tsx                      framer-motion scroll-in wrapper
  MemberCard.tsx, Gallery.tsx     UI primitives
  pages/                          One *Page.tsx per route; takes a `lang` prop and reads its dict

data/
  content/                        Typed { en, es } dictionaries: common, home, research, outreach
  publications.json               53 publications, sorted/grouped at render time
  figures/                        Canonical figures (logos, member photos). Tracked.
  Danslab*.html, danslab-googlesite/, figures_old/   Migration sources (gitignored)

lib/
  i18n.ts                         Lang type, detectLang(), localizePath()
  members.ts                      CSV loader (papaparse) + CURRENT_ORDER sort
  publications.ts                 JSON loader, year grouping, venue formatter
  gallery.ts                      Build-time directory scanner for outreach galleries

members/                          Member CSVs (single source of truth)
public/
  figures/                        Auto-generated mirror of data/figures/ — gitignored
  outreach/<slug>/                Optimized gallery images per outreach activity
  CNAME, .nojekyll                GitHub Pages config

scripts/
  sync-figures.mjs                Optimizing mirror data/figures/ → public/figures/
  extract-text.mjs                One-off helper to dump readable text from saved Google Sites HTML
```

## Migration sources (gitignored)

The original Google Site material lives entirely under `data/`:

- `data/danslab-googlesite/` — Drive folder export (mol files, PDF, raw photos).
- `data/Danslab*.html` + `data/Danslab*_files/` — saved HTML copies of each tab.
- `data/figures_old/` — older figures kept for reference.

To use any of it on the site, copy/move into `data/figures/` (or directly into `public/...` for non-figures). See [`.gitignore`](.gitignore).
