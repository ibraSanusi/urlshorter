// import { LatestPost } from "@/app/_components/post";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <h1>Pagina principal</h1>
    </HydrateClient>
  );
}
