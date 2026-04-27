# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Node.js 20+ is required. On Windows shell, prefer `npm.cmd` over `npm` (the `npm.ps1` is blocked by default ExecutionPolicy).

```bash
npm install
npm run dev      # http://localhost:3000  — predev hook runs scripts/sync-figures.mjs
npm run build    # static export to out/  — prebuild hook runs scripts/sync-figures.mjs
```

There is no test suite. There is no separate lint step beyond `next build` (which type-checks and lints). The dev server is the fastest signal for visual / runtime regressions.

Image-processing helper:

```bash
node scripts/sync-figures.mjs    # mirror+optimize data/figures/ → public/figures/
```

Deploys are automatic: pushing to `main` triggers `.github/workflows/deploy.yml` (Pages via Actions). The custom domain is set in `public/CNAME` (`www.danslab.xyz`).

## Architecture

### Static export, dual locale

`next.config.mjs` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. Build emits one HTML file per route into `out/`.

The site is fully bilingual:

- English at `/`
- Spanish (Latin American / Uruguayan) at `/es/...`

The two language trees are **parallel directories** under `app/`: every English route at `app/<route>/page.tsx` has a Spanish twin at `app/es/<route>/page.tsx`. Each route file is a 5-line wrapper that imports from `components/pages/<X>Page.tsx` and passes `lang="en"` or `lang="es"`.

To add a new section, create both wrappers (EN and ES), the shared component in `components/pages/`, and add the dict entry under `data/content/`.

### Content lives in typed dictionaries

Page text is **not** inline. It lives in `data/content/*.ts`, each exporting `{ en, es }` keyed by `Lang`:

- `common.ts` — nav, footer, members labels, contact, publications intro, lang-switch labels
- `home.ts` — Home page
- `research.ts` — Research intro + 16 projects (typed `ResearchProject[]` per language)
- `outreach.ts` — outreach index, ABC 2023, ARN for Export, Sonification

Page components in `components/pages/` are server components: they take `lang: Lang`, look up `DICT[lang]`, and render. `Nav`, `Footer`, `LangSwitch`, `MemberCard` are **client** components that detect lang via `usePathname()` and call `detectLang(pathname)` from `lib/i18n.ts`.

When adding a translatable string, prefer the existing dict for that page over creating a new one. `localizePath(lang, "/research")` is the helper for building href targets that respect the locale prefix.

### Theming via CSS variables

`tailwind.config.ts` resolves color tokens (`bg`, `surface`, `ink`, `accent`, etc.) to `rgb(var(--token) / <alpha-value>)`, so Tailwind's alpha modifiers (`bg-bg/80`) keep working. The actual palettes are defined in `app/globals.css` under `:root[data-theme="dark"]` and `:root[data-theme="light"]`. The dark theme is the default.

`components/ThemeToggle.tsx` flips `data-theme` on `<html>` and persists to `localStorage`. An inline anti-FOUC script in `app/layout.tsx` applies the saved theme before hydration.

**Animated backgrounds (`DnaHelix`, `MoleculeRain`, `NeuralNetwork`) read these CSS variables at draw time** (via `getComputedStyle(document.documentElement)`), so they recolor when the theme changes. Hard-coding RGB values in those canvases will silently drift out of sync with the palette.

### Members ordering

`lib/members.ts` loads `members/members.csv` and `members/past_members.csv` with papaparse and applies an explicit `CURRENT_ORDER: string[]` (full names) for current members. Names not in that list fall to the end, sorted alphabetically by last name. **When the user adds a new member, also add their name to `CURRENT_ORDER`** at the right rank — otherwise they'll appear at the bottom.

The CSV has columns `title,name,role1,institution1,role2,institution2,email,scholar,photo,comment`. The `photo` value is a public URL like `/figures/PabloDans.jpg` (resolves to `public/figures/...` after sync). The CSV is currently English-only; if Spanish copy is needed, add `_es` columns rather than maintaining a parallel file.

### Publications

`data/publications.json` is the source of truth for the 53 publications. `lib/publications.ts` sorts by year descending, groups by year, and renders sticky-header sections. Drive `pdf` URLs come from the original Google Site and resolve in Drive's viewer (read access is public). Paper `title`/`journal`/`authors` stay in their original language across both EN and ES routes.

### Figures pipeline (`data/figures/` is canonical, `public/figures/` is generated)

`scripts/sync-figures.mjs` is the only thing that should write to `public/figures/`. It:

1. Walks `data/figures/`.
2. For raster files (.jpg/.jpeg/.png/.webp), resizes to a 1400-px long edge and re-encodes (JPEG q82 + mozjpeg, PNG compression 9).
3. Skips files whose destination mtime is fresher than the source.
4. Copies non-raster types as-is.

Both `predev` and `prebuild` run it via `package.json` scripts. `public/figures/` is gitignored. **Edit only `data/figures/`** — anything dropped directly in `public/figures/` will be wiped on the next sync.

For outreach galleries (per-slug photo sets) the filesystem scanner in `lib/gallery.ts` reads `public/outreach/<slug>/` directly; those folders are tracked and you optimize photos before committing (see `public/outreach/README.md`).

### Logo color trick

`public/figures/WEBDansLab_logoBLACK.png` is black-and-red artwork. On the dark theme the nav applies `filter: invert(1) hue-rotate(180deg)` so the black becomes white but the red nucleus stays red (red → cyan under invert, then cyan → red under hue-rotate(180deg)). On the light theme the logo is shown as-is.

## Conventions worth knowing

- **`bash` tool on Windows**: this repo's primary working directory uses `bash` shell semantics (forward slashes, `/dev/null`, etc.). PowerShell is also available for Windows-native commands.
- **`gh` CLI is not installed** — to inspect Actions runs, open the GitHub URL directly.
- **Sharp is bundled with Next 15** — installing `next` brings `sharp` as a transitive dep, so it's available to `scripts/sync-figures.mjs` without an extra dependency.
- **Migration sources** (`data/danslab-googlesite/`, `data/Danslab*.html`, `data/Danslab*_files/`, `data/figures_old/`) are gitignored. Treat them as read-only references — they are sources to translate or extract from, not site content.
