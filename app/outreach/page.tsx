import type { Metadata } from "next";

export const metadata: Metadata = { title: "Outreach" };

const items = [
  {
    title: "ABC 2023",
    body:
      "Photos and materials from the ABC 2023 school/event. Replace with a short description and link to a gallery.",
  },
  {
    title: "ARN for Export",
    body:
      "Public engagement project on RNA biology. Add description and links.",
  },
  {
    title: "Sonification",
    body:
      "Translating molecular data into sound — a creative dissemination format. Add description and links.",
  },
];

export default function OutreachPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Outreach
      </h1>
      <p className="mt-4 max-w-prose text-ink/80">
        We share science through teaching, public talks, and creative
        collaborations.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-black/10 bg-white p-6"
          >
            <h2 className="font-serif text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
