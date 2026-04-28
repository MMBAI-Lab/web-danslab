import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SonifBackground from "@/components/SonifBackground";
import GeigerSound from "@/components/GeigerSound";
import { SONIF } from "@/data/content/outreach";
import { localizePath, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/asset";

export default function SonifPage({ lang }: { lang: Lang }) {
  const c = SONIF[lang];
  const playLabel = lang === "es" ? "Escuchar" : "Listen";
  const stopLabel = lang === "es" ? "Detener" : "Stop";

  return (
    <>
      <SonifBackground />
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

        {/* What is sonification? — text + WHOI link + Geiger + NASA video */}
        <FadeIn>
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              {c.whatis_heading}
            </h2>
            <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-muted">
              {c.whatis_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                <a
                  href={c.whoi_link_href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {c.whoi_link_label} →
                </a>
              </p>
            </div>

            <figure className="mt-10 flex items-start gap-5 rounded-lg border border-border bg-surface/70 p-5 backdrop-blur-sm">
              <div className="relative h-24 w-24 flex-none overflow-hidden rounded-lg bg-elevated">
                <Image
                  src={asset("/figures/Geiger.png")}
                  alt="Geiger counter"
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </div>
              <figcaption className="min-w-0 flex-1 text-sm leading-relaxed text-muted">
                {c.geiger_caption}
                <div className="mt-3">
                  <GeigerSound
                    label={playLabel}
                    stopLabel={stopLabel}
                    durationMs={6000}
                    meanIntervalMs={380}
                  />
                </div>
              </figcaption>
            </figure>

            <figure className="mt-8">
              <p className="max-w-prose text-sm leading-relaxed text-muted">
                {c.nasa_intro}
              </p>
              <div className="relative mt-3 aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${c.nasa_youtube_id}`}
                  title="M51 (Whirlpool Galaxy) Sonification — NASA"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </figure>
          </section>
        </FadeIn>

        {/* Examples of molecular sonification — interleaved with (sic) quotes */}
        <FadeIn>
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              {c.examples_heading}
            </h2>
            <ol className="mt-6 space-y-4">
              {c.examples.map((e, i) => (
                <li key={i}>
                  <div className="rounded-lg border border-border bg-surface p-5">
                    <p className="text-ink">{e.title}</p>
                    <p className="mt-1 text-sm italic text-subtle">{e.cite}</p>
                  </div>
                  {e.quote_after ? (
                    <blockquote className="mt-3 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-subtle">
                      “{e.quote_after}” <span className="not-italic">(sic)</span>
                    </blockquote>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
        </FadeIn>

        {/* The science behind it */}
        <FadeIn>
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              {c.science_heading}
            </h2>
            <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-muted">
              {c.science_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Materials */}
        <FadeIn>
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              {c.materials_heading}
            </h2>
            <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-muted">
              {c.materials_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                <a
                  href={c.materials_doi_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {c.materials_doi_label} →
                </a>
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Our approach — Vickers quote + paragraphs */}
        <FadeIn>
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              {c.approach_heading}
            </h2>
            <blockquote className="mt-6 border-l-2 border-accent pl-5 italic leading-relaxed text-subtle">
              {c.vickers_quote}
              <footer className="mt-3 not-italic text-xs text-subtle">
                {c.vickers_attribution}
              </footer>
            </blockquote>
            <div className="mt-8 max-w-prose space-y-4 leading-relaxed text-muted">
              {c.approach_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* DNA Music — pilot test + DNA Sonification YouTube */}
        <FadeIn>
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              {c.dnamusic_heading}
            </h2>
            <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-muted">
              {c.dnamusic_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-black">
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${c.dnamusic_youtube_id}`}
                  title="DNA Sonification"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-subtle">{c.dnamusic_youtube_label}</p>
          </section>
        </FadeIn>

        {/* Interactive DNA player iframe */}
        <FadeIn>
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              {c.dnaplayer_heading}
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
              {c.dnaplayer_description}
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
              <iframe
                src={c.dnaplayer_url}
                title="DNA-Music interactive player"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                className="block h-[600px] w-full md:h-[680px]"
              />
            </div>
            <p className="mt-3 text-xs text-subtle">
              <a
                href={c.dnaplayer_url}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                Open in a new tab →
              </a>
            </p>
          </section>
        </FadeIn>

        {/* Creators with photos and optional link */}
        <FadeIn>
          <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
            {c.creators_heading}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {c.creators.map((cr) => (
              <article
                key={cr.name}
                className="flex gap-5 rounded-lg border border-border bg-surface p-6"
              >
                <div className="relative h-20 w-20 flex-none overflow-hidden rounded-full border border-border bg-elevated">
                  <Image
                    src={asset(cr.photo)}
                    alt={cr.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    {cr.name}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed text-muted"
                    dangerouslySetInnerHTML={{ __html: cr.body_html }}
                  />
                  {cr.link ? (
                    <a
                      href={cr.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-xs text-accent underline-offset-4 hover:underline"
                    >
                      {cr.link.label} →
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </>
  );
}
