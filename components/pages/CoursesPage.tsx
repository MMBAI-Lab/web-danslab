import FadeIn from "@/components/FadeIn";
import FloatingBases from "@/components/FloatingBases";
import { COMMON } from "@/data/content/common";
import { getCourses, partitionByStatus, type Course } from "@/lib/courses";
import type { Lang } from "@/lib/i18n";

export default function CoursesPage({ lang }: { lang: Lang }) {
  const dict = COMMON[lang];
  const items = getCourses(lang);
  const { ongoing, past } = partitionByStatus(items);
  const isEmpty = items.length === 0;

  return (
    <>
      <FloatingBases className="fixed inset-0 z-0 opacity-40" density={0.7} />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {dict.nav.courses}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {dict.nav.courses}
          </h1>
          <p className="mt-5 max-w-prose leading-relaxed text-muted">
            {dict.courses.intro}
          </p>
        </FadeIn>

        {isEmpty && (
          <FadeIn delay={0.05}>
            <div className="mt-16 rounded-lg border border-dashed border-border bg-surface p-10 text-center text-sm text-subtle">
              {dict.courses.empty}
            </div>
          </FadeIn>
        )}

        {ongoing.length > 0 && (
          <Section
            heading={dict.courses.ongoing_heading}
            items={ongoing}
            roleLabel={dict.courses.role_label}
          />
        )}
        {past.length > 0 && (
          <Section
            heading={dict.courses.past_heading}
            items={past}
            roleLabel={dict.courses.role_label}
            muted
          />
        )}
      </div>
    </>
  );
}

function Section({
  heading,
  items,
  roleLabel,
  muted,
}: {
  heading: string;
  items: Course[];
  roleLabel: string;
  muted?: boolean;
}) {
  return (
    <FadeIn>
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
          {heading}
        </h2>
        <ul className="mt-6 space-y-5">
          {items.map((c, i) => (
            <CourseCard
              key={`${c.title}-${i}`}
              c={c}
              roleLabel={roleLabel}
              muted={muted}
            />
          ))}
        </ul>
      </section>
    </FadeIn>
  );
}

function CourseCard({
  c,
  roleLabel,
  muted,
}: {
  c: Course;
  roleLabel: string;
  muted?: boolean;
}) {
  return (
    <li
      className={`group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition hover:border-accent ${
        muted ? "opacity-85" : ""
      }`}
    >
      <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <h3 className="font-serif text-lg font-semibold leading-snug text-ink md:text-xl">
          {c.title}
        </h3>
        <span className="rounded border border-border px-2 py-0.5 text-xs uppercase tracking-widest text-subtle">
          {c.years}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-subtle">
        <span>{c.kind}</span>
        {c.country && (
          <>
            <span className="text-border">·</span>
            <span>{c.country}</span>
          </>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{c.institution}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        <span className="text-ink">{roleLabel}:</span> {c.role}
      </p>
      {c.summary && (
        <p className="mt-3 text-sm leading-relaxed text-muted">{c.summary}</p>
      )}
      {c.lead && <p className="mt-2 text-xs text-subtle">{c.lead}</p>}
      {c.url && (
        <a
          href={c.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-sm text-accent underline-offset-4 hover:underline"
        >
          {c.url.replace(/^https?:\/\//, "")} →
        </a>
      )}
    </li>
  );
}
