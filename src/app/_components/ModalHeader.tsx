import CloseIcon from "@/app/_components/icons/CloseIcon";

interface Props {
  title: string;
  onClose?: () => void;
}

export default function ModalHeader({ title, onClose }: Props) {
  return (
    <header className="flex xl:flex-row xl:items-center xl:justify-between">
      <h2>{title}</h2>
      <button onClick={onClose} type="button" className="hover:cursor-pointer">
        <CloseIcon />
      </button>
    </header>
  );
}
