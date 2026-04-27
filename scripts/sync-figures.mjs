#!/usr/bin/env node
/**
 * Mirror data/figures/ -> public/figures/ before each Next.js build/dev.
 * data/figures/ is the canonical, edited-by-hand folder for site figures
 * (logos, member photos, project illustrations, gallery photos).
 * public/figures/ is auto-generated and gitignored.
 *
 * Skipped: README.md, .gitkeep, dotfiles.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const SRC = path.join(repoRoot, "data", "figures");
const DST = path.join(repoRoot, "public", "figures");

const SKIP = new Set(["README.md", ".gitkeep"]);
const isDotfile = (name) => name.startsWith(".");

function rmrf(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function copyTree(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      if (SKIP.has(entry) || isDotfile(entry)) continue;
      copyTree(path.join(src, entry), path.join(dst, entry));
    }
    return;
  }
  fs.copyFileSync(src, dst);
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.warn(`[sync-figures] data/figures/ not found at ${SRC} — skipping.`);
    return;
  }
  rmrf(DST);
  copyTree(SRC, DST);
  console.log(`[sync-figures] data/figures/ → public/figures/ ✓`);
}

main();
