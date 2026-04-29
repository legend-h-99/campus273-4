import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await requirePermission(PERMISSIONS.COURSES_EDIT);
    const body = await req.json();
    const course = await prisma.course.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(course);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await requirePermission(PERMISSIONS.COURSES_DELETE);
    await prisma.course.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
