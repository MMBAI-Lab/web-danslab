import type { Lang } from "@/lib/i18n";

export type OutreachIndexContent = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: { href: string; title: string; body: string }[];
};

const indexEN: OutreachIndexContent = {
  eyebrow: "Outreach",
  title: "Sharing science across formats",
  intro:
    "We share science through teaching, public engagement, and creative collaborations across art, music, and exhibitions.",
  cards: [
    {
      href: "/outreach/abc-2023",
      title: "ABC 2023",
      body:
        "International workshop of the Ascona B-DNA Consortium — sequence-dependent physical properties of DNA, multiscale methods, force fields and protein–DNA interactions.",
    },
    {
      href: "/outreach/arn-for-export",
      title: "ARN for Export",
      body:
        "Interdisciplinary art-and-science installation visualizing extracellular RNA — a collaboration with sculptors, audiovisual artists and biologists across Uruguayan institutions.",
    },
    {
      href: "/outreach/sonification",
      title: "Sonification",
      body:
        "Translating molecular dynamics of DNA into music. A pilot composition mapping DNA–ion interactions to piano and violin notes, in collaboration with composer Nicolás Molla.",
    },
  ],
};

const indexES: OutreachIndexContent = {
  eyebrow: "Divulgación",
  title: "Compartir ciencia en distintos formatos",
  intro:
    "Compartimos ciencia a través de la docencia, el trabajo con el público y colaboraciones creativas en arte, música y exposiciones.",
  cards: [
    {
      href: "/outreach/abc-2023",
      title: "ABC 2023",
      body:
        "Workshop internacional del Ascona B-DNA Consortium — propiedades físicas del ADN dependientes de secuencia, métodos multiescala, campos de fuerzas e interacciones proteína–ADN.",
    },
    {
      href: "/outreach/arn-for-export",
      title: "ARN for Export",
      body:
        "Instalación interdisciplinaria de arte y ciencia que visualiza el ARN extracelular — colaboración entre escultores, artistas audiovisuales y biólogos uruguayos.",
    },
    {
      href: "/outreach/sonification",
      title: "Sonification",
      body:
        "Traducimos la dinámica molecular del ADN en música. Una composición piloto que mapea interacciones ADN–iones a notas de piano y violín, en colaboración con el compositor Nicolás Molla.",
    },
  ],
};

export const OUTREACH_INDEX: Record<Lang, OutreachIndexContent> = {
  en: indexEN,
  es: indexES,
};

// ABC 2023 ---------------------------------------------------------------

export type AbcContent = {
  back: string;
  title: string;
  eyebrow: string;
  intro_paragraphs: string[];
  topics_label: string;
  topics: string[];
  history_heading: string;
  history_paragraphs_html: string[];
  committees_heading: string;
  scientific: string;
  organizing: string;
  winners_heading: string;
  boa_heading: string;
  boa_body: string;
  boa_link_label: string;
  pictures_heading: string;
  sponsors_heading: string;
};

const abcEN: AbcContent = {
  back: "← Outreach",
  title: "ABC 2023",
  eyebrow: "Ascona B-DNA Consortium · International workshop",
  intro_paragraphs: [
    "The ABC 2023 conference is a venue to discuss subjects surrounding the sequence-dependent physical properties of DNA, new methods and new models, with a multiscale perspective. From the shorter atomistic scale to more biologically pertinent length scales (mesoscale), i.e. from electrons to nucleosomes.",
    "Top international researchers, ABC members, and collaborators from diverse fields — experimentalists, computational chemists/physicists, and developers of new methods — converge to discuss:",
  ],
  topics_label: "Topics",
  topics: [
    "All-atom force field development for nucleic acids",
    "Sequence-dependent mechanical properties of DNA",
    "Coarse-grained models of nucleic acids",
    "Multiscale simulations of nucleic acids",
    "Protein–DNA interactions",
    "DNA–solvent interactions",
    "Nucleosome structure and chromatin fibers",
    "Nucleosome positioning",
    "Epigenetic modifications: DNA and histone tails",
  ],
  history_heading: "ABC history",
  history_paragraphs_html: [
    `Founded in 2001 during the "Atomistic to Continuum Models for Long Molecules" meeting in Ascona, Switzerland, the <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Ascona_B-DNA_Consortium">Ascona B-DNA Consortium (ABC)</a> brings together molecular-dynamics groups dedicated to setting standards for DNA simulation. Its first two systematic phases (2004–2009) ran 15-ns simulations of ten 15-mer sequences with the parm94 force field and then, with parmbsc0, delivered the first comprehensive study of all 136 unique tetranucleotide combinations.`,
    `Over the following decade the consortium pushed timescales into the microsecond range with μABC (2010–2014), driving the development of the <em>parmbsc1</em> force field, and the miniABC project on 13 sequences refined Calladine–Dickerson rules under varied salt conditions. The current effort, <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://mmb.irbbarcelona.org/hexABC/">HexABC</a>, brings together 14 institutions to characterise all 2080 unique hexanucleotides over sub-millisecond timescales.`,
    `<strong class="text-ink">DansLab</strong> has been a member of the ABC since 2014, co-organised the latest meeting (Ascona 2023), and is co-organising the next one in Barcelona in 2027.`,
  ],
  committees_heading: "Scientific & organizing committees",
  scientific: "Scientific",
  organizing: "Organizing",
  winners_heading: "Poster session winners",
  boa_heading: "Book of Abstracts",
  boa_body:
    "Timetable, participants, scientific program and book of abstracts.",
  boa_link_label: "Open the PDF →",
  pictures_heading: "Pictures",
  sponsors_heading: "Funded and organized by",
};

