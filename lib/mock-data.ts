export interface Course {
  id: string
  title: string
  subtitle: string
  category: string
  duration: string
  modality: string
  sessions: number
  price: number
  rating: number
  students: number
  instructor: string
  instructorTitle: string
  level: string
  tags: string[]
  description: string
  objectives: string[]
  syllabus: { week: string; topic: string }[]
  startDate: string
  schedule: string
  image: string
  featured?: boolean
  badge?: string
}

export const courses: Course[] = [
  {
    id: "diplomado-finanzas",
    title: "Diplomado en Finanzas Corporativas",
    subtitle: "Domina la gestión financiera estratégica en entornos empresariales complejos",
    category: "Finanzas",
    duration: "5 meses",
    modality: "Híbrida",
    sessions: 20,
    price: 18500,
    rating: 4.9,
    students: 1240,
    instructor: "Dra. Fernanda Ortiz",
    instructorTitle: "PhD en Economía – ITAM",
    level: "Avanzado",
    tags: ["Finanzas", "Estrategia", "Inversiones"],
    description:
      "Programa intensivo diseñado para profesionales que buscan consolidar sus competencias en análisis financiero, valuación de empresas y gestión del riesgo corporativo. Desarrollado con metodología basada en casos reales del entorno mexicano e internacional.",
    objectives: [
      "Aplicar modelos avanzados de valuación de activos y empresas",
      "Diseñar estrategias de financiamiento corporativo óptimas",
      "Gestionar portafolios de inversión bajo criterios de riesgo-rendimiento",
      "Interpretar estados financieros en contextos regulatorios reales",
    ],
    syllabus: [
      { week: "Semanas 1–3", topic: "Fundamentos del análisis financiero" },
      { week: "Semanas 4–6", topic: "Valuación de empresas y modelos DCF" },
      { week: "Semanas 7–9", topic: "Gestión de riesgo y coberturas" },
      { week: "Semanas 10–12", topic: "Mercados de capitales y derivados" },
      { week: "Semanas 13–16", topic: "Finanzas internacionales y fusiones" },
      { week: "Semanas 17–20", topic: "Proyecto integrador y presentación" },
    ],
    startDate: "14 de abril, 2025",
    schedule: "Martes y jueves, 19:00 – 22:00 h",
    image: "/images/course-finance.jpg",
    featured: true,
    badge: "Más inscrito",
  },
  {
    id: "diplomado-transformacion-digital",
    title: "Diplomado en Transformación Digital",
    subtitle: "Lidera la adopción tecnológica y la innovación dentro de tu organización",
    category: "Tecnología",
    duration: "4 meses",
    modality: "En línea",
    sessions: 16,
    price: 15900,
    rating: 4.8,
    students: 987,
    instructor: "Dr. Carlos Mendoza",
    instructorTitle: "Director de Innovación – TechMX",
    level: "Intermedio",
    tags: ["Digital", "Innovación", "Liderazgo"],
    description:
      "Programa orientado a líderes y gerentes que desean guiar procesos de transformación digital en sus organizaciones, integrando metodologías ágiles, inteligencia de datos y gestión del cambio.",
    objectives: [
      "Diseñar hojas de ruta de transformación digital",
      "Implementar metodologías ágiles y DevOps en equipos",
      "Analizar datos empresariales para toma de decisiones",
      "Gestionar el cambio organizacional ante nuevas tecnologías",
    ],
    syllabus: [
      { week: "Semanas 1–2", topic: "Ecosistema digital y tendencias" },
      { week: "Semanas 3–5", topic: "Agilidad y metodologías ágiles" },
      { week: "Semanas 6–8", topic: "Datos, IA y automatización" },
      { week: "Semanas 9–11", topic: "Customer Experience digital" },
      { week: "Semanas 12–14", topic: "Ciberseguridad y cumplimiento" },
      { week: "Semanas 15–16", topic: "Proyecto de transformación" },
    ],
    startDate: "28 de abril, 2025",
    schedule: "Lunes y miércoles, 18:00 – 21:00 h",
    image: "/images/course-digital.jpg",
    badge: "Nuevo",
  },
  {
    id: "diplomado-derecho-corporativo",
    title: "Diplomado en Derecho Corporativo",
    subtitle: "Especialización en régimen legal de empresas, contratos y cumplimiento normativo",
    category: "Derecho",
    duration: "6 meses",
    modality: "Presencial",
    sessions: 24,
    price: 21000,
    rating: 4.7,
    students: 634,
    instructor: "Lic. Adriana Villanueva",
    instructorTitle: "Socia senior – V&R Abogados",
    level: "Avanzado",
    tags: ["Legal", "Compliance", "Contratos"],
    description:
      "Diplomado integral para abogados y profesionales del área legal que buscan especializarse en derecho societario, régimen fiscal corporativo, fusiones y adquisiciones, y gobierno corporativo.",
    objectives: [
      "Redactar y negociar contratos corporativos complejos",
      "Aplicar normativa fiscal y de cumplimiento regulatorio",
      "Estructurar operaciones de M&A y due diligence",
      "Implementar prácticas de gobierno corporativo y ESG",
    ],
    syllabus: [
      { week: "Semanas 1–4", topic: "Derecho societario y constitución" },
      { week: "Semanas 5–8", topic: "Contratos mercantiles y garantías" },
      { week: "Semanas 9–12", topic: "Régimen fiscal corporativo" },
      { week: "Semanas 13–16", topic: "Fusiones, adquisiciones y reestructuras" },
      { week: "Semanas 17–20", topic: "Gobierno corporativo y ESG" },
      { week: "Semanas 21–24", topic: "Litigio corporativo y arbitraje" },
    ],
    startDate: "7 de mayo, 2025",
    schedule: "Sábados, 09:00 – 14:00 h",
    image: "/images/course-law.jpg",
  },
  {
    id: "diplomado-marketing-estrategico",
    title: "Diplomado en Marketing Estratégico",
    subtitle: "De la estrategia de marca al performance digital medible y escalable",
    category: "Marketing",
    duration: "4 meses",
    modality: "Híbrida",
    sessions: 18,
    price: 14500,
    rating: 4.8,
    students: 1105,
    instructor: "Mtra. Sofía Reyes",
    instructorTitle: "CMO en Grupo Expansión",
    level: "Intermedio",
    tags: ["Branding", "Performance", "Analytics"],
    description:
      "Programa diseñado para directores, gerentes y consultores de marketing que desean integrar visión estratégica con ejecución digital de alto rendimiento, incluyendo data analytics y growth hacking.",
    objectives: [
      "Construir estrategias de marca sólidas y diferenciadas",
      "Diseñar campañas de performance con KPIs medibles",
      "Utilizar herramientas de analytics para optimización continua",
      "Integrar canales offline y online en estrategias omnicanal",
    ],
    syllabus: [
      { week: "Semanas 1–3", topic: "Estrategia de marca y posicionamiento" },
      { week: "Semanas 4–6", topic: "Marketing digital y SEO/SEM" },
      { week: "Semanas 7–9", topic: "Data analytics y atribución" },
      { week: "Semanas 10–12", topic: "Content marketing y redes sociales" },
      { week: "Semanas 13–16", topic: "Growth hacking y experimentos" },
      { week: "Semanas 17–18", topic: "Proyecto final de campaña" },
    ],
    startDate: "21 de abril, 2025",
    schedule: "Miércoles y viernes, 19:00 – 21:30 h",
    image: "/images/course-marketing.jpg",
    badge: "Alta demanda",
  },
  {
    id: "diplomado-recursos-humanos",
    title: "Diplomado en Gestión Estratégica de Talento",
    subtitle: "Transforma la función de RRHH en un motor de ventaja competitiva",
    category: "Recursos Humanos",
    duration: "3 meses",
    modality: "En línea",
    sessions: 12,
    price: 11900,
    rating: 4.6,
    students: 756,
    instructor: "Mtra. Patricia Salinas",
    instructorTitle: "VP of People – Kavak",
    level: "Intermedio",
    tags: ["Talento", "Cultura", "HRBP"],
    description:
      "Diplomado para líderes y profesionales de recursos humanos que buscan evolucionar de una función operativa a una función estratégica alineada con los objetivos del negocio.",
    objectives: [
      "Diseñar estrategias de atracción y retención de talento",
      "Implementar sistemas de evaluación del desempeño basados en OKRs",
      "Construir culturas organizacionales de alto rendimiento",
      "Utilizar people analytics para decisiones basadas en datos",
    ],
    syllabus: [
      { week: "Semanas 1–2", topic: "HR como socio estratégico del negocio" },
      { week: "Semanas 3–4", topic: "Atracción, selección y employer branding" },
      { week: "Semanas 5–6", topic: "Gestión del desempeño y OKRs" },
      { week: "Semanas 7–8", topic: "Cultura organizacional y engagement" },
      { week: "Semanas 9–10", topic: "People analytics y compensaciones" },
      { week: "Semanas 11–12", topic: "Proyecto integrador" },
    ],
    startDate: "5 de mayo, 2025",
    schedule: "Lunes y jueves, 19:00 – 21:00 h",
    image: "/images/course-hr.jpg",
  },
  {
    id: "diplomado-supply-chain",
    title: "Diplomado en Operaciones y Supply Chain",
    subtitle: "Optimización de cadenas de valor globales en entornos VUCA",
    category: "Operaciones",
    duration: "4 meses",
    modality: "Presencial",
    sessions: 16,
    price: 16200,
    rating: 4.7,
    students: 489,
    instructor: "Dr. Roberto Castillo",
    instructorTitle: "Director de Operaciones – DHL México",
    level: "Avanzado",
    tags: ["Logística", "Lean", "Operaciones"],
    description:
      "Programa especializado para profesionales de operaciones, logística y manufactura que buscan optimizar procesos, reducir costos y construir cadenas de suministro resilientes y sostenibles.",
    objectives: [
      "Aplicar metodologías Lean Six Sigma en procesos productivos",
      "Diseñar redes logísticas globales eficientes",
      "Gestionar riesgos en la cadena de suministro",
      "Implementar tecnologías Industry 4.0 en operaciones",
    ],
    syllabus: [
      { week: "Semanas 1–3", topic: "Fundamentos de supply chain moderno" },
      { week: "Semanas 4–6", topic: "Lean manufacturing y Six Sigma" },
      { week: "Semanas 7–9", topic: "Logística y distribución global" },
      { week: "Semanas 10–12", topic: "Gestión de inventarios y demanda" },
      { week: "Semanas 13–15", topic: "Tecnología e Industry 4.0" },
      { week: "Semanas 16", topic: "Simulación y proyecto integrador" },
    ],
    startDate: "12 de mayo, 2025",
    schedule: "Viernes 16:00 – 20:00 h y sábados 09:00 – 13:00 h",
    image: "/images/course-supply.jpg",
  },
]

