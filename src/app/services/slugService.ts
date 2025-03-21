"use client";

// services/slugService.ts
import { api } from "@/trpc/react";

export const slugService = {
  getAll: () => api.slug.getAll.useQuery(),
  delete: (slugId: number) => api.slug.delete.useMutation().mutate({ slugId }),
};
