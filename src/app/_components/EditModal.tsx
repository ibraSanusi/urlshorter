"use client";

import ModalOverlay from "@/app/_components/dialogs/ModalOverlay";
import Modal from "@/app/_components/dialogs/Modal";
import ModalHeader from "@/app/_components/dialogs/ModalHeader";
import ModalInputs from "@/app/_components/dialogs/ModalInputs";
import ModalFooter from "@/app/_components/dialogs/ModalFooter";
import RocketIcon from "@/app/_components//icons/RocketIcon";

import { Button } from "@/app/ui/Button";
import { useEffect } from "react";
import { useModalContext } from "@/app/contexts/modalContext";
import { api } from "@/trpc/react";

export default function EditModal() {
  const {
    randomize,
    setSlug,
    setCurrentUrl,
    closeModal,
    setOldUrl,
    handleUpdate,
    currentUrl,
    updateable,
    error,
    slugToEdit,
    submit,
    editMode,
  } = useModalContext();

  const result = api.slug.getUlrBySlug.useQuery({ slug: slugToEdit });
  const url = result.data;

  // Cuando se carga el componente se estable una url actual y una url antigua para comparar y asi poder habilitar el boton de guardar
  useEffect(() => {
    setCurrentUrl(url ?? "");
    setOldUrl(url ?? "");
  }, [url]);

  return slugToEdit && currentUrl ? (
    <ModalOverlay onClose={closeModal}>
      <Modal error={error} handleSubmit={handleUpdate}>
        <ModalHeader onClose={closeModal} title="Edit link" />
        <ModalInputs
          editMode={editMode}
          addSlug={setSlug}
          addUrl={setCurrentUrl}
          handleRandomize={randomize}
          slug={slugToEdit}
          url={currentUrl}
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
