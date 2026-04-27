import MemberCard from "@/components/MemberCard";
import FloatingBases from "@/components/FloatingBases";
import { getCurrentMembers, getPastMembers } from "@/lib/members";
import { COMMON } from "@/data/content/common";
import type { Lang } from "@/lib/i18n";

export default function MembersPage({ lang }: { lang: Lang }) {
  const labels = COMMON[lang].members;
  const current = getCurrentMembers();
  const past = getPastMembers();
  const pi = current[0];
  const team = current.slice(1);

  return (
    <>
      <FloatingBases className="fixed inset-0 z-0 opacity-50" density={0.9} />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        {COMMON[lang].nav.members}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        {labels.team_heading}
      </h1>
      <p className="mt-5 max-w-prose leading-relaxed text-muted">
        {labels.intro}
      </p>

      {pi && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            {labels.pi_heading}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <MemberCard member={pi} lang={lang} />
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            {labels.team_heading}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {team.map((m) => (
              <MemberCard key={m.name} member={m} lang={lang} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            {labels.past_heading}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {past.map((m) => (
              <MemberCard key={m.name} member={m} lang={lang} />
            ))}
          </div>
        </section>
      )}
      </div>
    </>
  );
}
