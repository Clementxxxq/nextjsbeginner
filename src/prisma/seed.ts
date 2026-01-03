import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.ContactCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    phone: "1234567890",
    address: "123 Main St, City, Country",
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    phone: "0987654321",
    address: "456 Oak Ave, Town, Country",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.contact.create({ data: u });
  }
}

main();
