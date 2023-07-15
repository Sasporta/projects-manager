import { PrismaClient } from '@prisma/client';

import config from '@config';

const {
  db: { databaseLogs },
} = config;

const globPrisma = global as unknown as { prisma: PrismaClient };

let prismaClientOpt = {};

if (databaseLogs) {
  prismaClientOpt = { log: ['query', 'info', 'warn', 'error'] };
}

export const prisma = globPrisma.prisma || new PrismaClient(prismaClientOpt);

if (process.env.NODE_ENV !== 'production') {
  globPrisma.prisma = prisma;
}
