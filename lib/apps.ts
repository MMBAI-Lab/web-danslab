import type { Lang } from "@/lib/i18n";
import en from "@/data/apps.en.json";
import es from "@/data/apps.es.json";

// Each app lives in its own GitHub repo. `url` is where the deployed app is
// served (e.g. its GitHub Pages URL) and `repo` is the source repository.
// Leave either empty until it exists — the UI shows a "coming soon" state.
// `embed: true` loads `url` inside an iframe at /apps/<slug>/; set it to
// false if the host forbids framing, and the page will link out instead.
export type LabApp = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  repo: string;
  url: string;
  embed: boolean;
};

const RAW: Record<Lang, LabApp[]> = {
  en: en as LabApp[],
  es: es as LabApp[],
};

export function getApps(lang: Lang): LabApp[] {
  return RAW[lang];
}

export function getApp(lang: Lang, slug: string): LabApp | undefined {
  return RAW[lang].find((a) => a.slug === slug);
}

export function getAppSlugs(): string[] {
  return RAW.en.map((a) => a.slug);
}
