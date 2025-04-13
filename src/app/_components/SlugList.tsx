"use client";

// components/SlugList.tsx (Solo renderiza la lista de slugs)
import { useSlugs } from "@/app/hooks/useSlugs";
import { SlugCard } from "@/app/_components/SlugCard";

export function SlugList() {
  const { slugs, isLoading, error, deleteSlug } = useSlugs();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!slugs?.length) return <p>No slugs found</p>;

  return (
    <section className="grid h-full w-full grid-cols-1 gap-4 xl:grid-cols-2">
      {slugs.map(({ id, slug, link: { url } }) => (
        <SlugCard key={id} slug={slug} url={url} />
      ))}
    </section>
  );
}
