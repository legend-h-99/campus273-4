"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { canAccess } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";

export default function Sidebar() {
  const { data: session } = useSession();
  const permissions = session?.user?.permissions || [];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">لوحة التحكم</h2>

      <nav className="flex flex-col gap-3">
        {canAccess(permissions, PERMISSIONS.DASHBOARD_VIEW) && (
          <Link href="/ar/dashboard">Dashboard</Link>
        )}

        {canAccess(permissions, PERMISSIONS.USERS_VIEW) && (
          <Link href="/ar/dashboard/users">Users</Link>
        )}

        {canAccess(permissions, PERMISSIONS.TRAINEES_VIEW) && (
          <Link href="/ar/dashboard/trainees">Trainees</Link>
        )}

        {canAccess(permissions, PERMISSIONS.TRAINERS_VIEW) && (
          <Link href="/ar/dashboard/trainers">Trainers</Link>
        )}

        {canAccess(permissions, PERMISSIONS.COURSES_VIEW) && (
          <Link href="/ar/dashboard/courses">Courses</Link>
        )}

        {canAccess(permissions, PERMISSIONS.REPORTS_VIEW) && (
          <Link href="/ar/dashboard/reports">Reports</Link>
        )}
      </nav>
    </div>
  );
}
