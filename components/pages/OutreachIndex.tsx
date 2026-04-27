import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FloatingBases from "@/components/FloatingBases";
import { OUTREACH_INDEX } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";

export default function OutreachIndex({ lang }: { lang: Lang }) {
  const c = OUTREACH_INDEX[lang];
  return (
    <>
      <FloatingBases className="fixed inset-0 z-0 opacity-50" density={0.9} />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {c.eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {c.title}
        </h1>
        <p className="mt-5 max-w-prose leading-relaxed text-muted">
          {c.intro}
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {c.cards.map((it) => (
          <Link
            key={it.href}
            href={localizePath(lang, it.href)}
            className="group relative overflow-hidden rounded-lg border border-border bg-surface p-7 transition hover:border-accent"
          >
            <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
            <h2 className="font-serif text-xl font-semibold text-ink group-hover:text-accent">
              {it.title} →
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {it.body}
            </p>
          </Link>
        ))}
      </div>
      </div>
    </>
  );
}
