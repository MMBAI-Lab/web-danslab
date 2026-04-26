import type { Metadata } from "next";

export const metadata: Metadata = { title: "Publications" };

type Pub = {
  year: number;
  authors: string;
  title: string;
  venue: string;
  doi?: string;
};

// Replace with real publication list. Sorted newest first.
const pubs: Pub[] = [
  {
    year: 2025,
    authors: "Author A, Author B, Dans P. D.",
    title: "Placeholder title — replace with real entry",
    venue: "Journal Name, Vol(Issue), pp.",
    doi: "10.0000/placeholder",
  },
];

export default function PublicationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Publications
      </h1>
      <p className="mt-4 max-w-prose text-ink/80">
        A selection of recent work. Full list available on{" "}
        <a
          href="https://scholar.google.com/"
          className="text-accent underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Google Scholar
        </a>{" "}
        and{" "}
        <a
          href="https://orcid.org/"
          className="text-accent underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          ORCID
        </a>
        .
      </p>

      <ul className="mt-12 divide-y divide-black/10">
        {pubs.map((p, i) => (
          <li key={i} className="py-6">
            <p className="text-sm text-ink/60">{p.year}</p>
            <h2 className="mt-1 font-serif text-lg font-semibold leading-snug">
              {p.title}
            </h2>
            <p className="mt-1 text-sm text-ink/80">{p.authors}</p>
            <p className="mt-1 text-sm italic text-ink/70">{p.venue}</p>
            {p.doi && (
              <a
                href={`https://doi.org/${p.doi}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm text-accent underline-offset-4 hover:underline"
              >
                doi:{p.doi}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
