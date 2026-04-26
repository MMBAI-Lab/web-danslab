import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-black/10 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Molecular Modeling, Bioinformatics &amp; AI
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
            Understanding the dynamic life of biological macromolecules.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink/80">
            DansLab combines molecular simulations, structural bioinformatics,
            and machine learning to study the complex roles of nucleic acids
            and proteins inside the cell — from atoms to systems.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/research"
              className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-dark"
            >
              Explore our research
            </Link>
            <Link
              href="/members"
              className="rounded-md border border-ink/15 px-5 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-serif text-3xl font-semibold tracking-tight">
          What we do
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <Card
            title="Molecular dynamics"
            body="Multiscale simulations — from all-atom MD to coarse-grained models — to probe conformational landscapes and macromolecular flexibility."
          />
          <Card
            title="Structural bioinformatics"
            body="Sequence-to-structure-to-function pipelines, with a focus on DNA, RNA, and protein complexes in their cellular context."
          />
          <Card
            title="AI for biomolecules"
            body="Geometric deep learning and generative models to predict structure, dynamics, and interactions of nucleic acids and proteins."
          />
        </div>
      </section>

      <section className="border-t border-black/10 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              About the lab
            </h2>
            <p className="mt-6 text-ink/80">
              DansLab is led by Prof. Pablo D. Dans at the Department of
              Biological Sciences (DCB), CENUR Litoral Norte, Universidad de
              la República, Uruguay. We are part of the broader molecular
              modeling community in Latin America and collaborate with groups
              across Europe and the Americas.
            </p>
            <p className="mt-4 text-ink/80">
              Our research is supported by ANII, CSIC, PEDECIBA, and other
              national and international funding agencies.
            </p>
          </div>
          <div className="rounded-lg border border-black/10 bg-white p-8">
            <h3 className="font-serif text-xl font-semibold">News</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              <li>— Site under construction. Migrating from Google Sites.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border border-black/10 bg-white p-6 transition hover:border-accent">
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">{body}</p>
    </article>
  );
}
