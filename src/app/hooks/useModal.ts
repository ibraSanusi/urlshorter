"use client";

import { modalService } from "@/app/services/modalService";
import { useState } from "react";
import { slugGenerator } from "@/app/helpers/slugGenerator";

export function useModal() {
  const mutation = modalService.create();
  const [slug, setSlug] = useState<string>("");
  const [url, setUrl] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRandomize = () => {
    const newSlug = slugGenerator();
    setSlug(newSlug);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    setError(null); // Limpiar errores previos

    try {
      const slugCreated = await mutation.mutateAsync({
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
    handleSubmit,
    handleRandomize,
    addUrl: setUrl,
    addSlug: setSlug,
  };
}
