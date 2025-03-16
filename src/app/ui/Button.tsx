import { ComponentProps, FC } from "react";

const Button: FC<ComponentProps<"button">> = ({
  children,
  title,
  className,
  ...props
}) => (
  <button
    title={title}
    className={`flex w-fit flex-row items-center gap-2 rounded-[5px] bg-white px-[11px] py-[8px] font-bold text-[#386641] transition-transform hover:cursor-pointer hover:bg-secondary hover:text-principal ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
