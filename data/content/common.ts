import type { Lang } from "@/lib/i18n";

export type CommonDict = {
  nav: {
    home: string;
    research: string;
    members: string;
    publications: string;
    collaborators: string;
    courses: string;
    outreach: string;
    contact: string;
  };
  footer: {
    rights: string;
    affiliation: string;
  };
  cta: {
    explore: string;
    meet_team: string;
    all_members: string;
    back_to_outreach: string;
  };
  members: {
    pi_heading: string;
    team_heading: string;
    past_heading: string;
    intro: string;
    email: string;
    scholar: string;
  };
  publications: {
    intro: string;
  };
  collaborators: {
    intro: string;
    ongoing_heading: string;
    past_heading: string;
    empty: string;
  };
  courses: {
    intro: string;
    empty: string;
    ongoing_heading: string;
    past_heading: string;
    role_label: string;
  };
  contact: {
    title: string;
    eyebrow: string;
    address_heading: string;
    address_lab_name: string;
    pi_heading: string;
    join_heading: string;
    join_body: string;
  };
  langSwitch: {
    en: string;
    es: string;
  };
};

const en: CommonDict = {
  nav: {
    home: "Home",
    research: "Research",
    members: "Members",
    publications: "Publications",
    collaborators: "Collaborators",
    courses: "Courses",
    outreach: "Outreach",
    contact: "Contact",
  },
  footer: {
    rights:
      "DansLab — Molecular Modeling, Bioinformatics & AI.",
    affiliation:
      "Department of Biological Sciences (DCB), Regional University Center (CENUR) Litoral Norte, University of the Republic, Salto, Uruguay.",
  },
  cta: {
    explore: "Explore our research",
    meet_team: "Meet the team",
    all_members: "All members →",
    back_to_outreach: "← Outreach",
  },
  members: {
    pi_heading: "Principal Investigator",
    team_heading: "Team",
    past_heading: "Past members",
    intro:
      "The team behind DansLab — researchers and students working at the intersection of physics, biology, and computation.",
    email: "email",
    scholar: "google scholar",
  },
  publications: {
    intro:
      "Peer-reviewed work from DansLab and collaborators.",
  },
  collaborators: {
    intro:
      "Researchers and groups we work with around the world. Each entry links to the institution or project page.",
    ongoing_heading: "Ongoing collaborations",
    past_heading: "Past collaborations",
    empty: "We will list our collaborators here soon.",
  },
  courses: {
    intro:
      "Teaching activities — undergraduate courses, postgraduate schools, short courses and seminars at home and abroad.",
    empty: "We will publish our upcoming and past courses here soon.",
    ongoing_heading: "Ongoing courses",
    past_heading: "Past courses",
    role_label: "Role",
  },
  contact: {
    title: "Get in touch",
    eyebrow: "Contact",
    address_heading: "Address",
    address_lab_name: "Molecular Modeling, Bioinformatics & AI (MMBAI) group",
    pi_heading: "Principal Investigator",
    join_heading: "Joining the lab",
    join_body:
      "We are always looking for talented and motivated students. Prospective students and postdocs interested in molecular modeling, simulations, or AI for structural biology are welcome to reach out with a short statement of interest and a CV.",
  },
  langSwitch: { en: "EN", es: "ES" },
};

const es: CommonDict = {
  nav: {
    home: "Inicio",
    research: "Investigación",
    members: "Integrantes",
    publications: "Publicaciones",
    collaborators: "Colaboradores",
    courses: "Cursos",
    outreach: "Divulgación",
    contact: "Contacto",
  },
  footer: {
    rights:
      "DansLab — Modelado Molecular, Bioinformática e IA.",
    affiliation:
      "Departamento de Ciencias Biológicas (DCB), CENUR Litoral Norte, Universidad de la República, Salto, Uruguay.",
  },
  cta: {
    explore: "Conocé nuestra investigación",
    meet_team: "Conocé al equipo",
    all_members: "Ver todo el equipo →",
    back_to_outreach: "← Divulgación",
  },
  members: {
    pi_heading: "Investigador principal",
    team_heading: "Equipo",
    past_heading: "Integrantes previos",
    intro:
      "El equipo de DansLab — investigadores y estudiantes trabajando en la intersección de la física, la biología y la computación.",
    email: "correo",
    scholar: "google scholar",
  },
  publications: {
    intro: "Trabajos arbitrados de DansLab y colaboradores.",
  },
  collaborators: {
    intro:
      "Investigadores y grupos con los que trabajamos en distintas partes del mundo. Cada entrada enlaza a la institución o al proyecto.",
    ongoing_heading: "Colaboraciones en curso",
    past_heading: "Colaboraciones previas",
    empty: "Pronto vamos a listar a nuestros colaboradores aquí.",
  },
  courses: {
    intro:
      "Actividades de docencia — cursos de grado, escuelas de posgrado, cursos breves y seminarios en el país y en el exterior.",
    empty: "Pronto vamos a publicar nuestros cursos pasados y por venir.",
    ongoing_heading: "Cursos en curso",
    past_heading: "Cursos previos",
    role_label: "Rol",
  },
  contact: {
    title: "Comunicate con nosotros",
    eyebrow: "Contacto",
    address_heading: "Dirección",
    address_lab_name: "Grupo de Modelado Molecular, Bioinformática & IA (MMBAI)",
    pi_heading: "Investigador principal",
    join_heading: "Unirse al laboratorio",
    join_body:
      "Siempre estamos buscando estudiantes con talento y motivación. Si te interesa el modelado molecular, las simulaciones o la IA aplicada a la biología estructural, escribinos con una breve carta de interés y tu CV.",
  },
  langSwitch: { en: "EN", es: "ES" },
};

export const COMMON: Record<Lang, CommonDict> = { en, es };
