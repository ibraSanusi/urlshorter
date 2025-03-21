import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React, { ReactNode } from "react";
import CloseIcon from "@/app/_components/icons/CloseIcon";

interface Props {
  router: AppRouterInstance;
  title: string;
}

export default function ModalHeader({ router, title }: Props) {
  return (
    <header className="flex xl:flex-row xl:items-center xl:justify-between">
      <h2>{title}</h2>
      <button
        onClick={() => {
          router.back();
        }}
        type="button"
        className="hover:cursor-pointer"
      >
        <CloseIcon />
      </button>
    </header>
  );
}
