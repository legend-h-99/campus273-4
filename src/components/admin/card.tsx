export default function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-2xl shadow p-4 bg-white">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
