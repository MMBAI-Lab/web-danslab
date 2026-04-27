import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import type { Lang } from "@/lib/i18n";

export type ResearchProject = {
  title: string;
  kind: string;
  duration: string;
  role: string;
  scope: string;
  summary: string;
  url?: string;
};

function loadCsv(file: string): ResearchProject[] {
  const filePath = path.join(process.cwd(), "data", "research", file);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = Papa.parse<ResearchProject>(raw, {
    header: true,
    skipEmptyLines: "greedy",
    transform: (v) => (typeof v === "string" ? v.trim() : v),
  });
  return (parsed.data || []).filter((row) => row.title && row.title.length > 0);
}

export function getResearchProjects(lang: Lang): ResearchProject[] {
  return loadCsv(`projects.${lang}.csv`);
}
