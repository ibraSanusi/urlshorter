import React from "react";
import InputText from "@/app/ui/InputText";
import { Button } from "@/app/ui/Button";
import RandomIcon from "@/app/_components/icons/RandomIcon";

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
              disabled={isRandomizeDisabled}
              onClick={handleRandomize}
              type="button"
              className={`rounded-l-none ${editMode ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <RandomIcon />
              Randomize
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
