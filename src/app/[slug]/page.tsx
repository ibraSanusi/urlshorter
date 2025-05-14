// 📂 src/app/[slug]/page.tsx

import { api } from "@/trpc/server"; // Importa la API del servidor de tRPC
import { HydrateClient } from "@/trpc/server"; // Mantén este import si lo necesitas para algo en el cliente
import { permanentRedirect } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { slug } = await params;

  if (!slug) return;

  // Hacer la consulta de tRPC en el servidor, sin usar useQuery
  const url = await api.slug.getLinkBySlug({ slug });

  // Si se encontro un enlace, se aumenta el contador de clicks
  if (url) {
    await api.slug.increaseClickCount({ slug });
  }

  // Si no se encuentra un enlace, muestra un mensaje adecuado
  if (!url) {
    return (
      <HydrateClient>
        <h1>No se encontró un enlace para el slug: {slug}</h1>
      </HydrateClient>
    );
  }

  if (url) {
    permanentRedirect(url); // Navigate to the new user profile
  }

  // Esto no deberia mostrarse si todo va bien
  return (
    <HydrateClient>
      <h1>Página principal</h1>
      <span>Slug: {slug}</span>
      <div>
        Enlace: <a href={url}>{url}</a>
      </div>
    </HydrateClient>
  );
}
