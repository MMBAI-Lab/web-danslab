import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/research", label: "Research" },
  { href: "/members", label: "Members" },
  { href: "/publications", label: "Publications" },
  { href: "/outreach", label: "Outreach" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
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
        <div className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
      {/* invert the logo only in dark theme so the black artwork reads as light */}
      <style>{`
        :root[data-theme="dark"] .logo-mark { filter: invert(1); }
      `}</style>
    </header>
  );
}
