"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/reports").then((res) => res.json()).then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div>
        <h2>Users by Role</h2>
        <PieChart width={400} height={300}>
          <Pie data={data.usersByRole} dataKey="value" nameKey="name" outerRadius={100}>
            {data.usersByRole.map((_: any, i: number) => (
              <Cell key={i} />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div>
        <h2>Trainees by Department</h2>
        <BarChart width={500} height={300} data={data.traineesByDepartment}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </div>
    </div>
  );
}
