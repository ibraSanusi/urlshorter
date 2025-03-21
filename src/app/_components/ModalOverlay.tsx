import { ReactNode } from "react";

export default function ModalOverlay({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm backdrop-brightness-150"
    >
      {children}
    </div>
  );
}
