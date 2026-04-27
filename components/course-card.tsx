"use client"

import Link from "next/link"
import { Clock, Users, Star, Monitor, MapPin, CheckCircle, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Course } from "@/lib/mock-data"

interface CourseCardProps {
  course: Course
  className?: string
}

const modalityIcon = {
  "En línea": Monitor,
  Híbrida: Monitor,
  Presencial: MapPin,
}

import { useEffect, useState } from "react"

export function CourseCard({ course, className }: CourseCardProps) {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCourses = localStorage.getItem("my_courses")
    if (savedCourses) {
      const myCourses = JSON.parse(savedCourses)
      setIsEnrolled(myCourses.some((c: any) => c.courseId === course.id))
    }
  }, [course.id])

  const ModalityIcon = modalityIcon[course.modality as keyof typeof modalityIcon] ?? Monitor

  return (
    <Link href={`/cursos/${course.id}`} className={cn("group block", className)}>
      <article className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:border-uady-dorado/40 transition-all duration-300 h-full flex flex-col group">
        {/* Image */}
        <div className="relative h-44 bg-uady-azul/10 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${course.image})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-uady-azul/20 group-hover:bg-uady-azul/10 transition-colors" />
          {course.badge && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-uady-dorado text-uady-azul border-0 text-[10px] font-bold uppercase tracking-wider">
                {course.badge}
              </Badge>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-uady-azul/90 text-white border-0 text-[10px] font-bold uppercase tracking-widest">
              {course.category}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <ModalityIcon className="w-3.5 h-3.5" />
              {course.modality}
            </span>
            <span className="ml-auto bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs">
              {course.level}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-uady-azul leading-snug mb-2 group-hover:text-uady-dorado transition-colors line-clamp-2 text-lg">
              {course.title}
            </h3>
            <p className="text-sm text-uady-azul/60 line-clamp-2 leading-relaxed">
              {course.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">{course.rating}</span>
            <span className="text-muted-foreground">
              ({course.students.toLocaleString("es-MX")} alumnos)
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-uady-azul/40">Inversión</p>
              <p className="font-bold text-uady-azul text-xl">
                ${course.price.toLocaleString("es-MX")}
                <span className="text-xs font-medium text-uady-azul/40 italic ml-1">MXN</span>
              </p>
            </div>
            <div className="flex flex-col items-end">
              {mounted && isEnrolled ? (
                <span className="text-[10px] font-bold text-uady-dorado uppercase tracking-wider flex items-center gap-1.5 bg-uady-dorado/5 px-3 py-1.5 rounded-full border border-uady-dorado/20">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Inscrito
                </span>
              ) : (
                <span className="text-xs font-bold text-uady-azul group-hover:text-uady-dorado flex items-center gap-2 transition-colors">
                  Ver detalles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
