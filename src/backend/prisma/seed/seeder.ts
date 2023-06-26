import { PrismaClient } from '@prisma/client';

import projects from './mock';

const prisma = new PrismaClient();

const seeder = async () => {
  try {
    for (let project of projects) {
      await prisma.project.create({ data: project });
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  }
};

seeder();