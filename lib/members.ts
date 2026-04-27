import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type Member = {
  title: string;
  name: string;
  role1: string;
  institution1: string;
  role2: string;
  institution2: string;
  email: string;
  scholar: string;
  photo: string;
  comment: string;
};

// Display order for current members. Anyone not in this list goes to the
// end, sorted alphabetically by last name.
const CURRENT_ORDER: string[] = [
  "Pablo D. Dans",
  "Germán Traglia",
  "Leandro Grille",
  "Victor Miguel Garcia Velasquez",
  "Rafael Sauto",
  "Gabriela da Rosa",
  "Gonzalo Lopez",
  "Denisse Mavis Sánchez",
  "Mage Teliz",
  "Santiago Pintos",
  "Paulina Boiani",
  "Sofía Almirón",
];

function loadCsv(file: string): Member[] {
  const filePath = path.join(process.cwd(), "members", file);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = Papa.parse<Member>(raw, {
    header: true,
    skipEmptyLines: "greedy",
    transform: (v) => (typeof v === "string" ? v.trim() : v),
  });
  return (parsed.data || []).filter((row) => row.name && row.name.length > 0);
}

function rankByName(name: string, order: string[]): number {
  const idx = order.indexOf(name);
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}

function lastName(name: string): string {
  return name.split(/\s+/).pop() ?? "";
}

export function getCurrentMembers(): Member[] {
  return loadCsv("members.csv").sort((a, b) => {
    const ra = rankByName(a.name, CURRENT_ORDER);
    const rb = rankByName(b.name, CURRENT_ORDER);
    if (ra !== rb) return ra - rb;
    // Both unknown to the explicit list → alphabetical by last name.
    return lastName(a.name).localeCompare(lastName(b.name));
  });
}

export function getPastMembers(): Member[] {
  return loadCsv("past_members.csv").sort((a, b) =>
    lastName(a.name).localeCompare(lastName(b.name))
  );
}
