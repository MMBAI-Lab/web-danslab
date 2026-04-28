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
  "miniABC.png",
];

// JPG sources with WHITE background → transparent PNG.
const JPG_TO_PNG = [{ src: "logo_fcien.jpg", out: "logo_fcien.png" }];

// JPG sources with BLACK background → transparent PNG, original RGB
// preserved (so white logos stay white, colored logos stay colored).
const JPG_BLACK_TO_PNG = [
  { src: "ARNforExport_funding.jpg", out: "ARNforExport_funding.png" },
];

// PNG sprites with BLACK background → alpha. RGB is promoted to pure
// white so the sprite tints cleanly when re-colored at draw time.
const BLACK_BG_TO_ALPHA = ["ARNflotante.png"];

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

function blackToAlpha(buf) {
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i],
      g = buf[i + 1],
      b = buf[i + 2];
    // alpha = brightness (max of RGB). Pure black → fully transparent.
    buf[i + 3] = Math.max(r, g, b);
    // promote remaining color to pure white so the sprite tints cleanly.
    buf[i] = 255;
    buf[i + 1] = 255;
    buf[i + 2] = 255;
  }
}

function blackBgToAlpha(buf) {
  // Same alpha-from-luminance, but KEEP the original RGB so coloured logos
  // survive intact. JPEGs around 0–10 in any channel are background; the
  // small lift hardens the alpha so JPEG noise doesn't leave a faint glow.
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i],
      g = buf[i + 1],
      b = buf[i + 2];
    const lum = Math.max(r, g, b);
    buf[i + 3] = lum < 16 ? 0 : Math.min(255, Math.round((lum - 16) * (255 / (255 - 16))));
  }
}

async function processToPng(srcPath, outPath, label, transform = whiteToAlpha) {
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  transform(data);
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

for (const { src, out } of JPG_BLACK_TO_PNG) {
  await processToPng(
    path.join(FIGS, src),
    path.join(FIGS, out),
    `${src} → ${out} (black-bg)`,
    blackBgToAlpha
  );
}

for (const f of BLACK_BG_TO_ALPHA) {
  await processToPng(path.join(FIGS, f), path.join(FIGS, f), `${f} (black→alpha)`, blackToAlpha);
}
