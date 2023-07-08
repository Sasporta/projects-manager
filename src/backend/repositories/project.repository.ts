import { prisma } from '../lib/prisma';

type Data = { id: string };

export const getAll = async () => {
  try {
    const findManyArgs = {
      select: {
        id: true,
        name: true,
        url: true,
        nextMaintenance: true,
      },
    };

    const projects = await prisma.project.findMany(findManyArgs);

    return projects;
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      throw new Error(`project.repository.getAll, ${args}`);
    }
  }
};

export const getOne = async (data: Data) => {
  try {
    const { id } = data;

    const findUniqueArgs = {
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        url: true,
        lastMaintenance: true,
        nextMaintenance: true,
        createdAt: true,
      },
    };

    const project = await prisma.project.findUnique(findUniqueArgs);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.repository.getOne, ${args}`);
    }
  }
};
