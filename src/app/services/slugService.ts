"use client";

// services/slugService.ts
import { api } from "@/trpc/react";

export const slugService = {
  getAll: () => api.slug.getAll.useQuery(),
  delete: (slug: string) => api.slug.delete.useMutation().mutate({ slug }),
  getClicks: (slug: string) => api.slug.getClicks.useQuery({ slug }),
};
