"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, BookOpen, Bell, User, ChevronDown, LogOut, LayoutDashboard, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Cursos", href: "/cursos" },
  { label: "Acerca de", href: "/#about" },
  { label: "Contacto", href: "/#contact" },
]

// Mock: simula usuario para desarrollo
const MOCK_USER = {
  name: "Usuario Demo",
  email: "usuario@ejemplo.com",
  initials: "U",
}

interface NavbarProps {
  variant?: "transparent" | "solid"
  showStatus?: boolean
  isLoggedIn?: boolean | "auto"
}

import { useEffect } from "react"

export function Navbar({ variant = "solid", showStatus = false, isLoggedIn = "auto" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [auth, setAuth] = useState({ loggedIn: false, user: MOCK_USER })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const loggedIn = localStorage.getItem("userLoggedIn") === "true"
    const userData = localStorage.getItem("userData")
    if (loggedIn && userData) {
      setAuth({ loggedIn: true, user: JSON.parse(userData) })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("userData")
    setAuth({ loggedIn: false, user: MOCK_USER })
  }

  const isTransparent = variant === "transparent"
  const authenticated = mounted && (isLoggedIn === "auto" ? auth.loggedIn || showStatus : isLoggedIn)
  const currentUser = auth.loggedIn ? auth.user : MOCK_USER

  return (
    <header className="w-full z-50 flex flex-col font-sans">
      {/* Tier 1: White - Logo and Institutional Motto */}
      <div className="bg-white border-b border-gray-100 py-3 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-uady-azul/5 rounded flex items-center justify-center p-1">
               <BookOpen className="w-6 h-6 text-uady-azul" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-uady-azul leading-none">UADY</span>
              <span className="text-[10px] text-uady-dorado font-bold tracking-widest uppercase">E C F C A</span>
            </div>
          </Link>

          <div className="hidden md:block italic font-serif text-uady-azul/80 text-lg absolute left-1/2 -translate-x-1/2">
            "Luz, Ciencia y Verdad"
          </div>

          <div className="flex items-center gap-4">
             {authenticated ? (
               <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-uady-azul flex items-center justify-center text-white text-xs font-bold ring-2 ring-offset-2 ring-uady-dorado/20 group-hover:ring-uady-dorado/40 transition-all">
                      {currentUser.initials}
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-uady-azul transition-transform", userMenuOpen && "rotate-180")} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{currentUser.email}</p>
                      </div>
                      <Link href="/mi-cuenta" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <LayoutDashboard className="w-4 h-4 text-uady-dorado" /> Mi perfil y cursos
                      </Link>
                      <Link href="/mi-inscripcion" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <FileText className="w-4 h-4 text-uady-dorado" /> Mi inscripción
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50">
                        <LogOut className="w-4 h-4" /> Cerrar sesión
                      </button>
                    </div>
                  )}
               </div>
             ) : (
               <div className="hidden md:flex items-center gap-4">
                 <Link href="/iniciar-sesion">
                   <Button variant="ghost" className="text-uady-azul hover:text-uady-dorado font-bold px-4">
                     Iniciar sesión
                   </Button>
                 </Link>
                 <Link href="/registrarse">
                   <Button className="bg-uady-azul text-white hover:bg-uady-dorado hover:text-uady-azul font-bold px-6 shadow-sm">
                     Registrarse
                   </Button>
                 </Link>
               </div>
             )}
             
             <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
               {mobileOpen ? <X className="w-6 h-6 text-uady-azul" /> : <Menu className="w-6 h-6 text-uady-azul" />}
             </button>
          </div>
        </div>
      </div>

      {/* Tier 2: Gold - Main Navigation */}
      <nav className="bg-uady-dorado shadow-sm z-10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 h-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-6 h-full flex items-center text-sm font-bold text-uady-azul hover:bg-white/10 transition-colors uppercase tracking-tight"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>



      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-base font-bold text-uady-azul border-b border-gray-50 flex items-center justify-between"
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4 -rotate-90 text-uady-dorado" />
                </Link>
              ))}
            </div>
            {!authenticated && (
              <div className="flex flex-col gap-2 p-4">
                <Link href="/registrarse" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-uady-azul hover:text-white hover:bg-uady-azul/90 text-white font-bold">Registrarse</Button>
                </Link>
                <Link href="/iniciar-sesion" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full border-uady-azul text-uady-azul font-bold">Iniciar sesión</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
