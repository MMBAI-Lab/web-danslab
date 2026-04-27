import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import FadeIn from "@/components/FadeIn";
import { listGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = { title: "ARN for Export" };

const ARTISTS = [
  {
    name: "Martina Buroni",
    body:
      "Artista visual y escenógrafa con formación en escultura y artes aplicadas. Su trabajo articula conceptualización artística, creación escénica, instalación y escultura en diálogo con el espacio vivo.",
  },
  {
    name: "Mariana Barraco",
    body:
      "Artista, docente, directora del Atelier Mari Barraco. Su enfoque multidisciplinario combina dibujo, pintura, cerámica, escultura y arte digital. Diseña experiencias artísticas que democratizan el arte y transforman los espacios.",
  },
  {
    name: "Nito Cilintano",
    body:
      "Artista visual, realizador audiovisual y docente universitario. Trabaja en la intersección entre tecnología, espacialidad y percepción, desarrollando instalaciones y piezas audiovisuales con enfoque escénico y performativo.",
  },
  {
    name: "Pablo Dans",
    body:
      "Investigador, docente y divulgador científico. Experto internacional en estructura de ácidos nucleicos (ADN y ARN) y en técnicas de química computacional, modelado molecular, simulaciones y bioinformática estructural.",
  },
];

export default function ARNforExportPage() {
  const images = listGalleryImages("outreach/arn-for-export");

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
          ARN for Export
        </h1>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.25em] text-accent">
          Instalación arte × ciencia · Texto en español
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-10 max-w-prose space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Durante décadas creímos que el ARN actuaba solo dentro de la
            célula: llevando instrucciones, regulando procesos biológicos
            fundamentales, dando forma a la vida. En el mejor de los casos, el
            ARN era capaz de viajar de célula en célula protegido dentro de
            vesículas.
          </p>
          <p>
            Pero científicos uruguayos descubrieron que también hay ARN fuera
            de la célula, viajando por sí solo, flotando, haciendo de puente
            comunicativo entre células, transformando nuestra comprensión del
            cuerpo.
          </p>
          <p>
            Este hallazgo escribe una nueva página de la biología y abre
            caminos para la medicina, materializando lo invisible, lo que era
            imposible: moléculas de ARN flotando, que ahora toman forma,
            volumen y presencia.
          </p>
        </div>
      </FadeIn>

      <Section title="Contexto científico">
        <p>
          Juan Pablo Tosar, Alfonso Cayota y colaboradores de la Universidad de
          la República y del Instituto Pasteur de Montevideo descubrieron por
          primera vez que las moléculas de ARN pueden operar fuera de las
          células, por sí solas, sin la ayuda de vesículas. Ribosomas, ARN de
          transferencia (ARNt) y dímeros de mitades de ARNt navegan entre las
          células, en el espacio extracelular. Llevan información de célula a
          célula, comunicando.
        </p>
        <p>
          Este hallazgo abre nuevas posibilidades para diagnósticos médicos
          innovadores y el tratamiento de enfermedades. En un proyecto lateral,
          los investigadores Leonardo Darré y Pablo D. Dans (también
          pertenecientes a la UdelaR y el Instituto Pasteur) aplicaron métodos
          computacionales para determinar la estructura tridimensional (3D) de
          estos ARN extracelulares, dándole estructura a lo invisible.
          Dibujando una nueva forma de comunicación celular.
        </p>
      </Section>

      <Section title="El descubrimiento">
        <p>
          El ARN (ácido ribonucleico), primo de nuestro ADN, es una molécula
          fundamental que juega un papel crucial en la síntesis de proteínas.
          El ARN ganó mucha notoriedad durante la pandemia, ya que las vacunas
          contra el COVID de algunas farmacéuticas están basadas en esta
          molécula. Esto se debe a que es una molécula muy versátil, que puede
          cumplir varios roles. El ARN es capaz de llevar, desde el núcleo
          celular al citoplasma, un mensaje que obtuvo de nuestro ADN y una
          vez en el citoplasma, es capaz de leer dicho mensaje y producir las
          proteínas esenciales para la vida.
        </p>
        <p>
          De este modo, los ARN mensajeros (ARNm) cargan con el mensaje, los
          ARN de transferencia (ARNt) son los que traducen el mensaje a
          proteínas, y los ARN ribosomales (ARNr) son las usinas donde la
          producción ocurre. Moléculas de ARN largas no-codificantes (ARNln) y
          cortas de interferencia (ARNsi), entre otras, son las encargadas de
          regular finamente todo el proceso de producción.
        </p>
        <p>
          Siempre se consideró que las funciones de los ARN ocurrían entre
          membranas, es decir en el interior de las células o vesículas. Sin
          embargo, la serendipia y las mentes entrenadas de los científicos
          uruguayos lograron identificar moléculas de ARN con funciones fuera
          de la célula, denominadas ARN extracelulares que no dependen de
          vesículas.
        </p>
        <p>
          Conocer la estructura de estas moléculas es fundamental para
          entender cómo interactúan en los sistemas biológicos, pero además
          permite materializar algo abstracto que ocurre en el espacio
          extracelular, en un objeto 3D que tiene superficie y volumen.
          Ayudados por los métodos de la química computacional, el equipo de
          investigadores uruguayos también logró determinar la forma 3D que
          tienen en el espacio y qué tan flexibles y estables son.
        </p>
      </Section>

      <Section title="La instalación artística">
        <p>
          ARN for Export es una instalación sensorial que traduce este
          descubrimiento al lenguaje de los sentidos. A través de una
          composición de materiales diversos, espacio sonoro, fractales y un
          núcleo holográfico, los visitantes ingresan a un espacio inspirado
          en el universo extracelular.
        </p>
        <p>
          El espacio, diseñado como una caja de exportación simbólica desde
          Uruguay al mundo y desde el interior celular al espacio
          extracelular, invita a explorar lo invisible: el viaje molecular, la
          comunicación entre células y la poesía del descubrimiento.
        </p>
        <p className="text-sm text-subtle">
          Esta propuesta artística fue posible gracias a la partida para
          divulgación de un proyecto concursable Fondo Clemente Estable de la
          ANII (Leonardo Darré y Pablo Dans) y el Fondo Regional para la
          Cultura del Ministerio de Educación (MEC), Uruguay (Nito Cilintano —
          responsable—, Martina Buroni, Mariana Barraco y Pablo Dans).
        </p>
      </Section>

      <Section title="El proceso creativo">
        <p>
          La instalación propone una interpretación atmosférica del espacio
          extracelular. A partir de una exploración material, se construyeron
          formas distorsionadas que generan volúmenes, huecos y translucidez,
          dotando al espacio de una presencia orgánica y envolvente.
        </p>
        <p>
          El uso de una paleta cromática reducida —blanco y rojo— permite que
          la forma se revele a través de la luz interior, mientras que la
          iluminación roja sugiere una experiencia íntima, casi visceral. El
          entorno sonoro, compuesto por ecos y susurros con palabras clave,
          simula el viaje del ARN como portador de mensajes, completando una
          experiencia inmersiva que conecta cuerpo, materia y lenguaje.
        </p>
        <p>
          El exterior del espacio toma la forma de una caja de exportación,
          una decisión conceptual que vincula la ciencia con el acto de
          compartir conocimiento. Así como el ARN transporta información entre
          células, esta instalación se concibe como un contenedor simbólico
          desde el cual el conocimiento generado localmente puede proyectarse
          hacia el mundo.
        </p>
      </Section>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          Realización
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {ARTISTS.map((a) => (
            <article
              key={a.name}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">
                {a.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {a.body}
              </p>
            </article>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-20 font-serif text-2xl font-semibold tracking-tight text-ink">
          Galería
        </h2>
        <div className="mt-6">
          <Gallery images={images} alt="ARN for Export installation" />
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-20 rounded-lg border border-border bg-surface p-8 text-center">
          <p className="text-muted">
            Si te gustaría tener la instalación ARN for Export en tu espacio
            educativo o cultural, contáctanos.
          </p>
          <p className="mt-4">
            <a
              href="mailto:arnforexport@gmail.com"
              className="text-accent underline-offset-4 hover:underline"
            >
              arnforexport@gmail.com
            </a>
          </p>
          <p className="mt-6 text-xs text-subtle">
            Copyright DansLab &amp; Atelier Mari Barraco — 2025
          </p>
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