const abcES: AbcContent = {
  back: "← Divulgación",
  title: "ABC 2023",
  eyebrow: "Ascona B-DNA Consortium · Workshop internacional",
  intro_paragraphs: [
    "La conferencia ABC 2023 es un espacio para discutir las propiedades físicas del ADN dependientes de la secuencia, nuevos métodos y nuevos modelos, con una perspectiva multiescala. Desde la escala atomística más corta hasta escalas biológicamente más relevantes (mesoescala), es decir, desde los electrones hasta los nucleosomas.",
    "Investigadores internacionales de primer nivel, miembros del ABC y colaboradores de diversos campos — experimentalistas, químicos/físicos computacionales y desarrolladores de nuevos métodos — convergen para discutir:",
  ],
  topics_label: "Temas",
  topics: [
    "Desarrollo de campos de fuerzas all-atom para ácidos nucleicos",
    "Propiedades mecánicas del ADN dependientes de secuencia",
    "Modelos coarse-grained de ácidos nucleicos",
    "Simulaciones multiescala de ácidos nucleicos",
    "Interacciones proteína–ADN",
    "Interacciones ADN–solvente",
    "Estructura del nucleosoma y fibras de cromatina",
    "Posicionamiento del nucleosoma",
    "Modificaciones epigenéticas: ADN y colas de histonas",
  ],
  history_heading: "Historia del ABC",
  history_paragraphs_html: [
    `Fundado en 2001 durante el encuentro «Atomistic to Continuum Models for Long Molecules» en Ascona, Suiza, el <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Ascona_B-DNA_Consortium">Ascona B-DNA Consortium (ABC)</a> reúne a grupos de dinámica molecular dedicados a establecer estándares para la simulación de ADN. Sus dos primeras fases sistemáticas (2004–2009) corrieron simulaciones de 15 ns sobre diez secuencias de 15 pares de bases con el campo de fuerzas parm94 y, con parmbsc0, llevaron a cabo el primer estudio exhaustivo de las 136 combinaciones únicas de tetranucleótidos.`,
    `En la década siguiente el consorcio llevó las escalas temporales al rango de los microsegundos con μABC (2010–2014), impulsando el desarrollo del campo de fuerzas <em>parmbsc1</em>, y el proyecto miniABC sobre 13 secuencias refinó las reglas de Calladine–Dickerson bajo distintas condiciones salinas. El esfuerzo actual, <a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://mmb.irbbarcelona.org/hexABC/">HexABC</a>, reúne a 14 instituciones para caracterizar los 2080 hexanucleótidos únicos en escalas sub-milisegundo.`,
    `<strong class="text-ink">DansLab</strong> integra el ABC desde 2014, fue co-organizador del último encuentro (Ascona 2023) y co-organiza el próximo en Barcelona en 2027.`,
  ],
  committees_heading: "Comités científico y organizador",
  scientific: "Científico",
  organizing: "Organizador",
  winners_heading: "Ganadores de la sesión de pósters",
  boa_heading: "Libro de resúmenes",
  boa_body:
    "Cronograma, participantes, programa científico y libro de resúmenes.",
  boa_link_label: "Abrir el PDF →",
  pictures_heading: "Fotos",
  sponsors_heading: "Financiado y organizado por",
};

