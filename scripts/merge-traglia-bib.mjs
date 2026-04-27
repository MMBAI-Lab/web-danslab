#!/usr/bin/env node
/**
 * One-off helper: parse the BibTeX file with Germán Traglia's publications,
 * convert each entry into the publications.json shape, and merge with the
 * existing file. Within a year, Traglia's papers come AFTER the ones already
 * in publications.json (interleaved by year, not strict by date).
 *
 * Skips entries that look like preprint duplicates of papers already in the
 * .bib (no journal field + has a sibling with the same title in a real venue).
 *
 * Usage:
 *   node scripts/merge-traglia-bib.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const SRC_BIB = path.join(
  repoRoot,
  "data",
  "danslab-googlesite",
  "GS_Traglia.bib"
);
const PUBS = path.join(repoRoot, "data", "publications.json");

// --- LaTeX → unicode -----------------------------------------------------
function unlatex(s) {
  if (!s) return "";
  return (
    s
      // braces around accented chars: {\'a} → á, {\~n} → ñ, etc.
      .replace(/\{\\'\\?([aeiouAEIOU])\}/g, (_, c) =>
        ({ a: "á", e: "é", i: "í", o: "ó", u: "ú", A: "Á", E: "É", I: "Í", O: "Ó", U: "Ú" }[c])
      )
      .replace(/\{\\'\\?\\?i\}/g, "í")
      .replace(/\\'\\?i/g, "í")
      .replace(/\{\\~([a-zA-Z])\}/g, (_, c) => (c === "n" ? "ñ" : c === "N" ? "Ñ" : c))
      .replace(/\{\\"([a-zA-Z])\}/g, (_, c) =>
        ({ a: "ä", e: "ë", i: "ï", o: "ö", u: "ü", A: "Ä", O: "Ö", U: "Ü" }[c] ?? c)
      )
      .replace(/\{\\\^([a-zA-Z])\}/g, (_, c) => c)
      .replace(/\{\\ss\}/g, "ß")
      .replace(/\\&/g, "&")
      .replace(/\$\\(?:beta|Beta)\$/g, "β")
      .replace(/\$\\(?:alpha|Alpha)\$/g, "α")
      .replace(/\\\\/g, " ")
      .replace(/[{}]/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

// --- bibtex parser (very small, sufficient for this file) ---------------
function parseBib(text) {
  const entries = [];
  const re = /@(\w+)\s*\{\s*([^,]+)\s*,\s*([\s\S]*?)\n\}\s*/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const [, type, key, body] = m;
    const fields = {};
    // walk fields: key = {value} or key = "value"
    const fre = /(\w+)\s*=\s*(\{(?:[^{}]|\{[^{}]*\})*\}|"[^"]*"|\d+)\s*,?/g;
    let f;
    while ((f = fre.exec(body)) !== null) {
      let v = f[2];
      if (v.startsWith("{") && v.endsWith("}")) v = v.slice(1, -1);
      else if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      fields[f[1].toLowerCase()] = v;
    }
    entries.push({ type: type.toLowerCase(), key: key.trim(), fields });
  }
  return entries;
}

// --- bib author list "Last, First and Last2, First2" → "First Last, First2 Last2"
function fmtAuthors(raw) {
  if (!raw) return "";
  let trailingEtAl = false;
  let chunks = raw.split(/\s+and\s+/i);
  if (chunks[chunks.length - 1].trim().toLowerCase() === "others") {
    chunks = chunks.slice(0, -1);
    trailingEtAl = true;
  }
  const list = chunks
    .map((a) => {
      const parts = a.split(",").map((p) => p.trim());
      if (parts.length >= 2) return unlatex(`${parts[1]} ${parts[0]}`);
      return unlatex(a);
    })
    .join(", ");
  return trailingEtAl ? `${list}, et al.` : list;
}

// --- Apply skip/duplicate rules from a quick review of the source file --
const SKIP_KEYS = new Set([
  // preprint / abstract / SSRN / poster duplicates of fully published items:
  "kalbfleisch2024rt2t", // RT2T preprint, kept the published "ruminant" Nature Genetics one
  "mezcord2023characterization", // Preprints version of mezcord2023induced
  "luu2025comprehensive", // preprint of luu2025spontaneous
  "luu2026p", // poster abstract
  "moheb6571421nutrient", // SSRN preprint
  "montalvo2025identification", // 1-page abstract; full paper is montalvo2025identificacion
  // Google Scholar artifact: re-export of ramirez2014plasmid as a 2020 book
  // chapter with a shuffled, corrupted title; same paper.
  "ramirez2020plasmid",
]);

// quinn2018human appears twice in the .bib (lines 338 and 552) — same paper.
// Keep the first one only.
let seenQuinn = false;

function bibToPublication(entry) {
  if (SKIP_KEYS.has(entry.key)) return null;
  if (entry.key === "quinn2018human") {
    if (seenQuinn) return null;
    seenQuinn = true;
  }
  // entries without a year don't render usefully
  if (!entry.fields.year) return null;

  const yr = parseInt(unlatex(entry.fields.year), 10);
  if (!Number.isFinite(yr)) return null;

  const out = {
    year: yr,
    authors: fmtAuthors(entry.fields.author),
    title: unlatex(entry.fields.title),
  };

  const journal = unlatex(entry.fields.journal || entry.fields.booktitle || "");
  if (journal) out.journal = journal;

  const volume = unlatex(entry.fields.volume || "");
  if (volume) out.volume = volume;

  const issue = unlatex(entry.fields.number || "");
  if (issue) out.issue = issue;

  const pages = unlatex(entry.fields.pages || "");
  if (pages) out.pages = pages.replace(/--/g, "–");

  const doi = unlatex(entry.fields.doi || "");
  if (doi) out.doi = doi;

  return out;
}

// --- Load + transform ----------------------------------------------------
const bibText = fs.readFileSync(SRC_BIB, "utf8");
const bibEntries = parseBib(bibText);
const traglia = bibEntries.map(bibToPublication).filter(Boolean);

console.log(`[merge-traglia] parsed ${traglia.length} keepable entries`);

const existing = JSON.parse(fs.readFileSync(PUBS, "utf8"));

// Group existing by year (preserves relative order within a year)
const byYear = new Map();
const yearsInOrder = [];
for (const p of existing) {
  if (!byYear.has(p.year)) {
    byYear.set(p.year, []);
    yearsInOrder.push(p.year);
  }
  byYear.get(p.year).push(p);
}

// Append Traglia entries to the matching year (creating year buckets if new)
for (const t of traglia) {
  if (!byYear.has(t.year)) {
    byYear.set(t.year, []);
    yearsInOrder.push(t.year);
  }
  byYear.get(t.year).push(t);
}

// Final list: sort years descending (newest first), keep within-year order
const allYears = Array.from(byYear.keys()).sort((a, b) => b - a);
const merged = [];
for (const y of allYears) merged.push(...byYear.get(y));

fs.writeFileSync(PUBS, JSON.stringify(merged, null, 2) + "\n");
console.log(
  `[merge-traglia] wrote ${merged.length} entries to ${path.relative(
    repoRoot,
    PUBS
  )}`
);
