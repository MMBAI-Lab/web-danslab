import type { Lang } from "@/lib/i18n";

export type HomeContent = {
  eyebrow: string;
  title_pre: string;
  title_accent: string;
  title_post: string;
  intro: string;
  cta_research: string;
  cta_team: string;
  about_eyebrow: string;
  about_title: string;
  about_paragraphs: string[];
  about_cite_html: string;
  whatwedo_eyebrow: string;
  whatwedo_title: string;
  whatwedo_cards: { title: string; body: string }[];
  staff_eyebrow: string;
  staff_title: string;
  staff_link: string;
  quicklinks_title: string;
  quicklinks: { label: string; href: string }[];
};

const en: HomeContent = {
  eyebrow: "Molecular Modeling · Bioinformatics · AI",
  title_pre: "Decoding the dynamic life of ",
  title_accent: "macromolecules",
  title_post: ".",
  intro:
    "At DansLab we use molecular modeling, in silico simulations, structural bioinformatics, and AI to understand the complex, dynamic roles of nucleic acids and proteins inside the cell — from atoms to systems.",
  cta_research: "Explore our research",
  cta_team: "Meet the team",
  about_eyebrow: "About us",
  about_title:
    "A multiscale view of macromolecules in their biological context.",
  about_paragraphs: [
    `The Dans Lab, also known as the <strong class="text-ink">Molecular Modeling, Bioinformatics and AI (MMBAI)</strong> group, is part of the <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://dcb.litoralnorte.udelar.edu.uy/">Department of Biological Sciences (DCB)</a> at the <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://www.litoralnorte.udelar.edu.uy/">Regional University Center (CENUR)</a> in Salto, <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://udelar.edu.uy/">University of the Republic (UdelaR)</a>, located in the northern riverside region of Uruguay (Litoral Norte).`,
    "At the Dans Lab we are driven by a deep fascination with macromolecules' complex and dynamic roles within their biological contexts. We employ molecular modeling, in silico simulations, and structural bioinformatics to explore these intricate processes, adopting a multiscale perspective to uncover new insights.",
  ],
  about_cite_html: `Dans et al. <em>Curr. Op. Struct. Bio.</em>, 37, 29–45 (2016) · <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1D8psUHJGNJC4DQ6UlKJhH0RG2pmOyUoy/view">PDF</a>`,
  whatwedo_eyebrow: "What we do",
  whatwedo_title: "From electrons to nucleosomes.",
  whatwedo_cards: [
    {
      title: "Molecular dynamics",
      body: "Multiscale simulations — from all-atom MD to coarse-grained models — to probe conformational landscapes and macromolecular flexibility.",
    },
    {
      title: "Structural bioinformatics",
      body: "Sequence-to-structure-to-function pipelines, with a focus on DNA, RNA, and protein complexes in their cellular context.",
    },
    {
      title: "AI for biomolecules",
      body: "Geometric deep learning and generative models to predict structure, dynamics, and interactions of nucleic acids and proteins.",
    },
  ],
  staff_eyebrow: "Current staff",
  staff_title: "The team behind the science.",
  staff_link: "All members →",
  quicklinks_title: "Quick links",
  quicklinks: [
    { label: "Research lines", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Outreach", href: "/outreach" },
    { label: "Join the group", href: "/contact" },
  ],
};

const es: HomeContent = {
  eyebrow: "Modelado Molecular · Bioinformática · IA",
  title_pre: "Descifrando la vida dinámica de las ",
  title_accent: "macromoléculas",
  title_post: ".",
  intro:
    "En DansLab usamos modelado molecular, simulaciones in silico, bioinformática estructural e IA para comprender los roles complejos y dinámicos de los ácidos nucleicos y las proteínas dentro de la célula — desde los átomos a los sistemas.",
  cta_research: "Conocé nuestra investigación",
  cta_team: "Conocé al equipo",
  about_eyebrow: "Sobre nosotros",
  about_title:
    "Una mirada multiescala de las macromoléculas en su contexto biológico.",
  about_paragraphs: [
    `El Dans Lab, también conocido como el grupo de <strong class="text-ink">Modelado Molecular, Bioinformática e IA (MMBAI)</strong>, es parte del <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://dcb.litoralnorte.udelar.edu.uy/">Departamento de Ciencias Biológicas (DCB)</a> del <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://www.litoralnorte.udelar.edu.uy/">Centro Universitario Regional (CENUR)</a> en Salto, <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://udelar.edu.uy/">Universidad de la República (UdelaR)</a>, en el Litoral Norte de Uruguay.`,
    "En el Dans Lab nos mueve una profunda fascinación por los roles complejos y dinámicos de las macromoléculas en sus contextos biológicos. Empleamos modelado molecular, simulaciones in silico y bioinformática estructural para explorar estos procesos, adoptando una perspectiva multiescala que nos permite descubrir nuevas claves.",
  ],
  about_cite_html: `Dans et al. <em>Curr. Op. Struct. Bio.</em>, 37, 29–45 (2016) · <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1D8psUHJGNJC4DQ6UlKJhH0RG2pmOyUoy/view">PDF</a>`,
  whatwedo_eyebrow: "Qué hacemos",
  whatwedo_title: "De los electrones a los nucleosomas.",
  whatwedo_cards: [
    {
      title: "Dinámica molecular",
      body: "Simulaciones multiescala — desde modelos atomísticos a coarse-grained — para explorar paisajes conformacionales y la flexibilidad de macromoléculas.",
    },
    {
      title: "Bioinformática estructural",
      body: "Pipelines de secuencia a estructura a función, con foco en complejos de ADN, ARN y proteínas en su contexto celular.",
    },
    {
      title: "IA para biomoléculas",
      body: "Deep learning geométrico y modelos generativos para predecir estructura, dinámica e interacciones de ácidos nucleicos y proteínas.",
    },
  ],
  staff_eyebrow: "Equipo actual",
  staff_title: "El equipo detrás de la ciencia.",
  staff_link: "Ver todo el equipo →",
  quicklinks_title: "Enlaces rápidos",
  quicklinks: [
    { label: "Líneas de investigación", href: "/research" },
    { label: "Publicaciones", href: "/publications" },
    { label: "Divulgación", href: "/outreach" },
    { label: "Sumate al grupo", href: "/contact" },
  ],
};

export const HOME: Record<Lang, HomeContent> = { en, es };
