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

    const result = await prisma.course.updateMany({
      where: { id, tenantId },
      data: body,
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

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

    const result = await prisma.course.deleteMany({ where: { id, tenantId } });

    if (result.count === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
