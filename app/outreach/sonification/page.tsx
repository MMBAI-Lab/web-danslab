import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import FadeIn from "@/components/FadeIn";
import { listGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = { title: "Sonification" };

const EXAMPLES = [
  {
    title:
      "Music from protein sequences, with musicality enhanced through a computer program that learns from Chopin.",
    cite: "Tay. Heliyon. 2021",
  },
  {
    title:
      "Conversion of amino acid sequences in proteins into classical music: a search for auditory patterns.",
    cite: "Takahashi. Genome Biology. 2007",
  },
  {
    title:
      "A musical approach to the interpretation of gene expression data using neuroblastoma cell lines.",
    cite: "Staege. Scientific Reports. 2015",
  },
  {
    title: "Musical patterns for comparative epigenomics.",
    cite: "Brocks. Clinical Epigenetics. 2015",
  },
  {
    title:
      "SNARE Dance: a musical interpretation of Atg9 transport to the tubulovesicular cluster.",
    cite: "Takahashi. Autophagy. 2012",
  },
  {
    title:
      "Hydrogen-bond heterogeneity correlates with transition-state passage time in protein folding.",
    cite: "Scaletti. PNAS. 2024",
  },
];

export default function SonificationPage() {
  const images = listGalleryImages("outreach/sonification");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <Link
          href="/outreach"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-subtle hover:text-accent"
        >
          ← Outreach
        </Link>
        <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Molecular Sonification
        </h1>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.25em] text-accent">
          DNA → Music
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <p className="mt-10 max-w-prose text-lg leading-relaxed text-muted">
          A fusion of DNA structure, its interaction with the biological
          environment, and musical composition. An invitation to{" "}
          <span className="text-ink">hear the molecule of life</span> through
          physical properties extracted from simulations and turned into
          audible signals.
        </p>
      </FadeIn>

      <Section title="What is sonification?">
        <p>
          Sonification is a way of turning data into sound so we can understand
          it better. Instead of displaying information in graphs or tables, it
          is transformed into acoustic signals that we can hear. In this way,
          what would normally be a series of numbers or measurements becomes a
          &ldquo;soundscape&rdquo; that reflects how a phenomenon, experiment,
          or model behaves.
        </p>
        <p>
          This process is not automatic; someone has to decide which data will
          be transformed and how they will sound. For example, a higher sensor
          reading can be turned into a higher pitch, or a sudden change in a
          measurement can be heard as a strike or a shift in rhythm. In this
          way, sonification opens up a new path for exploring, interpreting,
          and communicating information by taking advantage of our natural
          ability to recognize patterns in what we hear.
        </p>
        <p>
          One of the most useful applications is the Geiger counter — a device
          used to detect radiation, something our senses cannot perceive
          directly. Each radioactive particle that enters the detector is
          translated into an audible click, those familiar
          &ldquo;crackling&rdquo; sounds that become more frequent as the
          radiation grows more intense. There are also more poetic examples,
          such as NASA&rsquo;s sonifications of distant galaxies (
          <a
            href="https://www.nasa.gov/marshall"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            nasa.gov/marshall
          </a>
          ) or ocean data (
          <a
            href="https://accessibleoceans.whoi.edu/what-is-sonification/"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            WHOI
          </a>
          ).
        </p>
      </Section>

      <Section title="Examples of molecular sonification">
        <ul className="space-y-4">
          {EXAMPLES.map((e, i) => (
            <li key={i} className="rounded-lg border border-border bg-surface p-5">
              <p className="text-ink">{e.title}</p>
              <p className="mt-1 text-sm italic text-subtle">{e.cite}</p>
            </li>
          ))}
        </ul>
        <blockquote className="mt-6 border-l-2 border-accent pl-5 italic text-subtle">
          &ldquo;Despite the filtering and rearrangement of the probe sets, the
          resulting melodies in the examples presented are quite abstract, and
          their evocative potential is difficult to predict. It seems likely
          that familiarity with such melodies would be achieved more quickly
          if dissonances from familiar melodies were heard.&rdquo;
        </blockquote>
        <blockquote className="mt-4 border-l-2 border-accent pl-5 italic text-subtle">
          &ldquo;After assigning instruments to each protein score, we went on
          to combine the individual scores into a final orchestration.&rdquo;
        </blockquote>
      </Section>

      <Section title="The science behind it">
        <p>
          Molecular dynamics simulations are computer simulations that make it
          possible to observe how the molecules that make up life — proteins,
          DNA, RNA — move and change over time. They work by applying the laws
          of physics to each atom, allowing us to follow their trajectories as
          if we had a virtual microscope capable of seeing at the atomic level
          and in slow motion.
        </p>
        <p>
          These simulations are extremely useful because they allow us to
          explore phenomena that are impossible to observe directly in the
          lab, such as exactly how a DNA sequence bends, folds, or becomes
          more rigid depending on the combination of letters (bases) that make
          it up. Thanks to this approach, it has become clear that the
          physical properties of DNA — flexibility, rigidity, and tendency to
          bend — depend strongly on its sequence.
        </p>
        <p>
          A key role in this progress has been played, and continues to be
          played, by the{" "}
          <span className="text-ink">Ascona B-DNA Consortium</span> (ABC), an
          international collaboration of researchers that has been generating
          DNA simulations since the early 2000s, establishing standards and
          databases that are now essential references in the field. DansLab
          has been part of the ABC Consortium since 2014 and was the most
          recent organizer of the ABC conference, held in April 2023 in
          Ascona, Switzerland (
          <Link
            href="/outreach/abc-2023"
            className="text-accent underline-offset-4 hover:underline"
          >
            see ABC 2023
          </Link>
          ).
        </p>
        <p className="text-sm text-subtle">
          Reference:{" "}
          <a
            href="https://doi.org/10.1093/nar/gkz905"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            doi.org/10.1093/nar/gkz905
          </a>
        </p>
      </Section>

      <Section title="Our approach">
        <blockquote className="border-l-2 border-accent pl-5 italic text-subtle">
          Realizing that sonifications that are difficult or fatiguing to
          listen to will be less successful, some valiant attempts have been
          made to incorporate some elements of composition into the sound
          mappings. As music is designed to engage and hold the listener&rsquo;s
          interest, surely a sonification that is more musical will be better
          than one that is not. Unfortunately, sonifications purportedly
          designed to be musical are often still fatiguing or unengaging.
          Conversely, the goal of communicating essential information can be
          masked in the effort to achieve a stronger musical expression.
          <footer className="mt-3 not-italic text-xs text-subtle">
            Vickers, P. (2017). Sonification and music, music and sonification.
            In Cobussen, M., Meelberg, V., &amp; Truax, B. (eds.),{" "}
            <em>The Routledge Companion to Sounding Art</em>, 135–144.
            Routledge, Oxford.
          </footer>
        </blockquote>
        <p className="mt-6">
          Trying to follow the balance between data and composition described
          by Vickers, we transformed the interaction between DNA and potassium
          cations (K<sup>+</sup>).
        </p>
        <p>
          For all possible four-letter sequences, the interaction in the major
          and minor grooves of DNA was measured. The groove-interaction
          frequencies were multiplied by a factor to bring them into the human
          audible range. The resulting values were then rounded by mapping the
          frequencies to the nearest note in the tempered scale.
        </p>
      </Section>

      <Section title="DNA Music">
        <p>
          As a pilot test, the 13 miniABC sequences were joined into a single
          long sequence of <span className="text-ink">234 letters</span> (A, C,
          G, and T) and turned into music using piano and violin. The{" "}
          <span className="text-accent">red notes</span> represent DNA–K<sup>+</sup>{" "}
          interactions in the minor groove, and the{" "}
          <span className="text-blue-400">blue notes</span> in the major
          groove. The black notes are part of the musical composition.
        </p>
        <p className="text-sm text-subtle">Available on YouTube — link to be added.</p>
      </Section>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          Creators
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-serif text-lg font-semibold text-ink">
              Nicolás Molla
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Musician, composer, and music producer. He has created music for
              film, advertising, and social projects, and now works as an
              independent producer in his own studio (
              <a
                href="https://nicomolla.com/"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                nicomolla.com
              </a>
              ).
            </p>
          </article>
          <article className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-serif text-lg font-semibold text-ink">
              Pablo Dans
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Researcher, teacher, and science communicator. International
              expert in nucleic acid structure (DNA and RNA) and in
              computational chemistry, molecular modeling, simulations, and
              structural bioinformatics.
            </p>
          </article>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          Materials
        </h2>
        <div className="mt-6">
          <Gallery images={images} alt="Sonification project" />
        </div>
      </FadeIn>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <FadeIn>
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
        <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-muted">
          {children}
        </div>
      </section>
    </FadeIn>
  );
}
