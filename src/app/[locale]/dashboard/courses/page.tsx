"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/admin/data-table";

export default function CoursesPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/admin/courses");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Courses</h1>
      <DataTable
        data={data}
        columns={[
          { key: "courseCode", label: "Code" },
          { key: "nameAr", label: "Name" },
        ]}
        onDelete={async (id: string) => {
          await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
          fetchData();
        }}
        onEdit={(row: any) => console.log("edit", row)}
      />
    </div>
  );
}
