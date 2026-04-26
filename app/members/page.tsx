import type { Metadata } from "next";
import MemberCard from "@/components/MemberCard";
import { getCurrentMembers, getPastMembers } from "@/lib/members";

export const metadata: Metadata = { title: "Members" };

export default function MembersPage() {
  const current = getCurrentMembers();
  const past = getPastMembers();
  const pi = current[0];
  const team = current.slice(1);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink">
        Members
      </h1>
      <p className="mt-5 max-w-prose leading-relaxed text-muted">
        The team behind DansLab — researchers, students, and collaborators
        working at the intersection of physics, biology, and computation.
      </p>

      {pi && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Principal Investigator
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <MemberCard member={pi} />
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-ink">Team</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {team.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Past members
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {past.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
