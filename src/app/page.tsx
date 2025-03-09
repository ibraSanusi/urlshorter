// import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Button from "./_components/Button";
import { SlugCard } from "./_components/SlugCard";
import CrossIcon from "./_components/icons/CrossIcon";
import AvatarIcon from "./_components/icons/AvatarIcon";
import SearchingInput from "./_components/SearchingInput";
import ShorterModal from "./_components/ShorterModal";

export default async function Home() {
  // const hello = await api.slug.create({
  //   slug: "hg658",
  //   url: "https://www.linkedin.com/in/ibrahim-ayodeji-sanusi-0208112a7/",
  // });
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

          <Button>
            <CrossIcon />
            Create Link
          </Button>
        </header>

        {/* Section of main (slug cards) */}
        <section className="grid h-full w-full grid-cols-2 gap-4">
          {session?.user && <SlugCard />}
        </section>
      </main>

      {/* <ShorterModal /> */}
    </HydrateClient>
  );
}
