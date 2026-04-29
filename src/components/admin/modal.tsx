"use client";

import { ReactNode } from "react";

export default function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button className="rounded px-3 py-1 text-sm hover:bg-gray-100" onClick={onClose}>إغلاق</button>
        </div>
        {children}
      </div>
    </div>
  );
}
