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
    <ModalOverlay
      onClose={() => {
        router.back();
      }}
    >
      <Modal error={error} handleSubmit={handleSubmit}>
        <ModalHeader router={router} title="Create new Slug" />
        <ModalInputs
          addSlug={addSlug}
          addUrl={addUrl}
          handleRandomize={handleRandomize}
          slug={slug}
          url={url}
        />

        <ModalFooter router={router} submit={submit} />
      </Modal>
    </ModalOverlay>
  );
}
