"use client";

import { modalService } from "@/app/services/modalService";
import { useEffect, useState } from "react";
import { slugGenerator } from "@/app/helpers/slugGenerator";
import { SlugType, useSlugs } from "./useSlugs";

export function useModal() {
  const { slugs } = useSlugs();

  const [slugList, setSlugList] = useState<SlugType[]>([]);
  // Modal service
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
  const [editMode, setEditMode] = useState(false);
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
    setSlugToEdit(slug);
    setEditMode(true);
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

      if (slugCreated) {
        setSlug(""); // Limpiar el campo de slug después de crear
        setUrl(""); // Limpiar el campo de URL después de crear
        closeModal(); // Cerrar el modal después de crear

        setSlugList((prev) => [...prev, slugCreated]); // Actualizar la lista de slugs
      }
    } catch (error) {
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

      if (slugUpdated) {
        setSlugToEdit(""); // Limpiar el campo de slug después de actualizar
        setCurrentUrl(""); // Limpiar el campo de URL después de actualizar
        closeModal(); // Cerrar el modal después de actualizar
      }
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

  // Ininicialize slugList with slugs from useSlugs
  useEffect(() => {
    if (slugs) {
      setSlugList(slugs);
    }
  }, [slugs]);

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
    editMode,
    slugList,
    setEditMode,
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
