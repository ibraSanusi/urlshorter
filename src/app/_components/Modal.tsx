import { ReactNode } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  children: ReactNode;
  error: string | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Modal({ children, handleSubmit, error }: Props) {
  return (
    <form
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={handleSubmit}
      className="flex h-full w-full gap-10 rounded-lg bg-principal p-8 xl:max-h-[522px] xl:max-w-[513px] xl:flex-col"
    >
      {children}

      {/* Mensaje de error */}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
