// import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { SlugCard } from "@/app/_components/SlugCard";
import CrossIcon from "@/app/_components/icons/CrossIcon";
import AvatarIcon from "@/app/_components/icons/AvatarIcon";
import SearchingInput from "@/app/_components/SearchingInput";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.slug.getAllSlugs.prefetch();
  }

  return (
    <HydrateClient>
      <header className="flex border-b-2 xl:justify-between xl:px-12 xl:py-8">
        <h1>Slug Shorter</h1>
        <button>
          <AvatarIcon />
        </button>
      </header>
      <main className="flex xl:flex-col xl:gap-4 xl:px-12 xl:py-8">
        {/* Header of main */}
        <header className="flex xl:justify-between">
          <SearchingInput />

          <Link
            className="flex w-fit flex-row items-center gap-2 rounded-[5px] bg-white px-[11px] py-[8px] font-bold text-[#386641] transition-transform hover:scale-105 hover:cursor-pointer hover:bg-secondary hover:text-principal"
            href="/create"
          >
            <CrossIcon />
            Create Link
          </Link>
        </header>

        {/* Section of main (slug cards) */}
        <section className="grid h-full w-full grid-cols-2 gap-4">
          {session?.user && <SlugCard />}
        </section>
      </main>
    </HydrateClient>
  );
}
