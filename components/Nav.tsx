import Link from "next/link";
import Image from "next/image";

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
            className="h-9 w-9 object-contain invert"
            priority
          />
          <span className="font-serif text-xl font-semibold tracking-tight">
            DansLab
          </span>
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
