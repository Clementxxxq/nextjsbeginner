"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type Contact = {
  id: number;
  name: string;
  telephone: number;
  email: string;
  address: string;
};
export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "John Doe",
      telephone: 1234567890,
      email: "john.doe@example.com",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Jane Smith",
      telephone: 9876543210,
      email: "jane.smith@example.com",
      address: "456 Oak Ave",
    },
  ]);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold">Address Book</h1>
      <Button>Add Contact</Button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Telephone</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
              <td className="border border-gray-300 px-4 py-2">{contact.telephone}</td>
              <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
              <td className="border border-gray-300 px-4 py-2">{contact.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}


