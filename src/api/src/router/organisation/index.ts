import { replaceSpaceWithHypens } from '../../libs/processors';
import { trpcProcedure, trpcRouter } from '../../libs/trpc';
import * as z from 'zod';

export const organisationRouter = trpcRouter({
  registerOrganisation: trpcProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma, getAuth } }) => {
      const auth = await getAuth();

      const response = await prisma.organisation.create({
        data: {
          name: input.name,
          code: replaceSpaceWithHypens(input.name),
          organisationMember: {
            create: {
              account: {
                connect: {
                  id: auth.id,
                },
              },
            },
          },
        },
      });

      return response;
    }),
});
