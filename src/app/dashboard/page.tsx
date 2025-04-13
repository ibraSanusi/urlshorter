"use client";

import CrossIcon from "@/app/_components/icons/CrossIcon";
import AvatarIcon from "@/app/_components/icons/AvatarIcon";
import SearchingInput from "@/app/ui/SearchingInput";
import { SlugList } from "@/app/_components/SlugList";
import { Button } from "@/app/ui/Button";
import EditModal from "@/app/_components/EditModal";
import { useModalContext } from "@/app/contexts/modalContext";
import { useSession } from "next-auth/react";
import CreateModal from "@/app/_components/CreateModal";
import DeleteModal from "@/app/_components/DeleteModal";
import SlugIcon from "../_components/icons/SlugIcon";
import Link from "next/link";
import GithubIcon from "../_components/icons/GithubIcon";
import MoonIcon from "../_components/icons/MoonIcon";
import SearchIcon from "../_components/icons/SearchIcon";

export default function Home() {
  const { data: session, status } = useSession();

  // TODO: Refactor to use context and useModal to open the modal

  const { openCreateModal, openedModal } = useModalContext();

  return (
    <div>
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
          <button>
            <AvatarIcon />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex w-full flex-col gap-4 p-4 xl:flex-col xl:gap-4 xl:px-12 xl:py-8">
        <section className="flex gap-4 xl:justify-between">
          <SearchingInput />

          <div></div>

          {/* Create button */}
          <Button
            title="create_link"
            onClick={() => {
              openCreateModal();
            }}
          >
            <CrossIcon />
            <span className="hidden xl:flex">Create Link</span>
          </Button>
        </section>

        {/* Section of main (slug cards) */}
        {session?.user && <SlugList />}
      </main>

      {/* Modal */}
      {openedModal === "create" && <CreateModal />}
      {openedModal === "edit" && <EditModal />}
      {openedModal === "delete" && <DeleteModal />}
    </div>
  );
}
