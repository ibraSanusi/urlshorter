"use client";

import { modalService } from "@/app/services/modalService";
import { useEffect, useState } from "react";
import { slugGenerator } from "@/app/helpers/slugGenerator";

export function useModal() {
  const createMutation = modalService.create();
  const deleteMutation = modalService.delete();

  const [slug, setSlug] = useState<string>("");
  const [url, setUrl] = useState("");
  const [submit, setSubmit] = useState(false);
  const [updateable, setUpdateable] = useState(false);
  const [deleteable, setDeleteable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugToDelete, setSlugToDelete] = useState<string>("");
  const [slugToDeleteId, setSlugToDeleteId] = useState<number>();

  const handleRandomize = () => {
    const newSlug = slugGenerator();
    setSlug(newSlug);
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    setError(null); // Limpiar errores previos

    try {
      if (slugToDelete.trimEnd() !== slug.trimEnd()) {
        setError("The slug does not match.");
        return;
      }

      if (slugToDeleteId === undefined) {
        setError("The slug ID is not defined.");
        console.error("The slug ID is not defined.");
      }

      const slugDeleted =
        slugToDeleteId &&
        deleteMutation.mutateAsync({
          slugId: slugToDeleteId,
        });

      console.log({ slug, url, slugDeleted });
    } catch (error) {
      console.error("Error deleting link and slug:", error);
      setError("An error occurred while deleting the link and slug.");
    } finally {
      setSubmit(false);
    }
  };

  const ableDeleteButton = useEffect(() => {
    if (slugToDelete.length > 0) {
      setDeleteable(true);
    }

    return () => {
      setDeleteable(false);
    };
  }, [slugToDelete]);

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
    ableDeleteButton,
    setDeleteable,
    setSlugToDeleteId,
    handleDelete,
    setSlugToDelete,
    ableUpdate: setUpdateable,
    handleCreate,
    handleRandomize,
    addUrl: setUrl,
    addSlug: setSlug,
  };
}
