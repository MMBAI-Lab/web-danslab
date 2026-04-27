import Link from "next/link";
import Gallery from "@/components/Gallery";
import FadeIn from "@/components/FadeIn";
import FloatingBases from "@/components/FloatingBases";
import { listGalleryImages } from "@/lib/gallery";
import { SONIF } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";

export default function SonifPage({ lang }: { lang: Lang }) {
  const c = SONIF[lang];
  const images = listGalleryImages("outreach/sonification");

  return (
    <>
      <FloatingBases className="fixed inset-0 z-0 opacity-35" density={0.6} />
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
        <p className="mt-10 max-w-prose text-lg leading-relaxed text-muted">
          {c.lede}
        </p>
      </FadeIn>

      {c.sections.map((s) => (
        <FadeIn key={s.heading}>
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              {s.heading}
            </h2>
            <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-muted">
              {s.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>
        </FadeIn>
      ))}

      <FadeIn>
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
            {c.examples_heading}
          </h2>
          <ul className="mt-6 space-y-4">
            {c.examples.map((e, i) => (
              <li
                key={i}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <p className="text-ink">{e.title}</p>
                <p className="mt-1 text-sm italic text-subtle">{e.cite}</p>
              </li>
            ))}
          </ul>
          <blockquote className="mt-6 border-l-2 border-accent pl-5 italic text-subtle">
            {c.examples_quote_1}
          </blockquote>
          <blockquote className="mt-4 border-l-2 border-accent pl-5 italic text-subtle">
            {c.examples_quote_2}
          </blockquote>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mt-16">
          <blockquote className="border-l-2 border-accent pl-5 italic text-subtle">
            {c.vickers_quote}
            <footer className="mt-3 not-italic text-xs text-subtle">
              {c.vickers_attribution}
            </footer>
          </blockquote>
          <div className="mt-8 max-w-prose space-y-4 leading-relaxed text-muted">
            {c.dna_music_paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-4 text-sm text-subtle">{c.dna_music_youtube_note}</p>
        </section>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.creators_heading}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {c.creators.map((cr) => (
            <article
              key={cr.name}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">
                {cr.name}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed text-muted"
                dangerouslySetInnerHTML={{ __html: cr.body_html }}
              />
            </article>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          {c.materials_heading}
        </h2>
        <div className="mt-6">
          <Gallery images={images} alt="Sonification project" />
        </div>
      </FadeIn>
      </div>
    </>
  );
}
