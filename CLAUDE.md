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

Image-processing helper (already wired as predev/prebuild):

```bash
node scripts/sync-figures.mjs    # mirror+optimize data/figures/ → public/figures/
```

Deploys are automatic: pushing to `main` triggers `.github/workflows/deploy.yml` (Pages via Actions). The workflow sets `NEXT_PUBLIC_BASE_PATH=/web-danslab` so assets resolve at `pablodans.github.io/web-danslab/`. When DNS for `www.danslab.xyz` is configured, restore `public/CNAME` and unset that env var.

## Translation-parity rule (BLOCKING)

The site is bilingual. **Every site-data file ships in two languages, and both must move together in the same change.** This is non-negotiable:

- Files under `data/` named `*.en.json` always have a paired `*.es.json`. Edit one → translate and edit the other in the same commit.
- TypeScript dicts in `data/content/*.ts` export `{ en, es }`. Add a key to `en` → add the translated key to `es` in the same edit. Add a new field to the `CommonDict` (or any `*Dict`) type → populate it in `en` and `es` simultaneously.
- The CSV format used historically is gone — all data is JSON or TS now.

**Translation defaults**: Spanish is Latin American / Uruguayan (no voseo unless the original copy used it; "tú" or impersonal forms are fine; standard LATAM spelling). English is American.

When a user asks to update a member, project, collaborator, etc., interpret it as updating BOTH JSONs. Don't ask for both versions — translate the missing language yourself and update both files. If the user explicitly only wants one language, mention that the other will drift.

## Architecture

### Static export, dual locale

`next.config.mjs` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. `basePath` and `assetPrefix` come from `NEXT_PUBLIC_BASE_PATH`. Build emits one HTML file per route into `out/`.

The site is fully bilingual:

- English at `/`
- Spanish at `/es/...`

The two language trees are **parallel directories** under `app/`: every English route at `app/<route>/page.tsx` has a Spanish twin at `app/es/<route>/page.tsx`. Each route file is a 5-line wrapper that imports from `components/pages/<X>Page.tsx` and passes `lang="en"` or `lang="es"`.

To add a new section, create both wrappers (EN and ES), the shared component in `components/pages/`, the dict entry under `data/content/` (or a JSON pair under `data/`), and add the section to the `SECTIONS` list in `components/Nav.tsx`.

### Content lives in typed dictionaries and JSON pairs

Page text is **not** inline.

- **Page-level copy** (eyebrows, headings, intro paragraphs, section titles) lives in `data/content/*.ts`, each exporting `{ en, es }` keyed by `Lang`. Files: `common.ts`, `home.ts`, `research.ts`, `outreach.ts`.
- **Listy data** (members, projects, publications, collaborators) lives in JSON files under `data/`:
  - `data/members.{en,es}.json`, `data/past_members.{en,es}.json`
  - `data/research.{en,es}.json`
  - `data/collaborators.{en,es}.json`
  - `data/publications.json` (single file — paper titles stay in their original language)
- Loaders in `lib/` (`members.ts`, `research.ts`, `collaborators.ts`, `publications.ts`) `import` the JSON statically and return typed arrays. They are tree-shaken into the bundle at build time — no runtime fs reads.

Page components in `components/pages/` are server components: they take `lang: Lang`, look up the dict for that language, and render. `Nav`, `Footer`, `LangSwitch`, `MemberCard` are **client** components that detect lang via `usePathname()` and call `detectLang(pathname)` from `lib/i18n.ts`.

`localizePath(lang, "/research")` is the helper for building href targets that respect the locale prefix.

### basePath, asset URLs and the `asset()` helper

`next/image` with `images.unoptimized: true` (required for static export) does **not** auto-prefix the configured `basePath`. Same for raw `<img>`/`<a>` tags pointing at `/public/*` paths. Use `asset()` from `lib/asset.ts` for any URL that points at a file under `public/` — it prepends `process.env.NEXT_PUBLIC_BASE_PATH` (or empty string in dev). Already applied in `MemberCard`, `Nav`, `Gallery`, and the favicon path in `app/layout.tsx` metadata.

### Theming via CSS variables

`tailwind.config.ts` resolves color tokens (`bg`, `surface`, `ink`, `accent`, etc.) to `rgb(var(--token) / <alpha-value>)`, so Tailwind's alpha modifiers (`bg-bg/80`) keep working. The actual palettes are defined in `app/globals.css` under `:root[data-theme="dark"]` and `:root[data-theme="light"]`. Dark is the default.

`components/ThemeToggle.tsx` flips `data-theme` on `<html>` and persists to `localStorage`. An inline anti-FOUC script in `app/layout.tsx` applies the saved theme before hydration.

**Animated backgrounds (`DnaHelix`, `MoleculeRain`, `NeuralNetwork`, `FloatingBases`) read these CSS variables at draw time** (via `getComputedStyle(document.documentElement)`), so they recolor when the theme changes. Hard-coding RGB values in those canvases will silently drift out of sync with the palette.

### Members ordering

`lib/members.ts` imports both JSON files and applies an explicit `CURRENT_ORDER: string[]` (full names) for current members. Names not in that list fall to the end, sorted alphabetically by last name. **When the user adds a new member, also add their name to `CURRENT_ORDER`** at the right rank — otherwise they'll appear at the bottom.

Both `members.en.json` and `members.es.json` carry the same row count and order; only the localized fields differ (`role1`, `institution1`, `role2`, `institution2`, `comment`). Names, emails, scholar URLs, photo paths and `title` stay identical across the two languages.

### Publications

`data/publications.json` is the source of truth for the publication list. `lib/publications.ts` exposes `getNumberedGroups()` which assigns each publication a consecutive index — `#1` is the oldest, `#N` (the total) is the newest. Display order is unchanged (newest year first; within a year, newest first), so within a year-section you see decreasing numbers as you scroll down. Drive `pdf` URLs come from the original Google Site and resolve in Drive's viewer (read access is public).

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
- **Sharp is bundled with Next 15** — it is also a direct devDependency so `scripts/sync-figures.mjs` has it without ambiguity.
- **No CSV, no papaparse** — all listy data is JSON. If you need to parse CSV from elsewhere, add it explicitly; don't reach for a removed dep.
- **Migration sources** (`data/danslab-googlesite/`, `data/Danslab*.html`, `data/Danslab*_files/`, `data/figures_old/`) are gitignored. Treat them as read-only references — sources to translate or extract from, not site content.
