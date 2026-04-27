# Site figures

Drop here the figures, logos, banners, and illustrations used directly by site components (hero, project cards, research illustrations, etc.).

## How figures here are used

Files in this folder are imported **explicitly** from React components, e.g.:

```tsx
import Image from "next/image";
import logo from "@/data/figures/logo.png";

export function Header() {
  return <Image src={logo} alt="DansLab" priority />;
}
```

Webpack copies them into the build output automatically — no need to put them under `public/`.

## When NOT to use this folder

- **Galleries** (outreach photos, collections): use `public/outreach/<slug>/` — those are auto-scanned at build time.
- **Member portraits** referenced by CSV: use `public/members/` — referenced as a public URL string from `members.csv`.
- **Site-wide static files** (favicon, CNAME, .nojekyll): live under `public/`.

## Optimize before committing

Original photos from cameras/phones are typically 5–10 MB. **Resize to ~1600 px on the long side and re-encode at JPEG quality 80–85** before adding them — otherwise the build output bloats and pages load slowly. See [public/outreach/README.md](../../public/outreach/README.md) for tooling tips.
