import AppFrame from "@/components/AppFrame";
import { COMMON } from "@/data/content/common";
import type { LabApp } from "@/lib/apps";
import type { Lang } from "@/lib/i18n";

// Host page for an app deployed from its own repo. When `embed` is on, the
// app is framed full-width below a slim header; otherwise we link out.
// No back link here: the main nav already carries Apps, and the embedded app
// wants every pixel of height it can get.
export default function AppDetailPage({ lang, app }: { lang: Lang; app: LabApp }) {
  const dict = COMMON[lang].apps;
  const live = app.url.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-mono text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {app.name}
          </h1>
          <p className="mt-2 max-w-prose text-sm text-muted">{app.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {live && (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              {dict.open_new_tab}
            </a>
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
      </div>

      {live && app.embed ? (
        <AppFrame src={app.url} title={app.name} />
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-border bg-surface p-10 text-center text-sm text-subtle">
          {live ? (
            <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              {dict.open_new_tab}
            </a>
          ) : (
            dict.not_deployed
          )}
        </div>
      )}
    </div>
  );
}
