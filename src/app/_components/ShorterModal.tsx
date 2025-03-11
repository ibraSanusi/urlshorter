"use client";

import { api } from "@/trpc/react";
import { slugGenerator } from "../helpers/slugGenerator";
import React, { useEffect, useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import InputText from "./InputText";
import Button from "./Button";
import RandomIcon from "./icons/RandomIcon";
import RocketIcon from "./icons/RocketIcon";
import { useRouter } from "next/navigation";

export default function ShorterModal() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");
  const [url, setUrl] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   Es necesario crear una mutacion ya que este es un componente de cliente. En el servidor con api.slug.create es suficiente
  const mutation = api.slug.create.useMutation();

  const handleRandomize = () => {
    const newSlug = slugGenerator();
    setSlug(newSlug);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    setError(null); // Limpiar errores previos

    try {
      const hello = await mutation.mutateAsync({
        slug,
        url,
      });
      console.log({ slug, url, hello });
    } catch (error) {
      console.error("Error creating slug:", error);
      setError("An error occurred while creating the link.");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm backdrop-brightness-150">
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full gap-10 rounded-lg bg-principal p-8 xl:max-h-[522px] xl:max-w-[513px] xl:flex-col"
      >
        {/* Header del formulario */}
        <header className="flex xl:flex-row xl:items-center xl:justify-between">
          <h2>Create new link</h2>
          <button
            onClick={() => {
              router.back();
            }}
            type="button"
            className="hover:cursor-pointer"
          >
            <CloseIcon />
          </button>
        </header>

        {/* Inputs y botones */}
        <section className="flex h-full gap-4 xl:flex-col xl:justify-between">
          <div className="flex h-full gap-4 xl:flex-col">
            {/* Input para la URL */}
            <div className="flex xl:flex-col">
              <label htmlFor="destinationLink">Destination URL:</label>
              <InputText
                className="placeholder:text-white"
                id="destinationLink"
                name="destinationLink"
                placeholder="https://"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* Input para el slug */}
            <div className="flex xl:flex-col">
              <label htmlFor="shortLink">Short link:</label>
              <div className="flex xl:flex-row">
                <InputText
                  placeholder="mylink"
                  id="shortLink"
                  name="shortLink"
                  className="w-full rounded-r-none placeholder:text-white autofill:bg-transparent"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <Button
                  onClick={handleRandomize}
                  type="button"
                  className="rounded-l-none hover:scale-100"
                >
                  <RandomIcon />
                  Randomize
                </Button>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-2 xl:flex-row xl:justify-end">
            <Button
              onClick={() => {
                router.back();
              }}
              type="button"
              className="hover:scale-100"
            >
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
          </div>
        </section>

        {/* Mensaje de error */}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
