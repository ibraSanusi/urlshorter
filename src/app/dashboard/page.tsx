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
import { api } from "@/trpc/react";

export default function Home() {
  const { data: session, status } = useSession();

  // TODO: Refactor to use context and useModal to open the modal

  const { openCreateModal, openedModal } = useModalContext();

  return (
    <div>
      <header className="flex border-b-[1px] xl:justify-between xl:px-12 xl:py-8">
        <h1>Slug Shorter</h1>
        <button>
          <AvatarIcon />
        </button>
      </header>
      <main className="flex xl:flex-col xl:gap-4 xl:px-12 xl:py-8">
        {/* Header of main */}
        <header className="flex xl:justify-between">
          <SearchingInput />

          {/* Create button */}
          <Button
            title="create_link"
            onClick={() => {
              openCreateModal();
            }}
          >
            <CrossIcon />
            Create Link
          </Button>
        </header>

        {/* Section of main (slug cards) */}
        <section className="grid h-full w-full grid-cols-2 gap-4">
          {session?.user && <SlugList />}
        </section>
      </main>

      {/* Modal */}
      {openedModal === "create" && <CreateModal />}
      {openedModal === "edit" && <EditModal />}
      {openedModal === "delete" && <DeleteModal />}
    </div>
  );
}
