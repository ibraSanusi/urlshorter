"use client";

// components/SlugCard.tsx (Solo renderiza un slug)
import SettingIcon from "@/app/_components/icons/SettingsIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import CopyIcon from "@/app/_components/icons/CopyIcon";
import { copyToClipboard } from "../helpers/copyClipboard";

export function SlugCard({
  id,
  slug,
  url,
  onDelete,
}: {
  id: number;
  slug: string;
  url: string;
  onDelete: (id: number) => void;
}) {
  return (
    <section className="flex rounded-lg border p-2 xl:h-[97px] xl:max-w-[680px] xl:flex-col xl:justify-between">
      <header className="flex justify-between">
        <span>/{slug}</span>
        <div className="flex items-center gap-2">
          <span>0 clicks</span>
          <button onClick={() => copyToClipboard("localhost:3000/" + slug)}>
            <CopyIcon />
          </button>
          <button>
            <SettingIcon />
          </button>
          <button onClick={() => onDelete(id)}>
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
