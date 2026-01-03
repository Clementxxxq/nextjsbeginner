import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be at most 100 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" }),
});
