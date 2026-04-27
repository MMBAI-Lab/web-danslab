import FadeIn from "@/components/FadeIn";
import FloatingBases from "@/components/FloatingBases";
import { COMMON } from "@/data/content/common";
import type { Lang } from "@/lib/i18n";

export default function CoursesPage({ lang }: { lang: Lang }) {
  const dict = COMMON[lang];
  return (
    <>
      <FloatingBases className="fixed inset-0 z-0 opacity-40" density={0.7} />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {dict.nav.courses}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {dict.nav.courses}
          </h1>
          <p className="mt-5 leading-relaxed text-muted">
            {dict.courses.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-16 rounded-lg border border-dashed border-border bg-surface p-10 text-center text-sm text-subtle">
            {dict.courses.empty}
          </div>
        </FadeIn>
      </div>
    </>
  );
}
