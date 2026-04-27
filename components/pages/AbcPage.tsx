import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import NeuralNetwork from "@/components/NeuralNetwork";
import { ABC } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/asset";

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

const FEATURE_PHOTOS = [
  { src: "/figures/CSF_MADDOCKS_E2A1289_A.jpg", alt: "John Maddocks at ABC 2023 (1)" },
  { src: "/figures/CSF_MADDOCKS_E2A1304_A.jpg", alt: "John Maddocks at ABC 2023 (2)" },
];

const SQUARE_PHOTOS = [
  { src: "/figures/20230418_100917.jpg", alt: "ABC 2023 conference moment (1)" },
  { src: "/figures/20230417_134137.jpg", alt: "ABC 2023 conference moment (2)" },
  { src: "/figures/20230419_082154.jpg", alt: "ABC 2023 conference moment (3)" },
];

const SPONSORS = [
  { src: "/figures/ETHzurich_logo.png", alt: "ETH Zürich", href: "https://ethz.ch/" },
  { src: "/figures/SFC_logo.png", alt: "Swiss Federation of Chemists", href: "" },
  { src: "/figures/CECAM_logo.png", alt: "CECAM", href: "https://www.cecam.org/" },
  { src: "/figures/EPFL_logo.png", alt: "EPFL", href: "https://www.epfl.ch/" },
];

const BOA_URL =
  "https://drive.google.com/file/d/1cwKLrWRJpAYltc6Yk-khOLOTVOrOOcGs/view?usp=drive_link";

export default function AbcPage({ lang }: { lang: Lang }) {
  const c = ABC[lang];
  return (
    <>
      <NeuralNetwork className="fixed inset-0 z-0 opacity-50" density={0.8} />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
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
            {c.history_heading}
          </h2>
          <div className="mt-4 max-w-prose space-y-4 leading-relaxed text-muted">
            {c.history_paragraphs_html.map((html, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
            {c.committees_heading}
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <CommitteeList
              title={c.scientific}
              featured={{
                name: "John Maddocks",
                photo: "/figures/JohnMaddocks.jpg",
                affiliation: "EPFL Lausanne CH",
              }}
              people={COMMITTEE_SCIENTIFIC}
            />
            <CommitteeList
              title={c.organizing}
              featured={{
                name: "Pablo D. Dans",
                photo: "/figures/PabloDans.jpg",
                affiliation: "UdelaR Salto UY",
              }}
              people={COMMITTEE_ORGANIZING}
            />
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
            {c.boa_heading}
          </h2>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
            {c.boa_body}
          </p>
          <a
            href={BOA_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline"
          >
            {c.boa_link_label}
          </a>
        </FadeIn>

        <FadeIn>
          <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
            {c.pictures_heading}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {FEATURE_PHOTOS.map((p) => (
              <div
                key={p.src}
                className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-elevated"
              >
                <Image
                  src={asset(p.src)}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {SQUARE_PHOTOS.map((p) => (
              <div
                key={p.src}
                className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-elevated"
              >
                <Image
                  src={asset(p.src)}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
            {c.sponsors_heading}
          </h2>
          <div className="sponsors mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {SPONSORS.map((s) => {
              const logo = (
                <Image
                  src={asset(s.src)}
                  alt={s.alt}
                  width={220}
                  height={80}
                  className="sponsor-logo h-14 w-auto object-contain md:h-16"
                />
              );
              return s.href ? (
                <a
                  key={s.src}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block transition hover:opacity-80"
                  aria-label={s.alt}
                >
                  {logo}
                </a>
              ) : (
                <div key={s.src} aria-label={s.alt}>
                  {logo}
                </div>
              );
            })}
          </div>
          <style>{`
            :root[data-theme="dark"] .sponsors .sponsor-logo {
              filter: invert(1) hue-rotate(180deg);
            }
          `}</style>
        </FadeIn>
      </div>
    </>
  );
}

type Featured = {
  name: string;
  photo: string;
  affiliation: string;
};

function CommitteeList({
  title,
  featured,
  people,
}: {
  title: string;
  featured: Featured;
  people: [string, string][];
}) {
  const rest = people.filter(([n]) => n !== featured.name);
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h3 className="font-serif text-lg font-semibold text-ink">{title}</h3>

      <div className="mt-5 flex flex-col items-center gap-2 border-b border-border pb-5">
        <div className="relative h-24 w-24 flex-none overflow-hidden rounded-full border border-border bg-elevated">
          <Image
            src={asset(featured.photo)}
            alt={featured.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <p className="mt-1 font-serif text-base font-semibold text-ink">
          {featured.name}
        </p>
        <p className="text-xs uppercase tracking-widest text-subtle">
          {featured.affiliation}
        </p>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-muted">
        {rest.map(([name, country]) => (
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