export const ABC: Record<Lang, AbcContent> = { en: abcEN, es: abcES };

// ARN for Export ---------------------------------------------------------

export type ArnContent = {
  back: string;
  title: string;
  eyebrow: string;
  intro: string[];
  sections: { heading: string; paragraphs: string[] }[];
  artists_heading: string;
  artists: { name: string; body: string }[];
  gallery_heading: string;
  cta: string;
  cta_email: string;
  copyright: string;
};

const arnEN: ArnContent = {
  back: "← Outreach",
  title: "ARN for Export",
  eyebrow: "Art × Science installation",
  intro: [
    "For decades we believed that RNA acted only inside the cell — carrying instructions, regulating fundamental biological processes, shaping life itself. At best, RNA could travel from cell to cell sheltered inside vesicles.",
    "But Uruguayan scientists discovered that RNA also exists outside the cell, traveling on its own, floating, acting as a communicative bridge between cells, transforming our understanding of the body.",
    "This finding writes a new page in biology and opens paths for medicine, materializing what was invisible, what seemed impossible: RNA molecules floating, now taking shape, volume and presence.",
  ],
  sections: [
    {
      heading: "Scientific context",
      paragraphs: [
        "Juan Pablo Tosar, Alfonso Cayota and collaborators at the Universidad de la República and the Institut Pasteur de Montevideo discovered, for the first time, that RNA molecules can operate outside cells, on their own, without the help of vesicles. Ribosomes, transfer RNAs (tRNAs) and dimers of tRNA halves navigate between cells in extracellular space — carrying information from cell to cell.",
        "This finding opens new possibilities for innovative medical diagnostics and disease treatment. In a side project, researchers Leonardo Darré and Pablo D. Dans (also at UdelaR and the Institut Pasteur) applied computational methods to determine the three-dimensional (3D) structure of these extracellular RNAs — giving form to the invisible, drawing a new mode of cellular communication.",
      ],
    },
    {
      heading: "The discovery",
      paragraphs: [
        "RNA (ribonucleic acid), the cousin of our DNA, is a fundamental molecule that plays a crucial role in protein synthesis. RNA gained widespread attention during the pandemic, when several COVID vaccines were built on this molecule. RNA is remarkably versatile — it can carry, from the nucleus to the cytoplasm, a message obtained from our DNA, and once in the cytoplasm, read that message and produce the proteins essential to life.",
        "Messenger RNAs (mRNAs) carry the message; transfer RNAs (tRNAs) translate it into proteins; ribosomal RNAs (rRNAs) are the factories where production happens. Long non-coding RNAs (lncRNAs) and short interfering RNAs (siRNAs), among others, finely regulate the entire production process.",
        "RNA functions were always thought to occur within membranes — inside cells or vesicles. But serendipity and the trained minds of Uruguayan scientists identified RNA molecules functioning outside the cell, called extracellular RNAs, that do not depend on vesicles. This key discovery has expanded our understanding of how cells communicate and adapt. In particular, ribosomes, tRNAs and tRNA halves were shown to travel freely between cells, playing a role in communication.",
        "Knowing the structure of these molecules is fundamental to understanding how they interact in biological systems, and also lets us materialize something abstract — something that occurs in extracellular space — into a 3D object with surface and volume. With computational chemistry methods, the team of Uruguayan researchers determined the 3D shape these RNAs take in space, and how flexible and stable they are.",
      ],
    },
    {
      heading: "The artistic installation",
      paragraphs: [
        "ARN for Export is a sensory installation that translates this discovery into the language of the senses. Through a composition of diverse materials, sonic space, fractals and a holographic core, visitors enter a space inspired by the extracellular universe.",
        "Designed as a symbolic export box — from Uruguay to the world, and from the cell's interior to extracellular space — the room invites visitors to explore the invisible: the molecular journey, communication between cells, and the poetry of discovery.",
        "This artistic proposal was made possible by an outreach allocation of an ANII Fondo Clemente Estable competitive project (Leonardo Darré and Pablo Dans) and the Fondo Regional para la Cultura of the Ministry of Education (MEC), Uruguay (Nito Cilintano — lead — Martina Buroni, Mariana Barraco and Pablo Dans).",
      ],
    },
    {
      heading: "The creative process",
      paragraphs: [
        "The installation proposes an atmospheric interpretation of extracellular space. Through material exploration, distorted forms were built that generate volumes, hollows and translucency, giving the space an organic and enveloping presence.",
        "A reduced color palette — white and red — lets shape reveal itself through interior light, while the red illumination suggests an intimate, almost visceral experience. The sonic environment — echoes and whispers with key words — simulates RNA's journey as a carrier of messages, completing an immersive experience that connects body, matter and language.",
        "The exterior of the space takes the form of an export box — a conceptual decision that links science with the act of sharing knowledge. Just as RNA transports information between cells, this installation is conceived as a symbolic container from which knowledge generated locally can project itself outward.",
      ],
    },
  ],
  artists_heading: "Artists & scientists",
  artists: [
    {
      name: "Martina Buroni",
      body: "Visual artist and stage designer trained in sculpture and applied arts. Her work articulates artistic conceptualization, scenic creation, installation and sculpture in dialogue with living space.",
    },
    {
      name: "Mariana Barraco",
      body: "Artist, teacher, director of Atelier Mari Barraco. Her multidisciplinary approach combines drawing, painting, ceramics, sculpture and digital art. She designs artistic experiences that democratize art and transform spaces.",
    },
    {
      name: "Nito Cilintano",
      body: "Visual artist, audiovisual creator and university professor. He works at the intersection of technology, spatiality and perception, developing installations and audiovisual pieces with a scenic and performative approach.",
    },
    {
      name: "Pablo Dans",
      body: "Researcher, teacher and science communicator. International expert in nucleic acid structure (DNA and RNA) and in computational chemistry, molecular modeling, simulations and structural bioinformatics.",
    },
  ],
  gallery_heading: "Gallery",
  cta: "If you would like to bring the ARN for Export installation to your educational or cultural space, get in touch.",
  cta_email: "arnforexport@gmail.com",
  copyright: "Copyright DansLab & Atelier Mari Barraco — 2025",
};

