import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";

export async function GET() {
  try {
    await requirePermission(PERMISSIONS.REPORTS_VIEW);

    const [usersByRole, traineesByDepartment, coursesByDepartment, qualityKpis] = await Promise.all([
      prisma.user.groupBy({ by: ["role"], _count: { role: true } }),
      prisma.trainee.groupBy({ by: ["departmentId"], _count: { departmentId: true } }),
      prisma.course.groupBy({ by: ["departmentId"], _count: { departmentId: true } }),
      prisma.kpiMeasurement.groupBy({ by: ["status"], _count: { status: true } }),
    ]);

    const departments = await prisma.department.findMany({ select: { id: true, nameAr: true, nameEn: true } });
    const departmentName = (id: string | null) => departments.find((d) => d.id === id)?.nameAr ?? "غير محدد";

    return NextResponse.json({
      usersByRole: usersByRole.map((item) => ({ name: item.role, value: item._count.role })),
      traineesByDepartment: traineesByDepartment.map((item) => ({ name: departmentName(item.departmentId), value: item._count.departmentId })),
      coursesByDepartment: coursesByDepartment.map((item) => ({ name: departmentName(item.departmentId), value: item._count.departmentId })),
      qualityKpis: qualityKpis.map((item) => ({ name: item.status, value: item._count.status })),
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
