#!/usr/bin/env node
/**
 * For every entry in data/publications.json without a `doi`, query the
 * CrossRef REST API by title + year and accept the top match if the
 * returned title is very similar (>0.7 word overlap) and the year is
 * within ±1. Writes the doi back into publications.json.
 *
 * Polite-use: 200 ms between requests, ~30 minutes per 100 papers worst
 * case (most are <1s). Idempotent — running again only fetches the ones
 * still missing.
 *
 *   node scripts/fetch-missing-dois.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as wait } from "node:timers/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const PUBS = path.join(repoRoot, "data", "publications.json");

const UA =
  "danslab-website/1.0 (https://github.com/pablodans/web-danslab; mailto:pdans@pasteur.edu.uy)";

function normTitle(s) {
  return (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(s) {
  return new Set(
    normTitle(s)
      .split(" ")
      .filter((t) => t && t.length > 2)
  );
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

function firstSurname(authors) {
  if (!authors) return "";
  const first = authors.split(",")[0].trim();
  const tokens = first.split(/\s+/);
  return (tokens[tokens.length - 1] || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

async function crossref(title, year, surname) {
  const params = new URLSearchParams({
    "query.title": title,
    "query.author": surname,
    rows: "5",
    select: "DOI,title,issued,author",
  });
  const url = `https://api.crossref.org/works?${params}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data?.message?.items ?? [];
}

function bestMatch(items, title, year) {
  const tgtTokens = tokenSet(title);
  const candidates = items
    .map((it) => {
      const cand = (it.title?.[0] || "");
      const sim = jaccard(tgtTokens, tokenSet(cand));
      const issued = it.issued?.["date-parts"]?.[0]?.[0];
      return { doi: it.DOI, title: cand, year: issued, sim };
    })
    .filter((c) => c.doi)
    .sort((a, b) => b.sim - a.sim);
  if (candidates.length === 0) return null;
  const top = candidates[0];
  // accept if similarity >= 0.7 AND year within ±1 (or unknown year)
  if (top.sim < 0.7) return null;
  if (top.year && Math.abs(top.year - year) > 1) return null;
  return top;
}

const pubs = JSON.parse(fs.readFileSync(PUBS, "utf8"));
const targets = pubs
  .map((p, i) => ({ p, i }))
  .filter(({ p }) => !p.doi && p.title);

console.log(`[fetch-missing-dois] ${targets.length} entries to look up`);

let added = 0;
let skipped = 0;
const lowConf = [];

for (let n = 0; n < targets.length; n++) {
  const { p, i } = targets[n];
  const surname = firstSurname(p.authors);
  try {
    const items = await crossref(p.title, p.year, surname);
    const match = bestMatch(items, p.title, p.year);
    if (match) {
      pubs[i].doi = match.doi;
      added++;
      console.log(
        `  + #${i + 1} (${p.year}) ${surname} sim=${match.sim.toFixed(2)} -> ${match.doi}`
      );
    } else {
      skipped++;
      lowConf.push({
        idx: i,
        year: p.year,
        surname,
        title: p.title.slice(0, 70),
        topItems: items
          .slice(0, 3)
          .map((it) => `[${it.issued?.["date-parts"]?.[0]?.[0]}] ${it.DOI} ${(it.title?.[0] || "").slice(0, 60)}`),
      });
    }
  } catch (err) {
    skipped++;
    console.warn(`  ! #${i + 1} (${p.year}) ${surname} — ${err.message}`);
  }
  await wait(200);
  if ((n + 1) % 25 === 0) {
    console.log(`[fetch-missing-dois] progress ${n + 1}/${targets.length}`);
    fs.writeFileSync(PUBS, JSON.stringify(pubs, null, 2) + "\n");
  }
}

fs.writeFileSync(PUBS, JSON.stringify(pubs, null, 2) + "\n");

console.log(
  `[fetch-missing-dois] added ${added}, skipped ${skipped} (no confident match)`
);
if (lowConf.length) {
  console.log("---- skipped, top CrossRef candidates ----");
  for (const x of lowConf) {
    console.log(`#${x.idx + 1} (${x.year}) ${x.surname}: ${x.title}`);
    for (const t of x.topItems) console.log(`     ${t}`);
  }
}
