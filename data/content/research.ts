import type { Lang } from "@/lib/i18n";

export type ResearchProject = {
  title: string;
  kind: string;
  duration: string;
  role: string;
  scope: string;
  summary: string;
  url?: string;
};

export type ResearchContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  cover_caption_html: string;
  projects_heading: string;
  projects_subtitle: (n: number) => string;
  projects: ResearchProject[];
};

const en_projects: ResearchProject[] = [
  {
    title: "CEIBOS — Centro de Estudios Interdisciplinarios de Biodiversidad Orientado a aplicaciones en Salud",
    kind: "Interdisciplinary Center (EI)",
    duration: "2021–2025",
    role: "Co-coordinator",
    scope: "Uruguay",
    summary:
      "5-year UdelaR interdisciplinary center. Lead: Dr Sonia Rodríguez Giordano (DEPBIO, Facultad de Química, UdelaR, Coordinator). Co-coordinators: Dr Pablo Dans (CENUR Litoral Norte, Salto, UdelaR) and Dr Carlos Testuri (INCO, Facultad de Ingeniería, UdelaR).",
    url: "https://ceibos.ei.udelar.edu.uy/",
  },
  {
    title: "HexABC — Ascona B-DNA Consortium",
    kind: "International consortium",
    duration: "2021–2026",
    role: "Member of the consortium",
    scope: "Switzerland · Lithuania · Poland · Spain · Germany · USA · UK · Uruguay · France",
    summary:
      "Latest ABC effort: systematic characterization of the physical properties of all 2080 unique hexanucleotides from a collection of 950 10 μs all-atom MD simulations.",
    url: "https://mmb.irbbarcelona.org/webdev/slim/ABC/public/",
  },
  {
    title: "ABSarbo — Aptamer-based strategies against arboviruses",
    kind: "EULAC-ANII project",
    duration: "2023–2025",
    role: "Co-coordinator",
    scope: "Uruguay (HQ) · Peru · Mexico · Spain · Austria · Germany",
    summary:
      "Aptamer-based biotechnological tools against arboviruses. Lead: Dr Calzada (Facultad de Ciencias, UdelaR). 6-country consortium.",
    url: "https://www.rediba.org/about-4",
  },
  {
    title: "Conformational space of DNA aptamers",
    kind: "CSIC I+D project",
    duration: "2023–2025",
    role: "Main responsible",
    scope: "Uruguay · USA",
    summary:
      "Structural and dynamic prediction of unusual DNA motifs — conformational space of aptamers. Partners: CENUR Litoral Norte (Salto), Facultad de Ciencias, Institut Pasteur de Montevideo, Facultad de Medicina, University of Florida.",
  },
  {
    title: "ProAgricultura — Proline accumulation in plants",
    kind: "CSIC I+D project",
    duration: "2022–2024",
    role: "Member of the research team",
    scope: "Uruguay",
    summary:
      "Multidisciplinary study of the benefits of proline accumulation in plants. Lead: Dr Santiago Signorelli, Facultad de Agronomía, UdelaR.",
  },
  {
    title: "Do AI dream of fluorinases? — AI-designed enzymes",
    kind: "FCE project",
    duration: "2024–2026",
    role: "Member of the research group",
    scope: "Uruguay",
    summary:
      "Artificial intelligence as a source of new enzymes for the biocatalytic synthesis of fluorinated compounds. Lead: Dr Paola Panizza, Facultad de Química, UdelaR.",
  },
  {
    title: "Coarse-grained DNA model for chromatin MD",
    kind: "PhD project (PEDECIBA Química / UdelaR)",
    duration: "ongoing",
    role: "Co-director",
    scope: "Uruguay",
    summary:
      "PhD project of MSc Gabriela da Rosa: A new coarse-grained model of DNA for molecular dynamics simulations of chromatin. Co-director: Dr Gianna Cecchetto (Facultad de Química). CAP fellowship.",
  },
  {
    title: "In silico engineering of reductive aminases",
    kind: "MSc project (UdelaR / ANII)",
    duration: "2020–2023",
    role: "Co-director",
    scope: "Uruguay",
    summary:
      "MSc in Biotechnology project of Lic. Gonzalo Lopez. In silico and experimental engineering of reductive aminases applied to obtaining radiotracers for PET diagnostics of neurodegenerative diseases. Co-directors: Dr Paola Panizza, Dr Sonia Rodriguez (Facultad de Química).",
  },
  {
    title: "ATPase × peroxynitrite",
    kind: "CENUR–UBA project",
    duration: "2023–2024",
    role: "Member of the research group",
    scope: "Argentina · Uruguay",
    summary:
      "Effect of peroxynitrite on ATPase activity and structure. Coordinator: Prof. Daniel Peluffo (UBA / CENUR Litoral Norte).",
  },
  {
    title: "3D organization and dynamics of the Trypanosoma cruzi genome",
    kind: "FCE project",
    duration: "2023–2024",
    role: "Member of the research group",
    scope: "Uruguay",
    summary:
      "Lead: Dr Florencia Viraqué (Institut Pasteur de Montevideo) with CENUR Litoral Norte.",
  },
  {
    title: "T-cell receptors and tissue homing",
    kind: "Crick Institute project",
    duration: "2023–2025",
    role: "Member of the research group",
    scope: "United Kingdom · Uruguay",
    summary:
      "Role of T cell receptors (TCR) in driving cells into association with their target tissues. Lead: Dr Leticia Monin (Crick Institute) with CENUR Litoral Norte.",
  },
  {
    title: "MODxNA — modified nucleic acid parameters for AMBER",
    kind: "International collaboration",
    duration: "2023–2024",
    role: "Member of the research group",
    scope: "USA · Uruguay",
    summary:
      "Database of thousands of DNA/RNA modified-base parameters for the AMBER force field. Partners: University of Utah, University of Maryland, IONIS Pharmaceuticals, CENUR Litoral Norte.",
  },
  {
    title: "Aptamers against Trypanosoma cruzi",
    kind: "REDIBA collaboration",
    duration: "2023–2024",
    role: "Member of the research group",
    scope: "Peru · Uruguay",
    summary:
      "Development of aptamers against T. cruzi. Lead: Dr Pohl Milón (Universidad Peruana de Ciencias Aplicadas) with CENUR Litoral Norte. Member of REDIBA.",
    url: "https://www.rediba.org",
  },
  {
    title: "Aptamers against Her2 (breast cancer)",
    kind: "REDIBA / l'Oréal Uruguay",
    duration: "2022–2024",
    role: "Member of the research group",
    scope: "Uruguay",
    summary:
      "Development of aptamers against the Her2 receptor in breast cancer. Co-funded by l'Oréal Uruguay. Lead: Dr Calzada (Facultad de Ciencias, UdelaR) with CENUR Litoral Norte. Member of REDIBA.",
    url: "https://www.rediba.org",
  },
  {
    title: "Music from the molecule of life",
    kind: "Outreach project",
    duration: "2022–2026",
    role: "Coordinator",
    scope: "Uruguay",
    summary:
      "5-year project on music from MD simulations of DNA duplexes, in collaboration with Nicolás Molla (music producer and composer) and CENUR Litoral Norte.",
  },
  {
    title: "tRNA and plastic art (ARN for Export)",
    kind: "Outreach project",
    duration: "2022–2024",
    role: "Coordinator",
    scope: "Uruguay",
    summary:
      "Travelling plastic-art exhibition on the structure of transfer RNA molecules (tRNAs) released into the inter-cellular space. Collaboration with Mariana Barraco (painter, art teacher and creator) and CENUR Litoral Norte.",
  },
];

