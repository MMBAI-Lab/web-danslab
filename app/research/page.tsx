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
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Research
      </h1>
      <p className="mt-4 max-w-prose text-ink/80">
        Our work spans scales — from individual base pairs to chromatin
        domains — combining physics-based simulations with data-driven
        modeling.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {lines.map((l) => (
          <article
            key={l.title}
            className="rounded-lg border border-black/10 bg-white p-6"
          >
            <h2 className="font-serif text-xl font-semibold">{l.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{l.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
