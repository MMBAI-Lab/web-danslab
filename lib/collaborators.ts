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

// National vs international is derived from country: anyone whose
// country field is "Uruguay" is grouped as national, everyone else
// (and entries with no country set) lands in international.
export function partitionByScope(items: Collaborator[]): {
  national: Collaborator[];
  international: Collaborator[];
} {
  return {
    national: items.filter((c) => c.country === "Uruguay"),
    international: items.filter((c) => c.country && c.country !== "Uruguay"),
  };
}

// Map of country names (EN + ES) → ISO 3166-1 alpha-2 codes for the
// countries currently in the collaborators list. Add to this when a new
// country shows up.
const COUNTRY_TO_ISO: Record<string, string> = {
  Uruguay: "UY",
  Spain: "ES",
  España: "ES",
  France: "FR",
  Francia: "FR",
  "United Kingdom": "GB",
  "Reino Unido": "GB",
  "United States": "US",
  "Estados Unidos": "US",
  Colombia: "CO",
  Argentina: "AR",
  Peru: "PE",
  Perú: "PE",
};

/** SVG flag path for a country name (EN or ES). Returns "" if unknown.
 *  We use SVGs in public/flags/ instead of emoji because Windows does
 *  not ship flag glyphs in Segoe UI Emoji — flag emojis there fall back
 *  to the bare ISO code. */
export function countryFlagSrc(country: string): string {
  const iso = COUNTRY_TO_ISO[country];
  if (!iso) return "";
  return `/flags/${iso.toLowerCase()}.svg`;
}

/** ISO code for the country (used as alt text for the flag image). */
export function countryIso(country: string): string {
  return COUNTRY_TO_ISO[country] ?? "";
}