const es_projects: ResearchProject[] = [
  {
    title: "CEIBOS — Centro de Estudios Interdisciplinarios de Biodiversidad Orientado a aplicaciones en Salud",
    kind: "Centro Interdisciplinario (EI)",
    duration: "2021–2025",
    role: "Co-coordinador",
    scope: "Uruguay",
    summary:
      "Centro interdisciplinario de la UdelaR de 5 años. Coordinadora: Dra. Sonia Rodríguez Giordano (DEPBIO, Facultad de Química, UdelaR). Co-coordinadores: Dr. Pablo Dans (CENUR Litoral Norte, Salto, UdelaR) y Dr. Carlos Testuri (INCO, Facultad de Ingeniería, UdelaR).",
    url: "https://ceibos.ei.udelar.edu.uy/",
  },
  {
    title: "HexABC — Ascona B-DNA Consortium",
    kind: "Consorcio internacional",
    duration: "2021–2026",
    role: "Miembro del consorcio",
    scope: "Suiza · Lituania · Polonia · España · Alemania · EE. UU. · Reino Unido · Uruguay · Francia",
    summary:
      "El esfuerzo más reciente del consorcio ABC: caracterización sistemática de las propiedades físicas de los 2080 hexanucleótidos únicos a partir de 950 simulaciones MD all-atom de 10 μs.",
    url: "https://mmb.irbbarcelona.org/webdev/slim/ABC/public/",
  },
  {
    title: "ABSarbo — Estrategias basadas en aptámeros contra arbovirus",
    kind: "Proyecto EULAC-ANII",
    duration: "2023–2025",
    role: "Co-coordinador",
    scope: "Uruguay (sede) · Perú · México · España · Austria · Alemania",
    summary:
      "Herramientas biotecnológicas basadas en aptámeros contra arbovirus. Responsable: Dra. Calzada (Facultad de Ciencias, UdelaR). Consorcio de 6 países.",
    url: "https://www.rediba.org/about-4",
  },
  {
    title: "Espacio conformacional de aptámeros de ADN",
    kind: "Proyecto CSIC I+D",
    duration: "2023–2025",
    role: "Responsable principal",
    scope: "Uruguay · EE. UU.",
    summary:
      "Predicción estructural y dinámica de motivos inusuales de ADN — espacio conformacional de aptámeros. Socios: CENUR Litoral Norte (Salto), Facultad de Ciencias, Institut Pasteur de Montevideo, Facultad de Medicina, University of Florida.",
  },
  {
    title: "ProAgricultura — Acumulación de prolina en plantas",
    kind: "Proyecto CSIC I+D",
    duration: "2022–2024",
    role: "Integrante del equipo",
    scope: "Uruguay",
    summary:
      "Estudio multidisciplinario de los beneficios de la acumulación de prolina en plantas. Responsable: Dr. Santiago Signorelli, Facultad de Agronomía, UdelaR.",
  },
  {
    title: "¿Sueñan las IA con fluorinasas? — Enzimas diseñadas por IA",
    kind: "Proyecto FCE",
    duration: "2024–2026",
    role: "Integrante del grupo",
    scope: "Uruguay",
    summary:
      "Inteligencia artificial como fuente de nuevas enzimas para la síntesis biocatalítica de compuestos fluorados. Responsable: Dra. Paola Panizza, Facultad de Química, UdelaR.",
  },
  {
    title: "Modelo coarse-grained de ADN para MD de cromatina",
    kind: "Proyecto de doctorado (PEDECIBA Química / UdelaR)",
    duration: "en curso",
    role: "Co-director",
    scope: "Uruguay",
    summary:
      "Tesis doctoral de MSc Gabriela da Rosa: un nuevo modelo coarse-grained de ADN para simulaciones de dinámica molecular de cromatina. Co-directora: Dra. Gianna Cecchetto (Facultad de Química). Beca CAP.",
  },
  {
    title: "Ingeniería in silico de aminasas reductivas",
    kind: "Proyecto de maestría (UdelaR / ANII)",
    duration: "2020–2023",
    role: "Co-director",
    scope: "Uruguay",
    summary:
      "Tesis de Maestría en Biotecnología de Lic. Gonzalo Lopez. Ingeniería in silico y experimental de aminasas reductivas, aplicada a la obtención de radiotrazadores para diagnóstico PET de enfermedades neurodegenerativas. Co-directoras: Dra. Paola Panizza, Dra. Sonia Rodriguez (Facultad de Química).",
  },
  {
    title: "ATPasa × peroxinitrito",
    kind: "Proyecto CENUR–UBA",
    duration: "2023–2024",
    role: "Integrante del grupo",
    scope: "Argentina · Uruguay",
    summary:
      "Efecto del peroxinitrito sobre la actividad y estructura de ATPasas. Coordinador: Prof. Daniel Peluffo (UBA / CENUR Litoral Norte).",
  },
  {
    title: "Organización y dinámica 3D del genoma de Trypanosoma cruzi",
    kind: "Proyecto FCE",
    duration: "2023–2024",
    role: "Integrante del grupo",
    scope: "Uruguay",
    summary:
      "Responsable: Dra. Florencia Viraqué (Institut Pasteur de Montevideo) con el CENUR Litoral Norte.",
  },
  {
    title: "Receptores de células T y homing tisular",
    kind: "Proyecto Crick Institute",
    duration: "2023–2025",
    role: "Integrante del grupo",
    scope: "Reino Unido · Uruguay",
    summary:
      "Rol de los receptores de células T (TCR) en la asociación celular con sus tejidos blanco. Responsable: Dra. Leticia Monin (Crick Institute) con el CENUR Litoral Norte.",
  },
  {
    title: "MODxNA — Parámetros de ácidos nucleicos modificados para AMBER",
    kind: "Colaboración internacional",
    duration: "2023–2024",
    role: "Integrante del grupo",
    scope: "EE. UU. · Uruguay",
    summary:
      "Base de datos con miles de parámetros de bases modificadas de ADN/ARN para el campo de fuerzas AMBER. Socios: University of Utah, University of Maryland, IONIS Pharmaceuticals y CENUR Litoral Norte.",
  },
  {
    title: "Aptámeros contra Trypanosoma cruzi",
    kind: "Colaboración REDIBA",
    duration: "2023–2024",
    role: "Integrante del grupo",
    scope: "Perú · Uruguay",
    summary:
      "Desarrollo de aptámeros contra T. cruzi. Responsable: Dr. Pohl Milón (Universidad Peruana de Ciencias Aplicadas) con el CENUR Litoral Norte. Miembros de REDIBA.",
    url: "https://www.rediba.org",
  },
  {
    title: "Aptámeros contra Her2 (cáncer de mama)",
    kind: "REDIBA / L'Oréal Uruguay",
    duration: "2022–2024",
    role: "Integrante del grupo",
    scope: "Uruguay",
    summary:
      "Desarrollo de aptámeros contra el receptor Her2 en cáncer de mama. Co-financiado por L'Oréal Uruguay. Responsable: Dra. Calzada (Facultad de Ciencias, UdelaR) con el CENUR Litoral Norte. Miembros de REDIBA.",
    url: "https://www.rediba.org",
  },
  {
    title: "Música desde la molécula de la vida",
    kind: "Proyecto de divulgación",
    duration: "2022–2026",
    role: "Coordinador",
    scope: "Uruguay",
    summary:
      "Proyecto a 5 años sobre música a partir de simulaciones MD de duplexes de ADN, en colaboración con Nicolás Molla (productor y compositor) y el CENUR Litoral Norte.",
  },
  {
    title: "ARN de transferencia y arte plástico (ARN for Export)",
    kind: "Proyecto de divulgación",
    duration: "2022–2024",
    role: "Coordinador",
    scope: "Uruguay",
    summary:
      "Exposición itinerante de arte plástico sobre la estructura de los ARN de transferencia (tRNAs) liberados al espacio intercelular. Colaboración con Mariana Barraco (pintora, docente y creadora) y el CENUR Litoral Norte.",
  },
];

