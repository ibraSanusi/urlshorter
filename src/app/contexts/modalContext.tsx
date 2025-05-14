import { createContext, type ReactNode, useContext } from "react";
import { useModal, type UseModalReturnType } from "@/app/hooks/useModal";

// Crear el contexto con un valor inicial undefined
const ModalContext = createContext<UseModalReturnType | undefined>(undefined);

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
