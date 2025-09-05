import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth"; 

const createItemSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  quantity: z.coerce.number().int().min(0).default(0),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("Session in GET /api/items:???????", session);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Day 7: use tenantId here: const tenantId = (session.user as any).tenantId;
  try {
    const items = await prisma.item.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/items error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Day 7: use tenantId here: const tenantId = (session.user as any).tenantId;
  try {
    const body = await req.json();
    const parsed = createItemSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid body", issues: parsed.error.issues }, { status: 400 });
    }

    const { name, quantity } = parsed.data;
    const item = await prisma.item.create({ data: { name, quantity } });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("POST /api/items error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
