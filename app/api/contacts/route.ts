import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * Get /api/contacts
 * @returns A list of contacts ordered by creation date in descending order.
 */
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
/**
 * post /api/contacts
 * @returns The newly created contact.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}
