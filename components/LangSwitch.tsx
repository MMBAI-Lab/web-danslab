"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { detectLang, localizePath } from "@/lib/i18n";
import { COMMON } from "@/data/content/common";

export default function LangSwitch() {
  const pathname = usePathname() || "/";
  const lang = detectLang(pathname);
  const other = lang === "en" ? "es" : "en";
  const target = localizePath(other, pathname);
  const labels = COMMON[lang].langSwitch;
  return (
    <Link
      href={target}
      aria-label={`Switch to ${other === "en" ? "English" : "Spanish"}`}
      className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs font-semibold uppercase tracking-widest text-muted transition hover:border-accent hover:text-accent"
    >
      {lang === "en" ? labels.es : labels.en}
    </Link>
  );
}
