import { PrismaClient } from '@prisma/client';

const globPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globPrisma.prisma || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') {
  globPrisma.prisma = prisma;
}
