import type { Lang } from "@/lib/i18n";
import currentEn from "@/data/members.en.json";
import currentEs from "@/data/members.es.json";
import pastEn from "@/data/past_members.en.json";
import pastEs from "@/data/past_members.es.json";

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
  "Gabriela da Rosa",
  "Gonzalo Lopez",
  "Denisse Mavis Sánchez",
  "Rafael Sauto",
  "Mage Teliz",
  "Santiago Pintos",
  "Paulina Boiani",
  "Sofía Almirón",
  "Gastón Leal",
];

function rankByName(name: string, order: string[]): number {
  const idx = order.indexOf(name);
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}

function lastName(name: string): string {
  return name.split(/\s+/).pop() ?? "";
}

const CURRENT: Record<Lang, Member[]> = {
  en: currentEn as Member[],
  es: currentEs as Member[],
};

const PAST: Record<Lang, Member[]> = {
  en: pastEn as Member[],
  es: pastEs as Member[],
};

export function getCurrentMembers(lang: Lang = "en"): Member[] {
  return [...CURRENT[lang]].sort((a, b) => {
    const ra = rankByName(a.name, CURRENT_ORDER);
    const rb = rankByName(b.name, CURRENT_ORDER);
    if (ra !== rb) return ra - rb;
    return lastName(a.name).localeCompare(lastName(b.name));
  });
}

export function getPastMembers(lang: Lang = "en"): Member[] {
  return [...PAST[lang]].sort((a, b) =>
    lastName(a.name).localeCompare(lastName(b.name))
  );
}
