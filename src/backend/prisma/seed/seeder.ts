import { PrismaClient } from '@prisma/client';

type ProjectSeed = {
  id?: string;
  name: string;
  description: string;
  url: string;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  maintenance: {
    create: {
      hours: number;
    };
  };
};

const seeder = async (seedData: ProjectSeed[]) => {
  const prisma = new PrismaClient();

  try {
    for (const data of seedData) {
      await prisma.project.create({ data });
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  }
};

export default seeder;