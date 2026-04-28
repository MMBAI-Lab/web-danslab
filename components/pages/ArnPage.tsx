import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import RnaCloud from "@/components/RnaCloud";
import { ARN } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/asset";

const INTRO_MOSAIC = [
  "/figures/ARNforExp1.jpg",
  "/figures/ARNforExp2.jpg",
  "/figures/ARNforExp3.jpg",
  "/figures/ARNforExp4.jpg",
];

// Square photo to render on the left of a section, keyed by section index
// in c.sections (0: Scientific context, 1: The discovery, 2: The artistic
// installation, 3: The creative process).
const SECTION_IMAGES: Record<number, string> = {
  2: "/figures/Instalacion.jpg",
  3: "/figures/Artistas.jpg",
};

export default function ArnPage({ lang }: { lang: Lang }) {
  const c = ARN[lang];
  return (
    <>
      <RnaCloud className="fixed inset-0 z-0 opacity-70" density={0.7} />
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

      <div className="mt-10 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <FadeIn>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/figures/ARNforExport_ARTxSc_transparent.gif")}
            alt="ARN for Export — Art × Science animation"
            className="mx-auto block w-full max-w-xs md:max-w-none"
            loading="eager"
            decoding="async"
          />
        </FadeIn>
        <FadeIn delay={0.05}>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {c.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>
      </div>

      {c.sections.map((s, idx) => {
        const img = SECTION_IMAGES[idx];
        return (
          <div key={s.heading}>
          <FadeIn>
            <section className="mt-16">
              {img ? (
                <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-elevated">
                    <Image
                      src={asset(img)}
                      alt={s.heading}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
                      {s.heading}
                    </h2>
                    <div className="mt-6 space-y-4 leading-relaxed text-muted">
                      {s.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
                    {s.heading}
                  </h2>
                  <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-muted">
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </>
              )}
            </section>
          </FadeIn>
          {idx === 0 && (
            <FadeIn delay={0.05}>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
                {INTRO_MOSAIC.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-elevated"
                  >
                    <Image
                      src={asset(src)}
                      alt="ARN for Export installation"
                      fill
                      sizes="(min-width: 640px) 50vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
          </div>
        );
      })}

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.artists_heading}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {c.artists.map((a) => (
            <article
              key={a.name}
              className="flex gap-5 rounded-lg border border-border bg-surface p-6"
            >
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-full border border-border bg-elevated">
                <Image
                  src={asset(a.photo)}
                  alt={a.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {a.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {a.body}
                </p>
                {a.link ? (
                  <a
                    href={a.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-xs text-accent underline-offset-4 hover:underline"
                  >
                    {a.link.label} →
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.inaugurations_heading}
        </h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
          {c.inaugurations_intro}
        </p>
        <ol className="arn-inaug mt-8 grid gap-5 sm:grid-cols-3">
          {c.inaugurations.map((v) => (
            <li
              key={v.venue}
              className="flex flex-col items-center rounded-lg border border-border bg-surface p-6 text-center"
            >
              <div className="relative h-24 w-full">
                <Image
                  src={asset(v.logo)}
                  alt={v.venue}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="arn-inaug-logo object-contain"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {v.date}
              </p>
              <p className="mt-2 font-serif text-base font-semibold leading-snug text-ink">
                {v.venue}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-subtle">
                {v.city}
              </p>
            </li>
          ))}
        </ol>
        <style>{`
          :root[data-theme="dark"] .arn-inaug .arn-inaug-logo {
            filter: invert(1) hue-rotate(180deg);
          }
        `}</style>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.media_heading}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.media_items.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-lg border border-border bg-surface transition hover:border-accent"
            >
              <div className="relative aspect-video overflow-hidden bg-elevated">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition group-hover:bg-accent">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </div>
              <p className="px-4 py-3 text-sm leading-snug text-ink">
                {v.title}
              </p>
            </a>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.funding_heading}
        </h2>
        <div className="mt-6">
          <div className="relative mx-auto w-full max-w-3xl">
            <Image
              src={asset(c.funding_image)}
              alt={c.funding_heading}
              width={1600}
              height={500}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-20 rounded-lg border border-border bg-surface p-8 text-center">
          <p className="text-muted">{c.cta}</p>
          <p className="mt-4">
            <a
              href={`mailto:${c.cta_email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {c.cta_email}
            </a>
          </p>
          <p className="mt-6 text-xs text-subtle">{c.copyright}</p>
        </div>
      </FadeIn>
      </div>
    </>
  );
}
