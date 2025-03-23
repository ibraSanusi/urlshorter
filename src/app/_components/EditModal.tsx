"use client";

import ModalOverlay from "@/app/_components/dialogs/ModalOverlay";
import Modal from "@/app/_components/dialogs/Modal";
import ModalHeader from "@/app/_components/dialogs/ModalHeader";
import ModalInputs from "@/app/_components/dialogs/ModalInputs";
import ModalFooter from "@/app/_components/dialogs/ModalFooter";
import RocketIcon from "@/app/_components//icons/RocketIcon";

import { useRouter } from "next/navigation";
import { useModal } from "@/app/hooks/useModal";
import { Button } from "@/app/ui/Button";
import { api } from "@/trpc/react";
import { usePathname } from "next/navigation";

export default function EditModal() {
  const router = useRouter();
  const pathname = usePathname();

  const slugId = parseInt(pathname.split("/").pop() ?? "", 10);

  console.log({ slugId });

  const result = api.slug.getUlrAndSlugBySlugId.useQuery({ slugId });
  const { slug, url } = result.data ?? { slug: "", url: "" };

  const closeModal = () => {
    router.back();
  };

  const {
    handleRandomize,
    handleSubmit,
    addSlug,
    addUrl,
    ableUpdate,
    updateable,
    error,
  } = useModal();

  return slug && url ? (
    <ModalOverlay onClose={closeModal}>
      <Modal error={error} handleSubmit={handleSubmit}>
        <ModalHeader onClose={closeModal} title="Edit link" />
        <ModalInputs
          editMode={true}
          addSlug={addSlug}
          addUrl={addUrl}
          handleRandomize={handleRandomize}
          slug={slug}
          url={url}
        />

        <ModalFooter>
          <Button onClick={closeModal} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            className={`bg-secondary/80 ${!updateable ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={!updateable}
          >
            {updateable ? <span>Loading...</span> : <RocketIcon />}
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </ModalOverlay>
  ) : (
    // TODO: Add a loading spinner here and style it properly
    <p>Loading...</p>
  );
}
