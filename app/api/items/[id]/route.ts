import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth"; 

type Params = { params: { id: string } };

const idParam = z.string().uuid("Invalid id"); // works if id is UUID
const updateItemSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    quantity: z.coerce.number().int().min(0).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: "Provide at least one field to update" });

export async function GET(_req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  console.log("Session in single GET /api/items:???????", session);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const tenantId = session.user.tenantId;
  const parsedId = idParam.safeParse(params.id);
  if (!parsedId.success) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  try {
    const item = await prisma.item.findFirst({ where: { id: parsedId.data, tenantId  } });
    if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    console.error("GET /api/items/[id] error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  console.log("Session in PUT /api/items:???????", session);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const tenantId = session.user.tenantId;
  const parsedId = idParam.safeParse(params.id);
  if (!parsedId.success) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  try {
    const body = await req.json();
    const parsed = updateItemSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid body", issues: parsed.error.issues }, { status: 400 });
    }

    try {
      const updated = await prisma.item.updateMany({
        where: { id: parsedId.data, tenantId  },
        data: parsed.data,
      });
      if (updated.count === 0) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
      return NextResponse.json(updated);
    } catch (e: any) {
      if (e?.code === "P2025") return NextResponse.json({ message: "Item not found" }, { status: 404 });
      throw e;
    }
  } catch (err) {
    console.error("PUT /api/items/[id] error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  console.log("Session in DELETE /api/items:???????", session);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const tenantId = session.user.tenantId;
  const parsedId = idParam.safeParse(params.id);
  if (!parsedId.success) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  try {
    try {
      const deleted = await prisma.item.deleteMany({ where: { id: parsedId.data, tenantId  } });
      if (deleted.count === 0) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
      return NextResponse.json(deleted);
    } catch (e: any) {
      if (e?.code === "P2025") return NextResponse.json({ message: "Item not found" }, { status: 404 });
      throw e;
    }
  } catch (err) {
    console.error("DELETE /api/items/[id] error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
