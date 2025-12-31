import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * Put /api/contacts/[id]
 * @returns The updated contact.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contactId = Number(id);

    if (isNaN(contactId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await request.json();
    const { name, email, phone } = body;

    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: {
        name,
        email,
        phone,
      },
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

/**
 * Delete /api/contacts/[id]
 * @returns A success message upon deletion.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const contactId = Number(id)

    if (isNaN(contactId)) {
      return NextResponse.json(
        { error: 'Invalid id' },
        { status: 400 }
      )
    }

    await prisma.contact.delete({
      where: { id: contactId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    )
  }
}