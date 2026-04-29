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

There is no test suite. `next build` does the type-checking and linting; the dev server is the fastest signal for visual / runtime regressions.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes to GitHub Pages on push to `main`. The workflow sets `NEXT_PUBLIC_BASE_PATH=/web-danslab` so the site works at `https://pablodans.github.io/web-danslab/`. Restore `public/CNAME` and unset that env var to switch to the custom domain at root.

## Site map

```
/                           Home
/research/                  Research lines + active projects (two main lines:
                            nucleic acids, bacterial genomics & resistance)
/members/                   Current and past members
/publications/              ~110 papers grouped by year, lab co-authors
                            underlined, DOI links, Drive PDFs where available
/collaborators/             18 collaborators split into National / International,
                            each card with portrait, role, institution, country flag
                            and a one-line collaboration project
/courses/                   Teaching activities (ongoing + past)
/contact/                   PI, address, embedded Google Map
/outreach/                  Hub for the three outreach projects below
  abc-2023/                 ABC 2023 conference page (committees, poster
                            winners, sponsors, picture grid, BOA link)
  arn-for-export/           ARN for Export installation (animated header GIF,
                            artist cards, three Udelar inaugurations, gallery,
                            YouTube media mosaic, funder strip)
  sonification/             Molecular Sonification (NASA + DNA YouTube embeds,
                            in-line reference quotes, sticky 3-square image
                            column, Geiger click synthesizer, locally hosted
                            DNA→Music interactive player)
/es/...                     Spanish mirror of every route above
```

## Site features

- **Bilingual** — English at `/`, Spanish at `/es/...`. The `LangSwitch` button in the nav preserves the current section when changing language. **Every site-data file ships in two parallel languages** — see _Translation parity_ below.
- **Light & dark themes** — toggle in the nav, persisted in `localStorage`. Theme palette lives in CSS variables (see [app/globals.css](app/globals.css)); an anti-FOUC inline script in [app/layout.tsx](app/layout.tsx) applies the theme before hydration.
- **Animated backgrounds** — many: DNA helix (SVG), Matrix-style molecule rain, neural network with signal pulses, large floating DNA/RNA bases, sequence ticker, an RNA-sprite cloud with depth-driven colour, and the Sonification background (DNA letter ribbons + floating musical glyphs). All theme-aware, paused off-screen, and respect `prefers-reduced-motion`.
- **Lab-author detection in publications** — [lib/lab-authors.ts](lib/lab-authors.ts) builds a Set of `firstInitial_lastToken` keys from members JSONs; the publications view underlines matching authors in a darker red so DansLab co-authors stand out.
- **Country flags** — collaborator cards show the national flag from `public/flags/<cc>.svg`. We use SVGs instead of regional-indicator emoji because Windows fonts render those as bare ISO codes.
- **Photo + asset pipeline** — see _Image pipelines_ below.
- **Web-Audio Geiger synthesizer** — [components/GeigerSound.tsx](components/GeigerSound.tsx) generates band-pass-filtered click bursts at Poisson-distributed intervals, no audio asset shipped.
- **DNA→Music interactive player** — locally re-hosted under [public/dna-music/](public/dna-music/) and re-themed to the DansLab palette; the upstream source is `mmbai-lab.github.io/dna-music`.

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
| Courses               | [data/courses.en.json](data/courses.en.json) and [data/courses.es.json](data/courses.es.json)             |
| Page text & headings  | the matching dict in [data/content/](data/content/) — `home.ts`, `research.ts`, `outreach.ts`, `common.ts` |
| Figures               | drop into [data/figures/](data/figures/) — auto-synced/optimized to `public/figures/` on next dev/build  |
| Outreach galleries    | drop optimized images into [public/outreach/&lt;slug&gt;/](public/outreach/)                              |
| Country flags         | drop SVGs into [public/flags/&lt;cc&gt;.svg](public/flags/) and add the country to `COUNTRY_TO_ISO` in [lib/collaborators.ts](lib/collaborators.ts) |
| DNA-Music player      | edit [public/dna-music/index.html](public/dna-music/index.html) (CSS theme) — `app.js` and `tables.json` are mirrored from upstream |

## Translation parity

The site is bilingual: every visible string exists in EN and ES. Files under `data/` come in pairs, one per language:

- `data/<thing>.en.json` and `data/<thing>.es.json`
- TypeScript dicts in `data/content/*.ts` export `{ en, es }`

**Both languages must move together.** When you edit any `*.en.json` or `*.es.json`, update its sibling in the other language in the same change. When you add a new entry to a content dict, add the `en` and `es` versions in the same edit. Same for new typed fields: if you add `new_field` to the `CommonDict` type, populate it in both `en` and `es` immediately.

Operationally, this means:

- Adding a new member → edit `members.en.json` and `members.es.json`.
- Translating a research project description → edit `research.en.json` and `research.es.json`.
- Removing a collaborator → remove from `collaborators.en.json` and `collaborators.es.json`.

Spanish copy targets Latin American / Uruguayan readers (no voseo unless the original used it; "tú" or impersonal forms are fine; standard LATAM spelling). English is American.

Skipping the second language will surface as `undefined` strings (TypeScript) or missing rows (JSON) on the corresponding language route.

## Image pipelines

`public/figures/` is fully generated; never edit it by hand. Two scripts feed it:

