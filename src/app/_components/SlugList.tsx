"use client";

// components/SlugList.tsx (Solo renderiza la lista de slugs)
import { useSlugs } from "@/app/hooks/useSlugs";
import { SlugCard } from "@/app/_components/SlugCard";
import { useModal } from "../hooks/useModal";
import { useEffect } from "react";

export function SlugList() {
  const { isLoading, error } = useSlugs();
  const { slugList } = useModal();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!slugList?.length) return <p>No slugs found</p>;

  return (
    <section className="grid h-full w-full grid-cols-1 gap-4 xl:grid-cols-2">
      {slugList.map(({ id, slug, link: { url } }) => (
        <SlugCard key={id} slug={slug} url={url} />
      ))}
    </section>
  );
}
