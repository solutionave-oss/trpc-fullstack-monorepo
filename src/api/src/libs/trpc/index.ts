import { initTRPC, } from '@trpc/server';

import type { Ctx, } from './context';

export const { router: trpcRouter, procedure: trpcProcedure, } = initTRPC
  .context<Ctx>()
  .create({
    allowOutsideOfServer: true,
  });
