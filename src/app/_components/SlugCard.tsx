"use client";

import { api } from "@/trpc/react";
import SettingIcon from "@/app/_components/icons/SettingsIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";

export function SlugCard() {
  const { data: slugs, isLoading, error } = api.slug.getAll.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {slugs?.length ? (
        slugs.map(({ id, slug, link: { url } }) => (
          <div
            key={id} // Agrega una clave única para mejorar la eficiencia de React
            className="flex rounded-lg border-[1px] border-white p-2 xl:h-[97px] xl:max-w-[680px] xl:flex-col xl:justify-between"
          >
            <header className="flex flex-row justify-between">
              <span>/{slug}</span>
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

            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {url}
            </span>

            <footer className="w-full text-end text-sm">
              {/* {createdAt.toDateString()} */}
            </footer>
          </div>
        ))
      ) : (
        <p>No slugs found</p>
      )}
    </>
  );
}
