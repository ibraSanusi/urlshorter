"use client";

import ModalFooter from "@/app/_components/dialogs/ModalFooter";
import RocketIcon from "@/app/_components/icons/RocketIcon";
import ModalOverlay from "@/app/_components/dialogs/ModalOverlay";
import Modal from "@/app/_components/dialogs/Modal";
import ModalHeader from "@/app/_components/dialogs/ModalHeader";
import DeleteModalInput from "@/app/_components/dialogs/DeleteModalInput";

import { Button } from "@/app/ui/Button";
import { useModalContext } from "@/app/contexts/modalContext";

export default function DeleteModal() {
  const {
    closeModal,
    handleDelete,
    setComfirmedSlugToDelete,
    slugToDelete,
    submit,
    deleteable,
    error,
  } = useModalContext();

  return slugToDelete ? (
    <ModalOverlay onClose={closeModal}>
      <Modal error={error} handleSubmit={handleDelete}>
        <ModalHeader onClose={closeModal} title={`Delete /${slugToDelete}`} />
        <p className="text-md text-red-500">
          Access to the link will be permanently removed. This action cannot be
          undone.
        </p>
        <DeleteModalInput
          onChange={setComfirmedSlugToDelete}
          slug={slugToDelete}
        />

        <ModalFooter>
          <Button onClick={closeModal} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            className={`bg-secondary/80 ${!deleteable ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={!deleteable}
          >
            {submit ? <span>Loading...</span> : <RocketIcon />}
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
