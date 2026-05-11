"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Clock,
  Users,
  Star,
  Monitor,
  Calendar,
  CheckCircle,
  BookOpen,
  Award,
  ChevronRight,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { courses } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { use, useState, useEffect } from "react"

interface CoursePageProps {
  params: Promise<{ id: string }>
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  const { id } = use(params)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("userLoggedIn") === "true")
  }, [])

  const course = courses.find((c) => c.id === id)

  if (!course) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero banner */}
      <section className="relative bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${course.image})` }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/50 text-sm mb-6" aria-label="Ruta de navegación">
            <Link href="/" className="hover:text-white/80 transition-colors">Inicio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/cursos" className="hover:text-white/80 transition-colors">Cursos</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80 truncate max-w-[200px]">{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left — info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-teal/20 text-teal border-teal/30">{course.category}</Badge>
                {course.badge && (
                  <Badge className="bg-teal text-white border-0">{course.badge}</Badge>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-4 text-balance">
                {course.title}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-6">{course.subtitle}</p>

              <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-6">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <strong className="text-white">{course.rating}</strong>
                  <span>({course.students.toLocaleString("es-MX")} alumnos)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal" />
                  {course.duration} · {course.sessions} sesiones
                </span>
                <span className="flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-teal" />
                  {course.modality}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-teal" />
                  Nivel {course.level}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
                  <span className="text-teal font-bold">{course.instructor[0]}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{course.instructor}</p>
                  <p className="text-white/50 text-xs">{course.instructorTitle}</p>
                </div>
              </div>
            </div>

            {/* Right — sticky card (desktop) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left col */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Description */}
            <section>
              <h2 className="font-semibold text-xl text-foreground mb-4">Acerca del programa</h2>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </section>

            {/* Objectives */}
            <section>
              <h2 className="font-semibold text-xl text-foreground mb-4">Objetivos de aprendizaje</h2>
              <ul className="flex flex-col gap-3">
                {course.objectives.map((obj) => (
                  <li key={obj} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Syllabus */}
            <section>
              <h2 className="font-semibold text-xl text-foreground mb-4">Contenido del programa</h2>
              <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                {course.syllabus.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-5 py-4 bg-card hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-navy/10 text-navy flex items-center justify-center shrink-0 text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-sm text-foreground font-medium">{item.topic}</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-4">{item.week}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Instructor */}
            <section>
              <h2 className="font-semibold text-xl text-foreground mb-4">Tu docente</h2>
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                  <span className="text-teal font-bold text-2xl">{course.instructor[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg">{course.instructor}</p>
                  <p className="text-teal text-sm mb-3">{course.instructorTitle}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Especialista con más de 15 años de experiencia en el sector. Ha liderado proyectos
                    de alto impacto en organizaciones líderes a nivel nacional e internacional. Docente
                    certificado con reconocimiento académico y empresarial.
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {course.rating} calificación
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-teal" />
                      {course.students.toLocaleString("es-MX")} alumnos
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-teal" />3 cursos
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky sidebar card */}
          <div className="lg:sticky lg:top-20">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
              {/* Image */}
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${course.image})` }}
                aria-hidden="true"
              />
              <div className="p-6 flex flex-col gap-5">
                <div>
                  <p className="text-3xl font-bold text-navy">
                    ${course.price.toLocaleString("es-MX")}
                    <span className="text-sm font-normal text-muted-foreground"> MXN</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Pago único · Financiamiento disponible</p>
                </div>

                <Link href={isLoggedIn ? `/cursos/${course.id}/inscripcion` : "/registrarse"}>
                  <Button size="lg" className="w-full bg-teal hover:bg-teal/90 text-white h-12 text-base font-semibold">
                    {isLoggedIn ? "Inscribirme ahora" : "Crea una cuenta para inscribirte"}
                  </Button>
                </Link>

                <div className="border-t border-border pt-4 flex flex-col gap-3">
                  {[
                    { icon: Calendar, label: "Inicio", value: course.startDate },
                    { icon: Clock, label: "Duración", value: course.duration },
                    { icon: Monitor, label: "Modalidad", value: course.modality },
                    { icon: BookOpen, label: "Sesiones", value: `${course.sessions} sesiones` },
                    { icon: Award, label: "Nivel", value: course.level },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon className="w-4 h-4 text-teal" />
                        {label}
                      </div>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Horario</p>
                  <p className="text-sm text-foreground">{course.schedule}</p>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Garantía de satisfacción de 7 días o reembolso completo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
