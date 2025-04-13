import React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function ModalFooter({ children }: Props) {
  return <div className="flex flex-row justify-end gap-2">{children}</div>;
}
