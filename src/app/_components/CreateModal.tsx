"use client";

import { useRouter } from "next/navigation";
import ModalOverlay from "@/app/_components/dialogs/ModalOverlay";
import Modal from "@/app/_components/dialogs/Modal";
import ModalHeader from "@/app/_components/dialogs/ModalHeader";
import ModalInputs from "@/app/_components/dialogs/ModalInputs";
import ModalFooter from "@/app/_components/dialogs/ModalFooter";
import RocketIcon from "@/app/_components//icons/RocketIcon";
import { Button } from "@/app/ui/Button";
import { useModalContext } from "@/app/context/modalContext";

export default function CreateModal() {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const {
    handleRandomize,
    handleCreate,
    addSlug,
    addUrl,
    error,
    slug,
    submit,
    url,
  } = useModalContext();

  // TODO: Create context provider for modal
  return (
    <ModalOverlay onClose={closeModal}>
      <Modal error={error} handleSubmit={handleCreate}>
        <ModalHeader onClose={closeModal} title="Create new Slug" />
        <ModalInputs
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
            className={`bg-secondary/80 ${submit ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={submit}
          >
            {submit ? <span>Loading...</span> : <RocketIcon />}
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </ModalOverlay>
  );
}
