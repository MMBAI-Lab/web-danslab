# DansLab website

Static site for [DansLab](https://www.danslab.xyz), built with Next.js 15 (App Router) + TypeScript + Tailwind CSS, deployed to GitHub Pages on every push to `main`.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build

```bash
npm run build
```

Outputs static HTML/CSS/JS to `out/`.

## Deployment

A GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) builds the site and publishes it to GitHub Pages on every push to `main`. The custom domain `www.danslab.xyz` is configured via [public/CNAME](public/CNAME).

## Editing content

Most content is data-driven — no React knowledge needed.

| What                | Edit this                                                                  |
| ------------------- | -------------------------------------------------------------------------- |
| Lab members         | [members/members.csv](members/members.csv) and [past_members.csv](members/past_members.csv) |
| Publications        | [data/publications.json](data/publications.json)                           |
| Member photos       | drop into [public/members/](public/members/)                               |
| Outreach galleries  | drop optimized images into [public/outreach/&lt;slug&gt;/](public/outreach/) |
| Page text & layout  | the matching file under [app/](app/)                                       |

See [members/README.md](members/README.md) and [public/outreach/README.md](public/outreach/README.md) for details and image-optimization guidance.

## Project layout

```
app/                Routes (App Router)
  page.tsx          Home
  research/         Research lines
  members/          Members (reads CSVs)
  publications/     Publications (reads data/publications.json)
  outreach/         Outreach index + sub-pages with galleries
  contact/          Contact
components/         Shared UI (Nav, Footer, MemberCard, Gallery)
data/               Site data (publications.json)
lib/                Build-time loaders (members, publications, gallery)
members/            Members CSVs
public/             Static assets served at site root
  members/          Member portrait photos
  outreach/         Outreach galleries (per-slug folders)
  CNAME             Custom domain for GitHub Pages
  .nojekyll         Disables Jekyll on Pages
```

## Migration sources (gitignored)

Raw material from the original Google Site lives entirely under `data/` and is gitignored:

- `data/danslab-googlesite/` — Drive folder export (mol files, PDF, raw photos).
- `data/Danslab*.html` and `data/Danslab*_files/` — saved HTML copies of each tab.
- `data/figures_old/` — older figures kept for reference.

Anything that should ship goes into `data/figures/` (auto-synced to `public/figures/`) or directly under `public/`. See [`.gitignore`](.gitignore).
