"use client";

import ModalOverlay from "@/app/_components/dialogs/ModalOverlay";
import Modal from "@/app/_components/dialogs/Modal";
import ModalHeader from "@/app/_components/dialogs/ModalHeader";
import ModalInputs from "@/app/_components/dialogs/ModalInputs";
import ModalFooter from "@/app/_components/dialogs/ModalFooter";
import RocketIcon from "@/app/_components//icons/RocketIcon";
import { Button } from "@/app/ui/Button";
import { useModalContext } from "@/app/contexts/modalContext";

export default function CreateModal() {
  const {
    closeModal,
    randomize,
    handleCreate,
    setSlug,
    setUrl,
    error,
    slug,
    submit,
    url,
  } = useModalContext();

  return (
    <ModalOverlay onClose={closeModal}>
      <Modal error={error} handleSubmit={handleCreate}>
        <ModalHeader onClose={closeModal} title="Create new Slug" />
        <ModalInputs
          addSlug={setSlug}
          addUrl={setUrl}
          handleRandomize={randomize}
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
