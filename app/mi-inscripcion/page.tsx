"use client"

import { useState } from "react"
import Link from "next/link"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  Upload,
  Bell,
  ChevronRight,
  RefreshCw,
  BookOpen,
  CreditCard,
  Calendar,
  Info,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockEnrollment, type EnrollmentStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const STATUS_CONFIG: Record<
  EnrollmentStatus,
  {
    label: string
    description: string
    icon: React.ElementType
    color: string
    bgColor: string
    borderColor: string
    badgeClass: string
  }
> = {
  "pending-docs": {
    label: "Documentos pendientes",
    description: "Aún faltan documentos por cargar para completar tu expediente de inscripción.",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
  },
  "under-review": {
    label: "En revisión",
    description:
      "Tu solicitud fue recibida exitosamente. El área de admisiones está revisando tu expediente.",
    icon: RefreshCw,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  approved: {
    label: "Inscripción aprobada",
    description:
      "¡Felicidades! Tu inscripción ha sido aprobada. Ya puedes acceder al campus virtual.",
    icon: CheckCircle,
    color: "text-teal",
    bgColor: "bg-teal/5",
    borderColor: "border-teal/20",
    badgeClass: "bg-teal/10 text-teal border-teal/20",
  },
  rejected: {
    label: "Documentación rechazada",
    description:
      "Algunos documentos no cumplen los requisitos. Revisa las observaciones y vuelve a cargar.",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
  },
}

const DOC_STATUS_CONFIG = {
  accepted: {
    icon: CheckCircle,
    label: "Aceptado",
    color: "text-teal",
    bg: "bg-teal/5 border-teal/20",
  },
  pending: {
    icon: Clock,
    label: "En revisión",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  rejected: {
    icon: AlertCircle,
    label: "Rechazado",
    color: "text-destructive",
    bg: "bg-destructive/5 border-destructive/20",
  },
}

const TIMELINE = [
  { label: "Solicitud enviada", date: "15 mar 2025", done: true },
  { label: "Pago confirmado", date: "15 mar 2025", done: true },
  { label: "Documentos en revisión", date: "16 mar 2025", done: true },
  { label: "Revisión en proceso", date: "En curso", done: false, active: true },
  { label: "Resolución y notificación", date: "Estimado: 18–20 mar", done: false },
]

// Status options for demo switching
const STATUS_OPTIONS: EnrollmentStatus[] = ["pending-docs", "under-review", "approved", "rejected"]

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function EnrollmentStatusContent() {
  const searchParams = useSearchParams()
  const courseIdParam = searchParams.get("id")
  
  const [currentStatus, setCurrentStatus] = useState<EnrollmentStatus>(mockEnrollment.status)
  const [enrollment, setEnrollment] = useState(mockEnrollment)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const myCourses = JSON.parse(localStorage.getItem("my_courses") || "[]")
    const activeId = courseIdParam || localStorage.getItem("activeEnrollment")
    
    if (activeId) {
      const saved = myCourses.find((c: any) => c.courseId === activeId)
      if (saved) {
        setEnrollment(saved)
        setCurrentStatus(saved.status)
      }
    }
  }, [courseIdParam])

  if (!mounted) return <div className="min-h-screen bg-navy" />

  const config = STATUS_CONFIG[currentStatus]
  const StatusIcon = config.icon

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar showStatus isLoggedIn />

      {/* Page header */}
      <section className="bg-navy py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-1">
                  Panel de inscripción
                </p>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Mi inscripción
                </h1>
                <p className="text-white/60 text-sm mt-1">
                  Consulta el estatus de tu solicitud en tiempo real
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <Link href="/cursos">
                  <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20 border-teal/30">
                    ← Volver a cursos
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-white/50 text-xs text-right w-full justify-end">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Actualizado: hace 2 min
                </div>
              </div>
            </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Demo status switcher */}
        <div className="bg-navy/5 border border-navy/10 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
            <Info className="w-4 h-4 text-navy" />
            <span className="font-medium">Demo interactivo — cambia el estatus:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setCurrentStatus(s)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  currentStatus === s
                    ? "bg-navy text-white border-navy"
                    : "bg-card text-muted-foreground border-border hover:border-navy/40"
                )}
              >
                {STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Status card */}
            <div
              className={cn(
                "rounded-2xl border p-6",
                config.bgColor,
                config.borderColor
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                    config.bgColor,
                    "border",
                    config.borderColor
                  )}
                >
                  <StatusIcon
                    className={cn(
                      "w-6 h-6",
                      config.color,
                      currentStatus === "under-review" ? "animate-spin" : ""
                    )}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-semibold text-lg text-foreground">{config.label}</h2>
                    <Badge className={cn("border text-xs", config.badgeClass)}>
                      {currentStatus === "under-review" ? "En proceso" : "Estatus actual"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {config.description}
                  </p>

                  {currentStatus === "approved" && (
                    <Button size="sm" className="mt-4 bg-teal hover:bg-teal/90 text-white gap-2">
                      <BookOpen className="w-4 h-4" />
                      Acceder al campus virtual
                    </Button>
                  )}
                  {(currentStatus === "pending-docs" || currentStatus === "rejected") && (
                    <Link href={`/cursos/${enrollment.courseId}/inscripcion`}>
                      <Button size="sm" variant="outline" className="mt-4 gap-2">
                        <Upload className="w-4 h-4" />
                        Cargar documentos faltantes
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Course info */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Programa inscrito</h3>
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: BookOpen,
                    label: "Diplomado",
                    value: enrollment.courseName,
                  },
                  {
                    icon: Calendar,
                    label: "Fecha de solicitud",
                    value: enrollment.submittedAt,
                  },
                  {
                    icon: CreditCard,
                    label: "Pago",
                    value: enrollment.paymentConfirmed
                      ? `$${enrollment.amount.toLocaleString("es-MX")} MXN — Confirmado`
                      : "Pendiente de confirmación",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm text-foreground font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-1">Documentos cargados</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {enrollment.documents?.filter((d) => d.status === "accepted").length || 0} de{" "}
                {enrollment.documents?.length || 0} documentos aceptados
              </p>

              <div className="flex flex-col gap-3">
                {enrollment.documents?.map((doc, i) => {
                  const docConfig = DOC_STATUS_CONFIG[doc.status]
                  const DocIcon = docConfig.icon

                  return (
                    <div
                      key={i}
                      className={cn(
                        "flex flex-col gap-3 p-4 rounded-xl border bg-card",
                        docConfig.bg
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/50 border border-white/80 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <p className="text-sm font-medium text-foreground">{doc.name}</p>
                            <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                              {(doc as any).fileName || "Archivo verificado"}
                            </span>
                          </div>
                          <div className={cn("flex items-center gap-1 text-xs font-medium shrink-0", docConfig.color)}>
                            <DocIcon className="w-3.5 h-3.5" />
                            {docConfig.label}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-border/50">
                        <p className="text-muted-foreground uppercase tracking-wider font-semibold">{doc.type}</p>
                        <p className="text-muted-foreground">PDF / JPG / PNG</p>
                      </div>

                      {doc.note && (
                        <div className="mt-1 p-2.5 bg-white/60 rounded-lg border border-destructive/20">
                          <p className="text-xs text-destructive leading-relaxed">
                            <strong>Observación:</strong> {doc.note}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {(currentStatus === "rejected" || currentStatus === "pending-docs") && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Link href={`/cursos/${enrollment.courseId}/inscripcion`}>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Upload className="w-4 h-4" />
                      Volver a cargar documentos
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar — Timeline */}
          <div className="flex flex-col gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-5">Historial de proceso</h3>
              <div className="relative flex flex-col gap-0">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-6 last:pb-0 relative">
                    {/* Vertical line */}
                    {i < TIMELINE.length - 1 && (
                      <div
                        className={cn(
                          "absolute left-3.5 top-7 w-px h-full -translate-x-1/2",
                          item.done ? "bg-teal" : "bg-border"
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10",
                        item.done
                          ? "bg-teal text-white"
                          : item.active
                          ? "bg-navy text-white"
                          : "bg-secondary border border-border text-muted-foreground"
                      )}
                    >
                      {item.done ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : item.active ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                      )}
                    </div>
                    <div className="pt-0.5">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          item.done || item.active ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-4 h-4 text-teal" />
                <h3 className="font-semibold text-foreground text-sm">Notificaciones activas</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Te notificaremos de inmediato por correo electrónico cuando haya un cambio en el
                estatus de tu inscripción.
              </p>
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-xs font-medium text-foreground">{enrollment.email || "usuario@ejemplo.com"}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Notificaciones habilitadas</p>
              </div>
            </div>

            {/* Help */}
            <div className="bg-navy rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-2 text-sm">¿Necesitas ayuda?</h3>
              <p className="text-white/60 text-xs leading-relaxed mb-4">
                Nuestro equipo de admisiones está disponible de lunes a viernes de 9:00 a 18:00 h.
              </p>
              <Button size="sm" variant="outline" className="w-full border-white/20 text-white bg-white/10 hover:bg-white/20">
                Contactar admisiones
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function EnrollmentStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy" />}>
      <EnrollmentStatusContent />
    </Suspense>
  )
}
