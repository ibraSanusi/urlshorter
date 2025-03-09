"use client";

import { api } from "@/trpc/react";

export function AllSlugs() {
  const { data: slugs, isLoading, error } = api.slug.getAllSlugs.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full max-w-xs">
      {slugs?.length ? (
        slugs.map((slug) => (
          <div key={slug.id} className="mb-2">
            <p className="truncate text-red-500">UrlId: {slug.linkId}</p>
            <p className="truncate text-blue-500">Slug: {slug.text}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No slugs found</p>
      )}
    </div>
  );
}
