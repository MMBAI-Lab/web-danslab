import Link from "next/link";

const links = [
  { href: "/research", label: "Research" },
  { href: "/members", label: "Members" },
  { href: "/publications", label: "Publications" },
  { href: "/outreach", label: "Outreach" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-serif text-xl font-semibold tracking-tight text-ink hover:text-accent"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          DansLab
        </Link>
        <ul className="flex items-center gap-7 text-sm font-medium text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
