# Outreach gallery images

Each subfolder under `public/outreach/` is a gallery. The `Gallery` component on the matching page (`app/outreach/<slug>/page.tsx`) auto-discovers any image in here at build time and renders it.

## Folders

- `abc-2023/` → shown on `/outreach/abc-2023`
- `arn-for-export/` → shown on `/outreach/arn-for-export`
- `sonification/` → shown on `/outreach/sonification`

## Optimize photos before adding them

Source photos from phones/cameras are typically 5–10 MB each. **Do not commit those raw files** — the page would take 30+ seconds to load on mobile and the repo would bloat.

Resize to ~1600 px on the long side and re-encode at JPEG quality 80–85 (~150–300 KB per image). On macOS / Linux, with ImageMagick:

```bash
magick mogrify -resize 1600x1600^> -quality 82 -strip *.jpg
```

On Windows with [Squoosh CLI](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli):

```bash
npx @squoosh/cli --resize '{"enabled":true,"width":1600}' --mozjpeg '{"quality":82}' *.jpg
```

Or just use the free [squoosh.app](https://squoosh.app/) web tool one-by-one for a curated set of 8–16 images.

## Naming

Images are sorted alphabetically. Prefix names if you want a specific order, e.g. `01-opening.jpg`, `02-poster-session.jpg`.
