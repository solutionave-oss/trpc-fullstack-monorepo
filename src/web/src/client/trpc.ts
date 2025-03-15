import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { type AppRouter } from 'src/api/src/router/index';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const url = 'http://localhost:4000';

export const api = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url,
      fetch: (url, options) =>
        fetch(url, { ...options, credentials: 'include' }),
    }),
  ],
});

export const serverApi = (cookies: ReadonlyRequestCookies) =>
  createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url,
        fetch: async (url, options) =>
          fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
              Cookie: `token=${cookies.get('token')?.value || ''}`,
            },
          }),
      }),
    ],
  });
