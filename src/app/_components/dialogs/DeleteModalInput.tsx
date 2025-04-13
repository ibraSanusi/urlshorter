import React from "react";
import InputText from "@/app/ui/InputText";

interface Props {
  slug?: string;
  onChange: (text: string) => void;
}

export default function DeleteModalInput({ slug, onChange }: Props) {
  return (
    <section className="flex h-full flex-col justify-between gap-4">
      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-col">
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
