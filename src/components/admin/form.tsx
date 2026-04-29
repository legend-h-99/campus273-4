"use client";

export default function Form({ fields, onSubmit, initial }: any) {
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: any = {};
        fields.forEach((f: any) => (data[f.name] = formData.get(f.name)));
        onSubmit(data);
      }}
    >
      {fields.map((f: any) => (
        <input
          key={f.name}
          name={f.name}
          defaultValue={initial?.[f.name] || ""}
          placeholder={f.label}
          className="border p-2"
        />
      ))}
      <button className="bg-blue-600 text-white p-2">حفظ</button>
    </form>
  );
}
