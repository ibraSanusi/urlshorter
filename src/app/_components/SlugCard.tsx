"use client";

import { api } from "@/trpc/react";
import SettingIcon from "./icons/SettingsIcon";
import TrashIcon from "./icons/TrashIcon";

export function SlugCard() {
  const { data: slugs, isLoading, error } = api.slug.getAllSlugs.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {slugs?.length ? (
        slugs.map(
          ({
            createdAt,
            createdById,
            id,
            linkId,
            text,
            updatedAt,
            link: { url },
          }) => (
            <article
              key={id} // Agrega una clave única para mejorar la eficiencia de React
              className="flex rounded-lg border-[1px] border-white p-2 xl:h-[97px] xl:max-w-[680px] xl:flex-col xl:justify-between"
            >
              <header className="flex flex-row justify-between">
                <span>{text}</span>
                <div className="flex flex-row items-center gap-2">
                  <span>0 clicks</span>
                  <button>
                    {/* Ícono de ajustes */}
                    <SettingIcon />
                  </button>
                  <button>
                    {/* Ícono de eliminar */}
                    <TrashIcon />
                  </button>
                </div>
              </header>

              <span>{url}</span>

              <footer className="w-full text-end text-sm">
                {createdAt.toDateString()}
              </footer>
            </article>
          ),
        )
      ) : (
        <p>No slugs found</p>
      )}
    </>
  );
}
