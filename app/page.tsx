import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60rem 30rem at 80% -10%, rgba(220,38,38,0.25), transparent 60%), radial-gradient(40rem 20rem at 0% 110%, rgba(220,38,38,0.15), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Molecular Modeling · Bioinformatics · AI
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
            The dynamic life of biological{" "}
            <span className="text-accent">macromolecules</span>.
          </h1>
          <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
            DansLab combines molecular simulations, structural bioinformatics,
            and machine learning to study the complex roles of nucleic acids
            and proteins inside the cell — from atoms to systems.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/research"
              className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Explore our research
            </Link>
            <Link
              href="/members"
              className="rounded-md border border-border px-5 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
          What we do
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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

      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
              About the lab
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              DansLab is led by Prof. Pablo D. Dans at the Department of
              Biological Sciences (DCB), CENUR Litoral Norte, Universidad de
              la República, Uruguay. We are part of the broader molecular
              modeling community in Latin America and collaborate with groups
              across Europe and the Americas.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Our research is supported by ANII, CSIC, PEDECIBA, and other
              national and international funding agencies.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-elevated p-8">
            <h3 className="font-serif text-xl font-semibold text-ink">News</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span>Site under construction. Migrating from Google Sites.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-border bg-surface p-7 transition hover:border-accent">
      <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
      <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </article>
  );
}
