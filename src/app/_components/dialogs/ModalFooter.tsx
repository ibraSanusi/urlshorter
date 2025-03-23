import React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function ModalFooter({ children }: Props) {
  return (
    <div className="flex gap-2 xl:flex-row xl:justify-end">{children}</div>
  );
}
