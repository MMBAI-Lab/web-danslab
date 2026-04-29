import FadeIn from "@/components/FadeIn";
import NeuralNetwork from "@/components/NeuralNetwork";
import BacteriaOutline from "@/components/BacteriaOutline";
import { RESEARCH } from "@/data/content/research";
import { getResearchProjects, type ResearchProject } from "@/lib/research";
import type { Lang } from "@/lib/i18n";

export default function ResearchPage({ lang }: { lang: Lang }) {
  const c = RESEARCH[lang];
  const projects = getResearchProjects(lang);
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <NeuralNetwork className="absolute inset-0 opacity-70" density={1} />
        <BacteriaOutline className="pointer-events-none absolute -left-[6%] top-[4%] h-[34%] w-[44%] opacity-40" />
        <BacteriaOutline className="pointer-events-none absolute -right-[8%] bottom-[6%] h-[34%] w-[44%] rotate-180 opacity-40" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50rem 28rem at 90% 0%, rgba(220,38,38,0.18), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {c.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              {c.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="mt-10 max-w-prose space-y-5 leading-relaxed text-muted">
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-16 max-w-prose">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                {c.bacterial_heading}
              </h2>
              <div className="mt-6 space-y-5 leading-relaxed text-muted">
                {c.bacterial_paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-20">
        <FadeIn>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
            {c.projects_heading}
          </h2>
          <p className="mt-2 text-sm text-subtle">
            {c.projects_subtitle(projects.length)}
          </p>
        </FadeIn>
        <ul className="mt-10 space-y-5">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={Math.min(i * 0.03, 0.3)}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </ul>
      </div>
    </>
  );
}

function ProjectCard({ project: p }: { project: ResearchProject }) {
  return (
    <li className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition hover:border-accent">
      <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <h3 className="font-serif text-lg font-semibold leading-snug text-ink md:text-xl">
          {p.title}
        </h3>
        <span className="rounded border border-border px-2 py-0.5 text-xs uppercase tracking-widest text-subtle">
          {p.duration}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-subtle">
        <span>{p.kind}</span>
        <span className="text-border">·</span>
        <span className="text-muted">{p.role}</span>
        <span className="text-border">·</span>
        <span>{p.scope}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{p.summary}</p>
      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline"
        >
          {p.url.replace(/^https?:\/\//, "")} →
        </a>
      )}
    </li>
  );
}
