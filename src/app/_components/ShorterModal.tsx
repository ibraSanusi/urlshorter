"use client";

import CloseIcon from "@/app/_components/icons/CloseIcon";
import InputText from "@/app/ui/InputText";
import Button from "@/app/ui/Button";
import RandomIcon from "@/app/_components/icons/RandomIcon";
import RocketIcon from "@/app/_components//icons/RocketIcon";
import { useRouter } from "next/navigation";
import { useModal } from "../hooks/useModal";
import Modal from "../ui/Modal";

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
    <Modal
      onClose={() => {
        router.back();
      }}
    >
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
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
                onChange={(e) => addUrl(e.target.value)}
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
                  onChange={(e) => addSlug(e.target.value)}
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
    </Modal>
  );
}
