"use client";

import { useEffect, useState } from "react";

type Contact = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  createdAt: string;
};
export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ padding: 20 }}>
      <h1>Contacts List</h1>
      {contacts.length === 0 && <p>No contacts found.</p>}

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name}</strong>
            <br />
            {contact.email && <span>{contact.email}</span>}
            <br />
            {contact.phone && <span>{contact.phone}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
