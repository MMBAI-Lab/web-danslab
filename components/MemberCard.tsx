import Image from "next/image";
import type { Member } from "@/lib/members";

export default function MemberCard({ member }: { member: Member }) {
  const hasPhoto = member.photo && member.photo.length > 0;
  const initials = member.name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition hover:border-accent">
      <span className="absolute left-0 top-0 h-full w-0.5 bg-accent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start gap-5">
        <div className="relative h-20 w-20 flex-none overflow-hidden rounded-full border border-border bg-elevated">
          {hasPhoto ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif text-lg text-subtle">
              {initials}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          {member.title && (
            <p className="text-xs font-semibold uppercase tracking-widest text-subtle">
              {member.title}
            </p>
          )}
          <h3 className="mt-0.5 font-serif text-lg font-semibold text-ink">
            {member.name}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {member.role1}
            {member.institution1 ? (
              <span className="text-subtle"> · {member.institution1}</span>
            ) : null}
          </p>
          {member.role2 && (
            <p className="mt-0.5 text-sm text-muted">
              {member.role2}
              {member.institution2 ? (
                <span className="text-subtle"> · {member.institution2}</span>
              ) : null}
            </p>
          )}
          {member.comment && (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {member.comment}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                email
              </a>
            )}
            {member.scholar && (
              <a
                href={member.scholar}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                google scholar
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
