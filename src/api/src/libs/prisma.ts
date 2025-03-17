import { PrismaClient } from '@prisma/client';

let singletonPrisma: PrismaClient;

export const getPrisma = () => {
  if (!singletonPrisma) {
    singletonPrisma = new PrismaClient();
  }
  return singletonPrisma;
};
