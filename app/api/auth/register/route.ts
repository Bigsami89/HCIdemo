import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { nombre, apellidos, email, password, empresa } = await req.json();

  const existing = await prisma.usuario.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.usuario.create({
    data: { nombre, apellidos, email, password: hashed, empresa },
  });

  return NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 });
}