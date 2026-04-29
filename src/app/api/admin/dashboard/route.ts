import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";
import { requireTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    await requirePermission(PERMISSIONS.DASHBOARD_VIEW);
    const tenantId = await requireTenantId();

    const [users, trainees, trainers, courses, departments] = await Promise.all([
      prisma.user.count({ where: { tenantId } }),
      prisma.trainee.count({ where: { tenantId } }),
      prisma.trainer.count({ where: { tenantId } }),
      prisma.course.count({ where: { tenantId } }),
      prisma.department.count({ where: { tenantId } }),
    ]);

    const usersByRole = await prisma.user.groupBy({
      by: ["role"],
      where: { tenantId },
      _count: { role: true },
    });

    return NextResponse.json({
      totals: { users, trainees, trainers, courses, departments },
      usersByRole: usersByRole.map((item) => ({ role: item.role, count: item._count.role })),
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
