"use client";

// services/slugService.ts
import { api } from "@/trpc/react";

export const modalService = {
  create: () => api.slug.create.useMutation(),
  delete: () => api.slug.delete.useMutation(),
  update: () => api.slug.update.useMutation(),
};
