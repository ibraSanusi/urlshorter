"use client";

// services/slugService.ts
import { api } from "@/trpc/react";

export const modalService = {
  create: () => api.slug.create.useMutation(),
};