const en: ResearchContent = {
  eyebrow: "Research",
  title: "Nucleic acids in their full dynamic context.",
  paragraphs: [
    "The Dans Lab is mainly focused on the study of the structure and dynamics of nucleic acids and their interactions with proteins, small ligands and the solvent atmosphere, from a molecular point of view.",
    "We use and develop all-atom force fields and coarse-grained models for atomistic, nanoscopic and mesoscopic simulations. We also use and develop bioinformatic tools for the data mining of specialized databases containing structural information.",
    "All our projects are tackled from a multiscale perspective trying to connect the quantum world with the macroscopic level — from electrons up to chromosomes.",
  ],
  cover_caption_html: `Cover image: HiC-biased MD simulation of a haploid yeast nucleus. From <em>Impact of DNA methylation on 3D genome structure</em>. Nature Communications 12, 3243 (2021) · <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1cv6nvgmbOmKGe-IjyJDb5DSkIT1fc6ra/view">PDF</a>`,
  projects_heading: "Current research lines & projects",
  projects_subtitle: (n) =>
    `${n} ongoing or recently active projects, spanning consortia, PhD/MSc co-directions, and outreach.`,
  projects: en_projects,
};

const es: ResearchContent = {
  eyebrow: "Investigación",
  title: "Ácidos nucleicos en su contexto dinámico completo.",
  paragraphs: [
    "El Dans Lab se enfoca principalmente en el estudio de la estructura y la dinámica de los ácidos nucleicos y sus interacciones con proteínas, ligandos pequeños y el solvente, desde una perspectiva molecular.",
    "Usamos y desarrollamos campos de fuerzas all-atom y modelos coarse-grained para simulaciones atomísticas, nanoscópicas y mesoscópicas. También usamos y desarrollamos herramientas bioinformáticas para la minería de datos en bases de datos estructurales especializadas.",
    "Abordamos todos nuestros proyectos desde una perspectiva multiescala que busca conectar el mundo cuántico con el nivel macroscópico — desde los electrones hasta los cromosomas.",
  ],
  cover_caption_html: `Imagen de portada: simulación MD con sesgo HiC de un núcleo haploide de levadura. De <em>Impact of DNA methylation on 3D genome structure</em>. Nature Communications 12, 3243 (2021) · <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1cv6nvgmbOmKGe-IjyJDb5DSkIT1fc6ra/view">PDF</a>`,
  projects_heading: "Líneas y proyectos actuales",
  projects_subtitle: (n) =>
    `${n} proyectos en curso o recientemente activos, abarcando consorcios, co-direcciones de doctorado y maestría, y divulgación.`,
  projects: es_projects,
};

export const RESEARCH: Record<Lang, ResearchContent> = { en, es };
