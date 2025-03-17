import { trpcRouter } from '../libs/trpc';
import { accountRouter } from './account';
import { organisationRouter } from './organisation';

export const router = trpcRouter({
  accountRouter,
  organisationRouter,
});

export type AppRouter = typeof router;
