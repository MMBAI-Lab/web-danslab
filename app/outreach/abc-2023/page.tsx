import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import { listGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = { title: "ABC 2023" };

export default function ABC2023Page() {
  const images = listGalleryImages("outreach/abc-2023");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Link
        href="/outreach"
        className="text-xs font-semibold uppercase tracking-widest text-subtle hover:text-accent"
      >
        ← Outreach
      </Link>

      <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-ink">
        ABC 2023
      </h1>
      <p className="mt-3 text-sm font-medium uppercase tracking-widest text-accent">
        Ascona B-DNA Consortium · International workshop
      </p>

      <div className="mt-8 max-w-prose space-y-4 leading-relaxed text-muted">
        <p>
          ABC 2023 brought together international researchers — experimentalists,
          computational scientists, and method developers — to discuss
          sequence-dependent physical properties of DNA, new methods, and new
          models, with a multiscale perspective spanning from atomic to
          nucleosome scales.
        </p>
        <p>
          The scientific committee included John Maddocks, Wilma Olson and
          Modesto Orozco. Topics ranged from force-field development and DNA
          mechanical properties to coarse-grained modeling, protein–DNA
          interactions, nucleosome structure and epigenetic modifications.
        </p>
      </div>

      <h2 className="mt-16 font-serif text-2xl font-semibold tracking-tight text-ink">
        Photos
      </h2>
      <div className="mt-6">
        <Gallery images={images} alt="ABC 2023 conference photo" />
      </div>
    </div>
  );
}
