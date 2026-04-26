import type { Metadata } from "next";

export const metadata: Metadata = { title: "Members" };

type Member = {
  name: string;
  role: string;
  blurb?: string;
};

const pi: Member = {
  name: "Pablo D. Dans",
  role: "Principal Investigator · Associate Professor",
  blurb:
    "Heads DansLab. Works on molecular modeling and structural bioinformatics of nucleic acids.",
};

const team: Member[] = [
  // Fill in current members. Replace with real names, roles, and short bios.
  { name: "—", role: "Postdoctoral researcher" },
  { name: "—", role: "PhD student" },
  { name: "—", role: "MSc student" },
  { name: "—", role: "Undergraduate researcher" },
];

export default function MembersPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Members
      </h1>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold">
          Principal Investigator
        </h2>
        <article className="mt-6 rounded-lg border border-black/10 bg-white p-6">
          <h3 className="font-serif text-xl font-semibold">{pi.name}</h3>
          <p className="text-sm text-accent">{pi.role}</p>
          {pi.blurb && (
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              {pi.blurb}
            </p>
          )}
        </article>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-semibold">Team</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <article
              key={i}
              className="rounded-lg border border-black/10 bg-white p-6"
            >
              <h3 className="font-serif text-lg font-semibold">{m.name}</h3>
              <p className="text-sm text-accent">{m.role}</p>
              {m.blurb && (
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  {m.blurb}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
