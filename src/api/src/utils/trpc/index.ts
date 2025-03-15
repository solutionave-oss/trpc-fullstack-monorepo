import { initTRPC } from '@trpc/server';
import { Ctx } from './context';

export const { router: trpcRouter, procedure: trpcProcedure } = initTRPC
  .context<Ctx>()
  .create({});
