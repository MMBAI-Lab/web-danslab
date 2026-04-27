"use client";

import { usePathname } from "next/navigation";
import { detectLang } from "@/lib/i18n";
import { COMMON } from "@/data/content/common";

export default function Footer() {
  const pathname = usePathname() || "/";
  const lang = detectLang(pathname);
  const dict = COMMON[lang].footer;
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {dict.rights}
        </p>
        <p>{dict.affiliation}</p>
      </div>
    </footer>
  );
}
