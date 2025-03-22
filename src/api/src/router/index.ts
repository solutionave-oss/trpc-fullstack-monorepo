import { trpcRouter } from '../libs/trpc';
import { accountRouter } from './account';
import { organisationRouter } from './organisation';
import { projectRouter } from './project';

export const router = trpcRouter({
  accountRouter,
  organisationRouter,
  projectRouter,
});

export type AppRouter = typeof router;