const arnES: ArnContent = {
  back: "← Divulgación",
  title: "ARN for Export",
  eyebrow: "Instalación arte × ciencia",
  intro: [
    "Durante décadas creímos que el ARN actuaba solo dentro de la célula: llevando instrucciones, regulando procesos biológicos fundamentales, dando forma a la vida. En el mejor de los casos, el ARN era capaz de viajar de célula en célula protegido dentro de vesículas.",
    "Pero científicos uruguayos descubrieron que también hay ARN fuera de la célula, viajando por sí solo, flotando, haciendo de puente comunicativo entre células, transformando nuestra comprensión del cuerpo.",
    "Este hallazgo escribe una nueva página de la biología y abre caminos para la medicina, materializando lo invisible, lo que era imposible: moléculas de ARN flotando, que ahora toman forma, volumen y presencia.",
  ],
  sections: [
    {
      heading: "Contexto científico",
      paragraphs: [
        "Juan Pablo Tosar, Alfonso Cayota y colaboradores de la Universidad de la República y del Instituto Pasteur de Montevideo descubrieron por primera vez que las moléculas de ARN pueden operar fuera de las células, por sí solas, sin la ayuda de vesículas. Ribosomas, ARN de transferencia (ARNt) y dímeros de mitades de ARNt navegan entre las células, en el espacio extracelular. Llevan información de célula a célula, comunicando.",
        "Este hallazgo abre nuevas posibilidades para diagnósticos médicos innovadores y el tratamiento de enfermedades. En un proyecto lateral, los investigadores Leonardo Darré y Pablo D. Dans (también pertenecientes a la UdelaR y el Instituto Pasteur) aplicaron métodos computacionales para determinar la estructura tridimensional (3D) de estos ARN extracelulares, dándole estructura a lo invisible. Dibujando una nueva forma de comunicación celular.",
      ],
    },
    {
      heading: "El descubrimiento",
      paragraphs: [
        "El ARN (ácido ribonucleico), primo de nuestro ADN, es una molécula fundamental que juega un papel crucial en la síntesis de proteínas. El ARN ganó mucha notoriedad durante la pandemia, ya que las vacunas contra el COVID de algunas farmacéuticas están basadas en esta molécula. Esto se debe a que es una molécula muy versátil, que puede cumplir varios roles. El ARN es capaz de llevar, desde el núcleo celular al citoplasma, un mensaje que obtuvo de nuestro ADN y una vez en el citoplasma, es capaz de leer dicho mensaje y producir las proteínas esenciales para la vida.",
        "De este modo, los ARN mensajeros (ARNm) cargan con el mensaje, los ARN de transferencia (ARNt) son los que traducen el mensaje a proteínas, y los ARN ribosomales (ARNr) son las usinas donde la producción ocurre. Moléculas de ARN largas no-codificantes (ARNln) y cortas de interferencia (ARNsi), entre otras, son las encargadas de regular finamente todo el proceso de producción.",
        "Siempre se consideró que las funciones de los ARN ocurrían entre membranas, es decir en el interior de las células o vesículas. Sin embargo, la serendipia y las mentes entrenadas de los científicos uruguayos lograron identificar moléculas de ARN con funciones fuera de la célula, denominadas ARN extracelulares que no dependen de vesículas.",
        "Conocer la estructura de estas moléculas es fundamental para entender cómo interactúan en los sistemas biológicos, pero además permite materializar algo abstracto que ocurre en el espacio extracelular, en un objeto 3D que tiene superficie y volumen. Ayudados por los métodos de la química computacional, el equipo de investigadores uruguayos también logró determinar la forma 3D que tienen en el espacio y qué tan flexibles y estables son.",
      ],
    },
    {
      heading: "La instalación artística",
      paragraphs: [
        "ARN for Export es una instalación sensorial que traduce este descubrimiento al lenguaje de los sentidos. A través de una composición de materiales diversos, espacio sonoro, fractales y un núcleo holográfico, los visitantes ingresan a un espacio inspirado en el universo extracelular.",
        "El espacio, diseñado como una caja de exportación simbólica desde Uruguay al mundo y desde el interior celular al espacio extracelular, invita a explorar lo invisible: el viaje molecular, la comunicación entre células y la poesía del descubrimiento.",
        "Esta propuesta artística fue posible gracias a la partida para divulgación de un proyecto concursable Fondo Clemente Estable de la ANII (Leonardo Darré y Pablo Dans) y el Fondo Regional para la Cultura del Ministerio de Educación (MEC), Uruguay (Nito Cilintano —responsable—, Martina Buroni, Mariana Barraco y Pablo Dans).",
      ],
    },
    {
      heading: "El proceso creativo",
      paragraphs: [
        "La instalación propone una interpretación atmosférica del espacio extracelular. A partir de una exploración material, se construyeron formas distorsionadas que generan volúmenes, huecos y translucidez, dotando al espacio de una presencia orgánica y envolvente.",
        "El uso de una paleta cromática reducida —blanco y rojo— permite que la forma se revele a través de la luz interior, mientras que la iluminación roja sugiere una experiencia íntima, casi visceral. El entorno sonoro, compuesto por ecos y susurros con palabras clave, simula el viaje del ARN como portador de mensajes, completando una experiencia inmersiva que conecta cuerpo, materia y lenguaje.",
        "El exterior del espacio toma la forma de una caja de exportación, una decisión conceptual que vincula la ciencia con el acto de compartir conocimiento. Así como el ARN transporta información entre células, esta instalación se concibe como un contenedor simbólico desde el cual el conocimiento generado localmente puede proyectarse hacia el mundo.",
      ],
    },
  ],
  artists_heading: "Realización",
  artists: [
    {
      name: "Martina Buroni",
      body: "Artista visual y escenógrafa con formación en escultura y artes aplicadas. Su trabajo articula conceptualización artística, creación escénica, instalación y escultura en diálogo con el espacio vivo.",
    },
    {
      name: "Mariana Barraco",
      body: "Artista, docente, directora del Atelier Mari Barraco. Su enfoque multidisciplinario combina dibujo, pintura, cerámica, escultura y arte digital. Diseña experiencias artísticas que democratizan el arte y transforman los espacios.",
    },
    {
      name: "Nito Cilintano",
      body: "Artista visual, realizador audiovisual y docente universitario. Trabaja en la intersección entre tecnología, espacialidad y percepción, desarrollando instalaciones y piezas audiovisuales con enfoque escénico y performativo.",
    },
    {
      name: "Pablo Dans",
      body: "Investigador, docente y divulgador científico. Experto internacional en estructura de ácidos nucleicos (ADN y ARN) y en técnicas de química computacional, modelado molecular, simulaciones y bioinformática estructural.",
    },
  ],
  gallery_heading: "Galería",
  cta: "Si te gustaría tener la instalación ARN for Export en tu espacio educativo o cultural, contactanos.",
  cta_email: "arnforexport@gmail.com",
  copyright: "Copyright DansLab & Atelier Mari Barraco — 2025",
};

