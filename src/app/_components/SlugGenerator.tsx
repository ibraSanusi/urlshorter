"use client";

import { useState } from "react";
import { slugGenerator } from "../helpers/slugGenerator";

export function SlugGenerator() {
  const [slug, setSlug] = useState<string>("");

  return (
    <div className="w-full max-w-xs">
      <h3>Slug</h3>
      <div className="flex flex-col gap-3">
        <span>{slug || "Genera un slug"}</span>
        <button
          className="rounded-lg bg-red-400 p-2 text-white"
          onClick={() => setSlug(slugGenerator())}
        >
          Generate
        </button>
      </div>
    </div>
  );
}
