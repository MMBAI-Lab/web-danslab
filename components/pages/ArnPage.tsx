import Link from "next/link";
import Gallery from "@/components/Gallery";
import FadeIn from "@/components/FadeIn";
import { listGalleryImages } from "@/lib/gallery";
import { ARN } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";

export default function ArnPage({ lang }: { lang: Lang }) {
  const c = ARN[lang];
  const images = listGalleryImages("outreach/arn-for-export");
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
        <div className="mt-10 max-w-prose space-y-5 text-lg leading-relaxed text-muted">
          {c.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
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

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.artists_heading}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {c.artists.map((a) => (
            <article
              key={a.name}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">
                {a.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
            </article>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.gallery_heading}
        </h2>
        <div className="mt-6">
          <Gallery images={images} alt="ARN for Export installation" />
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
  );
}
