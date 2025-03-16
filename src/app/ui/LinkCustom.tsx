import Link, { LinkProps } from "next/link";
import { ComponentProps, FC, ReactNode } from "react";

interface Props extends LinkProps {
  children: ReactNode;
  title: string;
  className?: string; // Hacerlo opcional
}

function LinkCustom({ children, title, className, ...props }: Props) {
  return (
    <Link
      title={title}
      className={`flex w-fit flex-row items-center gap-2 rounded-[5px] bg-white px-[11px] py-[8px] font-bold text-[#386641] transition-transform hover:cursor-pointer hover:bg-secondary hover:text-principal ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkCustom;
