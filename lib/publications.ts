import data from "@/data/publications.json";

export type Publication = {
  year: number;
  authors: string;
  title: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pdf?: string;
  note?: string;
};

export function getPublications(): Publication[] {
  return [...(data as Publication[])].sort((a, b) => b.year - a.year);
}

export function groupByYear(pubs: Publication[]): [number, Publication[]][] {
  const map = new Map<number, Publication[]>();
  for (const p of pubs) {
    if (!map.has(p.year)) map.set(p.year, []);
    map.get(p.year)!.push(p);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

export type NumberedPublication = Publication & { index: number };

/**
 * Like groupByYear, but each publication carries an `index` numbered
 * consecutively across the entire list. #1 is the oldest publication,
 * #N is the newest. Display order is unchanged (newest year first; within
 * a year, JSON order — typically newest-first too), so a year section
 * shows decreasing index numbers as you scroll down inside it.
 */
export function getNumberedGroups(): [number, NumberedPublication[]][] {
  const all = getPublications();
  const total = all.length;
  const numbered: NumberedPublication[] = all.map((p, i) => ({
    ...p,
    index: total - i,
  }));
  const map = new Map<number, NumberedPublication[]>();
  for (const p of numbered) {
    if (!map.has(p.year)) map.set(p.year, []);
    map.get(p.year)!.push(p);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

export function formatVenue(p: Publication): string {
  const parts: string[] = [];
  if (p.journal) parts.push(p.journal);
  const vip: string[] = [];
  if (p.volume) vip.push(p.volume);
  if (p.issue) vip.push(`(${p.issue})`);
  if (vip.length) parts.push(vip.join(""));
  if (p.pages) parts.push(p.pages);
  return parts.filter(Boolean).join(", ");
}
