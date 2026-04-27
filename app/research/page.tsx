import type { Metadata } from "next";
import projects from "@/data/research-projects.json";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = { title: "Research" };

type Project = {
  title: string;
  kind: string;
  duration: string;
  role: string;
  scope: string;
  summary: string;
  url?: string;
};

export default function ResearchPage() {
  const items = projects as Project[];
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Research
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Nucleic acids in their full dynamic context.
        </h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-10 max-w-prose space-y-5 leading-relaxed text-muted">
          <p>
            The Dans Lab is mainly focused on the study of the structure and
            dynamics of nucleic acids and their interactions with proteins,
            small ligands and the solvent atmosphere, from a molecular point
            of view.
          </p>
          <p>
            We use and develop all-atom force fields and coarse-grained models
            for atomistic, nanoscopic and mesoscopic simulations. We also use
            and develop bioinformatic tools for the data mining of specialized
            databases containing structural information.
          </p>
          <p>
            All our projects are tackled from a multiscale perspective trying
            to connect the quantum world with the macroscopic level — from{" "}
            <span className="text-ink">electrons</span> up to{" "}
            <span className="text-ink">chromosomes</span>.
          </p>
          <p className="text-sm text-subtle">
            Cover image: HiC-biased MD simulation of a haploid yeast nucleus.
            From{" "}
            <em>Impact of DNA methylation on 3D genome structure</em>. Nature
            Communications 12, 3243 (2021) ·{" "}
            <a
              href="https://drive.google.com/file/d/1cv6nvgmbOmKGe-IjyJDb5DSkIT1fc6ra/view"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              PDF
            </a>
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          Current research lines &amp; projects
        </h2>
        <p className="mt-2 text-sm text-subtle">
          {items.length} ongoing or recently active projects, spanning consortia,
          PhD/MSc co-directions, and outreach.
        </p>
      </FadeIn>

      <ul className="mt-10 space-y-5">
        {items.map((p, i) => (
          <FadeIn key={p.title} delay={Math.min(i * 0.03, 0.3)}>
            <ProjectCard project={p} />
          </FadeIn>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
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
