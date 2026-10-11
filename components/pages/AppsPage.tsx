import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FloatingBases from "@/components/FloatingBases";
import { COMMON } from "@/data/content/common";
import { getApps, type LabApp } from "@/lib/apps";
import { localizePath, type Lang } from "@/lib/i18n";

export default function AppsPage({ lang }: { lang: Lang }) {
  const dict = COMMON[lang];
  const apps = getApps(lang);

  return (
    <>
      <FloatingBases className="fixed inset-0 z-0 opacity-40" density={0.7} />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {dict.nav.apps}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {dict.nav.apps}
          </h1>
          <p className="mt-5 max-w-prose leading-relaxed text-muted">
            {dict.apps.intro}
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {apps.map((a, i) => (
            <FadeIn key={a.slug} delay={0.05 * i}>
              <AppCard app={a} lang={lang} />
            </FadeIn>
          ))}
        </div>
      </div>
    </>
  );
}

function AppCard({ app, lang }: { app: LabApp; lang: Lang }) {
  const dict = COMMON[lang].apps;
  const live = app.url.length > 0;

  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-7 transition hover:border-accent/60">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-mono text-2xl font-semibold tracking-tight text-ink">
          {app.name}
        </h2>
        {!live && (
          <span className="flex-none rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-subtle">
            {dict.coming_soon}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-accent">{app.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{app.description}</p>
      <ul className="mt-5 space-y-1.5 text-sm text-muted">
        {app.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-accent" aria-hidden="true">›</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-7">
        {live ? (
          <Link
            href={localizePath(lang, `/apps/${app.slug}`)}
            className="rounded bg-accent px-4 py-2 text-sm font-semibold text-bg transition hover:opacity-90"
          >
            {dict.launch}
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="cursor-not-allowed rounded border border-border px-4 py-2 text-sm font-semibold text-subtle"
          >
            {dict.launch}
          </span>
        )}
        {app.repo && (
          <a
            href={app.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-border px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
          >
            {dict.repo}
          </a>
        )}
      </div>
    </article>
  );
}
