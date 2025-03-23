import { createContext, ReactNode, useContext } from "react";
import { useModal } from "@/app/hooks/useModal";
import { ModalServiceType } from "@/app/services/modalService";

// Definir la interfaz del contexto
export interface ModalContextType {
  modalService: ModalServiceType;
  slug: string;
  url: string;
  submit: boolean;
  error: string | null;
  updateable: boolean;
  slugToDelete: string;
  slugToDeleteId?: number;
  deleteable: boolean;
  newUrl: string;
  setDeleteable: (value: boolean) => void;
  setSlugToDeleteId: (id?: number) => void;
  handleDelete: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setSlugToDelete: (slug: string) => void;
  handleCreate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRandomize: () => void;
  addUrl: (url: string) => void;
  addSlug: (slug: string) => void;
  addNewUrl: (url: string) => void;
}

// Crear el contexto con un valor inicial undefined
const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const modalValues = useModal();

  return (
    <ModalContext.Provider value={modalValues}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de forma segura
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
