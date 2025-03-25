"use client";

// components/SlugCard.tsx (Solo renderiza un slug)
import SettingIcon from "@/app/_components/icons/SettingsIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import CopyIcon from "@/app/_components/icons/CopyIcon";

import { copyToClipboard } from "@/app/helpers/copyClipboard";
import { useModalContext } from "@/app/contexts/modalContext";

export function SlugCard({ slug, url }: { slug: string; url: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToCopy = `${baseUrl}/${slug}`;

  const { openEditModal, openDeleteModal } = useModalContext();

  return (
    <section className="flex rounded-lg border p-2 xl:h-[97px] xl:max-w-[680px] xl:flex-col xl:justify-between">
      <header className="flex justify-between">
        <span>/{slug}</span>
        <div className="flex items-center gap-2">
          <span>0 clicks</span>
          <button onClick={() => copyToClipboard(urlToCopy)}>
            <CopyIcon />
          </button>
          <button onClick={() => openEditModal(slug)}>
            <SettingIcon />
          </button>
          <button onClick={() => openDeleteModal(slug)}>
            <TrashIcon />
          </button>
        </div>
      </header>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {url}
      </span>
    </section>
  );
}
