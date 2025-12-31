"use client";

import { Button } from "@/components/ui/button";
import ContactDialog, { ContactFormData } from "@/components/ContactDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { useEffect, useState } from "react";

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
};

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<ContactFormData | undefined>();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contacts");
      if (res.ok) {
        setContacts(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openAddDialog = () => {
    setMode("add");
    setEditingId(null);
    setInitialData(undefined);
    setDialogOpen(true);
  };

  const openEditDialog = (contact: Contact) => {
    setMode("edit");
    setEditingId(contact.id);
    setInitialData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email ?? "",
      address: contact.address ?? "",
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setDeletingId(id);
    setDeleteOpen(true);
  };

  const handleSubmit = async (data: ContactFormData) => {
    try {
      const url =
        mode === "add" ? "/api/contacts" : `/api/contacts/${editingId}`;
      const method = mode === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchContacts();
      }
    } catch (error) {
      console.error("Failed to save contact:", error);
    }
  };

  const confirmDelete = async (id: number) => {
    if (deletingId == null) return;

    try {
      const res = await fetch(`/api/contacts/${deletingId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to delete contact");
        return;
      }
      fetchContacts();
      setDeleteOpen(false);
      setDeletingId(null);
    } catch {
      alert("Network error while deleting contact");
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Address Book</h1>

      <Button onClick={openAddDialog}>Add Contact</Button>

      <table className="w-full border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={6}
                className="border border-gray-300 px-4 py-8 text-center"
              >
                Loading...
              </td>
            </tr>
          ) : contacts.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="border border-gray-300 px-4 py-8 text-center text-gray-500"
              >
                No contacts found. Add your first contact!
              </td>
            </tr>
          ) : (
            contacts.map((c) => (
              <tr key={c.id}>
                <td className="border border-gray-300 px-4 py-2">{c.id}</td>
                <td className="border border-gray-300 px-4 py-2">{c.name}</td>
                <td className="border border-gray-300 px-4 py-2">{c.phone}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {c.email || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {c.address || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => openEditDialog(c)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setDeletingId(c.id);
                        setDeleteOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ContactDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
        mode={mode}
      />
      <DeleteConfirmDialog
        open={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => confirmDelete(deletingId!)}
      />
    </main>
  );
}
