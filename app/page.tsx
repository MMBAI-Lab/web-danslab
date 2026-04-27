import Link from "next/link";
import DnaHelix from "@/components/DnaHelix";
import MoleculeRain from "@/components/MoleculeRain";
import FadeIn from "@/components/FadeIn";
import MemberCard from "@/components/MemberCard";
import { getCurrentMembers } from "@/lib/members";

export default function HomePage() {
  const members = getCurrentMembers();
  const pi = members[0];
  const team = members.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        {/* layered backdrop */}
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
              Molecular Modeling · Bioinformatics · AI
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Decoding the dynamic life of{" "}
              <span className="bg-gradient-to-r from-accent to-red-400 bg-clip-text text-transparent">
                macromolecules
              </span>
              .
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
              At DansLab we use molecular modeling, in silico simulations,
              structural bioinformatics, and AI to understand the complex,
              dynamic roles of nucleic acids and proteins inside the cell —
              from atoms to systems.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/research"
                className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-hover"
              >
                Explore our research
              </Link>
              <Link
                href="/members"
                className="rounded-md border border-border px-5 py-3 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                Meet the team
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT US — verbatim from original Google Site */}
      <section className="border-b border-border bg-bg">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[2fr_1fr]">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              About us
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              A multiscale view of macromolecules in their biological context.
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-muted">
              <p>
                The Dans Lab, also known as the{" "}
                <span className="text-ink">
                  Molecular Modeling, Bioinformatics and AI group
                </span>
                , is part of the Department of Biological Sciences (DCB) at the
                Regional University Center (CENUR) in Salto, located in the
                northern riverside region of Uruguay (Litoral Norte).
              </p>
              <p>
                At the Dans Lab we are driven by a deep fascination with{" "}
                <span className="italic text-ink">
                  macromolecules&rsquo; complex and dynamic roles within their
                  biological contexts
                </span>
                . We employ molecular modeling, in silico simulations, and
                structural bioinformatics to explore these intricate processes,
                adopting a multiscale perspective to uncover new insights.
              </p>
              <p className="text-sm text-subtle">
                Dans et al.{" "}
                <em>Curr. Op. Struct. Bio.</em>, 37, 29–45 (2016) ·{" "}
                <a
                  href="https://drive.google.com/file/d/1D8psUHJGNJC4DQ6UlKJhH0RG2pmOyUoy/view"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  PDF
                </a>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-lg border border-border bg-surface p-6">
              <h3 className="font-serif text-lg font-semibold text-ink">
                Quick links
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link
                    href="/research"
                    className="group flex items-center justify-between text-muted hover:text-accent"
                  >
                    Research lines{" "}
                    <span className="text-subtle group-hover:text-accent">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/publications"
                    className="group flex items-center justify-between text-muted hover:text-accent"
                  >
                    Publications{" "}
                    <span className="text-subtle group-hover:text-accent">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/outreach"
                    className="group flex items-center justify-between text-muted hover:text-accent"
                  >
                    Outreach{" "}
                    <span className="text-subtle group-hover:text-accent">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="group flex items-center justify-between text-muted hover:text-accent"
                  >
                    Join the group{" "}
                    <span className="text-subtle group-hover:text-accent">
                      →
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              What we do
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              From electrons to nucleosomes.
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Molecular dynamics",
                body: "Multiscale simulations — from all-atom MD to coarse-grained models — to probe conformational landscapes and macromolecular flexibility.",
              },
              {
                title: "Structural bioinformatics",
                body: "Sequence-to-structure-to-function pipelines, with a focus on DNA, RNA, and protein complexes in their cellular context.",
              },
              {
                title: "AI for biomolecules",
                body: "Geometric deep learning and generative models to predict structure, dynamics, and interactions of nucleic acids and proteins.",
              },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-lg border border-border bg-bg p-7 transition hover:border-accent">
                  <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {c.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CURRENT STAFF — preview, full list on /members */}
      {pi && (
        <section className="bg-bg">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Current staff
              </p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  The team behind the science.
                </h2>
                <Link
                  href="/members"
                  className="text-sm font-medium text-accent hover:text-accent-hover"
                >
                  All members →
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
