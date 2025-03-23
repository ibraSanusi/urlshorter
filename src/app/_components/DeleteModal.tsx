"use client";

import ModalFooter from "@/app/_components/dialogs/ModalFooter";
import RocketIcon from "@/app/_components/icons/RocketIcon";
import ModalOverlay from "@/app/_components/dialogs/ModalOverlay";
import Modal from "@/app/_components/dialogs/Modal";
import ModalHeader from "@/app/_components/dialogs/ModalHeader";
import DeleteModalInput from "@/app/_components/dialogs/DeleteModalInput";

import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button";
import { api } from "@/trpc/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useModalContext } from "@/app/context/modalContext";

export default function DeleteModal() {
  const router = useRouter();
  const pathname = usePathname();

  const slugId = parseInt(pathname.split("/").pop() ?? "", 10);
  console.log({ slugId });

  // Evitar llamadas innecesarias si slugId no es válido
  const result = slugId
    ? api.slug.getUlrAndSlugBySlugId.useQuery({ slugId })
    : { data: null };
  const { slug, url } = result.data ?? { slug: "", url: "" };

  const closeModal = () => {
    router.back();
  };

  const {
    setSlugToDeleteId,
    setSlugToDelete,
    handleDelete,
    addSlug,
    submit,
    deleteable,
    error,
  } = useModalContext();

  // Cuando se cargue el componente, se establece el slugToDeleteId
  useEffect(() => {
    if (slugId && slug) {
      setSlugToDeleteId(slugId);
      addSlug(slug);
    }
  }, [slugId, slug]);

  return slug && url ? (
    <ModalOverlay onClose={closeModal}>
      <Modal error={error} handleSubmit={handleDelete}>
        <ModalHeader onClose={closeModal} title={`Delete /${slug}`} />
        <p className="text-md text-red-500">
          Access to the link will be permanently removed. This action cannot be
          undone.
        </p>
        <DeleteModalInput onChange={setSlugToDelete} slug={slug} />

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
