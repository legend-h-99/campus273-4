"use client";

import { useEffect } from "react";

export default function Toast({ message, show, onClose }: { message: string; show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 3000);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-green-600 px-4 py-2 text-white shadow">
      {message}
    </div>
  );
}
