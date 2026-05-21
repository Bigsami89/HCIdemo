"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getCursosAction, checkSessionAction } from "@/lib/actions"

const categories = ["Todos", "Finanzas", "Tecnología", "Derecho", "Marketing", "Recursos Humanos", "Operaciones"]
const modalities = ["Todas", "En línea", "Híbrida", "Presencial"]
const levels = ["Todos", "Intermedio", "Avanzado"]

export default function CoursesPage() {
  // ESTADOS PARA MANEJAR LOS CURSOS DE LA BASE DE DATOS Y LA CARGA
  const [dbCourses, setDbCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedModality, setSelectedModality] = useState("Todas")
  const [selectedLevel, setSelectedLevel] = useState("Todos")
  const [showFilters, setShowFilters] = useState(false)

  // NUEVO: EFECTO PARA TRAER LOS CURSOS CUANDO LA PANTALLA CARGUE
  useEffect(() => {
    async function inicializarDatos() {
      try {
        const sessionStatus = await checkSessionAction()
        setIsUserLoggedIn(sessionStatus.authenticated)

        const respuesta = await getCursosAction()
        if (respuesta.success) {
          // Adaptamos opcionalmente los datos de la DB por si hacen falta campos del layout viejo
          const mapeados = respuesta.cursos.map((c: any) => ({
            id: c.id,
            title: c.title,
            subtitle: c.subtitle || "",
            description: c.description || "",
            category: c.category || "Tecnología",
            modality: c.modality || "En línea",
            level: c.level || "Todos",
            duration: c.duration || "4 semanas",
            tags: c.title.split(" "),
            image: c.image || "/placeholder.jpg",
            students: c.students ?? 0,
            rating: c.rating ?? 0, 
            price: c.price ?? 0,
            syllabus: c.syllabus || [], 
          }))
          setDbCourses(mapeados)
        }
      } catch (error) {
        console.error("Error al renderizar cursos:", error)
      } finally {
        setLoading(false)
      }
    }
    inicializarDatos()
  }, [])

  // AHORA FILTRAMOS UTILIZANDO LOS CURSOS DE LA BASE DE DATOS (dbCourses)
  const filtered = dbCourses.filter((c) => {
    const matchSearch =
      search === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))
    const matchCat = selectedCategory === "Todos" || c.category === selectedCategory
    const matchMod = selectedModality === "Todas" || c.modality === selectedModality
    const matchLvl = selectedLevel === "Todos" || c.level === selectedLevel
    return matchSearch && matchCat && matchMod && matchLvl
  })

  const hasFilters = selectedCategory !== "Todos" || selectedModality !== "Todas" || selectedLevel !== "Todos" || search !== ""

  const clearFilters = () => {
    setSearch("")
    setSelectedCategory("Todos")
    setSelectedModality("Todas")
    setSelectedLevel("Todos")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Page header */}
      <section className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-2">Oferta académica</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3 text-balance">
            Diplomados y programas de educación continua
          </h1>
          <p className="text-white/60 max-w-2xl leading-relaxed">
            {dbCourses.length} programas disponibles reales en Supabase para profesionales en activo.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre, área o habilidad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-input rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            className="gap-2 shrink-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
            {hasFilters && (
              <span className="w-2 h-2 rounded-full bg-teal" aria-label="Filtros activos" />
            )}
          </Button>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-muted-foreground">
              <X className="w-3.5 h-3.5" />
              Limpiar
            </Button>
          )}
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="bg-card border border-border rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Categoría</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                      selectedCategory === cat
                        ? "bg-navy text-white border-navy"
                        : "bg-background text-muted-foreground border-border hover:border-navy/40"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Modalidad</p>
              <div className="flex flex-wrap gap-2">
                {modalities.map((mod) => (
                  <button
                    key={mod}
                    onClick={() => setSelectedModality(mod)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                      selectedModality === mod
                        ? "bg-teal text-white border-teal"
                        : "bg-background text-muted-foreground border-border hover:border-teal/40"
                    )}
                  >
                    {mod}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Nivel</p>
              <div className="flex flex-wrap gap-2">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                      selectedLevel === lvl
                        ? "bg-navy text-white border-navy"
                        : "bg-background text-muted-foreground border-border hover:border-navy/40"
                    )}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category pills quick filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border shrink-0",
                selectedCategory === cat
                  ? "bg-navy text-white border-navy"
                  : "bg-card text-muted-foreground border-border hover:border-navy/40 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results / Loading section */}
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-navy" />
            <p className="text-sm text-muted-foreground">Cargando cursos desde Supabase...</p>
          </div>
        ) : filtered.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filtered.length} {filtered.length === 1 ? "programa encontrado" : "programas encontrados"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} isLoggedIn={isUserLoggedIn}/>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Sin resultados</h3>
            <p className="text-muted-foreground text-sm mb-6">
              No encontramos programas que coincidan con tu búsqueda. Intenta con otros términos.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}