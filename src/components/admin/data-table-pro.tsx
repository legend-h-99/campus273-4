"use client";

import { useState } from "react";

export default function DataTablePro({ data, columns }: any) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState("");
  const pageSize = 5;

  let filtered = data.filter((row: any) =>
    columns.some((col: any) => String(row[col.key]).toLowerCase().includes(search.toLowerCase()))
  );

  if (sortKey) {
    filtered = filtered.sort((a: any, b: any) => String(a[sortKey]).localeCompare(String(b[sortKey])));
  }

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-3 border p-2 w-full" />

      <table className="w-full border rounded">
        <thead>
          <tr>
            {columns.map((col: any) => (
              <th key={col.key} onClick={() => setSortKey(col.key)} className="p-2 cursor-pointer">{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginated.map((row: any) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col: any) => (
                <td key={col.key} className="p-2">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-3">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page}</span>
        <button disabled={page * pageSize >= filtered.length} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
