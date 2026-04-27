"use client"

import { useState, useCallback, use, useEffect } from "react"
import Link from "next/link"
import {
  CheckCircle,
  Upload,
  X,
  AlertCircle,
  FileText,
  CreditCard,
  Lock,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Trash2,
  Info,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { courses } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "valid" | "invalid" | "uploading"
  error?: string
  docType: string
}

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"]
const MAX_SIZE_MB = 5

const REQUIRED_DOCS = [
  { id: "titulo", label: "Título universitario", description: "Copia del título o constancia de grado. PDF, JPG o PNG." },
  { id: "cedula", label: "Cédula profesional", description: "Copia de cédula profesional. PDF, JPG o PNG." },
  { id: "cv", label: "Currículum Vitae", description: "CV actualizado con experiencia profesional. PDF." },
  { id: "carta", label: "Carta de motivos", description: "Una cuartilla describiendo tus razones para inscribirte. PDF." },
]

const STEPS = [
  { id: 1, label: "Documentación" },
  { id: 2, label: "Datos personales" },
  { id: 3, label: "Pago" },
  { id: 4, label: "Confirmación" },
]

interface PageProps {
  params: Promise<{ id: string }>
}

function EnrollmentContent({ id }: { id: string }) {
  const course = courses.find((c) => c.id === id)!

  const [step, setStep] = useState(1)
  const [files, setFiles] = useState<Record<string, UploadedFile | null>>({
    titulo: null,
    cedula: null,
    cv: null,
    carta: null,
  })
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    empresa: "",
    cargo: "",
  })
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState("")

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: "Formato no permitido. Solo PDF, JPG o PNG." }
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return { valid: false, error: `El archivo supera los ${MAX_SIZE_MB}MB permitidos.` }
    }
    return { valid: true }
  }

  const handleFileUpload = useCallback((docId: string, file: File) => {
    const { valid, error } = validateFile(file)
    const uploadedFile: UploadedFile = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: valid ? "uploading" : "invalid",
      error,
      docType: docId,
    }

    setFiles((prev) => ({ ...prev, [docId]: uploadedFile }))

    if (valid) {
      setTimeout(() => {
        setFiles((prev) => ({
          ...prev,
          [docId]: { ...prev[docId]!, status: "valid" },
        }))
      }, 1200)
    }
  }, [])

  const handleDrop = (e: React.DragEvent, docId: string) => {
    e.preventDefault()
    setDragOver(null)
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(docId, file)
  }

  const removeFile = (docId: string) => {
    setFiles((prev) => ({ ...prev, [docId]: null }))
  }

  const allDocsValid = Object.values(files).every((f) => f?.status === "valid")
  const step1Complete = allDocsValid

  const handlePayment = () => {
    // Validación básica del pago
    const cleanCard = paymentData.cardNumber.replace(/\s/g, "")
    const cleanExpiry = paymentData.expiry.replace(/\//g, "")
    
    if (cleanCard.length < 16) {
      setPaymentError("El número de tarjeta debe tener 16 dígitos")
      return
    }
    
    if (cleanExpiry.length < 4) {
      setPaymentError("La fecha de vencimiento no es válida (MM/AA)")
      return
    }

    if (paymentData.cvv.length < 3) {
      setPaymentError("El CVV no es válido")
      return
    }

    setProcessingPayment(true)
    setPaymentError("")
    
    // Crear la lista de documentos basada en lo que el usuario subió
    const docNames: Record<string, string> = {
      titulo: "Título universitario",
      cedula: "Cédula profesional",
      cv: "CV actualizado",
      motivos: "Carta de motivos",
    }

    const docTypes: Record<string, string> = {
      titulo: "Identificación",
      cedula: "Identificación",
      cv: "Documentación",
      motivos: "Documentación",
    }

    const enrollmentDocs = Object.entries(files).map(([id, data]) => ({
      name: docNames[id] || id,
      type: docTypes[id] || "Documentación",
      status: "accepted" as const, // En este demo lo aceptamos de inmediato al confirmar pago
      fileName: data?.name || "Documento cargado",
    }))

    // Simular guardado de inscripción
    const newEnrollment = {
      courseId: id,
      courseName: course.title,
      category: course.category,
      image: course.image,
      startDate: course.startDate,
      status: "under-review" as const,
      submittedAt: new Date().toLocaleDateString("es-MX", { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: course.price * 1.16,
      paymentConfirmed: true,
      progress: 0,
      documentsAccepted: enrollmentDocs.length,
      documentsTotal: enrollmentDocs.length,
      documents: enrollmentDocs,
      email: formData.email,
    }
    
    const existingCourses = JSON.parse(localStorage.getItem("my_courses") || "[]")
    const updatedCourses = [...existingCourses.filter((c: any) => c.courseId !== id), newEnrollment]
    
    localStorage.setItem("my_courses", JSON.stringify(updatedCourses))
    localStorage.setItem("activeEnrollment", id)

    setTimeout(() => {
      setProcessingPayment(false)
      setStep(4)
    }, 2500)
  }

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      const user = JSON.parse(userData)
      const [nombre, ...apellidos] = user.name.split(" ")
      setFormData(prev => ({
        ...prev,
        nombre: nombre || "",
        apellidos: apellidos.join(" ") || "",
        email: user.email || "",
        empresa: user.company || "",
      }))
      setPaymentData(prev => ({
        ...prev,
        cardName: user.name.toUpperCase(),
      }))
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn />

      {/* Progress header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link
              href={`/cursos/${id}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al curso
            </Link>
            <p className="text-xs text-muted-foreground font-medium">
              Paso {step} de {STEPS.length}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                      step > s.id
                        ? "bg-teal text-white"
                        : step === s.id
                        ? "bg-navy text-white"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.id}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium hidden sm:block",
                      step >= s.id ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mb-5 transition-colors",
                      step > s.id ? "bg-teal" : "bg-border"
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Course summary bar */}
        <div className="bg-navy/5 border border-navy/10 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-0.5">Inscribiendo a</p>
            <p className="font-semibold text-foreground">{course.title}</p>
            <p className="text-xs text-muted-foreground">{course.startDate} · {course.modality}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Total a pagar</p>
            <p className="text-2xl font-bold text-navy">
              ${course.price.toLocaleString("es-MX")}
              <span className="text-xs font-normal text-muted-foreground"> MXN</span>
            </p>
          </div>
        </div>

        {/* STEP 1 — Documents */}
        {step === 1 && (
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Carga tu documentación</h1>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Sube todos los documentos requeridos en formato PDF, JPG o PNG (máx. {MAX_SIZE_MB}MB por archivo).
              El sistema valida el formato automáticamente.
            </p>

            <div className="flex flex-col gap-5">
              {REQUIRED_DOCS.map((doc) => {
                const file = files[doc.id]
                const isDragTarget = dragOver === doc.id

                return (
                  <div key={doc.id}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{doc.label}</p>
                        <p className="text-xs text-muted-foreground">{doc.description}</p>
                      </div>
                      {file?.status === "valid" && (
                        <div className="flex items-center gap-1.5 text-teal text-xs font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Validado
                        </div>
                      )}
                    </div>

                    {!file ? (
                      <label
                        htmlFor={`file-${doc.id}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(doc.id) }}
                        onDragLeave={() => setDragOver(null)}
                        onDrop={(e) => handleDrop(e, doc.id)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all",
                          isDragTarget
                            ? "border-teal bg-teal/5"
                            : "border-border hover:border-navy/30 hover:bg-secondary/50"
                        )}
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <Upload className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">
                            Arrastra tu archivo aquí o{" "}
                            <span className="text-teal">haz clic para seleccionar</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, JPG o PNG · Máx. {MAX_SIZE_MB}MB</p>
                        </div>
                        <input
                          id={`file-${doc.id}`}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(e) => {
                            const f = e.target.files?.[0]
                            if (f) handleFileUpload(doc.id, f)
                          }}
                        />
                      </label>
                    ) : (
                      <div
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border",
                          file.status === "valid"
                            ? "bg-teal/5 border-teal/30"
                            : file.status === "invalid"
                            ? "bg-destructive/5 border-destructive/30"
                            : "bg-secondary border-border"
                        )}
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                            file.status === "valid"
                              ? "bg-teal/10"
                              : file.status === "invalid"
                              ? "bg-destructive/10"
                              : "bg-secondary"
                          )}
                        >
                          {file.status === "uploading" ? (
                            <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                          ) : file.status === "valid" ? (
                            <FileText className="w-5 h-5 text-teal" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-destructive" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(0)} KB
                            {file.status === "uploading" && " · Verificando…"}
                            {file.status === "valid" && " · Formato correcto"}
                          </p>
                          {file.error && (
                            <p className="text-xs text-destructive mt-0.5">{file.error}</p>
                          )}
                        </div>

                        <button
                          onClick={() => removeFile(doc.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label={`Eliminar ${doc.label}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-secondary rounded-xl flex items-center gap-3">
              <Info className="w-4 h-4 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {Object.values(files).filter((f) => f?.status === "valid").length} de {REQUIRED_DOCS.length} documentos cargados correctamente.
                {!allDocsValid && " Completa todos los documentos para continuar."}
              </p>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                size="lg"
                disabled={!step1Complete}
                onClick={() => setStep(2)}
                className="bg-navy hover:bg-navy-light text-white gap-2 h-12 px-8"
              >
                Continuar
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2 — Personal Data */}
        {step === 2 && (
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Tus datos personales</h1>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Confirma o actualiza tu información. Estos datos aparecerán en tu constancia de inscripción.
            </p>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "nombre", label: "Nombre(s)", type: "text" },
                  { id: "apellidos", label: "Apellidos", type: "text" },
                  { id: "email", label: "Correo electrónico", type: "email" },
                  { id: "telefono", label: "Teléfono", type: "tel" },
                  { id: "empresa", label: "Empresa / Institución", type: "text" },
                  { id: "cargo", label: "Cargo actual", type: "text" },
                ].map((field) => (
                  <div key={field.id} className={field.id === "email" ? "sm:col-span-2" : ""}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-border">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded" defaultChecked />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    Acepto el{" "}
                    <Link href="/" className="text-teal hover:underline">
                      aviso de privacidad
                    </Link>{" "}
                    y los{" "}
                    <Link href="/" className="text-teal hover:underline">
                      términos y condiciones
                    </Link>{" "}
                    de ECFCA.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" size="lg" onClick={() => setStep(1)} className="gap-2 h-12">
                <ArrowLeft className="w-4 h-4" />
                Regresar
              </Button>
              <Button
                size="lg"
                onClick={() => setStep(3)}
                className="bg-navy hover:bg-navy-light text-white gap-2 h-12 px-8"
              >
                Continuar al pago
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3 — Payment */}
        {step === 3 && (
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Pago seguro</h1>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Tus datos de pago están protegidos con cifrado SSL de 256 bits. No almacenamos tu información bancaria.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Card form */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-foreground">Tarjeta de crédito o débito</h2>
                    <div className="flex items-center gap-2">
                      {["VISA", "MC", "AMEX"].map((brand) => (
                        <div
                          key={brand}
                          className="h-7 px-2 bg-secondary border border-border rounded flex items-center justify-center"
                        >
                          <span className="text-xs font-bold text-muted-foreground">{brand}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Número de tarjeta
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={paymentData.cardNumber}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "")
                            if (val.length > 16) val = val.slice(0, 16)
                            const formatted = val.replace(/(\d{4})/g, "$1 ").trim()
                            setPaymentData((p) => ({ ...p, cardNumber: formatted }))
                          }}
                          placeholder="1234 5678 9012 3456"
                          className="w-full pl-4 pr-10 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono text-foreground"
                        />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Nombre en la tarjeta
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) =>
                          setPaymentData((p) => ({ ...p, cardName: e.target.value }))
                        }
                        placeholder="TAL COMO APARECE EN LA TARJETA"
                        className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring uppercase text-foreground"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Fecha de vencimiento
                        </label>
                        <input
                          type="text"
                          value={paymentData.expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "")
                            if (val.length > 4) val = val.slice(0, 4)
                            if (val.length >= 2) {
                              val = val.slice(0, 2) + "/" + val.slice(2)
                            }
                            setPaymentData((p) => ({ ...p, expiry: val }))
                          }}
                          placeholder="MM/AA"
                          className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={paymentData.cvv}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 4)
                              setPaymentData((p) => ({ ...p, cvv: val }))
                            }}
                            placeholder="•••"
                            className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono text-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-3.5 h-3.5 text-teal shrink-0" />
                    Pago protegido con SSL 256 bits. No almacenamos datos bancarios.
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                  <h2 className="font-semibold text-foreground mb-4">Resumen de pago</h2>
                  <div className="flex flex-col gap-3 pb-4 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Diplomado</span>
                      <span className="text-foreground font-medium">
                        ${course.price.toLocaleString("es-MX")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IVA (16%)</span>
                      <span className="text-foreground font-medium">
                        ${(course.price * 0.16).toLocaleString("es-MX")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Descuento pronto pago</span>
                      <span className="text-teal font-medium">–$0</span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-xl text-navy">
                      ${(course.price * 1.16).toLocaleString("es-MX", { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  {paymentError && (
                    <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-xs text-destructive">{paymentError}</p>
                    </div>
                  )}

                  <Button
                    size="lg"
                    className="w-full mt-5 bg-teal hover:bg-teal/90 text-white h-12 font-semibold text-base gap-2"
                    onClick={handlePayment}
                    disabled={processingPayment}
                  >
                    {processingPayment ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Procesando pago…
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Pagar ${(course.price * 1.16).toLocaleString("es-MX", { maximumFractionDigits: 0 })}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Garantía de devolución de 7 días
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-start mt-8">
              <Button variant="outline" size="lg" onClick={() => setStep(2)} className="gap-2 h-12">
                <ArrowLeft className="w-4 h-4" />
                Regresar
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4 — Confirmation */}
        {step === 4 && (
          <div className="text-center max-w-xl mx-auto py-10">
            <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-teal" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
              ¡Solicitud enviada!
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Tu pago fue confirmado y tus documentos están en revisión por el área de admisiones.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Recibirás una notificación al correo{" "}
              <strong className="text-foreground">{formData.email}</strong> en un plazo máximo de{" "}
              <strong className="text-foreground">3 días hábiles</strong>.
            </p>

            {/* Status timeline preview */}
            <div className="bg-card border border-border rounded-2xl p-6 text-left mb-8">
              <p className="font-semibold text-sm text-foreground mb-4">Estado de tu inscripción</p>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Documentos recibidos", done: true, note: "4 de 4 documentos cargados" },
                  { label: "Pago confirmado", done: true, note: `$${(course.price * 1.16).toLocaleString("es-MX", { maximumFractionDigits: 0 })} MXN` },
                  { label: "Revisión en proceso", done: false, note: "Plazo estimado: 1–3 días hábiles", active: true },
                  { label: "Inscripción aprobada", done: false, note: "Recibirás acceso al campus virtual" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                        item.done
                          ? "bg-teal text-white"
                          : item.active
                          ? "bg-navy text-white"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {item.done ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                    <div>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          item.done || item.active ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/mi-inscripcion">
                <Button size="lg" className="bg-navy hover:bg-navy-light text-white h-12 px-8 gap-2">
                  Ver mi estatus de inscripción
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/cursos">
                <Button size="lg" variant="outline" className="h-12 px-8 text-foreground border-border">
                  Explorar más cursos
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EnrollmentPage({ params }: PageProps) {
  const { id } = use(params)
  const course = courses.find((c) => c.id === id)
  if (!course) notFound()
  return <EnrollmentContent id={id} />
}
