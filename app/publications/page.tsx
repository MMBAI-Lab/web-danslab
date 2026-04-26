import type { Metadata } from "next";
import {
  getPublications,
  groupByYear,
  formatVenue,
  type Publication,
} from "@/lib/publications";

export const metadata: Metadata = { title: "Publications" };

export default function PublicationsPage() {
  const groups = groupByYear(getPublications());

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink">
        Publications
      </h1>
      <p className="mt-5 max-w-prose leading-relaxed text-muted">
        Peer-reviewed work from DansLab and collaborators. Full list also on{" "}
        <a
          href="https://scholar.google.es/citations?hl=es&user=7gFOImQAAAAJ&view_op=list_works"
          className="text-accent underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Google Scholar
        </a>
        .
      </p>

      <div className="mt-16 space-y-16">
        {groups.map(([year, pubs]) => (
          <section key={year}>
            <h2 className="sticky top-16 z-10 -mx-6 bg-bg/85 px-6 py-2 font-serif text-2xl font-semibold tracking-tight text-ink backdrop-blur">
              {year}
            </h2>
            <ul className="mt-4 divide-y divide-border">
              {pubs.map((p, i) => (
                <PubItem key={i} p={p} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function PubItem({ p }: { p: Publication }) {
  return (
    <li className="py-7">
      <h3 className="font-serif text-base font-semibold leading-snug text-ink md:text-lg">
        {p.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{p.authors}</p>
      <p className="mt-1 text-sm italic text-subtle">{formatVenue(p)}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        {p.note && (
          <span className="rounded border border-border px-2 py-0.5 text-subtle">
            {p.note}
          </span>
        )}
        {p.doi && (
          <a
            href={`https://doi.org/${p.doi}`}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            doi
          </a>
        )}
        {p.pdf && (
          <a
            href={p.pdf}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            pdf
          </a>
        )}
      </div>
    </li>
  );
}
