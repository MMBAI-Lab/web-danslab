"use client";

import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";
import MemberCard from "@/components/MemberCard";
import type { Member } from "@/lib/members";

// The site is a static export, so the random pick has to happen in the
// browser. The server renders the first `count` members invisibly to
// reserve the layout; after mount we swap in a fresh random sample.
export default function RandomTeam({
  members,
  count = 3,
}: {
  members: Member[];
  count?: number;
}) {
  const [picked, setPicked] = useState<Member[] | null>(null);

  useEffect(() => {
    const pool = [...members];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setPicked(pool.slice(0, count));
  }, [members, count]);

  if (!picked) {
    return (
      <>
        {members.slice(0, count).map((m) => (
          <div key={m.name} className="invisible" aria-hidden="true">
            <MemberCard member={m} />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {picked.map((m, i) => (
        <FadeIn key={m.name} delay={0.1 + i * 0.05}>
          <MemberCard member={m} />
        </FadeIn>
      ))}
    </>
  );
}
