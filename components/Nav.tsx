"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import LangSwitch from "@/components/LangSwitch";
import { detectLang, localizePath } from "@/lib/i18n";
import { COMMON } from "@/data/content/common";
import { asset } from "@/lib/asset";

const SECTIONS = [
  { path: "research", key: "research" as const },
  { path: "members", key: "members" as const },
  { path: "publications", key: "publications" as const },
  { path: "collaborators", key: "collaborators" as const },
  { path: "courses", key: "courses" as const },
  { path: "outreach", key: "outreach" as const },
  { path: "contact", key: "contact" as const },
];

export default function Nav() {
  const pathname = usePathname() || "/";
  const lang = detectLang(pathname);
  const dict = COMMON[lang].nav;
  const home = localizePath(lang, "/");

  const [menuOpen, setMenuOpen] = useState(false);

  // Close the drawer on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href={home}
            className="flex items-center gap-3 text-ink hover:text-accent"
          >
            <Image
              src={asset("/figures/WEBDansLab_logoBLACK.png")}
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
            {/* Mobile-only menu trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              className="flex h-9 w-9 items-center justify-center rounded border border-border text-ink transition hover:border-accent hover:text-accent md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </nav>
        <style>{`
          :root[data-theme="dark"] .logo-mark { filter: invert(1) hue-rotate(180deg); }
        `}</style>
      </header>

      {/* Mobile drawer (only mounted when open) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          id="mobile-nav-drawer"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="nav-drawer relative h-full w-72 max-w-[82vw] border-r border-border bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Link
                href={home}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-ink"
              >
                <Image
                  src={asset("/figures/WEBDansLab_logoBLACK.png")}
                  alt="DansLab"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain logo-mark"
                />
                <span className="font-serif text-base font-semibold">DansLab</span>
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded text-muted transition hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col gap-0.5 p-3">
              {SECTIONS.map((s) => {
                const target = localizePath(lang, `/${s.path}`);
                const active =
                  pathname === target || pathname.startsWith(`${target}/`);
                return (
                  <li key={s.path}>
                    <Link
                      href={target}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded px-3 py-2.5 text-sm font-medium transition ${
                        active
                          ? "bg-elevated text-accent"
                          : "text-muted hover:bg-elevated hover:text-ink"
                      }`}
                    >
                      {dict[s.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
          <style>{`
            .nav-drawer { animation: nav-slide-in 0.22s cubic-bezier(0.2, 0.7, 0.3, 1); }
            @keyframes nav-slide-in {
              from { transform: translateX(-100%); }
              to   { transform: translateX(0); }
            }
            @media (prefers-reduced-motion: reduce) {
              .nav-drawer { animation: none; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
