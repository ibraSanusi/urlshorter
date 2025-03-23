"use client";

// components/SlugCard.tsx (Solo renderiza un slug)
import SettingIcon from "@/app/_components/icons/SettingsIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import CopyIcon from "@/app/_components/icons/CopyIcon";
import Link from "next/link";

import { copyToClipboard } from "@/app/helpers/copyClipboard";

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToCopy = `${baseUrl}/${slug}`;

  return (
    <section className="flex rounded-lg border p-2 xl:h-[97px] xl:max-w-[680px] xl:flex-col xl:justify-between">
      <header className="flex justify-between">
        <span>/{slug}</span>
        <div className="flex items-center gap-2">
          <span>0 clicks</span>
          <button onClick={() => copyToClipboard(urlToCopy)}>
            <CopyIcon />
          </button>
          <Link href={`/dashboard/edit/${id}`}>
            <SettingIcon />
          </Link>
          <Link href={`/dashboard/delete/${id}`}>
            <TrashIcon />
          </Link>
        </div>
      </header>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {url}
      </span>
    </section>
  );
}
