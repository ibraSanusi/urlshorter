"use client";

import React from "react";
// import ShorterModal from "@/app/_components/ShorterModal";

import dynamic from "next/dynamic";
// import ShorterModal from "@/app/_components/ShorterModal";

const ShorterModal = dynamic(
  () => import("../../../_components/ShorterModal"),
  {
    ssr: false,
  },
);

export default function Open() {
  return <ShorterModal />;
}