export const ARN: Record<Lang, ArnContent> = { en: arnEN, es: arnES };

// Sonification ----------------------------------------------------------

export type SonifContent = {
  back: string;
  title: string;
  eyebrow: string;
  lede: string;
  sections: { heading: string; paragraphs?: string[]; quotes?: string[] }[];
  examples_heading: string;
  examples: { title: string; cite: string }[];
  vickers_quote: string;
  vickers_attribution: string;
  examples_quote_1: string;
  examples_quote_2: string;
  dna_music_paragraphs: string[];
  dna_music_youtube_note: string;
  creators_heading: string;
  creators: { name: string; body_html: string }[];
  materials_heading: string;
};

const sonEN: SonifContent = {
  back: "← Outreach",
  title: "Molecular Sonification",
  eyebrow: "DNA → Music",
  lede:
    "A fusion of DNA structure, its interaction with the biological environment, and musical composition. An invitation to hear the molecule of life through physical properties extracted from simulations and turned into audible signals.",
  sections: [
    {
      heading: "What is sonification?",
      paragraphs: [
        "Sonification is a way of turning data into sound so we can understand it better. Instead of displaying information in graphs or tables, it is transformed into acoustic signals that we can hear. In this way, what would normally be a series of numbers or measurements becomes a “soundscape” that reflects how a phenomenon, experiment, or model behaves.",
        "This process is not automatic; someone has to decide which data will be transformed and how they will sound. For example, a higher sensor reading can be turned into a higher pitch, or a sudden change in a measurement can be heard as a strike or a shift in rhythm. In this way, sonification opens up a new path for exploring, interpreting, and communicating information by taking advantage of our natural ability to recognize patterns in what we hear.",
      ],
    },
    {
      heading: "The science behind it",
      paragraphs: [
        "Molecular dynamics simulations are computer simulations that make it possible to observe how the molecules that make up life — proteins, DNA, RNA — move and change over time. They work by applying the laws of physics to each atom, allowing us to follow their trajectories as if we had a virtual microscope capable of seeing at the atomic level and in slow motion.",
        "These simulations are extremely useful because they allow us to explore phenomena that are impossible to observe directly in the lab, such as exactly how a DNA sequence bends, folds, or becomes more rigid depending on the combination of letters (bases) that make it up. Thanks to this approach, it has become clear that the physical properties of DNA — flexibility, rigidity, and tendency to bend — depend strongly on its sequence.",
        "A key role in this progress has been played, and continues to be played, by the Ascona B-DNA Consortium (ABC), an international collaboration of researchers that has been generating DNA simulations since the early 2000s, establishing standards and databases that are now essential references in the field. DansLab has been part of the ABC Consortium since 2014 and was the most recent organizer of the ABC conference, held in April 2023 in Ascona, Switzerland.",
      ],
    },
  ],
  examples_heading: "Examples of molecular sonification",
  examples: [
    { title: "Music from protein sequences, with musicality enhanced through a computer program that learns from Chopin.", cite: "Tay. Heliyon. 2021" },
    { title: "Conversion of amino acid sequences in proteins into classical music: a search for auditory patterns.", cite: "Takahashi. Genome Biology. 2007" },
    { title: "A musical approach to the interpretation of gene expression data using neuroblastoma cell lines.", cite: "Staege. Scientific Reports. 2015" },
    { title: "Musical patterns for comparative epigenomics.", cite: "Brocks. Clinical Epigenetics. 2015" },
    { title: "SNARE Dance: a musical interpretation of Atg9 transport to the tubulovesicular cluster.", cite: "Takahashi. Autophagy. 2012" },
    { title: "Hydrogen-bond heterogeneity correlates with transition-state passage time in protein folding.", cite: "Scaletti. PNAS. 2024" },
  ],
  examples_quote_1:
    "Despite the filtering and rearrangement of the probe sets, the resulting melodies in the examples presented are quite abstract, and their evocative potential is difficult to predict. It seems likely that familiarity with such melodies would be achieved more quickly if dissonances from familiar melodies were heard.",
  examples_quote_2:
    "After assigning instruments to each protein score, we went on to combine the individual scores into a final orchestration.",
  vickers_quote:
    "Realizing that sonifications that are difficult or fatiguing to listen to will be less successful, some valiant attempts have been made to incorporate some elements of composition into the sound mappings. As music is designed to engage and hold the listener's interest, surely a sonification that is more musical will be better than one that is not. Unfortunately, sonifications purportedly designed to be musical are often still fatiguing or unengaging. Conversely, the goal of communicating essential information can be masked in the effort to achieve a stronger musical expression.",
  vickers_attribution:
    "Vickers, P. (2017). Sonification and music, music and sonification. In Cobussen, M., Meelberg, V., & Truax, B. (eds.), The Routledge Companion to Sounding Art, 135–144. Routledge, Oxford.",
  dna_music_paragraphs: [
    "Trying to follow the balance between data and composition described by Vickers, we transformed the interaction between DNA and potassium cations (K+).",
    "For all possible four-letter sequences, the interaction in the major and minor grooves of DNA was measured. The groove-interaction frequencies were multiplied by a factor to bring them into the human audible range. The resulting values were then rounded by mapping the frequencies to the nearest note in the tempered scale.",
    "As a pilot test, the 13 miniABC sequences were joined into a single long sequence of 234 letters (A, C, G, and T) and turned into music using piano and violin. Red notes represent DNA–K+ interactions in the minor groove, blue notes the major groove. Black notes are part of the musical composition.",
  ],
  dna_music_youtube_note: "Available on YouTube — link to be added.",
  creators_heading: "Creators",
  creators: [
    {
      name: "Nicolás Molla",
      body_html:
        'Musician, composer, and music producer. He has created music for film, advertising, and social projects, and now works as an independent producer in his own studio (<a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://nicomolla.com/">nicomolla.com</a>).',
    },
    {
      name: "Pablo Dans",
      body_html:
        "Researcher, teacher, and science communicator. International expert in nucleic acid structure (DNA and RNA) and in computational chemistry, molecular modeling, simulations, and structural bioinformatics.",
    },
  ],
  materials_heading: "Materials",
};

