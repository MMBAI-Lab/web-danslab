#!/usr/bin/env node
/**
 * Strip the white background from sponsor logos in data/figures and write
 * RGBA PNGs in place. Pixels close to pure white become fully transparent;
 * the [240–255] gradient is mapped smoothly so anti-aliased edges stay
 * clean instead of crunchy.
 *
 *   node scripts/transparent-logos.mjs
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIGS = path.resolve(__dirname, "..", "data", "figures");

// In-place transparency for PNGs that already have a white background.
const FILES = [
  "EPFL_logo.png",
  "ETHzurich_logo.png",
  "SFC_logo.png",
  "logo_cure.png",
  "logo_cenur.png",
];

// JPG sources that need to be re-encoded as transparent PNGs (different ext).
const JPG_TO_PNG = [{ src: "logo_fcien.jpg", out: "logo_fcien.png" }];

function whiteToAlpha(buf) {
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i],
      g = buf[i + 1],
      b = buf[i + 2];
    const minc = Math.min(r, g, b);
    if (minc <= 240) continue;
    // 240 → fully opaque, 255 → fully transparent
    const t = (minc - 240) / 15;
    buf[i + 3] = Math.round(buf[i + 3] * (1 - t));
  }
}

async function processToPng(srcPath, outPath, label) {
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  whiteToAlpha(data);
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`[transparent-logos] ${label} (${info.width}×${info.height}) ✓`);
}

for (const f of FILES) {
  await processToPng(path.join(FIGS, f), path.join(FIGS, f), f);
}

for (const { src, out } of JPG_TO_PNG) {
  await processToPng(path.join(FIGS, src), path.join(FIGS, out), `${src} → ${out}`);
}
