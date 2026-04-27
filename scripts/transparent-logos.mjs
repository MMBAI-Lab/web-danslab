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

const FILES = ["EPFL_logo.png", "ETHzurich_logo.png", "SFC_logo.png"];

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

for (const f of FILES) {
  const src = path.join(FIGS, f);
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  whiteToAlpha(data);
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(src);
  console.log(`[transparent-logos] ${f} (${info.width}×${info.height}) ✓`);
}
