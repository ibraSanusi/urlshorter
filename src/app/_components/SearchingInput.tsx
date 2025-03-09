import React from "react";
import SearchIcon from "./icons/SearchIcon";

export default function SearchingInput() {
  return (
    <div className="flex flex-row items-center gap-2 rounded-lg border-[1px] border-white p-2">
      <SearchIcon />
      <input
        className="bg-inherit focus:outline-none"
        type="text"
        placeholder="Search links"
      />
    </div>
  );
}
