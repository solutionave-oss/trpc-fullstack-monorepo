import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { createContext } from './utils/trpc/context';
import { router } from './router';
import { middleware } from './utils/trpc/middleware';
import { listening } from './utils/trpc/listener';

export const { server } = createHTTPServer({
  router,
  createContext,
  middleware,
});

server.listen(4000, '0.0.0.0').addListener('listening', listening);
