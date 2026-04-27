import FadeIn from "@/components/FadeIn";
import { COMMON } from "@/data/content/common";
import type { Lang } from "@/lib/i18n";

export default function ContactPage({ lang }: { lang: Lang }) {
  const c = COMMON[lang].contact;
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <FadeIn>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {c.eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {c.title}
        </h1>
      </FadeIn>

      <div className="mt-14 space-y-12 text-muted">
        <FadeIn>
          <section>
            <h2 className="font-serif text-xl font-semibold text-ink">
              {c.address_heading}
            </h2>
            <p className="mt-3 leading-relaxed">
              Computational Biophysics Group
              <br />
              Plataforma de investigación
              <br />
              Departamento de Ciencias Biológicas
              <br />
              CENUR Litoral Norte, sede Salto
              <br />
              Universidad de la República
              <br />
              Gral. Rivera 1350, CP 50000, Salto, Salto
              <br />
              Uruguay
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.05}>
          <section>
            <h2 className="font-serif text-xl font-semibold text-ink">
              {c.pi_heading}
            </h2>
            <p className="mt-3">Prof. Pablo D. Dans</p>
            <p className="mt-2 text-sm">
              <a
                href="mailto:pablo.dans@unorte.edu.uy"
                className="text-accent underline-offset-4 hover:underline"
              >
                pablo.dans@unorte.edu.uy
              </a>
              <br />
              <a
                href="mailto:pdans@pasteur.edu.uy"
                className="text-accent underline-offset-4 hover:underline"
              >
                pdans@pasteur.edu.uy
              </a>
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section>
            <h2 className="font-serif text-xl font-semibold text-ink">
              {c.join_heading}
            </h2>
            <p className="mt-3 leading-relaxed">{c.join_body}</p>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
