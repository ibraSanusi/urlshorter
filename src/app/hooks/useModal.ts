"use client";

import { modalService } from "@/app/services/modalService";
import { useEffect, useState } from "react";
import { slugGenerator } from "@/app/helpers/slugGenerator";

export function useModal() {
  const updateMutation = modalService.update();
  const createMutation = modalService.create();
  const deleteMutation = modalService.delete();

  // Create
  const [slug, setSlug] = useState<string>("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [submit, setSubmit] = useState(false);
  const [updateable, setUpdateable] = useState(false);
  const [deleteable, setDeleteable] = useState(false);

  // Update
  const [oldUrl, setOldUrl] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [slugToEdit, setSlugToEdit] = useState<string>("");

  // Delete
  const [comfirmedSlugToDelete, setComfirmedSlugToDelete] = useState("");
  const [slugToDelete, setSlugToDelete] = useState<string>("");
  const [slugToDeleteId, setSlugToDeleteId] = useState<number>();

  const [openedModal, setOpenedModal] = useState<
    "create" | "edit" | "delete" | null
  >(null);

  const openCreateModal = () => setOpenedModal("create");
  const openEditModal = (slug: string) => {
    console.log("useModal", slug);
    setSlugToEdit(slug);
    setOpenedModal("edit");
  };
  const openDeleteModal = (slug: string) => {
    setOpenedModal("delete");
    setSlugToDelete(slug);
  };
  const closeModal = () => setOpenedModal(null);

  const randomize = () => {
    const newSlug = slugGenerator();
    setSlug(newSlug);
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    setError(null); // Limpiar errores previos

    try {
      if (slugToDelete.trimEnd() !== comfirmedSlugToDelete.trimEnd()) {
        setError("The slug does not match.");
        return;
      }

      if (slugToDelete === undefined) {
        setError("The slug is not defined.");
        console.error("The slug is not defined.");
      }

      const slugDeleted =
        slugToDelete &&
        deleteMutation.mutateAsync({
          slug: slugToDelete,
        });

      console.log({ slug, url, slugDeleted });
    } catch (error) {
      console.error("Error deleting link and slug:", error);
      setError("An error occurred while deleting the link and slug.");
    } finally {
      setSubmit(false);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    setError(null); // Limpiar errores previos

    try {
      const slugCreated = await createMutation.mutateAsync({
        slug,
        url,
      });
      console.log({ slug, url, slugCreated });
    } catch (error) {
      console.error("Error creating slug:", error);
      setError("An error occurred while creating the link.");
    } finally {
      setSubmit(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    setError(null); // Limpiar errores previos

    try {
      const slugUpdated = await updateMutation.mutateAsync({
        slug: slugToEdit,
        url: currentUrl,
      });

      console.log({ slug, url, slugUpdated });
    } catch (error) {
      console.error("Error updating slug:", error);
      setError("An error occurred while updating the link.");
    } finally {
      setSubmit(false);
    }
  };

  // newUrl y url son iguales al inicio. Se actualiza newUrl con el valor del input de editar
  useEffect(() => {
    setCurrentUrl(url);
  }, [url]);

  // ableDeleteButton
  useEffect(() => {
    if (slugToDelete.length > 0) {
      setDeleteable(true);
    }

    return () => {
      setDeleteable(false);
    };
  }, [slugToDelete]);

  // ableUpdateButton
  useEffect(() => {
    if (currentUrl !== oldUrl) {
      setUpdateable(true);
    } else {
      setUpdateable(false);
    }
  }, [currentUrl, oldUrl]);

  return {
    modalService,
    slug,
    url,
    submit,
    error,
    updateable,
    slugToDelete,
    slugToDeleteId,
    deleteable,
    currentUrl,
    openedModal,
    slugToEdit,
    oldUrl,
    comfirmedSlugToDelete,
    setComfirmedSlugToDelete,
    handleUpdate,
    setCurrentUrl,
    setOldUrl,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    setDeleteable,
    setSlugToDeleteId,
    handleDelete,
    setSlugToDelete,
    handleCreate,
    randomize,
    setUrl,
    setSlug,
  };
}

export type UseModalReturnType = ReturnType<typeof useModal>;
