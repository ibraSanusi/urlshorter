import React from "react";
import SearchIcon from "../_components/icons/SearchIcon";

export default function SearchingInput() {
  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-lg border-[1px] border-white p-2 lg:w-fit">
      <SearchIcon />
      <input
        className="bg-inherit focus:outline-none"
        type="text"
        placeholder="Search links"
      />
    </div>
  );
}
