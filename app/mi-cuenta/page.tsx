"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  BookOpen,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  RefreshCw,
  Calendar,
  CreditCard,
  ChevronRight,
  Award,
  Mail,
  Phone,
  Building2,
  MapPin,
  Edit3,
  Download,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { courses } from "@/lib/mock-data"
import type { EnrollmentStatus } from "@/lib/mock-data"
import { getUserDashboardAction } from "@/lib/actions"
import { useEffect } from "react"

// --- Mock data fallback ---

interface EnrolledCourse {
  id: string
  courseId: string
  courseName: string
  category: string
  image: string
  startDate: string
  status: string // pending-docs, under-review, approved, rejected
  paymentConfirmed: boolean
  amount: number
  submittedAt: string
  progress: number
  documentsAccepted: number
  documentsTotal: number
  documents: any[]
}

interface UserProfile {
  name: string
  email: string
  company: string
  memberSince: string
  initials: string
  phone?: string // Opcionales en DB pero útiles para la UI
  city?: string
  degree?: string
}

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string; bg: string; border: string }
> = {
  "pending-docs": {
    label: "Documentos pendientes",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  "under-review": {
    label: "En revisión",
    icon: RefreshCw,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  approved: {
    label: "Inscripción aprobada",
    icon: CheckCircle,
    color: "text-teal",
    bg: "bg-teal/5",
    border: "border-teal/20",
  },
  rejected: {
    label: "Documentación rechazada",
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/5",
    border: "border-destructive/20",
  },
}

const TABS = ["Mis cursos", "Mi perfil", "Documentos y pagos"] as const
type Tab = (typeof TABS)[number]

export default function MiCuentaPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Mis cursos")
  const [user, setUser] = useState<UserProfile | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const response = await getUserDashboardAction()
        
        if (response.success && response.user) {
          setUser(response.user)
          setEnrolledCourses(response.enrolledCourses || [])
        } else {
          setError(response.error || "No se pudo cargar la sesión.")
        }
      } catch (err) {
        console.error("Error al conectar con las Server Actions:", err)
        setError("Error de red o del servidor al intentar conectar.")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  // Estado de carga inicial
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <RefreshCw className="w-8 h-8 text-teal animate-spin mb-2" />
        <p className="text-sm text-muted-foreground">Cargando tu cuenta...</p>
      </div>
    )
  }

  // Estado de error o sesión no encontrada
  if (error || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar isLoggedIn={false} />
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <AlertCircle className="w-12 h-12 text-destructive mb-3" />
          <h2 className="text-xl font-bold mb-1">Acceso Denegado / Error</h2>
          <p className="text-muted-foreground text-center max-w-md mb-4">
            {error || "Inicia sesión para poder visualizar los datos de tu cuenta."}
          </p>
          <Link href="/login">
            <Button className="bg-teal text-white">Ir al Login</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Cálculos dinámicos con datos reales de la DB
  const totalInvested = enrolledCourses
    .filter((c) => c.paymentConfirmed)
    .reduce((acc, c) => acc + c.amount, 0)
    
  const approvedCount = enrolledCourses.filter((c) => c.status === "approved").length
  const pendingCount = enrolledCourses.filter(
    (c) => c.status === "under-review" || c.status === "pending-docs"
  ).length
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn />

      {/* Profile header */}
      <section className="bg-navy py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-teal flex items-center justify-center shrink-0">
              <span className="font-serif text-2xl font-bold text-white">{user.initials}</span>
            </div>

            <div className="flex-1">
              <p className="text-teal text-xs font-semibold uppercase tracking-wider mb-1">
                Mi cuenta
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {user.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-1.5">
                <span className="flex items-center gap-1.5 text-white/60 text-sm">
                  <Building2 className="w-3.5 h-3.5" />
                  {user.company}
                </span>
                <span className="flex items-center gap-1.5 text-white/60 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {user.city}
                </span>
                <span className="flex items-center gap-1.5 text-white/60 text-sm">
                  <Award className="w-3.5 h-3.5" />
                  Miembro desde {user.memberSince}
                </span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex gap-5 sm:gap-8 shrink-0">
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-white">{enrolledCourses.length}</p>
                <p className="text-white/50 text-xs mt-0.5">Programas</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-white">{approvedCount}</p>
                <p className="text-white/50 text-xs mt-0.5">Aprobados</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-teal">
                  ${totalInvested.toLocaleString("es-MX")}
                </p>
                <p className="text-white/50 text-xs mt-0.5">Invertido MXN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-border bg-card sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-4 text-sm font-medium border-b-2 transition-colors -mb-px",
                  activeTab === tab
                    ? "border-teal text-teal"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* TAB: Mis cursos */}
        {activeTab === "Mis cursos" && (
          <div className="flex flex-col gap-6">
            {/* Summary chips */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Todos los programas", value: enrolledCourses.length, active: true },
                { label: "Aprobados", value: approvedCount, color: "text-teal" },
                { label: "En proceso", value: pendingCount, color: "text-blue-600" },
                {
                  label: "Pendientes de docs",
                  value: enrolledCourses.filter((c) => c.status === "pending-docs").length,
                  color: "text-amber-600",
                },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5"
                >
                  <span className={cn("font-bold text-sm", chip.color ?? "text-navy")}>
                    {chip.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{chip.label}</span>
                </div>
              ))}
            </div>

            {/* Course cards */}
            <div className="flex flex-col gap-4">
              {enrolledCourses.map((enrollment) => {
                const config = STATUS_CONFIG[enrollment.status] || STATUS_CONFIG["pending-docs"]
                const StatusIcon = config.icon  
                const course = courses.find((c) => c.id === enrollment.courseId)

                return (
                  <div
                    key={enrollment.courseId}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-teal/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Course image */}
                      <div
                        className="sm:w-44 h-32 sm:h-auto bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url('${enrollment.image}')` }}
                        aria-hidden="true"
                      />

                      {/* Content */}
                      <div className="flex-1 p-5 flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                                {enrollment.category}
                              </span>
                            </div>
                            <h3 className="font-semibold text-foreground leading-snug">
                              {enrollment.courseName}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                Inicio: {enrollment.startDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5" />
                                Docs: {enrollment.documentsAccepted}/{enrollment.documentsTotal} aceptados
                              </span>
                              <span className="flex items-center gap-1">
                                <CreditCard className="w-3.5 h-3.5" />
                                {enrollment.paymentConfirmed
                                  ? `$${enrollment.amount.toLocaleString("es-MX")} MXN — Pagado`
                                  : "Pago pendiente"}
                              </span>
                            </div>
                          </div>

                          {/* Status badge */}
                          <div
                            className={cn(
                              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium shrink-0",
                              config.bg,
                              config.border,
                              config.color
                            )}
                          >
                            <StatusIcon
                              className={cn(
                                "w-3.5 h-3.5",
                                enrollment.status === "under-review" ? "animate-spin" : ""
                              )}
                            />
                            {config.label}
                          </div>
                        </div>

                        {/* Progress bar (only for approved) */}
                        {enrollment.status === "approved" && enrollment.progress > 0 && (
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Progreso del programa</span>
                              <span className="font-medium text-teal">{enrollment.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-teal transition-all"
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2 mt-auto pt-1">
                          <Link href={`/cursos/${enrollment.courseId}`}>
                            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground h-8 px-3 text-xs">
                              <BookOpen className="w-3.5 h-3.5" />
                              Ver programa
                            </Button>
                          </Link>

                          {enrollment.status === "approved" && (
                            <Button size="sm" className="bg-teal hover:bg-teal/90 text-white gap-1.5 h-8 px-3 text-xs">
                              <Award className="w-3.5 h-3.5" />
                              Acceder al campus
                            </Button>
                          )}

                          {(enrollment.status === "pending-docs" || enrollment.status === "rejected") && (
                            <Link href={`/cursos/${enrollment.courseId}/inscripcion`}>
                              <Button size="sm" variant="outline" className="gap-1.5 h-8 px-3 text-xs text-foreground border-border">
                                <FileText className="w-3.5 h-3.5" />
                                Completar documentos
                              </Button>
                            </Link>
                          )}

                          <Link href={`/mi-inscripcion?id=${enrollment.courseId}`}>
                            <Button variant="ghost" size="sm" className="gap-1.5 text-teal h-8 px-3 text-xs">
                              Ver estatus detallado
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Explore more */}
            <div className="bg-navy rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Continúa aprendiendo</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Explora más diplomados y expande tus competencias profesionales.
                </p>
              </div>
              <Link href="/cursos">
                <Button className="bg-teal hover:bg-teal/90 text-white gap-2 shrink-0">
                  <BookOpen className="w-4 h-4" />
                  Ver catálogo completo
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* TAB: Mi perfil */}
        {activeTab === "Mi perfil" && (
          <div className="max-w-2xl flex flex-col gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-foreground">Información personal</h2>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground text-xs h-8">
                  <Edit3 className="w-3.5 h-3.5" />
                  Editar
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { icon: User, label: "Nombre completo", value: user.name },
                  { icon: Mail, label: "Correo electrónico", value: user.email },
                  { icon: Phone, label: "Teléfono", value: user.phone || "No proporcionado" },
                  { icon: Building2, label: "Empresa / Institución", value: user.company || "No proporcionado" },
                  { icon: MapPin, label: "Ciudad", value: user.city || "No proporcionado" },
                  { icon: Award, label: "Último grado académico", value: user.degree || "No proporcionado" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                    <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-teal" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-semibold text-foreground mb-4">Seguridad</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary">
                  <div>
                    <p className="text-sm font-medium text-foreground">Contraseña</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Última actualización: hace 45 días</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-foreground border-border text-xs h-8">
                    Cambiar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary">
                  <div>
                    <p className="text-sm font-medium text-foreground">Notificaciones por correo</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Activadas para cambios de estatus</p>
                  </div>
                  <span className="text-xs font-medium text-teal bg-teal/10 px-2.5 py-1 rounded-full border border-teal/20">
                    Activas
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Documentos y pagos */}
        {activeTab === "Documentos y pagos" && (
          <div className="flex flex-col gap-6">
            {enrolledCourses.map((enrollment) => (
              <div key={enrollment.courseId} className="bg-card border border-border rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border bg-secondary/40 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{enrollment.courseName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Inscripción enviada: {enrollment.submittedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {enrollment.paymentConfirmed ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-teal bg-teal/10 border border-teal/20 px-2.5 py-1 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Pago confirmado
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5" />
                        Pago pendiente
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Documents */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Documentos
                    </p>
                    <div className="flex flex-col gap-2">
                      {(enrollment.documentsTotal > 0
                        ? Array.from({ length: enrollment.documentsTotal }, (_, i) => ({
                            name: ["Título universitario", "Cédula profesional", "CV actualizado", "Carta de motivos"][i] ?? `Documento ${i + 1}`,
                            accepted: i < enrollment.documentsAccepted,
                          }))
                        : []
                      ).map((doc, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          {doc.accepted ? (
                            <CheckCircle className="w-4 h-4 text-teal shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                          )}
                          <span className={cn("text-sm", doc.accepted ? "text-foreground" : "text-muted-foreground")}>
                            {doc.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {(enrollment.status === "pending-docs" || enrollment.status === "rejected") && (
                      <Link href={`/cursos/${enrollment.courseId}/inscripcion`} className="block mt-3">
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs text-foreground border-border h-8">
                          <FileText className="w-3.5 h-3.5" />
                          Completar expediente
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Payment */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Pago
                    </p>
                    <div className="bg-secondary rounded-xl p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Monto</span>
                        <span className="text-sm font-semibold text-foreground">
                          ${enrollment.amount.toLocaleString("es-MX")} MXN
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Método</span>
                        <span className="text-xs text-foreground">Tarjeta de crédito</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Estado</span>
                        <span
                          className={cn(
                            "text-xs font-medium",
                            enrollment.paymentConfirmed ? "text-teal" : "text-amber-600"
                          )}
                        >
                          {enrollment.paymentConfirmed ? "Confirmado" : "Pendiente"}
                        </span>
                      </div>
                    </div>

                    {enrollment.paymentConfirmed && (
                      <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground text-xs h-8 mt-2 px-0">
                        <Download className="w-3.5 h-3.5" />
                        Descargar recibo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
