import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";

export async function GET() {
  try {
    await requirePermission(PERMISSIONS.DASHBOARD_VIEW);

    const [users, trainees, trainers, courses, departments] = await Promise.all([
      prisma.user.count(),
      prisma.trainee.count(),
      prisma.trainer.count(),
      prisma.course.count(),
      prisma.department.count(),
    ]);

    const usersByRole = await prisma.user.groupBy({
      by: ["role"],
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
