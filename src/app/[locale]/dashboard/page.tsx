import Card from "@/components/admin/card";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/dashboard`, { cache: "no-store" });
  return res.json();
}

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(data.totals).map(([key, value]) => (
          <Card key={key} title={key} value={value} />
        ))}
      </div>
    </div>
  );
}
