#!/usr/bin/env node
/**
 * Rewrite every author token in data/publications.json that resolves to
 * Pablo Dans or Germán Traglia (any spelling, with or without middle
 * initial / accents) into the canonical forms requested for the site:
 *
 *   p_dans     → "Pablo D. Dans"
 *   g_traglia  → "German M. Traglia"
 *
 * Idempotent: re-running on already-canonicalised data is a no-op.
 *
 *   node scripts/canonicalize-authors.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBS = path.join(__dirname, "..", "data", "publications.json");

const CANON = {
  p_dans: "Pablo D. Dans",
  g_traglia: "German M. Traglia",
};

function normalize(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function authorKey(name) {
  const norm = normalize(name);
  const tokens = norm.split(/\s+/).filter(Boolean);
  if (tokens.length < 2) return null;
  return `${tokens[0][0]}_${tokens[tokens.length - 1]}`;
}

const pubs = JSON.parse(fs.readFileSync(PUBS, "utf8"));
let changed = 0;
for (const p of pubs) {
  if (!p.authors) continue;
  const parts = p.authors
    .split(/,\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const out = parts.map((a) => {
    const k = authorKey(a);
    if (k && CANON[k] && a !== CANON[k]) {
      changed++;
      return CANON[k];
    }
    return a;
  });
  p.authors = out.join(", ");
}
fs.writeFileSync(PUBS, JSON.stringify(pubs, null, 2) + "\n");
console.log(`[canonicalize-authors] rewrote ${changed} tokens`);
