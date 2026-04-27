import Link from "next/link";
import Gallery from "@/components/Gallery";
import FadeIn from "@/components/FadeIn";
import { listGalleryImages } from "@/lib/gallery";
import { ABC } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";

const COMMITTEE_SCIENTIFIC: [string, string][] = [
  ["John Maddocks", "CH"],
  ["Wilma Olson", "US"],
  ["Sarah Harris", "UK"],
  ["Modesto Orozco", "SP"],
  ["Tom Cheatham", "US"],
  ["Lois Pollack", "US"],
  ["Charles Laughton", "UK"],
];

const COMMITTEE_ORGANIZING: [string, string][] = [
  ["Pablo D. Dans", "UY"],
  ["Agnes Noy", "UK"],
  ["Alberto Pérez", "US"],
  ["Daiva Petkeviciute", "LT"],
  ["Rodrigo Galindo-Murillo", "US"],
  ["Marco Pasi", "FR"],
  ["Rosana Collepardo", "UK"],
  ["Federica Battistini", "SP"],
];

const POSTER_WINNERS = [
  {
    title:
      "Role of Acidic Amino Acid Residues in Sequence-specific DNA-protein Interactions",
    author: "Kazi Amirul Hossain",
    affiliation: "Gdańsk University of Technology",
  },
  {
    title: "DNA damage competes with sequence to pin a plectoneme",
    author: "Victoria E. Hill",
    affiliation: "Department of Chemistry, The University of Sheffield",
  },
  {
    title: "Mechanistic properties of DNA govern nucleosome unwrapping",
    author: "Maria Julia Maristany",
    affiliation: "Department of Physics, University of Cambridge",
  },
];

export default function AbcPage({ lang }: { lang: Lang }) {
  const c = ABC[lang];
  const images = listGalleryImages("outreach/abc-2023");
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <Link
          href={localizePath(lang, "/outreach")}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-subtle hover:text-accent"
        >
          {c.back}
        </Link>
        <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {c.title}
        </h1>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.25em] text-accent">
          {c.eyebrow}
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-10 max-w-prose space-y-5 leading-relaxed text-muted">
          {c.intro_paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <ul className="mt-6 grid gap-2 text-sm text-muted md:grid-cols-2">
          {c.topics.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.committees_heading}
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <CommitteeList title={c.scientific} people={COMMITTEE_SCIENTIFIC} />
          <CommitteeList title={c.organizing} people={COMMITTEE_ORGANIZING} />
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.winners_heading}
        </h2>
        <ul className="mt-6 divide-y divide-border">
          {POSTER_WINNERS.map((w, i) => (
            <li key={i} className="py-5">
              <p className="font-serif text-base font-semibold leading-snug text-ink">
                {w.title}
              </p>
              <p className="mt-1 text-sm text-muted">{w.author}</p>
              <p className="text-sm italic text-subtle">{w.affiliation}</p>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.pictures_heading}
        </h2>
        <div className="mt-6">
          <Gallery images={images} alt="ABC 2023 conference photo" />
        </div>
      </FadeIn>
    </div>
  );
}

function CommitteeList({
  title,
  people,
}: {
  title: string;
  people: [string, string][];
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h3 className="font-serif text-lg font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-muted">
        {people.map(([name, country]) => (
          <li key={name} className="flex items-center justify-between">
            <span>{name}</span>
            <span className="text-xs uppercase tracking-widest text-subtle">
              {country}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
