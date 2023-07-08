import { prisma } from '../lib/prisma';

type Data = { id: string };

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
