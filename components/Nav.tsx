import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/members", label: "Members" },
  { href: "/publications", label: "Publications" },
  { href: "/outreach", label: "Outreach" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-ink">
          DansLab
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-ink/80">
          {links.slice(1).map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-accent">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
