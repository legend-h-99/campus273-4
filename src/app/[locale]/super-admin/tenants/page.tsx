"use client";

import { useEffect, useState } from "react";

export default function TenantsPage() {
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/super-admin/tenants");
    setData(await res.json());
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tenants</h1>

      <div className="mb-4 flex gap-2">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2" />
        <input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="border p-2" />
        <button
          onClick={async () => {
            await fetch("/api/super-admin/tenants", {
              method: "POST",
              body: JSON.stringify({ name, slug, plan: "free" }),
            });
            setName("");
            setSlug("");
            fetchData();
          }}
          className="bg-blue-600 text-white px-4"
        >
          Add
        </button>
      </div>

      <ul>
        {data.map((t) => (
          <li key={t.id}>
            {t.name} - {t.plan}
          </li>
        ))}
      </ul>
    </div>
  );
}
