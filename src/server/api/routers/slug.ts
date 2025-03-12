import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

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

  // delete: protectedProcedure.mutation(async ({ ctx }) => {
  //   // Recuperar los slugs y el url y formatear la respuesta
  //   const slugs = await ctx.db.slug.delete({
  //     where: { createdById: ctx.session.user.id },
  //   });

  //   console.log("Slugs encontrados:", slugs);
  //   return slugs;
  // }),
});
