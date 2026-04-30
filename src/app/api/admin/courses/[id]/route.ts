import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";
import { requireTenantId } from "@/lib/tenant";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(req: Request, context: RouteContext) {
  try {
    await requirePermission(PERMISSIONS.COURSES_EDIT);
    const tenantId = await requireTenantId();
    const { id } = await context.params;
    const body = await req.json();

    await prisma.$executeRaw`
      UPDATE courses
      SET
        "nameAr" = COALESCE(${body.nameAr}, "nameAr"),
        "nameEn" = COALESCE(${body.nameEn}, "nameEn"),
        "descriptionAr" = COALESCE(${body.descriptionAr}, "descriptionAr"),
        "descriptionEn" = COALESCE(${body.descriptionEn}, "descriptionEn")
      WHERE id = ${id} AND tenant_id = ${tenantId}
    `;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    await requirePermission(PERMISSIONS.COURSES_DELETE);
    const tenantId = await requireTenantId();
    const { id } = await context.params;

    await prisma.$executeRaw`
      DELETE FROM courses WHERE id = ${id} AND tenant_id = ${tenantId}
    `;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
