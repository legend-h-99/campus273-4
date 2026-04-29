"use client";

import { useState } from "react";

export default function DataTablePro({ data, columns }: any) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((row: any) =>
    columns.some((col: any) => String(row[col.key]).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 border p-2 w-full"
      />

      <table className="w-full border rounded overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {columns.map((col: any) => (
              <th key={col.key} className="p-2 text-left">{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filtered.map((row: any) => (
            <tr key={row.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-900">
              {columns.map((col: any) => (
                <td key={col.key} className="p-2">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
