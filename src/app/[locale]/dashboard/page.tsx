async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/dashboard`, { cache: "no-store" });
  return res.json();
}

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(data.totals).map(([key, value]) => (
          <div key={key} className="p-4 bg-white shadow rounded">
            <p className="text-gray-500">{key}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
