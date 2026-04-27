import Link from "next/link";
import DnaHelix from "@/components/DnaHelix";
import MoleculeRain from "@/components/MoleculeRain";
import FadeIn from "@/components/FadeIn";
import MemberCard from "@/components/MemberCard";
import { getCurrentMembers } from "@/lib/members";
import { localizePath, type Lang } from "@/lib/i18n";
import { HOME } from "@/data/content/home";

export default function HomePage({ lang }: { lang: Lang }) {
  const c = HOME[lang];
  const members = getCurrentMembers();
  const pi = members[0];
  const team = members.slice(1);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60rem 32rem at 75% -15%, rgba(220,38,38,0.22), transparent 60%), radial-gradient(45rem 24rem at -5% 110%, rgba(220,38,38,0.12), transparent 60%)",
          }}
        />
        <MoleculeRain className="absolute inset-0 opacity-60" density={0.85} />
        <DnaHelix className="absolute -right-16 top-1/2 hidden h-[130%] -translate-y-1/2 opacity-60 md:block md:w-[560px]" />

        <div className="relative mx-auto max-w-6xl px-6 py-32 md:py-44">
          <FadeIn>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {c.eyebrow}
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
              {c.title_pre}
              <span className="bg-gradient-to-r from-accent to-red-400 bg-clip-text text-transparent">
                {c.title_accent}
              </span>
              {c.title_post}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
              {c.intro}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={localizePath(lang, "/research")}
                className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-hover"
              >
                {c.cta_research}
              </Link>
              <Link
                href={localizePath(lang, "/members")}
                className="rounded-md border border-border px-5 py-3 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                {c.cta_team}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-border bg-bg">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[2fr_1fr]">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {c.about_eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {c.about_title}
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-muted">
              {c.about_paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              <p
                className="text-sm text-subtle"
                dangerouslySetInnerHTML={{ __html: c.about_cite_html }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-lg border border-border bg-surface p-6">
              <h3 className="font-serif text-lg font-semibold text-ink">
                {c.quicklinks_title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {c.quicklinks.map((q) => (
                  <li key={q.href}>
                    <Link
                      href={localizePath(lang, q.href)}
                      className="group flex items-center justify-between text-muted hover:text-accent"
                    >
                      {q.label}
                      <span className="text-subtle group-hover:text-accent">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {c.whatwedo_eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {c.whatwedo_title}
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.whatwedo_cards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-lg border border-border bg-bg p-7 transition hover:border-accent">
                  <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {card.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {pi && (
        <section className="bg-bg">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                {c.staff_eyebrow}
              </p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  {c.staff_title}
                </h2>
                <Link
                  href={localizePath(lang, "/members")}
                  className="text-sm font-medium text-accent hover:text-accent-hover"
                >
                  {c.staff_link}
                </Link>
              </div>
            </FadeIn>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <FadeIn delay={0.05}>
                <MemberCard member={pi} />
              </FadeIn>
              {team.slice(0, 3).map((m, i) => (
                <FadeIn key={m.name} delay={0.1 + i * 0.05}>
                  <MemberCard member={m} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
