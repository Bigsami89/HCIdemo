"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Eye, EyeOff, ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

const DEMO_EMAIL = "usuario@ejemplo.com"

const DEMO_PASSWORD = "Demo1234"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simular guardado de sesión
    const registeredData = localStorage.getItem("userData")
    const parsedData = registeredData ? JSON.parse(registeredData) : null
    
    // Si el email coincide con el registrado (insensible a mayúsculas y espacios), usamos esos datos
    const userEmail = email.toLowerCase().trim()
    const registeredEmail = parsedData?.email?.toLowerCase()?.trim()
    
    const userData = (parsedData && registeredEmail === userEmail)
      ? parsedData
      : {
          name: parsedData?.name || "Usuario Demo",
          email: email,
          initials: parsedData?.initials || "UD"
        }

    localStorage.setItem("userLoggedIn", "true")
    localStorage.setItem("userData", JSON.stringify(userData))

    setTimeout(() => {
      setLoading(false)
      router.push("/cursos")
    }, 1200)
  }

  const fillDemo = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-navy">ECFCA</span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-foreground mb-1">Bienvenido de vuelta</h1>
          <p className="text-muted-foreground text-sm">Ingresa a tu cuenta para continuar</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full px-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Contraseña
                </label>
                <Link href="/" className="text-xs text-teal hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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

            <Button
              type="submit"
              size="lg"
              className="w-full bg-navy hover:bg-navy-light text-white h-11 gap-2"
              disabled={loading}
            >
              {loading ? "Iniciando sesión…" : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-5 pt-5 border-t border-border flex flex-col gap-3">
            <button
              type="button"
              onClick={fillDemo}
              className="w-full py-2 rounded-lg border border-dashed border-teal/40 text-xs text-teal hover:bg-teal/5 transition-colors font-medium"
            >
              Usar cuenta demo — {DEMO_EMAIL}
            </button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
              <Lock className="w-3.5 h-3.5" />
              Conexión segura con SSL
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link href="/registrarse" className="text-teal font-medium hover:underline">
            Regístrate gratis
          </Link>
        </p>
        <p className="text-center mt-3">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  )
}
