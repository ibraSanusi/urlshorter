import { slugRouter } from "@/server/api/routers/slug";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  slug: slugRouter, // ✅ El router se registra correctamente con el nombre "slug"
});

// Exporta el tipo de la API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.slug.getLatest(); // ❌ Estaba mal en el ejemplo, antes decía "post"
 *       ^? Slug[] // ✅ Ahora hace referencia a "slug"
 */
export const createCaller = createCallerFactory(appRouter);
