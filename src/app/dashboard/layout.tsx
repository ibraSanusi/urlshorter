"use client";

import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { exo2 } from "@/app/ui/fonts";
import { ModalProvider } from "@/app/context/modalContext";

export default function DashboardLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <div className={`relative ${exo2.className}`}>
      <TRPCReactProvider>
        <ModalProvider>
          {children}
          {modal}
        </ModalProvider>
      </TRPCReactProvider>
    </div>
  );
}
