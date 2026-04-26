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

A GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) builds the site and publishes it to GitHub Pages on every push to `main`.

The custom domain `www.danslab.xyz` is configured via [public/CNAME](public/CNAME).

## Structure

```
app/                Routes (App Router): home, research, members, publications, outreach, contact
components/         Shared UI (Nav, Footer)
public/             Static assets served at site root (logo, favicon, CNAME, .nojekyll)
```

## Migration notes

Source material for the migration from the old Google Site lives in:

- `figures/` — historical images, logos, banners
- `members/` — member photos
- `danslab-googlesite/` — Drive folder mirror

These directories are **gitignored** — they are working sources, not site content. Move anything that should ship into `public/` and reference it from a page.
