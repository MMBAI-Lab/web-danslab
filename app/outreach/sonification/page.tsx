import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import { listGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = { title: "Sonification" };

export default function SonificationPage() {
  const images = listGalleryImages("outreach/sonification");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Link
        href="/outreach"
        className="text-xs font-semibold uppercase tracking-widest text-subtle hover:text-accent"
      >
        ← Outreach
      </Link>

      <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-ink">
        Sonification
      </h1>
      <p className="mt-3 text-sm font-medium uppercase tracking-widest text-accent">
        DNA → Music
      </p>

      <div className="mt-8 max-w-prose space-y-4 leading-relaxed text-muted">
        <p>
          We translate the dynamics of DNA — its interactions with potassium
          ions in the major and minor grooves — into sound. Physical properties
          extracted from molecular dynamics simulations are mapped to musical
          notes played on piano and violin, producing compositions that are
          both data-driven and aesthetically engaging.
        </p>
        <p>
          A pilot piece sonifies 13 DNA sequences (234 letters in total),
          color-coding each note by the type of groove interaction it
          represents. The project is a collaboration with composer{" "}
          <a
            href="https://nicomolla.com/"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            Nicolás Molla
          </a>
          .
        </p>
        <p className="text-subtle">
          Sonification — making invisible phenomena hearable — has been used
          for everything from cosmic rays (
          <a
            href="https://www.nasa.gov/marshall"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            NASA
          </a>
          ) to ocean data (
          <a
            href="https://accessibleoceans.whoi.edu/what-is-sonification/"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            WHOI
          </a>
          ).
        </p>
      </div>

      <h2 className="mt-16 font-serif text-2xl font-semibold tracking-tight text-ink">
        Materials
      </h2>
      <div className="mt-6">
        <Gallery images={images} alt="Sonification project" />
      </div>
    </div>
  );
}
