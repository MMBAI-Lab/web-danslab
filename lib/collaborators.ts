import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import type { Lang } from "@/lib/i18n";

export type CollaboratorStatus = "ongoing" | "past";

export type Collaborator = {
  title: string;
  name: string;
  institution: string;
  project: string;
  status: CollaboratorStatus;
  url: string;
};

function loadCsv(file: string): Collaborator[] {
  const filePath = path.join(process.cwd(), "data", "collaborators", file);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = Papa.parse<Record<string, string>>(raw, {
    header: true,
    skipEmptyLines: "greedy",
    transform: (v) => (typeof v === "string" ? v.trim() : v),
  });
  return (parsed.data || [])
    .filter((row) => row.name && row.name.length > 0)
    .map((row) => ({
      title: row.title ?? "",
      name: row.name ?? "",
      institution: row.institution ?? "",
      project: row.project ?? "",
      status: (row.status === "past" ? "past" : "ongoing") as CollaboratorStatus,
      url: row.url ?? "",
    }));
}

export function getCollaborators(lang: Lang): Collaborator[] {
  return loadCsv(`collaborators.${lang}.csv`);
}

export function partitionByStatus(items: Collaborator[]): {
  ongoing: Collaborator[];
  past: Collaborator[];
} {
  return {
    ongoing: items.filter((c) => c.status === "ongoing"),
    past: items.filter((c) => c.status === "past"),
  };
}
