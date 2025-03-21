import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { SlugCard } from "@/app/_components/SlugCard";
import CrossIcon from "@/app/_components/icons/CrossIcon";
import AvatarIcon from "@/app/_components/icons/AvatarIcon";
import SearchingInput from "@/app/ui/SearchingInput";
import LinkCustom from "@/app/ui/LinkCustom";
import { SlugList } from "../_components/SlugList";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.slug.getAll.prefetch();
  }

  return (
    <HydrateClient>
      <header className="flex border-b-[1px] xl:justify-between xl:px-12 xl:py-8">
        <h1>Slug Shorter</h1>
        <button>
          <AvatarIcon />
        </button>
      </header>
      <main className="flex xl:flex-col xl:gap-4 xl:px-12 xl:py-8">
        {/* Header of main */}
        <header className="flex xl:justify-between">
          <SearchingInput />

          <LinkCustom title="create_link" href="/dashboard/create">
            <CrossIcon />
            Create Link
          </LinkCustom>
        </header>

        {/* Section of main (slug cards) */}
        <section className="grid h-full w-full grid-cols-2 gap-4">
          {session?.user && <SlugList />}
        </section>
      </main>
    </HydrateClient>
  );
}
