import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";
import { requireTenantId } from "@/lib/tenant";

async function countTable(table: string, tenantId: string) {
  const result = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
    `SELECT COUNT(*)::bigint AS count FROM ${table} WHERE tenant_id = $1`,
    tenantId
  );
  return Number(result[0]?.count ?? 0);
}

export async function GET() {
  try {
    await requirePermission(PERMISSIONS.DASHBOARD_VIEW);
    const tenantId = await requireTenantId();

    const [users, trainees, trainers, courses, departments] = await Promise.all([
      countTable("users", tenantId),
      countTable("trainees", tenantId),
      countTable("trainers", tenantId),
      countTable("courses", tenantId),
      countTable("departments", tenantId),
    ]);

    const usersByRole = await prisma.$queryRaw<{ role: string; count: bigint }[]>`
      SELECT role, COUNT(*)::bigint AS count
      FROM users
      WHERE tenant_id = ${tenantId}
      GROUP BY role
    `;

    return NextResponse.json({
      totals: { users, trainees, trainers, courses, departments },
      usersByRole: usersByRole.map((item) => ({ role: item.role, count: Number(item.count) })),
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