export const enrollmentStatuses = [
  {
    id: "pending-docs",
    label: "Documentos pendientes",
    description: "Aún faltan documentos por subir para completar tu expediente.",
    color: "amber",
    icon: "clock",
  },
  {
    id: "under-review",
    label: "En revisión",
    description: "Tu solicitud fue recibida y está siendo revisada por el área de admisiones.",
    color: "blue",
    icon: "search",
  },
  {
    id: "approved",
    label: "Inscripción aprobada",
    description: "¡Felicidades! Tu inscripción ha sido aprobada. Ya puedes acceder al campus virtual.",
    color: "green",
    icon: "check",
  },
  {
    id: "rejected",
    label: "Documentación rechazada",
    description: "Algunos documentos no cumplen los requisitos. Revisa las observaciones y vuelve a subir.",
    color: "red",
    icon: "x",
  },
]

export type EnrollmentStatus = "pending-docs" | "under-review" | "approved" | "rejected"

export interface MockEnrollment {
  courseId: string
  courseName: string
  email?: string
  status: EnrollmentStatus
  submittedAt: string
  reviewedAt?: string
  paymentConfirmed: boolean
  amount: number
  documents: {
    name: string
    type: string
    status: "accepted" | "pending" | "rejected"
    note?: string
  }[]
}

export const mockEnrollment: MockEnrollment = {
  courseId: "diplomado-finanzas",
  courseName: "Diplomado en Finanzas Corporativas",
  email: "usuario@ejemplo.com",

  status: "under-review",
  submittedAt: "15 de marzo, 2025",
  reviewedAt: undefined,
  paymentConfirmed: true,
  amount: 18500,
  documents: [
    { name: "Título universitario", type: "Identificación", status: "accepted" },
    { name: "Cédula profesional", type: "Identificación", status: "accepted" },
    { name: "CV actualizado", type: "Documentación", status: "pending" },
    { name: "Carta de motivos", type: "Documentación", status: "rejected", note: "El documento no es legible. Por favor sube una versión con mejor resolución." },
  ],
}
