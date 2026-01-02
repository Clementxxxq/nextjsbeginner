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
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<ContactFormData | undefined>();

  const fetchContacts = async (query: string = "", pageNum: number = 1) => {
    try {
      setLoading(true);
      const url = new URL("/api/contacts", window.location.origin);
      if (query) {
        url.searchParams.append("query", query);
      }
      url.searchParams.append("page", pageNum.toString());
      url.searchParams.append("limit", limit.toString());
      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(searchQuery, page);
  }, [searchQuery, page]);

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
        if (mode === "add") {
          // anticipate one more item and jump to last page
          const newTotal = total + 1;
          const lastPage = Math.max(1, Math.ceil(newTotal / limit));
          setPage(lastPage);
        } else {
          fetchContacts(searchQuery, page);
        }
      }
    } catch (error) {
      console.error("Failed to save contact:", error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
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
      fetchContacts(searchQuery, page);
      setDeleteOpen(false);
      setDeletingId(null);
    } catch {
      alert("Network error while deleting contact");
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-extrabold text-center mb-8">Address Book</h1>
      {/* Search and Add Button */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search by name or phone number..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={openAddDialog}>+ Add Contact</Button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6"></div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left w-12">No.</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  No contacts found. Add your first contact!
                </td>
              </tr>
            ) : (
              contacts.map((c, index) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-500">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3 text-gray-600">{c.email || "-"}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.address || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(c)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
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
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-gray-600">
          Page {page} of {Math.max(1, Math.ceil(total / limit))} · Total {total}
        </span>

        <Button
          variant="outline"
          disabled={page >= Math.ceil(total / limit)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>

      {/* Dialogs */}
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
