import DiscordIcon from "@/app/_components/icons/DiscordIcon";
import GeminiIcon from "@/app/_components/icons/GeminiIcon";

import { auth } from "@/server/auth";
import LinkCustom from "@/app/ui/LinkCustom";

export default async function Page() {
  const session = await auth();

  return (
    <section className="m-auto flex h-full max-h-80 w-full max-w-96 flex-col items-center gap-4 rounded-lg border-[1px] border-white/50 p-4 shadow-lg">
      <GeminiIcon />
      <header className="flex flex-col items-center">
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
