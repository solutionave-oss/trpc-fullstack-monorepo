import { accountRouter, } from './account';
import { organisationRouter, } from './organisation';
import { projectRouter, } from './project';
import { trpcRouter, } from '../libs/trpc';

export const router = trpcRouter({
  accountRouter,
  organisationRouter,
  projectRouter,
});

export type AppRouter = typeof router;
