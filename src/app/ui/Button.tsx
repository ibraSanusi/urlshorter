import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<"button"> {
  title?: string;
  className?: string;
  disabled?: boolean;
  props?: unknown;
}

export function Button({ children, title, className, ...props }: Props) {
  return (
    <button
      title={title}
      className={`flex w-fit flex-row items-center gap-2 rounded-[5px] bg-white px-[11px] py-[8px] font-bold text-[#386641] transition-transform hover:bg-secondary hover:text-principal ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
