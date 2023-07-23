import { Prisma } from '@prisma/client';

import { prisma } from '@lib/prisma';
import { ExtendedError, GeneralError, NotFoundError } from '@lib/customErrors';

type ReadOneData = { id: string };

type CreateData = {
  name: string;
  description: string;
  url: string;
  nextMaintenance: Date;
};

type UpdateData = {
  id: string;
  name: string;
  description: string;
  url: string;
};

type DestroyData = { id: string };

export const readAll = async () => {
  try {
    const findManyArgs = {
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

    // TODO: Add pagination and limit
    const projects = await prisma.project.findMany(findManyArgs);

    return projects;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ cause: e });
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
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const create = async (data: CreateData) => {
  try {
    const { name, description, url, nextMaintenance } = data;

    const createData = {
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

    const project = await prisma.project.create(createData);

    return project;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const update = async (data: UpdateData) => {
  try {
    const { id, name, description, url } = data;

    const updateData = {
      where: { id },
      data: {
        name,
        description,
        url,
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

    const project = await prisma.project.update(updateData);

    return project;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        throw new NotFoundError({ message: e.message, params: data });
      }
    } else if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const destroy = async (data: DestroyData) => {
  try {
    const { id } = data;

    const deleteData = {
      where: { id },
    };

    const project = await prisma.project.delete(deleteData);

    return project;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        throw new NotFoundError({ message: e.message, params: data });
      }
    } else if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};
