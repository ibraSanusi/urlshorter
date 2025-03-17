"use client";

import { api } from "@/trpc/react";
import SettingIcon from "@/app/_components/icons/SettingsIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import CopyIcon from "./icons/CopyIcon";
import { copyToClipboard } from "../helpers/copyClipboard";

export function SlugCard() {
  const { data: slugs, isLoading, error } = api.slug.getAll.useQuery();
  const mutation = api.slug.delete.useMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (slugId: number) => {
    if (!slugId) return; // No devuelvas null, simplemente retorna

    mutation.mutate(
      { slugId },
      {
        onSuccess: () => {
          // Manejar el éxito, por ejemplo, invalidar la caché
          console.log(`Slug con ID ${slugId} eliminado correctamente.`);
          // Si tienes un query que lista los slugs, puedes invalidarlo para que se vuelva a cargar
          // api.slug.list.invalidate(); // Ejemplo: si tienes un query llamado 'list'
        },
        onError: (error) => {
          // Manejar el error
          console.error(`Error al eliminar el slug con ID ${slugId}:`, error);
        },
      },
    );
  };

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
                <button
                  onClick={() => {
                    copyToClipboard("localhost:3000/" + slug);
                  }}
                >
                  {/* Ícono de copia en portapapeles */}
                  <CopyIcon />
                </button>
                <button>
                  {/* Ícono de ajustes */}
                  <SettingIcon />
                </button>
                <button
                  onClick={() => {
                    console.log("borrando...");
                    handleDelete(id);
                  }}
                >
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
