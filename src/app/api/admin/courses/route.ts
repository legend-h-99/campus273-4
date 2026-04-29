import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";

export async function GET() {
  try {
    await requirePermission(PERMISSIONS.COURSES_VIEW);
    const courses = await prisma.course.findMany({
      include: { department: { select: { id: true, nameAr: true, nameEn: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    await requirePermission(PERMISSIONS.COURSES_CREATE);
    const body = await req.json();
    const course = await prisma.course.create({
      data: {
        courseCode: body.courseCode,
        nameAr: body.nameAr,
        nameEn: body.nameEn,
        descriptionAr: body.descriptionAr,
        descriptionEn: body.descriptionEn,
        departmentId: body.departmentId,
        credits: Number(body.credits ?? 3),
        hours: Number(body.hours ?? 3),
        level: Number(body.level ?? 1),
      },
    });
    return NextResponse.json(course, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create course" }, { status: 400 });
  }
}
