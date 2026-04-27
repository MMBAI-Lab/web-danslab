import type { Lang } from "@/lib/i18n";
import en from "@/data/courses.en.json";
import es from "@/data/courses.es.json";

export type CourseStatus = "ongoing" | "past";

export type Course = {
  title: string;
  kind: string;
  institution: string;
  country: string;
  years: string;
  role: string;
  summary: string;
  lead?: string;
  status: CourseStatus;
  url?: string;
};

type RawCourse = Omit<Course, "status"> & { status: string };

const RAW: Record<Lang, RawCourse[]> = {
  en: en as RawCourse[],
  es: es as RawCourse[],
};

function normalize(items: RawCourse[]): Course[] {
  return items
    .filter((c) => c.title && c.title.length > 0)
    .map((c) => ({
      title: c.title,
      kind: c.kind ?? "",
      institution: c.institution ?? "",
      country: c.country ?? "",
      years: c.years ?? "",
      role: c.role ?? "",
      summary: c.summary ?? "",
      lead: c.lead,
      status: (c.status === "past" ? "past" : "ongoing") as CourseStatus,
      url: c.url,
    }));
}

export function getCourses(lang: Lang): Course[] {
  return normalize(RAW[lang]);
}

export function partitionByStatus(items: Course[]): {
  ongoing: Course[];
  past: Course[];
} {
  return {
    ongoing: items.filter((c) => c.status === "ongoing"),
    past: items.filter((c) => c.status === "past"),
  };
}
