import { IncomingMessage, ServerResponse } from 'http';

import { Cookie } from '../cookie';
import { JWT } from '../jwt';
import { getPrisma } from '../prisma';
import { getAuth as _getAuth } from './middleware';

export const createContext = ({
  req,
  res,
}: {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
}) => {
  const prisma = getPrisma();
  const getAuth = _getAuth(req, res, prisma);

  return {
    req,
    res,
    prisma,
    JWT,
    Cookie,
    getAuth,
  };
};

export type Ctx = ReturnType<typeof createContext>;
