"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/admin/data-table";
import Modal from "@/components/admin/modal";
import Form from "@/components/admin/form";
import Toast from "@/components/admin/toast";

export default function UsersPage() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [toast, setToast] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/admin/users");
    setData(await res.json());
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <button onClick={() => setOpen(true)}>Add</button>

      <DataTable
        data={data}
        columns={[{ key: "email", label: "Email" }, { key: "role", label: "Role" }]}
        onDelete={async (id: string) => {
          await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
          fetchData();
        }}
        onEdit={(row: any) => { setEditing(row); setOpen(true); }}
      />

      <Modal open={open} title="User" onClose={() => setOpen(false)}>
        <Form
          initial={editing}
          fields={[{ name: "email", label: "Email" }, { name: "role", label: "Role" }]}
          onSubmit={async (form: any) => {
            if (editing) {
              await fetch(`/api/admin/users/${editing.id}`, { method: "PUT", body: JSON.stringify(form) });
            } else {
              await fetch(`/api/admin/users`, { method: "POST", body: JSON.stringify(form) });
            }
            setOpen(false);
            setToast(true);
            fetchData();
          }}
        />
      </Modal>

      <Toast message="Saved" show={toast} onClose={() => setToast(false)} />
    </div>
  );
}
