"use client";

import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { exo2 } from "@/app/ui/fonts";
import { ModalProvider } from "@/app/contexts/modalContext";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <div className={`relative ${exo2.className}`}>
      <TRPCReactProvider>
        <SessionProvider>
          <ModalProvider>{children}</ModalProvider>
        </SessionProvider>
      </TRPCReactProvider>
    </div>
  );
}
