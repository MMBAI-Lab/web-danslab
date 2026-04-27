#!/usr/bin/env node
/**
 * Convert the original yeast_movie1_web3.gif (white-background DNA-loop
 * chromatin animation) to an animated, transparent-background version
 * with the original colors. Writes data/figures/yeast_movie1.{gif,webp}.
 *
 * How: build a 1-channel alpha mask = (255 - luminance) for every frame,
 * keep the source RGB unchanged, and joinChannel them. Sharp preserves
 * the multi-page structure as long as the alpha buffer is supplied raw
 * with the full stacked dimensions of the animated source.
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

const meta = await sharp(SRC, { animated: true }).metadata();
console.log(
  `[recolor-yeast] ${meta.pages} frames · ${meta.width}×${Math.round(
    (meta.height ?? 0) / (meta.pages ?? 1)
  )} → ${TARGET_W}×?`
);

// 1-channel alpha = inverted luminance, raw, multi-page stacked.
const alphaBuf = await sharp(SRC, { animated: true })
  .resize({ width: TARGET_W })
  .greyscale()
  .negate({ alpha: false })
  .extractChannel(0)
  .raw()
  .toBuffer({ resolveWithObject: true });

// Pipeline factory: original RGB (animated) + the raw alpha mask = animated RGBA.
const transparent = () =>
  sharp(SRC, { animated: true })
    .resize({ width: TARGET_W })
    .removeAlpha()
    .joinChannel(alphaBuf.data, {
      raw: {
        width: alphaBuf.info.width,
        height: alphaBuf.info.height,
        channels: 1,
      },
    });

await transparent()
  .webp({ quality: 80, effort: 4, loop: 0, delay: meta.delay })
  .toFile(DST_WEBP);
console.log(`[recolor-yeast] wrote ${path.relative(repoRoot, DST_WEBP)}`);

try {
  await transparent()
    .gif({ delay: meta.delay, loop: 0 })
    .toFile(DST_GIF);
  console.log(`[recolor-yeast] wrote ${path.relative(repoRoot, DST_GIF)}`);
} catch (err) {
  console.warn(`[recolor-yeast] GIF write failed: ${err.message}`);
}
