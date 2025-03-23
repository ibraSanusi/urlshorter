import React from "react";
import InputText from "@/app/ui/InputText";

interface Props {
  slug?: string;
  onChange: (text: string) => void;
}

export default function DeleteModalInput({ slug, onChange }: Props) {
  return (
    <section className="flex h-full gap-4 xl:flex-col xl:justify-between">
      <div className="flex h-full gap-4 xl:flex-col">
        <div className="flex xl:flex-col">
          <label htmlFor="destinationLink">Type {slug} to confirm:</label>
          <InputText
            className="placeholder:text-white"
            id="slugToDelete"
            name="slugToDelete"
            // value={slug}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
