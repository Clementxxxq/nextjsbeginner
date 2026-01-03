"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { use, useEffect, useRef, useState } from "react";

import { ContactSchema } from "@/zod/contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";

export type ContactFormData = {
  name: string;
  email?: string;
  phone: string;
  address?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ContactFormData) => void;
  initialData?: ContactFormData;
  mode: "add" | "edit";
};

export default function ContactDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
}: Props) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  /*
  // Reset form data
  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", address: "" });
    setError("");
    setIsSubmitting(false);
  };
*/
  // Initialize data when opening Dialog
  useEffect(() => {
    if (open) {
      reset(initialData ?? { name: "", email: "", phone: "", address: "" });
    }
  }, [open, initialData, reset]);

  /*
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error message when user starts typing
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      resetForm();
    } catch (err) {
      setError("Failed to save contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };
  */

  const submit: SubmitHandler<ContactFormData> = async (data) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Contact" : "Edit Contact"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email")}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone*/}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              {...register("phone")}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              {...register("address")}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : mode === "add"
                ? "Add Contact"
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
