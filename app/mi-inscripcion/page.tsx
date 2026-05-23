"use client"

import { useState } from "react"
import Link from "next/link"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  Upload,
  Bell,
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
import { cn } from "@/lib/utils"
import { getInscripcionAction } from "@/lib/actions"

interface DocumentItem {
  name: string
  type: string
  status: "accepted" | "pending" | "rejected" | "approved"
  fileName?: string
  note?: string
}

interface EnrollmentData {
  id: string
  courseId: string
  courseName: string
  category: string
  image: string
  startDate: string
  status: string
  paymentConfirmed: boolean
  amount: number
  submittedAt: string
  documentsAccepted: number
  documentsTotal: number
  documents: DocumentItem[]
  email: string
}

const STATUS_CONFIG: Record<
  string,
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
    description: "Aún faltan documentos por cargar para completar tu expediente de inscripción académica.",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
  },
  "under-review": {
    label: "En revisión",
    description: "Tu solicitud fue recibida exitosamente. El área de admisiones se encuentra validando tu documentación.",
    icon: RefreshCw,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  approved: {
    label: "Inscripción aprobada",
    description: "¡Felicidades! Tu inscripción ha sido formalmente autorizada. Ya tienes el alta para ingresar al campus.",
    icon: CheckCircle,
    color: "text-teal",
    bgColor: "bg-teal/5",
    borderColor: "border-teal/20",
    badgeClass: "bg-teal/10 text-teal border-teal/20",
  },
  rejected: {
    label: "Documentación rechazada",
    description: "Algunos de tus archivos no cumplen con las normativas vigentes. Revisa las notas y vuelve a cargarlos.",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
  },
}

const DOC_STATUS_CONFIG: Record<
  string,
  { icon: React.ElementType; label: string; color: string; bg: string }
