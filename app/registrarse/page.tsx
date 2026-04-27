"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Eye, EyeOff, ArrowRight, CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

const perks = [
  "Acceso a todos los programas disponibles",
  "Proceso de inscripción 100% en línea",
  "Seguimiento de tu solicitud en tiempo real",
  "Notificaciones inmediatas por correo",
]

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
    empresa: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"form" | "success">("form")

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular guardado de sesión
    localStorage.setItem("userLoggedIn", "true")
    localStorage.setItem("userData", JSON.stringify({
      name: `${form.nombre} ${form.apellidos}`,
      email: form.email,
      company: form.empresa || "Independiente",
      initials: form.nombre[0] + (form.apellidos[0] || "")
    }))

    setTimeout(() => {
      setLoading(false)
      setStep("success")
    }, 1500)
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-teal" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground mb-3">
            ¡Cuenta creada exitosamente!
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Hemos enviado un correo de verificación a{" "}
            <strong className="text-foreground">{form.email}</strong>. Confirma tu cuenta para
            comenzar a explorar los programas.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/cursos">
              <Button size="lg" className="w-full bg-teal hover:bg-teal/90 text-white h-11 gap-2">
                Explorar programas
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/iniciar-sesion">
              <Button size="lg" variant="outline" className="w-full h-11">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Left panel — perks (desktop) */}
      <div className="hidden lg:flex flex-col justify-center bg-navy w-96 shrink-0 p-12">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-12">
          <div className="w-9 h-9 rounded-lg bg-teal flex items-center justify-center">
            <BookOpen className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-serif font-bold text-lg text-white">ECFCA</span>
        </Link>

        <h2 className="font-serif text-2xl font-bold text-white mb-3 text-balance">
          Tu carrera, tu ritmo, tu nivel.
        </h2>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          Únete a más de 12,400 profesionales que ya están desarrollando competencias avanzadas con
          ECFCA.
        </p>

        <ul className="flex flex-col gap-4">
          {perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3">
              <CheckCircle className="w-4.5 h-4.5 text-teal shrink-0 mt-0.5" />
              <span className="text-white/70 text-sm leading-relaxed">{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold text-lg text-navy">ECFCA</span>
            </Link>
          </div>

          <div className="mb-7">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-1">Crear cuenta</h1>
            <p className="text-muted-foreground text-sm">
              Completa tu registro para comenzar.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nombre(s)
                  </label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => update("nombre", e.target.value)}
                    placeholder="Ej. Samuel"
                    required
                    className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    value={form.apellidos}
                    onChange={(e) => update("apellidos", e.target.value)}
                    placeholder="Ej. Blanco"
                    required
                    className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Empresa / Institución
                </label>
                <input
                  type="text"
                  value={form.empresa}
                  onChange={(e) => update("empresa", e.target.value)}
                  placeholder="Empresa S.A. de C.V."
                  className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                    className="w-full pl-4 pr-10 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  placeholder="Repite tu contraseña"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer mt-1">
                <input type="checkbox" className="mt-1 rounded" required />
                <span className="text-xs text-muted-foreground leading-relaxed">
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

              <Button
                type="submit"
                size="lg"
                className="w-full bg-teal hover:bg-teal/90 text-white h-11 gap-2 mt-1"
                disabled={loading}
              >
                {loading ? "Creando cuenta…" : (
                  <>
                    Crear mi cuenta
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground justify-center">
              <Lock className="w-3.5 h-3.5" />
              Tus datos están protegidos
            </div>
          </div>

          <p className="text-center mt-5 text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/iniciar-sesion" className="text-teal font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
