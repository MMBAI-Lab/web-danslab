import type { Lang } from "@/lib/i18n";
import en from "@/data/research.en.json";
import es from "@/data/research.es.json";

export type ResearchProject = {
  title: string;
  kind: string;
  duration: string;
  role: string;
  scope: string;
  summary: string;
  url?: string;
};

const PROJECTS: Record<Lang, ResearchProject[]> = {
  en: en as ResearchProject[],
  es: es as ResearchProject[],
};

export function getResearchProjects(lang: Lang): ResearchProject[] {
  return PROJECTS[lang];
}
