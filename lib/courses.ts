import type { Lang } from "@/lib/i18n";
import en from "@/data/courses.en.json";
import es from "@/data/courses.es.json";
import coEn from "@/data/courses_coorganized.en.json";
import coEs from "@/data/courses_coorganized.es.json";

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

// Courses co-organized by DansLab (promoted at the top of /courses) -----

export type CoorganizedCourse = {
  title: string;
  kind: string;
  dates: string;
  location: string;
  organizers: string;
  summary: string;
  url: string;
};

const CO: Record<Lang, CoorganizedCourse[]> = {
  en: coEn as CoorganizedCourse[],
  es: coEs as CoorganizedCourse[],
};

export function getCoorganizedCourses(lang: Lang): CoorganizedCourse[] {
  return CO[lang];
}
