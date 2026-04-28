import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import NeuralNetwork from "@/components/NeuralNetwork";
import { OUTREACH_INDEX } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/asset";

const CARD_ICON: Record<string, { src: string; alt: string }> = {
  "/outreach/abc-2023": {
    src: "/figures/icon_ABC.png",
    alt: "Audience and podium",
  },
  "/outreach/arn-for-export": {
    src: "/figures/icon_RNA.png",
    alt: "DNA / RNA helix",
  },
  "/outreach/sonification": {
    src: "/figures/icon_SON.png",
    alt: "Music notes",
  },
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
          const icon = CARD_ICON[it.href];
          return (
            <Link
              key={it.href}
              href={localizePath(lang, it.href)}
              className="group flex items-stretch overflow-hidden rounded-lg border border-border bg-surface transition hover:border-accent"
            >
              {icon ? (
                <div className="flex w-24 flex-none items-center justify-center p-4 sm:w-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(icon.src)}
                    alt={icon.alt}
                    className="block h-full max-h-32 w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
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