const sonES: SonifContent = {
  back: "← Divulgación",
  title: "Sonificación molecular",
  eyebrow: "ADN → Música",
  lede:
    "Una fusión entre la estructura del ADN, su interacción con el entorno biológico y la composición musical. Una invitación a escuchar la molécula de la vida a través de propiedades físicas extraídas de simulaciones y convertidas en señales audibles.",
  sections: [
    {
      heading: "¿Qué es la sonificación?",
      paragraphs: [
        "La sonificación es una forma de convertir datos en sonido para poder entenderlos mejor. En lugar de mostrar la información en gráficos o tablas, se transforma en señales acústicas que podemos escuchar. Así, lo que normalmente sería una serie de números o mediciones se convierte en un “paisaje sonoro” que refleja cómo se comporta un fenómeno, un experimento o un modelo.",
        "Este proceso no es automático: alguien decide qué datos se transformarán y cómo sonarán. Por ejemplo, una lectura más alta de un sensor puede convertirse en un tono más agudo, o un cambio brusco en una medición puede oírse como un golpe o un cambio de ritmo. De esta manera, la sonificación abre un nuevo camino para explorar, interpretar y comunicar información, aprovechando nuestra capacidad natural de reconocer patrones en lo que escuchamos.",
      ],
    },
    {
      heading: "La ciencia detrás",
      paragraphs: [
        "Las simulaciones de dinámica molecular son simulaciones computacionales que permiten observar cómo se mueven y cambian las moléculas que forman la vida — proteínas, ADN, ARN — a lo largo del tiempo. Funcionan aplicando las leyes de la física a cada átomo, lo que nos permite seguir sus trayectorias como si tuviéramos un microscopio virtual capaz de ver a nivel atómico y en cámara lenta.",
        "Estas simulaciones son sumamente útiles porque permiten explorar fenómenos imposibles de observar directamente en el laboratorio, como la forma exacta en que una secuencia de ADN se dobla, se pliega o se vuelve más rígida según la combinación de letras (bases) que la componen. Gracias a este enfoque ha quedado claro que las propiedades físicas del ADN — flexibilidad, rigidez y tendencia a curvarse — dependen fuertemente de su secuencia.",
        "Un rol clave en este avance lo cumple, y sigue cumpliendo, el Ascona B-DNA Consortium (ABC), una colaboración internacional de investigadores que viene generando simulaciones de ADN desde principios de los 2000, estableciendo estándares y bases de datos que hoy son referencia en el campo. DansLab integra el ABC desde 2014 y fue el último organizador de la conferencia ABC, realizada en abril de 2023 en Ascona, Suiza.",
      ],
    },
  ],
  examples_heading: "Ejemplos de sonificación molecular",
  examples: [
    { title: "Música a partir de secuencias de proteínas, con musicalidad reforzada por un programa que aprende de Chopin.", cite: "Tay. Heliyon. 2021" },
    { title: "Conversión de secuencias de aminoácidos en música clásica: una búsqueda de patrones auditivos.", cite: "Takahashi. Genome Biology. 2007" },
    { title: "Aproximación musical a la interpretación de datos de expresión génica en líneas de neuroblastoma.", cite: "Staege. Scientific Reports. 2015" },
    { title: "Patrones musicales para epigenómica comparativa.", cite: "Brocks. Clinical Epigenetics. 2015" },
    { title: "SNARE Dance: una interpretación musical del transporte de Atg9 al cluster tubulovesicular.", cite: "Takahashi. Autophagy. 2012" },
    { title: "La heterogeneidad de puentes de hidrógeno correlaciona con el tiempo de paso por el estado de transición en el plegamiento de proteínas.", cite: "Scaletti. PNAS. 2024" },
  ],
  examples_quote_1:
    "A pesar del filtrado y reordenamiento de los conjuntos de sondas, las melodías resultantes en los ejemplos presentados son bastante abstractas y su potencial evocativo es difícil de predecir. Probablemente la familiaridad con esas melodías se lograría más rápido si se incluyeran disonancias de melodías conocidas.",
  examples_quote_2:
    "Después de asignar un instrumento a cada partitura proteica, combinamos las partituras individuales en una orquestación final.",
  vickers_quote:
    "Como las sonificaciones difíciles o fatigosas de escuchar serán menos exitosas, se han hecho intentos valientes por incorporar elementos de composición a los mapeos sonoros. Como la música está diseñada para captar y mantener el interés del oyente, una sonificación más musical seguramente será mejor que una que no lo es. Sin embargo, las sonificaciones supuestamente musicales suelen seguir siendo fatigosas o poco atractivas. Y al revés: el objetivo de comunicar información esencial puede quedar enmascarado por el esfuerzo por lograr una expresión musical más fuerte.",
  vickers_attribution:
    "Vickers, P. (2017). Sonification and music, music and sonification. En Cobussen, M., Meelberg, V. y Truax, B. (eds.), The Routledge Companion to Sounding Art, 135–144. Routledge, Oxford.",
  dna_music_paragraphs: [
    "Buscando seguir el equilibrio entre datos y composición que describe Vickers, transformamos la interacción entre el ADN y los cationes de potasio (K+).",
    "Para todas las secuencias posibles de cuatro letras, se midió la interacción en los surcos mayor y menor del ADN. Las frecuencias de interacción se multiplicaron por un factor para llevarlas al rango audible humano. Los valores resultantes se redondearon mapeando las frecuencias a la nota más cercana de la escala temperada.",
    "Como prueba piloto, las 13 secuencias miniABC se unieron en una secuencia larga de 234 letras (A, C, G y T) y se convirtieron en música usando piano y violín. Las notas rojas representan interacciones ADN–K+ en el surco menor, y las azules en el surco mayor. Las notas negras forman parte de la composición musical.",
  ],
  dna_music_youtube_note: "Disponible en YouTube — link a agregar.",
  creators_heading: "Creadores",
  creators: [
    {
      name: "Nicolás Molla",
      body_html:
        'Músico, compositor y productor musical. Ha creado música para cine, publicidad y proyectos sociales, y actualmente trabaja como productor independiente en su propio estudio (<a class="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer" href="https://nicomolla.com/">nicomolla.com</a>).',
    },
    {
      name: "Pablo Dans",
      body_html:
        "Investigador, docente y divulgador científico. Experto internacional en estructura de ácidos nucleicos (ADN y ARN) y en química computacional, modelado molecular, simulaciones y bioinformática estructural.",
    },
  ],
  materials_heading: "Materiales",
};

export const SONIF: Record<Lang, SonifContent> = { en: sonEN, es: sonES };
