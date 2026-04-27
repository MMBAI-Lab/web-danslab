import { Fragment } from "react";
import FloatingBases from "@/components/FloatingBases";
import {
  getNumberedGroups,
  formatVenue,
  type NumberedPublication,
} from "@/lib/publications";
import { isLabAuthor, splitAuthors } from "@/lib/lab-authors";
import { COMMON } from "@/data/content/common";
import type { Lang } from "@/lib/i18n";

export default function PublicationsPage({ lang }: { lang: Lang }) {
  const groups = getNumberedGroups();
  const labels = COMMON[lang];

  return (
    <>
      <FloatingBases className="fixed inset-0 z-0 opacity-40" density={0.7} />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {labels.nav.publications}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {labels.nav.publications}
        </h1>
        <p className="mt-5 max-w-prose leading-relaxed text-muted">
          {labels.publications.intro}
        </p>

        <div className="mt-16 space-y-14">
          {groups.map(([year, pubs]) => (
            <section key={year}>
              <h2 className="sticky top-16 z-10 -mx-6 bg-bg/85 px-6 py-2 font-serif text-2xl font-semibold tracking-tight text-accent backdrop-blur">
                {year}
              </h2>
              <ol className="mt-4 ml-2 space-y-7 md:ml-6">
                {pubs.map((p) => (
                  <PubItem key={p.index} p={p} index={p.index} />
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

function PubItem({ p, index }: { p: NumberedPublication; index: number }) {
  return (
    <li className="flex gap-4">
      <span className="w-7 flex-none pt-1 text-right font-mono text-xs text-subtle">
        {index}.
      </span>
      <div className="flex-1">
        <h3 className="font-serif text-base font-semibold leading-snug text-ink md:text-lg">
          {p.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          <Authors value={p.authors} />
        </p>
        <p className="mt-1 text-sm italic text-subtle">{formatVenue(p)}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
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
      </div>
    </li>
  );
}

function Authors({ value }: { value: string }) {
  const parts = splitAuthors(value);
  return (
    <>
      {parts.map((author, i) => {
        const isLab = isLabAuthor(author);
        const sep = i < parts.length - 1 ? ", " : "";
        return (
          <Fragment key={i}>
            <span
              className={
                isLab
                  ? "text-ink underline decoration-accent decoration-2 underline-offset-2"
                  : ""
              }
            >
              {author}
            </span>
            {sep}
          </Fragment>
        );
      })}
    </>
  );
}
