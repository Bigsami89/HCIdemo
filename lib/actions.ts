"use server"

import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
import { cookies } from "next/headers"

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