import { trpcRouter } from '../utils/trpc';
import { accountRouter } from './account';

export const router = trpcRouter({
  accountRouter,
});

export type AppRouter = typeof router;
