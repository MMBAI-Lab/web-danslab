import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import NeuralNetwork from "@/components/NeuralNetwork";
import {
  AudienceIcon,
  DnaHelixIcon,
  MusicNotesIcon,
} from "@/components/OutreachIcons";
import { OUTREACH_INDEX } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";

const CARD_ICON: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "/outreach/abc-2023": AudienceIcon,
  "/outreach/arn-for-export": DnaHelixIcon,
  "/outreach/sonification": MusicNotesIcon,
};

export default function OutreachIndex({ lang }: { lang: Lang }) {
  const c = OUTREACH_INDEX[lang];
  return (
    <>
      <NeuralNetwork className="fixed inset-0 z-0 opacity-60" density={1} />
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
        {c.cards.map((it) => {
          const Icon = CARD_ICON[it.href];
          return (
            <Link
              key={it.href}
              href={localizePath(lang, it.href)}
              className="group flex items-stretch overflow-hidden rounded-lg border border-border bg-surface transition hover:border-accent"
            >
              {Icon ? (
                <div className="flex w-24 flex-none items-center justify-center p-4 text-accent sm:w-32">
                  <Icon className="h-full max-h-40 w-auto" />
                </div>
              ) : null}
              <div className="flex-1 p-7">
                <h2 className="font-serif text-xl font-semibold text-ink group-hover:text-accent">
                  {it.title} →
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {it.body}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      </div>
    </>
  );
}
