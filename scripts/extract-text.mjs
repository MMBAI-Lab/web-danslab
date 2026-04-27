#!/usr/bin/env node
// One-off helper: dump readable text from saved Google Sites HTML.
import fs from "node:fs";
import path from "node:path";

const files = process.argv.slice(2);
for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const text = raw
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/(p|div|h[1-6]|li|br|tr|td|section)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  console.log(`========== ${path.basename(file)} ==========`);
  console.log(text);
  console.log();
}
