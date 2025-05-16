"use client";

// components/SlugCard.tsx (Solo renderiza un slug)
import SettingIcon from "@/app/_components/icons/SettingsIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import CopyIcon from "@/app/_components/icons/CopyIcon";

import { copyToClipboard } from "@/app/helpers/copyClipboard";
import { useModalContext } from "@/app/contexts/modalContext";
import { slugService } from "../services/slugService";

export function SlugCard({ slug, url }: { slug: string; url: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToCopy = `${baseUrl}/${slug}`;

  const { getClicks } = slugService;
  const { data: clickCount } = getClicks(slug);
  const clicks = clickCount?.clickCount ?? 0;

  console.log({ clicks });

  const { openEditModal, openDeleteModal } = useModalContext();

  return (
    <section className="flex flex-col rounded-lg border p-4 xl:justify-between">
      <header className="flex justify-between">
        <span className="text-lg">/{slug}</span>
        <div className="flex items-center gap-2">
          {clicks && <span>{clicks} clicks</span>}
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
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{url}</p>
    </section>
  );
}
