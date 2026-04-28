#!/usr/bin/env node
/**
 * Convert data/figures/ARNforExport_ARTxSc.gif (animated, black background)
 * to an animated transparent-background WebP at data/figures/
 * ARNforExport_ARTxSc.webp.
 *
 * The GIF is ~12 MB at 800px wide — way too large for a sidebar element.
 * Resize to TARGET_W and turn the black background into alpha by using
 * the per-pixel luminance directly as the alpha channel. Multi-page WebP
 * preserves the loop.
 *
 * Run when the source changes:
 *   node scripts/transparent-artxsc.mjs
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const SRC = path.join(repoRoot, "data", "figures", "ARNforExport_ARTxSc.gif");
const DST = path.join(repoRoot, "data", "figures", "ARNforExport_ARTxSc.webp");

const TARGET_W = 480;

const meta = await sharp(SRC, { animated: true }).metadata();
console.log(
  `[transparent-artxsc] ${meta.pages} frames · ${meta.width}×${Math.round(
    (meta.height ?? 0) / (meta.pages ?? 1)
  )} → ${TARGET_W}×?`
);

// 1-channel alpha = luminance (raw), multi-page stacked. Pure black → 0
// (transparent), bright pixels → opaque. Slight gamma boost on the alpha so
// dimly-lit edges read as solid.
const alphaBuf = await sharp(SRC, { animated: true })
  .resize({ width: TARGET_W })
  .greyscale()
  .linear(1.3, 0) // gentle contrast boost so soft edges harden up
  .extractChannel(0)
  .raw()
  .toBuffer({ resolveWithObject: true });

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
  .webp({ quality: 78, effort: 4, loop: 0, delay: meta.delay })
  .toFile(DST);
console.log(`[transparent-artxsc] wrote ${path.relative(repoRoot, DST)}`);
