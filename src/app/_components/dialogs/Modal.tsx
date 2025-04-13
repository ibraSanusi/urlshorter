import { ReactNode } from "react";

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
      className="flex h-full max-h-[522px] w-full max-w-[513px] flex-col gap-10 rounded-lg bg-principal p-8"
    >
      {children}

      {/* Mensaje de error */}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
