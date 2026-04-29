"use client";

import { useState } from "react";

export default function DataTable({ data, columns, onDelete, onEdit }: any) {
  const [loading, setLoading] = useState(false);

  return (
    <table className="w-full border">
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.key} className="p-2 border">{col.label}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row: any) => (
          <tr key={row.id}>
            {columns.map((col: any) => (
              <td key={col.key} className="p-2 border">{row[col.key]}</td>
            ))}
            <td className="flex gap-2">
              <button onClick={() => onEdit(row)}>Edit</button>
              <button
                onClick={async () => {
                  setLoading(true);
                  await onDelete(row.id);
                  setLoading(false);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
