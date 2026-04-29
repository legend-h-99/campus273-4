import { auth } from "@/lib/auth";

export async function getTenantId() {
  const session = await auth();
  return (session?.user as any)?.tenantId as string | undefined;
}

export async function requireTenantId() {
  const tenantId = await getTenantId();
  if (!tenantId) {
    throw new Error("TENANT_REQUIRED");
  }
  return tenantId;
}

export function tenantWhere(tenantId: string) {
  return { tenantId };
}
