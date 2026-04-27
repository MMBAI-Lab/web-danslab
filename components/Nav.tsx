"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import LangSwitch from "@/components/LangSwitch";
import { detectLang, localizePath } from "@/lib/i18n";
import { COMMON } from "@/data/content/common";

const SECTIONS = [
  { path: "research", key: "research" as const },
  { path: "members", key: "members" as const },
  { path: "publications", key: "publications" as const },
  { path: "outreach", key: "outreach" as const },
  { path: "contact", key: "contact" as const },
];

export default function Nav() {
  const pathname = usePathname() || "/";
  const lang = detectLang(pathname);
  const dict = COMMON[lang].nav;
  const home = localizePath(lang, "/");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={home}
          className="flex items-center gap-3 text-ink hover:text-accent"
        >
          <Image
            src="/figures/WEBDansLab_logoBLACK.png"
            alt="DansLab"
            width={36}
            height={36}
            className="h-9 w-9 object-contain logo-mark"
            priority
          />
          <span className="font-serif text-xl font-semibold tracking-tight">
            DansLab
          </span>
        </Link>
        <div className="flex items-center gap-5 md:gap-7">
          <ul className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            {SECTIONS.map((s) => (
              <li key={s.path}>
                <Link
                  href={localizePath(lang, `/${s.path}`)}
                  className="hover:text-ink"
                >
                  {dict[s.key]}
                </Link>
              </li>
            ))}
          </ul>
          <LangSwitch />
          <ThemeToggle />
        </div>
      </nav>
      {/* On dark theme, invert + hue-rotate so the black artwork reads as light
          while preserving the red nucleus (red ↔ red under hue-rotate(180deg)). */}
      <style>{`
        :root[data-theme="dark"] .logo-mark { filter: invert(1) hue-rotate(180deg); }
      `}</style>
    </header>
  );
}
