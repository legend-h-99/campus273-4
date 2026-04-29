import { auth } from "@/lib/auth";

export async function requireSuperAdmin() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "super_admin") {
    throw new Error("FORBIDDEN");
  }

  return session;
}
