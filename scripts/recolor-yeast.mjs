#!/usr/bin/env node
/**
 * Recolor yeast_movie1_web3.gif into the site's red palette using sharp's
 * pipeline (which preserves the multi-page structure of the input), and
 * write both an animated GIF and an animated WebP into data/figures/.
 *
 * Note: full chroma-keying via sharp's joinChannel kills the animation,
 * so the white background ends up as the lightest tone of the red ramp.
 * The page wraps the result in a bordered, dark-tinted card that contains
 * the visual neatly without needing transparency.
 *
 * Run when the source changes:
 *   node scripts/recolor-yeast.mjs
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const SRC = path.join(
  repoRoot,
  "data",
  "danslab-googlesite",
  "figures_old",
  "yeast_movie1_web3.gif"
);
const DST_GIF = path.join(repoRoot, "data", "figures", "yeast_movie1.gif");
const DST_WEBP = path.join(repoRoot, "data", "figures", "yeast_movie1.webp");

const TARGET_W = 600;
const ACCENT = { r: 220, g: 38, b: 38 };

const meta = await sharp(SRC, { animated: true }).metadata();
console.log(
  `[recolor-yeast] ${meta.pages} frames · ${meta.width}×${Math.round(
    (meta.height ?? 0) / (meta.pages ?? 1)
  )} → ${TARGET_W}×?`
);

const recolor = () =>
  sharp(SRC, { animated: true })
    .resize({ width: TARGET_W })
    .removeAlpha()
    .modulate({ saturation: 0 })           // → grayscale (preserves luminance)
    .linear(0.85, -10)                     // gently darken everything
    .tint({ r: ACCENT.r, g: ACCENT.g, b: ACCENT.b });

await recolor()
  .webp({ quality: 80, effort: 4, loop: 0, delay: meta.delay })
  .toFile(DST_WEBP);
console.log(`[recolor-yeast] wrote ${path.relative(repoRoot, DST_WEBP)}`);

try {
  await recolor()
    .gif({ delay: meta.delay, loop: 0 })
    .toFile(DST_GIF);
  console.log(`[recolor-yeast] wrote ${path.relative(repoRoot, DST_GIF)}`);
} catch (err) {
  console.warn(`[recolor-yeast] GIF write failed: ${err.message}`);
}
