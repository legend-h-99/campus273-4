"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarPro() {
  const path = usePathname();

  const item = (href: string, label: string) => (
    <Link
      href={href}
      className={`block rounded-lg px-3 py-2 transition ${path === href ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="w-64 h-screen border-r p-4 bg-white dark:bg-black dark:text-white">
      <h2 className="text-lg font-bold mb-6">SaaS Panel</h2>

      <div className="flex flex-col gap-2">
        {item("/ar/dashboard", "Dashboard")}
        {item("/ar/dashboard/users", "Users")}
        {item("/ar/dashboard/courses", "Courses")}
        {item("/ar/dashboard/reports", "Reports")}
      </div>
    </div>
  );
}
