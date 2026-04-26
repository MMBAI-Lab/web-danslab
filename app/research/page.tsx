import type { Metadata } from "next";

export const metadata: Metadata = { title: "Research" };

const lines = [
  {
    title: "DNA dynamics and chromatin",
    body:
      "All-atom and coarse-grained simulations of DNA at different scales, with a focus on sequence-dependent flexibility, methylation, and chromatin organization.",
  },
  {
    title: "RNA structure and function",
    body:
      "Modeling of regulatory RNAs, tRNA halves, and RNA–protein interactions involved in cellular stress responses.",
  },
  {
    title: "Macromolecular interactions",
    body:
      "Protein–DNA and protein–RNA recognition mechanisms, integrating structural biology, MD, and ML-based predictions.",
  },
  {
    title: "AI for structural biology",
    body:
      "Development and benchmarking of geometric deep learning approaches for biomolecular structure and dynamics.",
  },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink">
        Research
      </h1>
      <p className="mt-5 max-w-prose leading-relaxed text-muted">
        Our work spans scales — from individual base pairs to chromatin
        domains — combining physics-based simulations with data-driven
        modeling.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {lines.map((l) => (
          <article
            key={l.title}
            className="group relative overflow-hidden rounded-lg border border-border bg-surface p-7 transition hover:border-accent"
          >
            <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
            <h2 className="font-serif text-xl font-semibold text-ink">{l.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{l.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
