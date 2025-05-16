"use client";

import CrossIcon from "@/app/_components/icons/CrossIcon";
import AvatarIcon from "@/app/_components/icons/AvatarIcon";
import SearchingInput from "@/app/ui/SearchingInput";
import EditModal from "@/app/_components/EditModal";
import CreateModal from "@/app/_components/CreateModal";
import DeleteModal from "@/app/_components/DeleteModal";
import SlugIcon from "@/app/_components/icons/SlugIcon";
import Link from "next/link";
import GithubIcon from "@/app/_components/icons/GithubIcon";
import MoonIcon from "@/app/_components/icons/MoonIcon";
import SearchIcon from "@/app/_components/icons/SearchIcon";
import BoxIcon from "@/app/_components/icons/BoxIcon";
import { SlugList } from "@/app/_components/SlugList";
import { Button } from "@/app/ui/Button";
import { useModalContext } from "@/app/contexts/modalContext";
import { useSession } from "next-auth/react";
import { useSlugs } from "@/app/hooks/useSlugs";
import { useState } from "react";
import UserMenu from "../_components/UserMenuModal";

export default function Home() {
  const { data: session } = useSession();

  const [openMenuUser, setOpenMenuUser] = useState(false);

  // if (!session?.user) redirect("/auth/login");

  const handleUserMenu = () => {
    setOpenMenuUser((prev) => !prev);
  };

  const { slugs } = useSlugs();

  const { openCreateModal, openedModal } = useModalContext();

  return (
    <div className="relative w-full">
      {/* Header */}
      <header className="flex flex-row justify-between border-b-[1px] p-8 xl:justify-between xl:px-12 xl:py-8">
        <div className="flex items-center gap-2">
          <SlugIcon />
          <h1 className="text-xl">Slug</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={"https://github.com/ibraSanusi/urlshorter"}
          >
            <GithubIcon className="size-6" />
          </Link>
          <button className={"cursor-pointer"}>
            <SearchIcon />
          </button>
          <button className={"cursor-pointer"}>
            <MoonIcon />
          </button>
          <button
            onClick={() => {
              handleUserMenu();
            }}
          >
            <AvatarIcon />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex w-full flex-col gap-4 p-4 xl:flex-col xl:gap-4 xl:px-12 xl:py-8">
        <header className="flex gap-4 md:justify-between">
          <SearchingInput />

          <div className="flex flex-row gap-4">
            {/* Pastilla de total de slugs */}
            <div className="flex flex-row items-center gap-2 rounded-md border-[1px] border-gray-300 p-2">
              <BoxIcon />
              <div className="w-max">{slugs?.length} / 30</div>
            </div>

            {/* Create button */}
            <Button
              title="create_link"
              onClick={() => {
                openCreateModal();
              }}
            >
              <CrossIcon />
              <span className="hidden md:flex">Create Link</span>
            </Button>
          </div>
        </header>

        {/* Section of main (slug cards) */}
        {session?.user && <SlugList />}
      </main>

      {/* Modal */}
      {openedModal === "create" && <CreateModal />}
      {openedModal === "edit" && <EditModal />}
      {openedModal === "delete" && <DeleteModal />}

      {openMenuUser && <UserMenu />}
    </div>
  );
}