> = {
  accepted: { icon: CheckCircle, label: "Aceptado", color: "text-teal", bg: "bg-teal/5 border-teal/20" },
  approved: { icon: CheckCircle, label: "Aceptado", color: "text-teal", bg: "bg-teal/5 border-teal/20" },
  pending: { icon: Clock, label: "En revisión", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  "under-review": { icon: Clock, label: "En revisión", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  rejected: { icon: AlertCircle, label: "Rechazado", color: "text-destructive", bg: "bg-destructive/5 border-destructive/20" },
}

const TIMELINE = [
  { label: "Solicitud enviada", date: "15 mar 2025", done: true },
  { label: "Pago confirmado", date: "15 mar 2025", done: true },
  { label: "Documentos en revisión", date: "16 mar 2025", done: true },
  { label: "Revisión en proceso", date: "En curso", done: false, active: true },
  { label: "Resolución y notificación", date: "Estimado: 18–20 mar", done: false },
]


function EnrollmentStatusContent() {
  const searchParams = useSearchParams()
  const courseIdParam = searchParams.get("id")
  
  const [enrollment, setEnrollment] = useState<EnrollmentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStatus() {
      try {
        setLoading(true)
        const response = await getInscripcionAction(courseIdParam || undefined)
        
        if (response.success && response.enrollment) {
          setEnrollment(response.enrollment as EnrollmentData)
        } else {
          setError(response.error || "No se pudo recuperar la información del trámite.")
        }
      } catch (err) {
        console.error("Error conectando con la base de datos:", err)
        setError("Error crítico de comunicación con el servidor de datos.")
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [courseIdParam])

 if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <RefreshCw className="w-8 h-8 text-teal animate-spin mb-2" />
        <p className="text-sm text-muted-foreground">Sincronizando expediente con la base de datos...</p>
      </div>
    )
  }

  if (error || !enrollment) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar isLoggedIn={false} />
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <AlertCircle className="w-12 h-12 text-destructive mb-3" />
          <h2 className="text-xl font-bold mb-1">Inscripción No Encontrada</h2>
          <p className="text-muted-foreground text-center max-w-md mb-4">{error}</p>
          <Link href="/mi-cuenta">
            <Button className="bg-teal text-white">Regresar a Mi Cuenta</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const currentStatus = enrollment.status
  const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG["pending-docs"]
  const StatusIcon = config.icon

  // Historial dinámico basado en las banderas reales guardadas en Prisma
  const TIMELINE = [
    { label: "Solicitud enviada", date: enrollment.submittedAt, done: true },
    { label: "Pago registrado", date: enrollment.paymentConfirmed ? "Confirmado" : "Pendiente", done: enrollment.paymentConfirmed },
    { 
      label: "Validación de documentos", 
      date: currentStatus === "approved" ? "Finalizado" : currentStatus === "under-review" ? "En proceso" : "Esperando cambios", 
      done: currentStatus === "approved",
      active: currentStatus === "under-review" || currentStatus === "rejected" || currentStatus === "pending-docs"
    },
    { label: "Alta en Campus Virtual", date: currentStatus === "approved" ? "Completado" : "Pendiente dictamen", done: currentStatus === "approved" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={true} />

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Status card */}
            <div className={cn("rounded-2xl border p-6", config.bgColor, config.borderColor)}>
              <div className="flex items-start gap-4">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0 border", config.bgColor, config.borderColor)}>
                  <StatusIcon className={cn("w-6 h-6", config.color, currentStatus === "under-review" ? "animate-spin" : "")} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-semibold text-lg text-foreground">{config.label}</h2>
                    <Badge className={cn("border text-xs", config.badgeClass)}>
                      Estatus actual
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
                      <Button size="sm" variant="outline" className="mt-4 gap-2 text-foreground bg-card border-border">
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
                  { icon: BookOpen, label: "Programa académico", value: enrollment.courseName },
                  { icon: Calendar, label: "Fecha de inicio del curso", value: enrollment.startDate },
                  { icon: FileText, label: "Fecha de registro de solicitud", value: enrollment.submittedAt },
                  {
                    icon: CreditCard,
                    label: "Estado de pago administrativo",
                    value: enrollment.paymentConfirmed
                      ? `$${enrollment.amount.toLocaleString("es-MX")} MXN — Confirmado y Validado`
                      : "Pendiente de confirmación financiera",
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
                <h3 className="font-semibold text-foreground mb-1">Documentos en expediente</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {enrollment.documentsAccepted} de {enrollment.documentsTotal} documentos validados correctamente
                </p>

                <div className="flex flex-col gap-3">
                  {enrollment.documents && enrollment.documents.length > 0 ? (
                    enrollment.documents.map((doc, i) => {
                      const docConfig = DOC_STATUS_CONFIG[doc.status] || DOC_STATUS_CONFIG["pending"]
                      const DocIcon = docConfig.icon

                      return (
                        <div key={i} className={cn("flex flex-col gap-3 p-4 rounded-xl border bg-card", docConfig.bg)}>
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white/50 border border-white/80 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-0.5">
                                <p className="text-sm font-medium text-foreground">{doc.name}</p>
                                <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                                  {doc.fileName || "Archivo cargado"}
                                </span>
                              </div>
                              <div className={cn("flex items-center gap-1 text-xs font-medium shrink-0", docConfig.color)}>
                                <DocIcon className="w-3.5 h-3.5" />
                                {docConfig.label}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs pt-2 border-t border-border/50">
                            <p className="text-muted-foreground uppercase tracking-wider font-semibold">{doc.type || "Requisito"}</p>
                            <p className="text-muted-foreground">Formato digital</p>
                          </div>

                          {doc.note && (
                            <div className="mt-1 p-2.5 bg-white/60 rounded-lg border border-destructive/20">
                              <p className="text-xs text-destructive leading-relaxed">
                                <strong>Observación de revisión:</strong> {doc.note}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No se han registrado archivos adjuntos en esta inscripción.</p>
                  )}
                </div>

                {(currentStatus === "rejected" || currentStatus === "pending-docs") && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link href={`/cursos/${enrollment.courseId}/inscripcion`}>
                      <Button variant="outline" size="sm" className="w-full gap-2 text-foreground border-border">
                        <Upload className="w-4 h-4" />
                        Volver a cargar documentos
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

          {/* Sidebar — Timeline */}
          <div className="flex flex-col gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-5">Historial del trámite</h3>
              <div className="relative flex flex-col gap-0">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-6 last:pb-0 relative">
                    {i < TIMELINE.length - 1 && (
                      <div className={cn("absolute left-3.5 top-7 w-px h-full -translate-x-1/2", item.done ? "bg-teal" : "bg-border")} aria-hidden="true" />
                    )}
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10", item.done ? "bg-teal text-white" : item.active ? "bg-navy text-white" : "bg-secondary border border-border text-muted-foreground")}>
                      {item.done ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : item.active && currentStatus === "under-review" ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                      )}
                    </div>
                    <div className="pt-0.5">
                      <p className={cn("text-sm font-medium", item.done || item.active ? "text-foreground" : "text-muted-foreground")}>
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
