"use client";

// hooks/useSlugs.ts (Hook para obtener y gestionar slugs)
import { api } from "@/trpc/react";

export function useSlugs() {
  const { data: slugs, isLoading, error } = api.slug.getAll.useQuery();
  const mutation = api.slug.delete.useMutation();

  const deleteSlug = (slugId: number) => {
    if (!slugId) return;
    mutation.mutate({ slugId });
  };

  return { slugs, isLoading, error, deleteSlug };
}
