import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import { listGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = { title: "ARN for Export" };

export default function ARNforExportPage() {
  const images = listGalleryImages("outreach/arn-for-export");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Link
        href="/outreach"
        className="text-xs font-semibold uppercase tracking-widest text-subtle hover:text-accent"
      >
        ← Outreach
      </Link>

      <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-ink">
        ARN for Export
      </h1>
      <p className="mt-3 text-sm font-medium uppercase tracking-widest text-accent">
        Art × Science installation
      </p>

      <div className="mt-8 max-w-prose space-y-4 leading-relaxed text-muted">
        <p>
          ARN for Export is an interdisciplinary installation that visualizes
          the discovery that RNA molecules can travel freely outside cells,
          functioning as intercellular communication without vesicle
          protection.
        </p>
        <p>
          The collaboration brings together molecular biologists, computational
          chemists and visual artists — translating molecular processes into a
          sensory experience built from distorted forms, white-and-red
          lighting and immersive soundscapes that simulate RNA&rsquo;s journey
          through extracellular space.
        </p>
        <p className="text-subtle">
          <span className="font-medium text-muted">Scientists:</span> Juan
          Pablo Tosar, Alfonso Cayota, Leonardo Darré, Pablo D. Dans.
          <br />
          <span className="font-medium text-muted">Artists:</span> Martina
          Buroni (sculptor), Mariana Barraco (multidisciplinary), Nito
          Cilintano (audiovisual).
        </p>
        <p>
          Contact:{" "}
          <a
            href="mailto:arnforexport@gmail.com"
            className="text-accent underline-offset-4 hover:underline"
          >
            arnforexport@gmail.com
          </a>
          .
        </p>
      </div>

      <h2 className="mt-16 font-serif text-2xl font-semibold tracking-tight text-ink">
        Gallery
      </h2>
      <div className="mt-6">
        <Gallery images={images} alt="ARN for Export installation" />
      </div>
    </div>
  );
}
