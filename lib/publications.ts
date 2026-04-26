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
