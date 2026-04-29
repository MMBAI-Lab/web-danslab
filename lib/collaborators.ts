import type { Lang } from "@/lib/i18n";
import en from "@/data/collaborators.en.json";
import es from "@/data/collaborators.es.json";

export type CollaboratorStatus = "ongoing" | "past";

export type Collaborator = {
  title: string;        // "Dr.", "Dra.", "Prof.", or empty
  name: string;
  role: string;         // position / cargo
  institution: string;
  country: string;
  project: string;      // optional collaboration topic
  status: CollaboratorStatus;
  photo: string;        // path under /figures/... or empty
};

type RawCollaborator = Omit<Collaborator, "status"> & { status: string };

const RAW: Record<Lang, RawCollaborator[]> = {
  en: en as RawCollaborator[],
  es: es as RawCollaborator[],
};

function normalize(items: RawCollaborator[]): Collaborator[] {
  return items
    .filter((c) => c.name && c.name.length > 0)
    .map((c) => ({
      title: c.title ?? "",
      name: c.name,
      role: c.role ?? "",
      institution: c.institution ?? "",
      country: c.country ?? "",
      project: c.project ?? "",
      status: (c.status === "past" ? "past" : "ongoing") as CollaboratorStatus,
      photo: c.photo ?? "",
    }));
}

export function getCollaborators(lang: Lang): Collaborator[] {
  return normalize(RAW[lang]);
}

export function partitionByStatus(items: Collaborator[]): {
  ongoing: Collaborator[];
  past: Collaborator[];
} {
  return {
    ongoing: items.filter((c) => c.status === "ongoing"),
    past: items.filter((c) => c.status === "past"),
  };
}
