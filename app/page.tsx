"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, Users, BookOpen, Award, ChevronRight, Star, TrendingUp, Shield, Clock, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CourseCard } from "@/components/course-card"
import { courses } from "@/lib/mock-data"

const stats = [
  { value: "12,400+", label: "Profesionales certificados" },
  { value: "94%", label: "Tasa de satisfacción" },
  { value: "48", label: "Programas activos" },
  { value: "180+", label: "Docentes expertos" },
]

const benefits = [
  {
    icon: TrendingUp,
    title: "Aprendizaje enfocado en resultados",
    description: "Cada programa está diseñado para generar impacto inmediato en tu rol profesional.",
  },
  {
    icon: Users,
    title: "Docentes en activo",
    description: "Aprende de líderes empresariales y académicos que operan en los mercados hoy.",
  },
  {
    icon: Shield,
    title: "Proceso de inscripción claro",
    description: "Sistema transparente con seguimiento de tu solicitud en tiempo real, sin ambigüedades.",
  },
  {
    icon: Clock,
    title: "Horarios diseñados para profesionales",
    description: "Modalidades presenciales, en línea e híbridas adaptadas a tu agenda ejecutiva.",
  },
]

const testimonials = [
  {
    name: "Elena Gutiérrez",
    role: "Directora Financiera – Grupo Carso",
    text: "El diplomado en finanzas transformó completamente mi perspectiva sobre valuación de empresas. La calidad de los docentes y la estructura del programa son excepcionales.",
    rating: 5,
    course: "Finanzas Corporativas",
  },
  {
    name: "Rodrigo Medina",
    role: "Gerente de Operaciones – Cemex",
    text: "El proceso de inscripción fue claro y rápido. Pude subir todos mis documentos sin complicaciones y en menos de una semana ya tenía mi confirmación.",
    rating: 5,
    course: "Operaciones y Supply Chain",
  },
  {
    name: "Alejandra Fuentes",
    role: "Head of Marketing – MercadoLibre México",
    text: "Excelente programa. Los proyectos reales y el networking con otros directivos fue invaluable para mi carrera.",
    rating: 5,
    course: "Marketing Estratégico",
  },
]

