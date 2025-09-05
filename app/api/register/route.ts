// app/api/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email & password required" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ message: "Email already in use" }, { status: 409 });

    const hashed = await bcrypt.hash(password, 10);

    // create tenant for this new user
    const tenant = await prisma.tenant.create({
      data: { name: name ? `${name}'s Workspace` : "My Workspace" },
    });

    // create user linked to tenant
    const user = await prisma.user.create({
      data: { name, email, password: hashed, tenantId: tenant.id },
    });

    // return tenantId so frontend can use it if needed
    return NextResponse.json({ id: user.id, email: user.email, tenantId: tenant.id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/register", e);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
