/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import {
  NodeHTTPRequest,
  NodeHTTPResponse,
} from '@trpc/server/dist/adapters/node-http';
import { PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';
import { Cookie } from '../cookie';
import { isOpenRoute } from '../guard';

export const middleware = (
  req: NodeHTTPRequest,
  res: NodeHTTPResponse,
  next: (err?: any) => any
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
  const id = Cookie.getAuthUserId(req, res).id;

  if (isOpenRoute(req)) {
    Cookie.resetCookie(res);
    return;
  }

  if (id === '') {
    throw new Error('Invalid Token');
  }

  return () =>
    prisma.account.findUnique({
      where: { id },
      omit: { password: true },
      include: {
        organisationMember: {
          include: {
            account: false,
            organisation: true,
          },
        },
      },
    });
};
