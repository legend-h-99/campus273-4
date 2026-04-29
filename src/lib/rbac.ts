import { auth } from "@/lib/auth";
import { hasPermission, type Permission } from "@/lib/permissions";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}

export async function requirePermission(permission: Permission) {
  const session = await requireAuth();
  const permissions = session.user.permissions ?? [];

  if (!hasPermission(permissions, permission)) {
    throw new Error("FORBIDDEN");
  }

  return session;
}

export function canAccess(permissions: Permission[] | undefined, permission: Permission) {
  return hasPermission(permissions ?? [], permission);
}
