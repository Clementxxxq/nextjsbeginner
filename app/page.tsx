'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
};

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    const res = await fetch('/api/contacts');
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async () => {
    setError('');
    if (!name) {
      setError('Name is required');
      return;
    }

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, address }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to add contact');
        return;
      }

      // 成功，刷新列表
      fetchContacts();
      setShowAddDialog(false);
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
    } catch {
      setError('Network error');
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Address Book</h1>
      <Button onClick={() => setShowAddDialog(true)}>Add Contact</Button>

      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
              <td className="border border-gray-300 px-4 py-2">{contact.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
              <td className="border border-gray-300 px-4 py-2">{contact.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddDialog && (
        <div className="border p-4 mt-4">
          <h2 className="text-xl font-bold mb-2">Add Contact</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="mb-2">
            <label className="block">Name:</label>
            <input
              className="border p-1 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block">Email:</label>
            <input
              className="border p-1 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block">Phone:</label>
            <input
              className="border p-1 w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block">Address:</label>
            <input
              className="border p-1 w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAdd}>Confirm</Button>
            <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </main>
  );
}
