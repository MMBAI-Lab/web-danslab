import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import NeuralNetwork from "@/components/NeuralNetwork";
import type { WebProjectContent } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";

// Shared layout for outreach entries that are events/websites we built
// (M-ONT, DCB website): intro, outbound links, highlights and sections.
export default function WebProjectPage({
  lang,
  c,
}: {
  lang: Lang;
  c: WebProjectContent;
}) {
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
          <div className="mt-10 max-w-prose space-y-5 text-lg leading-relaxed text-muted">
            {c.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {c.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  i === 0
                    ? "rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-hover"
                    : "rounded-md border border-border px-5 py-3 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
                }
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <section className="mt-16 rounded-lg border border-border bg-surface p-7">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              {c.highlights_heading}
            </h2>
            <ul className="mt-5 grid gap-3 text-muted md:grid-cols-2">
              {c.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-accent" aria-hidden="true">›</span>
                  {h}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        {c.sections.map((s) => (
          <FadeIn key={s.heading}>
            <section className="mt-16">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
                {s.heading}
              </h2>
              <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-muted">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
