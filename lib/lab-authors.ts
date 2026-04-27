import membersEn from "@/data/members.en.json";
import pastEn from "@/data/past_members.en.json";

/**
 * Build a fuzzy lookup that says whether an author name in a publication
 * corresponds to a current or past lab member. The match is tolerant of
 * accents, dots, middle initials, and word ordering: "Pablo D. Dans" and
 * "Pablo Dans" and "P D Dans" all hash to the same key as the member
 * record "Pablo D. Dans".
 *
 * Key = first letter of the first token + "_" + last token, both
 * lowercased and accent-stripped. So:
 *   "Germán Traglia"      → g_traglia
 *   "Germán M Traglia"    → g_traglia
 *   "G M Traglia"         → g_traglia
 *   "Gabriela da Rosa"    → g_rosa
 *   "Pablo D. Dans"       → p_dans
 *
 * Edge: single-token names ("et al.", "others") don't get a key and
 * are never matched.
 */

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining accents
    .toLowerCase()
    .replace(/[.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function authorKey(name: string): string | null {
  const norm = normalize(name);
  if (!norm) return null;
  const tokens = norm.split(/\s+/).filter((t) => t.length > 0);
  if (tokens.length < 2) return null;
  // Skip well-known boilerplate
  if (tokens[0] === "et" && tokens[1].startsWith("al")) return null;
  const firstInitial = tokens[0][0];
  const lastToken = tokens[tokens.length - 1];
  if (!firstInitial || !lastToken) return null;
  return `${firstInitial}_${lastToken}`;
}

type Named = { name: string };

const LAB_KEYS: Set<string> = new Set(
  [...(membersEn as Named[]), ...(pastEn as Named[])]
    .map((m) => authorKey(m.name))
    .filter((k): k is string => k !== null)
);

export function isLabAuthor(name: string): boolean {
  const k = authorKey(name);
  return k != null && LAB_KEYS.has(k);
}

/**
 * Split an author list as it appears in publications.json (comma-separated
 * with single space) into individual author tokens, preserving boilerplate
 * like "et al." as its own segment.
 */
export function splitAuthors(authorList: string): string[] {
  return authorList
    .split(/,\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
