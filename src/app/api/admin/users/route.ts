import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";

export async function GET() {
  try {
    await requirePermission(PERMISSIONS.USERS_VIEW);

    const users = await prisma.user.findMany({
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
  } catch (e) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
