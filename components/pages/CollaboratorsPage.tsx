import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import FloatingBases from "@/components/FloatingBases";
import {
  countryFlagSrc,
  countryIso,
  getCollaborators,
  partitionByScope,
  type Collaborator,
} from "@/lib/collaborators";
import { COMMON } from "@/data/content/common";
import type { Lang } from "@/lib/i18n";
import { asset } from "@/lib/asset";

export default function CollaboratorsPage({ lang }: { lang: Lang }) {
  const dict = COMMON[lang];
  const items = getCollaborators(lang);
  const { national, international } = partitionByScope(items);
  const isEmpty = items.length === 0;

  return (
    <>
      <FloatingBases className="fixed inset-0 z-0 opacity-40" density={0.7} />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {dict.nav.collaborators}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {dict.nav.collaborators}
          </h1>
          <p className="mt-5 max-w-prose leading-relaxed text-muted">
            {dict.collaborators.intro}
          </p>
        </FadeIn>

        {isEmpty && (
          <FadeIn delay={0.05}>
            <div className="mt-16 rounded-lg border border-dashed border-border bg-surface p-10 text-center text-sm text-subtle">
              {dict.collaborators.empty}
            </div>
          </FadeIn>
        )}

        {national.length > 0 && (
          <Section
            heading={dict.collaborators.national_heading}
            items={national}
          />
        )}
        {international.length > 0 && (
          <Section
            heading={dict.collaborators.international_heading}
            items={international}
          />
        )}
      </div>
    </>
  );
}

function Section({
  heading,
  items,
  muted,
}: {
  heading: string;
  items: Collaborator[];
  muted?: boolean;
}) {
  return (
    <FadeIn>
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
          {heading}
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {items.map((c, i) => (
            <CollaboratorCard key={`${c.name}-${i}`} c={c} muted={muted} />
          ))}
        </ul>
      </section>
    </FadeIn>
  );
}

function CollaboratorCard({
  c,
  muted,
}: {
  c: Collaborator;
  muted?: boolean;
}) {
  const display = (
    <article
      className={`group relative flex h-full gap-5 overflow-hidden rounded-lg border border-border bg-surface p-5 transition hover:border-accent ${
        muted ? "opacity-80" : ""
      }`}
    >
      <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
      <div className="relative h-20 w-20 flex-none overflow-hidden rounded-full border border-border bg-elevated">
        {c.photo ? (
          <Image
            src={asset(c.photo)}
            alt={c.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-serif text-lg text-subtle">
            {c.name
              .split(" ")
              .map((s) => s[0])
              .filter(Boolean)
              .slice(0, 2)
              .join("")}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-lg font-semibold leading-snug text-ink">
          {c.title ? `${c.title} ${c.name}` : c.name}
        </h3>
        {c.role && (
          <p className="mt-1 text-sm leading-snug text-muted">{c.role}</p>
        )}
        {c.institution && (
          <p className="mt-1 text-sm leading-snug text-muted">{c.institution}</p>
        )}
        {c.country && (
          <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-widest text-subtle">
            {countryFlagSrc(c.country) && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={asset(countryFlagSrc(c.country))}
                alt={countryIso(c.country)}
                width={18}
                height={12}
                className="h-3 w-[18px] flex-none rounded-[1px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                loading="lazy"
                decoding="async"
              />
            )}
            {c.country}
          </p>
        )}
        {c.project && (
          <p className="mt-3 text-sm leading-relaxed text-accent">{c.project}</p>
        )}
      </div>
    </article>
  );

  return <li>{display}</li>;
}
