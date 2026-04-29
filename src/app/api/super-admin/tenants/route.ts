import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tenants = await prisma.$queryRaw`SELECT * FROM tenants`;
  return NextResponse.json(tenants);
}

export async function POST(req: Request) {
  const body = await req.json();

  await prisma.$executeRaw`
    INSERT INTO tenants (id, name, slug, plan, status)
    VALUES (${crypto.randomUUID()}, ${body.name}, ${body.slug}, ${body.plan}, 'active')
  `;

  return NextResponse.json({ success: true });
}
