import Button from "@/app/ui/Button";
import DiscordIcon from "@/app/_components/icons/DiscordIcon";
import GeminiIcon from "@/app/_components/icons/GeminiIcon";

import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import LinkCustom from "@/app/ui/LinkCustom";

export default async function Page() {
  const session = await auth();

  return (
    <section className="m-auto flex h-full w-full items-center gap-4 rounded-lg border-[1px] border-white/50 p-4 shadow-lg xl:max-h-80 xl:max-w-96 xl:flex-col">
      <GeminiIcon />
      <header className="flex items-center xl:flex-col">
        <h1 className="text-3xl">Log in to Slug</h1>
        <p className="text-center">
          Log in with your favorite social provider to get started:
        </p>
      </header>

      <LinkCustom
        title="Sing in or Sing Out"
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
      >
        <DiscordIcon />

        {session ? "Sign out" : "Continue with Discord"}
      </LinkCustom>
    </section>
  );
}
