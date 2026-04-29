import type { Lang } from "@/lib/i18n";

// Page-level copy for the Research page. The list of projects lives as CSVs
// in data/research/projects.<lang>.csv and is loaded via lib/research.ts.

export type ResearchContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bacterial_heading: string;
  bacterial_paragraphs: string[];
  projects_heading: string;
  projects_subtitle: (n: number) => string;
};

const en: ResearchContent = {
  eyebrow: "Research",
  title: "Nucleic acids in their full dynamic context",
  paragraphs: [
    "The Dans Lab is mainly focused on the study of the structure and dynamics of nucleic acids and their interactions with proteins, small ligands and the solvent atmosphere, from a molecular point of view.",
    "We use and develop all-atom force fields and coarse-grained models for atomistic, nanoscopic and mesoscopic simulations. We also use and develop Deep Learning approaches for 3D prediction and bioinformatic tools for the data mining of specialized databases containing structural information.",
    "All our projects are tackled from a multiscale perspective trying to connect the quantum world with the macroscopic level — from electrons up to chromosomes.",
  ],
  bacterial_heading: "Bacterial genomics & antimicrobial resistance",
  bacterial_paragraphs: [
    "A second main research line of DansLab tackles the genomics and molecular biology of antimicrobial resistance, with a particular focus on ESKAPE pathogens. We follow how clinical isolates evolve under last-resort antibiotics, characterising the genetic and metabolic determinants behind resistance, hetero-antagonism and the emergence of small-colony variants.",
    "Combining whole-genome sequencing, comparative genomics, transcriptomics and structural modelling, we map the spread of carbapenemases (NDM, KPC, OXA-type) across hospital outbreaks in Latin America, dissect mechanisms of spontaneous resistance in vitro, and probe non-canonical drivers. The goal is to translate that mechanistic insight into actionable knowledge for clinical surveillance and into the design of next-generation therapies built on ASOs, siRNAs, aptamers and oligotherapeutics in general.",
  ],
  projects_heading: "Current research lines & projects",
  projects_subtitle: (n) =>
    `${n} ongoing or recently active projects, spanning consortia, PhD/MSc co-directions, and outreach.`,
};

const es: ResearchContent = {
  eyebrow: "Investigación",
  title: "Ácidos nucleicos en su contexto dinámico completo",
  paragraphs: [
    "El Dans Lab se enfoca principalmente en el estudio de la estructura y la dinámica de los ácidos nucleicos y sus interacciones con proteínas, ligandos pequeños y el solvente, desde una perspectiva molecular.",
    "Usamos y desarrollamos campos de fuerzas all-atom y modelos coarse-grained para simulaciones atomísticas, nanoscópicas y mesoscópicas. También usamos y desarrollamos enfoques de Deep Learning para la predicción de estructuras 3D y herramientas bioinformáticas para la minería de datos en bases de datos estructurales especializadas.",
    "Abordamos todos nuestros proyectos desde una perspectiva multiescala que busca conectar el mundo cuántico con el nivel macroscópico — desde los electrones hasta los cromosomas.",
  ],
  bacterial_heading: "Genómica bacteriana y resistencia antimicrobiana",
  bacterial_paragraphs: [
    "Una segunda línea principal del DansLab aborda la genómica y la biología molecular de la resistencia antimicrobiana, con foco en patógenos ESKAPE. Seguimos cómo evolucionan los aislamientos clínicos bajo antibióticos de último recurso y caracterizamos los determinantes genéticos y metabólicos detrás de la resistencia, el hetero-antagonismo y la aparición de variantes de colonia pequeña.",
    "Combinando secuenciación completa de genoma, genómica comparativa, transcriptómica y modelado estructural, mapeamos la diseminación de carbapenemasas (NDM, KPC, OXA) en brotes hospitalarios de América Latina, diseccionamos mecanismos de resistencia espontánea in vitro y exploramos factores no canónicos. El objetivo es traducir esa información mecanística en herramientas concretas para la vigilancia clínica y en el diseño de terapias de próxima generación basadas en ASO, siRNA, aptámeros y oligoterapéuticos en general.",
  ],
  projects_heading: "Líneas y proyectos actuales",
  projects_subtitle: (n) =>
    `${n} proyectos en curso o recientemente activos, abarcando consorcios, co-direcciones de doctorado y maestría, y divulgación.`,
};

export const RESEARCH: Record<Lang, ResearchContent> = { en, es };
