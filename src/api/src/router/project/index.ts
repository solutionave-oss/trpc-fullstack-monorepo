import * as z from 'zod';

import { trpcProcedure, trpcRouter } from '../../libs/trpc';

export const projectRouter = trpcRouter({
  createProject: trpcProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { getAuth, prisma } }) => {
      const auth = await getAuth();

      const project = await prisma.project.create({
        data: {
          name: input.name,
          organisation: {
            connect: {
              id: auth.currentOrganisation.id,
            },
          },
          stakeHolders: {
            create: {
              role: 'developer',
              member: {
                connect: {
                  id: auth.account.id,
                },
              },
            },
          },
        },
      });

      return project;
    }),
  getProjects: trpcProcedure.query(async ({ ctx: { getAuth, prisma } }) => {
    const account = await getAuth();

    const projects = await prisma.project.findMany({
      where: {
        organisation: {
          id: account.currentOrganisation.id,
        },
      },
      include: {
        stakeHolders: {
          include: {
            member: {
              omit: {
                password: true,
              },
            },
          },
        },
      },
    });

    return projects;
  }),
  getProject: trpcProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx: { getAuth, prisma } }) => {
      await getAuth();
      const project = await prisma.project.findUnique({
        where: {
          id: input.id 
        },
        include: {
          milestones: true,
          projectBoard: true,
          repositories: true,
          stakeHolders: true,
        },
      });
      return project;
    }),
});
