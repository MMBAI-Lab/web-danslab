import Image from "next/image";
import { asset } from "@/lib/asset";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  if (images.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface p-10 text-center text-sm text-subtle">
        No images yet. Add web-optimized JPGs to{" "}
        <code className="text-muted">public/outreach/&lt;activity&gt;/</code>{" "}
        and rebuild.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {images.map((src) => {
        const url = asset(src);
        return (
          <a
            key={src}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-md border border-border bg-elevated"
          >
            <Image
              src={url}
              alt={alt}
              fill
              sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-90"
            />
          </a>
        );
      })}
    </div>
  );
}
