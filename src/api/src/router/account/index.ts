import { object, string } from 'zod';
import { trpcProcedure, trpcRouter } from '../../utils/trpc';

export const accountRouter = trpcRouter({
  signIn: trpcProcedure
    .input(
      object({
        email: string().nonempty().email(),
        password: string().nonempty(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.account.findUnique({
        where: {
          email: String(input.email).toLowerCase(),
        },
      });

      if (!existing) {
        const account = await ctx.prisma.account.create({
          data: {
            email: String(input.email).toLowerCase(),
            password: input.password,
          },
          omit: {
            password: true,
          },
        });

        const { token } = ctx.Cookie.setToken(ctx, account.id);
        return { token };
      }

      if (input.password !== existing.password) {
        ctx.Cookie.resetCookie(ctx.res);
        throw new Error('Invalid Password');
      }

      const { token } = ctx.Cookie.setToken(ctx, existing.id);
      return { token };
    }),
  getInfo: trpcProcedure.query(async ({ ctx }) => {
    const account = await ctx.getAuth();
    return account;
  }),
});
