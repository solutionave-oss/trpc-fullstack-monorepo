import { createHTTPServer } from '@trpc/server/adapters/standalone';

import { createContext } from './libs/trpc/context';
import { listening } from './libs/trpc/listener';
import { middleware } from './libs/trpc/middleware';
import { router } from './router';

export const { server } = createHTTPServer({
  router,
  createContext,
  middleware,
});

server.listen(4000, '0.0.0.0').addListener('listening', listening);
