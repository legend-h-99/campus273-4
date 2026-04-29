import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/super-admin";

export async function GET() {
  try {
    await requireSuperAdmin();
    const tenants = await prisma.$queryRaw`SELECT * FROM tenants`;
    return NextResponse.json(tenants);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function POST(req: Request) {
  try {
    await requireSuperAdmin();

    const body = await req.json();

    await prisma.$executeRaw`
      INSERT INTO tenants (id, name, slug, plan, status)
      VALUES (${crypto.randomUUID()}, ${body.name}, ${body.slug}, ${body.plan}, 'active')
    `;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
