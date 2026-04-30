import { hasPermission, type Permission } from "@/lib/permissions";

export function canAccess(permissions: Permission[] | undefined, permission: Permission) {
  return hasPermission(permissions ?? [], permission);
}
