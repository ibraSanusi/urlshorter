import { ComponentProps, FC } from "react";

const Link: FC<ComponentProps<"a">> = ({
  children,
  title,
  className,
  href,
  ...props
}) => (
  <a
    href={href}
    title={title}
    className={`flex w-fit flex-row items-center gap-2 rounded-[5px] bg-white px-[11px] py-[8px] font-bold text-[#386641] transition-transform hover:scale-105 hover:cursor-pointer hover:bg-secondary hover:text-principal ${className}`}
    {...props}
  >
    {children}
  </a>
);

export default Link;
