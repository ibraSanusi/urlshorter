"use client";

import { useRouter } from "next/navigation";
import ModalOverlay from "@/app/_components/ModalOverlay";
import Modal from "@/app/_components/Modal";
import ModalHeader from "@/app/_components/ModalHeader";
import ModalInputs from "@/app/_components/ModalInputs";
import { useModal } from "@/app/hooks/useModal";
import ModalFooter from "@/app/_components/ModalFooter";

export default function ShorterModal() {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const {
    handleRandomize,
    handleSubmit,
    addSlug,
    addUrl,
    error,
    slug,
    submit,
    url,
  } = useModal();

  return (
    <ModalOverlay onClose={closeModal}>
      <Modal error={error} handleSubmit={handleSubmit}>
        <ModalHeader onClose={closeModal} title="Create new Slug" />
        <ModalInputs
          addSlug={addSlug}
          addUrl={addUrl}
          handleRandomize={handleRandomize}
          slug={slug}
          url={url}
        />

        <ModalFooter onClose={closeModal} submit={submit} />
      </Modal>
    </ModalOverlay>
  );
}
