import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ContactSchema } from "@/lib/zod/contact";

/**
 * Get /api/contacts
 * @returns A list of contacts ordered by creation date in descending order.
 * Supports pagination and search by name or phone.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query") ?? "";
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 5);

    const where = query
      ? {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive" as const,
              },
            },
            {
              phone: {
                contains: query,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contact.count({ where }),
    ]);

    return NextResponse.json({ contacts, total });
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
 * Validates the request body using Zod schema.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json(); //Read the JSON sent from the front end
    console.log("RAW BODY:", body);

    const parsed = ContactSchema.safeParse(body); //Use Zod rules to check if the body is valid
    console.log("ZOD RESULT:", parsed);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, address } = parsed.data;

    const contact = await prisma.contact.create({
      data: {
        name,
        phone,
        email: email ?? null,
        address: address ?? null,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("CREATE CONTACT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}
