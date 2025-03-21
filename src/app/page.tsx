// import { LatestPost } from "@/app/_components/post";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  redirect("/dashboard");
  return (
    <HydrateClient>
      <h1>Pagina principal</h1>
    </HydrateClient>
  );
}
