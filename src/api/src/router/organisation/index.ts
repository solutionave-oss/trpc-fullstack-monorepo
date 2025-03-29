import * as z from 'zod';

import { replaceSpaceWithHypens, } from '../../libs/processors';
import { trpcProcedure, trpcRouter, } from '../../libs/trpc';

export const organisationRouter = trpcRouter({
  registerOrganisation: trpcProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma, getAuth, }, }) => {
      const auth = await getAuth();

      const response = await prisma.organisation.create({
        data: {
          name: input.name,
          code: replaceSpaceWithHypens(input.name),
          organisationMember: {
            create: {
              role: 'owner',
              account: {
                connect: {
                  id: auth.account.id,
                },
              },
            },
          },
        },
      });

      return response;
    }),

  setOrganisation: trpcProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .query(({ input, ctx: { Cookie, res, }, }) => {
      res.setHeader(
        'Set-Cookie',
        Cookie.setCookieValue('organisation', input.code)
      );
    }),

  addMember: trpcProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma, getAuth, }, }) => {
      const auth = await getAuth();
      const account = await prisma.account.create({
        data: {
          email: input.email,
          password: input.password,
          organisationMember: {
            create: {
              role: 'member',
              organisation: {
                connect: {
                  id: auth.currentOrganisation.id,
                },
              },
            },
          },
        },
        omit: {
          password: true,
        },
      });
      return account;
    }),

  getMembers: trpcProcedure.query(async ({ ctx: { prisma, getAuth, }, }) => {
    const auth = await getAuth();
    const response = await prisma.organisationMember.findMany({
      where: {
        organisationId: auth.currentOrganisation.id,
      },
      include: {
        account: true,
      },
    });
    return response;
  }),
});
