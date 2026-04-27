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
  about_pillars: { kicker: string; title: string }[];
  whatwedo_eyebrow: string;
  whatwedo_title: string;
  whatwedo_cards: { title: string; body: string }[];
  whatwedo_repo_label: string;
  whatwedo_repo_url: string;
  whatwedo_repo_url_label: string;
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
    `At the Dans Lab we are driven by a deep fascination with macromolecules' complex and dynamic roles within their biological contexts. We employ molecular modeling, in silico simulations, structural bioinformatics, and genome-wide data mining to explore these intricate processes, adopting a multiscale perspective to uncover new insights. Our lab is centered on <strong class="text-ink">Nucleic Acids</strong> (structure, dynamics and oligo-based therapies) and <strong class="text-ink">Bacterial Resistance</strong> (basic mechanisms and applied treatments). 90% of the work at DansLab is theoretical (in silico), but we also run a wet-lab facility where some experiments are carried out.`,
  ],
  about_pillars: [
    {
      kicker: "Nucleic acids",
      title: "From structure and dynamics to oligo-based therapeutics",
    },
    {
      kicker: "Bacterial resistance",
      title: "From basic discovery to treatments",
    },
  ],
  whatwedo_eyebrow: "What we do",
  whatwedo_title: "From electrons, through chromosomes, to whole cells and bacteria.",
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
    {
      title: "Genome-wide data mining",
      body: "Mining of bacterial genomes to identify resistance determinants, virulence factors, and signatures of horizontal gene transfer across pathogens.",
    },
    {
      title: "QM calculations",
      body: "Quantum mechanics and DFT calculations to derive atomic charges and parameters that feed all-atom force-field development for nucleic acids and modified bases.",
    },
    {
      title: "Molecular modeling",
      body: "Docking, interaction potentials, homology modeling, and 2D/3D structure prediction and visualization of macromolecular complexes.",
    },
  ],
  whatwedo_repo_label: "Open code, datasets and tools we share with the community",
  whatwedo_repo_url: "https://github.com/MMBAI-Lab",
  whatwedo_repo_url_label: "github.com/MMBAI-Lab",
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
    `En el Dans Lab nos mueve una profunda fascinación por los roles complejos y dinámicos de las macromoléculas en sus contextos biológicos. Empleamos modelado molecular, simulaciones in silico, bioinformática estructural y minería de datos a escala genómica para explorar estos procesos, adoptando una perspectiva multiescala que nos permite descubrir nuevas claves. Nuestro laboratorio se centra en <strong class="text-ink">Ácidos Nucleicos</strong> (estructura, dinámica y terapias basadas en oligonucleótidos) y en <strong class="text-ink">Resistencia Bacteriana</strong> (mecanismos básicos y tratamientos aplicados). El 90% del trabajo en DansLab es teórico (in silico), aunque también contamos con un laboratorio húmedo donde se realizan algunos experimentos.`,
  ],
  about_pillars: [
    {
      kicker: "Ácidos nucleicos",
      title: "De la estructura y dinámica a las terapias basadas en oligonucleótidos",
    },
    {
      kicker: "Resistencia bacteriana",
      title: "Del descubrimiento básico a los tratamientos",
    },
  ],
  whatwedo_eyebrow: "Qué hacemos",
  whatwedo_title: "De los electrones, pasando por los cromosomas, hasta las células completas y las bacterias.",
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
    {
      title: "Minería de datos genómicos",
      body: "Minería de genomas bacterianos para identificar determinantes de resistencia, factores de virulencia y señales de transferencia horizontal de genes entre patógenos.",
    },
    {
      title: "Cálculos QM",
      body: "Cálculos de mecánica cuántica y DFT para derivar cargas atómicas y parámetros que alimentan el desarrollo de campos de fuerzas all-atom para ácidos nucleicos y bases modificadas.",
    },
    {
      title: "Modelado molecular",
      body: "Docking, potenciales de interacción, modelado por homología y predicción/visualización 2D/3D de complejos macromoleculares.",
    },
  ],
  whatwedo_repo_label: "Código, datasets y herramientas que compartimos con la comunidad",
  whatwedo_repo_url: "https://github.com/MMBAI-Lab",
  whatwedo_repo_url_label: "github.com/MMBAI-Lab",
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
