import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { link } from "fs";

// Si se crea un slug y el link no existe se crea el link en la base de datos aqui
export const slugRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ slug: z.string().min(1), url: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      console.log("slug y url: " + input.slug + " " + input.url);
      // Buscar el link en la base de datos
      let link = await ctx.db.link.findFirst({
        where: { url: input.url, createdById: ctx.session.user.id },
      });

      // Si el link no existe, se crea
      if (!link) {
        link = await ctx.db.link.create({
          data: {
            url: input.url,
            createdById: ctx.session.user.id,
          },
        });
      }

      // Asegurarnos que `link` no es null antes de continuar
      if (!link) {
        throw new Error("Failed to retrieve or create link");
      }

      // Crear el slug asociado al link
      return ctx.db.slug.create({
        data: {
          slug: input.slug,
          createdById: ctx.session.user.id,
          linkId: link.id, // link.id ahora está garantizado
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Recuperar los slugs y el url y formatear la respuesta
    const slugs = await ctx.db.slug.findMany({
      include: {
        link: true, // Carga la relación con la tabla `link`
      },
      where: { createdById: ctx.session.user.id },
    });

    console.log("Slugs encontrados:", slugs);
    return slugs;
  }),

  /**
   * @description Se obtiene el link de la base de datos a partir del slug
   */
  getLinkBySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1) })) // Validación de entrada
    .query(async ({ ctx, input }) => {
      console.log({ input });
      // Recuperar los slugs y el url y formatear la respuesta
      const result = await ctx.db.slug.findUnique({
        where: { slug: input.slug }, // Filtra por el slug
        select: {
          link: {
            // Asumiendo que `link` es la relación que contiene el URL
            select: {
              url: true, // Selecciona solo el campo 'url'
            },
          },
        },
      });

      if (!result?.link?.url) {
        throw new Error("No se encontró un enlace para este slug.");
      }

      console.log("Slug encontrado:", input.slug);

      return result.link.url; // Devuelve solo la URL
    }),

  delete: protectedProcedure
    .input(z.object({ slugId: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Recuperar los slugs y el url y formatear la respuesta
      const slug = await ctx.db.slug.delete({
        where: { id: input.slugId },
      });

      console.log("Slug con id :", slug, " eliminado");
      return slug;
    }),
});
