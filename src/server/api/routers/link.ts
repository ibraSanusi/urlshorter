import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const linkRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // TODO: Aqui no creo que haga falta, ya que el link se crea en la base de datos cuando se haya creado el slug nunca de manera independiente.
  //   create: protectedProcedure
  //     .input(z.object({ name: z.string().min(1), linkText: z.string().min(1) })) // ✅ Recibe el texto del link en lugar del ID
  //     .mutation(async ({ ctx, input }) => {
  //       // Buscar el link en la base de datos
  //       const link = await ctx.db.link.findFirst({
  //         where: { url: input.linkText, createdById: ctx.session.user.id }, // ✅ Busca el link por texto y usuario
  //       });

  //       if (!link) {
  //         throw new Error("Link not found");
  //       }

  //       return ctx.db.link.create({
  //         data: {
  //           url: input.name,
  //           createdById: ctx.session.user.id,
  //         },
  //       });
  //     }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const link = await ctx.db.link.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdById: ctx.session.user.id },
    });

    return link ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
