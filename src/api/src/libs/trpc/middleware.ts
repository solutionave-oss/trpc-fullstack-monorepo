
import { IncomingMessage, ServerResponse } from 'http';

import { PrismaClient } from '@prisma/client';
import {
  NodeHTTPRequest,
  NodeHTTPResponse,
} from '@trpc/server/dist/adapters/node-http';
import cors from 'cors';

import { Cookie } from '../cookie';
import { isOpenRoute } from '../guard';

export const middleware = (
  req: NodeHTTPRequest,
  res: NodeHTTPResponse,
  next: (err?: unknown) => unknown
) => {
  return cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4000'],
  })(req, res, next);
};

export const getAuth = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  prisma: PrismaClient
) => {
  const id = Cookie.getAuthUserId(req, res)?.['id'];

  const organisationCode =
    Cookie.getCookieValue(req.headers.cookie)?.['organisation'] ?? '';

  if (isOpenRoute(req)) {
    Cookie.resetCookie(res);
    return;
  }

  if (id === '') {
    throw new Error('Invalid Token');
  }

  return async () => {
    const [currentOrganisation, account] = await Promise.all([
      prisma.organisation.findUnique({
        where: {
          code: organisationCode,
        },
      }),
      prisma.account.findUnique({
        where: {
          id 
        },
        omit: {
          password: true 
        },
        include: {
          organisationMember: {
            include: {
              account: false,
              organisation: true,
            },
          },
        },
      }),
    ]);

    if (!account) {
      throw new Error('No User Found');
    }
    return {
      account, currentOrganisation 
    };
  };
  
};
