import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

// Si se crea un slug y el link no existe se crea el link en la base de datos aqui
export const slugRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ slug: z.string().min(1), url: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Buscar el link en la base de datos
      let link = await ctx.db.link.findFirst({
        where: { url: input.url, createdById: ctx.session.user.id },
      });

      // Si el link no existe, se crea
      link ??= await ctx.db.link.create({
        data: {
          url: input.url,
          createdById: ctx.session.user.id,
        },
      });

      // Asegurarnos que `link` no es null antes de continuar
      if (!link) {
        throw new Error("Failed to retrieve or create link");
      }

      // Crear el slug asociado al link
      const slugCreated = await ctx.db.slug.create({
        data: {
          slug: input.slug,
          createdById: ctx.session.user.id,
          linkId: link.id, // link.id ahora está garantizado
        },
      });

      const slugFormated = await ctx.db.slug.findFirst({
        include: {
          link: true, // Carga la relación con la tabla `link`
        },
        where: { id: slugCreated.id },
      });

      return slugFormated;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Recuperar los slugs y el url y formatear la respuesta
    const slugs = await ctx.db.slug.findMany({
      include: {
        link: true, // Carga la relación con la tabla `link`
      },
      where: { createdById: ctx.session.user.id },
    });

    return slugs;
  }),

  /**
   * @description Se obtiene el link de la base de datos a partir del slug
   */
  getLinkBySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1) })) // Validación de entrada
    .query(async ({ ctx, input }) => {
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

      return result.link.url; // Devuelve solo la URL
    }),

  /**
   * @description Se obtiene el link de la base de datos a partir del slug
   */
  increaseClickCount: publicProcedure
    .input(z.object({ slug: z.string().min(1) })) // Validación de entrada
    .query(async ({ ctx, input }) => {
      // Recuperar los slugs y el url y formatear la respuesta
      const result = await ctx.db.slug.findUnique({
        where: { slug: input.slug }, // Filtra por el slug
      });

      // Si el slug existe se aumenta el contador de clicks
      if (result) {
        await ctx.db.slug.update({
          where: { slug: input.slug },
          data: {
            clickCount: result.clickCount + 1, // Aumenta el contador de clicks
          },
        });
      }

      return;
    }),

  getUlrAndSlugBySlugId: protectedProcedure
    .input(z.object({ slugId: z.number().min(1) }))
    .query(async ({ ctx, input }) => {
      // Recuperar los slugs y el url y formatear la respuesta
      const result = await ctx.db.slug.findUnique({
        include: {
          link: true, // Carga la relación con la tabla `link`
        },
        where: { id: input.slugId },
      });

      const urlAndSlug = {
        url: result?.link?.url,
        slug: result?.slug,
      };

      return urlAndSlug;
    }),

  getUlrBySlug: protectedProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      // Recuperar los slugs y el url y formatear la respuesta
      const result = await ctx.db.slug.findUnique({
        include: {
          link: true, // Carga la relación con la tabla `link`
        },
        where: { slug: input.slug },
      });

      const url = result?.link?.url;

      return url;
    }),

  getClicks: protectedProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      // Recuperar las veces que se le ha dado click a ese url o slug
      const clickCount = await ctx.db.slug.findUnique({
        select: {
          clickCount: true,
        },
        where: { slug: input.slug },
      });

      console.log({ clickCount });

      return clickCount;
    }),

  delete: protectedProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Recuperar los slugs y el url y formatear la respuesta
      const slug = await ctx.db.slug.delete({
        where: { slug: input.slug },
      });

      return slug;
    }),

  // TODO: Creo que el problema esta en que la relacion es de muchos a muchos y no de uno a uno. Revisar
  update: protectedProcedure
    .input(z.object({ slug: z.string().min(1), url: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Actualizar el link asociado al slug
      const updatedSlug = await ctx.db.slug.update({
        include: {
          link: true,
        },
        where: { slug: input.slug },
        data: {
          link: {
            update: {
              url: input.url,
            },
          },
        },
      });

      return updatedSlug;
    }),
});
