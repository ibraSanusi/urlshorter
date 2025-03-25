"use client";

// hooks/useSlugs.ts (Hook para obtener y gestionar slugs)
import { api } from "@/trpc/react";

export function useSlugs() {
  const { data: slugs, isLoading, error } = api.slug.getAll.useQuery();
  const mutation = api.slug.delete.useMutation();

  const deleteSlug = (slug: string) => {
    if (!slug) return;
    mutation.mutate({ slug });
  };

  return { slugs, isLoading, error, deleteSlug };
}
