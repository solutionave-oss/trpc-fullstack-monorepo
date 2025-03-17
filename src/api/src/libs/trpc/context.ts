import { IncomingMessage, ServerResponse } from 'http';
import { getPrisma } from '../prisma';
import { JWT } from '../jwt';
import { Cookie } from '../cookie';
import { getAuth } from './middleware';

export const createContext = ({
  req,
  res,
}: {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
}) => {
  const prisma = getPrisma();

  return {
    req,
    res,
    prisma,
    JWT,
    Cookie,
    getAuth: getAuth(req, res, prisma),
  };
};

export type Ctx = ReturnType<typeof createContext>;
