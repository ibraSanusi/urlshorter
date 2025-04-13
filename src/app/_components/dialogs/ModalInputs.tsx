import React from "react";
import InputText from "@/app/ui/InputText";
import { Button } from "@/app/ui/Button";
import RandomIcon from "@/app/_components/icons/RandomIcon";
import LockIcon from "../icons/LockIcon";

interface Props {
  handleRandomize: () => void;
  addSlug: (slug: string) => void;
  addUrl: (url: string) => void;
  editMode?: boolean;
  slug?: string;
  url?: string;
}

export default function ModalInputs({
  addSlug,
  addUrl,
  handleRandomize,
  slug,
  url,
  editMode = false,
}: Props) {
  const isRandomizeDisabled = editMode;
  return (
    <section className="flex h-full flex-col justify-between gap-4">
      <div className="flex h-full flex-col gap-4">
        {/* Input para la URL */}
        <div className="flex flex-col">
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
        <div className="flex flex-col">
          <label htmlFor="shortLink">Short link:</label>
          <div className="flex flex-row">
            <InputText
              placeholder="mylink"
              id="shortLink"
              name="shortLink"
              className="w-full rounded-r-none placeholder:text-white autofill:bg-transparent"
              value={slug}
              onChange={(e) => addSlug(e.target.value)}
            />
            <Button
              disabled={isRandomizeDisabled}
              onClick={handleRandomize}
              type="button"
              className={`rounded-l-none ${editMode ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {editMode ? (
                <LockIcon />
              ) : (
                <>
                  <RandomIcon />
                  <span>Randomize</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
