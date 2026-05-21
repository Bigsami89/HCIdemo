"use server"

import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function loginUserAction(emailInput: string, passwordInput: string) {
  try {
    const emailFormateado = emailInput.toLowerCase().trim()

    const usuario = await prisma.usuario.findUnique({
      where: { email: emailFormateado }
    })

    if (!usuario) {
      return { success: false, error: "El correo electrónico no está registrado." }
    }

    const passwordValida = await bcrypt.compare(passwordInput, usuario.password)
    if (!passwordValida) {
      return { success: false, error: "Contraseña incorrecta." }
    }

    const iniciales = `${usuario.nombre[0] || ""}${usuario.apellidos[0] || ""}`.toUpperCase()

    const userData = {
      id: usuario.id,
      name: `${usuario.nombre} ${usuario.apellidos}`,
      email: usuario.email,
      company: usuario.empresa,
      initials: iniciales
    }

    const cookieStore = await cookies()
    cookieStore.set("session_user", JSON.stringify(userData), {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/", 
    })

    return {
      success: true,
      userData
    }
  } catch (error) {
    console.error("Error en login:", error)
    return { success: false, error: "Hubo un error en el servidor al intentar conectar." }
  }
}

export async function checkSessionAction() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session_user")
  
  if (!session?.value) {
    return { authenticated: false, userData: null }
  }

  try {
    return { authenticated: true, userData: JSON.parse(session.value) }
  } catch {
    return { authenticated: false, userData: null }
  }
}

export async function logoutUserAction() {
  const cookieStore = await cookies()
  cookieStore.delete("session_user")
  return { success: true }
}

export async function getCursosAction() {
  try {
    const cursos = await prisma.curso.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, cursos }
  } catch (error) {
    console.error("Error obteniendo cursos:", error)
    return { success: false, cursos: [], error: "No se pudieron cargar los cursos desde la base de datos." }
  }
}

export async function getUsuarioAction() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session_user")
    if (!session?.value) return { success: false, error: "No hay sesión activa." }

    const sessionData = JSON.parse(session.value)

    const usuario = await prisma.usuario.findUnique({
      where: { id: sessionData.id },
      select: {
        id: true,
        nombre: true,
        apellidos: true,
        email: true,
        empresa: true,
        createdAt: true,
      }
    })

    if (!usuario) return { success: false, error: "Usuario no encontrado." }
    return { success: true, usuario }
  } catch (error) {
    console.error("Error obteniendo usuario:", error)
    return { success: false, error: "Error del servidor." }
  }
}

export async function getInscripcionAction(cursoId?: string) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session_user")
    if (!session?.value) return { success: false, error: "No hay sesión activa." }

    const sessionData = JSON.parse(session.value)

    const inscripcion = await prisma.inscripcion.findFirst({
      where: {
        usuarioId: sessionData.id,
        ...(cursoId ? { cursoId } : {}),
      },
      include: { curso: true },
      orderBy: { submittedAt: "desc" },
    })

    if (!inscripcion) return { success: false, error: "No se encontró inscripción." }
    return { success: true, inscripcion }
  } catch (error) {
    console.error("Error obteniendo inscripción:", error)
    return { success: false, error: "Error del servidor." }
  }
}

export async function getUserDashboardAction() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session_user")
    if (!session?.value) return { success: false, error: "Sesión expirada o inválida." }

    const sessionData = JSON.parse(session.value)

    const usuarioDB = await prisma.usuario.findUnique({
      where: { id: sessionData.id },
      include: {
        inscripciones: {
          include: { curso: true },
          orderBy: { submittedAt: "desc" }
        }
      }
    })

    if (!usuarioDB) return { success: false, error: "Usuario inexistente." }

    const iniciales = `${usuarioDB.nombre[0] || ""}${usuarioDB.apellidos[0] || ""}`.toUpperCase()

    const user = {
      name: `${usuarioDB.nombre} ${usuarioDB.apellidos}`,
      email: usuarioDB.email,
      company: usuarioDB.empresa || "Independiente",
      memberSince: usuarioDB.createdAt.getFullYear().toString(),
      initials: iniciales,
    }

    const enrolledCourses = usuarioDB.inscripciones.map((ins) => {
      let docsArray = []
      try {
        docsArray = typeof ins.documents === "string" ? JSON.parse(ins.documents) : (ins.documents as any[]) || []
      } catch {
        docsArray = []
      }

      const acceptedCount = docsArray.filter((d: any) => d.status === "accepted" || d.status === "approved").length

      return {
        id: ins.id,
        courseId: ins.curso.id,
        courseName: ins.curso.title,
        category: ins.curso.category,
        image: ins.curso.image,
        startDate: ins.curso.startDate,
        status: ins.status, // pending-docs, under-review, approved, rejected
        paymentConfirmed: ins.paymentConfirmed,
        amount: ins.amount,
        submittedAt: ins.submittedAt.toLocaleDateString("es-MX", { day: 'numeric', month: 'short', year: 'numeric' }),
        progress: ins.status === "approved" ? 40 : 0, // Progreso del curso basado en aprobación
        documentsAccepted: acceptedCount,
        documentsTotal: docsArray.length || 3,
        documents: docsArray
      }
    })

    return { success: true, user, enrolledCourses }
  } catch (error) {
    console.error("Error cargando dashboard:", error)
    return { success: false, error: "Error de sincronización con Supabase." }
  }
}

export async function updateEnrollmentDocumentsAction(inscripcionId: string, updatedDocs: any[]) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session_user")
    if (!session?.value) return { success: false, error: "Acceso denegado." }

    // Actualizamos los documentos y movemos el estatus general a "under-review" de forma automática
    const updated = await prisma.inscripcion.update({
      where: { id: inscripcionId },
      data: {
        documents: updatedDocs,
        status: "under-review"
      }
    })

    revalidatePath("/dashboard/tramites")
    return { success: true, inscription: updated }
  } catch (error) {
    console.error("Error actualizando documentos:", error)
    return { success: false, error: "No se pudo guardar la documentación." }
  }
}