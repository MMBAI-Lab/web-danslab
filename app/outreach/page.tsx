import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Outreach" };

const items = [
  {
    href: "/outreach/abc-2023",
    title: "ABC 2023",
    body:
      "International workshop of the Ascona B-DNA Consortium — sequence-dependent physical properties of DNA, multiscale methods, force fields and protein–DNA interactions.",
  },
  {
    href: "/outreach/arn-for-export",
    title: "ARN for Export",
    body:
      "Interdisciplinary art-and-science installation visualizing extracellular RNA — a collaboration with sculptors, audiovisual artists and biologists across Uruguayan institutions.",
  },
  {
    href: "/outreach/sonification",
    title: "Sonification",
    body:
      "Translating molecular dynamics of DNA into music. A pilot composition mapping DNA–ion interactions to piano and violin notes, in collaboration with composer Nicolás Molla.",
  },
];

export default function OutreachIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink">
        Outreach
      </h1>
      <p className="mt-5 max-w-prose leading-relaxed text-muted">
        We share science through teaching, public engagement, and creative
        collaborations across art, music, and exhibitions.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="group relative overflow-hidden rounded-lg border border-border bg-surface p-7 transition hover:border-accent"
          >
            <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
            <h2 className="font-serif text-xl font-semibold text-ink group-hover:text-accent">
              {it.title} →
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{it.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