const featuredCourses = courses.slice(0, 3)

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("userLoggedIn") === "true")
  }, [])

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar variant="solid" />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-uady-azul">
        {/* Decorative elements - diagonal backgrounds like in the image */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--uady-dorado),transparent)]"></div>
          <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-uady-dorado rounded-full blur-[100px]"></div>
        </div>

        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-20">
           <div className="col-span-8 h-full bg-gradient-to-r from-uady-azul to-transparent transform -skew-x-12 translate-x-32 border-r border-uady-dorado/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12 mt-12 md:mt-0">
          <div className="max-w-3xl flex-1">
            <div className="inline-flex items-center gap-2 bg-uady-dorado/10 border border-uady-dorado/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-uady-dorado animate-pulse" aria-hidden="true" />
              <span className="text-uady-dorado text-sm font-bold tracking-tight uppercase">Inscripciones abiertas — Ciclo 2025</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] text-balance mb-8">
              {isLoggedIn ? (
                <>
                  Educación continua para profesionistas que <br/>
                  <span className="text-uady-dorado">lideran el futuro</span>
                </>
              ) : (
                <>
                  Tu próximo gran salto <br/>
                  <span className="text-uady-dorado">comienza aquí</span>
                </>
              )}
            </h1>

            <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl font-light">
              {isLoggedIn 
                ? "Bienvenido de nuevo. Continúa tu especialización con los programas diseñados por la Universidad Autónoma de Yucatán."
                : "Únete a la red de profesionistas más importante de la región. Crea tu cuenta en minutos y comienza tu proceso de inscripción 100% digital."
              }
            </p>

            <div className="flex flex-wrap gap-5">
              {!isLoggedIn ? (
                <>
                  <Link href="/registrarse">
                    <Button size="lg" className="bg-uady-dorado hover:bg-uady-dorado-80 text-uady-azul font-bold gap-2 h-14 px-10 text-lg shadow-[0_4px_20px_rgba(186,137,18,0.3)] transition-all">
                      Crear mi cuenta
                      <UserPlus className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/cursos">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-white/40 text-white hover:text-white hover:bg-white/10 h-14 px-10 text-lg transition-all"
                    >
                      Ver catálogo
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/cursos">
                    <Button size="lg" className="bg-uady-dorado hover:bg-uady-dorado-80 text-uady-azul font-bold gap-2 h-14 px-10 text-lg shadow-[0_4px_20px_rgba(186,137,18,0.3)] transition-all">
                      Explorar programas
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/#about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-white/40 text-white hover:text-white hover:bg-white/10 h-14 px-10 text-lg transition-all"
                    >
                      Conocer más
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right side decorative element - mimicking the app screenshot from UADY image */}
          <div className="hidden lg:flex flex-1 relative justify-center">
             <div className="w-64 h-auto aspect-[9/19] bg-white rounded-[3rem] border-[8px] border-uady-azul-80 shadow-2xl overflow-hidden rotate-2 relative z-10 group hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-uady-azul flex flex-col p-4 pt-12 items-center text-center">
                   <div className="w-16 h-16 bg-uady-dorado rounded-2xl flex items-center justify-center mb-6">
                      <BookOpen className="w-8 h-8 text-uady-azul" />
                   </div>
                   <h4 className="text-white font-serif text-xl font-bold mb-2">Campus Digital</h4>
                   <p className="text-white/60 text-[10px] uppercase tracking-widest mb-8">Tu credencial universitaria</p>
                   <div className="space-y-3 w-full">
                      <div className="h-2 w-full bg-white/10 rounded"></div>
                      <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                      <div className="h-2 w-full bg-white/10 rounded"></div>
                   </div>
                </div>
                {/* Mock image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-uady-dorado/40 to-transparent"></div>
             </div>
             {/* Background glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-uady-dorado/20 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-uady-azul-80 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <p className="font-serif text-4xl font-bold text-uady-dorado mb-2 group-hover:scale-110 transition-transform">{stat.value}</p>
                <p className="text-xs text-white/60 uppercase tracking-widest font-bold font-sans">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlighted CTA Card */}
      <section className="py-12 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-uady-dorado rounded-3xl p-10 md:p-14 shadow-[0_20px_50px_rgba(186,137,18,0.4)] flex flex-col lg:flex-row items-center justify-between gap-10 border border-white/20 relative overflow-hidden group">
            {/* Background pattern/glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-2 bg-uady-azul/10 rounded-full px-4 py-1 mb-6">
                 <span className="w-2 h-2 rounded-full bg-uady-azul animate-pulse"></span>
                 <span className="text-uady-azul text-xs font-bold uppercase tracking-wider">Convocatoria Vigente</span>
              </div>
              <h2 className="text-uady-azul font-serif text-3xl md:text-5xl font-bold mb-6 leading-tight">
                ¿Buscas llevar tu carrera al <br className="hidden md:block" />
                <span className="bg-uady-azul text-white px-2 py-1 rotate-1 inline-block mt-1">siguiente nivel?</span>
              </h2>
              <p className="text-uady-azul/80 text-xl max-w-xl font-medium leading-relaxed">
                Nuestros programas de educación continua están diseñados para profesionales que buscan impacto real y networking de alto nivel.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row gap-5 w-full lg:w-auto">
              <Link href="/registrarse" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-uady-azul text-white hover:bg-uady-azul/90 h-16 px-10 text-xl font-bold shadow-xl">
                  Registrarse ahora
                </Button>
              </Link>
              <Link href="/cursos" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-uady-azul/30 text-uady-azul hover:bg-white/20 h-16 px-10 text-xl font-bold transition-all">
                  Explorar cursos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="py-24 bg-white" id="cursos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-l-4 border-uady-dorado pl-6">
            <div>
              <p className="text-uady-azul/60 text-xs font-bold uppercase tracking-[0.2em] mb-3">Actualidad Universitaria</p>
              <h2 className="font-serif text-4xl font-bold text-uady-azul text-balance">
                Programas de Educación Continua
              </h2>
            </div>
            <Link href="/cursos" className="flex items-center gap-2 text-uady-azul font-bold text-sm hover:text-uady-dorado transition-colors group">
              Explorar todo el catálogo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-uady-azul-10" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 border-l-4 border-uady-dorado pl-6">
            <p className="text-uady-azul/60 text-xs font-bold uppercase tracking-[0.2em] mb-3">¿Por qué ECFCA?</p>
            <h2 className="font-serif text-4xl font-bold text-uady-azul text-balance">
              Diseñado para quienes no tienen tiempo que perder
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:border-uady-dorado/30 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-uady-dorado/10 flex items-center justify-center mb-6 group-hover:bg-uady-dorado transition-colors">
                    <Icon className="w-6 h-6 text-uady-dorado group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-uady-azul mb-3 text-lg leading-snug">{benefit.title}</h3>
                  <p className="text-sm text-uady-azul/60 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-uady-dorado text-xs font-bold uppercase tracking-[0.2em] mb-3">Proceso de inscripción</p>
            <h2 className="font-serif text-4xl font-bold text-uady-azul text-balance">
              Inscríbete en 3 pasos simples
            </h2>
            <p className="mt-4 text-uady-azul/60 leading-relaxed font-light">
              Proceso digital diseñado para completarse rápidamente, con validación inmediata de documentos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Elige tu programa",
                description: "Explora el catálogo y selecciona el diplomado que mejor se adapta a tus metas profesionales.",
                cta: "Ver cursos",
                href: "/cursos",
              },
              {
                step: "02",
                title: "Sube tu documentación",
                description: "Carga tu título, cédula y CV en PDF, JPG o PNG. El sistema valida los formatos automáticamente.",
                cta: null,
                href: null,
              },
              {
                step: "03",
                title: "Confirma tu pago",
                description: "Realiza tu pago de manera segura. Recibirás confirmación inmediata y podrás rastrear tu estatus.",
                cta: null,
                href: null,
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {i < 2 && (
                  <div
                    className="hidden md:block absolute top-8 left-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] h-px border-t-2 border-dashed border-border z-0"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-uady-azul flex items-center justify-center shrink-0 shadow-lg shadow-uady-azul/20">
                    <span className="font-serif text-2xl font-bold text-uady-dorado">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-uady-azul mb-3">{item.title}</h3>
                    <p className="text-uady-azul/60 text-sm leading-relaxed mb-4">{item.description}</p>
                    {item.cta && item.href && (
                      <Link href={item.href} className="inline-flex items-center gap-2 text-uady-dorado font-bold text-sm hover:underline underline-offset-4">
                        {item.cta} <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-uady-azul relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-uady-dorado/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-uady-dorado text-xs font-bold uppercase tracking-[0.2em] mb-3">Testimonios</p>
            <h2 className="font-serif text-4xl font-bold text-white text-balance">
              Experiencias de nuestros egresados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5">{`"${t.text}"`}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-uady-dorado/10 flex items-center justify-center shrink-0 border border-uady-dorado/20">
                    <span className="text-uady-dorado font-bold text-lg">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-uady-dorado/60 text-xs uppercase tracking-widest font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-uady-dorado relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Award className="w-16 h-16 text-uady-azul/20 mx-auto mb-6" />
          <h2 className="font-serif text-4xl font-bold text-uady-azul mb-6 text-balance max-w-3xl mx-auto">
            ¿Listo para dar el siguiente paso en tu carrera profesional?
          </h2>
          <p className="text-uady-azul/70 text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Forma parte de la próxima generación UADY. Inscripciones abiertas con cupos limitados por programa.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href={isLoggedIn ? "/mi-cuenta" : "/cursos"}>
              <Button size="lg" className="bg-uady-azul text-white hover:text-white hover:bg-uady-azul/90 h-14 px-10 text-lg font-bold shadow-xl shadow-uady-azul/20 transition-all">
                {isLoggedIn ? "Ir a mi cuenta" : "Ver programas disponibles"}
              </Button>
            </Link>
            {!isLoggedIn && (
              <Link href="/registrarse">
                <Button size="lg" variant="outline" className="border-uady-azul/30 text-uady-azul hover:bg-white/50 h-14 px-10 text-lg font-bold transition-all">
                  Crear mi cuenta
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
