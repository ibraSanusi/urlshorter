"use client";

// services/slugService.ts
import { api } from "@/trpc/react";

export const modalService = {
  create: () => api.slug.create.useMutation(),
  delete: () => api.slug.delete.useMutation(),
  update: () => api.slug.update.useMutation(),
};

export interface ModalServiceType {
  create: () => {
    mutateAsync: (data: { slug: string; url: string }) => Promise<unknown>;
  };
  delete: () => { mutateAsync: (data: { slug: string }) => Promise<unknown> };
  update: () => {
    mutateAsync: (data: { slug: string; url: string }) => Promise<unknown>;
  };
}