- **[scripts/sync-figures.mjs](scripts/sync-figures.mjs)** runs as `predev` and `prebuild`. It walks `data/figures/`, resizes raster images to a 1400-px long edge, and re-encodes (JPEG q82 + mozjpeg, PNG c9). Animated GIF/WebP are copied as-is to keep the loop. A `SKIP` set excludes specific filenames from being copied to the deploy bundle.
- **[scripts/transparent-logos.mjs](scripts/transparent-logos.mjs)** is a one-off transformer for line-art logos and silhouettes. Three passes are bundled:
  - `whiteToAlpha` — turn a white background into transparent (used for the sponsor logos and the miniABC table).
  - `blackBgToAlpha` (RGB preserved) — same idea but for sources that came on black, keeping coloured logos intact (the ARN-for-Export funder strip JPG).
  - `blackToAlpha` (RGB → white) — same idea but promoting the foreground to pure white, used for the RNA sprite that gets re-coloured at draw time in the `RnaCloud` canvas.
  - `silhouetteToRedAlpha` — repaints a black-on-white icon to the lab's red and uses the source darkness as alpha, used for the Outreach hub icons.

When you drop a new logo or icon into `data/figures/`, decide which pipeline applies and add it to the relevant list at the top of `transparent-logos.mjs`, then run `node scripts/transparent-logos.mjs` once.

## Project layout

```
app/                                  Routes (App Router); thin wrappers around components/pages/
  page.tsx, contact/, research/, members/, publications/, collaborators/,
  courses/, outreach/, outreach/<slug>/  English routes (/)
  es/...                              Spanish routes (/es/...) — mirror of the English tree
  layout.tsx, globals.css             Root layout + Tailwind base + theme CSS variables

components/
  Nav.tsx, Footer.tsx                 Lang-aware (read URL via usePathname)
  ThemeToggle.tsx, LangSwitch.tsx     Persistent theme + language switchers
  DnaHelix.tsx, MoleculeRain.tsx,
    NeuralNetwork.tsx, FloatingBases.tsx,
    SequenceTicker.tsx, BacteriaOutline.tsx     Decorative backgrounds (canvas / SVG)
  RnaCloud.tsx                        Floating RNA sprite cloud, depth-driven colour (ARN page)
  SonifBackground.tsx                 DNA helix + giant DNA-letter ribbons + floating
                                      music notes (Sonification page)
  GeigerSound.tsx                     Web-Audio Geiger click synthesizer
  FadeIn.tsx                          framer-motion scroll-in wrapper
  MemberCard.tsx, Gallery.tsx         UI primitives
  pages/                              One *Page.tsx per route; takes a `lang` prop

data/
  content/                            Typed { en, es } dicts: common, home, research, outreach
  members.{en,es}.json                Current members
  past_members.{en,es}.json           Past members
  research.{en,es}.json               Research projects
  collaborators.{en,es}.json          Collaborators (role, institution, country, project, photo)
  courses.{en,es}.json                Teaching activities
  publications.json                   Single publications file (titles in original language)
  figures/                            Canonical figures (logos, portraits, icons). Tracked.
  figures/collab/                     Collaborator portraits I scraped from public profile pages
  Danslab*.html, danslab-googlesite/,
    figures_old/                      Migration sources (gitignored)

lib/
  i18n.ts                             Lang type, detectLang(), localizePath()
  asset.ts                            Prepend basePath to public/* URLs
  members.ts, research.ts,
    collaborators.ts, courses.ts      Typed JSON loaders, one per language pair
  collaborators.ts                    Also: partitionByScope(), countryFlagSrc(), countryIso()
  publications.ts                     Year grouping, consecutive numbering, venue formatter
  lab-authors.ts                      Build a Set<string> of lab co-author keys for the
                                      publications underline
  gallery.ts                          Build-time directory scanner for outreach galleries

public/
  figures/                            Auto-generated mirror of data/figures/ — gitignored
  outreach/<slug>/                    Optimized gallery images per outreach activity
  flags/                              Country SVGs for collaborator cards
  dna-music/                          Locally hosted, re-themed mirror of mmbai-lab/dna-music
                                      (HTML + app.js + tables.json)
  .nojekyll                           Disables Jekyll on Pages

scripts/
  sync-figures.mjs                    Optimizing mirror data/figures/ → public/figures/
  transparent-logos.mjs               One-off recolouring/transparency pipelines
  fetch-missing-dois.mjs              CrossRef DOI back-fill for publications.json
  match-drive-pdfs.mjs                Map PDF filenames to publication entries
  canonicalize-authors.mjs            Normalise author strings across publications
  merge-traglia-bib.mjs               Helper used during the Germán Traglia bib import
  recolor-yeast.mjs                   One-off helper for the home-page yeast animation
  extract-text.mjs                    One-off helper to dump text from saved Google Sites HTML
```

## Migration sources (gitignored)

Original Google Site material lives entirely under `data/`:

- `data/danslab-googlesite/` — Drive folder export (mol files, PDF, raw photos).
- `data/Danslab*.html` + `data/Danslab*_files/` — saved HTML copies of each tab.
- `data/figures_old/` — older figures kept for reference.

To use any of it on the site, copy/move into `data/figures/` (or directly under `public/...` for non-figures). See [`.gitignore`](.gitignore).
