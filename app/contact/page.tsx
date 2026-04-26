import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink">
        Contact
      </h1>

      <div className="mt-12 space-y-10 text-muted">
        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">
            Principal Investigator
          </h2>
          <p className="mt-3">Prof. Pablo D. Dans</p>
          <p>
            Email:{" "}
            <a
              href="mailto:pdans@pasteur.edu.uy"
              className="text-accent underline-offset-4 hover:underline"
            >
              pdans@pasteur.edu.uy
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Address</h2>
          <p className="mt-3 leading-relaxed">
            Department of Biological Sciences (DCB)
            <br />
            CENUR Litoral Norte
            <br />
            Universidad de la República
            <br />
            Salto, Uruguay
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">
            Joining the lab
          </h2>
          <p className="mt-3 leading-relaxed">
            Prospective students and postdocs interested in molecular modeling,
            simulations, or AI for structural biology are welcome to reach out
            with a short statement of interest and a CV.
          </p>
        </section>
      </div>
    </div>
  );
}
