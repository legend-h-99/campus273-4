import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";
import { requireTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    await requirePermission(PERMISSIONS.USERS_VIEW);
    const tenantId = await requireTenantId();

    const users = await prisma.user.findMany({
      where: { tenantId },
      select: {
        id: true,
        email: true,
        nameAr: true,
        nameEn: true,
        role: true,
        status: true,
      },
    });

    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    await requirePermission(PERMISSIONS.USERS_CREATE);
    const tenantId = await requireTenantId();
    const body = await req.json();
    const passwordHash = await hash(body.password || "ChangeMe123!", 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        passwordHash,
        nameAr: body.nameAr || body.email,
        nameEn: body.nameEn || body.email,
        role: body.role || "trainee",
        tenantId,
      },
      select: { id: true, email: true, role: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 400 });
  }
}
