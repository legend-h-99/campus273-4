import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";
import { requireTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    await requirePermission(PERMISSIONS.COURSES_VIEW);
    const tenantId = await requireTenantId();

    const courses = await prisma.$queryRaw`
      SELECT * FROM courses
      WHERE tenant_id = ${tenantId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json(courses);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    await requirePermission(PERMISSIONS.COURSES_CREATE);
    const tenantId = await requireTenantId();
    const body = await req.json();

    const id = crypto.randomUUID();

    await prisma.$executeRaw`
      INSERT INTO courses (id, course_code, name_ar, name_en, description_ar, description_en, department_id, tenant_id, credits, hours, level, is_active, created_at, updated_at)
      VALUES (${id}, ${body.courseCode}, ${body.nameAr}, ${body.nameEn}, ${body.descriptionAr ?? null}, ${body.descriptionEn ?? null}, ${body.departmentId}, ${tenantId}, ${Number(body.credits ?? 3)}, ${Number(body.hours ?? 3)}, ${Number(body.level ?? 1)}, true, NOW(), NOW())
    `;

    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create course" }, { status: 400 });
  }
}
