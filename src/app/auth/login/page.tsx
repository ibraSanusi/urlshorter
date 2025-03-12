import DiscordIcon from "@/app/_components/icons/DiscordIcon";
import Image from "next/image";

export default function Page() {
  return (
    <section className="m-auto h-full w-full rounded-lg p-4 shadow-lg xl:max-h-80 xl:max-w-96">
      <Image src={""} alt="Icono de slug" />
      <h1>Log in to Slug</h1>
      <p>Log in with your favorite social provider to get started:</p>
      <button>
        <DiscordIcon />
        Continue with Discord
      </button>
    </section>
  );
}
