#!/usr/bin/env node
/**
 * Mirror data/figures/ -> public/figures/ before each Next.js build/dev,
 * and web-optimize images on the way (resize + recompress).
 *
 * data/figures/  is the canonical, edited-by-hand folder. Originals stay there.
 * public/figures/ is auto-generated, gitignored, and what Next actually serves.
 *
 * Skipped: README.md, .gitkeep, dotfiles.
 * Caching: a destination file is reused if its mtime is newer than its source.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const SRC = path.join(repoRoot, "data", "figures");
const DST = path.join(repoRoot, "public", "figures");

const SKIP = new Set(["README.md", ".gitkeep"]);
const isDotfile = (name) => name.startsWith(".");

const MAX_LONG_EDGE = 1400;
const JPEG_QUALITY = 82;
const PNG_COMPRESSION = 9;

const RASTER_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function processFile(src, dst) {
  const ext = path.extname(src).toLowerCase();

  if (!RASTER_EXT.has(ext)) {
    fs.copyFileSync(src, dst);
    return { kind: "copied" };
  }

  // Animated images (multi-page WebP) get copied as-is — re-encoding through
  // sharp's default pipeline would flatten them to the first frame. Need
  // `animated: true` here so sharp actually reports the page count.
  const probe = await sharp(src, { animated: true }).metadata();
  if ((probe.pages ?? 1) > 1) {
    fs.copyFileSync(src, dst);
    return { kind: "copied" };
  }

  let pipeline = sharp(src, { failOnError: false }).rotate(); // honor EXIF
  const meta = await pipeline.metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);
  if (longest > MAX_LONG_EDGE) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_LONG_EDGE : null,
      height: meta.height > meta.width ? MAX_LONG_EDGE : null,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (ext === ".png") {
    await pipeline.png({ compressionLevel: PNG_COMPRESSION }).toFile(dst);
  } else if (ext === ".webp") {
    await pipeline.webp({ quality: JPEG_QUALITY }).toFile(dst);
  } else {
    // .jpg / .jpeg
    await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(dst);
  }
  return { kind: "optimized", srcSize: fs.statSync(src).size, dstSize: fs.statSync(dst).size };
}

function isFresh(src, dst) {
  if (!fs.existsSync(dst)) return false;
  return fs.statSync(dst).mtimeMs >= fs.statSync(src).mtimeMs;
}

async function walk(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      if (SKIP.has(entry) || isDotfile(entry)) continue;
      await walk(path.join(src, entry), path.join(dst, entry));
    }
    return;
  }
  if (isFresh(src, dst)) return;
  try {
    const r = await processFile(src, dst);
    const rel = path.relative(repoRoot, dst).replace(/\\/g, "/");
    if (r.kind === "optimized") {
      const ratio = ((1 - r.dstSize / r.srcSize) * 100).toFixed(0);
      const kb = (r.dstSize / 1024).toFixed(0);
      console.log(`  ${rel} — ${kb} KB (-${ratio}%)`);
    } else {
      console.log(`  ${rel} — copied`);
    }
  } catch (err) {
    console.warn(`[sync-figures] ${path.relative(repoRoot, src)}: ${err.message} — falling back to copy`);
    fs.copyFileSync(src, dst);
  }
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.warn(`[sync-figures] ${SRC} not found — skipping.`);
    return;
  }
  if (!fs.existsSync(DST)) fs.mkdirSync(DST, { recursive: true });
  console.log(`[sync-figures] data/figures/ → public/figures/ (max ${MAX_LONG_EDGE}px, jpeg q${JPEG_QUALITY})`);
  await walk(SRC, DST);
  console.log(`[sync-figures] done.`);
}

main();
