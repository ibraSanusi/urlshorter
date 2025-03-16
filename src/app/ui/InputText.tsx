import { ComponentProps, FC } from "react";

const InputText: FC<ComponentProps<"input">> = ({
  placeholder,
  className,
  id,
  value,
  onChange,
}) => {
  return (
    <input
      className={`items-center gap-2 rounded-lg border-[1px] border-white bg-inherit p-2 focus:outline-none xl:text-sm ${className}`}
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputText;
