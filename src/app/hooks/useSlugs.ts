"use client";

// hooks/useSlugs.ts (Hook para obtener y gestionar slugs)
import { api } from "@/trpc/react";

export type SlugType = {
  link: {
    url: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
  };
} & {
  slug: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  linkId: number;
  createdById: string;
};

export function useSlugs() {
  const { data, isLoading, error } = api.slug.getAll.useQuery();

  const mutation = api.slug.delete.useMutation();

  const deleteSlug = (slug: string) => {
    if (!slug) return;
    mutation.mutate({ slug });
  };

  const onSuccess = () => {
    return api.slug.getAll.useQuery();
  };

  return { slugs: data, isLoading, error, deleteSlug, onSuccess };
}
