import { prisma } from '../lib/prisma';

type ReadOneData = { id: string };

type CreateData = {
  name: string;
  description: string;
  url: string;
  nextMaintenance: Date;
};

export const readAll = async () => {
  try {
    const findManyArgs = {
      select: {
        id: true,
        name: true,
        url: true,
        nextMaintenance: true,
      },
    };

    // TODO: Add pagination and limit
    const projects = await prisma.project.findMany(findManyArgs);

    return projects;
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      throw new Error(`project.repository.readAll, ${args}`);
    }
  }
};

export const readOne = async (data: ReadOneData) => {
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

      throw new Error(`project.repository.readOne, ${args}`);
    }
  }
};

export const create = async (data: CreateData) => {
  try {
    const { name, description, url, nextMaintenance } = data;

    const createArgs = {
      data: {
        name,
        description,
        url,
        nextMaintenance,
      },
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

    const project = await prisma.project.create(createArgs);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.repository.create, ${args}`);
    }
  }
};
