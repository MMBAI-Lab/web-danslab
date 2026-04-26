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

export function getCurrentMembers(): Member[] {
  const members = loadCsv("members.csv");
  // PI (Pablo D. Dans) first, rest alphabetical by last name.
  return members.sort((a, b) => {
    if (/Pablo\s+D\.?\s+Dans/i.test(a.name)) return -1;
    if (/Pablo\s+D\.?\s+Dans/i.test(b.name)) return 1;
    const lastA = a.name.split(/\s+/).pop() ?? "";
    const lastB = b.name.split(/\s+/).pop() ?? "";
    return lastA.localeCompare(lastB);
  });
}

export function getPastMembers(): Member[] {
  return loadCsv("past_members.csv").sort((a, b) =>
    (a.name.split(/\s+/).pop() ?? "").localeCompare(
      b.name.split(/\s+/).pop() ?? ""
    )
  );
}
